"use client";

import type {
  AbilityScoreGuidance,
  AbilityScoreMethod,
  AbilityScores,
} from "@/lib/wizard-storage";

type AbilityScoreStepProps = {
  abilityScoreGuidance: AbilityScoreGuidance | null;
  abilityScoreMethod: AbilityScoreMethod | null;
  abilityScores: AbilityScores | null;
  onChange: (partial: {
    abilityScoreGuidance?: AbilityScoreGuidance;
    abilityScoreMethod?: AbilityScoreMethod | null;
    abilityScores?: AbilityScores | null;
  }) => void;
};

const EMPTY_SCORES: AbilityScores = {
  str: null,
  dex: null,
  con: null,
  int: null,
  wis: null,
  cha: null,
};

const GUIDANCE_OPTIONS: { value: AbilityScoreGuidance; label: string; blurb: string }[] = [
  {
    value: "auto",
    label: "Choose my stats for me",
    blurb: "Your GM will fill in your ability scores for you.",
  },
  {
    value: "manual",
    label: "I'll build my own",
    blurb: "You'll pick a method and enter your own scores.",
  },
  {
    value: "guided",
    label: "Walk me through it",
    blurb: "The wizard will explain each method as you go.",
  },
];

const METHOD_OPTIONS: { value: AbilityScoreMethod; label: string; guidedTip: string }[] = [
  {
    value: "standard-array",
    label: "Standard array",
    guidedTip: "Assign 15, 14, 13, 12, 10, and 8 across your six abilities, one score per ability.",
  },
  {
    value: "roll",
    label: "Roll for it (4d6, drop lowest)",
    guidedTip: "Roll four six-sided dice, drop the lowest, and sum the rest — once per ability.",
  },
  {
    value: "point-buy",
    label: "Point buy",
    guidedTip: "Spend a pool of points to buy up each ability score from a base of 8.",
  },
];

const ABILITY_FIELDS: { key: keyof AbilityScores; label: string }[] = [
  { key: "str", label: "STR" },
  { key: "dex", label: "DEX" },
  { key: "con", label: "CON" },
  { key: "int", label: "INT" },
  { key: "wis", label: "WIS" },
  { key: "cha", label: "CHA" },
];

export function AbilityScoreStep({
  abilityScoreGuidance,
  abilityScoreMethod,
  abilityScores,
  onChange,
}: AbilityScoreStepProps) {
  const showMethods = abilityScoreGuidance === "manual" || abilityScoreGuidance === "guided";
  const showScores = showMethods && Boolean(abilityScoreMethod);

  function selectGuidance(value: AbilityScoreGuidance) {
    if (value === "auto") {
      onChange({ abilityScoreGuidance: value, abilityScoreMethod: null, abilityScores: null });
    } else {
      onChange({ abilityScoreGuidance: value });
    }
  }

  function setScore(key: keyof AbilityScores, raw: string) {
    const value = raw.trim() === "" ? null : Number(raw);
    onChange({
      abilityScores: {
        ...EMPTY_SCORES,
        ...abilityScores,
        [key]: value,
      },
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">How do you want to determine your ability scores?</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {GUIDANCE_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => selectGuidance(option.value)}
            aria-pressed={option.value === abilityScoreGuidance}
            className={`rounded border p-4 text-left transition-colors ${
              option.value === abilityScoreGuidance
                ? "border-amber-600 bg-amber-50"
                : "border-zinc-300 hover:bg-zinc-50"
            }`}
          >
            <div className="font-medium">{option.label}</div>
            <div className="text-sm text-zinc-600">{option.blurb}</div>
          </button>
        ))}
      </div>

      {showMethods && (
        <div className="flex flex-col gap-3">
          <h3 className="font-medium">Which method?</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {METHOD_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange({ abilityScoreMethod: option.value })}
                aria-pressed={option.value === abilityScoreMethod}
                className={`rounded border p-4 text-left transition-colors ${
                  option.value === abilityScoreMethod
                    ? "border-amber-600 bg-amber-50"
                    : "border-zinc-300 hover:bg-zinc-50"
                }`}
              >
                <div className="font-medium">{option.label}</div>
                {abilityScoreGuidance === "guided" && (
                  <div className="text-sm text-zinc-600">{option.guidedTip}</div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {showScores && (
        <div className="flex flex-col gap-3">
          <h3 className="font-medium">Enter your scores (optional)</h3>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {ABILITY_FIELDS.map((field) => (
              <label key={field.key} className="flex flex-col gap-1">
                <span className="text-sm font-medium">{field.label}</span>
                <input
                  type="number"
                  aria-label={field.label}
                  className="rounded border border-zinc-300 px-2 py-1"
                  value={abilityScores?.[field.key] ?? ""}
                  onChange={(e) => setScore(field.key, e.target.value)}
                />
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
