"use client";

import { RACES } from "@/lib/dnd-data";
import { InfoCard } from "@/components/wizard/InfoCard";

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
          <InfoCard
            key={race.id}
            name={race.name}
            blurb={race.blurb}
            detail={race.detail}
            selected={race.id === raceId}
            onSelect={() => onSelectRace(race.id)}
          />
        ))}
      </div>

      {selectedRace?.subraces && (
        <div className="flex flex-col gap-3">
          <h3 className="font-medium">Choose your {selectedRace.name} lineage</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {selectedRace.subraces.map((subrace) => (
              <InfoCard
                key={subrace.id}
                name={subrace.name}
                blurb={subrace.blurb}
                detail={subrace.detail}
                selected={subrace.id === subraceId}
                onSelect={() => onSelectSubrace(subrace.id)}
                padding="sm"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
