"use client";

import { CLASSES } from "@/lib/dnd-data";
import { InfoCard } from "@/components/wizard/InfoCard";

type ClassStepProps = {
  classId: string | null;
  onSelectClass: (classId: string) => void;
};

export function ClassStep({ classId, onSelectClass }: ClassStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Choose your class</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CLASSES.map((cls) => (
          <InfoCard
            key={cls.id}
            name={cls.name}
            blurb={cls.blurb}
            detail={cls.detail}
            selected={cls.id === classId}
            onSelect={() => onSelectClass(cls.id)}
          />
        ))}
      </div>
    </div>
  );
}
