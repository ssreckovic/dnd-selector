"use client";

import type {
  AbilityScoreBonusAssignment,
  AbilityScoreBonusMode,
  AbilityScoreGuidance,
  AbilityScoreMethod,
  AbilityScores,
} from "@/lib/wizard-storage";

type AbilityScoreStepProps = {
  abilityScoreGuidance: AbilityScoreGuidance | null;
  abilityScoreMethod: AbilityScoreMethod | null;
  abilityScores: AbilityScores | null;
  abilityScoreBonusMode: AbilityScoreBonusMode | null;
  abilityScoreBonusAssignment: AbilityScoreBonusAssignment | null;
  onChange: (partial: {
    abilityScoreGuidance?: AbilityScoreGuidance;
    abilityScoreMethod?: AbilityScoreMethod | null;
    abilityScores?: AbilityScores | null;
    abilityScoreBonusMode?: AbilityScoreBonusMode | null;
    abilityScoreBonusAssignment?: AbilityScoreBonusAssignment | null;
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

const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

const GUIDANCE_OPTIONS: { value: AbilityScoreGuidance; label: string; blurb: string }[] = [
  {
    value: "auto",
    label: "Choose my stats for me",
    blurb: "Your GM will fill in your ability scores for you.",
  },
  {
    value: "manual",
    label: "I'll build my own",
    blurb: "You'll assign the standard array yourself.",
  },
  {
    value: "guided",
    label: "Walk me through it",
    blurb: "The wizard will explain the standard array as you go.",
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

const BONUS_MODE_OPTIONS: { value: AbilityScoreBonusMode; label: string }[] = [
  { value: "three-plus-one", label: "Three abilities +1" },
  { value: "plus-two-plus-one", label: "One ability +2, one ability +1" },
];

const BONUS_SLOT_LABELS: Record<AbilityScoreBonusMode, string[]> = {
  "three-plus-one": ["+1 ability #1", "+1 ability #2", "+1 ability #3"],
  "plus-two-plus-one": ["+2 ability", "+1 ability"],
};

const BONUS_SLOT_AMOUNTS: Record<AbilityScoreBonusMode, (1 | 2)[]> = {
  "three-plus-one": [1, 1, 1],
  "plus-two-plus-one": [2, 1],
};

export function AbilityScoreStep({
  abilityScoreGuidance,
  abilityScoreMethod,
  abilityScores,
  abilityScoreBonusMode,
  abilityScoreBonusAssignment,
  onChange,
}: AbilityScoreStepProps) {
  const showAssignment = abilityScoreGuidance === "manual" || abilityScoreGuidance === "guided";

  function selectGuidance(value: AbilityScoreGuidance) {
    if (value === "auto") {
      onChange({
        abilityScoreGuidance: value,
        abilityScoreMethod: null,
        abilityScores: null,
        abilityScoreBonusMode: null,
        abilityScoreBonusAssignment: null,
      });
    } else {
      onChange({ abilityScoreGuidance: value, abilityScoreMethod: "standard-array" });
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

  function selectBonusMode(value: AbilityScoreBonusMode) {
    onChange({ abilityScoreBonusMode: value, abilityScoreBonusAssignment: null });
  }

  function setBonusSlot(slotIndex: number, key: keyof AbilityScores | "") {
    if (!abilityScoreBonusMode) return;
    const amounts = BONUS_SLOT_AMOUNTS[abilityScoreBonusMode];
    const next: (AbilityScoreBonusAssignment[number] | null)[] = amounts.map(
      (_, i) => (abilityScoreBonusAssignment ?? [])[i] ?? null,
    );
    next[slotIndex] = key === "" ? null : { key, bonus: amounts[slotIndex] };
    onChange({
      abilityScoreBonusAssignment: next.filter(
        (entry): entry is AbilityScoreBonusAssignment[number] => entry !== null,
      ),
    });
  }

  const usedValues = ABILITY_FIELDS.map((f) => abilityScores?.[f.key] ?? null).filter(
    (v): v is number => v !== null,
  );

  const bonusSlots = abilityScoreBonusMode ? BONUS_SLOT_LABELS[abilityScoreBonusMode] : [];
  const usedBonusKeys = (abilityScoreBonusAssignment ?? []).map((entry) => entry.key);

  function finalScoreFor(key: keyof AbilityScores): number | null {
    const base = abilityScores?.[key] ?? null;
    if (base === null) return null;
    const bonus = (abilityScoreBonusAssignment ?? []).find((entry) => entry.key === key)?.bonus ?? 0;
    return base + bonus;
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

      {showAssignment && (
        <>
          {abilityScoreGuidance === "guided" && (
            <p className="text-sm text-zinc-600">
              Assign 15, 14, 13, 12, 10, and 8 across your six abilities, one score per ability.
            </p>
          )}
          <div className="flex flex-col gap-3">
            <h3 className="font-medium">Assign the standard array</h3>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {ABILITY_FIELDS.map((field) => {
                const currentValue = abilityScores?.[field.key] ?? null;
                return (
                  <label key={field.key} className="flex flex-col gap-1">
                    <span className="text-sm font-medium">{field.label}</span>
                    <select
                      aria-label={field.label}
                      className="rounded border border-zinc-300 px-2 py-1"
                      value={currentValue ?? ""}
                      onChange={(e) => setScore(field.key, e.target.value)}
                    >
                      <option value="">—</option>
                      {STANDARD_ARRAY.filter(
                        (value) => value === currentValue || !usedValues.includes(value),
                      ).map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-medium">Ability score bonus</h3>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Bonus split</span>
              <select
                aria-label="Bonus split"
                className="rounded border border-zinc-300 px-2 py-1"
                value={abilityScoreBonusMode ?? ""}
                onChange={(e) => selectBonusMode(e.target.value as AbilityScoreBonusMode)}
              >
                <option value="">—</option>
                {BONUS_MODE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            {abilityScoreBonusMode && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {bonusSlots.map((label, slotIndex) => {
                  const currentKey = (abilityScoreBonusAssignment ?? [])[slotIndex]?.key ?? "";
                  return (
                    <label key={label} className="flex flex-col gap-1">
                      <span className="text-sm font-medium">{label}</span>
                      <select
                        aria-label={label}
                        className="rounded border border-zinc-300 px-2 py-1"
                        value={currentKey}
                        onChange={(e) =>
                          setBonusSlot(slotIndex, e.target.value as keyof AbilityScores | "")
                        }
                      >
                        <option value="">—</option>
                        {ABILITY_FIELDS.filter(
                          (field) => field.key === currentKey || !usedBonusKeys.includes(field.key),
                        ).map((field) => (
                          <option key={field.key} value={field.key}>
                            {field.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-medium">Final scores</h3>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {ABILITY_FIELDS.map((field) => (
                <div key={field.key} className="flex flex-col gap-1">
                  <span className="text-sm font-medium">{field.label}</span>
                  <span>{finalScoreFor(field.key) ?? "—"}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
