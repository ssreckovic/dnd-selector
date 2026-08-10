# Wizard: Ability Score Method + Spell Choice Design

## Goal

Add two new steps to the character concept wizard:

1. **Ability Scores** — let the player pick how much help they want determining their ability scores, and (optionally) which generation method they used.
2. **Spell Choice** — for spellcasting classes/subclasses, let the player pick how much help they want choosing spells, and surface a house rule banning Silvery Barbs.

Neither step performs real dice rolling, point-buy math, or spell-list lookups. This app has no spell data today; this feature records player *intent* (which mode they want) for the GM to fulfill outside the app, not a calculator or real spell catalog.

## Data model

### `lib/dnd-data.ts`

- Add `hasSpellcasting?: boolean` to the `Subclass` type. Set it `true` only on:
  - `fighter` → `eldritch-knight`
  - `rogue` → `arcane-trickster`
- Add `baseSpellcasting: boolean` to the `DndClass` type. Set it `true` for: `bard`, `cleric`, `druid`, `paladin`, `ranger`, `sorcerer`, `warlock`, `wizard`. `false` for all others (including `fighter` and `rogue`, since their base class doesn't cast).
- Add a helper:

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

### `lib/wizard-storage.ts`

Extend `WizardAnswers`:

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

export type WizardAnswers = {
  // ...existing fields...
  abilityScoreGuidance: AbilityScoreGuidance | null;
  abilityScoreMethod: AbilityScoreMethod | null;
  abilityScores: AbilityScores | null;
  spellChoiceMode: SpellChoiceMode | null;
};
```

Update `EMPTY_ANSWERS` with `abilityScoreGuidance: null`, `abilityScoreMethod: null`, `abilityScores: null`, `spellChoiceMode: null`.

No validation is performed on `abilityScores` values — they are trusted, optional, plain numbers (or `null`) typed in by the player.

## Flow changes

`Wizard.tsx`'s `STEPS` becomes:

```ts
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
```

The `"spell"` step is conditionally skipped when `!classGrantsSpellcasting(answers.classId, answers.subclassId)`. Add a helper used by both `goBack` and `goNext`:

```ts
function nextVisibleStep(
  fromIndex: number,
  direction: 1 | -1,
  answers: WizardAnswers,
): Step {
  let i = fromIndex + direction;
  while (
    i > 0 &&
    i < STEPS.length - 1 &&
    STEPS[i] === "spell" &&
    !classGrantsSpellcasting(answers.classId, answers.subclassId)
  ) {
    i += direction;
  }
  return STEPS[i];
}
```

The `"spell"` step's render block is additionally guarded by the same `classGrantsSpellcasting(...)` check (defense in depth, matching the existing `step === "subclass" && answers.classId` pattern), so direct state weirdness can't render it for a non-caster.

`canAdvance` and `validationHint` gain `"spell"` and `"ability-scores"` cases (below).

## AbilityScoreStep

New file: `components/wizard/AbilityScoreStep.tsx`.

Props: `abilityScoreGuidance`, `abilityScoreMethod`, `abilityScores`, `onChange(partial: Partial<WizardAnswers>)`.

UI:

1. Three primary cards (radio-button-like selection, matching existing step styling):
   - "Choose my stats for me" → `abilityScoreGuidance: "auto"`. Also clears `abilityScoreMethod`/`abilityScores` if switching away from manual/guided. No numbers are ever filled in for this option — it just records the player's preference for the GM.
   - "I'll build my own" → `abilityScoreGuidance: "manual"`.
   - "Walk me through it" → `abilityScoreGuidance: "guided"`.
2. If `abilityScoreGuidance` is `"manual"` or `"guided"`: show a second row of three method cards:
   - "Standard array" / "Roll for it (4d6, drop lowest)" / "Point buy" → sets `abilityScoreMethod`.
   - When `abilityScoreGuidance === "guided"`, each card additionally shows a one-line description of what that method involves (still descriptive text only, no calculation).
3. Once `abilityScoreMethod` is set (manual or guided): show six plain number inputs, one per ability (STR/DEX/CON/INT/WIS/CHA), bound to `abilityScores.<key>`, fully optional.

`canAdvance("ability-scores", answers)`:

```ts
case "ability-scores":
  if (answers.abilityScoreGuidance === "auto") return true;
  return Boolean(answers.abilityScoreGuidance && answers.abilityScoreMethod);
```

`validationHint("ability-scores", answers)`:
- No guidance chosen yet → `"Choose how you'd like to determine your ability scores."`
- Guidance chosen (manual/guided) but no method → `"Choose a method to continue."`

## SpellChoiceStep

New file: `components/wizard/SpellChoiceStep.tsx`. Only reachable when `classGrantsSpellcasting(answers.classId, answers.subclassId)` is true.

Props: `spellChoiceMode`, `onSelectSpellChoiceMode(mode: SpellChoiceMode)`.

UI:

1. A persistent notice banner at the top, always visible regardless of selection:
   > House rule: **Silvery Barbs** is not an allowed spell in this game.
2. Three selectable cards, each with a one-line description (recorded intent only, no real spell list yet):
   - "I'll choose all my own spells" → `spellChoiceMode: "own"`
   - "Give me a list of suggestions" → `spellChoiceMode: "suggestions"`
   - "Pick my spells for me" → `spellChoiceMode: "auto"`

`canAdvance("spell", answers)`: `Boolean(answers.spellChoiceMode)`.

`validationHint("spell", answers)`: `"Choose how you'd like to handle spell selection to continue."`

## SummaryStep updates

Add read-only lines to `components/wizard/SummaryStep.tsx`:

- Ability scores: show `abilityScoreGuidance` (friendly label), and if set, `abilityScoreMethod` and any filled-in `abilityScores` values.
- Spell choice: only rendered when `classGrantsSpellcasting(answers.classId, answers.subclassId)` is true — show `spellChoiceMode` (friendly label) and repeat the Silvery Barbs house-rule note.

## Testing

- `components/wizard/__tests__/AbilityScoreStep.test.tsx`: cards render and call `onChange` with the right partial; method row and number inputs only appear after guidance is selected; number inputs don't block advancing.
- `components/wizard/__tests__/SpellChoiceStep.test.tsx`: cards render and call the callback correctly; Silvery Barbs banner text is always present.
- `Wizard.test.tsx` (integration): 
  - Non-caster path (e.g. barbarian) skips the `"spell"` step entirely in both `goNext` and `goBack`.
  - Base-caster path (e.g. wizard) shows `"spell"`.
  - Subclass-caster paths (fighter → eldritch-knight, rogue → arcane-trickster) show `"spell"`; other subclasses of those same classes (e.g. fighter → champion) do not.
  - `"ability-scores"` gating: `"auto"` advances immediately; `"manual"`/`"guided"` require a method; number inputs are never required.
- No changes needed to `lib/submit.ts` beyond it already forwarding the full `WizardAnswers` object.

## Out of scope

- No real spell data/catalog, no point-buy cost validation, no dice-rolling logic, no per-class stat-priority auto-assignment. All of these are explicitly deferred — this feature only records the player's chosen *mode* for each concern.
