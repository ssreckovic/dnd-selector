import { describe, it, expect } from "vitest";
import { scoreClasses, FlavorAnswers } from "@/lib/scoring";
import { CLASSES, getClass } from "@/lib/dnd-data";

describe("scoreClasses", () => {
  it("ranks melee, no-magic answers toward Fighter/Barbarian over Wizard", () => {
    const answers: FlavorAnswers = {
      combatRole: "melee",
      magicInterest: "none",
      socialStyle: "loner",
    };
    const ranked = scoreClasses(answers, CLASSES);
    const fighterIndex = ranked.findIndex((c) => c.id === "fighter");
    const wizardIndex = ranked.findIndex((c) => c.id === "wizard");
    expect(fighterIndex).toBeLessThan(wizardIndex);
  });

  it("ranks avoid-combat, heavy-magic answers toward Wizard/Sorcerer/Warlock over Fighter", () => {
    const answers: FlavorAnswers = {
      combatRole: "avoid",
      magicInterest: "lot",
      socialStyle: "loner",
    };
    const ranked = scoreClasses(answers, CLASSES);
    const wizardIndex = ranked.findIndex((c) => c.id === "wizard");
    const fighterIndex = ranked.findIndex((c) => c.id === "fighter");
    expect(wizardIndex).toBeLessThan(fighterIndex);
  });

  it("ranks support, heavy-magic, leader answers toward Cleric over Rogue", () => {
    const answers: FlavorAnswers = {
      combatRole: "support",
      magicInterest: "lot",
      socialStyle: "leader",
    };
    const ranked = scoreClasses(answers, CLASSES);
    const clericIndex = ranked.findIndex((c) => c.id === "cleric");
    const rogueIndex = ranked.findIndex((c) => c.id === "rogue");
    expect(clericIndex).toBeLessThan(rogueIndex);
  });

  it("never drops any class from the result", () => {
    const answers: FlavorAnswers = {
      combatRole: "ranged",
      magicInterest: "little",
      socialStyle: "sneaky",
    };
    const ranked = scoreClasses(answers, CLASSES);
    expect(ranked).toHaveLength(CLASSES.length);
    expect(new Set(ranked.map((c) => c.id))).toEqual(
      new Set(CLASSES.map((c) => c.id)),
    );
  });

  it("preserves original order for classes with tied scores", () => {
    // An answer combination where two classes at the tail of CLASSES have
    // no scoring entries at all (score 0 each) should keep their relative order.
    const answers: FlavorAnswers = {
      combatRole: "melee",
      magicInterest: "none",
      socialStyle: "loner",
    };
    const ranked = scoreClasses(answers, CLASSES);
    const bardIndex = ranked.findIndex((c) => c.id === "bard");
    const clericIndex = ranked.findIndex((c) => c.id === "cleric");
    // Both score 0 under these answers; Bard precedes Cleric in CLASSES already.
    expect(bardIndex).toBeLessThan(clericIndex);
  });
});
