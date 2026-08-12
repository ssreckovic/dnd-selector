"use client";

import { CLASSES, getClass } from "@/lib/dnd-data";
import { InfoCard } from "@/components/wizard/InfoCard";

type ClassStepProps = {
  classId: string | null;
  onSelectClass: (classId: string) => void;
};

export function ClassStep({ classId, onSelectClass }: ClassStepProps) {
  const selectedClass = classId ? getClass(classId) : undefined;

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
      {selectedClass?.baseSpellcasting && (
        <p className="rounded border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          Spellcasters like {selectedClass.name}s have more rules to track in play — spell slots,
          prepared spells, and more. That&apos;s okay if you&apos;re up for it!
        </p>
      )}
    </div>
  );
}
