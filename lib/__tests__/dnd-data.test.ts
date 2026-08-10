import { describe, it, expect } from "vitest";
import { RACES, CLASSES, getRace, getClass, classGrantsSpellcasting } from "@/lib/dnd-data";

describe("dnd-data", () => {
  it("has exactly the Core 8 races", () => {
    expect(RACES.map((r) => r.id).sort()).toEqual(
      [
        "human",
        "elf",
        "dwarf",
        "halfling",
        "half-elf",
        "tiefling",
        "half-orc",
        "dragonborn",
      ].sort(),
    );
  });

  it("gives Elf and Dwarf subraces, and no other race subraces", () => {
    for (const race of RACES) {
      if (race.id === "elf") {
        expect(race.subraces?.map((s) => s.id).sort()).toEqual(
          ["high-elf", "wood-elf", "drow"].sort(),
        );
      } else if (race.id === "dwarf") {
        expect(race.subraces?.map((s) => s.id).sort()).toEqual(
          ["hill-dwarf", "mountain-dwarf"].sort(),
        );
      } else {
        expect(race.subraces).toBeUndefined();
      }
    }
  });

  it("has exactly 12 classes with non-empty blurbs", () => {
    expect(CLASSES).toHaveLength(12);
    for (const cls of CLASSES) {
      expect(cls.blurb.length).toBeGreaterThan(0);
    }
  });

  it("every class's default subclasses are a subset of its all-subclasses list", () => {
    for (const cls of CLASSES) {
      const allIds = new Set(cls.allSubclasses.map((s) => s.id));
      for (const def of cls.defaultSubclasses) {
        expect(allIds.has(def.id)).toBe(true);
      }
      expect(cls.defaultSubclasses.length).toBeGreaterThanOrEqual(2);
      expect(cls.allSubclasses.length).toBeGreaterThanOrEqual(
        cls.defaultSubclasses.length,
      );
    }
  });

  it("getRace and getClass look up by id", () => {
    expect(getRace("human")?.name).toBe("Human");
    expect(getRace("nonexistent")).toBeUndefined();
    expect(getClass("wizard")?.name).toBe("Wizard");
    expect(getClass("nonexistent")).toBeUndefined();
  });

  it("flags exactly the base spellcasting classes", () => {
    const expectedCasters = new Set([
      "bard",
      "cleric",
      "druid",
      "paladin",
      "ranger",
      "sorcerer",
      "warlock",
      "wizard",
    ]);
    for (const cls of CLASSES) {
      expect(cls.baseSpellcasting).toBe(expectedCasters.has(cls.id));
    }
  });

  it("flags only Eldritch Knight and Arcane Trickster as subclass-granted spellcasting", () => {
    for (const cls of CLASSES) {
      for (const subclass of cls.allSubclasses) {
        const expected = subclass.id === "eldritch-knight" || subclass.id === "arcane-trickster";
        expect(Boolean(subclass.hasSpellcasting)).toBe(expected);
      }
    }
  });
});

describe("classGrantsSpellcasting", () => {
  it("is true for a base spellcasting class regardless of subclass", () => {
    expect(classGrantsSpellcasting("wizard", "evocation")).toBe(true);
    expect(classGrantsSpellcasting("wizard", null)).toBe(true);
  });

  it("is true for a subclass that grants spellcasting on a non-caster base class", () => {
    expect(classGrantsSpellcasting("fighter", "eldritch-knight")).toBe(true);
    expect(classGrantsSpellcasting("rogue", "arcane-trickster")).toBe(true);
  });

  it("is false for a non-caster class with a non-spellcasting subclass", () => {
    expect(classGrantsSpellcasting("fighter", "champion")).toBe(false);
    expect(classGrantsSpellcasting("barbarian", "berserker")).toBe(false);
  });

  it("is false when classId is null or unknown", () => {
    expect(classGrantsSpellcasting(null, null)).toBe(false);
    expect(classGrantsSpellcasting("nonexistent", null)).toBe(false);
  });
});
