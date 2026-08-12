"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CLASSES, getClass } from "@/lib/dnd-data";
import { getClassSpellList, SPELL_LIMITS } from "@/lib/spell-data";

const CASTER_CLASSES = CLASSES.filter((cls) => cls.baseSpellcasting);

const LEVEL_SECTIONS: { key: "cantrips" | "level1" | "level2"; label: string }[] = [
	{ key: "cantrips", label: "Cantrips" },
	{ key: "level1", label: "Level 1" },
	{ key: "level2", label: "Level 2" },
];

const STORAGE_KEY = "dnd-spell-list-selections";

function loadSelections (): Record<string, string[]> {
	if (typeof window === "undefined") return {};
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : {};
	} catch {
		return {};
	}
}

export function SpellsExplorer () {
	const router = useRouter();
	const searchParams = useSearchParams();
	const classId = searchParams.get("class");
	const selectedClass = classId ? getClass(classId) : undefined;
	const spellList = classId ? getClassSpellList(classId) : undefined;
	const limits = classId ? SPELL_LIMITS[classId] : undefined;

	const [selections, setSelections] = useState<Record<string, string[]>>({});
	const hydrated = useRef(false);

	useEffect(() => {
		setSelections(loadSelections());
		hydrated.current = true;
	}, []);

	useEffect(() => {
		if (!hydrated.current) return;
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
	}, [selections]);

	function selectClass (id: string) {
		router.replace(`/spells?class=${id}`);
	}

	const selected = classId ? selections[classId] ?? [] : [];
	const cantripNames = new Set(spellList?.cantrips.map((s) => s.name) ?? []);
	const cantripsSelected = selected.filter((name) => cantripNames.has(name));
	const spellsSelected = selected.filter((name) => !cantripNames.has(name));

	function toggleSpell (spellName: string, isCantrip: boolean) {
		if (!classId || !limits) return;
		setSelections((prev) => {
			const current = prev[classId] ?? [];
			if (current.includes(spellName)) {
				return { ...prev, [classId]: current.filter((name) => name !== spellName) };
			}
			const cantripCount = current.filter((name) => cantripNames.has(name)).length;
			const spellCount = current.length - cantripCount;
			if (isCantrip && cantripCount >= limits.cantrips) return prev;
			if (!isCantrip && spellCount >= limits.spells) return prev;
			return { ...prev, [classId]: [...current, spellName] };
		});
	}

	function clearSelections () {
		if (!classId) return;
		setSelections((prev) => ({ ...prev, [classId]: [] }));
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
						{limits && (
							<div className="rounded border border-amber-200 bg-amber-50 p-3">
								<div className="flex items-center justify-between">
									<h3 className="font-medium">Your spell list</h3>
									<button
										type="button"
										onClick={clearSelections}
										className="text-xs text-zinc-500 underline hover:text-zinc-700"
									>
										Clear
									</button>
								</div>
								<p className="text-sm text-zinc-600">
									Cantrips {cantripsSelected.length}/{limits.cantrips} - Spells {spellsSelected.length}/{limits.spells}
								</p>
								{selected.length > 0 && (
									<ul className="mt-2 flex flex-wrap gap-2">
										{selected.map((name) => (
											<li key={name}>
												<button
													type="button"
													onClick={() => toggleSpell(name, cantripNames.has(name))}
													className="rounded-full border border-zinc-300 bg-white px-2 py-1 text-xs hover:bg-zinc-100"
												>
													{name} {} x
												</button>
											</li>
										))}
									</ul>
								)}
							</div>
						)}
						{LEVEL_SECTIONS.map((section) => {
							const isCantrip = section.key === "cantrips";
							const atLimit = limits
								? isCantrip
									? cantripsSelected.length >= limits.cantrips
									: spellsSelected.length >= limits.spells
								: true;
							return (
								<details key={section.key}>
									<summary className="cursor-pointer font-medium">
										{section.label}
										{limits && (
											<span className="ml-2 font-normal text-zinc-500">
												({isCantrip ? cantripsSelected.length : spellsSelected.length}/
												{isCantrip ? limits.cantrips : limits.spells})
											</span>
										)}
									</summary>
									{spellList[section.key].length > 0 ? (
										<div className="mt-2 flex flex-col gap-2">
											{spellList[section.key].map((spell) => {
												const isSelected = selected.includes(spell.name);
												return (
													<details key={spell.name} className="rounded border border-zinc-200 p-2">
														<summary className="flex cursor-pointer items-center justify-between gap-2 text-sm font-medium">
															<span>
																{spell.name}
																<span className="ml-2 font-normal text-zinc-500">{spell.school}</span>
															</span>
															<input
																type="checkbox"
																className="h-4 w-4 shrink-0"
																checked={isSelected}
																disabled={!isSelected && atLimit}
																onClick={(e) => e.stopPropagation()}
																onChange={() => toggleSpell(spell.name, isCantrip)}
															/>
														</summary>
														<dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-zinc-600 sm:grid-cols-4">
															<div>
																<dt className="font-medium">Cast time</dt>
																<dd>{spell.castTime}</dd>
															</div>
															<div>
																<dt className="font-medium">Range</dt>
																<dd>{spell.range}</dd>
															</div>
															<div>
																<dt className="font-medium">Duration</dt>
																<dd>{spell.duration}</dd>
															</div>
															<div>
																<dt className="font-medium">Components</dt>
																<dd>{spell.components}</dd>
															</div>
														</dl>
														<p className="mt-2 whitespace-pre-line text-sm text-zinc-700">
															{spell.description}
														</p>
													</details>
												);
											})}
										</div>
									) : (
										<p className="mt-2 text-sm text-zinc-500">None yet at this level.</p>
									)}
								</details>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
