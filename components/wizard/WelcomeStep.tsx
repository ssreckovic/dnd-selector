"use client";

import type { EffortLevel } from "@/lib/wizard-storage";

type WelcomeStepProps = {
  playerName: string;
  onPlayerNameChange: (name: string) => void;
  effortLevel: EffortLevel | null;
  onSelectEffort: (effortLevel: EffortLevel) => void;
};

const EFFORT_OPTIONS: { value: EffortLevel; label: string; blurb: string }[] = [
  {
    value: "minimal",
    label: "Minimal",
    blurb: "Just tell me your race and class — I'll fill in the rest.",
  },
  {
    value: "some",
    label: "Some",
    blurb:
      "I'll pick race, class, subclass, and my ability scores. Handle the details for me.",
  },
  {
    value: "all",
    label: "All",
    blurb: "I want to make every choice myself.",
  },
];

export function WelcomeStep({
  playerName,
  onPlayerNameChange,
  effortLevel,
  onSelectEffort,
}: WelcomeStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Build your character concept</h1>
      <p className="text-zinc-600">
        Answer a few questions about the kind of hero you want to play. No
        rules knowledge needed — we&apos;ll turn your answers into a race,
        class, and subclass for your GM to finish building your level 3
        character sheet.
      </p>
      <label className="flex flex-col gap-1" htmlFor="player-name">
        <span className="font-medium">Your name</span>
        <input
          id="player-name"
          aria-label="Your name"
          className="rounded border border-zinc-300 px-3 py-2"
          value={playerName}
          onChange={(e) => onPlayerNameChange(e.target.value)}
          placeholder="e.g. Sasha"
        />
      </label>
      <div className="flex flex-col gap-2">
        <span className="font-medium">How much effort do you want to put in?</span>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {EFFORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelectEffort(option.value)}
              aria-pressed={option.value === effortLevel}
              className={`rounded border p-4 text-left transition-colors ${
                option.value === effortLevel
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
    </div>
  );
}
