"use client";

import { CLASSES } from "@/lib/dnd-data";
import { scoreClasses, type FlavorAnswers } from "@/lib/scoring";
import { InfoCard } from "@/components/wizard/InfoCard";

type ClassStepProps = {
  classId: string | null;
  flavorAnswers: FlavorAnswers | null;
  onSelectClass: (classId: string) => void;
};

const RECOMMENDED_COUNT = 3;

export function ClassStep({ classId, flavorAnswers, onSelectClass }: ClassStepProps) {
  const orderedClasses = flavorAnswers
    ? scoreClasses(flavorAnswers, CLASSES)
    : CLASSES;
  const recommendedIds = new Set(
    flavorAnswers
      ? orderedClasses.slice(0, RECOMMENDED_COUNT).map((c) => c.id)
      : [],
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Choose your class</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {orderedClasses.map((cls) => (
          <InfoCard
            key={cls.id}
            name={cls.name}
            blurb={cls.blurb}
            detail={cls.detail}
            selected={cls.id === classId}
            onSelect={() => onSelectClass(cls.id)}
            badge={
              recommendedIds.has(cls.id) && (
                <span className="rounded-full bg-amber-600 px-2 py-0.5 text-xs text-white">
                  Recommended for you
                </span>
              )
            }
          />
        ))}
      </div>
    </div>
  );
}
