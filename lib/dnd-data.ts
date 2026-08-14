export type Subrace = {
  id: string;
  name: string;
  blurb: string;
  detail: string[];
};

export type Race = {
  id: string;
  name: string;
  blurb: string;
  detail: string[];
  subraces?: Subrace[];
};

export type Subclass = {
  id: string;
  name: string;
  blurb: string;
  detail: string[];
  hasSpellcasting?: boolean;
  easy?: boolean;
};

export type AbilityKey = "str" | "dex" | "con" | "int" | "wis" | "cha";

export type DndClass = {
  id: string;
  name: string;
  blurb: string;
  detail: string[];
  baseSpellcasting: boolean;
  defaultSubclasses: Subclass[];
  allSubclasses: Subclass[];
  primaryAbilities: AbilityKey[];
  spellcastingAbility?: AbilityKey;
};

export const RACES: Race[] = [
  {
    id: "human",
    name: "Human",
    blurb:
      "Adaptable and ambitious, humans are the most common folk in most worlds — quick to learn any path and comfortable anywhere.",
    detail: ["+1 to every ability score", "One extra language of your choice"],
  },
  {
    id: "elf",
    name: "Elf",
    blurb:
      "Graceful and long-lived, elves are deeply attuned to magic and the natural world.",
    detail: [
      "Darkvision out to 60 feet",
      "Fey Ancestry: advantage on saves vs. being charmed, immune to magical sleep",
      "Trance: needs only 4 hours of rest instead of 8",
      "Keen Senses: proficiency in Perception",
    ],
    subraces: [
      {
        id: "high-elf",
        name: "High Elf",
        blurb:
          "Studious and magically inclined, drawn to arcane knowledge and old traditions.",
        detail: [
          "Knows one wizard cantrip of choice (Intelligence-based)",
          "One extra language of your choice",
        ],
      },
      {
        id: "wood-elf",
        name: "Wood Elf",
        blurb:
          "At home in forests and wild places, quick on their feet and quiet as the trees.",
        detail: [
          "Base walking speed increased to 35 feet",
          "Mask of the Wild: can attempt to hide when lightly obscured by natural phenomena",
        ],
      },
      {
        id: "drow",
        name: "Drow",
        blurb:
          "Raised in the Underdark's shadow, drow are keen-eyed and comfortable in darkness.",
        detail: [
          "Superior Darkvision out to 120 feet",
          "Drow Magic: learns Dancing Lights, later Faerie Fire and Darkness",
          "Sunlight Sensitivity: disadvantage on attacks and Perception in direct sunlight",
        ],
      },
    ],
  },
  {
    id: "dwarf",
    name: "Dwarf",
    blurb:
      "Sturdy and steadfast, dwarves value craft, clan, and endurance above all.",
    detail: [
      "Darkvision out to 60 feet",
      "Dwarven Resilience: advantage on saves vs. poison, resistance to poison damage",
      "Dwarven Combat Training: proficiency with battleaxe, handaxe, light hammer, warhammer",
      "Stonecunning: double proficiency bonus on History checks about stonework",
    ],
    subraces: [
      {
        id: "hill-dwarf",
        name: "Hill Dwarf",
        blurb:
          "Wise and resilient, with an uncanny toughness that shrugs off harm.",
        detail: ["Dwarven Toughness: +1 hit point per level"],
      },
      {
        id: "mountain-dwarf",
        name: "Mountain Dwarf",
        blurb: "Strong and battle-ready, raised for the forge and the front line.",
        detail: ["Dwarven Armor Training: proficiency with light and medium armor"],
      },
    ],
  },
  {
    id: "halfling",
    name: "Halfling",
    blurb:
      "Small, lucky, and unassuming, halflings get by on nerve, wit, and good fortune.",
    detail: [
      "Lucky: reroll any natural 1 on an attack, ability check, or save",
      "Brave: advantage on saves vs. being frightened",
      "Halfling Nimbleness: can move through the space of a larger creature",
    ],
  },
  {
    id: "half-elf",
    name: "Half-Elf",
    blurb:
      "Caught between two worlds, half-elves blend human drive with elven grace.",
    detail: [
      "Darkvision out to 60 feet",
      "Fey Ancestry: advantage on saves vs. being charmed, immune to magical sleep",
      "Skill Versatility: proficiency in two skills of your choice",
    ],
  },
  {
    id: "tiefling",
    name: "Tiefling",
    blurb:
      "Marked by an infernal bloodline, tieflings are often misunderstood but fiercely self-reliant.",
    detail: [
      "Darkvision out to 60 feet",
      "Hellish Resistance: resistance to fire damage",
      "Infernal Legacy: knows the Thaumaturgy cantrip, gains more infernal spells later",
    ],
  },
  {
    id: "half-orc",
    name: "Half-Orc",
    blurb:
      "Powerful and relentless, half-orcs channel raw strength and a fierce will to survive.",
    detail: [
      "Darkvision out to 60 feet",
      "Relentless Endurance: drop to 1 HP instead of 0 once per long rest",
      "Savage Attacks: roll an extra weapon damage die on a critical hit",
    ],
  },
  {
    id: "dragonborn",
    name: "Dragonborn",
    blurb:
      "Proud and honor-bound, dragonborn are descended from dragons and carry a bit of that power in their blood.",
    detail: [
      "Draconic Ancestry determines your breath weapon and damage resistance",
      "Breath Weapon: an area attack usable a few times per day",
      "Damage Resistance to the type tied to your draconic ancestry",
    ],
  },
];

const berserker: Subclass = { id: "berserker", name: "Path of the Berserker", blurb: "Channels rage into overwhelming, reckless offense.", detail: ["Frenzy: extra attack while raging, at the cost of exhaustion afterward", "Mindless Rage: can't be charmed or frightened while raging"], easy: true };
const totemWarrior: Subclass = { id: "totem-warrior", name: "Path of the Totem Warrior", blurb: "Draws on primal animal spirits for protection and power.", detail: ["Spirit Seeker: ritual casting of Beast Sense and Speak with Animals", "Totem Spirit: choose an animal spirit (Bear, Eagle, or Wolf) for a bonus"] };
const ancestralGuardian: Subclass = { id: "ancestral-guardian", name: "Path of the Ancestral Guardian", blurb: "Calls on protective spirits to shield allies from harm.", detail: ["Ancestral Protectors: spectral warriors hinder enemies who hit your allies", "Halves damage dealt to allies within 30 feet while raging"] };
const stormHerald: Subclass = { id: "storm-herald", name: "Path of the Storm Herald", blurb: "Surrounds themself with an aura of elemental fury.", detail: ["Storm Aura: a persistent elemental aura (desert, sea, or tundra) while raging", "Storm Soul: minor resistances and utility tied to the chosen aura"] };
const zealot: Subclass = { id: "zealot", name: "Path of the Zealot", blurb: "Fights with the fearless conviction of a holy crusader.", detail: ["Divine Fury: extra necrotic or radiant damage on your first hit each turn", "Warrior of the Gods: easier to bring back from death"] };

const lore: Subclass = { id: "lore", name: "College of Lore", blurb: "A jack-of-all-trades who collects secrets and useful tricks.", detail: ["Bonus Proficiencies: three extra skill proficiencies", "Cutting Words: spend Bardic Inspiration to subtract from an enemy's roll"], easy: true };
const valor: Subclass = { id: "valor", name: "College of Valor", blurb: "A battle-bard who inspires allies and fights alongside them.", detail: ["Combat Inspiration: Bardic Inspiration die can boost damage or AC", "Extra Attack: attack twice when you take the Attack action"] };
const glamour: Subclass = { id: "glamour", name: "College of Glamour", blurb: "Uses fey-touched charm to captivate and command a room.", detail: ["Mantle of Inspiration: grants temporary HP and free movement to allies", "Enthralling Performance: can charm an audience after performing"] };
const swords: Subclass = { id: "swords", name: "College of Swords", blurb: "A blade-dancing performer who fights with flair.", detail: ["Fighting Style plus Blade Flourish: extra effects when you attack with a bonus action", "Bonus Proficiency: gains proficiency with medium armor and scimitars"] };
const whispers: Subclass = { id: "whispers", name: "College of Whispers", blurb: "Uses fear and secrets as instruments, in the shadows of the stage.", detail: ["Psychic Blades: extra psychic damage on a hit using Bardic Inspiration", "Words of Terror: can plant creeping fear in a conversation partner"] };

const life: Subclass = { id: "life", name: "Life Domain", blurb: "The best healer of any cleric, keeping the whole party standing.", detail: ["Disciple of Life: healing spells restore extra hit points", "Bonus Proficiency: heavy armor"], easy: true };
const light: Subclass = { id: "light", name: "Light Domain", blurb: "Wields fire and radiance to burn away darkness and evil.", detail: ["Warding Flare: impose disadvantage on an attacker's roll", "Bonus Cantrip: Light"] };
const war: Subclass = { id: "war", name: "War Domain", blurb: "A martial cleric blessed for combat, fighting alongside their faith.", detail: ["War Priest: bonus attack a number of times per day", "Bonus Proficiency: martial weapons and heavy armor"] };
const knowledge: Subclass = { id: "knowledge", name: "Knowledge Domain", blurb: "A scholar-priest who values secrets and hidden lore.", detail: ["Blessings of Knowledge: two extra languages and skill proficiencies", "Knowledge of the Ages: temporary proficiency in any skill or tool"] };
const nature: Subclass = { id: "nature", name: "Nature Domain", blurb: "A cleric of the wild, blending nature magic with divine power.", detail: ["Acolyte of Nature: a bonus cantrip and skill proficiency", "Bonus Proficiency: heavy armor"] };
const tempest: Subclass = { id: "tempest", name: "Tempest Domain", blurb: "Commands storms and thunder in the name of a stormy god.", detail: ["Wrath of the Storm: retaliate with thunder or lightning damage when struck", "Bonus Proficiency: martial weapons and heavy armor"] };
const trickery: Subclass = { id: "trickery", name: "Trickery Domain", blurb: "A mischievous cleric who values deception as much as devotion.", detail: ["Blessing of the Trickster: grants an ally advantage on Stealth checks", "Invoke Duplicity: creates an illusory duplicate of yourself"] };
const death: Subclass = { id: "death", name: "Death Domain", blurb: "A grim cleric attuned to the power of death and decay.", detail: ["Reaper: extra necromancy cantrip options and range", "Bonus Proficiency: martial weapons"] };
const forge: Subclass = { id: "forge", name: "Forge Domain", blurb: "A cleric of craft and fire, at home at the anvil and in battle.", detail: ["Blessing of the Forge: magically enhance a weapon or armor for an hour", "Bonus Proficiency: heavy armor"] };
const grave: Subclass = { id: "grave", name: "Grave Domain", blurb: "A guardian against undeath, easing the passage between life and death.", detail: ["Circle of Mortality: maximizes healing dice on creatures at 0 HP", "Eyes of the Grave: sense undead nearby"] };

const land: Subclass = { id: "land", name: "Circle of the Land", blurb: "Draws deep magic from a chosen terrain, from forest to desert.", detail: ["Natural Recovery: regain some spell slots on a short rest", "Bonus cantrip and circle spells tied to your chosen terrain"], easy: true };
const moon: Subclass = { id: "moon", name: "Circle of the Moon", blurb: "A fierce shapeshifter who becomes a powerful beast in combat.", detail: ["Combat Wild Shape: shift as a bonus action and heal by spending spell slots", "Can wild shape into more dangerous beasts earlier"] };
const dreams: Subclass = { id: "dreams", name: "Circle of Dreams", blurb: "Channels the gentle, healing magic of the Feywild.", detail: ["Balm of the Summer Court: a pool of healing dice for allies", "Extra Feywild-flavored spells"] };
const shepherd: Subclass = { id: "shepherd", name: "Circle of the Shepherd", blurb: "A protector of beasts and spirits, leading them into battle.", detail: ["Speech of the Woods: communicate with beasts and some fey", "Spirit Totem: summon a totem that buffs nearby allies"] };
const spores: Subclass = { id: "spores", name: "Circle of Spores", blurb: "Embraces decay and fungal magic to wither foes and rise again.", detail: ["Halo of Spores: damages enemies who end their turn nearby", "Symbiotic Entity: temporary HP and boosted unarmed strikes"] };

const champion: Subclass = { id: "champion", name: "Champion", blurb: "A straightforward, hard-hitting warrior who excels at landing critical blows.", detail: ["Improved Critical: scores a critical hit on a roll of 19 or 20", "Remarkable Athlete: bonus to Strength/Dexterity/Constitution checks"], easy: true };
const battleMaster: Subclass = { id: "battle-master", name: "Battle Master", blurb: "A tactician who uses special combat maneuvers to control the battlefield.", detail: ["Combat Superiority: superiority dice fuel combat maneuvers like Trip Attack and Parry", "Student of War: bonus proficiency with one artisan's tool"] };
const eldritchKnight: Subclass = { id: "eldritch-knight", name: "Eldritch Knight", blurb: "A soldier who blends swordplay with a handful of arcane spells.", hasSpellcasting: true, detail: ["Spellcasting: learns wizard spells, mostly from the abjuration and evocation schools", "Weapon Bond: bond with a weapon so it can't be disarmed and can be summoned"] };
const arcaneArcher: Subclass = { id: "arcane-archer", name: "Arcane Archer", blurb: "A ranged specialist who fires magic-infused arrows.", detail: ["Arcane Shot: infuse arrows with effects like Banishing or Seeking", "Magic Arrow: your nonmagical ammunition counts as magical"] };
const cavalier: Subclass = { id: "cavalier", name: "Cavalier", blurb: "A mounted protector who guards allies and punishes those who ignore them.", detail: ["Born to the Saddle: near-unshakeable mounted combat", "Unwavering Mark: punishes foes who attack someone else instead of you"] };
const samurai: Subclass = { id: "samurai", name: "Samurai", blurb: "An unshakeable warrior fueled by fighting spirit and resolve.", detail: ["Fighting Spirit: bonus action grants temporary HP and advantage on attacks", "Bonus Proficiency: one extra language or skill"] };

const openHand: Subclass = { id: "open-hand", name: "Way of the Open Hand", blurb: "A master of unarmed combat who can stun, throw, and control opponents.", detail: ["Open Hand Technique: added effects when you land Flurry of Blows", "Wholeness of Body: heal yourself using ki"], easy: true };
const shadow: Subclass = { id: "shadow", name: "Way of Shadow", blurb: "A stealthy monk who uses shadow magic to strike from darkness.", detail: ["Shadow Arts: cast Darkness, Darkvision, Pass without Trace, or Silence using ki", "Shadow Step: teleport between shadows as a bonus action"] };
const fourElements: Subclass = { id: "four-elements", name: "Way of the Four Elements", blurb: "Channels elemental magic — fire, water, earth, air — through martial arts.", detail: ["Elemental Attunement: minor elemental utility tricks", "Learns elemental disciplines cast by spending ki points"] };
const drunkenMaster: Subclass = { id: "drunken-master", name: "Way of the Drunken Master", blurb: "An unpredictable, stumbling fighting style that's harder to hit than it looks.", detail: ["Drunken Technique: Flurry of Blows grants extra movement without opportunity attacks", "Tipsy Sway: swap places with a target after a miss"] };
const kensei: Subclass = { id: "kensei", name: "Way of the Kensei", blurb: "Treats weapons as an extension of the body, blending them with monk technique.", detail: ["Kensei Weapons: chosen weapons count as monk weapons", "Agile Parry: extra AC and unarmed strike after an attack"] };
const sunSoul: Subclass = { id: "sun-soul", name: "Way of the Sun Soul", blurb: "Channels inner energy into blasts of radiant light.", detail: ["Radiant Sun Bolt: ranged unarmed strikes made of searing light", "Later gains a searing sunburst area attack"] };

const devotion: Subclass = { id: "devotion", name: "Oath of Devotion", blurb: "The classic, honor-bound knight who upholds justice and protects the weak.", detail: ["Sacred Weapon: channel divinity to make your weapon magical and glowing", "Turn the Unholy: channel divinity to repel fiends and undead"], easy: true };
const vengeance: Subclass = { id: "vengeance", name: "Oath of Vengeance", blurb: "A grim paladin driven to punish those who commit great evil.", detail: ["Abjure Enemy: channel divinity to frighten a foe", "Vow of Enmity: channel divinity for advantage on attacks against one target"] };
const ancients: Subclass = { id: "ancients", name: "Oath of the Ancients", blurb: "A paladin sworn to protect nature, light, and joy against the dark.", detail: ["Nature's Wrath: channel divinity to magically restrain a creature", "Turn the Faithless: channel divinity to repel fey and fiends"] };
const conquest: Subclass = { id: "conquest", name: "Oath of Conquest", blurb: "Rules through fear, crushing enemies beneath an iron will.", detail: ["Conquering Presence: channel divinity to frighten nearby foes", "Guided Strike: channel divinity for a guaranteed hit"] };
const redemption: Subclass = { id: "redemption", name: "Oath of Redemption", blurb: "Seeks to turn enemies from violence rather than destroy them.", detail: ["Emissary of Peace: channel divinity for a lasting bonus to persuasion", "Rebuke the Violent: channel divinity to punish an attacker with their own damage"] };

const hunter: Subclass = { id: "hunter", name: "Hunter", blurb: "A versatile fighter honed to take down all manner of foes.", detail: ["Hunter's Prey: choose a combat trick like Colossus Slayer or Horde Breaker", "Later gains Defensive Tactics and Multiattack options"], easy: true };
const beastMaster: Subclass = { id: "beast-master", name: "Beast Master", blurb: "Fights alongside a loyal animal companion.", detail: ["Ranger's Companion: gain a loyal beast companion that fights at your command", "Can share some of your commands with it as a bonus action"] };
const gloomStalker: Subclass = { id: "gloom-stalker", name: "Gloom Stalker", blurb: "An ambush hunter who strikes hardest from darkness and shadow.", detail: ["Dread Ambusher: extra speed and a bonus attack on the first turn of combat", "Umbral Sight: darkvision, and invisible to darkvision while in darkness"] };
const horizonWalker: Subclass = { id: "horizon-walker", name: "Horizon Walker", blurb: "Guards the world against planar threats, stepping briefly between dimensions.", detail: ["Detect Portal: sense nearby planar portals", "Planar Warrior: teleport-infused strikes that deal force damage"] };
const monsterSlayer: Subclass = { id: "monster-slayer", name: "Monster Slayer", blurb: "A dedicated hunter of magical and supernatural horrors.", detail: ["Hunter's Sense: learn a creature's damage resistances/immunities on sight", "Slayer's Prey: extra damage against a marked target"] };

const thief: Subclass = { id: "thief", name: "Thief", blurb: "A nimble specialist in sleight of hand, locks, and climbing anything.", detail: ["Fast Hands: use Cunning Action for Sleight of Hand, tools, or objects", "Second-Story Work: better climbing and jumping distance"], easy: true };
const assassin: Subclass = { id: "assassin", name: "Assassin", blurb: "A master of the element of surprise and the deadly first strike.", detail: ["Assassinate: advantage vs. surprised targets and an automatic critical hit", "Bonus Proficiency: disguise kit and poisoner's kit"] };
const arcaneTrickster: Subclass = { id: "arcane-trickster", name: "Arcane Trickster", blurb: "A rogue who mixes in a handful of illusion and trickery spells.", hasSpellcasting: true, detail: ["Spellcasting: learns illusion and enchantment spells", "Mage Hand Legerdemain: a subtle, invisible Mage Hand for tricks"] };
const inquisitive: Subclass = { id: "inquisitive", name: "Inquisitive", blurb: "A sharp-eyed investigator who reads lies and finds what's hidden.", detail: ["Ear for Deceit: near-guaranteed sense for when someone is lying", "Eye for Detail: quick spot checks for hidden details and disguises"] };
const mastermind: Subclass = { id: "mastermind", name: "Mastermind", blurb: "A schemer who directs allies and manipulates from behind the scenes.", detail: ["Master of Intrigue: mimic dialects and disguise your speech", "Master of Tactics: grant Help as a bonus action at range"] };
const scout: Subclass = { id: "scout", name: "Scout", blurb: "A quick, wilderness-savvy skirmisher who strikes and moves.", detail: ["Skirmisher: move away from approaching enemies as a reaction", "Survivalist: bonus proficiency in Nature and Survival"] };
const swashbuckler: Subclass = { id: "swashbuckler", name: "Swashbuckler", blurb: "A flashy duelist who charms and outmaneuvers single foes.", detail: ["Fancy Footwork: a foe you attack in melee can't make opportunity attacks on you", "Rakish Audacity: bonus to initiative and Sneak Attack without an ally nearby"] };

const draconicBloodline: Subclass = { id: "draconic-bloodline", name: "Draconic Bloodline", blurb: "Magic fueled by dragon ancestry, with tougher skin and elemental power.", detail: ["Draconic Resilience: extra hit points and AC without armor", "Spells of your draconic damage type deal extra damage"], easy: true };
const wildMagic: Subclass = { id: "wild-magic", name: "Wild Magic", blurb: "Unpredictable magic that can surge in surprising, chaotic ways.", detail: ["Wild Magic Surge: casting a spell can trigger a random magical effect", "Tides of Chaos: gain advantage on a roll at the cost of a future surge"] };
const divineSoul: Subclass = { id: "divine-soul", name: "Divine Soul", blurb: "Magic with a celestial or divine spark, blending sorcery with healing.", detail: ["Divine Magic: can learn spells from the cleric list as well", "Favored by the Gods: add a bonus roll to a failed attack or save"] };
const shadowMagic: Subclass = { id: "shadow-magic", name: "Shadow Magic", blurb: "Magic touched by the Shadowfell, at home with darkness and fear.", detail: ["Eyes of the Dark: darkvision and can cast Darkness using sorcery points", "Strength of the Grave: chance to shrug off a killing blow"] };
const stormSorcery: Subclass = { id: "storm-sorcery", name: "Storm Sorcery", blurb: "Magic drawn from storms and wind, favoring mobility and elemental power.", detail: ["Tempestuous Magic: fly briefly as a bonus action after casting a spell", "Heart of the Storm: resistance to lightning/thunder, and a stormy aura when casting"] };

const fiend: Subclass = { id: "fiend", name: "The Fiend", blurb: "A pact with a devil or demon, favoring fire and destructive power.", detail: ["Dark One's Blessing: gain temporary hit points when you reduce a foe to 0 HP", "Dark One's Own Luck: add a bonus to an ability check or save"], easy: true };
const archfey: Subclass = { id: "archfey", name: "The Archfey", blurb: "A pact with a fey lord, favoring charm, illusion, and trickery.", detail: ["Fey Presence: charm or frighten creatures in a burst around you", "Misty Escape: teleport away in mist after taking damage"] };
const greatOldOne: Subclass = { id: "great-old-one", name: "The Great Old One", blurb: "A pact with an alien, incomprehensible being from beyond the stars.", detail: ["Awakened Mind: telepathic communication with nearby creatures", "Entropic Ward: impose disadvantage on an attacker, with a reaction benefit if it misses"] };
const celestial: Subclass = { id: "celestial", name: "The Celestial", blurb: "A pact with a being of the upper planes, granting healing and radiant power.", detail: ["Healing Light: a pool of d6s you can spend to heal", "Bonus Cantrips: Light and Sacred Flame"] };
const hexblade: Subclass = { id: "hexblade", name: "The Hexblade", blurb: "A pact with a sentient weapon from the Shadowfell, favoring melee combat.", detail: ["Hexblade's Curse: curse a target for extra damage and crit range", "Hex Warrior: use Charisma for attack and damage with a chosen weapon"] };

const evocation: Subclass = { id: "evocation", name: "School of Evocation", blurb: "Specializes in powerful, damaging blasts of elemental magic.", detail: ["Sculpt Spells: shield allies from your own area-of-effect spells", "Later deals extra damage with evocation spells"], easy: true };
const abjuration: Subclass = { id: "abjuration", name: "School of Abjuration", blurb: "Specializes in protective magic — shields, wards, and defense.", detail: ["Arcane Ward: a shield of magical energy that absorbs damage", "Ward can be recharged by casting abjuration spells"] };
const conjuration: Subclass = { id: "conjuration", name: "School of Conjuration", blurb: "Specializes in summoning creatures and objects from thin air.", detail: ["Minor Conjuration: conjure a harmless inanimate object", "Benign Transposition: teleport yourself or swap with a willing creature"] };
const divination: Subclass = { id: "divination", name: "School of Divination", blurb: "Specializes in foresight, information, and bending fate slightly.", detail: ["Portent: roll dice at dawn and swap them in for any roll later", "Later can force disadvantage on an attack roll against you"] };
const enchantment: Subclass = { id: "enchantment", name: "School of Enchantment", blurb: "Specializes in charming and controlling the minds of others.", detail: ["Hypnotic Gaze: lightly incapacitate a creature with your stare", "Later can instantly charm a creature you damage"] };
const illusion: Subclass = { id: "illusion", name: "School of Illusion", blurb: "Specializes in tricking the senses with false sights and sounds.", detail: ["Improved Minor Illusion: learn Minor Illusion and add sound and image together", "Later illusions can seem real when interacted with"] };
const necromancy: Subclass = { id: "necromancy", name: "School of Necromancy", blurb: "Specializes in the magic of life, death, and the undead.", detail: ["Grim Harvest: heal by killing creatures with spells", "Undead you create are tougher and hit harder"] };
const warMagic: Subclass = { id: "war-magic", name: "School of War Magic", blurb: "A battle-ready wizard who blends spellcasting with combat tactics.", detail: ["Arcane Deflection: bonus to AC or a save at the cost of your next spell", "Tactical Wit: add Intelligence modifier to initiative"] };

export const CLASSES: DndClass[] = [
  {
    id: "barbarian",
    name: "Barbarian",
    blurb: "A relentless warrior who fights with raw fury and unmatched toughness.",
    detail: ["Rage: bonus damage and resistance to physical damage", "Unarmored Defense: AC from Constitution while not wearing armor"],
    baseSpellcasting: false,
    defaultSubclasses: [berserker, totemWarrior],
    allSubclasses: [berserker, totemWarrior, ancestralGuardian, stormHerald, zealot],
    primaryAbilities: ["str", "con"],
  },
  {
    id: "bard",
    name: "Bard",
    blurb: "A charming performer whose music and words can inspire, heal, or unravel enemies.",
    detail: ["Bardic Inspiration: give allies a die to boost a roll", "Spellcasting: a flexible list drawn from any class's spells"],
    baseSpellcasting: true,
    defaultSubclasses: [lore, valor],
    allSubclasses: [lore, valor, glamour, swords, whispers],
    primaryAbilities: ["cha"],
    spellcastingAbility: "cha",
  },
  {
    id: "cleric",
    name: "Cleric",
    blurb: "A divine champion who heals allies and channels the power of a god in battle.",
    detail: ["Spellcasting: draws on the full cleric spell list", "Divine Domain: grants extra spells and features tied to your god"],
    baseSpellcasting: true,
    defaultSubclasses: [life, light, war],
    allSubclasses: [life, light, war, knowledge, nature, tempest, trickery, death, forge, grave],
    primaryAbilities: ["wis"],
    spellcastingAbility: "wis",
  },
  {
    id: "druid",
    name: "Druid",
    blurb: "A guardian of nature who can shape-shift into animals and command the wild.",
    detail: ["Druidic: a secret language of druids", "Spellcasting, and later Wild Shape to turn into a beast"],
    baseSpellcasting: true,
    defaultSubclasses: [land, moon],
    allSubclasses: [land, moon, dreams, shepherd, spores],
    primaryAbilities: ["wis"],
    spellcastingAbility: "wis",
  },
  {
    id: "fighter",
    name: "Fighter",
    blurb: "A master of weapons and tactics who can adapt to nearly any fight.",
    detail: ["Fighting Style: a permanent combat specialty (Archery, Defense, Dueling, etc.)", "Second Wind: bonus action to heal a bit once per short rest"],
    baseSpellcasting: false,
    defaultSubclasses: [champion, battleMaster, eldritchKnight],
    allSubclasses: [champion, battleMaster, eldritchKnight, arcaneArcher, cavalier, samurai],
    primaryAbilities: ["str", "dex"],
  },
  {
    id: "monk",
    name: "Monk",
    blurb: "A disciplined martial artist who fights unarmed with incredible speed and precision.",
    detail: ["Unarmored Defense: AC from Wisdom while not wearing armor", "Martial Arts: bonus unarmed strikes and Dexterity-based combat"],
    baseSpellcasting: false,
    defaultSubclasses: [openHand, shadow],
    allSubclasses: [openHand, shadow, fourElements, drunkenMaster, kensei, sunSoul],
    primaryAbilities: ["dex", "wis"],
  },
  {
    id: "paladin",
    name: "Paladin",
    blurb: "A holy warrior bound by an oath, mixing martial power with divine magic.",
    detail: ["Divine Sense: detect celestials, fiends, and undead nearby", "Lay on Hands: a pool of healing you can touch onto allies"],
    baseSpellcasting: true,
    defaultSubclasses: [devotion, vengeance],
    allSubclasses: [devotion, vengeance, ancients, conquest, redemption],
    primaryAbilities: ["str", "cha"],
    spellcastingAbility: "cha",
  },
  {
    id: "ranger",
    name: "Ranger",
    blurb: "A skilled hunter and tracker at home in the wild, fighting alongside nature.",
    detail: ["Favored Enemy: bonus knowledge and tracking against a chosen enemy type", "Natural Explorer: expertise moving through a favored terrain"],
    baseSpellcasting: true,
    defaultSubclasses: [hunter, beastMaster],
    allSubclasses: [hunter, beastMaster, gloomStalker, horizonWalker, monsterSlayer],
    primaryAbilities: ["dex", "wis"],
    spellcastingAbility: "wis",
  },
  {
    id: "rogue",
    name: "Rogue",
    blurb: "A cunning, skillful character who relies on precision, stealth, and wit over brute force.",
    detail: ["Expertise: double proficiency bonus on two chosen skills", "Sneak Attack: extra damage once per turn when you have advantage or an ally nearby"],
    baseSpellcasting: false,
    defaultSubclasses: [thief, assassin, arcaneTrickster],
    allSubclasses: [thief, assassin, arcaneTrickster, inquisitive, mastermind, scout, swashbuckler],
    primaryAbilities: ["dex"],
  },
  {
    id: "sorcerer",
    name: "Sorcerer",
    blurb: "A spellcaster whose magic comes from an innate, often inherited, magical bloodline.",
    detail: ["Spellcasting fueled by a small, flexible spell list", "Sorcerous Origin: grants extra spells and features tied to your bloodline"],
    baseSpellcasting: true,
    defaultSubclasses: [draconicBloodline, wildMagic],
    allSubclasses: [draconicBloodline, wildMagic, divineSoul, shadowMagic, stormSorcery],
    primaryAbilities: ["cha"],
    spellcastingAbility: "cha",
  },
  {
    id: "warlock",
    name: "Warlock",
    blurb: "A spellcaster who traded a pact with a powerful otherworldly patron for magical power.",
    detail: ["Otherworldly Patron: grants extra spells and features tied to your patron", "Pact Magic: a small number of spell slots that recharge on a short rest"],
    baseSpellcasting: true,
    defaultSubclasses: [fiend, archfey],
    allSubclasses: [fiend, archfey, greatOldOne, celestial, hexblade],
    primaryAbilities: ["cha"],
    spellcastingAbility: "cha",
  },
  {
    id: "wizard",
    name: "Wizard",
    blurb: "A scholarly spellcaster who studies magic from books and commands the widest variety of spells.",
    detail: ["Spellcasting from a spellbook, with the widest spell list of any class", "Arcane Recovery: recover some spent spell slots once per day"],
    baseSpellcasting: true,
    defaultSubclasses: [evocation, abjuration],
    allSubclasses: [evocation, abjuration, conjuration, divination, enchantment, illusion, necromancy, warMagic],
    primaryAbilities: ["int"],
    spellcastingAbility: "int",
  },
];

export function getRace(id: string): Race | undefined {
  return RACES.find((r) => r.id === id);
}

export function getClass(id: string): DndClass | undefined {
  return CLASSES.find((c) => c.id === id);
}

export function getClassWikiUrl(classId: string): string {
  return `https://dnd5e.wikidot.com/${classId}`;
}

export function getSubclassWikiUrl(classId: string, subclassId: string): string {
  return `https://dnd5e.wikidot.com/${classId}:${subclassId}`;
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
