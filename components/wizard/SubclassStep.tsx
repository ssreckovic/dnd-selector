"use client";

import { useState } from "react";
import { getClass } from "@/lib/dnd-data";
import { InfoCard } from "@/components/wizard/InfoCard";

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
          <InfoCard
            key={subclass.id}
            name={subclass.name}
            blurb={subclass.blurb}
            detail={subclass.detail}
            selected={subclass.id === subclassId}
            onSelect={() => onSelectSubclass(subclass.id)}
          />
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
