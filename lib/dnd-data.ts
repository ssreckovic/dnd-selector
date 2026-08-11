export type Subrace = {
  id: string;
  name: string;
  blurb: string;
  detail: string;
};

export type Race = {
  id: string;
  name: string;
  blurb: string;
  detail: string;
  subraces?: Subrace[];
};

export type Subclass = {
  id: string;
  name: string;
  blurb: string;
  detail: string;
  hasSpellcasting?: boolean;
};

export type DndClass = {
  id: string;
  name: string;
  blurb: string;
  detail: string;
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
    detail:
      "Humans favor flexibility over any one specialty — most classes, feats, and skill combinations work well for them, making them an easy pick when you want to focus on class over race mechanics.",
  },
  {
    id: "elf",
    name: "Elf",
    blurb:
      "Graceful and long-lived, elves are deeply attuned to magic and the natural world.",
    detail:
      "Elves get proficiency in Perception and are immune to being put to magical sleep, a good fit for characters who lean on keen senses and subtlety.",
    subraces: [
      {
        id: "high-elf",
        name: "High Elf",
        blurb:
          "Studious and magically inclined, drawn to arcane knowledge and old traditions.",
        detail:
          "Gains a free wizard cantrip and an extra language, leaning into arcane curiosity even outside the Wizard class.",
      },
      {
        id: "wood-elf",
        name: "Wood Elf",
        blurb:
          "At home in forests and wild places, quick on their feet and quiet as the trees.",
        detail:
          "Trades some of the high elf's magic for extra speed and stealth in natural terrain, ideal for skirmishers and scouts.",
      },
      {
        id: "drow",
        name: "Drow",
        blurb:
          "Raised in the Underdark's shadow, drow are keen-eyed and comfortable in darkness.",
        detail:
          "Superior darkvision and innate minor illusion magic, but sunlight can leave them at a disadvantage above ground.",
      },
    ],
  },
  {
    id: "dwarf",
    name: "Dwarf",
    blurb:
      "Sturdy and steadfast, dwarves value craft, clan, and endurance above all.",
    detail:
      "Dwarves are hardy, with resistance to poison and darkvision, plus proficiency with certain weapons and tools tied to their clan traditions.",
    subraces: [
      {
        id: "hill-dwarf",
        name: "Hill Dwarf",
        blurb:
          "Wise and resilient, with an uncanny toughness that shrugs off harm.",
        detail:
          "Extra hit points at every level make hill dwarves resilient front-liners even outside heavily armored classes.",
      },
      {
        id: "mountain-dwarf",
        name: "Mountain Dwarf",
        blurb: "Strong and battle-ready, raised for the forge and the front line.",
        detail:
          "Armor proficiency and a strength bonus make mountain dwarves natural fits for front-line fighters and paladins.",
      },
    ],
  },
  {
    id: "halfling",
    name: "Halfling",
    blurb:
      "Small, lucky, and unassuming, halflings get by on nerve, wit, and good fortune.",
    detail:
      "Halflings can reroll natural 1s on key rolls and slip past the space of larger creatures, favoring nimble, evasive characters.",
  },
  {
    id: "half-elf",
    name: "Half-Elf",
    blurb:
      "Caught between two worlds, half-elves blend human drive with elven grace.",
    detail:
      "Combines a human's flexibility with an elf's magical resistance and darkvision, plus bonus skill proficiencies of their own choosing.",
  },
  {
    id: "tiefling",
    name: "Tiefling",
    blurb:
      "Marked by an infernal bloodline, tieflings are often misunderstood but fiercely self-reliant.",
    detail:
      "Innate resistance to fire and a bit of natural magic reflect their infernal heritage, along with darkvision suited to often-unwelcoming surroundings.",
  },
  {
    id: "half-orc",
    name: "Half-Orc",
    blurb:
      "Powerful and relentless, half-orcs channel raw strength and a fierce will to survive.",
    detail:
      "Relentless Endurance lets them shrug off a killing blow once per rest, and their savage critical hits make them formidable melee combatants.",
  },
  {
    id: "dragonborn",
    name: "Dragonborn",
    blurb:
      "Proud and honor-bound, dragonborn are descended from dragons and carry a bit of that power in their blood.",
    detail:
      "Draconic ancestry grants a breath weapon and damage resistance tied to their dragon type, giving them a built-in ranged option from level one.",
  },
];

export const CLASSES: DndClass[] = [
  {
    id: "barbarian",
    name: "Barbarian",
    blurb: "A relentless warrior who fights with raw fury and unmatched toughness.",
    detail:
      "Rage grants damage resistance and bonus melee damage while active, and Barbarians can go without armor and still keep a high AC using Unarmored Defense. Best suited to players who want simple, powerful choices in combat over complex spell lists.",
    baseSpellcasting: false,
    defaultSubclasses: [
      {
        id: "berserker",
        name: "Path of the Berserker",
        blurb: "Channels rage into overwhelming, reckless offense.",
        detail:
          "Frenzy lets you make a bonus attack while raging at the cost of exhaustion afterward, embodying reckless, damage-focused rage.",
      },
      {
        id: "totem-warrior",
        name: "Path of the Totem Warrior",
        blurb: "Draws on primal animal spirits for protection and power.",
        detail:
          "Choose a totem spirit at each tier for defensive, mobility, or utility bonuses, blending primal magic into the rage.",
      },
    ],
    allSubclasses: [
      {
        id: "berserker",
        name: "Path of the Berserker",
        blurb: "Channels rage into overwhelming, reckless offense.",
        detail:
          "Frenzy lets you make a bonus attack while raging at the cost of exhaustion afterward, embodying reckless, damage-focused rage.",
      },
      {
        id: "totem-warrior",
        name: "Path of the Totem Warrior",
        blurb: "Draws on primal animal spirits for protection and power.",
        detail:
          "Choose a totem spirit at each tier for defensive, mobility, or utility bonuses, blending primal magic into the rage.",
      },
      {
        id: "ancestral-guardian",
        name: "Path of the Ancestral Guardian",
        blurb: "Calls on protective spirits to shield allies from harm.",
        detail:
          "Spectral warriors punish enemies who ignore you and redirect damage away from allies, turning rage into a protective tool.",
      },
      {
        id: "storm-herald",
        name: "Path of the Storm Herald",
        blurb: "Surrounds themself with an aura of elemental fury.",
        detail:
          "A constant elemental aura (desert, sea, or tundra) damages or debuffs nearby enemies every turn you're raging.",
      },
      {
        id: "zealot",
        name: "Path of the Zealot",
        blurb: "Fights with the fearless conviction of a holy crusader.",
        detail:
          "Deals bonus necrotic or radiant damage while raging and can be difficult to keep down, fitting a fearless holy-warrior theme.",
      },
    ],
  },
  {
    id: "bard",
    name: "Bard",
    blurb: "A charming performer whose music and words can inspire, heal, or unravel enemies.",
    detail:
      "Bardic Inspiration lets you hand out bonus dice to boost allies' rolls, and bards learn spells from any school, making them the most flexible spellcasting class. Expertise and a wide skill list also make bards strong out-of-combat problem solvers.",
    baseSpellcasting: true,
    defaultSubclasses: [
      {
        id: "lore",
        name: "College of Lore",
        blurb: "A jack-of-all-trades who collects secrets and useful tricks.",
        detail:
          "Gains extra magical secrets from any class's spell list and can weaken enemies' rolls with Cutting Words, the ultimate generalist bard.",
      },
      {
        id: "valor",
        name: "College of Valor",
        blurb: "A battle-bard who inspires allies and fights alongside them.",
        detail:
          "Trades some utility for combat training, extra attacks, and the ability to share bardic inspiration as a defensive boost mid-fight.",
      },
    ],
    allSubclasses: [
      {
        id: "lore",
        name: "College of Lore",
        blurb: "A jack-of-all-trades who collects secrets and useful tricks.",
        detail:
          "Gains extra magical secrets from any class's spell list and can weaken enemies' rolls with Cutting Words, the ultimate generalist bard.",
      },
      {
        id: "valor",
        name: "College of Valor",
        blurb: "A battle-bard who inspires allies and fights alongside them.",
        detail:
          "Trades some utility for combat training, extra attacks, and the ability to share bardic inspiration as a defensive boost mid-fight.",
      },
      {
        id: "glamour",
        name: "College of Glamour",
        blurb: "Uses fey-touched charm to captivate and command a room.",
        detail:
          "Captivates crowds with an aura that can charm or embolden, leaning hard into the performer-as-power-broker fantasy.",
      },
      {
        id: "swords",
        name: "College of Swords",
        blurb: "A blade-dancing performer who fights with flair.",
        detail:
          "Gains extra attacks and flourishes that let you trip, redirect, or defend using Bardic Inspiration dice in melee.",
      },
      {
        id: "whispers",
        name: "College of Whispers",
        blurb: "Uses fear and secrets as instruments, in the shadows of the stage.",
        detail:
          "Deals bonus psychic damage and can implant lingering psychic terror, playing the bard as an unsettling manipulator.",
      },
    ],
  },
  {
    id: "cleric",
    name: "Cleric",
    blurb: "A divine champion who heals allies and channels the power of a god in battle.",
    detail:
      "Clerics choose a Domain that shapes both their spell list and a suite of extra features, from radiant damage to healing. They're the most reliable healers in most parties, but also viable as durable, spell-backed melee fighters depending on domain.",
    baseSpellcasting: true,
    defaultSubclasses: [
      {
        id: "life",
        name: "Life Domain",
        blurb: "The best healer of any cleric, keeping the whole party standing.",
        detail:
          "Healing spells restore extra hit points and you gain bonus healer's abilities, making Life the strongest pure-support domain.",
      },
      {
        id: "light",
        name: "Light Domain",
        blurb: "Wields fire and radiance to burn away darkness and evil.",
        detail:
          "Gains fire and radiant spells plus a bonus damage effect on cantrips, playing more like a blaster than a healer.",
      },
      {
        id: "war",
        name: "War Domain",
        blurb: "A martial cleric blessed for combat, fighting alongside their faith.",
        detail:
          "Grants a bonus attack via Channel Divinity and better weapon proficiency, letting you fight in melee like a paladin-lite.",
      },
    ],
    allSubclasses: [
      {
        id: "life",
        name: "Life Domain",
        blurb: "The best healer of any cleric, keeping the whole party standing.",
        detail:
          "Healing spells restore extra hit points and you gain bonus healer's abilities, making Life the strongest pure-support domain.",
      },
      {
        id: "light",
        name: "Light Domain",
        blurb: "Wields fire and radiance to burn away darkness and evil.",
        detail:
          "Gains fire and radiant spells plus a bonus damage effect on cantrips, playing more like a blaster than a healer.",
      },
      {
        id: "war",
        name: "War Domain",
        blurb: "A martial cleric blessed for combat, fighting alongside their faith.",
        detail:
          "Grants a bonus attack via Channel Divinity and better weapon proficiency, letting you fight in melee like a paladin-lite.",
      },
      {
        id: "knowledge",
        name: "Knowledge Domain",
        blurb: "A scholar-priest who values secrets and hidden lore.",
        detail:
          "Grants bonus languages and skills plus the ability to read surface thoughts, ideal for an investigative or scholarly cleric.",
      },
      {
        id: "nature",
        name: "Nature Domain",
        blurb: "A cleric of the wild, blending nature magic with divine power.",
        detail:
          "Adds nature spells to your list and grants an animal-handling bonus, blending divine and primal magic themes.",
      },
      {
        id: "tempest",
        name: "Tempest Domain",
        blurb: "Commands storms and thunder in the name of a stormy god.",
        detail:
          "Channel Divinity adds bonus lightning or thunder damage to weapon attacks, making Tempest a strong melee-caster hybrid.",
      },
      {
        id: "trickery",
        name: "Trickery Domain",
        blurb: "A mischievous cleric who values deception as much as devotion.",
        detail:
          "Can create illusory duplicates of yourself and grants advantage on deception, favoring a cunning, morally gray cleric.",
      },
      {
        id: "death",
        name: "Death Domain",
        blurb: "A grim cleric attuned to the power of death and decay.",
        detail:
          "Gains necrotic spells and empowers necrotic damage rolls, a grim domain most suited to darker campaigns.",
      },
      {
        id: "forge",
        name: "Forge Domain",
        blurb: "A cleric of craft and fire, at home at the anvil and in battle.",
        detail:
          "Can magically create or enhance weapons and armor, and gains fire resistance, fitting a smith-priest concept.",
      },
      {
        id: "grave",
        name: "Grave Domain",
        blurb: "A guardian against undeath, easing the passage between life and death.",
        detail:
          "Can sense the presence of undeath and add extra damage to already-doomed enemies, standing guard between life and death.",
      },
    ],
  },
  {
    id: "druid",
    name: "Druid",
    blurb: "A guardian of nature who can shape-shift into animals and command the wild.",
    detail:
      "Wild Shape lets druids transform into beasts for exploration, utility, or combat, stacking with a strong nature-themed spell list. Circle choice determines whether you lean into shapeshifting combat or land-based spellcasting.",
    baseSpellcasting: true,
    defaultSubclasses: [
      {
        id: "land",
        name: "Circle of the Land",
        blurb: "Draws deep magic from a chosen terrain, from forest to desert.",
        detail:
          "Gains bonus spells tied to a chosen terrain and extra spell slots for rituals, the most spell-list-focused circle.",
      },
      {
        id: "moon",
        name: "Circle of the Moon",
        blurb: "A fierce shapeshifter who becomes a powerful beast in combat.",
        detail:
          "Wild Shape into much tougher combat beasts and regain hit points when shifting, making it the strongest shapeshifting combat option.",
      },
    ],
    allSubclasses: [
      {
        id: "land",
        name: "Circle of the Land",
        blurb: "Draws deep magic from a chosen terrain, from forest to desert.",
        detail:
          "Gains bonus spells tied to a chosen terrain and extra spell slots for rituals, the most spell-list-focused circle.",
      },
      {
        id: "moon",
        name: "Circle of the Moon",
        blurb: "A fierce shapeshifter who becomes a powerful beast in combat.",
        detail:
          "Wild Shape into much tougher combat beasts and regain hit points when shifting, making it the strongest shapeshifting combat option.",
      },
      {
        id: "dreams",
        name: "Circle of Dreams",
        blurb: "Channels the gentle, healing magic of the Feywild.",
        detail:
          "Can heal and comfort allies through a Feywild-touched hearth, and later travel the party through dreams over long distances.",
      },
      {
        id: "shepherd",
        name: "Circle of the Shepherd",
        blurb: "A protector of beasts and spirits, leading them into battle.",
        detail:
          "Summoned and Wild Shape'd creatures gain spectral guardian bonuses, turning the druid into a commander of allies and beasts.",
      },
      {
        id: "spores",
        name: "Circle of Spores",
        blurb: "Embraces decay and fungal magic to wither foes and rise again.",
        detail:
          "Wreathed in a cloud of toxic fungus that damages nearby enemies, and can briefly reanimate after dying, embracing decay directly.",
      },
    ],
  },
  {
    id: "fighter",
    name: "Fighter",
    blurb: "A master of weapons and tactics who can adapt to nearly any fight.",
    detail:
      "Fighters get more attacks per turn than any other class as they level and access unique subclass mechanics, from maneuvers to a handful of spells. Simple to play but effective in almost any combat scenario.",
    baseSpellcasting: false,
    defaultSubclasses: [
      {
        id: "champion",
        name: "Champion",
        blurb: "A straightforward, hard-hitting warrior who excels at landing critical blows.",
        detail:
          "Widens your critical hit range and boosts athletic skills, a straightforward option that rewards simple, consistent damage.",
      },
      {
        id: "battle-master",
        name: "Battle Master",
        blurb: "A tactician who uses special combat maneuvers to control the battlefield.",
        detail:
          "Learns combat maneuvers (trip, disarm, riposte, and more) fueled by superiority dice, adding tactical options to every attack.",
      },
      {
        id: "eldritch-knight",
        name: "Eldritch Knight",
        blurb: "A soldier who blends swordplay with a handful of arcane spells.",
        detail:
          "Learns a handful of wizard spells, mostly abjuration and evocation, to support a sword-and-spell playstyle.",
        hasSpellcasting: true,
      },
    ],
    allSubclasses: [
      {
        id: "champion",
        name: "Champion",
        blurb: "A straightforward, hard-hitting warrior who excels at landing critical blows.",
        detail:
          "Widens your critical hit range and boosts athletic skills, a straightforward option that rewards simple, consistent damage.",
      },
      {
        id: "battle-master",
        name: "Battle Master",
        blurb: "A tactician who uses special combat maneuvers to control the battlefield.",
        detail:
          "Learns combat maneuvers (trip, disarm, riposte, and more) fueled by superiority dice, adding tactical options to every attack.",
      },
      {
        id: "eldritch-knight",
        name: "Eldritch Knight",
        blurb: "A soldier who blends swordplay with a handful of arcane spells.",
        detail:
          "Learns a handful of wizard spells, mostly abjuration and evocation, to support a sword-and-spell playstyle.",
        hasSpellcasting: true,
      },
      {
        id: "arcane-archer",
        name: "Arcane Archer",
        blurb: "A ranged specialist who fires magic-infused arrows.",
        detail:
          "Infuses arrows with magical arcane shot effects like extra damage, forced movement, or teleportation.",
      },
      {
        id: "cavalier",
        name: "Cavalier",
        blurb: "A mounted protector who guards allies and punishes those who ignore them.",
        detail:
          "Can mark enemies to punish them for attacking others and has better control over movement in melee, a strong front-line protector.",
      },
      {
        id: "samurai",
        name: "Samurai",
        blurb: "An unshakeable warrior fueled by fighting spirit and resolve.",
        detail:
          "Fighting Spirit grants temporary hit points and advantage on attacks in a pinch, embodying unshakeable martial resolve.",
      },
    ],
  },
  {
    id: "monk",
    name: "Monk",
    blurb: "A disciplined martial artist who fights unarmed with incredible speed and precision.",
    detail:
      "Monks fight unarmed or with simple weapons, using Ki points to fuel special techniques like extra attacks, stunning strikes, and deflecting projectiles. High mobility and unarmored defense make them tough to pin down.",
    baseSpellcasting: false,
    defaultSubclasses: [
      {
        id: "open-hand",
        name: "Way of the Open Hand",
        blurb: "A master of unarmed combat who can stun, throw, and control opponents.",
        detail:
          "Can stun, knock prone, or shove enemies as part of a flurry of blows, the most combat-control-focused monk path.",
      },
      {
        id: "shadow",
        name: "Way of Shadow",
        blurb: "A stealthy monk who uses shadow magic to strike from darkness.",
        detail:
          "Can cast minor illusion and darkness spells using ki, and teleport between shadows, favoring a stealthy, sneaky monk.",
      },
    ],
    allSubclasses: [
      {
        id: "open-hand",
        name: "Way of the Open Hand",
        blurb: "A master of unarmed combat who can stun, throw, and control opponents.",
        detail:
          "Can stun, knock prone, or shove enemies as part of a flurry of blows, the most combat-control-focused monk path.",
      },
      {
        id: "shadow",
        name: "Way of Shadow",
        blurb: "A stealthy monk who uses shadow magic to strike from darkness.",
        detail:
          "Can cast minor illusion and darkness spells using ki, and teleport between shadows, favoring a stealthy, sneaky monk.",
      },
      {
        id: "four-elements",
        name: "Way of the Four Elements",
        blurb: "Channels elemental magic — fire, water, earth, air — through martial arts.",
        detail:
          "Spends ki to cast elemental spell-like effects such as fireball or a wave of water, blending martial arts with elemental magic.",
      },
      {
        id: "drunken-master",
        name: "Way of the Drunken Master",
        blurb: "An unpredictable, stumbling fighting style that's harder to hit than it looks.",
        detail:
          "Can stumble away from attacks and redirect enemies mid-fight, using an unpredictable, off-balance fighting style.",
      },
      {
        id: "kensei",
        name: "Way of the Kensei",
        blurb: "Treats weapons as an extension of the body, blending them with monk technique.",
        detail:
          "Can apply monk features to chosen weapons and briefly empower them, making weapon-based monks viable.",
      },
      {
        id: "sun-soul",
        name: "Way of the Sun Soul",
        blurb: "Channels inner energy into blasts of radiant light.",
        detail:
          "Can fire bolts of radiant energy at range using ki, giving monks a ranged option without needing a bow.",
      },
    ],
  },
  {
    id: "paladin",
    name: "Paladin",
    blurb: "A holy warrior bound by an oath, mixing martial power with divine magic.",
    detail:
      "Paladins combine heavy armor and martial prowess with divine spells and Divine Smite, letting them burst down single targets with radiant damage. Their Oath determines both flavor and a set of powerful aura and channel divinity options.",
    baseSpellcasting: true,
    defaultSubclasses: [
      {
        id: "devotion",
        name: "Oath of Devotion",
        blurb: "The classic, honor-bound knight who upholds justice and protects the weak.",
        detail:
          "Channel Divinity can turn undead and sear fiends with holy light, embodying the classic honorable knight.",
      },
      {
        id: "vengeance",
        name: "Oath of Vengeance",
        blurb: "A grim paladin driven to punish those who commit great evil.",
        detail:
          "Can curse a target for extra damage and gains bonus mobility to chase them down, playing the paladin as a relentless punisher.",
      },
    ],
    allSubclasses: [
      {
        id: "devotion",
        name: "Oath of Devotion",
        blurb: "The classic, honor-bound knight who upholds justice and protects the weak.",
        detail:
          "Channel Divinity can turn undead and sear fiends with holy light, embodying the classic honorable knight.",
      },
      {
        id: "vengeance",
        name: "Oath of Vengeance",
        blurb: "A grim paladin driven to punish those who commit great evil.",
        detail:
          "Can curse a target for extra damage and gains bonus mobility to chase them down, playing the paladin as a relentless punisher.",
      },
      {
        id: "ancients",
        name: "Oath of the Ancients",
        blurb: "A paladin sworn to protect nature, light, and joy against the dark.",
        detail:
          "Channel Divinity to ward allies against damage, gaining nature-tinged holy power that protects growth and life.",
      },
      {
        id: "conquest",
        name: "Oath of Conquest",
        blurb: "Rules through fear, crushing enemies beneath an iron will.",
        detail:
          "Can frighten enemies just by approaching and gains bonus damage against frightened foes, ruling the battlefield through fear.",
      },
      {
        id: "redemption",
        name: "Oath of Redemption",
        blurb: "Seeks to turn enemies from violence rather than destroy them.",
        detail:
          "Can redirect attacks meant for others onto yourself and try to talk enemies down instead of fighting, favoring a pacifistic approach.",
      },
    ],
  },
  {
    id: "ranger",
    name: "Ranger",
    blurb: "A skilled hunter and tracker at home in the wild, fighting alongside nature.",
    detail:
      "Rangers mix martial combat with a nature-themed spell list and favored enemy/terrain features, making them strong at tracking, survival, and ranged or two-weapon combat. Beast Master rangers gain a companion that fights alongside them.",
    baseSpellcasting: true,
    defaultSubclasses: [
      {
        id: "hunter",
        name: "Hunter",
        blurb: "A versatile fighter honed to take down all manner of foes.",
        detail:
          "Chooses a combat style bonus against a type of enemy (hordes, single big threats, and more), the most straightforward combat ranger.",
      },
      {
        id: "beast-master",
        name: "Beast Master",
        blurb: "Fights alongside a loyal animal companion.",
        detail:
          "Gains a beast companion that fights, moves, and grows alongside you, playing the ranger as a small-scale commander.",
      },
    ],
    allSubclasses: [
      {
        id: "hunter",
        name: "Hunter",
        blurb: "A versatile fighter honed to take down all manner of foes.",
        detail:
          "Chooses a combat style bonus against a type of enemy (hordes, single big threats, and more), the most straightforward combat ranger.",
      },
      {
        id: "beast-master",
        name: "Beast Master",
        blurb: "Fights alongside a loyal animal companion.",
        detail:
          "Gains a beast companion that fights, moves, and grows alongside you, playing the ranger as a small-scale commander.",
      },
      {
        id: "gloom-stalker",
        name: "Gloom Stalker",
        blurb: "An ambush hunter who strikes hardest from darkness and shadow.",
        detail:
          "Gains bonus initiative, an extra attack on the first turn, and better darkvision, excelling at ambushes from darkness.",
      },
      {
        id: "horizon-walker",
        name: "Horizon Walker",
        blurb: "Guards the world against planar threats, stepping briefly between dimensions.",
        detail:
          "Can briefly step into the Ethereal Plane and deal bonus force damage, standing guard against planar incursions.",
      },
      {
        id: "monster-slayer",
        name: "Monster Slayer",
        blurb: "A dedicated hunter of magical and supernatural horrors.",
        detail:
          "Can magically sense a target's resistances and impose disadvantage on their attacks against you, specializing in hunting one dangerous foe at a time.",
      },
    ],
  },
  {
    id: "rogue",
    name: "Rogue",
    blurb: "A cunning, skillful character who relies on precision, stealth, and wit over brute force.",
    detail:
      "Sneak Attack lets rogues deal big bonus damage once per turn when they have advantage or a nearby ally, rewarding stealth and positioning. Expertise and a wide skill list also make rogues the best skill-monkeys in most parties.",
    baseSpellcasting: false,
    defaultSubclasses: [
      {
        id: "thief",
        name: "Thief",
        blurb: "A nimble specialist in sleight of hand, locks, and climbing anything.",
        detail:
          "Gains an extra item-use action and can climb or balance without penalty, the most versatile, gadget-friendly rogue.",
      },
      {
        id: "assassin",
        name: "Assassin",
        blurb: "A master of the element of surprise and the deadly first strike.",
        detail:
          "Automatically critical hits surprised targets and can disguise their identity, built entirely around the first devastating strike.",
      },
      {
        id: "arcane-trickster",
        name: "Arcane Trickster",
        blurb: "A rogue who mixes in a handful of illusion and trickery spells.",
        detail:
          "Learns a handful of illusion and enchantment spells, including a spell that can be cast as part of a Sneak Attack.",
        hasSpellcasting: true,
      },
    ],
    allSubclasses: [
      {
        id: "thief",
        name: "Thief",
        blurb: "A nimble specialist in sleight of hand, locks, and climbing anything.",
        detail:
          "Gains an extra item-use action and can climb or balance without penalty, the most versatile, gadget-friendly rogue.",
      },
      {
        id: "assassin",
        name: "Assassin",
        blurb: "A master of the element of surprise and the deadly first strike.",
        detail:
          "Automatically critical hits surprised targets and can disguise their identity, built entirely around the first devastating strike.",
      },
      {
        id: "arcane-trickster",
        name: "Arcane Trickster",
        blurb: "A rogue who mixes in a handful of illusion and trickery spells.",
        detail:
          "Learns a handful of illusion and enchantment spells, including a spell that can be cast as part of a Sneak Attack.",
        hasSpellcasting: true,
      },
      {
        id: "inquisitive",
        name: "Inquisitive",
        blurb: "A sharp-eyed investigator who reads lies and finds what's hidden.",
        detail:
          "Can spot lies and see through disguises with uncanny accuracy, playing the rogue as a sharp-eyed detective.",
      },
      {
        id: "mastermind",
        name: "Mastermind",
        blurb: "A schemer who directs allies and manipulates from behind the scenes.",
        detail:
          "Can grant allies a bonus attack via Help as a bonus action and briefly speak any language, coordinating from behind the scenes.",
      },
      {
        id: "scout",
        name: "Scout",
        blurb: "A quick, wilderness-savvy skirmisher who strikes and moves.",
        detail:
          "Gains a free move before combat starts and bonus damage when flanking, favoring a mobile skirmisher playstyle.",
      },
      {
        id: "swashbuckler",
        name: "Swashbuckler",
        blurb: "A flashy duelist who charms and outmaneuvers single foes.",
        detail:
          "Can duel one target without provoking opportunity attacks and charm crowds outside of combat, playing the rogue as a flashy, charismatic duelist.",
      },
    ],
  },
  {
    id: "sorcerer",
    name: "Sorcerer",
    blurb: "A spellcaster whose magic comes from an innate, often inherited, magical bloodline.",
    detail:
      "Sorcery Points let sorcerers twist their limited spell list with Metamagic — quickening, twinning, or subtly casting spells for surprising tactical options. Fewer spells known than a wizard, but far more ways to bend the ones they have.",
    baseSpellcasting: true,
    defaultSubclasses: [
      {
        id: "draconic-bloodline",
        name: "Draconic Bloodline",
        blurb: "Magic fueled by dragon ancestry, with tougher skin and elemental power.",
        detail:
          "Gains resistance to a damage type and thicker skin (extra hit points), reflecting a literal dragon ancestor.",
      },
      {
        id: "wild-magic",
        name: "Wild Magic",
        blurb: "Unpredictable magic that can surge in surprising, chaotic ways.",
        detail:
          "Can trigger random magical surges when casting spells, for players who enjoy chaos and unpredictability.",
      },
    ],
    allSubclasses: [
      {
        id: "draconic-bloodline",
        name: "Draconic Bloodline",
        blurb: "Magic fueled by dragon ancestry, with tougher skin and elemental power.",
        detail:
          "Gains resistance to a damage type and thicker skin (extra hit points), reflecting a literal dragon ancestor.",
      },
      {
        id: "wild-magic",
        name: "Wild Magic",
        blurb: "Unpredictable magic that can surge in surprising, chaotic ways.",
        detail:
          "Can trigger random magical surges when casting spells, for players who enjoy chaos and unpredictability.",
      },
      {
        id: "divine-soul",
        name: "Divine Soul",
        blurb: "Magic with a celestial or divine spark, blending sorcery with healing.",
        detail:
          "Gains access to cleric spells and a healing option, blending sorcery with a celestial or divine origin.",
      },
      {
        id: "shadow-magic",
        name: "Shadow Magic",
        blurb: "Magic touched by the Shadowfell, at home with darkness and fear.",
        detail:
          "Gains resistance to necrotic damage and can see in magical darkness, reflecting a touch of the Shadowfell.",
      },
      {
        id: "storm-sorcery",
        name: "Storm Sorcery",
        blurb: "Magic drawn from storms and wind, favoring mobility and elemental power.",
        detail:
          "Can fly briefly when casting spells with a level of movement, and control which allies get hit by area spells.",
      },
    ],
  },
  {
    id: "warlock",
    name: "Warlock",
    blurb: "A spellcaster who traded a pact with a powerful otherworldly patron for magical power.",
    detail:
      "Warlocks recover spell slots on a short rest instead of a long one, letting them cast their strongest spells far more often than other casters. Invocations and their Pact Boon (blade, chain, or tome) let you customize the class heavily.",
    baseSpellcasting: true,
    defaultSubclasses: [
      {
        id: "fiend",
        name: "The Fiend",
        blurb: "A pact with a devil or demon, favoring fire and destructive power.",
        detail:
          "Gains temporary hit points whenever you defeat an enemy, rewarding an aggressive, destructive playstyle.",
      },
      {
        id: "archfey",
        name: "The Archfey",
        blurb: "A pact with a fey lord, favoring charm, illusion, and trickery.",
        detail:
          "Can vanish in a flash of light to escape danger, favoring charm and trickery over raw destruction.",
      },
    ],
    allSubclasses: [
      {
        id: "fiend",
        name: "The Fiend",
        blurb: "A pact with a devil or demon, favoring fire and destructive power.",
        detail:
          "Gains temporary hit points whenever you defeat an enemy, rewarding an aggressive, destructive playstyle.",
      },
      {
        id: "archfey",
        name: "The Archfey",
        blurb: "A pact with a fey lord, favoring charm, illusion, and trickery.",
        detail:
          "Can vanish in a flash of light to escape danger, favoring charm and trickery over raw destruction.",
      },
      {
        id: "great-old-one",
        name: "The Great Old One",
        blurb: "A pact with an alien, incomprehensible being from beyond the stars.",
        detail:
          "Can telepathically communicate and briefly stun a mind with alien whispers, leaning into cosmic-horror flavor.",
      },
      {
        id: "celestial",
        name: "The Celestial",
        blurb: "A pact with a being of the upper planes, granting healing and radiant power.",
        detail:
          "Gains bonus healing on spells and a radiant damage option, blending warlock power with angelic themes.",
      },
      {
        id: "hexblade",
        name: "The Hexblade",
        blurb: "A pact with a sentient weapon from the Shadowfell, favoring melee combat.",
        detail:
          "Can use Charisma for weapon attacks and briefly curse a target for bonus damage, making warlocks viable in melee.",
      },
    ],
  },
  {
    id: "wizard",
    name: "Wizard",
    blurb: "A scholarly spellcaster who studies magic from books and commands the widest variety of spells.",
    detail:
      "Wizards learn spells from a spellbook and can prepare a new set each day, giving them the largest effective spell list of any class. Their School specialization grants bonus features that reinforce a chosen play style, from blasting to summoning.",
    baseSpellcasting: true,
    defaultSubclasses: [
      {
        id: "evocation",
        name: "School of Evocation",
        blurb: "Specializes in powerful, damaging blasts of elemental magic.",
        detail:
          "Can shape damaging spells to avoid hitting allies and adds bonus damage to evocation spells, the archetypal blaster wizard.",
      },
      {
        id: "abjuration",
        name: "School of Abjuration",
        blurb: "Specializes in protective magic — shields, wards, and defense.",
        detail:
          "Can create a temporary hit point shield around allies and is naturally resistant to having spells magically dispelled.",
      },
    ],
    allSubclasses: [
      {
        id: "evocation",
        name: "School of Evocation",
        blurb: "Specializes in powerful, damaging blasts of elemental magic.",
        detail:
          "Can shape damaging spells to avoid hitting allies and adds bonus damage to evocation spells, the archetypal blaster wizard.",
      },
      {
        id: "abjuration",
        name: "School of Abjuration",
        blurb: "Specializes in protective magic — shields, wards, and defense.",
        detail:
          "Can create a temporary hit point shield around allies and is naturally resistant to having spells magically dispelled.",
      },
      {
        id: "conjuration",
        name: "School of Conjuration",
        blurb: "Specializes in summoning creatures and objects from thin air.",
        detail:
          "Can teleport short distances at will and summon duplicates of objects, favoring battlefield control through summons and positioning.",
      },
      {
        id: "divination",
        name: "School of Divination",
        blurb: "Specializes in foresight, information, and bending fate slightly.",
        detail:
          "Can reroll key dice rolls using Portent, effectively rewriting fate a couple of times per day.",
      },
      {
        id: "enchantment",
        name: "School of Enchantment",
        blurb: "Specializes in charming and controlling the minds of others.",
        detail:
          "Can charm creatures more easily and redirect a charmed creature's allies to ignore you, favoring social and mind-affecting magic.",
      },
      {
        id: "illusion",
        name: "School of Illusion",
        blurb: "Specializes in tricking the senses with false sights and sounds.",
        detail:
          "Illusions can become partially real for a moment and are harder for enemies to disbelieve, favoring misdirection over direct damage.",
      },
      {
        id: "necromancy",
        name: "School of Necromancy",
        blurb: "Specializes in the magic of life, death, and the undead.",
        detail:
          "Can add extra necrotic damage to spells and briefly reanimate slain creatures as loyal skeletons, embracing life-and-death magic.",
      },
      {
        id: "war-magic",
        name: "School of War Magic",
        blurb: "A battle-ready wizard who blends spellcasting with combat tactics.",
        detail:
          "Can add spell attack bonuses to AC or saving throws and redirect attacks made against you, blending battlefield awareness with spellcasting.",
      },
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
