# Remove Personality/Flavor Step Design

## Goal

Remove the "What's your playstyle?" (flavor/personality) step from the wizard entirely. `ClassStep` stops ranking/recommending classes based on it and just shows all classes plainly.

## Flow changes

### `components/wizard/Wizard.tsx`

- Remove `"flavor"` from `STEPS`.
- Remove the `FlavorStep` import, its render block, the `flavorAnswers` derivation, and the `case "flavor"` branches in `isStepComplete`/`validationHint`.
- `ClassStep` no longer receives a `flavorAnswers` prop.

### `components/wizard/ClassStep.tsx`

Drop the `flavorAnswers` prop and the `scoreClasses`/`recommendedIds` logic. Render `CLASSES` directly, in their existing declared order, with no `badge`:

```tsx
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

## Data model cleanup

- Delete `lib/scoring.ts` (`scoreClasses`, `CombatRole`, `MagicInterest`, `SocialStyle`, `FlavorAnswers`) — nothing else uses it once `FlavorStep`/`ClassStep` stop importing it.
- Delete `components/wizard/FlavorStep.tsx` and its test file.
- Remove `combatRole`, `magicInterest`, `socialStyle` from `WizardAnswers` and `EMPTY_ANSWERS` in `lib/wizard-storage.ts`.
- Remove those three fields from the POST body in `lib/submit.ts` and the matching columns in `google-apps-script/Code.gs`.

## Testing

- Delete `FlavorStep.test.tsx`.
- Update `ClassStep.test.tsx`: drop any test asserting "Recommended for you" badges or ranking order; keep tests for selection/rendering of all classes and `InfoCard`'s show-info toggle.
- Update `Wizard.test.tsx`: remove any test that navigates through/relies on the `"flavor"` step; step order assertions change to `welcome → race → class → subclass → spell → ability-scores → summary`.
- Confirm no other file imports from `lib/scoring` (grep before deleting).

## Out of scope

- No replacement mechanism for class suggestions is being added. This is a straight removal, not a redesign of how classes are chosen.
