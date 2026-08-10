import { describe, it, expect, beforeEach } from "vitest";
import {
  EMPTY_ANSWERS,
  loadAnswers,
  saveAnswers,
  clearAnswers,
  WizardAnswers,
} from "@/lib/wizard-storage";

describe("wizard-storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("loadAnswers returns EMPTY_ANSWERS when nothing is stored", () => {
    expect(loadAnswers()).toEqual(EMPTY_ANSWERS);
  });

  it("saveAnswers persists answers that loadAnswers can read back", () => {
    const answers: WizardAnswers = {
      ...EMPTY_ANSWERS,
      playerName: "Sasha",
      raceId: "elf",
      subraceId: "wood-elf",
      abilityScoreGuidance: "guided",
      abilityScoreMethod: "point-buy",
      abilityScores: { str: 14, dex: 12, con: 13, int: 10, wis: 8, cha: 15 },
      spellChoiceMode: "suggestions",
    };
    saveAnswers(answers);
    expect(loadAnswers()).toEqual(answers);
  });

  it("defaults the new ability-score and spell fields to null", () => {
    expect(EMPTY_ANSWERS.abilityScoreGuidance).toBeNull();
    expect(EMPTY_ANSWERS.abilityScoreMethod).toBeNull();
    expect(EMPTY_ANSWERS.abilityScores).toBeNull();
    expect(EMPTY_ANSWERS.spellChoiceMode).toBeNull();
  });

  it("clearAnswers removes stored answers", () => {
    saveAnswers({ ...EMPTY_ANSWERS, playerName: "Sasha" });
    clearAnswers();
    expect(loadAnswers()).toEqual(EMPTY_ANSWERS);
  });

  it("loadAnswers falls back to EMPTY_ANSWERS on corrupted storage", () => {
    window.localStorage.setItem("dnd-concept-builder:answers", "{not json");
    expect(loadAnswers()).toEqual(EMPTY_ANSWERS);
  });
});
