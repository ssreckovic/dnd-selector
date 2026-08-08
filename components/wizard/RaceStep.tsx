"use client";

import { RACES } from "@/lib/dnd-data";

type RaceStepProps = {
  raceId: string | null;
  subraceId: string | null;
  onSelectRace: (raceId: string) => void;
  onSelectSubrace: (subraceId: string) => void;
};

export function RaceStep({
  raceId,
  subraceId,
  onSelectRace,
  onSelectSubrace,
}: RaceStepProps) {
  const selectedRace = RACES.find((r) => r.id === raceId);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Choose your race</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {RACES.map((race) => (
          <button
            key={race.id}
            type="button"
            onClick={() => onSelectRace(race.id)}
            aria-label={race.name}
            className={`rounded border p-4 text-left transition-colors ${
              race.id === raceId
                ? "border-amber-600 bg-amber-50"
                : "border-zinc-300 hover:bg-zinc-50"
            }`}
          >
            <div className="font-medium">{race.name}</div>
            <div className="text-sm text-zinc-600">{race.blurb}</div>
          </button>
        ))}
      </div>

      {selectedRace?.subraces && (
        <div className="flex flex-col gap-3">
          <h3 className="font-medium">Choose your {selectedRace.name} lineage</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {selectedRace.subraces.map((subrace) => (
              <button
                key={subrace.id}
                type="button"
                onClick={() => onSelectSubrace(subrace.id)}
                aria-label={subrace.name}
                className={`rounded border p-3 text-left transition-colors ${
                  subrace.id === subraceId
                    ? "border-amber-600 bg-amber-50"
                    : "border-zinc-300 hover:bg-zinc-50"
                }`}
              >
                <div className="font-medium">{subrace.name}</div>
                <div className="text-sm text-zinc-600">{subrace.blurb}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
