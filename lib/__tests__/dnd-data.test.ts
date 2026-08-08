import { describe, it, expect } from "vitest";
import { RACES, CLASSES, getRace, getClass } from "@/lib/dnd-data";

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
});
