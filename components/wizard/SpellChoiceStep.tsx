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
            aria-pressed={option.value === spellChoiceMode}
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
