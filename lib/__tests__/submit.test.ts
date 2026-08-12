import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { submitConcept } from "@/lib/submit";
import { EMPTY_ANSWERS, WizardAnswers } from "@/lib/wizard-storage";

const answers: WizardAnswers = {
  ...EMPTY_ANSWERS,
  playerName: "Sasha",
  characterName: "Thistle",
  raceId: "halfling",
  classId: "rogue",
  subclassId: "thief",
};

describe("submitConcept", () => {
  const originalEndpoint = process.env.NEXT_PUBLIC_SHEETS_ENDPOINT;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_SHEETS_ENDPOINT = "https://example.com/exec";
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_SHEETS_ENDPOINT = originalEndpoint;
    vi.unstubAllGlobals();
  });

  it("posts the answers as JSON and returns ok on success", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchMock);

    const result = await submitConcept(answers);

    expect(result).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.com/exec",
      expect.objectContaining({ method: "POST" }),
    );
    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(body).toEqual({
      playerName: "Sasha",
      effortLevel: null,
      characterName: "Thistle",
      race: "Halfling",
      subrace: null,
      class: "Rogue",
      subclass: "Thief",
      abilityScoreGuidance: null,
      abilityScoreMethod: null,
      abilityScoreStr: null,
      abilityScoreDex: null,
      abilityScoreCon: null,
      abilityScoreInt: null,
      abilityScoreWis: null,
      abilityScoreCha: null,
      spellChoiceMode: null,
    });
  });

  it("includes ability score and spell choice fields when set", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchMock);

    const answersWithStats: WizardAnswers = {
      ...answers,
      effortLevel: "all",
      abilityScoreGuidance: "manual",
      abilityScoreMethod: "point-buy",
      abilityScores: { str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 },
      spellChoiceMode: "own",
    };

    const result = await submitConcept(answersWithStats);

    expect(result).toEqual({ ok: true });
    const body = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(body).toEqual(
      expect.objectContaining({
        effortLevel: "all",
        abilityScoreGuidance: "manual",
        abilityScoreMethod: "point-buy",
        abilityScoreStr: 15,
        abilityScoreDex: 14,
        abilityScoreCon: 13,
        abilityScoreInt: 12,
        abilityScoreWis: 10,
        abilityScoreCha: 8,
        spellChoiceMode: "own",
      }),
    );
  });

  it("returns an error result when the response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    );

    const result = await submitConcept(answers);

    expect(result.ok).toBe(false);
  });

  it("returns an error result when fetch throws", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("network down")),
    );

    const result = await submitConcept(answers);

    expect(result).toEqual({ ok: false, error: "network down" });
  });

  it("returns an error result when the endpoint is not configured", async () => {
    delete process.env.NEXT_PUBLIC_SHEETS_ENDPOINT;

    const result = await submitConcept(answers);

    expect(result.ok).toBe(false);
  });
});
