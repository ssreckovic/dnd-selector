import { describe, it, expect } from "vitest";
import { CLASS_SPELL_LISTS, getClassSpellList } from "@/lib/spell-data";
import { CLASSES } from "@/lib/dnd-data";

describe("spell-data", () => {
  it("has exactly one entry per base spellcasting class", () => {
    const baseCasterIds = CLASSES.filter((c) => c.baseSpellcasting).map((c) => c.id);
    const listedIds = CLASS_SPELL_LISTS.map((l) => l.classId);
    expect(new Set(listedIds)).toEqual(new Set(baseCasterIds));
    expect(listedIds).toHaveLength(baseCasterIds.length);
  });

  it("every classId matches a real base-caster class", () => {
    for (const list of CLASS_SPELL_LISTS) {
      const cls = CLASSES.find((c) => c.id === list.classId);
      expect(cls).toBeDefined();
      expect(cls?.baseSpellcasting).toBe(true);
    }
  });

  it("getClassSpellList returns the matching list", () => {
    expect(getClassSpellList("wizard")?.cantrips.map((s) => s.name)).toContain("Fire Bolt");
    expect(getClassSpellList("nonexistent")).toBeUndefined();
  });

  it("paladin and ranger have no cantrips but do have level 1 and 2 spells", () => {
    for (const id of ["paladin", "ranger"]) {
      const list = getClassSpellList(id);
      expect(list?.cantrips).toHaveLength(0);
      expect(list?.level1.length).toBeGreaterThan(0);
      expect(list?.level2).toHaveLength(0);
    }
  });
});
