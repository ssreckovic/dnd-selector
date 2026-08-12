"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CLASSES, getClass } from "@/lib/dnd-data";
import { getClassSpellList } from "@/lib/spell-data";

const CASTER_CLASSES = CLASSES.filter((cls) => cls.baseSpellcasting);

const LEVEL_SECTIONS: { key: "cantrips" | "level1" | "level2"; label: string }[] = [
	{ key: "cantrips", label: "Cantrips" },
	{ key: "level1", label: "Level 1" },
	{ key: "level2", label: "Level 2" },
];

export function SpellsExplorer () {
	const router = useRouter();
	const searchParams = useSearchParams();
	const classId = searchParams.get("class");
	const selectedClass = classId ? getClass(classId) : undefined;
	const spellList = classId ? getClassSpellList(classId) : undefined;

	function selectClass (id: string) {
		router.replace(`/spells?class=${id}`);
	}

	return (
		<div className="flex flex-col gap-6">
			<h1 className="text-2xl font-semibold">Class spells</h1>
			<p className="text-zinc-600">
				A quick reference for what each spellcasting class has access to, from cantrips through
				level 2 spells.
			</p>
			<div className="grid grid-cols-1 gap-8 sm:grid-cols-5">
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 h-min col-span-2">
					{CASTER_CLASSES.map((cls) => (
						<button
							key={cls.id}
							type="button"
							onClick={() => selectClass(cls.id)}
							aria-pressed={cls.id === classId}
							className={`rounded border p-4 text-left transition-colors h-fit ${cls.id === classId
									? "border-amber-600 bg-amber-50"
									: "border-zinc-300 hover:bg-zinc-50"
								}`}
						>
							<div className="font-medium">{cls.name}</div>
							<div className="text-sm text-zinc-600">{cls.blurb}</div>
						</button>
					))}
				</div>
				{selectedClass && spellList && (
					<div className="flex flex-col gap-4 col-span-3">
						<h2 className="text-xl font-semibold">{selectedClass.name} spells</h2>
						{LEVEL_SECTIONS.map((section) => (
							<div key={section.key} className="flex flex-col gap-2">
								<h3 className="font-medium">{section.label}</h3>
								{spellList[section.key].length > 0 ? (
									<div className="flex flex-col gap-2">
										{spellList[section.key].map((spell) => (
											<details key={spell.name} className="rounded border border-zinc-200 p-2">
												<summary className="cursor-pointer text-sm font-medium">
													{spell.name}
													<span className="ml-2 font-normal text-zinc-500">{spell.school}</span>
												</summary>
												<dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-zinc-600 sm:grid-cols-4">
													<dt className="font-medium">Cast time</dt>
													<dd>{spell.castTime}</dd>
													<dt className="font-medium">Range</dt>
													<dd>{spell.range}</dd>
													<dt className="font-medium">Duration</dt>
													<dd>{spell.duration}</dd>
													<dt className="font-medium">Components</dt>
													<dd>{spell.components}</dd>
												</dl>
												<p className="mt-2 whitespace-pre-line text-sm text-zinc-700">
													{spell.description}
												</p>
											</details>
										))}
									</div>
								) : (
									<p className="text-sm text-zinc-500">None yet at this level.</p>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
