export type ClassSpellList = {
  classId: string;
  cantrips: string[];
  level1: string[];
  level2: string[];
};

export const CLASS_SPELL_LISTS: ClassSpellList[] = [
  {
    classId: "bard",
    cantrips: ["Vicious Mockery", "Minor Illusion", "Mage Hand", "Dancing Lights"],
    level1: ["Faerie Fire", "Healing Word", "Dissonant Whispers", "Charm Person", "Sleep"],
    level2: ["Heat Metal", "Suggestion", "Shatter", "Invisibility", "Enthrall"],
  },
  {
    classId: "cleric",
    cantrips: ["Sacred Flame", "Guidance", "Spare the Dying", "Thaumaturgy", "Light"],
    level1: ["Cure Wounds", "Bless", "Guiding Bolt", "Healing Word", "Shield of Faith"],
    level2: ["Spiritual Weapon", "Lesser Restoration", "Prayer of Healing", "Silence", "Aid"],
  },
  {
    classId: "druid",
    cantrips: ["Produce Flame", "Guidance", "Shillelagh", "Thorn Whip"],
    level1: ["Entangle", "Faerie Fire", "Healing Word", "Goodberry", "Thunderwave"],
    level2: ["Barkskin", "Moonbeam", "Flaming Sphere", "Spike Growth"],
  },
  {
    classId: "paladin",
    cantrips: [],
    level1: ["Bless", "Cure Wounds", "Command", "Shield of Faith", "Divine Favor"],
    level2: ["Aid", "Lesser Restoration", "Zone of Truth", "Find Steed"],
  },
  {
    classId: "ranger",
    cantrips: [],
    level1: ["Hunter's Mark", "Cure Wounds", "Goodberry", "Ensnaring Strike"],
    level2: ["Spike Growth", "Pass without Trace", "Lesser Restoration", "Animal Messenger"],
  },
  {
    classId: "sorcerer",
    cantrips: ["Fire Bolt", "Mage Hand", "Minor Illusion", "Prestidigitation", "Ray of Frost"],
    level1: ["Magic Missile", "Shield", "Chromatic Orb", "Charm Person"],
    level2: ["Scorching Ray", "Mirror Image", "Misty Step", "Suggestion"],
  },
  {
    classId: "warlock",
    cantrips: ["Eldritch Blast", "Minor Illusion", "Prestidigitation"],
    level1: ["Hex", "Charm Person", "Armor of Agathys", "Tasha's Hideous Laughter"],
    level2: ["Suggestion", "Mirror Image", "Cloud of Daggers"],
  },
  {
    classId: "wizard",
    cantrips: ["Fire Bolt", "Mage Hand", "Minor Illusion", "Prestidigitation", "Ray of Frost"],
    level1: ["Magic Missile", "Shield", "Mage Armor", "Detect Magic", "Identify"],
    level2: ["Misty Step", "Mirror Image", "Scorching Ray", "Suggestion", "Web"],
  },
];

export function getClassSpellList(classId: string): ClassSpellList | undefined {
  return CLASS_SPELL_LISTS.find((l) => l.classId === classId);
}
