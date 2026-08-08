import type { DndClass } from "@/lib/dnd-data";

export type CombatRole = "melee" | "ranged" | "support" | "avoid";
export type MagicInterest = "none" | "little" | "lot";
export type SocialStyle = "leader" | "face" | "sneaky" | "loner";

export type FlavorAnswers = {
  combatRole: CombatRole;
  magicInterest: MagicInterest;
  socialStyle: SocialStyle;
};

const COMBAT_ROLE_SCORES: Record<CombatRole, Record<string, number>> = {
  melee: { fighter: 3, barbarian: 3, monk: 2, paladin: 2, rogue: 1 },
  ranged: { ranger: 3, rogue: 2, fighter: 1 },
  support: { cleric: 3, bard: 3, druid: 2 },
  avoid: { wizard: 3, sorcerer: 2, warlock: 2, bard: 1 },
};

const MAGIC_INTEREST_SCORES: Record<MagicInterest, Record<string, number>> = {
  none: { fighter: 2, barbarian: 2, rogue: 1, monk: 1 },
  little: { paladin: 2, ranger: 2, rogue: 1, fighter: 1 },
  lot: { wizard: 3, sorcerer: 3, warlock: 3, cleric: 2, druid: 2, bard: 2 },
};

const SOCIAL_STYLE_SCORES: Record<SocialStyle, Record<string, number>> = {
  leader: { paladin: 2, bard: 2, cleric: 2, fighter: 1 },
  face: { bard: 3, sorcerer: 2, warlock: 2 },
  sneaky: { rogue: 3, ranger: 2, monk: 1 },
  loner: { druid: 2, ranger: 2, barbarian: 2, warlock: 1 },
};

function scoreForClass(answers: FlavorAnswers, classId: string): number {
  return (
    (COMBAT_ROLE_SCORES[answers.combatRole][classId] ?? 0) +
    (MAGIC_INTEREST_SCORES[answers.magicInterest][classId] ?? 0) +
    (SOCIAL_STYLE_SCORES[answers.socialStyle][classId] ?? 0)
  );
}

export function scoreClasses(
  answers: FlavorAnswers,
  classes: DndClass[],
): DndClass[] {
  return [...classes].sort(
    (a, b) => scoreForClass(answers, b.id) - scoreForClass(answers, a.id),
  );
}
