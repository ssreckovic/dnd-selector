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
    };
    saveAnswers(answers);
    expect(loadAnswers()).toEqual(answers);
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
