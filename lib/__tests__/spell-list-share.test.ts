import { describe, it, expect } from "vitest";
import { decodeSpellList, encodeSpellList } from "@/lib/spell-list-share";

describe("spell-list-share", () => {
  it("round-trips a class id and spell names", () => {
    const encoded = encodeSpellList("wizard", ["Fire Bolt", "Mage Hand", "Burning Hands"]);
    expect(decodeSpellList(encoded)).toEqual({
      classId: "wizard",
      spells: ["Fire Bolt", "Mage Hand", "Burning Hands"],
    });
  });

  it("produces a URL-safe string with no padding characters", () => {
    const encoded = encodeSpellList("wizard", ["Fire Bolt"]);
    expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/);
  });

  it("returns null for garbage input", () => {
    expect(decodeSpellList("not-valid-base64!!!")).toBeNull();
  });

  it("returns null when the decoded shape is wrong", () => {
    const badShape = Buffer.from(JSON.stringify({ classId: "wizard" })).toString("base64");
    expect(decodeSpellList(badShape)).toBeNull();
  });
});
