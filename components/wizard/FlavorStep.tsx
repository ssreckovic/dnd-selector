"use client";

import type { CombatRole, FlavorAnswers, MagicInterest, SocialStyle } from "@/lib/scoring";

type FlavorStepProps = {
  combatRole: CombatRole | null;
  magicInterest: MagicInterest | null;
  socialStyle: SocialStyle | null;
  onChange: (partial: Partial<FlavorAnswers>) => void;
};

const COMBAT_ROLE_OPTIONS: { value: CombatRole; label: string }[] = [
  { value: "melee", label: "Melee — right in the thick of it" },
  { value: "ranged", label: "Ranged — keep enemies at a distance" },
  { value: "support", label: "Support — heal and protect the party" },
  { value: "avoid", label: "Prefer to avoid combat" },
];

const MAGIC_INTEREST_OPTIONS: { value: MagicInterest; label: string }[] = [
  { value: "none", label: "None" },
  { value: "little", label: "A little" },
  { value: "lot", label: "A lot" },
];

const SOCIAL_STYLE_OPTIONS: { value: SocialStyle; label: string }[] = [
  { value: "leader", label: "Leader" },
  { value: "face", label: "Face-talker" },
  { value: "sneaky", label: "Sneaky" },
  { value: "loner", label: "Loner" },
];

function OptionGroup<T extends string>({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: { value: T; label: string }[];
  selected: T | null;
  onSelect: (value: T) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={option.value === selected}
            onClick={() => onSelect(option.value)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              option.value === selected
                ? "border-amber-600 bg-amber-50"
                : "border-zinc-300 hover:bg-zinc-50"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function FlavorStep({
  combatRole,
  magicInterest,
  socialStyle,
  onChange,
}: FlavorStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">What's your playstyle?</h2>
      <OptionGroup
        title="How do you want to fight?"
        options={COMBAT_ROLE_OPTIONS}
        selected={combatRole}
        onSelect={(value) => onChange({ combatRole: value })}
      />
      <OptionGroup
        title="How interested are you in casting spells?"
        options={MAGIC_INTEREST_OPTIONS}
        selected={magicInterest}
        onSelect={(value) => onChange({ magicInterest: value })}
      />
      <OptionGroup
        title="What's your role in the group?"
        options={SOCIAL_STYLE_OPTIONS}
        selected={socialStyle}
        onSelect={(value) => onChange({ socialStyle: value })}
      />
    </div>
  );
}
