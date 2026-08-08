"use client";

import { useState } from "react";
import { getClass } from "@/lib/dnd-data";

type SubclassStepProps = {
  classId: string;
  subclassId: string | null;
  onSelectSubclass: (subclassId: string) => void;
};

export function SubclassStep({ classId, subclassId, onSelectSubclass }: SubclassStepProps) {
  const cls = getClass(classId);
  const [showAll, setShowAll] = useState(
    () => subclassId !== null && !cls?.defaultSubclasses.some((s) => s.id === subclassId),
  );

  if (!cls) {
    return null;
  }

  const subclasses = showAll ? cls.allSubclasses : cls.defaultSubclasses;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Choose your {cls.name} subclass</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {subclasses.map((subclass) => (
          <button
            key={subclass.id}
            type="button"
            onClick={() => onSelectSubclass(subclass.id)}
            className={`rounded border p-4 text-left transition-colors ${
              subclass.id === subclassId
                ? "border-amber-600 bg-amber-50"
                : "border-zinc-300 hover:bg-zinc-50"
            }`}
          >
            <div className="font-medium">{subclass.name}</div>
            <div className="text-sm text-zinc-600">{subclass.blurb}</div>
          </button>
        ))}
      </div>
      {!showAll && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="self-start text-sm font-medium text-amber-700 underline"
        >
          Show all subclasses
        </button>
      )}
    </div>
  );
}
