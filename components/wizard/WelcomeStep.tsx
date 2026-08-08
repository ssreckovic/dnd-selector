"use client";

type WelcomeStepProps = {
  playerName: string;
  onPlayerNameChange: (name: string) => void;
};

export function WelcomeStep({ playerName, onPlayerNameChange }: WelcomeStepProps) {
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
    </div>
  );
}
