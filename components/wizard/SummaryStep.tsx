"use client";

import { getClass, getRace } from "@/lib/dnd-data";
import type { WizardAnswers } from "@/lib/wizard-storage";

type SummaryStepProps = {
  answers: WizardAnswers;
  onCharacterNameChange: (name: string) => void;
};

export function SummaryStep({ answers, onCharacterNameChange }: SummaryStepProps) {
  const race = answers.raceId ? getRace(answers.raceId) : undefined;
  const subrace = race?.subraces?.find((s) => s.id === answers.subraceId);
  const cls = answers.classId ? getClass(answers.classId) : undefined;
  const subclass = cls?.allSubclasses.find((s) => s.id === answers.subclassId);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Review your concept</h2>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
        <dt className="font-medium">Race</dt>
        <dd>{subrace ? `${subrace.name} (${race?.name})` : race?.name ?? "—"}</dd>
        <dt className="font-medium">Class</dt>
        <dd>{cls?.name ?? "—"}</dd>
        <dt className="font-medium">Subclass</dt>
        <dd>{subclass?.name ?? "—"}</dd>
      </dl>
      <label className="flex flex-col gap-1" htmlFor="character-name">
        <span className="font-medium">Character name</span>
        <input
          id="character-name"
          aria-label="Character name"
          className="rounded border border-zinc-300 px-3 py-2"
          value={answers.characterName}
          onChange={(e) => onCharacterNameChange(e.target.value)}
          placeholder="e.g. Thistle Fernwhisper"
        />
      </label>
    </div>
  );
}
