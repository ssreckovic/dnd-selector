"use client";

import { getClass, getSubclassWikiUrl } from "@/lib/dnd-data";
import { InfoCard } from "@/components/wizard/InfoCard";
import { CornerTag } from "@/components/wizard/CornerTag";

type SubclassStepProps = {
  classId: string;
  subclassId: string | null;
  onSelectSubclass: (subclassId: string) => void;
};

export function SubclassStep({ classId, subclassId, onSelectSubclass }: SubclassStepProps) {
  const cls = getClass(classId);

  if (!cls) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Choose your {cls.name} subclass</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {cls.allSubclasses.map((subclass) => (
          <InfoCard
            key={subclass.id}
            name={subclass.name}
            blurb={subclass.blurb}
            detail={subclass.detail}
            selected={subclass.id === subclassId}
            onSelect={() => onSelectSubclass(subclass.id)}
            cornerTag={subclass.easy ? <CornerTag>Easy</CornerTag> : undefined}
            wikiUrl={getSubclassWikiUrl(cls.id, subclass.id)}
          />
        ))}
      </div>
    </div>
  );
}
