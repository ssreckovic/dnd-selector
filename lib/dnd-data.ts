export type Subrace = {
  id: string;
  name: string;
  blurb: string;
};

export type Race = {
  id: string;
  name: string;
  blurb: string;
  subraces?: Subrace[];
};

export type Subclass = {
  id: string;
  name: string;
  blurb: string;
  hasSpellcasting?: boolean;
};

export type DndClass = {
  id: string;
  name: string;
  blurb: string;
  baseSpellcasting: boolean;
  defaultSubclasses: Subclass[];
  allSubclasses: Subclass[];
};

export const RACES: Race[] = [
  {
    id: "human",
    name: "Human",
    blurb:
      "Adaptable and ambitious, humans are the most common folk in most worlds — quick to learn any path and comfortable anywhere.",
  },
  {
    id: "elf",
    name: "Elf",
    blurb:
      "Graceful and long-lived, elves are deeply attuned to magic and the natural world.",
    subraces: [
      {
        id: "high-elf",
        name: "High Elf",
        blurb:
          "Studious and magically inclined, drawn to arcane knowledge and old traditions.",
      },
      {
        id: "wood-elf",
        name: "Wood Elf",
        blurb:
          "At home in forests and wild places, quick on their feet and quiet as the trees.",
      },
      {
        id: "drow",
        name: "Drow",
        blurb:
          "Raised in the Underdark's shadow, drow are keen-eyed and comfortable in darkness.",
      },
    ],
  },
  {
    id: "dwarf",
    name: "Dwarf",
    blurb:
      "Sturdy and steadfast, dwarves value craft, clan, and endurance above all.",
    subraces: [
      {
        id: "hill-dwarf",
        name: "Hill Dwarf",
        blurb:
          "Wise and resilient, with an uncanny toughness that shrugs off harm.",
      },
      {
        id: "mountain-dwarf",
        name: "Mountain Dwarf",
        blurb: "Strong and battle-ready, raised for the forge and the front line.",
      },
    ],
  },
  {
    id: "halfling",
    name: "Halfling",
    blurb:
      "Small, lucky, and unassuming, halflings get by on nerve, wit, and good fortune.",
  },
  {
    id: "half-elf",
    name: "Half-Elf",
    blurb:
      "Caught between two worlds, half-elves blend human drive with elven grace.",
  },
  {
    id: "tiefling",
    name: "Tiefling",
    blurb:
      "Marked by an infernal bloodline, tieflings are often misunderstood but fiercely self-reliant.",
  },
  {
    id: "half-orc",
    name: "Half-Orc",
    blurb:
      "Powerful and relentless, half-orcs channel raw strength and a fierce will to survive.",
  },
  {
    id: "dragonborn",
    name: "Dragonborn",
    blurb:
      "Proud and honor-bound, dragonborn are descended from dragons and carry a bit of that power in their blood.",
  },
];

export const CLASSES: DndClass[] = [
  {
    id: "barbarian",
    name: "Barbarian",
    blurb: "A relentless warrior who fights with raw fury and unmatched toughness.",
    baseSpellcasting: false,
    defaultSubclasses: [
      { id: "berserker", name: "Path of the Berserker", blurb: "Channels rage into overwhelming, reckless offense." },
      { id: "totem-warrior", name: "Path of the Totem Warrior", blurb: "Draws on primal animal spirits for protection and power." },
    ],
    allSubclasses: [
      { id: "berserker", name: "Path of the Berserker", blurb: "Channels rage into overwhelming, reckless offense." },
      { id: "totem-warrior", name: "Path of the Totem Warrior", blurb: "Draws on primal animal spirits for protection and power." },
      { id: "ancestral-guardian", name: "Path of the Ancestral Guardian", blurb: "Calls on protective spirits to shield allies from harm." },
      { id: "storm-herald", name: "Path of the Storm Herald", blurb: "Surrounds themself with an aura of elemental fury." },
      { id: "zealot", name: "Path of the Zealot", blurb: "Fights with the fearless conviction of a holy crusader." },
    ],
  },
  {
    id: "bard",
    name: "Bard",
    blurb: "A charming performer whose music and words can inspire, heal, or unravel enemies.",
    baseSpellcasting: true,
    defaultSubclasses: [
      { id: "lore", name: "College of Lore", blurb: "A jack-of-all-trades who collects secrets and useful tricks." },
      { id: "valor", name: "College of Valor", blurb: "A battle-bard who inspires allies and fights alongside them." },
    ],
    allSubclasses: [
      { id: "lore", name: "College of Lore", blurb: "A jack-of-all-trades who collects secrets and useful tricks." },
      { id: "valor", name: "College of Valor", blurb: "A battle-bard who inspires allies and fights alongside them." },
      { id: "glamour", name: "College of Glamour", blurb: "Uses fey-touched charm to captivate and command a room." },
      { id: "swords", name: "College of Swords", blurb: "A blade-dancing performer who fights with flair." },
      { id: "whispers", name: "College of Whispers", blurb: "Uses fear and secrets as instruments, in the shadows of the stage." },
    ],
  },
  {
    id: "cleric",
    name: "Cleric",
    blurb: "A divine champion who heals allies and channels the power of a god in battle.",
    baseSpellcasting: true,
    defaultSubclasses: [
      { id: "life", name: "Life Domain", blurb: "The best healer of any cleric, keeping the whole party standing." },
      { id: "light", name: "Light Domain", blurb: "Wields fire and radiance to burn away darkness and evil." },
      { id: "war", name: "War Domain", blurb: "A martial cleric blessed for combat, fighting alongside their faith." },
    ],
    allSubclasses: [
      { id: "life", name: "Life Domain", blurb: "The best healer of any cleric, keeping the whole party standing." },
      { id: "light", name: "Light Domain", blurb: "Wields fire and radiance to burn away darkness and evil." },
      { id: "war", name: "War Domain", blurb: "A martial cleric blessed for combat, fighting alongside their faith." },
      { id: "knowledge", name: "Knowledge Domain", blurb: "A scholar-priest who values secrets and hidden lore." },
      { id: "nature", name: "Nature Domain", blurb: "A cleric of the wild, blending nature magic with divine power." },
      { id: "tempest", name: "Tempest Domain", blurb: "Commands storms and thunder in the name of a stormy god." },
      { id: "trickery", name: "Trickery Domain", blurb: "A mischievous cleric who values deception as much as devotion." },
      { id: "death", name: "Death Domain", blurb: "A grim cleric attuned to the power of death and decay." },
      { id: "forge", name: "Forge Domain", blurb: "A cleric of craft and fire, at home at the anvil and in battle." },
      { id: "grave", name: "Grave Domain", blurb: "A guardian against undeath, easing the passage between life and death." },
    ],
  },
  {
    id: "druid",
    name: "Druid",
    blurb: "A guardian of nature who can shape-shift into animals and command the wild.",
    baseSpellcasting: true,
    defaultSubclasses: [
      { id: "land", name: "Circle of the Land", blurb: "Draws deep magic from a chosen terrain, from forest to desert." },
      { id: "moon", name: "Circle of the Moon", blurb: "A fierce shapeshifter who becomes a powerful beast in combat." },
    ],
    allSubclasses: [
      { id: "land", name: "Circle of the Land", blurb: "Draws deep magic from a chosen terrain, from forest to desert." },
      { id: "moon", name: "Circle of the Moon", blurb: "A fierce shapeshifter who becomes a powerful beast in combat." },
      { id: "dreams", name: "Circle of Dreams", blurb: "Channels the gentle, healing magic of the Feywild." },
      { id: "shepherd", name: "Circle of the Shepherd", blurb: "A protector of beasts and spirits, leading them into battle." },
      { id: "spores", name: "Circle of Spores", blurb: "Embraces decay and fungal magic to wither foes and rise again." },
    ],
  },
  {
    id: "fighter",
    name: "Fighter",
    blurb: "A master of weapons and tactics who can adapt to nearly any fight.",
    baseSpellcasting: false,
    defaultSubclasses: [
      { id: "champion", name: "Champion", blurb: "A straightforward, hard-hitting warrior who excels at landing critical blows." },
      { id: "battle-master", name: "Battle Master", blurb: "A tactician who uses special combat maneuvers to control the battlefield." },
      { id: "eldritch-knight", name: "Eldritch Knight", blurb: "A soldier who blends swordplay with a handful of arcane spells.", hasSpellcasting: true },
    ],
    allSubclasses: [
      { id: "champion", name: "Champion", blurb: "A straightforward, hard-hitting warrior who excels at landing critical blows." },
      { id: "battle-master", name: "Battle Master", blurb: "A tactician who uses special combat maneuvers to control the battlefield." },
      { id: "eldritch-knight", name: "Eldritch Knight", blurb: "A soldier who blends swordplay with a handful of arcane spells.", hasSpellcasting: true },
      { id: "arcane-archer", name: "Arcane Archer", blurb: "A ranged specialist who fires magic-infused arrows." },
      { id: "cavalier", name: "Cavalier", blurb: "A mounted protector who guards allies and punishes those who ignore them." },
      { id: "samurai", name: "Samurai", blurb: "An unshakeable warrior fueled by fighting spirit and resolve." },
    ],
  },
  {
    id: "monk",
    name: "Monk",
    blurb: "A disciplined martial artist who fights unarmed with incredible speed and precision.",
    baseSpellcasting: false,
    defaultSubclasses: [
      { id: "open-hand", name: "Way of the Open Hand", blurb: "A master of unarmed combat who can stun, throw, and control opponents." },
      { id: "shadow", name: "Way of Shadow", blurb: "A stealthy monk who uses shadow magic to strike from darkness." },
    ],
    allSubclasses: [
      { id: "open-hand", name: "Way of the Open Hand", blurb: "A master of unarmed combat who can stun, throw, and control opponents." },
      { id: "shadow", name: "Way of Shadow", blurb: "A stealthy monk who uses shadow magic to strike from darkness." },
      { id: "four-elements", name: "Way of the Four Elements", blurb: "Channels elemental magic — fire, water, earth, air — through martial arts." },
      { id: "drunken-master", name: "Way of the Drunken Master", blurb: "An unpredictable, stumbling fighting style that's harder to hit than it looks." },
      { id: "kensei", name: "Way of the Kensei", blurb: "Treats weapons as an extension of the body, blending them with monk technique." },
      { id: "sun-soul", name: "Way of the Sun Soul", blurb: "Channels inner energy into blasts of radiant light." },
    ],
  },
  {
    id: "paladin",
    name: "Paladin",
    blurb: "A holy warrior bound by an oath, mixing martial power with divine magic.",
    baseSpellcasting: true,
    defaultSubclasses: [
      { id: "devotion", name: "Oath of Devotion", blurb: "The classic, honor-bound knight who upholds justice and protects the weak." },
      { id: "vengeance", name: "Oath of Vengeance", blurb: "A grim paladin driven to punish those who commit great evil." },
    ],
    allSubclasses: [
      { id: "devotion", name: "Oath of Devotion", blurb: "The classic, honor-bound knight who upholds justice and protects the weak." },
      { id: "vengeance", name: "Oath of Vengeance", blurb: "A grim paladin driven to punish those who commit great evil." },
      { id: "ancients", name: "Oath of the Ancients", blurb: "A paladin sworn to protect nature, light, and joy against the dark." },
      { id: "conquest", name: "Oath of Conquest", blurb: "Rules through fear, crushing enemies beneath an iron will." },
      { id: "redemption", name: "Oath of Redemption", blurb: "Seeks to turn enemies from violence rather than destroy them." },
    ],
  },
  {
    id: "ranger",
    name: "Ranger",
    blurb: "A skilled hunter and tracker at home in the wild, fighting alongside nature.",
    baseSpellcasting: true,
    defaultSubclasses: [
      { id: "hunter", name: "Hunter", blurb: "A versatile fighter honed to take down all manner of foes." },
      { id: "beast-master", name: "Beast Master", blurb: "Fights alongside a loyal animal companion." },
    ],
    allSubclasses: [
      { id: "hunter", name: "Hunter", blurb: "A versatile fighter honed to take down all manner of foes." },
      { id: "beast-master", name: "Beast Master", blurb: "Fights alongside a loyal animal companion." },
      { id: "gloom-stalker", name: "Gloom Stalker", blurb: "An ambush hunter who strikes hardest from darkness and shadow." },
      { id: "horizon-walker", name: "Horizon Walker", blurb: "Guards the world against planar threats, stepping briefly between dimensions." },
      { id: "monster-slayer", name: "Monster Slayer", blurb: "A dedicated hunter of magical and supernatural horrors." },
    ],
  },
  {
    id: "rogue",
    name: "Rogue",
    blurb: "A cunning, skillful character who relies on precision, stealth, and wit over brute force.",
    baseSpellcasting: false,
    defaultSubclasses: [
      { id: "thief", name: "Thief", blurb: "A nimble specialist in sleight of hand, locks, and climbing anything." },
      { id: "assassin", name: "Assassin", blurb: "A master of the element of surprise and the deadly first strike." },
      { id: "arcane-trickster", name: "Arcane Trickster", blurb: "A rogue who mixes in a handful of illusion and trickery spells.", hasSpellcasting: true },
    ],
    allSubclasses: [
      { id: "thief", name: "Thief", blurb: "A nimble specialist in sleight of hand, locks, and climbing anything." },
      { id: "assassin", name: "Assassin", blurb: "A master of the element of surprise and the deadly first strike." },
      { id: "arcane-trickster", name: "Arcane Trickster", blurb: "A rogue who mixes in a handful of illusion and trickery spells.", hasSpellcasting: true },
      { id: "inquisitive", name: "Inquisitive", blurb: "A sharp-eyed investigator who reads lies and finds what's hidden." },
      { id: "mastermind", name: "Mastermind", blurb: "A schemer who directs allies and manipulates from behind the scenes." },
      { id: "scout", name: "Scout", blurb: "A quick, wilderness-savvy skirmisher who strikes and moves." },
      { id: "swashbuckler", name: "Swashbuckler", blurb: "A flashy duelist who charms and outmaneuvers single foes." },
    ],
  },
  {
    id: "sorcerer",
    name: "Sorcerer",
    blurb: "A spellcaster whose magic comes from an innate, often inherited, magical bloodline.",
    baseSpellcasting: true,
    defaultSubclasses: [
      { id: "draconic-bloodline", name: "Draconic Bloodline", blurb: "Magic fueled by dragon ancestry, with tougher skin and elemental power." },
      { id: "wild-magic", name: "Wild Magic", blurb: "Unpredictable magic that can surge in surprising, chaotic ways." },
    ],
    allSubclasses: [
      { id: "draconic-bloodline", name: "Draconic Bloodline", blurb: "Magic fueled by dragon ancestry, with tougher skin and elemental power." },
      { id: "wild-magic", name: "Wild Magic", blurb: "Unpredictable magic that can surge in surprising, chaotic ways." },
      { id: "divine-soul", name: "Divine Soul", blurb: "Magic with a celestial or divine spark, blending sorcery with healing." },
      { id: "shadow-magic", name: "Shadow Magic", blurb: "Magic touched by the Shadowfell, at home with darkness and fear." },
      { id: "storm-sorcery", name: "Storm Sorcery", blurb: "Magic drawn from storms and wind, favoring mobility and elemental power." },
    ],
  },
  {
    id: "warlock",
    name: "Warlock",
    blurb: "A spellcaster who traded a pact with a powerful otherworldly patron for magical power.",
    baseSpellcasting: true,
    defaultSubclasses: [
      { id: "fiend", name: "The Fiend", blurb: "A pact with a devil or demon, favoring fire and destructive power." },
      { id: "archfey", name: "The Archfey", blurb: "A pact with a fey lord, favoring charm, illusion, and trickery." },
    ],
    allSubclasses: [
      { id: "fiend", name: "The Fiend", blurb: "A pact with a devil or demon, favoring fire and destructive power." },
      { id: "archfey", name: "The Archfey", blurb: "A pact with a fey lord, favoring charm, illusion, and trickery." },
      { id: "great-old-one", name: "The Great Old One", blurb: "A pact with an alien, incomprehensible being from beyond the stars." },
      { id: "celestial", name: "The Celestial", blurb: "A pact with a being of the upper planes, granting healing and radiant power." },
      { id: "hexblade", name: "The Hexblade", blurb: "A pact with a sentient weapon from the Shadowfell, favoring melee combat." },
    ],
  },
  {
    id: "wizard",
    name: "Wizard",
    blurb: "A scholarly spellcaster who studies magic from books and commands the widest variety of spells.",
    baseSpellcasting: true,
    defaultSubclasses: [
      { id: "evocation", name: "School of Evocation", blurb: "Specializes in powerful, damaging blasts of elemental magic." },
      { id: "abjuration", name: "School of Abjuration", blurb: "Specializes in protective magic — shields, wards, and defense." },
    ],
    allSubclasses: [
      { id: "evocation", name: "School of Evocation", blurb: "Specializes in powerful, damaging blasts of elemental magic." },
      { id: "abjuration", name: "School of Abjuration", blurb: "Specializes in protective magic — shields, wards, and defense." },
      { id: "conjuration", name: "School of Conjuration", blurb: "Specializes in summoning creatures and objects from thin air." },
      { id: "divination", name: "School of Divination", blurb: "Specializes in foresight, information, and bending fate slightly." },
      { id: "enchantment", name: "School of Enchantment", blurb: "Specializes in charming and controlling the minds of others." },
      { id: "illusion", name: "School of Illusion", blurb: "Specializes in tricking the senses with false sights and sounds." },
      { id: "necromancy", name: "School of Necromancy", blurb: "Specializes in the magic of life, death, and the undead." },
      { id: "war-magic", name: "School of War Magic", blurb: "A battle-ready wizard who blends spellcasting with combat tactics." },
    ],
  },
];

export function getRace(id: string): Race | undefined {
  return RACES.find((r) => r.id === id);
}

export function getClass(id: string): DndClass | undefined {
  return CLASSES.find((c) => c.id === id);
}

export function classGrantsSpellcasting(
  classId: string | null,
  subclassId: string | null,
): boolean {
  const dndClass = classId ? getClass(classId) : undefined;
  if (!dndClass) return false;
  if (dndClass.baseSpellcasting) return true;
  const subclass = dndClass.allSubclasses.find((s) => s.id === subclassId);
  return Boolean(subclass?.hasSpellcasting);
}
