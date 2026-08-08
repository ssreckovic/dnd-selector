"use client";

import { CLASSES } from "@/lib/dnd-data";
import { scoreClasses, type FlavorAnswers } from "@/lib/scoring";

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
          <button
            key={cls.id}
            type="button"
            onClick={() => onSelectClass(cls.id)}
            className={`rounded border p-4 text-left transition-colors ${
              cls.id === classId
                ? "border-amber-600 bg-amber-50"
                : "border-zinc-300 hover:bg-zinc-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">{cls.name}</span>
              {recommendedIds.has(cls.id) && (
                <span className="rounded-full bg-amber-600 px-2 py-0.5 text-xs text-white">
                  Recommended for you
                </span>
              )}
            </div>
            <div className="text-sm text-zinc-600">{cls.blurb}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
