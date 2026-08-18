export type AbilityScoreGuidance = "auto" | "manual" | "guided";
export type AbilityScoreMethod = "standard-array";
export type AbilityScoreBonusMode = "three-plus-one" | "plus-two-plus-one";
export type SpellChoiceMode = "own" | "suggestions" | "auto";
export type EffortLevel = "minimal" | "some" | "all";

export type AbilityScores = {
  str: number | null;
  dex: number | null;
  con: number | null;
  int: number | null;
  wis: number | null;
  cha: number | null;
};

export type AbilityScoreBonusAssignment = {
  key: keyof AbilityScores;
  bonus: 1 | 2;
}[];

export type WizardAnswers = {
  playerName: string;
  effortLevel: EffortLevel | null;
  raceId: string | null;
  subraceId: string | null;
  classId: string | null;
  subclassId: string | null;
  abilityScoreGuidance: AbilityScoreGuidance | null;
  abilityScoreMethod: AbilityScoreMethod | null;
  abilityScores: AbilityScores | null;
  abilityScoreBonusMode: AbilityScoreBonusMode | null;
  abilityScoreBonusAssignment: AbilityScoreBonusAssignment | null;
  spellChoiceMode: SpellChoiceMode | null;
  enemyHook: string;
  characterName: string;
};

export const EMPTY_ANSWERS: WizardAnswers = {
  playerName: "",
  effortLevel: null,
  raceId: null,
  subraceId: null,
  classId: null,
  subclassId: null,
  abilityScoreGuidance: null,
  abilityScoreMethod: null,
  abilityScores: null,
  abilityScoreBonusMode: null,
  abilityScoreBonusAssignment: null,
  spellChoiceMode: null,
  enemyHook: "",
  characterName: "",
};

export function getFinalAbilityScores(answers: WizardAnswers): AbilityScores | null {
  if (!answers.abilityScores) {
    return null;
  }
  const final = { ...answers.abilityScores };
  for (const { key, bonus } of answers.abilityScoreBonusAssignment ?? []) {
    final[key] = (final[key] ?? 0) + bonus;
  }
  return final;
}

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
