"use client";

import { useEffect, useState } from "react";
import { WelcomeStep } from "@/components/wizard/WelcomeStep";
import { RaceStep } from "@/components/wizard/RaceStep";
import { FlavorStep } from "@/components/wizard/FlavorStep";
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
  type WizardAnswers,
} from "@/lib/wizard-storage";
import { submitConcept } from "@/lib/submit";

const STEPS = [
  "welcome",
  "race",
  "flavor",
  "class",
  "subclass",
  "spell",
  "ability-scores",
  "summary",
] as const;
type Step = (typeof STEPS)[number];

function canAdvance(step: Step, answers: WizardAnswers): boolean {
  switch (step) {
    case "welcome":
      return answers.playerName.trim().length > 0;
    case "race": {
      const race = answers.raceId ? getRace(answers.raceId) : undefined;
      if (!race) return false;
      return race.subraces ? Boolean(answers.subraceId) : true;
    }
    case "flavor":
      return Boolean(
        answers.combatRole && answers.magicInterest && answers.socialStyle,
      );
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
      return "Enter your name to continue.";
    case "race": {
      const race = answers.raceId ? getRace(answers.raceId) : undefined;
      if (!race) return "Choose a race to continue.";
      return "Choose a lineage to continue.";
    }
    case "flavor":
      return "Answer all three questions to continue.";
    case "class":
      return "Choose a class to continue.";
    case "subclass":
      return "Choose a subclass to continue.";
    case "spell":
      return "Choose how you'd like to handle spell selection to continue.";
    case "ability-scores":
      if (!answers.abilityScoreGuidance) {
        return "Choose how you'd like to determine your ability scores.";
      }
      return "Choose a method to continue.";
    case "summary":
      return "Enter a character name to continue.";
  }
}

function isStepVisible(step: Step, answers: WizardAnswers): boolean {
  if (step === "spell") {
    return classGrantsSpellcasting(answers.classId, answers.subclassId);
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

  const flavorAnswers =
    answers.combatRole && answers.magicInterest && answers.socialStyle
      ? {
          combatRole: answers.combatRole,
          magicInterest: answers.magicInterest,
          socialStyle: answers.socialStyle,
        }
      : null;

  return (
    <div className="flex flex-col gap-6">
      {step === "welcome" && (
        <WelcomeStep
          playerName={answers.playerName}
          onPlayerNameChange={(playerName) => updateAnswers({ playerName })}
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
      {step === "flavor" && (
        <FlavorStep
          combatRole={answers.combatRole}
          magicInterest={answers.magicInterest}
          socialStyle={answers.socialStyle}
          onChange={(partial) => updateAnswers(partial)}
        />
      )}
      {step === "class" && (
        <ClassStep
          classId={answers.classId}
          flavorAnswers={flavorAnswers}
          onSelectClass={(classId) => updateAnswers({ classId, subclassId: null })}
        />
      )}
      {step === "subclass" && answers.classId && (
        <SubclassStep
          classId={answers.classId}
          subclassId={answers.subclassId}
          onSelectSubclass={(subclassId) => updateAnswers({ subclassId })}
        />
      )}
      {step === "spell" && classGrantsSpellcasting(answers.classId, answers.subclassId) && (
        <SpellChoiceStep
          spellChoiceMode={answers.spellChoiceMode}
          onSelectSpellChoiceMode={(spellChoiceMode) => updateAnswers({ spellChoiceMode })}
        />
      )}
      {step === "ability-scores" && (
        <AbilityScoreStep
          abilityScoreGuidance={answers.abilityScoreGuidance}
          abilityScoreMethod={answers.abilityScoreMethod}
          abilityScores={answers.abilityScores}
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

      {!canAdvance(step, answers) && status !== "submitting" && (
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
          disabled={!canAdvance(step, answers) || status === "submitting"}
          className="rounded bg-amber-600 px-4 py-2 text-white disabled:opacity-40"
        >
          {step === "summary" ? (status === "submitting" ? "Submitting…" : "Submit") : "Next"}
        </button>
      </div>
    </div>
  );
}
