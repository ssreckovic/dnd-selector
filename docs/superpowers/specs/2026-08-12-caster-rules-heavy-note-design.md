# Caster Rules-Heavy Note Design

## Goal

When a player selects a base spellcasting class on `ClassStep` (Bard, Cleric, Druid, Paladin, Ranger, Sorcerer, Warlock, Wizard), show an inline note that casters are more rules-heavy. Classes that only *optionally* gain spellcasting via a subclass (Fighter/Eldritch Knight, Rogue/Arcane Trickster) do **not** trigger this note on `ClassStep` — that's out of scope per the design discussion.

## Component changes

### `components/wizard/ClassStep.tsx`

After the class grid, conditionally render a note when the currently-selected class has `baseSpellcasting: true`:

```tsx
const selectedClass = classId ? getClass(classId) : undefined;

// ...after the grid:
{selectedClass?.baseSpellcasting && (
  <p className="rounded border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
    Spellcasters like {selectedClass.name}s have more rules to track in play — spell slots, prepared
    spells, and more. That's okay if you're up for it!
  </p>
)}
```

Placed below the grid (not per-card) since it reflects the current *selection*, not a hover state — simpler to implement correctly and avoids a note flickering per-card on every mouse movement across the grid.

No new props needed — `classId` is already passed in; `getClass` is already imported from `lib/dnd-data`.

## Testing

- `ClassStep.test.tsx`: selecting a base-caster class (e.g. Wizard) shows the note; selecting a non-caster class (e.g. Barbarian, Fighter) shows no note, even though Fighter has an Eldritch Knight subclass option.

## Out of scope

- No note on `SubclassStep` for subclass-granted spellcasting (Eldritch Knight, Arcane Trickster) — explicitly excluded per the design discussion.
- No change to `classGrantsSpellcasting` or any other spellcasting-detection logic; this only reads `baseSpellcasting` directly.
