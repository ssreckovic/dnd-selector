# Remove Flavor Step Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the "What's your playstyle?" (flavor/personality) step from the character wizard, and stop `ClassStep` from ranking/recommending classes based on it.

**Architecture:** Delete the `"flavor"` step from `Wizard.tsx`'s step machine and its render block; strip the `flavorAnswers` prop and scoring-based ordering out of `ClassStep.tsx`; delete the now-dead `lib/scoring.ts` module and `FlavorStep.tsx` component; remove the three flavor fields from `WizardAnswers`.

**Tech Stack:** Next.js (App Router), React, TypeScript, Vitest + React Testing Library + `@testing-library/user-event`.

## Global Constraints

- Spec source of truth: `docs/superpowers/specs/2026-08-12-remove-flavor-step-design.md`.
- `lib/submit.ts` and `google-apps-script/Code.gs` do **not** reference `combatRole`/`magicInterest`/`socialStyle` today (confirmed by grep) — no changes needed there.
- Run `npx vitest run` (not watch mode) after each task's test file changes.
- Every deleted file's corresponding test file is deleted in the same task that removes the file's last usage — never leave a test importing a module that's been deleted.

---

### Task 1: Remove the flavor step from `Wizard.tsx` and its integration tests

**Files:**
- Modify: `components/wizard/Wizard.tsx`
- Modify: `components/wizard/__tests__/Wizard.test.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: `Wizard.tsx`'s `STEPS` becomes `["welcome", "race", "class", "subclass", "spell", "ability-scores", "summary"]` — later tasks (Task 2) rely on `ClassStep` no longer receiving a `flavorAnswers` prop from here.

- [ ] **Step 1: Update `Wizard.test.tsx` to drop every flavor-step interaction**

Every test currently clicks `melee` → `none` → `loner` → `next` right after the race step. Remove those four lines from each test, and rename the one test whose title mentions "flavor". Apply this to `components/wizard/__tests__/Wizard.test.tsx`:

1. In `"clears localStorage after a successful submission"`, delete:
   ```ts
   await userEvent.click(screen.getByRole("button", { name: /melee/i }));
   await userEvent.click(screen.getByRole("button", { name: /^none$/i }));
   await userEvent.click(screen.getByRole("button", { name: /loner/i }));
   await userEvent.click(screen.getByRole("button", { name: /next/i }));
   ```
   (the block right after the human-race click, before `fighter`).

2. Rename `"walks forward through race, flavor, class, subclass, and ability scores to the summary, and back again"` to `"walks forward through race, class, subclass, and ability scores to the summary, and back again"`, and delete its `// Flavor step` block:
   ```ts
   // Flavor step
   await userEvent.click(screen.getByRole("button", { name: /melee/i }));
   await userEvent.click(screen.getByRole("button", { name: /^none$/i }));
   await userEvent.click(screen.getByRole("button", { name: /loner/i }));
   await userEvent.click(screen.getByRole("button", { name: /next/i }));
   ```

3. In `"shows the spell choice step for a base spellcasting class"`, delete the same 4-line block after the human-race click.

4. In `"shows the spell choice step for a fighter who picks the spellcasting Eldritch Knight subclass"`, delete the same 4-line block.

5. In `"shows a hint but still allows advancing past ability scores before a method is chosen"`, delete the same 4-line block.

6. In `"clears a previously chosen spell choice mode when switching to a non-caster class"`, delete the same 4-line block. Note this test also clicks `back` twice to return to the class step — since there's one fewer step now, change:
   ```ts
   await userEvent.click(screen.getByRole("button", { name: /back/i }));
   await userEvent.click(screen.getByRole("button", { name: /back/i }));
   ```
   to a single:
   ```ts
   await userEvent.click(screen.getByRole("button", { name: /back/i }));
   ```
   (from the spell step, one `back` now lands on `class`, since `subclass` sits directly before `spell` and `class` sits directly before `subclass` — verify by reading the surrounding test: it goes spell-mode-select → back → back → barbarian click. With flavor removed there is one fewer intermediate step between the point where spell mode was set and the class step, so drop one `back` call.)

7. In `"submits the concept and shows a confirmation on success"`, delete the same 4-line block.

8. In `"shows a retry option on submission failure and succeeds when retried"`, delete the same 4-line block.

- [ ] **Step 2: Run the test file to confirm it fails against the unmodified component**

Run: `npx vitest run components/wizard/__tests__/Wizard.test.tsx`
Expected: FAIL — tests now expect no flavor step, but `Wizard.tsx` still renders and requires it (e.g. clicking `next` after race lands on the flavor step, not class, so the subsequent `fighter`/`wizard`/`barbarian` click won't find its button).

- [ ] **Step 3: Remove the flavor step from `Wizard.tsx`**

Remove the `FlavorStep` import:
```ts
import { FlavorStep } from "@/components/wizard/FlavorStep";
```

Change `STEPS`:
```ts
const STEPS = [
  "welcome",
  "race",
  "class",
  "subclass",
  "spell",
  "ability-scores",
  "summary",
] as const;
```

Remove the `case "flavor":` branch from `isStepComplete`:
```ts
case "flavor":
  return Boolean(
    answers.combatRole && answers.magicInterest && answers.socialStyle,
  );
```

Remove the `case "flavor":` branch from `validationHint`:
```ts
case "flavor":
  return "Answer all three questions to continue.";
```

Remove the `flavorAnswers` derivation block right before the returned JSX:
```ts
const flavorAnswers =
  answers.combatRole && answers.magicInterest && answers.socialStyle
    ? {
        combatRole: answers.combatRole,
        magicInterest: answers.magicInterest,
        socialStyle: answers.socialStyle,
      }
    : null;
```

Remove the `{step === "flavor" && (...)}` render block:
```tsx
{step === "flavor" && (
  <FlavorStep
    combatRole={answers.combatRole}
    magicInterest={answers.magicInterest}
    socialStyle={answers.socialStyle}
    onChange={(partial) => updateAnswers(partial)}
  />
)}
```

In the `{step === "class" && (...)}` block, remove the `flavorAnswers` prop:
```tsx
{step === "class" && (
  <ClassStep
    classId={answers.classId}
    onSelectClass={(classId) =>
      updateAnswers({
        classId,
        subclassId: null,
        ...(classGrantsSpellcasting(classId, null) ? {} : { spellChoiceMode: null }),
      })
    }
  />
)}
```

- [ ] **Step 4: Run the test file again to confirm it passes**

Run: `npx vitest run components/wizard/__tests__/Wizard.test.tsx`
Expected: PASS (all tests green). Note: `ClassStep.tsx` still has a required `flavorAnswers` prop in its type at this point, so TypeScript will error even though the Vitest run (which uses esbuild transforms, not full type-checking) may still pass at runtime. That type error is resolved in Task 2 — do not attempt to fix `ClassStep.tsx` in this task.

- [ ] **Step 5: Commit**

```bash
git add components/wizard/Wizard.tsx components/wizard/__tests__/Wizard.test.tsx
git commit -m "Remove flavor step from wizard flow"
```

---

### Task 2: Strip flavor-based ranking out of `ClassStep.tsx`

**Files:**
- Modify: `components/wizard/ClassStep.tsx`
- Modify: `components/wizard/__tests__/ClassStep.test.tsx`

**Interfaces:**
- Consumes: `CLASSES` from `lib/dnd-data` (unchanged), `InfoCard` from `components/wizard/InfoCard` (unchanged).
- Produces: `ClassStep` component with props `{ classId: string | null; onSelectClass: (classId: string) => void }` — no `flavorAnswers` prop. This is what Task 1's `Wizard.tsx` change already assumes.

- [ ] **Step 1: Rewrite `ClassStep.test.tsx` to drop flavor/ranking assertions**

Replace the full contents of `components/wizard/__tests__/ClassStep.test.tsx` with:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClassStep } from "@/components/wizard/ClassStep";

describe("ClassStep", () => {
  it("renders all 12 classes", () => {
    render(<ClassStep classId={null} onSelectClass={vi.fn()} />);
    expect(screen.getAllByRole("button", { name: /show info/i })).toHaveLength(12);
  });

  it("does not show any recommendation badges", () => {
    render(<ClassStep classId={null} onSelectClass={vi.fn()} />);
    expect(screen.queryByText(/recommended for you/i)).not.toBeInTheDocument();
  });

  it("reports the selected class", async () => {
    const onSelectClass = vi.fn();
    render(<ClassStep classId={null} onSelectClass={onSelectClass} />);
    await userEvent.click(screen.getByRole("button", { name: /wizard/i }));
    expect(onSelectClass).toHaveBeenCalledWith("wizard");
  });
});
```

- [ ] **Step 2: Run the test file to confirm it fails against the unmodified component**

Run: `npx vitest run components/wizard/__tests__/ClassStep.test.tsx`
Expected: FAIL — `ClassStep` still requires a `flavorAnswers` prop (TypeScript) and/or still renders "Recommended for you" badges when scoring produces ties (runtime behavior mismatch with the new "no badges ever" test).

- [ ] **Step 3: Rewrite `ClassStep.tsx`**

Replace the full contents of `components/wizard/ClassStep.tsx` with:

```tsx
"use client";

import { CLASSES } from "@/lib/dnd-data";
import { InfoCard } from "@/components/wizard/InfoCard";

type ClassStepProps = {
  classId: string | null;
  onSelectClass: (classId: string) => void;
};

export function ClassStep({ classId, onSelectClass }: ClassStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Choose your class</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CLASSES.map((cls) => (
          <InfoCard
            key={cls.id}
            name={cls.name}
            blurb={cls.blurb}
            detail={cls.detail}
            selected={cls.id === classId}
            onSelect={() => onSelectClass(cls.id)}
          />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run the test file again to confirm it passes**

Run: `npx vitest run components/wizard/__tests__/ClassStep.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/wizard/ClassStep.tsx components/wizard/__tests__/ClassStep.test.tsx
git commit -m "Stop ClassStep from ranking classes by flavor answers"
```

---

### Task 3: Delete dead flavor code and shrink `WizardAnswers`

**Files:**
- Delete: `components/wizard/FlavorStep.tsx`
- Delete: `components/wizard/__tests__/FlavorStep.test.tsx`
- Delete: `lib/scoring.ts`
- Delete: `lib/__tests__/scoring.test.ts`
- Modify: `lib/wizard-storage.ts`

**Interfaces:**
- Consumes: nothing (this task only removes now-unused code; Tasks 1–2 already removed every import of these modules).
- Produces: `WizardAnswers` with no `combatRole`/`magicInterest`/`socialStyle` fields — final shape for the rest of this plan and for later features (e.g. the effort-level feature) to build on.

- [ ] **Step 1: Confirm nothing still imports the modules being deleted**

Run: `grep -rn "FlavorStep\|from \"@/lib/scoring\"\|lib/scoring" --include="*.ts" --include="*.tsx" components lib app`
Expected: no output (after Tasks 1–2, the only remaining references are inside the files this task deletes and inside `lib/wizard-storage.ts`'s type imports, handled below).

- [ ] **Step 2: Delete the four dead files**

```bash
git rm components/wizard/FlavorStep.tsx components/wizard/__tests__/FlavorStep.test.tsx lib/scoring.ts lib/__tests__/scoring.test.ts
```

- [ ] **Step 3: Update `lib/wizard-storage.ts`**

Remove the type import:
```ts
import type { CombatRole, MagicInterest, SocialStyle } from "@/lib/scoring";
```

Remove these three fields from the `WizardAnswers` type:
```ts
combatRole: CombatRole | null;
magicInterest: MagicInterest | null;
socialStyle: SocialStyle | null;
```

Remove these three fields from `EMPTY_ANSWERS`:
```ts
combatRole: null,
magicInterest: null,
socialStyle: null,
```

The resulting `WizardAnswers` type and `EMPTY_ANSWERS` const should read:

```ts
export type WizardAnswers = {
  playerName: string;
  raceId: string | null;
  subraceId: string | null;
  classId: string | null;
  subclassId: string | null;
  abilityScoreGuidance: AbilityScoreGuidance | null;
  abilityScoreMethod: AbilityScoreMethod | null;
  abilityScores: AbilityScores | null;
  spellChoiceMode: SpellChoiceMode | null;
  characterName: string;
};

export const EMPTY_ANSWERS: WizardAnswers = {
  playerName: "",
  raceId: null,
  subraceId: null,
  classId: null,
  subclassId: null,
  abilityScoreGuidance: null,
  abilityScoreMethod: null,
  abilityScores: null,
  spellChoiceMode: null,
  characterName: "",
};
```

- [ ] **Step 4: Run the full test suite and the TypeScript compiler**

Run: `npx vitest run`
Expected: PASS — every test file, including `Wizard.test.tsx` and `ClassStep.test.tsx` from Tasks 1–2.

Run: `npx tsc --noEmit`
Expected: no errors. This is the check that would have caught a stray `flavorAnswers`/`combatRole` reference anywhere else in the codebase (e.g. `lib/submit.ts`, `SummaryStep.tsx`) that grep might miss due to destructuring or spread patterns.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Delete flavor scoring module and shrink WizardAnswers"
```

---

## Self-Review Notes

- **Spec coverage:** Wizard step removal (Task 1), `ClassStep` simplification (Task 2), deletion of `FlavorStep.tsx`/`lib/scoring.ts`/their tests and the three `WizardAnswers` fields (Task 3) all map directly to the spec's "Flow changes" and "Data model cleanup" sections. The spec also mentions removing flavor fields from `lib/submit.ts`/`google-apps-script/Code.gs` — confirmed via grep during planning that neither file references them today, so no task touches those files.
- **Type consistency:** `ClassStep` props (`classId`, `onSelectClass`) match exactly between Task 1's `Wizard.tsx` usage and Task 2's component definition. `WizardAnswers` in Task 3 matches what Task 1/2 already assume (no `flavorAnswers`/`combatRole`/etc. anywhere).
- **Placeholder scan:** no TBDs; every step has literal code or an exact command.
