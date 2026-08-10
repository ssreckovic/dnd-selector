# Wizard Ability-Score-Method and Spell-Choice Steps Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two new wizard steps — "how do you want to determine your ability scores" and "how do you want to handle spell selection" (for casters only) — that record player intent without performing real dice/point-buy math or modeling a real spell catalog, and surface a house rule banning Silvery Barbs.

**Architecture:** Two new dumb, controlled step components (`AbilityScoreStep`, `SpellChoiceStep`) following the existing pattern of props-in/callback-out React components. `Wizard.tsx`'s linear `STEPS` array grows by two entries; the `"spell"` step is conditionally skipped via a small step-visibility helper. `WizardAnswers` and `dnd-data.ts` grow to carry the new fields and a `classGrantsSpellcasting` helper.

**Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind classes, Vitest + @testing-library/react + @testing-library/user-event.

## Global Constraints

- No real spell data/catalog, no dice-rolling logic, no point-buy cost validation, no per-class stat auto-assignment. Every new field records player *intent* only.
- Ability score number inputs are always optional and never gate advancing.
- The Silvery Barbs house-rule notice must appear on the spell step regardless of which option is selected.
- `classGrantsSpellcasting` must return true for: bard, cleric, druid, paladin, ranger, sorcerer, warlock, wizard (base classes), and fighter/eldritch-knight, rogue/arcane-trickster (subclass-only casters). False for every other class/subclass combination.
- Follow existing code style: `"use client"` at the top of step components, Tailwind classes matching sibling steps (`border-amber-600 bg-amber-50` selected state, `border-zinc-300 hover:bg-zinc-50` unselected), dumb components taking value+callback props.

---

### Task 1: `dnd-data.ts` — spellcasting flags and `classGrantsSpellcasting`

**Files:**
- Modify: `lib/dnd-data.ts`
- Test: `lib/__tests__/dnd-data.test.ts`

**Interfaces:**
- Produces: `Subclass.hasSpellcasting?: boolean`, `DndClass.baseSpellcasting: boolean`, `export function classGrantsSpellcasting(classId: string | null, subclassId: string | null): boolean`.

- [ ] **Step 1: Write the failing tests**

Add to `lib/__tests__/dnd-data.test.ts` (append inside the existing `describe("dnd-data", ...)` block, after the last `it`):

```ts
  it("flags exactly the base spellcasting classes", () => {
    const expectedCasters = new Set([
      "bard",
      "cleric",
      "druid",
      "paladin",
      "ranger",
      "sorcerer",
      "warlock",
      "wizard",
    ]);
    for (const cls of CLASSES) {
      expect(cls.baseSpellcasting).toBe(expectedCasters.has(cls.id));
    }
  });

  it("flags only Eldritch Knight and Arcane Trickster as subclass-granted spellcasting", () => {
    for (const cls of CLASSES) {
      for (const subclass of cls.allSubclasses) {
        const expected = subclass.id === "eldritch-knight" || subclass.id === "arcane-trickster";
        expect(Boolean(subclass.hasSpellcasting)).toBe(expected);
      }
    }
  });
});

describe("classGrantsSpellcasting", () => {
  it("is true for a base spellcasting class regardless of subclass", () => {
    expect(classGrantsSpellcasting("wizard", "evocation")).toBe(true);
    expect(classGrantsSpellcasting("wizard", null)).toBe(true);
  });

  it("is true for a subclass that grants spellcasting on a non-caster base class", () => {
    expect(classGrantsSpellcasting("fighter", "eldritch-knight")).toBe(true);
    expect(classGrantsSpellcasting("rogue", "arcane-trickster")).toBe(true);
  });

  it("is false for a non-caster class with a non-spellcasting subclass", () => {
    expect(classGrantsSpellcasting("fighter", "champion")).toBe(false);
    expect(classGrantsSpellcasting("barbarian", "berserker")).toBe(false);
  });

  it("is false when classId is null or unknown", () => {
    expect(classGrantsSpellcasting(null, null)).toBe(false);
    expect(classGrantsSpellcasting("nonexistent", null)).toBe(false);
  });
```

Update the top import line of the test file to:

```ts
import { describe, it, expect } from "vitest";
import { RACES, CLASSES, getRace, getClass, classGrantsSpellcasting } from "@/lib/dnd-data";
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run lib/__tests__/dnd-data.test.ts`
Expected: FAIL — `classGrantsSpellcasting` is not exported, and `baseSpellcasting`/`hasSpellcasting` are `undefined` so the flag assertions fail.

- [ ] **Step 3: Implement the flags and helper**

In `lib/dnd-data.ts`:

Change the `Subclass` type (lines 14-18) to:

```ts
export type Subclass = {
  id: string;
  name: string;
  blurb: string;
  hasSpellcasting?: boolean;
};
```

Change the `DndClass` type (lines 20-26) to:

```ts
export type DndClass = {
  id: string;
  name: string;
  blurb: string;
  baseSpellcasting: boolean;
  defaultSubclasses: Subclass[];
  allSubclasses: Subclass[];
};
```

Add `baseSpellcasting: <value>,` right after the `blurb` line of every entry in `CLASSES`, using these values by class id:

| classId | baseSpellcasting |
|---|---|
| barbarian | `false` |
| bard | `true` |
| cleric | `true` |
| druid | `true` |
| fighter | `false` |
| monk | `false` |
| paladin | `true` |
| ranger | `true` |
| rogue | `false` |
| sorcerer | `true` |
| warlock | `true` |
| wizard | `true` |

For example, the `barbarian` entry's opening becomes:

```ts
  {
    id: "barbarian",
    name: "Barbarian",
    blurb: "A relentless warrior who fights with raw fury and unmatched toughness.",
    baseSpellcasting: false,
    defaultSubclasses: [
```

and the `wizard` entry's opening becomes:

```ts
  {
    id: "wizard",
    name: "Wizard",
    blurb: "A scholarly spellcaster who studies magic from books and commands the widest variety of spells.",
    baseSpellcasting: true,
    defaultSubclasses: [
```

Add `hasSpellcasting: true` to both occurrences of the `eldritch-knight` subclass object (in `fighter`'s `defaultSubclasses` and `allSubclasses`):

```ts
      { id: "eldritch-knight", name: "Eldritch Knight", blurb: "A soldier who blends swordplay with a handful of arcane spells.", hasSpellcasting: true },
```

Add `hasSpellcasting: true` to both occurrences of the `arcane-trickster` subclass object (in `rogue`'s `defaultSubclasses` and `allSubclasses`):

```ts
      { id: "arcane-trickster", name: "Arcane Trickster", blurb: "A rogue who mixes in a handful of illusion and trickery spells.", hasSpellcasting: true },
```

Add this function after `getClass` (after line 328):

```ts
export function classGrantsSpellcasting(
  classId: string | null,
  subclassId: string | null,
): boolean {
  const dndClass = classId ? getClass(classId) : undefined;
  if (!dndClass) return false;
  if (dndClass.baseSpellcasting) return true;
  const subclass = dndClass.allSubclasses.find((s) => s.id === subclassId);
  return Boolean(subclass?.hasSpellcasting);
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run lib/__tests__/dnd-data.test.ts`
Expected: PASS (all tests, including the pre-existing ones)

- [ ] **Step 5: Commit**

```bash
git add lib/dnd-data.ts lib/__tests__/dnd-data.test.ts
git commit -m "feat: flag spellcasting classes/subclasses and add classGrantsSpellcasting"
```

---

### Task 2: `wizard-storage.ts` — new answer fields

**Files:**
- Modify: `lib/wizard-storage.ts`
- Test: `lib/__tests__/wizard-storage.test.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: `AbilityScoreGuidance = "auto" | "manual" | "guided"`, `AbilityScoreMethod = "standard-array" | "roll" | "point-buy"`, `SpellChoiceMode = "own" | "suggestions" | "auto"`, `AbilityScores = { str, dex, con, int, wis, cha: number | null }`, and `WizardAnswers` fields `abilityScoreGuidance`, `abilityScoreMethod`, `abilityScores`, `spellChoiceMode` (all nullable, default `null` in `EMPTY_ANSWERS`).

- [ ] **Step 1: Write the failing test**

Add to `lib/__tests__/wizard-storage.test.ts`, replacing the `"saveAnswers persists answers that loadAnswers can read back"` test with one that also covers the new fields:

```ts
  it("saveAnswers persists answers that loadAnswers can read back", () => {
    const answers: WizardAnswers = {
      ...EMPTY_ANSWERS,
      playerName: "Sasha",
      raceId: "elf",
      subraceId: "wood-elf",
      abilityScoreGuidance: "guided",
      abilityScoreMethod: "point-buy",
      abilityScores: { str: 14, dex: 12, con: 13, int: 10, wis: 8, cha: 15 },
      spellChoiceMode: "suggestions",
    };
    saveAnswers(answers);
    expect(loadAnswers()).toEqual(answers);
  });

  it("defaults the new ability-score and spell fields to null", () => {
    expect(EMPTY_ANSWERS.abilityScoreGuidance).toBeNull();
    expect(EMPTY_ANSWERS.abilityScoreMethod).toBeNull();
    expect(EMPTY_ANSWERS.abilityScores).toBeNull();
    expect(EMPTY_ANSWERS.spellChoiceMode).toBeNull();
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run lib/__tests__/wizard-storage.test.ts`
Expected: FAIL — TypeScript error / assertion failure since these `WizardAnswers` fields don't exist yet.

- [ ] **Step 3: Implement the new fields**

In `lib/wizard-storage.ts`, add above the `WizardAnswers` type:

```ts
export type AbilityScoreGuidance = "auto" | "manual" | "guided";
export type AbilityScoreMethod = "standard-array" | "roll" | "point-buy";
export type SpellChoiceMode = "own" | "suggestions" | "auto";

export type AbilityScores = {
  str: number | null;
  dex: number | null;
  con: number | null;
  int: number | null;
  wis: number | null;
  cha: number | null;
};
```

Change `WizardAnswers` to:

```ts
export type WizardAnswers = {
  playerName: string;
  raceId: string | null;
  subraceId: string | null;
  combatRole: CombatRole | null;
  magicInterest: MagicInterest | null;
  socialStyle: SocialStyle | null;
  classId: string | null;
  subclassId: string | null;
  abilityScoreGuidance: AbilityScoreGuidance | null;
  abilityScoreMethod: AbilityScoreMethod | null;
  abilityScores: AbilityScores | null;
  spellChoiceMode: SpellChoiceMode | null;
  characterName: string;
};
```

Change `EMPTY_ANSWERS` to:

```ts
export const EMPTY_ANSWERS: WizardAnswers = {
  playerName: "",
  raceId: null,
  subraceId: null,
  combatRole: null,
  magicInterest: null,
  socialStyle: null,
  classId: null,
  subclassId: null,
  abilityScoreGuidance: null,
  abilityScoreMethod: null,
  abilityScores: null,
  spellChoiceMode: null,
  characterName: "",
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run lib/__tests__/wizard-storage.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add lib/wizard-storage.ts lib/__tests__/wizard-storage.test.ts
git commit -m "feat: add ability-score and spell-choice fields to WizardAnswers"
```

---

### Task 3: `AbilityScoreStep` component

**Files:**
- Create: `components/wizard/AbilityScoreStep.tsx`
- Test: `components/wizard/__tests__/AbilityScoreStep.test.tsx`

**Interfaces:**
- Consumes: `AbilityScoreGuidance`, `AbilityScoreMethod`, `AbilityScores` from `@/lib/wizard-storage` (Task 2).
- Produces: `AbilityScoreStep` component with props `{ abilityScoreGuidance: AbilityScoreGuidance | null; abilityScoreMethod: AbilityScoreMethod | null; abilityScores: AbilityScores | null; onChange: (partial: { abilityScoreGuidance?: AbilityScoreGuidance; abilityScoreMethod?: AbilityScoreMethod | null; abilityScores?: AbilityScores | null }) => void }`.

- [ ] **Step 1: Write the failing test**

Create `components/wizard/__tests__/AbilityScoreStep.test.tsx`:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AbilityScoreStep } from "@/components/wizard/AbilityScoreStep";

describe("AbilityScoreStep", () => {
  it("reports 'auto' guidance and clears method/scores", async () => {
    const onChange = vi.fn();
    render(
      <AbilityScoreStep
        abilityScoreGuidance={null}
        abilityScoreMethod={null}
        abilityScores={null}
        onChange={onChange}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: /choose my stats for me/i }));
    expect(onChange).toHaveBeenCalledWith({
      abilityScoreGuidance: "auto",
      abilityScoreMethod: null,
      abilityScores: null,
    });
  });

  it("does not show method or score inputs until 'build my own' or 'walk me through' is chosen", () => {
    render(
      <AbilityScoreStep
        abilityScoreGuidance={null}
        abilityScoreMethod={null}
        abilityScores={null}
        onChange={vi.fn()}
      />,
    );
    expect(screen.queryByText(/which method/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText("STR")).not.toBeInTheDocument();
  });

  it("shows the method row after choosing 'build my own', and reports the chosen method", async () => {
    const onChange = vi.fn();
    render(
      <AbilityScoreStep
        abilityScoreGuidance="manual"
        abilityScoreMethod={null}
        abilityScores={null}
        onChange={onChange}
      />,
    );
    expect(screen.getByText(/which method/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /standard array/i }));
    expect(onChange).toHaveBeenCalledWith({ abilityScoreMethod: "standard-array" });
  });

  it("shows guided tips for each method only when guidance is 'guided'", () => {
    render(
      <AbilityScoreStep
        abilityScoreGuidance="guided"
        abilityScoreMethod={null}
        abilityScores={null}
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByText(/drop the lowest/i)).toBeInTheDocument();
  });

  it("shows the six score inputs once a method is chosen, and reports edits", async () => {
    const onChange = vi.fn();
    render(
      <AbilityScoreStep
        abilityScoreGuidance="manual"
        abilityScoreMethod="standard-array"
        abilityScores={null}
        onChange={onChange}
      />,
    );
    const strInput = screen.getByLabelText("STR");
    await userEvent.type(strInput, "15");
    expect(onChange).toHaveBeenLastCalledWith({
      abilityScores: { str: 15, dex: null, con: null, int: null, wis: null, cha: null },
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/wizard/__tests__/AbilityScoreStep.test.tsx`
Expected: FAIL — module `@/components/wizard/AbilityScoreStep` does not exist.

- [ ] **Step 3: Implement the component**

Create `components/wizard/AbilityScoreStep.tsx`:

```tsx
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/wizard/__tests__/AbilityScoreStep.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/wizard/AbilityScoreStep.tsx components/wizard/__tests__/AbilityScoreStep.test.tsx
git commit -m "feat: add AbilityScoreStep wizard component"
```

---

### Task 4: `SpellChoiceStep` component

**Files:**
- Create: `components/wizard/SpellChoiceStep.tsx`
- Test: `components/wizard/__tests__/SpellChoiceStep.test.tsx`

**Interfaces:**
- Consumes: `SpellChoiceMode` from `@/lib/wizard-storage` (Task 2).
- Produces: `SpellChoiceStep` component with props `{ spellChoiceMode: SpellChoiceMode | null; onSelectSpellChoiceMode: (mode: SpellChoiceMode) => void }`.

- [ ] **Step 1: Write the failing test**

Create `components/wizard/__tests__/SpellChoiceStep.test.tsx`:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SpellChoiceStep } from "@/components/wizard/SpellChoiceStep";

describe("SpellChoiceStep", () => {
  it("always shows the Silvery Barbs house-rule notice", () => {
    render(<SpellChoiceStep spellChoiceMode={null} onSelectSpellChoiceMode={vi.fn()} />);
    expect(screen.getByText(/silvery barbs/i)).toBeInTheDocument();
    expect(screen.getByText(/not an allowed spell/i)).toBeInTheDocument();
  });

  it("reports the selected spell choice mode", async () => {
    const onSelectSpellChoiceMode = vi.fn();
    render(
      <SpellChoiceStep spellChoiceMode={null} onSelectSpellChoiceMode={onSelectSpellChoiceMode} />,
    );
    await userEvent.click(screen.getByRole("button", { name: /give me a list of suggestions/i }));
    expect(onSelectSpellChoiceMode).toHaveBeenCalledWith("suggestions");
  });

  it("highlights the currently selected option", () => {
    render(
      <SpellChoiceStep spellChoiceMode="auto" onSelectSpellChoiceMode={vi.fn()} />,
    );
    expect(screen.getByRole("button", { name: /pick my spells for me/i })).toHaveClass(
      "border-amber-600",
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/wizard/__tests__/SpellChoiceStep.test.tsx`
Expected: FAIL — module `@/components/wizard/SpellChoiceStep` does not exist.

- [ ] **Step 3: Implement the component**

Create `components/wizard/SpellChoiceStep.tsx`:

```tsx
"use client";

import type { SpellChoiceMode } from "@/lib/wizard-storage";

type SpellChoiceStepProps = {
  spellChoiceMode: SpellChoiceMode | null;
  onSelectSpellChoiceMode: (mode: SpellChoiceMode) => void;
};

const SPELL_CHOICE_OPTIONS: { value: SpellChoiceMode; label: string; blurb: string }[] = [
  {
    value: "own",
    label: "I'll choose all my own spells",
    blurb: "You'll pick every spell yourself.",
  },
  {
    value: "suggestions",
    label: "Give me a list of suggestions",
    blurb: "Your GM will suggest some spells for you to pick from.",
  },
  {
    value: "auto",
    label: "Pick my spells for me",
    blurb: "Your GM will pick your spells for you.",
  },
];

export function SpellChoiceStep({ spellChoiceMode, onSelectSpellChoiceMode }: SpellChoiceStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">How do you want to handle your spells?</h2>
      <p className="rounded border border-amber-600 bg-amber-50 p-3 text-sm">
        House rule: <strong>Silvery Barbs</strong> is not an allowed spell in this game.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {SPELL_CHOICE_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelectSpellChoiceMode(option.value)}
            className={`rounded border p-4 text-left transition-colors ${
              option.value === spellChoiceMode
                ? "border-amber-600 bg-amber-50"
                : "border-zinc-300 hover:bg-zinc-50"
            }`}
          >
            <div className="font-medium">{option.label}</div>
            <div className="text-sm text-zinc-600">{option.blurb}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/wizard/__tests__/SpellChoiceStep.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/wizard/SpellChoiceStep.tsx components/wizard/__tests__/SpellChoiceStep.test.tsx
git commit -m "feat: add SpellChoiceStep wizard component"
```

---

### Task 5: Wire the new steps into `Wizard.tsx`

**Files:**
- Modify: `components/wizard/Wizard.tsx`
- Modify: `components/wizard/__tests__/Wizard.test.tsx`

**Interfaces:**
- Consumes: `classGrantsSpellcasting` (Task 1), `AbilityScoreStep` (Task 3), `SpellChoiceStep` (Task 4), the new `WizardAnswers` fields (Task 2).
- Produces: updated `STEPS` tuple `["welcome", "race", "flavor", "class", "subclass", "spell", "ability-scores", "summary"]`, with `"spell"` skipped by `goNext`/`goBack` whenever `classGrantsSpellcasting` is false.

- [ ] **Step 1: Write the failing tests**

Replace the full contents of `components/wizard/__tests__/Wizard.test.tsx` with:

```tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Wizard } from "@/components/wizard/Wizard";
import * as submitModule from "@/lib/submit";
import { EMPTY_ANSWERS, saveAnswers } from "@/lib/wizard-storage";

async function completeAbilityScoresWithAuto() {
  await userEvent.click(screen.getByRole("button", { name: /choose my stats for me/i }));
  await userEvent.click(screen.getByRole("button", { name: /next/i }));
}

describe("Wizard", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("blocks advancing past Welcome until a player name is entered", async () => {
    render(<Wizard />);
    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();

    await userEvent.type(screen.getByLabelText(/your name/i), "Sasha");
    expect(screen.getByRole("button", { name: /next/i })).toBeEnabled();
  });

  it("shows an inline validation hint on Welcome until a name is entered", async () => {
    render(<Wizard />);
    expect(screen.getByText(/enter your name to continue/i)).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText(/your name/i), "Sasha");
    expect(screen.queryByText(/enter your name to continue/i)).not.toBeInTheDocument();
  });

  it("restores answers saved in localStorage on mount", () => {
    saveAnswers({ ...EMPTY_ANSWERS, playerName: "Restored" });
    render(<Wizard />);
    expect(screen.getByLabelText(/your name/i)).toHaveValue("Restored");
  });

  it("clears localStorage after a successful submission", async () => {
    vi.spyOn(submitModule, "submitConcept").mockResolvedValue({ ok: true });
    render(<Wizard />);

    await userEvent.type(screen.getByLabelText(/your name/i), "Sasha");
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /^human$/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /melee/i }));
    await userEvent.click(screen.getByRole("button", { name: /^none$/i }));
    await userEvent.click(screen.getByRole("button", { name: /loner/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /fighter/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /champion/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await completeAbilityScoresWithAuto();

    await userEvent.type(screen.getByLabelText(/character name/i), "Torren");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText(/your concept has been submitted/i)).toBeInTheDocument();
    expect(window.localStorage.getItem("dnd-concept-builder:answers")).toBeNull();
  });

  it("walks forward through race, flavor, class, subclass, and ability scores to the summary, and back again", async () => {
    render(<Wizard />);

    await userEvent.type(screen.getByLabelText(/your name/i), "Sasha");
    await userEvent.click(screen.getByRole("button", { name: /next/i }));

    // Race step: human has no subrace, so Next should be enabled right after picking it.
    await userEvent.click(screen.getByRole("button", { name: /^human$/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));

    // Flavor step
    await userEvent.click(screen.getByRole("button", { name: /melee/i }));
    await userEvent.click(screen.getByRole("button", { name: /^none$/i }));
    await userEvent.click(screen.getByRole("button", { name: /loner/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));

    // Class step
    await userEvent.click(screen.getByRole("button", { name: /fighter/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));

    // Subclass step (Champion doesn't cast, so the spell step should be skipped)
    await userEvent.click(screen.getByRole("button", { name: /champion/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(
      screen.getByText(/how do you want to determine your ability scores/i),
    ).toBeInTheDocument();

    await completeAbilityScoresWithAuto();
    expect(screen.getByText(/review your concept/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /back/i }));
    expect(
      screen.getByText(/how do you want to determine your ability scores/i),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /back/i }));
    expect(screen.getByText(/choose your fighter subclass/i)).toBeInTheDocument();
  });

  it("shows the spell choice step for a base spellcasting class", async () => {
    render(<Wizard />);

    await userEvent.type(screen.getByLabelText(/your name/i), "Sasha");
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /^human$/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /melee/i }));
    await userEvent.click(screen.getByRole("button", { name: /^none$/i }));
    await userEvent.click(screen.getByRole("button", { name: /loner/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /wizard/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /evocation/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));

    expect(screen.getByText(/how do you want to handle your spells/i)).toBeInTheDocument();
    expect(screen.getByText(/silvery barbs/i)).toBeInTheDocument();
  });

  it("shows the spell choice step for a fighter who picks the spellcasting Eldritch Knight subclass", async () => {
    render(<Wizard />);

    await userEvent.type(screen.getByLabelText(/your name/i), "Sasha");
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /^human$/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /melee/i }));
    await userEvent.click(screen.getByRole("button", { name: /^none$/i }));
    await userEvent.click(screen.getByRole("button", { name: /loner/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /fighter/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /eldritch knight/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));

    expect(screen.getByText(/how do you want to handle your spells/i)).toBeInTheDocument();
  });

  it("requires a method before advancing past ability scores unless choosing 'for me'", async () => {
    render(<Wizard />);

    await userEvent.type(screen.getByLabelText(/your name/i), "Sasha");
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /^human$/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /melee/i }));
    await userEvent.click(screen.getByRole("button", { name: /^none$/i }));
    await userEvent.click(screen.getByRole("button", { name: /loner/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /fighter/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /champion/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));

    await userEvent.click(screen.getByRole("button", { name: /build my own/i }));
    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();

    await userEvent.click(screen.getByRole("button", { name: /standard array/i }));
    expect(screen.getByRole("button", { name: /next/i })).toBeEnabled();
  });

  it("submits the concept and shows a confirmation on success", async () => {
    vi.spyOn(submitModule, "submitConcept").mockResolvedValue({ ok: true });
    render(<Wizard />);

    await userEvent.type(screen.getByLabelText(/your name/i), "Sasha");
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /^human$/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /melee/i }));
    await userEvent.click(screen.getByRole("button", { name: /^none$/i }));
    await userEvent.click(screen.getByRole("button", { name: /loner/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /fighter/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /champion/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await completeAbilityScoresWithAuto();

    await userEvent.type(screen.getByLabelText(/character name/i), "Torren");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText(/your concept has been submitted/i)).toBeInTheDocument();
  });

  it("shows a retry option on submission failure and succeeds when retried", async () => {
    const submitSpy = vi
      .spyOn(submitModule, "submitConcept")
      .mockResolvedValueOnce({ ok: false, error: "network error" });
    render(<Wizard />);

    await userEvent.type(screen.getByLabelText(/your name/i), "Sasha");
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /^human$/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /melee/i }));
    await userEvent.click(screen.getByRole("button", { name: /^none$/i }));
    await userEvent.click(screen.getByRole("button", { name: /loner/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /fighter/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /champion/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await completeAbilityScoresWithAuto();

    await userEvent.type(screen.getByLabelText(/character name/i), "Torren");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/network error/i);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeEnabled();

    submitSpy.mockResolvedValueOnce({ ok: true });
    await userEvent.click(submitButton);

    expect(await screen.findByText(/your concept has been submitted/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run components/wizard/__tests__/Wizard.test.tsx`
Expected: FAIL — the ability-scores and spell steps don't exist in `Wizard.tsx` yet, so the flow tests that click "choose my stats for me" / expect the spell heading will fail (element not found), and the flow tests that go straight from subclass to summary will fail because the ability-scores step now blocks them.

- [ ] **Step 3: Wire the new steps into `Wizard.tsx`**

Replace the full contents of `components/wizard/Wizard.tsx` with:

```tsx
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run components/wizard/__tests__/Wizard.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/wizard/Wizard.tsx components/wizard/__tests__/Wizard.test.tsx
git commit -m "feat: wire ability-score and spell-choice steps into the wizard flow"
```

---

### Task 6: `SummaryStep` — display the new answers

**Files:**
- Modify: `components/wizard/SummaryStep.tsx`
- Modify: `components/wizard/__tests__/SummaryStep.test.tsx`

**Interfaces:**
- Consumes: `classGrantsSpellcasting` (Task 1), the new `WizardAnswers` fields (Task 2).
- Produces: no new exports — `SummaryStep`'s rendered output gains an "Ability scores" row always, and a "Spell choice" row only when `classGrantsSpellcasting` is true for the chosen class/subclass.

- [ ] **Step 1: Write the failing tests**

Add to `components/wizard/__tests__/SummaryStep.test.tsx` (inside the existing `describe("SummaryStep", ...)` block, after the last `it`):

```tsx
  it("shows the ability score guidance, method, and any entered scores", () => {
    render(
      <SummaryStep
        answers={{
          ...EMPTY_ANSWERS,
          raceId: "human",
          classId: "barbarian",
          subclassId: "berserker",
          abilityScoreGuidance: "manual",
          abilityScoreMethod: "point-buy",
          abilityScores: { str: 15, dex: null, con: 14, int: null, wis: null, cha: null },
        }}
        onCharacterNameChange={vi.fn()}
      />,
    );

    expect(screen.getByText(/i'll build my own/i)).toBeInTheDocument();
    expect(screen.getByText(/point buy/i)).toBeInTheDocument();
    expect(screen.getByText(/str 15/i)).toBeInTheDocument();
    expect(screen.getByText(/con 14/i)).toBeInTheDocument();
  });

  it("shows the spell choice and Silvery Barbs note for a spellcasting class, and hides it for a non-caster", () => {
    const { rerender } = render(
      <SummaryStep
        answers={{
          ...EMPTY_ANSWERS,
          raceId: "human",
          classId: "wizard",
          subclassId: "evocation",
          spellChoiceMode: "suggestions",
        }}
        onCharacterNameChange={vi.fn()}
      />,
    );
    expect(screen.getByText(/getting a list of suggestions/i)).toBeInTheDocument();
    expect(screen.getByText(/silvery barbs/i)).toBeInTheDocument();

    rerender(
      <SummaryStep
        answers={{
          ...EMPTY_ANSWERS,
          raceId: "human",
          classId: "barbarian",
          subclassId: "berserker",
        }}
        onCharacterNameChange={vi.fn()}
      />,
    );
    expect(screen.queryByText(/silvery barbs/i)).not.toBeInTheDocument();
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run components/wizard/__tests__/SummaryStep.test.tsx`
Expected: FAIL — none of that text is rendered by the current `SummaryStep`.

- [ ] **Step 3: Implement the summary rows**

Replace the full contents of `components/wizard/SummaryStep.tsx` with:

```tsx
"use client";

import { classGrantsSpellcasting, getClass, getRace } from "@/lib/dnd-data";
import type {
  AbilityScoreGuidance,
  AbilityScoreMethod,
  AbilityScores,
  SpellChoiceMode,
  WizardAnswers,
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

const ABILITY_METHOD_LABELS: Record<AbilityScoreMethod, string> = {
  "standard-array": "Standard array",
  roll: "Roll for it (4d6, drop lowest)",
  "point-buy": "Point buy",
};

const SPELL_CHOICE_LABELS: Record<SpellChoiceMode, string> = {
  own: "Choosing all my own spells",
  suggestions: "Getting a list of suggestions",
  auto: "Having spells picked for me",
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

  const scoreValues = ABILITY_FIELD_ORDER.filter(
    (key) => answers.abilityScores?.[key] != null,
  ).map((key) => `${ABILITY_FIELD_LABELS[key]} ${answers.abilityScores?.[key]}`);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Review your concept</h2>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
        <dt className="font-medium">Race</dt>
        <dd>{subrace ? `${subrace.name} (${race?.name})` : race?.name ?? "—"}</dd>
        <dt className="font-medium">Class</dt>
        <dd>{cls?.name ?? "—"}</dd>
        <dt className="font-medium">Subclass</dt>
        <dd>{subclass?.name ?? "—"}</dd>
        <dt className="font-medium">Ability scores</dt>
        <dd>
          {answers.abilityScoreGuidance ? ABILITY_GUIDANCE_LABELS[answers.abilityScoreGuidance] : "—"}
          {answers.abilityScoreMethod ? ` — ${ABILITY_METHOD_LABELS[answers.abilityScoreMethod]}` : ""}
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run components/wizard/__tests__/SummaryStep.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/wizard/SummaryStep.tsx components/wizard/__tests__/SummaryStep.test.tsx
git commit -m "feat: show ability score and spell choice on the summary step"
```

---

### Task 7: Full-suite sanity check

**Files:** none (verification only)

- [ ] **Step 1: Run the entire test suite**

Run: `npx vitest run`
Expected: PASS — every test file in the project passes, including all files touched in Tasks 1-6 and any untouched wizard step tests (e.g. `ClassStep.test.tsx`, `RaceStep.test.tsx`) that exercise the same `dnd-data`/`wizard-storage` modules.

- [ ] **Step 2: Run the TypeScript/lint check the project uses**

Run: `npm run lint` (and `npx tsc --noEmit` if lint doesn't already type-check)
Expected: no errors.

No commit for this task — it's a verification checkpoint before considering the feature done.
