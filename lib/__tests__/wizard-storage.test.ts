import { describe, it, expect, beforeEach } from "vitest";
import {
  EMPTY_ANSWERS,
  loadAnswers,
  saveAnswers,
  clearAnswers,
  getFinalAbilityScores,
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
      abilityScoreMethod: "standard-array",
      abilityScores: { str: 14, dex: 12, con: 13, int: 10, wis: 8, cha: 15 },
      abilityScoreBonusMode: "three-plus-one",
      abilityScoreBonusAssignment: [
        { key: "str", bonus: 1 },
        { key: "dex", bonus: 1 },
        { key: "con", bonus: 1 },
      ],
      spellChoiceMode: "suggestions",
      enemyHook: "Skipped out on a debt to the Ashfall Cartel",
    };
    saveAnswers(answers);
    expect(loadAnswers()).toEqual(answers);
  });

  it("defaults the new ability-score and spell fields to null", () => {
    expect(EMPTY_ANSWERS.abilityScoreGuidance).toBeNull();
    expect(EMPTY_ANSWERS.abilityScoreMethod).toBeNull();
    expect(EMPTY_ANSWERS.abilityScores).toBeNull();
    expect(EMPTY_ANSWERS.abilityScoreBonusMode).toBeNull();
    expect(EMPTY_ANSWERS.abilityScoreBonusAssignment).toBeNull();
    expect(EMPTY_ANSWERS.spellChoiceMode).toBeNull();
  });

  it("defaults enemyHook to an empty string", () => {
    expect(EMPTY_ANSWERS.enemyHook).toBe("");
  });

  it("getFinalAbilityScores applies the bonus assignment on top of the base scores", () => {
    const answers: WizardAnswers = {
      ...EMPTY_ANSWERS,
      abilityScores: { str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 },
      abilityScoreBonusMode: "plus-two-plus-one",
      abilityScoreBonusAssignment: [
        { key: "str", bonus: 2 },
        { key: "dex", bonus: 1 },
      ],
    };
    expect(getFinalAbilityScores(answers)).toEqual({
      str: 17,
      dex: 15,
      con: 13,
      int: 12,
      wis: 10,
      cha: 8,
    });
  });

  it("getFinalAbilityScores returns null when no base scores are set", () => {
    expect(getFinalAbilityScores(EMPTY_ANSWERS)).toBeNull();
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
