"use client";

import { useEffect, useState } from "react";
import { WelcomeStep } from "@/components/wizard/WelcomeStep";
import { RaceStep } from "@/components/wizard/RaceStep";
import { ClassStep } from "@/components/wizard/ClassStep";
import { SubclassStep } from "@/components/wizard/SubclassStep";
import { SpellChoiceStep } from "@/components/wizard/SpellChoiceStep";
import { AbilityScoreStep } from "@/components/wizard/AbilityScoreStep";
import { SummaryStep } from "@/components/wizard/SummaryStep";
import { getRace, classGrantsSpellcasting } from "@/lib/dnd-data";
import {
  EMPTY_ANSWERS,
  loadAnswers,
  saveAnswers,
  clearAnswers,
  type EffortLevel,
  type WizardAnswers,
} from "@/lib/wizard-storage";
import { submitConcept } from "@/lib/submit";

const STEPS = [
  "welcome",
  "race",
  "class",
  "subclass",
  "spell",
  "ability-scores",
  "summary",
] as const;
type Step = (typeof STEPS)[number];

function isStepComplete(step: Step, answers: WizardAnswers): boolean {
  switch (step) {
    case "welcome":
      return answers.playerName.trim().length > 0 && answers.effortLevel !== null;
    case "race": {
      const race = answers.raceId ? getRace(answers.raceId) : undefined;
      if (!race) return false;
      return race.subraces ? Boolean(answers.subraceId) : true;
    }
    case "class":
      return Boolean(answers.classId);
    case "subclass":
      return Boolean(answers.subclassId);
    case "spell":
      return Boolean(answers.spellChoiceMode);
    case "ability-scores":
      if (answers.abilityScoreGuidance === "auto") return true;
      return Boolean(answers.abilityScoreGuidance && answers.abilityScoreMethod);
    case "summary":
      return answers.characterName.trim().length > 0;
  }
}

function validationHint(step: Step, answers: WizardAnswers): string {
  switch (step) {
    case "welcome":
      return "Enter your name and choose how much you'd like to build yourself to continue.";
    case "race": {
      const race = answers.raceId ? getRace(answers.raceId) : undefined;
      if (!race) return "Choose a race to continue.";
      return "Choose a lineage to continue.";
    }
    case "class":
      return "Choose a class to continue.";
    case "subclass":
      return "Choose a subclass to continue.";
    case "spell":
      return "Choose how you'd like to handle spell selection to continue.";
    case "ability-scores":
      return "Choose how you'd like to determine your ability scores.";
    case "summary":
      return "Enter a character name to continue.";
  }
}

function isStepVisible(step: Step, answers: WizardAnswers): boolean {
  if (step === "ability-scores") {
    return answers.effortLevel !== "minimal";
  }
  if (step === "spell") {
    return (
      classGrantsSpellcasting(answers.classId, answers.subclassId) &&
      answers.effortLevel !== "minimal"
    );
  }
  return true;
}

function nextVisibleIndex(startIndex: number, direction: 1 | -1, answers: WizardAnswers): number {
  let i = startIndex;
  while (i > 0 && i < STEPS.length - 1 && !isStepVisible(STEPS[i], answers)) {
    i += direction;
  }
  return i;
}

function applyEffortLevel(
  effortLevel: EffortLevel,
  answers: WizardAnswers,
): Partial<WizardAnswers> {
  if (effortLevel === "all") {
    return { effortLevel, abilityScoreGuidance: null, spellChoiceMode: null };
  }
  const isCaster = classGrantsSpellcasting(answers.classId, answers.subclassId);
  return {
    effortLevel,
    abilityScoreGuidance: effortLevel === "minimal" ? "auto" : answers.abilityScoreGuidance,
    spellChoiceMode: isCaster ? "auto" : answers.spellChoiceMode,
  };
}

export function Wizard() {
  const [step, setStep] = useState<Step>("welcome");
  const [answers, setAnswers] = useState<WizardAnswers>(EMPTY_ANSWERS);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setAnswers(loadAnswers());
  }, []);

  useEffect(() => {
    if (status !== "success") {
      saveAnswers(answers);
    }
  }, [answers, status]);

  function updateAnswers(partial: Partial<WizardAnswers>) {
    setAnswers((prev) => ({ ...prev, ...partial }));
  }

  const stepIndex = STEPS.indexOf(step);

  function goBack() {
    if (stepIndex > 0) {
      setStep(STEPS[nextVisibleIndex(stepIndex - 1, -1, answers)]);
    }
  }

  async function goNext() {
    if (step === "summary") {
      setStatus("submitting");
      setErrorMessage(null);
      const result = await submitConcept(answers);
      if (result.ok) {
        setStatus("success");
        clearAnswers();
      } else {
        setStatus("error");
        setErrorMessage(result.error);
      }
      return;
    }
    if (stepIndex < STEPS.length - 1) {
      setStep(STEPS[nextVisibleIndex(stepIndex + 1, 1, answers)]);
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Thanks, {answers.playerName}!</h1>
        <p>Your concept has been submitted. Your GM will follow up with your full character sheet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {step === "welcome" && (
        <WelcomeStep
          playerName={answers.playerName}
          onPlayerNameChange={(playerName) => updateAnswers({ playerName })}
          effortLevel={answers.effortLevel}
          onSelectEffort={(effortLevel) => updateAnswers(applyEffortLevel(effortLevel, answers))}
        />
      )}
      {step === "race" && (
        <RaceStep
          raceId={answers.raceId}
          subraceId={answers.subraceId}
          onSelectRace={(raceId) => updateAnswers({ raceId, subraceId: null })}
          onSelectSubrace={(subraceId) => updateAnswers({ subraceId })}
        />
      )}
      {step === "class" && (
        <ClassStep
          classId={answers.classId}
          onSelectClass={(classId) => {
            const reset: WizardAnswers = { ...answers, classId, subclassId: null, spellChoiceMode: null };
            updateAnswers({
              classId,
              subclassId: null,
              spellChoiceMode: null,
              ...(answers.effortLevel ? applyEffortLevel(answers.effortLevel, reset) : {}),
            });
          }}
        />
      )}
      {step === "subclass" && answers.classId && (
        <SubclassStep
          classId={answers.classId}
          subclassId={answers.subclassId}
          onSelectSubclass={(subclassId) =>
            updateAnswers({
              subclassId,
              ...(classGrantsSpellcasting(answers.classId, subclassId)
                ? {}
                : { spellChoiceMode: null }),
            })
          }
        />
      )}
      {step === "spell" && classGrantsSpellcasting(answers.classId, answers.subclassId) && (
        <SpellChoiceStep
          spellChoiceMode={answers.spellChoiceMode}
          onSelectSpellChoiceMode={(spellChoiceMode) => updateAnswers({ spellChoiceMode })}
          effortLevel={answers.effortLevel}
        />
      )}
      {step === "ability-scores" && (
        <AbilityScoreStep
          abilityScoreGuidance={answers.abilityScoreGuidance}
          abilityScoreMethod={answers.abilityScoreMethod}
          abilityScores={answers.abilityScores}
          abilityScoreBonusMode={answers.abilityScoreBonusMode}
          abilityScoreBonusAssignment={answers.abilityScoreBonusAssignment}
          onChange={(partial) => updateAnswers(partial)}
        />
      )}
      {step === "summary" && (
        <SummaryStep
          answers={answers}
          onCharacterNameChange={(characterName) => updateAnswers({ characterName })}
        />
      )}

      {status === "error" && (
        <p role="alert" className="text-red-600">
          Something went wrong submitting your concept: {errorMessage}. Please try again.
        </p>
      )}

      {!isStepComplete(step, answers) && status !== "submitting" && (
        <p className="text-sm text-zinc-500">{validationHint(step, answers)}</p>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={stepIndex === 0}
          className="rounded border border-zinc-300 px-4 py-2 disabled:opacity-40"
        >
          Back
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={status === "submitting"}
          className="rounded bg-amber-600 px-4 py-2 text-white disabled:opacity-40"
        >
          {step === "summary" ? (status === "submitting" ? "Submitting…" : "Submit") : "Next"}
        </button>
      </div>
    </div>
  );
}
