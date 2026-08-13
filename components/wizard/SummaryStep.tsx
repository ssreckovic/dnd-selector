"use client";

import Link from "next/link";
import { classGrantsSpellcasting, getClass, getRace } from "@/lib/dnd-data";
import {
  getFinalAbilityScores,
  type AbilityScoreGuidance,
  type AbilityScores,
  type EffortLevel,
  type SpellChoiceMode,
  type WizardAnswers,
} from "@/lib/wizard-storage";

type SummaryStepProps = {
  answers: WizardAnswers;
  onCharacterNameChange: (name: string) => void;
};

const ABILITY_GUIDANCE_LABELS: Record<AbilityScoreGuidance, string> = {
  auto: "Choose my stats for me",
  manual: "I'll build my own",
  guided: "Walk me through it",
};

const SPELL_CHOICE_LABELS: Record<SpellChoiceMode, string> = {
  own: "Choosing all my own spells",
  suggestions: "Getting a list of suggestions",
  auto: "Having spells picked for me",
};

const EFFORT_LABELS: Record<EffortLevel, string> = {
  minimal: "Minimal",
  some: "Some",
  all: "All",
};

const ABILITY_FIELD_ORDER: (keyof AbilityScores)[] = ["str", "dex", "con", "int", "wis", "cha"];
const ABILITY_FIELD_LABELS: Record<keyof AbilityScores, string> = {
  str: "STR",
  dex: "DEX",
  con: "CON",
  int: "INT",
  wis: "WIS",
  cha: "CHA",
};

export function SummaryStep({ answers, onCharacterNameChange }: SummaryStepProps) {
  const race = answers.raceId ? getRace(answers.raceId) : undefined;
  const subrace = race?.subraces?.find((s) => s.id === answers.subraceId);
  const cls = answers.classId ? getClass(answers.classId) : undefined;
  const subclass = cls?.allSubclasses.find((s) => s.id === answers.subclassId);
  const isCaster = classGrantsSpellcasting(answers.classId, answers.subclassId);

  const finalScores = getFinalAbilityScores(answers);
  const scoreValues = ABILITY_FIELD_ORDER.filter((key) => finalScores?.[key] != null).map(
    (key) => `${ABILITY_FIELD_LABELS[key]} ${finalScores?.[key]}`,
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Review your concept</h2>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
        <dt className="font-medium">Effort level</dt>
        <dd>{answers.effortLevel ? EFFORT_LABELS[answers.effortLevel] : "—"}</dd>
        <dt className="font-medium">Race</dt>
        <dd>{subrace ? `${subrace.name} (${race?.name})` : race?.name ?? "—"}</dd>
        <dt className="font-medium">Class</dt>
        <dd>{cls?.name ?? "—"}</dd>
        <dt className="font-medium">Subclass</dt>
        <dd>{subclass?.name ?? "—"}</dd>
        <dt className="font-medium">Ability scores</dt>
        <dd>
          {answers.abilityScoreGuidance ? ABILITY_GUIDANCE_LABELS[answers.abilityScoreGuidance] : "—"}
          {scoreValues.length > 0 ? ` (${scoreValues.join(", ")})` : ""}
        </dd>
        {isCaster && (
          <>
            <dt className="font-medium">Spell choice</dt>
            <dd>
              {answers.spellChoiceMode ? SPELL_CHOICE_LABELS[answers.spellChoiceMode] : "—"}
              {" — Silvery Barbs is not allowed."}
            </dd>
          </>
        )}
      </dl>
      {isCaster && answers.classId && (
        <Link
          href={`/spells?class=${answers.classId}`}
          target="_blank"
          className="self-start text-sm font-medium text-amber-700 underline"
        >
          See spell options
        </Link>
      )}
      <label className="flex flex-col gap-1" htmlFor="character-name">
        <span className="font-medium">Character name</span>
        <input
          id="character-name"
          aria-label="Character name"
          className="rounded border border-zinc-300 px-3 py-2"
          value={answers.characterName}
          onChange={(e) => onCharacterNameChange(e.target.value)}
          placeholder="e.g. Thistle Fernwhisper"
        />
      </label>
    </div>
  );
}
