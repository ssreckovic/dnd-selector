# Effort Level Design

## Goal

Right after entering their name, let the player say how much effort they want to put into building their character:

- **All** — today's full wizard, unchanged.
- **Some** — player still picks race, class, subclass, and ability scores themselves. The spell step still appears (for casters), but defaults to "pick spells for me" with a note that they can choose their own instead.
- **Minimal** — player only picks race and class. Subclass, ability scores, and spell choice (for casters) are auto-filled with reasonable defaults and their steps are skipped entirely.

This is independent of [[2026-08-12-remove-flavor-step-design]] (the flavor step is gone regardless of effort level) and interacts with [[2026-08-12-caster-rules-heavy-note-design]] only in that both live on/near `ClassStep`.

## Data model

### `lib/wizard-storage.ts`

```ts
export type EffortLevel = "minimal" | "some" | "all";
```

Add `effortLevel: EffortLevel | null` to `WizardAnswers`, defaulting to `null` in `EMPTY_ANSWERS`.

## Flow changes

### `components/wizard/Wizard.tsx`

`isStepComplete("welcome", ...)` becomes:

```ts
case "welcome":
  return answers.playerName.trim().length > 0 && answers.effortLevel !== null;
```

`validationHint("welcome", ...)`: `"Enter your name and choose how much you'd like to build yourself to continue."`

`isStepVisible` gains minimal-effort skips:

```ts
function isStepVisible(step: Step, answers: WizardAnswers): boolean {
  if (step === "subclass" || step === "ability-scores") {
    return answers.effortLevel !== "minimal";
  }
  if (step === "spell") {
    return (
      classGrantsSpellcasting(answers.classId, answers.subclassId) &&
      answers.effortLevel !== "minimal"
    );
  }
  return true;
}
```

Add a helper, called from the effort selector and from `onSelectClass`:

```ts
function applyEffortLevel(
  effortLevel: EffortLevel,
  answers: WizardAnswers,
): Partial<WizardAnswers> {
  if (effortLevel === "all") {
    return { effortLevel, abilityScoreGuidance: null, spellChoiceMode: null };
  }
  const cls = answers.classId ? getClass(answers.classId) : undefined;
  const subclassId =
    effortLevel === "minimal"
      ? answers.subclassId ?? cls?.defaultSubclasses[0]?.id ?? null
      : answers.subclassId;
  const isCaster = classGrantsSpellcasting(answers.classId, subclassId);
  return {
    effortLevel,
    subclassId,
    abilityScoreGuidance: effortLevel === "minimal" ? "auto" : answers.abilityScoreGuidance,
    spellChoiceMode: isCaster ? "auto" : answers.spellChoiceMode,
  };
}
```

- `WelcomeStep`'s effort selector calls `onSelectEffort(effortLevel)`, which does `updateAnswers(applyEffortLevel(effortLevel, answers))`.
- `onSelectClass` (in `Wizard.tsx`) re-derives subclass/spell defaults for the current effort level after the class changes:

  ```ts
  onSelectClass={(classId) =>
    updateAnswers({
      classId,
      subclassId: null,
      spellChoiceMode: null,
      ...(answers.effortLevel
        ? applyEffortLevel(answers.effortLevel, { ...answers, classId, subclassId: null })
        : {}),
    })
  }
  ```

  (Concretely: reset first, then re-apply the effort defaults so a class switch doesn't leave a stale subclass/spell default from the previous class.)

- Switching effort level away from `"minimal"` clears `abilityScoreGuidance`/`spellChoiceMode` back to `null` so the player is prompted to make a real choice on those now-visible steps, per `applyEffortLevel("all", ...)` above. Switching from `"all"` to `"some"` only sets `spellChoiceMode` to `"auto"` (ability scores stay a real step in "some").

## WelcomeStep

`components/wizard/WelcomeStep.tsx` gains an `effortLevel` prop and `onSelectEffort` callback, plus three selectable cards below the name input (reuse the existing selectable-card visual pattern, not necessarily `InfoCard` since there's no lore detail list):

- **Minimal** — "Just tell me your race and class — I'll fill in the rest."
- **Some** — "I'll pick race, class, subclass, and my ability scores. Handle the details for me."
- **All** — "I want to make every choice myself."

## SpellChoiceStep copy

When `effortLevel === "some"`, `SpellChoiceStep` shows an additional line above the three cards: "We've defaulted to picking spells for you and sending a shortlist — choose one of the options below if you'd like to do it yourself instead." The `"auto"` card is pre-selected (via `spellChoiceMode` already being `"auto"` from `applyEffortLevel`). No prop changes needed beyond what already flows through `spellChoiceMode`; only the conditional copy is new, and it needs the `effortLevel` prop threaded down from `Wizard.tsx`.

## SummaryStep / submit

No new fields to display beyond effort level itself: add a `dt`/`dd` pair to `SummaryStep.tsx` showing the friendly label ("Minimal" / "Some" / "All"). `lib/submit.ts` includes `effortLevel: answers.effortLevel ?? null` in the POST body; `google-apps-script/Code.gs` gets a matching sheet column.

## Testing

- `WelcomeStep.test.tsx`: effort cards render, call `onSelectEffort` with the right value, selected state reflects `effortLevel`.
- `Wizard.test.tsx` (integration):
  - Minimal: after picking race + class, `subclass`, `spell`, and `ability-scores` steps are skipped in both `goNext`/`goBack`; summary shows an auto-picked subclass and (for casters) `spellChoiceMode: "auto"`.
  - Some: subclass and ability-scores steps are shown; spell step (for casters) is shown with `"auto"` pre-selected and can be changed to `"own"`/`"suggestions"`.
  - All: unchanged existing behavior.
  - Switching effort level after answers exist re-applies the derivation rules above.

## Out of scope

- No real "auto-fill" logic for ability score *values* — minimal/some effort only sets `abilityScoreGuidance: "auto"`; it never fills in `abilityScores` numbers, matching the existing "auto" behavior for the ability-scores step.
- No change to what "auto" subclass/spell selection means downstream (GM still fulfills it) — this only decides which defaults get recorded and which steps are shown.
