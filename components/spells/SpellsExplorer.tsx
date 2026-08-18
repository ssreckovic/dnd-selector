"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CLASSES, getClass } from "@/lib/dnd-data";
import { getClassSpellList, SPELL_LIMITS } from "@/lib/spell-data";
import { decodeSpellList, encodeSpellList } from "@/lib/spell-list-share";
import { submitSpellList } from "@/lib/submit";

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
	const [expandedSpells, setExpandedSpells] = useState<Set<string>>(new Set());
	const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
	const [sheetsState, setSheetsState] = useState<"idle" | "sending" | "sent" | "error">("idle");
	const [playerName, setPlayerName] = useState("");
	const hydrated = useRef(false);

	useEffect(() => {
		const loaded = loadSelections();
		const sharedClassId = searchParams.get("class");
		const encodedList = searchParams.get("list");
		if (sharedClassId && encodedList) {
			const shared = decodeSpellList(encodedList);
			if (shared && shared.classId === sharedClassId) {
				loaded[sharedClassId] = shared.spells;
			}
		}
		setSelections(loaded);
		hydrated.current = true;
		// Only apply the shared/persisted list once, on the initial load.
		// eslint-disable-next-line react-hooks/exhaustive-deps
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

	function toggleExpanded (spellName: string) {
		setExpandedSpells((prev) => {
			const next = new Set(prev);
			if (next.has(spellName)) {
				next.delete(spellName);
			} else {
				next.add(spellName);
			}
			return next;
		});
	}

	function clearSelections () {
		if (!classId) return;
		setSelections((prev) => ({ ...prev, [classId]: [] }));
	}

	function copyShareLink () {
		if (!classId) return;
		const encoded = encodeSpellList(classId, selected);
		const url = new URL(window.location.href);
		url.searchParams.set("class", classId);
		url.searchParams.set("list", encoded);
		navigator.clipboard.writeText(url.toString()).then(() => {
			setCopyState("copied");
			setTimeout(() => setCopyState("idle"), 2000);
		});
	}

	async function sendToSheets () {
		if (!classId || !selectedClass || !playerName.trim()) return;
		setSheetsState("sending");
		const result = await submitSpellList({
			playerName: playerName.trim(),
			className: selectedClass.name,
			cantrips: cantripsSelected,
			spells: spellsSelected,
		});
		if (result.ok) {
			setSheetsState("sent");
			setTimeout(() => setSheetsState("idle"), 2000);
		} else {
			setSheetsState("error");
		}
	}

	return (
		<div className="flex flex-col gap-6">
			<h1 className="text-2xl font-semibold">Class spells</h1>
			<p className="text-zinc-600">
				A quick reference for what each spellcasting class has access to, from cantrips through
				level 2 spells.
			</p>
			<div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-8">
				{CASTER_CLASSES.map((cls) => (
					<button
						key={cls.id}
						type="button"
						onClick={() => selectClass(cls.id)}
						aria-pressed={cls.id === classId}
						className={`rounded border px-4 text-left transition-colors h-8 ${cls.id === classId
								? "border-amber-600 bg-amber-50"
								: "border-zinc-300 hover:bg-zinc-50"
							}`}
					>
						<div className="font-medium">{cls.name}</div>
						{/* <div className="text-sm text-zinc-600">{cls.blurb}</div> */}
					</button>
				))}
			</div>
			{/* <div className="grid grid-cols-1 gap-8 sm:grid-cols-5"> */}
				{selectedClass && spellList && (
					<div className="flex flex-col gap-4">
						<h2 className="text-xl font-semibold">{selectedClass.name} spells</h2>
						{limits && (
							<div className="rounded border border-amber-200 bg-amber-50 p-3">
								<div className="flex items-center justify-between">
									<h3 className="font-medium">Your spell list</h3>
									<div className="flex items-center gap-3">
										<button
											type="button"
											onClick={copyShareLink}
											className="text-xs text-zinc-500 underline hover:text-zinc-700"
										>
											{copyState === "copied" ? "Link copied!" : "Copy shareable link"}
										</button>
										<button
											type="button"
											onClick={sendToSheets}
											disabled={sheetsState === "sending" || !playerName.trim()}
											className="text-xs text-zinc-500 underline hover:text-zinc-700 disabled:opacity-50"
										>
											{sheetsState === "sending"
												? "Sending…"
												: sheetsState === "sent"
													? "Sent!"
													: sheetsState === "error"
														? "Failed, retry?"
														: "Send to Sasha"}
										</button>
										<button
											type="button"
											onClick={clearSelections}
											className="text-xs text-zinc-500 underline hover:text-zinc-700"
										>
											Clear
										</button>
									</div>
								</div>
								<p className="text-sm text-zinc-600">
									Cantrips {cantripsSelected.length}/{limits.cantrips} - Spells {spellsSelected.length}/{limits.spells}
								</p>
								<label className="mt-2 flex flex-col gap-1 text-xs text-zinc-600">
									Your name (for export to Sasha)
									<input
										type="text"
										value={playerName}
										onChange={(e) => setPlayerName(e.target.value)}
										placeholder="Name"
										className="rounded border border-zinc-300 px-2 py-1 text-sm text-zinc-900"
									/>
								</label>
								{selected.length > 0 && (
									<ul className="mt-2 flex flex-wrap gap-2">
										{selected.map((name) => (
											<li key={name}>
												<button
													type="button"
													onClick={() => toggleSpell(name, cantripNames.has(name))}
													className="rounded-full border border-zinc-300 bg-white px-2 py-1 text-xs hover:bg-zinc-100"
												>
													{name} x
												</button>
											</li>
										))}
									</ul>
								)}
							</div>
						)}
						<div className="flex flex-col gap-2 w-full max-h-[75vh] overflow-y-scroll p-1 sm:p-4 border-gray-300 rounded-md">
							{LEVEL_SECTIONS.map((section) => {
								const isCantrip = section.key === "cantrips";
								const atLimit = limits
									? isCantrip
										? cantripsSelected.length >= limits.cantrips
										: spellsSelected.length >= limits.spells
									: true;
								return (
									<details key={section.key}>
										<summary className="font-medium">
											{section.label}
											{limits && (
												<span className="ml-2 font-normal text-zinc-500">
													({isCantrip ? cantripsSelected.length : spellsSelected.length}/
													{isCantrip ? limits.cantrips : limits.spells})
												</span>
											)}
										</summary>
										{spellList[section.key].length > 0 ? (
											<div className="mt-2 flex flex-col md:grid grid-cols-2 lg:grid-cols-3 gap-2">
												{spellList[section.key].map((spell) => {
													const isSelected = selected.includes(spell.name);
													const isExpanded = expandedSpells.has(spell.name);
													return (
														<div
															key={spell.name}
															role="button"
															tabIndex={0}
															onClick={() => toggleExpanded(spell.name)}
															onKeyDown={(e) => {
																if (e.key === "Enter" || e.key === " ") {
																	e.preventDefault();
																	toggleExpanded(spell.name);
																}
															}}
															className="cursor-pointer rounded border border-zinc-200 p-2 h-min"
														>
															<div className="flex items-center justify-between gap-2 text-sm font-medium">
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
															</div>
															{isExpanded && (
																<>
																	<dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-zinc-600 sm:grid-cols-3">
																		<div>
																			<dt className="font-bold">Cast time</dt>
																			<dd>{spell.castTime}</dd>
																		</div>
																		<div>
																			<dt className="font-bold">Range</dt>
																			<dd>{spell.range}</dd>
																		</div>
																		<div>
																			<dt className="font-bold">Duration</dt>
																			<dd>{spell.duration}</dd>
																		</div>
																	</dl>
																	<hr className="my-1"/>
																	<p className="mt-2 whitespace-pre-line text-sm text-zinc-700">
																		{spell.description}
																	</p>
																</>
															)}
														</div>
													);
												})}
											</div>
										) : (
											<p className="mt-2 text-sm text-zinc-500" data-testid={`${selectedClass.name}-${section.key}-none`}>None yet at this level.</p>
										)}
									</details>
								);
							})}
						</div>
					</div>
				)}
			{/* </div> */}
		</div>
	);
}
