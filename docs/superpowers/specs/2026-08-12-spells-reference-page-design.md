# Spells Reference Page Design

## Goal

A standalone page, separate from the wizard, that shows what spells a class has access to — grouped as Cantrips / Level 1 / Level 2, stopping at level 2. Covers the 8 base spellcasting classes (Bard, Cleric, Druid, Paladin, Ranger, Sorcerer, Warlock, Wizard) — subclass-granted casters (Eldritch Knight, Arcane Trickster) are out of scope since they're not full casters and don't fit a "class spell list" model.

There is currently no spell catalog anywhere in this app. This is greenfield static data, compiled from standard SRD-style 5e spell lists.

## Data model

New file: `lib/spell-data.ts`

```ts
export type SpellLevel = "cantrip" | "1" | "2";

export type ClassSpellList = {
  classId: string; // matches DndClass.id in lib/dnd-data.ts
  cantrips: string[];
  level1: string[];
  level2: string[];
};

export const CLASS_SPELL_LISTS: ClassSpellList[] = [
  // one entry per: bard, cleric, druid, paladin, ranger, sorcerer, warlock, wizard
];

export function getClassSpellList(classId: string): ClassSpellList | undefined {
  return CLASS_SPELL_LISTS.find((l) => l.classId === classId);
}
```

Note: Paladin and Ranger don't get spells until level 2 in 5e (no cantrips, and their "level 1 spells" aren't available at character level 1) — their entries should reflect that plainly (e.g. an empty `cantrips` array), rather than inventing spells they wouldn't have yet. The page should render an empty section as "None yet at this level" rather than hiding it, so the structure stays consistent across classes.

Spell names are plain strings only (no descriptions, damage, ranges, etc.) — this is a browsing reference, not a rules lookup tool.

## Routing

New route: `app/spells/page.tsx` (App Router page, client component since it reads `useSearchParams`).

- Reads an optional `class` query param (a `classId`).
- Renders a class picker (only the 8 caster classes, reusing `InfoCard` or a simpler button list — no need for full lore detail here, just name + short blurb from `getClass(classId)`).
- Below the picker, if a class is selected (via query param or picker click), renders three sections — Cantrips, Level 1, Level 2 — each a plain bulleted list of spell names from `getClassSpellList`.
- Selecting a class in the picker updates the URL query param (`router.replace`) so the page is linkable/shareable per class.

## Entry points

1. **`ClassStep.tsx`**: each caster class's `InfoCard` (where `baseSpellcasting` is true) gets a small "See {class} spells" link to `/spells?class={classId}`, opened in a new tab (`target="_blank"`) so it doesn't interrupt the in-progress wizard (which persists to `localStorage` regardless).
2. **`SummaryStep.tsx`**: when `classGrantsSpellcasting(answers.classId, answers.subclassId)` is true, add a "See spell options" link to `/spells?class={answers.classId}`, also `target="_blank"`.

Both links are plain, no new shared component required — a single `<a>` styled consistently with existing link styling (see the "Show all subclasses" button in `SubclassStep.tsx` for the existing text-link style).

## Testing

- `lib/spell-data.test.ts`: every entry in `CLASS_SPELL_LISTS` has a `classId` that exists in `CLASSES` and is a base caster (`baseSpellcasting: true`); all 8 base casters are covered exactly once.
- `app/spells/page.test.tsx`: picker renders all 8 caster classes; selecting one shows its three level sections; a class with no cantrips (Paladin/Ranger) shows "None yet at this level" instead of an empty list; `?class=wizard` in the URL pre-selects Wizard on load.
- `ClassStep.test.tsx` / `SummaryStep.test.tsx`: new spell-page link renders with the right `href` and `target="_blank"` for caster classes/selections, and is absent for non-casters.

## Out of scope

- No spell descriptions, ranges, damage, or mechanics — names only.
- No coverage of subclass-granted casters (Eldritch Knight, Arcane Trickster) or spells above level 2.
- No search/filter UI on the spells page beyond the class picker.
