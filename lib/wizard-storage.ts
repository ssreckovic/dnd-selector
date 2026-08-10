import type { CombatRole, MagicInterest, SocialStyle } from "@/lib/scoring";

export type AbilityScoreGuidance = "auto" | "manual" | "guided";
export type AbilityScoreMethod = "standard-array" | "roll" | "point-buy";
export type SpellChoiceMode = "own" | "suggestions" | "auto";

export type AbilityScores = {
  str: number | null;
  dex: number | null;
  con: number | null;
  int: number | null;
  wis: number | null;
  cha: number | null;
};

export type WizardAnswers = {
  playerName: string;
  raceId: string | null;
  subraceId: string | null;
  combatRole: CombatRole | null;
  magicInterest: MagicInterest | null;
  socialStyle: SocialStyle | null;
  classId: string | null;
  subclassId: string | null;
  abilityScoreGuidance: AbilityScoreGuidance | null;
  abilityScoreMethod: AbilityScoreMethod | null;
  abilityScores: AbilityScores | null;
  spellChoiceMode: SpellChoiceMode | null;
  characterName: string;
};

export const EMPTY_ANSWERS: WizardAnswers = {
  playerName: "",
  raceId: null,
  subraceId: null,
  combatRole: null,
  magicInterest: null,
  socialStyle: null,
  classId: null,
  subclassId: null,
  abilityScoreGuidance: null,
  abilityScoreMethod: null,
  abilityScores: null,
  spellChoiceMode: null,
  characterName: "",
};

const STORAGE_KEY = "dnd-concept-builder:answers";

export function loadAnswers(): WizardAnswers {
  if (typeof window === "undefined") {
    return EMPTY_ANSWERS;
  }
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return EMPTY_ANSWERS;
  }
  try {
    return { ...EMPTY_ANSWERS, ...JSON.parse(raw) };
  } catch {
    return EMPTY_ANSWERS;
  }
}

export function saveAnswers(answers: WizardAnswers): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}

export function clearAnswers(): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(STORAGE_KEY);
}
