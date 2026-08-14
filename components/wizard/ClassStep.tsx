"use client";

import { useState } from "react";
import Link from "next/link";
import { CLASSES, getClass, getClassWikiUrl, type ClassRole } from "@/lib/dnd-data";
import { InfoCard } from "@/components/wizard/InfoCard";

type ClassStepProps = {
  classId: string | null;
  onSelectClass: (classId: string) => void;
};

type RoleFilter = ClassRole | "all";

const ROLE_FILTERS: { value: RoleFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "martial", label: "Martial" },
  { value: "caster", label: "Caster" },
  { value: "support", label: "Support" },
  { value: "martial-caster", label: "Martial Caster" },
];

export function ClassStep({ classId, onSelectClass }: ClassStepProps) {
  const selectedClass = classId ? getClass(classId) : undefined;
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const visibleClasses = CLASSES.filter(
    (cls) => roleFilter === "all" || cls.role === roleFilter,
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Choose your class</h2>
      <div className="flex flex-wrap gap-2">
        {ROLE_FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => setRoleFilter(filter.value)}
            className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
              roleFilter === filter.value
                ? "border-amber-600 bg-amber-600 text-white"
                : "border-amber-300 bg-white text-amber-800 hover:bg-amber-50"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visibleClasses.map((cls) => (
          <InfoCard
            key={cls.id}
            name={cls.name}
            blurb={cls.blurb}
            detail={cls.detail}
            selected={cls.id === classId}
            onSelect={() => onSelectClass(cls.id)}
            wikiUrl={getClassWikiUrl(cls.id)}
            footer={
              cls.baseSpellcasting && (
                <Link
                  href={`/spells?class=${cls.id}`}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-2 block text-xs font-medium text-amber-700 underline"
                >
                  See {cls.name} spells
                </Link>
              )
            }
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
