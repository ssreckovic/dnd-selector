export type SpellLevel = 0 | 1 | 2;

export type Spell = {
  name: string;
  level: SpellLevel;
  school: string;
  castTime: string;
  range: string;
  duration: string;
  components: string;
  description: string;
  classes: string[];
};

export type ClassSpellList = {
  classId: string;
  cantrips: Spell[];
  level1: Spell[];
  level2: Spell[];
};

const BASE_CASTER_CLASS_IDS = [
  "bard",
  "cleric",
  "druid",
  "paladin",
  "ranger",
  "sorcerer",
  "warlock",
  "wizard",
];

export type SpellLimits = {
  cantrips: number;
  spells: number;
};

export const SPELL_LIMITS: Record<string, SpellLimits> = {
  wizard: { cantrips: 3, spells: 7 },
  bard: { cantrips: 2, spells: 6 },
  warlock: { cantrips: 2, spells: 4 },
  druid: { cantrips: 2, spells: 7 },
  cleric: { cantrips: 3, spells: 7 },
  sorcerer: { cantrips: 4, spells: 4 },
  paladin: { cantrips: 0, spells: 3 },
  ranger: { cantrips: 0, spells: 3 },
};

export const SPELLS: Spell[] = [
  {
    "name": "Acid Splash",
    "level": 0,
    "school": "Conjuration",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "You hurl a bubble of acid. Choose one creature within range, or choose two creatures within range that are within 5 feet of each other. A target must succeed on a Dexterity saving throw or take 1d6 acid damage.\n\nAt Higher Levels. This spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Blade Ward",
    "level": 0,
    "school": "Abjuration",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "1 round",
    "components": "V, S",
    "description": "You extend your hand and trace a sigil of warding in the air. Until the end of your next turn, you have resistance against bludgeoning, piercing, and slashing damage dealt by weapon attacks.",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Booming Blade",
    "level": 0,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "Self (5-foot radius)",
    "duration": "1 round",
    "components": "S, M (a melee weapon worth at least 1 sp)",
    "description": "You brandish the weapon used in the spell’s casting and make a melee attack with it against one creature within 5 feet of you. On a hit, the target suffers the weapon attack’s normal effects and then becomes sheathed in booming energy until the start of your next turn. If the target willingly moves 5 feet or more before then, the target takes 1d8 thunder damage, and the spell ends.\n\nAt Higher Levels. At 5th level, the melee attack deals an extra 1d8 thunder damage to the target on a hit, and the damage the target takes for moving increases to 2d8. Both damage rolls increase by 1d8 at 11th level (2d8 and 3d8) and again at 17th level (3d8 and 4d8).",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Chill Touch",
    "level": 0,
    "school": "Necromancy",
    "castTime": "1 Action",
    "range": "120 Feet",
    "duration": "1 round",
    "components": "V, S",
    "description": "You create a ghostly, skeletal hand in the space of a creature within range. Make a ranged spell attack against the creature to assail it with the chill of the grave. On a hit, the target takes 1d8 necrotic damage, and it can’t regain hit points until the start of your next turn. Until then, the hand clings to the target. If you hit an undead target, it also has disadvantage on attack rolls against you until the end of your next turn.\n\nAt Higher Levels. This spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Control Flames",
    "level": 0,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Instantaneous or 1 hour",
    "components": "S",
    "description": "You choose nonmagical flame that you can see within range and that fits within a 5-foot cube. You affect it in one of the following ways:\n\nYou instantaneously expand the flame 5 feet in one direction, provided that wood or other fuel is present in the new location.\nYou instantaneously extinguish the flames within the cube.\nYou double or halve the area of bright light and dim light cast by the flame, change its color, or both. The change lasts for 1 hour.\nYou cause simple shapes—such as the vague form of a creature, an inanimate object, or a location—to appear within the flames and animate as you like. The shapes last for 1 hour.\nIf you cast this spell multiple times, you can have up to three of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.",
    "classes": [
      "druid",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Create Bonfire",
    "level": 0,
    "school": "Conjuration",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "description": "You create a bonfire on ground that you can see within range. Until the spell ends, the bonfire fills a 5-foot cube. Any creature in the bonfire’s space when you cast the spell must succeed on a Dexterity saving throw or take 1d8 fire damage. A creature must also make the saving throw when it enters the bonfire’s space for the first time on a turn or ends its turn there.\n\nAt Higher Levels. The spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
    "classes": [
      "druid",
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Dancing Lights",
    "level": 0,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "120 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M (a bit of phosphorus or wychwood, or a glowworm)",
    "description": "You create up to four torch-sized lights within range, making them appear as torches, lanterns, or glowing orbs that hover in the air for the duration. You can also combine the four lights into one glowing vaguely humanoid form of Medium size. Whichever form you choose, each light sheds dim light in a 10-foot radius.\n\nAs a bonus action on your turn, you can move the lights up to 60 feet to a new spot within range. A light must be within 20 feet of another light created by this spell, and a light winks out if it exceeds the spell’s range.",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Decompose (HB)",
    "level": 0,
    "school": "Necromancy",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "1 minute",
    "components": "V, S",
    "description": "You reach out and touch the corpse of a creature. Over the next minute, the corpse begins to rapidly decompose, sprouting fungus and moss as it begins to degrade into compost and mulch. An odd-colored flower or two may also spring from the corpse in this time. Applicable requirements for resurrection are unaffected by this decomposition.",
    "classes": [
      "cleric"
    ]
  },
  {
    "name": "Druidcraft",
    "level": 0,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "Whispering to the spirits of nature, you create one of the following effects within range:\n\nYou create a tiny, harmless sensory effect that predicts what the weather will be at your location for the next 24 hours. The effect might manifest as a golden orb for clear skies, a cloud for rain, falling snowflakes for snow, and so on. This effect persists for 1 round.\nYou instantly make a flower blossom, a seed pod open, or a leaf bud bloom.\nYou create an instantaneous, harmless sensory effect, such as falling leaves, a puff of wind, the sound of a small animal, or the faint odor of skunk. The effect must fit in a 5-foot cube.\nYou instantly light or snuff out a candle, a torch, or a small campfire.",
    "classes": [
      "druid"
    ]
  },
  {
    "name": "Eldritch Blast",
    "level": 0,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "120 Feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "A beam of crackling energy streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 force damage.\n\nAt Higher Levels. The spell creates more than one beam when you reach higher levels: two beams at 5th level, three beams at 11th level, and four beams at 17th level. You can direct the beams at the same target or at different ones. Make a separate attack roll for each beam.",
    "classes": [
      "warlock"
    ]
  },
  {
    "name": "Encode Thoughts",
    "level": 0,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "8 hours",
    "components": "S",
    "description": "You pull a memory, an idea, or a message from your mind and transform it into a tangible string of glowing energy called a thought strand, which persists for the duration or until you cast this spell again. The thought strand appears in an unoccupied space within 5 feet of you as a Tiny, weightless, semisolid object that can be held and carried like a ribbon. It is otherwise stationary.\n\nIf you cast this spell while concentrating on a spell or an ability that allows you to read or manipulate the thoughts of others (such as Detect Thoughts or Modify Memory), you can transform the thoughts or memories you read, rather than your own, into a thought strand.\n\nCasting this spell while holding a thought strand allows you to instantly receive whatever memory, idea, or message the thought strand contains. (Casting Detect Thoughts on the strand has the same effect.)",
    "classes": [
      "wizard"
    ]
  },
  {
    "name": "Fire Bolt",
    "level": 0,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "120 Feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "You hurl a mote of fire at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 fire damage. A flammable object hit by this spell ignites if it isn’t being worn or carried.\n\nAt Higher Levels. This spell’s damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10).",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Friends",
    "level": 0,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "S, M (a small amount of makeup applied to the face as this spell is cast)",
    "description": "For the duration, you have advantage on all Charisma checks directed at one creature of your choice that isn’t hostile toward you. When the spell ends, the creature realizes that you used magic to influence its mood and becomes hostile toward you. A creature prone to violence might attack you. Another creature might seek retribution in other ways (at the DM’s discretion), depending on the nature of your interaction with it.",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Frostbite",
    "level": 0,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "You cause numbing frost to form on one creature that you can see within range. The target must make a Constitution saving throw. On a failed save, the target takes 1d6 cold damage, and it has disadvantage on the next weapon attack roll it makes before the end of its next turn.\n\nAt Higher Levels. The spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).",
    "classes": [
      "druid",
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Green-Flame Blade",
    "level": 0,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "Self (5-foot radius)",
    "duration": "Instantaneous",
    "components": "S, M (a melee weapon worth at least 1 sp)",
    "description": "You brandish the weapon used in the spell’s casting and make a melee attack with it against one creature within 5 feet of you. On a hit, the target suffers the weapon attack’s normal effects, and you can cause green fire to leap from the target to a different creature of your choice that you can see within 5 feet of it. The second creature takes fire damage equal to your spellcasting ability modifier.\n\nAt Higher Levels. At 5th level, the melee attack deals an extra 1d8 fire damage to the target on a hit, and the fire damage to the second creature increases to 1d8 + your spellcasting ability modifier. Both damage rolls increase by 1d8 at 11th level (2d8 and 2d8) and 17th level (3d8 and 3d8).",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Guidance",
    "level": 0,
    "school": "Divination",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "description": "You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one ability check of its choice. It can roll the die before or after making the ability check. The spell then ends.",
    "classes": [
      "cleric",
      "druid"
    ]
  },
  {
    "name": "Gust",
    "level": 0,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "You seize the air and compel it to create one of the following effects at a point you can see within range:\n\nOne Medium or smaller creature that you choose must succeed on a Strength saving throw or be pushed up to 5 feet away from you.\nYou create a small blast of air capable of moving one object that is neither held nor carried and that weighs no more than 5 pounds. The object is pushed up to 10 feet away from you. It isn’t pushed with enough force to cause damage.\nYou create a harmless sensory affect using air, such as causing leaves to rustle, wind to slam shutters shut, or your clothing to ripple in a breeze.",
    "classes": [
      "druid",
      "sorcerer",
      "wizard"
    ]
  },
  // {
  //   "name": "Hand of Radiance (UA)",
  //   "level": 0,
  //   "school": "Evocation",
  //   "castTime": "1 Action",
  //   "range": "5 feet",
  //   "duration": "Instantaneous",
  //   "components": "V, S",
  //   "description": "You raise your hand, and burning radiance erupts from it. Each creature of your choice that you can see within 5 feet of you must succeed on a Constitution saving throw or take 1d6 radiant damage.\n\nAt Higher Levels: The spell's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d8).",
  //   "classes": [
  //     "cleric"
  //   ]
  // },
  {
    "name": "Infestation",
    "level": 0,
    "school": "Conjuration",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "Instantaneous",
    "components": "V, S, M (a living flea)",
    "description": "You cause a cloud of mites, fleas, and other parasites to appear momentarily on one creature you can see within range. The target must succeed on a Constitution saving throw, or it takes 1d6 poison damage and moves 5 feet in a random direction if it can move and its speed is at least 5 feet. Roll a d4 for the direction: 1, north; 2, south; 3, east; or 4, west. This movement doesn’t provoke opportunity attacks, and if the direction rolled is blocked, the target doesn't move.\n\nAt Higher Levels. The spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).",
    "classes": [
      "druid",
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Light",
    "level": 0,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "1 hour",
    "components": "V, M (a firefly or phosphorescent moss)",
    "description": "You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet. The light can be colored as you like. Completely covering the object with something opaque blocks the light. The spell ends if you cast it again or dismiss it as an action.\n\nIf you target an object held or worn by a hostile creature, that creature must succeed on a Dexterity saving throw to avoid the spell.",
    "classes": [
      "bard",
      "cleric",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Lightning Lure",
    "level": 0,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "Self (15-foot radius)",
    "duration": "Instantaneous",
    "components": "V",
    "description": "You create a lash of lightning energy that strikes at one creature of your choice that you can see within 15 feet of you. The target must succeed on a Strength saving throw or be pulled up to 10 feet in a straight line toward you and then take 1d8 lightning damage if it is within 5 feet of you.\n\nAt Higher Levels. This spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Mage Hand",
    "level": 0,
    "school": "Conjuration",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "1 minute",
    "components": "V, S",
    "description": "A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as an action. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again.\n\nYou can use your action to control the hand. You can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial. You can move the hand up to 30 feet each time you use it.\n\nThe hand can’t attack, activate magical items, or carry more than 10 pounds.",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Magic Stone",
    "level": 0,
    "school": "Transmutation",
    "castTime": "1 Bonus Action",
    "range": "Touch",
    "duration": "1 minute",
    "components": "V, S",
    "description": "You touch one to three pebbles and imbue them with magic. You or someone else can make a ranged spell attack with one of the pebbles by throwing it or hurling it with a sling. If thrown, it has a range of 60 feet. If someone else attacks with the pebble, that attacker adds your spellcasting ability modifier, not the attacker’s, to the attack roll. On a hit, the target takes bludgeoning damage equal to 1d6 + your spellcasting ability modifier. Hit or miss, the spell then ends on the stone.\n\nIf you cast this spell again, the spell ends early on any pebbles still affected by it.",
    "classes": [
      "druid",
      "warlock"
    ]
  },
  {
    "name": "Mending",
    "level": 0,
    "school": "Transmutation",
    "castTime": "1 Minute",
    "range": "Touch",
    "duration": "Instantaneous",
    "components": "V, S, M (two lodestones)",
    "description": "This spell repairs a single break or tear in an object you touch, such as a broken chain link, two halves of a broken key, a torn cloak, or a leaking wineskin. As long as the break or tear is no larger than 1 foot in any dimension, you mend it, leaving no trace of the former damage.\n\nThis spell can physically repair a magic item or construct, but the spell can’t restore magic to such an object.",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Message",
    "level": 0,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "120 Feet",
    "duration": "1 round",
    "components": "V, S, M (a short piece of copper wire)",
    "description": "You point your finger toward a creature within range and whisper a message. The target (and only the target) hears the message and can reply in a whisper that only you can hear.\n\nYou can cast this spell through solid objects if you are familiar with the target and know it is beyond the barrier. Magical silence, 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood blocks the spell. The spell doesn’t have to follow a straight line and can travel freely around corners or through openings.",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Mind Sliver",
    "level": 0,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "1 round",
    "components": "V",
    "description": "You drive a disorienting spike of psychic energy into the mind of one creature you can see within range. The target must succeed on an Intelligence saving throw or take 1d6 psychic damage and subtract 1d4 from the next saving throw it makes before the end of your next turn.\n\nAt Higher Levels. This spell’s damage increases by 1d6 when you reach certain levels: 5th level (2d6), 11th level (3d6), and 17th level (4d6).",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Minor Illusion",
    "level": 0,
    "school": "Illusion",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "1 minute",
    "components": "S, M (A bit of fleece)",
    "description": "You create a sound or an image of an object within range that lasts for the duration. The illusion also ends if you dismiss it as an action or cast this spell again.\n\nIf you create a sound, its volume can range from a whisper to a scream. It can be your voice, someone else’s voice, a lion’s roar, a beating of drums, or any other sound you choose. The sound continues unabated throughout the duration, or you can make discrete sounds at different times before the spell ends.\n\nIf you create an image of an object—such as a chair, muddy footprints, or a small chest—it must be no larger than a 5-foot cube. The image can’t create sound, light, smell, or any other sensory effect. Physical interaction with the image reveals it to be an illusion, because things can pass through it.\n\nIf a creature uses its action to examine the sound or image, the creature can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the illusion becomes faint to the creature.",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Mold Earth",
    "level": 0,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "Instantaneous or 1 hour",
    "components": "S",
    "description": "You choose a portion of dirt or stone that you can see within range and that fits within a 5-foot cube. You manipulate it in one of the following ways:\n\nIf you target an area of loose earth, you can instantaneously excavate it, move it along the ground, and deposit it up to 5 feet away. This movement doesn’t have enough force to cause damage.\nYou cause shapes, colors, or both to appear on the dirt or stone, spelling out words, creating images, or shaping patterns. The changes last for 1 hour.\nIf the dirt or stone you target is on the ground, you cause it to become difficult terrain. Alternatively, you can cause the ground to become normal terrain if it is already difficult terrain. This change lasts for 1 hour.\nIf you cast this spell multiple times, you can have no more than two of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.",
    "classes": [
      "druid",
      "sorcerer",
      "wizard"
    ]
  },
  // {
  //   "name": "On/Off (UA)",
  //   "level": 0,
  //   "school": "Transmutation",
  //   "castTime": "1 Action",
  //   "range": "60 Feet",
  //   "duration": "Instantaneous",
  //   "components": "V, S",
  //   "description": "This cantrip allows you to activate or deactivate any electronic device within range, as long as the device has a clearly defined on or off function that can be easily accessed from the outside of the device. Any device that requires a software-based shutdown sequence to activate or deactivate cannot be affected by On/Off.",
  //   "classes": [
  //     "sorcerer",
  //     "warlock",
  //     "wizard"
  //   ]
  // },
  {
    "name": "Poison Spray",
    "level": 0,
    "school": "Conjuration",
    "castTime": "1 Action",
    "range": "10 feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "You extend your hand toward a creature you can see within range and project a puff of noxious gas from your palm. The creature must succeed on a Constitution saving throw or take 1d12 poison damage.\n\nAt Higher Levels. This spell’s damage increases by 1d12 when you reach 5th level (2d12), 11th level (3d12), and 17th level (4d12).",
    "classes": [
      "druid",
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Prestidigitation",
    "level": 0,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "10 feet",
    "duration": "Up to 1 hour",
    "components": "V, S",
    "description": "This spell is a minor magical trick that novice spellcasters use for practice. You create one of the following magical effects within range:\n\nYou create an instantaneous, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musical notes, or an odd odor.\nYou instantaneously light or snuff out a candle, a torch, or a small campfire.\nYou instantaneously clean or soil an object no larger than 1 cubic foot.\nYou chill, warm, or flavor up to 1 cubic foot of nonliving material for 1 hour.\nYou make a color, a small mark, or a symbol appear on an object or a surface for 1 hour.\nYou create a nonmagical trinket or an illusory image that can fit in your hand and that lasts until the end of your next turn.\nIf you cast this spell multiple times, you can have up to three of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Primal Savagery",
    "level": 0,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "Instantaneous",
    "components": "S",
    "description": "You channel primal magic to cause your teeth or fingernails to sharpen, ready to deliver a corrosive attack. Make a melee spell attack against one creature within 5 feet of you. On a hit, the target takes 1d10 acid damage. After you make the attack, your teeth or fingernails return to normal.\n\nAt Higher Levels. The spell’s damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10).",
    "classes": [
      "druid"
    ]
  },
  {
    "name": "Produce Flame",
    "level": 0,
    "school": "Conjuration",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "10 minutes",
    "components": "V, S",
    "description": "A flickering flame appears in your hand. The flame remains there for the duration and harms neither you nor your equipment. The flame sheds bright light in a 10-foot radius and dim light for an additional 10 feet. The spell ends if you dismiss it as an action or if you cast it again.\n\nYou can also attack with the flame, although doing so ends the spell. When you cast this spell, or as an action on a later turn, you can hurl the flame at a creature within 30 feet of you. Make a ranged spell attack. On a hit, the target takes 1d8 fire damage.\n\nAt Higher Levels. This spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
    "classes": [
      "druid"
    ]
  },
  {
    "name": "Ray of Frost",
    "level": 0,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes 1d8 cold damage, and its speed is reduced by 10 feet until the start of your next turn.\n\nAt Higher Levels. The spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Resistance",
    "level": 0,
    "school": "Abjuration",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M (a miniatrue cloak)",
    "description": "You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one saving throw of its choice. It can roll the die before or after the saving throw. The spell then ends.",
    "classes": [
      "cleric",
      "druid"
    ]
  },
  {
    "name": "Sacred Flame",
    "level": 0,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "Flame-like radiance descends on a creature that you can see within range. The target must succeed on a Dexterity saving throw or take 1d8 radiant damage. The target gains no benefit from cover for this saving throw.\n\nAt Higher Levels. The spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
    "classes": [
      "cleric"
    ]
  },
  {
    "name": "Sapping Sting",
    "level": 0,
    "school": "Necromancy",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "You sap the vitality of one creature you can see in range. The target must succeed on a Constitution saving throw or take 1d4 necrotic damage and fall prone.\n\nAt Higher Levels. This spell's damage increases by 1d4 when you reach 5th level (2d4), 11th level (3d4), and 17th level (4d4).",
    "classes": [
      "wizard"
    ]
  },
  {
    "name": "Shape Water",
    "level": 0,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "Instantaneous or 1 hour",
    "components": "S",
    "description": "You choose an area of water that you can see within range and that fits within a 5-foot cube. You manipulate it in one of the following ways:\n\nYou instantaneously move or otherwise change the flow of the water as you direct, up to 5 feet in any direction. This movement doesn’t have enough force to cause damage.\nYou cause the water to form into simple shapes and animate at your direction. This change lasts for 1 hour.\nYou change the water’s color or opacity. The water must be changed in the same way throughout. This change lasts for 1 hour.\nYou freeze the water, provided that there are no creatures in it. The water unfreezes in 1 hour.\nIf you cast this spell multiple times, you can have no more than two of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.",
    "classes": [
      "druid",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Shillelagh",
    "level": 0,
    "school": "Transmutation",
    "castTime": "1 Bonus Action",
    "range": "Touch",
    "duration": "1 minute",
    "components": "V, S, M (mistletoe, a shamrock leaf, and a club or quarterstaff)",
    "description": "The wood of a club or quarterstaff you are holding is imbued with nature’s power. For the duration, you can use your spellcasting ability instead of Strength for the attack and damage rolls of melee attacks using that weapon, and the weapon’s damage die becomes a d8. The weapon also becomes magical, if it isn’t already. The spell ends if you cast it again or if you let go of the weapon.",
    "classes": [
      "druid"
    ]
  },
  {
    "name": "Shocking Grasp",
    "level": 0,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "Lightning springs from your hand to deliver a shock to a creature you try to touch. Make a melee spell attack against the target. You have advantage on the attack roll if the target is wearing armor made of metal. On a hit, the target takes 1d8 lightning damage, and it can’t take reactions until the start of its next turn.\n\nAt Higher Levels. The spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Spare the Dying",
    "level": 0,
    "school": "Necromancy",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "You touch a living creature that has 0 hit points. The creature becomes stable. This spell has no effect on undead or constructs.",
    "classes": [
      "cleric"
    ]
  },
  {
    "name": "Sword Burst",
    "level": 0,
    "school": "Conjuration",
    "castTime": "1 Action",
    "range": "Self (5-foot radius)",
    "duration": "Instantaneous",
    "components": "V",
    "description": "You create a momentary circle of spectral blades that sweep around you. All other creatures within 5 feet of you must succeed on a Dexterity saving throw or take 1d6 force damage.\n\nAt Higher Levels. This spell's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Thaumaturgy",
    "level": 0,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "Up to 1 minute",
    "components": "V",
    "description": "You manifest a minor wonder, a sign of supernatural power, within range. You create one of the following magical effects within range:\n\nYour voice booms up to three times as loud as normal for 1 minute.\nYou cause flames to flicker, brighten, dim, or change color for 1 minute.\nYou cause harmless tremors in the ground for 1 minute.\nYou create an instantaneous sound that originates from a point of your choice within range, such as a rumble of thunder, the cry of a raven, or ominous whispers.\nYou instantaneously cause an unlocked door or window to fly open or slam shut.\n• You alter the appearance of your eyes for 1 minute.\n\nIf you cast this spell multiple times, you can have up to three of its 1-minute effects active at a time, and you can dismiss such an effect as an action.",
    "classes": [
      "cleric"
    ]
  },
  {
    "name": "Thorn Whip",
    "level": 0,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "Instantaneous",
    "components": "V, S, M (the stem of a plant with thorns)",
    "description": "You create a long, vine-like whip covered in thorns that lashes out at your command toward a creature in range. Make a melee spell attack against the target. If the attack hits, the creature takes 1d6 piercing damage, and if the creature is Large or smaller, you pull the creature up to 10 feet closer to you.\n\nAt Higher Levels. This spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).",
    "classes": [
      "druid"
    ]
  },
  {
    "name": "Thunderclap",
    "level": 0,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "Self (5-foot radius)",
    "duration": "Instantaneous",
    "components": "S",
    "description": "You create a burst of thunderous sound, which can be heard 100 feet away. Each creature other than you within 5 feet of you must make a Constitution saving throw. On a failed save, the creature takes 1d6 thunder damage.\n\nAt Higher Levels. The spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).",
    "classes": [
      "bard",
      "druid",
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Toll the Dead",
    "level": 0,
    "school": "Necromancy",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "You point at one creature you can see within range, and the sound of a dolorous bell fills the air around it for a moment. The target must succeed on a Wisdom saving throw or take 1d8 necrotic damage. If the target is missing any of its hit points, it instead takes 1d12 necrotic damage.\n\nAt Higher Levels. The spell’s damage increases by one die when you reach 5th level (2d8 or 2d12), 11th level (3d8 or 3d12), and 17th level (4d8 or 4d12).",
    "classes": [
      "cleric",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "True Strike",
    "level": 0,
    "school": "Divination",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "Concentration up to 1 round",
    "components": "S",
    "description": "You extend your hand and point a finger at a target in range. Your magic grants you a brief insight into the target’s defenses. On your next turn, you gain advantage on your first attack roll against the target, provided that this spell hasn’t ended.",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Vicious Mockery",
    "level": 0,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Instantaneous",
    "components": "V",
    "description": "You unleash a string of insults laced with subtle enchantments at a creature you can see within range. If the target can hear you (though it need not understand you), it must succeed on a Wisdom saving throw or take 1d4 psychic damage and have disadvantage on the next attack roll it makes before the end of its next turn.\n\nAt Higher Levels. This spell’s damage increases by 1d4 when you reach 5th level (2d4), 11th level (3d4), and 17th level (4d4).",
    "classes": [
      "bard"
    ]
  },
  // {
  //   "name": "Virtue (UA)",
  //   "level": 0,
  //   "school": "Abjuration",
  //   "castTime": "1 Action",
  //   "range": "Touch",
  //   "duration": "1 round",
  //   "components": "V, S",
  //   "description": "You touch one creature, imbuing it with vitality. If the target has at least 1 hit point, it gains a number of temporary hit points equal to 1d4 + your spellcasting ability modifier. The temporary hit points are lost when the spell ends.",
  //   "classes": [
  //     "cleric"
  //   ]
  // },
  {
    "name": "Word of Radiance",
    "level": 0,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "5 feet",
    "duration": "Instantaneous",
    "components": "V, M (a holy symbol)",
    "description": "You utter a divine word, and burning radiance erupts from you. Each creature of your choice that you can see within range must succeed on a Constitution saving throw or take 1d6 radiant damage.\n\nAt Higher Levels. The spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).",
    "classes": [
      "cleric"
    ]
  },
  {
    "name": "Absorb Elements",
    "level": 1,
    "school": "Abjuration",
    "castTime": "1 Reaction",
    "range": "Self",
    "duration": "1 round",
    "components": "S",
    "description": "The spell captures some of the incoming energy, lessening its effect on you and storing it for your next melee attack. You have resistance to the triggering damage type until the start of your next turn. Also, the first time you hit with a melee attack on your next turn, the target takes an extra 1d6 damage of the triggering type, and the spell ends.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the extra damage increases by 1d6 for each slot level above 1st.",
    "classes": [
      "druid",
      "ranger",
      "sorcerer",
      "wizard"
    ]
  },
  // {
  //   "name": "Acid Stream (UA)",
  //   "level": 1,
  //   "school": "Evocation",
  //   "castTime": "1 Action",
  //   "range": "Self (30-foot line)",
  //   "duration": "Concentration, up to 1 minute",
  //   "components": "V, S, M (a bit of rotten food)",
  //   "description": "A stream of acid emanates from you in a line 30 feet long and 5 feet wide in a direction you choose. Each creature in the line must succeed on a Dexterity saving throw or be covered in acid for the spell’s duration or until a creature uses its action to scrape or wash the acid off itself or another creature. A creature covered in the acid takes 3d4 acid damage at the start of each of its turns.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d4 for each slot level above 1st.",
  //   "classes": [
  //     "sorcerer",
  //     "wizard"
  //   ]
  // },
  {
    "name": "Alarm",
    "level": 1,
    "school": "Abjuration",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "8 hours",
    "components": "V, S, M (a tiny bell and a piece of fine silver wire)",
    "description": "You set an alarm against unwanted intrusion. Choose a door, a window, or an area within range that is no larger than a 20-foot cube. Until the spell ends, an alarm alerts you whenever a tiny or larger creature touches or enters the warded area. When you cast the spell, you can designate creatures that won’t set off the alarm. You also choose whether the alarm is mental or audible.\n\nA mental alarm alerts you with a ping in your mind if you are within 1 mile of the warded area. This ping awakens you if you are sleeping. An audible alarm produces the sound of a hand bell for 10 seconds within 60 feet.",
    "classes": [
      "ranger",
      "wizard"
    ]
  },
  {
    "name": "Animal Friendship",
    "level": 1,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "24 hours",
    "components": "V, S, M (a cup of water)",
    "description": "This spell lets you convince a beast that you mean it no harm. Choose a beast that you can see within range. It must see and hear you. If the beast’s Intelligence is 4 or higher, the spell fails. Otherwise, the beast must succeed on a Wisdom saving throw or be charmed by you for the spell’s duration. If you or one of your companions harms the target, the spell ends.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, you can affect one additional beast for each slot level above 1st.",
    "classes": [
      "bard",
      "druid",
      "ranger"
    ]
  },
  {
    "name": "Armor of Agathys",
    "level": 1,
    "school": "Abjuration",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "1 hour",
    "components": "V, S, M (a morsel of food)",
    "description": "A protective magical force surrounds you, manifesting as a spectral frost that covers you and your gear. You gain 5 temporary hit points for the duration. If a creature hits you with a melee attack while you have these hit points, the creature takes 5 cold damage.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, both the temporary hit points and the cold damage increase by 5 for each slot.",
    "classes": [
      "warlock"
    ]
  },
  {
    "name": "Arms of Hadar",
    "level": 1,
    "school": "Conjuration",
    "castTime": "1 Action",
    "range": "Self (10-foot radius)",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "You invoke the power of Hadar, the Dark Hunger. Tendrils of dark energy erupt from you and batter all creatures within 10 feet of you. Each creature in that area must make a Strength saving throw. On a failed save, a target takes 2d6 necrotic damage and can’t take reactions until its next turn. On a successful save, the creature takes half damage, but suffers no other effect.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.",
    "classes": [
      "warlock"
    ]
  },
  {
    "name": "Bane",
    "level": 1,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M (a drop of blood)",
    "description": "Up to three creatures of your choice that you can see within range must make Charisma saving throws. Whenever a target that fails this saving throw makes an attack roll or a saving throw before the spell ends, the target must roll a d4 and subtract the number rolled from the attack roll or saving throw.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st.",
    "classes": [
      "bard",
      "cleric"
    ]
  },
  {
    "name": "Beast Bond",
    "level": 1,
    "school": "Divination",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M (a bit of fur wrapped in cloth)",
    "description": "You establish a telepathic link with one beast you touch that is friendly to you or charmed by you. The spell fails if the beast’s Intelligence is 4 or higher. Until the spell ends, the link is active while you and the beast are within line of sight of each other. Through the link, the beast can understand your telepathic messages to it, and it can telepathically communicate simple emotions and concepts back to you. While the link is active, the beast gains advantage on attack rolls against any creature within 5 feet of you that you can see.",
    "classes": [
      "druid",
      "ranger"
    ]
  },
  {
    "name": "Bless",
    "level": 1,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M (a sprinkling of holy water)",
    "description": "You bless up to three creatures of your choice within range. Whenever a target makes an attack roll or a saving throw before the spell ends, the target can roll a d4 and add the number rolled to the attack roll or saving throw.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st.",
    "classes": [
      "cleric",
      "paladin"
    ]
  },
  {
    "name": "Burning Hands",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "Self (15-foot cone)",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "As you hold your hands with thumbs touching and fingers spread, a thin sheet of flames shoots forth from your outstretched fingertips. Each creature in a 15-foot cone must make a Dexterity saving throw. A creature takes 3d6 fire damage on a failed save, or half as much damage on a successful one.\n\nThe fire ignites any flammable objects in the area that aren’t being worn or carried.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Catapult",
    "level": 1,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Instantaneous",
    "components": "S",
    "description": "Choose one object weighing 1 to 5 pounds within range that isn’t being worn or carried. The object flies in a straight line up to 90 feet in a direction you choose before falling to the ground, stopping early if it impacts against a solid surface. If the object would strike a creature, that creature must make a Dexterity saving throw. On a failed save, the object strikes the target and stops moving. When the object strikes something, the object and what it strikes each take 3d8 bludgeoning damage.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the maximum weight of objects that you can target with this spell increases by 5 pounds, and the damage increases by 1d8, for each slot level above 1st.",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Cause Fear",
    "level": 1,
    "school": "Necromancy",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "description": "You awaken the sense of mortality in one creature you can see within range. A construct or an undead is immune to this effect. The target must succeed on a Wisdom saving throw or become frightened of you until the spell ends. The frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them.",
    "classes": [
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Ceremony",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Instantaneous",
    "components": "V, S, M (25 gp worth of powdered silver, which the spell consumes)",
    "description": "You perform one of several religious ceremonies. When you cast the spell, choose one of the following ceremonies, the target of which must be within 10 feet of you throughout the casting.\n\nAtonement. You touch one willing creature whose alignment has changed, and you make a DC 20 Wisdom (Insight) check. On a successful check, you restore the target to its original alignment.\n\nBless Water. You touch one vial of water and cause it to become holy water.\n\nComing of Age. You touch one humanoid who is a young adult. For the next 24 hours, whenever the target makes an ability check, it can roll a d4 and add the number rolled to the ability check. A creature can benefit from this rite only once.\n\nDedication. You touch one humanoid who wishes to be dedicated to your god’s service. For the next 24 hours, whenever the target makes a saving throw, it can roll a d4 and add the number rolled to the save. A creature can benefit from this rite only once.\n\nFuneral Rite. You touch one corpse, and for the next 7 days, the target can’t become undead by any means short of a Wish spell.\n\nInvestiture (UA). You touch one willing humanoid. Choose one 1st-level spell you have prepared and expend a spell slot and any material components as if you were casting that spell. The spell has no effect. Instead, the target can cast this spell once without having to expend a spell slot or use material components. If the target doesn’t cast the spell within 1 hour, the invested spell is lost.\n\nWedding. You touch adult humanoids willing to be bonded together in marriage. For the next 7 days, each target gains a +2 bonus to AC while they are within 30 feet of each other. A creature can benefit from this rite again only if widowed.",
    "classes": [
      "cleric",
      "paladin"
    ]
  },
  {
    "name": "Chaos Bolt",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "120 Feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "You hurl an undulating, warbling mass of chaotic energy at one creature in range. Make a ranged spell attack against the target. On a hit, the target takes 2d8 + 1d6 damage. Choose one of the d8s. The number rolled on that die determines the attack's damage type, as shown below.\n\nd8\tDamage Type\n1\tAcid\n2\tCold\n3\tFire\n4\tForce\n5\tLightning\n6\tPoison\n7\tPsychic\n8\tThunder\nIf you roll the same number on both d8s, the chaotic energy leaps from the target to a different creature of your choice within 30 feet of it. Make a new attack roll against the new target, and make a new damage roll, which could cause the chaotic energy to leap again.\n\nA creature can be targeted only once by each casting of this spell.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, each target takes 1d6 extra damage of the type rolled for each slot level above 1st.",
    "classes": [
      "sorcerer"
    ]
  },
  {
    "name": "Charm Person",
    "level": 1,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "1 hour",
    "components": "V, S",
    "description": "You attempt to charm a humanoid you can see within range. It must make a Wisdom saving throw, and does so with advantage if you or your companions are fighting it. If it fails the saving throw, it is charmed by you until the spell ends or until you or your companions do anything harmful to it. The charmed creature regards you as a friendly acquaintance. When the spell ends, the creature knows it was charmed by you.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them.",
    "classes": [
      "bard",
      "druid",
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Chromatic Orb",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "90 feet",
    "duration": "Instantaneous",
    "components": "V, S, M (a diamond worth at least 50 gp)",
    "description": "You hurl a 4-inch-diameter sphere of energy at a creature that you can see within range. You choose acid, cold, fire, lightning, poison, or thunder for the type of orb you create, and then make a ranged spell attack against the target. If the attack hits, the creature takes 3d8 damage of the type you chose.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st.",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Color Spray",
    "level": 1,
    "school": "Illusion",
    "castTime": "1 Action",
    "range": "Self (15-foot cone)",
    "duration": "1 round",
    "components": "V, S, M (A pinch of powder or sand that is colored red, yellow, and blue)",
    "description": "A dazzling array of flashing, colored light springs from your hand. Roll 6d10, the total is how many hit points of creatures this spell can effect. Creatures in a 15-foot cone originating from you are affected in ascending order of their current hit points (ignoring unconscious creatures and creatures that can’t see).\n\nStarting with the creature that has the lowest current hit points, each creature affected by this spell is blinded until the spell ends. Subtract each creature’s hit points from the total before moving on to the creature with the next lowest hit points. A creature’s hit points must be equal to or less than the remaining total for the creature to be affected.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, roll an additional 2d10 for each slot level above 1st.",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Command",
    "level": 1,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "1 round",
    "components": "V",
    "description": "You speak a one-word command to a creature you can see within range. The target must succeed on a Wisdom saving throw or follow the command on its next turn. The spell has no effect if the target is undead, if it doesn’t understand your language, or if your command is directly harmful to it. Some typical commands and their effects follow. You might issue a command other than one described here. If you do so, the DM determines how the target behaves. If the target can’t follow your command, the spell ends.\n\nApproach. The target moves toward you by the shortest and most direct route, ending its turn if it moves within 5 feet of you.\n\nDrop. The target drops whatever it is holding and then ends its turn.\n\nFlee. The target spends its turn moving away from you by the fastest available means.\n\nGrovel. The target falls prone and then ends its turn.\n\nHalt. The target doesn’t move and takes no actions. A flying creature stays aloft, provided that it is able to do so. If it must move to stay aloft, it flies the minimum distance needed to remain in the air.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, you can affect one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them.",
    "classes": [
      "bard",
      "cleric",
      "paladin"
    ]
  },
  {
    "name": "Compelled Duel",
    "level": 1,
    "school": "Enchantment",
    "castTime": "1 Bonus Action",
    "range": "30 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V",
    "description": "You attempt to compel a creature into a duel. One creature that you can see within range must make a Wisdom saving throw. On a failed save, the creature is drawn to you, compelled by your divine demand. For the duration, it has disadvantage on attack rolls against creatures other than you, and must make a Wisdom saving throw each time it attempts to move to a space that is more than 30 feet away from you; if it succeeds on this saving throw, this spell doesn’t restrict the target’s movement for that turn.\n\nThe spell ends if you attack any other creature, if you cast a spell that targets a hostile creature other than the target, if a creature friendly to you damages the target or casts a harmful spell on it, or if you end your turn more than 30 feet away from the target.",
    "classes": [
      "paladin"
    ]
  },
  {
    "name": "Comprehend Languages",
    "level": 1,
    "school": "Divination",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "1 hour",
    "components": "V, S, M (a pinch of soot and salt)",
    "description": "For the duration, you understand the literal meaning of any spoken language that you hear. You also understand any written language that you see, but you must be touching the surface on which the words are written. It takes about 1 minute to read one page of text.\n\nThis spell doesn’t decode secret messages in a text or glyph, such as an arcane sigil, that isn’t part of a written language.",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Create or Destroy Water",
    "level": 1,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "Instantaneous",
    "components": "V, S, M (a drop of water if creating water or a few grains of sand if destroying it)",
    "description": "You either create or destroy water.\n\nCreate Water. You create up to 10 gallons of clean water within range in an open container. Alternatively, the water falls as rain in a 30-foot cube within range, extinguishing exposed flames in the area.\n\nDestroy Water. You destroy up to 10 gallons of water in an open container within range. Alternatively, you destroy fog in a 30-foot cube within range.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, you create or destroy 10 additional gallons of water, or the size of the cube increases by 5 feet, for each slot level above 1st.",
    "classes": [
      "cleric",
      "druid"
    ]
  },
  {
    "name": "Cure Wounds",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d8 for each slot level above 1st.",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "paladin",
      "ranger"
    ]
  },
  {
    "name": "Detect Evil and Good",
    "level": 1,
    "school": "Divination",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S",
    "description": "For the duration, you know if there is an aberration, celestial, elemental, fey, fiend, or undead within 30 feet of you, as well as where the creature is located. Similarly, you know if there is a place or object within 30 feet of you that has been magically consecrated or desecrated.\n\nThe spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt.",
    "classes": [
      "cleric",
      "paladin"
    ]
  },
  {
    "name": "Detect Magic",
    "level": 1,
    "school": "Divination",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S",
    "description": "For the duration, you sense the presence of magic within 30 feet of you. If you sense magic in this way, you can use your action to see a faint aura around any visible creature or object in the area that bears magic, and you learn its school of magic, if any.\n\nThe spell can penetrate most barriers, but is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt.",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "paladin",
      "ranger",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Detect Poison and Disease",
    "level": 1,
    "school": "Divination",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S, M (a yew leaf)",
    "description": "For the duration, you can sense the presence and location of poisons, poisonous creatures, and diseases within 30 feet of you. You also identify the kind of poison, poisonous creature, or disease in each case.\n\nThe spell can penetrate most barriers, but is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt.",
    "classes": [
      "cleric",
      "druid",
      "paladin",
      "ranger"
    ]
  },
  {
    "name": "Disguise Self",
    "level": 1,
    "school": "Illusion",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "1 hour",
    "components": "V, S",
    "description": "You make yourself – including your clothing, armor, weapons, and other belongings on your person – look different until the spell ends or until you use your action to dismiss it. You can seem 1 foot shorter or taller and can appear thin, fat, or in between. You can’t change your body type, so you must adopt a form that has the same basic arrangement of limbs. Otherwise, the extent of the illusion is up to you.\n\nThe changes wrought by this spell fail to hold up to physical inspection. For example, if you use this spell to add a hat to your outfit, objects pass through the hat, and anyone who touches it would feel nothing or would feel your head and hair. If you use this spell to appear thinner than you are, the hand of someone who reaches out to touch you would bump into you while it was seemingly still in midair. To discern that you are disguised, a creature can use its action to inspect your appearance and must succeed on an Intelligence (Investigation) check against your spell save DC.",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Dissonant Whispers",
    "level": 1,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Instantaneous",
    "components": "V",
    "description": "You whisper a discordant melody that only one creature of your choice within range can hear, wracking it with terrible pain. The target must make a Wisdom saving throw. On a failed save, it takes 3d6 psychic damage and must immediately use its reaction, if available, to move as far as its speed allows away from you. The creature doesn’t move into obviously dangerous ground, such as a fire or a pit. On a successful save, the target takes half as much damage and doesn’t have to move away. A deafened creature automatically succeeds on the save.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.",
    "classes": [
      "bard"
    ]
  },
  {
    "name": "Distort Value",
    "level": 1,
    "school": "Illusion",
    "castTime": "1 Minute",
    "range": "Touch",
    "duration": "8 hours",
    "components": "V",
    "description": "You cast this spell on an object no more than 1 foot on a side, doubling the object's perceived value by adding illusionary flourish or reducing its perceived value by half with the help of illusionary dents and scratches. Anyone examining the object must roll an Investigation check against your spell DC.\n\nAt Higher Levels. When you cast this spell using a higher spell slot, you increase the size of the object by 1 foot per spell slot over 1st.",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Divine Favor",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "description": "Your prayer empowers you with divine radiance. Until the spell ends, your weapon attacks deal an extra 1d4 radiant damage on a hit.",
    "classes": [
      "paladin"
    ]
  },
  {
    "name": "Earth Tremor",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "Self (10-foot radius)",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "You cause a tremor in the ground in a 10-foot radius. Each creature other than you in that area must make a Dexterity saving throw. On a failed save, a creature takes 1d6 bludgeoning damage and is knocked prone. If the ground in that area is loose earth or stone, it becomes difficult terrain until cleared.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.",
    "classes": [
      "bard",
      "druid",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Ensnaring Strike",
    "level": 1,
    "school": "Conjuration",
    "castTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V",
    "description": "The next time you hit a creature with a weapon attack before this spell ends, a writhing mass of thorny vines appears at the point of impact, and the target must succeed on a Strength saving throw or be restrained by the magical vines until the spell ends. A Large or larger creature has advantage on this saving throw. If the target succeeds on the save, the vines shrivel away.\n\nWhile restrained by this spell, the target takes 1d6 piercing damage at the start of each of its turns. A creature restrained by the vines or one that can touch the creature can use its action to make a Strength check against your spell save DC. On a success, the target is freed.\n\nAt Higher Levels. If you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.",
    "classes": [
      "ranger"
    ]
  },
  {
    "name": "Entangle",
    "level": 1,
    "school": "Conjuration",
    "castTime": "1 Action",
    "range": "90 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "description": "Grasping weeds and vines sprout from the ground in a 20-foot square starting from a point within range. For the duration, these plants turn the ground in the area into difficult terrain.\n\nA creature in the area when you cast the spell must succeed on a Strength saving throw or be restrained by the entangling plants until the spell ends. A creature restrained by the plants can use its action to make a Strength check against your spell save DC. On a success, it frees itself.\n\nWhen the spell ends, the conjured plants wilt away.",
    "classes": [
      "druid",
      "ranger"
    ]
  },
  {
    "name": "Expeditious Retreat",
    "level": 1,
    "school": "Transmutation",
    "castTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S",
    "description": "This spell allows you to move at an incredible pace. When you cast this spell, and then as a bonus action on each of your turns until the spell ends, you can take the Dash action.",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Faerie Fire",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V",
    "description": "Each object in a 20-foot cube within range is outlined in blue, green, or violet light (your choice).\n\nAny creature in the area when the spell is cast is also outlined in light if it fails a Dexterity saving throw. For the duration, objects and affected creatures shed dim light in a 10-foot radius.\n\nAny attack roll against an affected creature or object has advantage if the attacker can see it, and the affected creature or object can’t benefit from being invisible.",
    "classes": [
      "bard",
      "druid"
    ]
  },
  {
    "name": "False Life",
    "level": 1,
    "school": "Necromancy",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "1 hour",
    "components": "V, S, M (a small amount of alcohol or distilled spirits)",
    "description": "Bolstering yourself with a necromantic facsimile of life, you gain 1d4 + 4 temporary hit points for the duration.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, you gain 5 additional temporary hit points for each slot level above 1st.",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Feather Fall",
    "level": 1,
    "school": "Transmutation",
    "castTime": "1 Reaction",
    "range": "60 Feet",
    "duration": "1 minute",
    "components": "V, M (a small feather or piece of down)",
    "description": "Choose up to five falling creatures within range. A falling creature’s rate of descent slows to 60 feet per round until the spell ends. If the creature lands before the spell ends, it takes no falling damage and can land on its feet, and the spell ends for that creature.",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Find Familiar",
    "level": 1,
    "school": "Conjuration",
    "castTime": "1 Hour",
    "range": "10 feet",
    "duration": "Instantaneous",
    "components": "V, S, M (10 gp worth of charcoal, incense, and herbs that must be consumed by fire in a brass brazier)",
    "description": "You gain the service of a familiar, a spirit that takes an animal form you choose: bat, cat, crab, frog (toad), hawk, lizard, octopus, owl, poisonous snake, fish (quipper), rat, raven, sea horse, spider, or weasel. Appearing in an unoccupied space within range, the familiar has the statistics of the chosen form, though it is a celestial, fey, or fiend (your choice) instead of a beast.\n\nYour familiar acts independently of you, but it always obeys your commands. In combat, it rolls its own initiative and acts on its own turn. A familiar can’t attack, but it can take other actions as normal.\n\nWhen the familiar drops to 0 hit points, it disappears, leaving behind no physical form. It reappears after you cast this spell again.\n\nWhile your familiar is within 100 feet of you, you can communicate with it telepathically. Additionally, as an action, you can see through your familiar’s eyes and hear what it hears until the start of your next turn, gaining the benefits of any special senses that the familiar has. During this time, you are deaf and blind with regard to your own senses.\n\nAs an action, you can temporarily dismiss your familiar. It disappears into a pocket dimension where it awaits your summons. Alternatively, you can dismiss it forever. As an action while it is temporarily dismissed, you can cause it to reappear in any unoccupied space within 30 feet of you.\n\nYou can’t have more than one familiar at a time. If you cast this spell while you already have a familiar, you instead cause it to adopt a new form. Choose one of the forms from the above list. Your familiar transforms into the chosen creature.\n\nFinally, when you cast a spell with a range of touch, your familiar can deliver the spell as if it had cast the spell. Your familiar must be within 100 feet of you, and it must use its reaction to deliver the spell when you cast it. If the spell requires an attack roll, you use your attack modifier for the roll.",
    "classes": [
      "wizard"
    ]
  },
  {
    "name": "Fog Cloud",
    "level": 1,
    "school": "Conjuration",
    "castTime": "1 Action",
    "range": "120 Feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S",
    "description": "You create a 20-foot-radius sphere of fog centered on a point within range. The sphere spreads around corners, and its area is heavily obscured. It lasts for the duration or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the radius of the fog increases by 20 feet for each slot level above 1st.",
    "classes": [
      "druid",
      "ranger",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Frost Fingers",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "Self (15-foot cone)",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "Freezing cold blasts from your fingertips in a 15-foot cone. Each creature in that area must make a Constitution saving throw, taking 2d8 cold damage on a failed save, or half as much damage on a successful one.\n\nThe cold freezes nonmagical liquids in the area that aren't being worn or carried.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st.",
    "classes": [
      "wizard"
    ]
  },
  {
    "name": "Gift of Alacrity",
    "level": 1,
    "school": "Divination",
    "castTime": "1 Minute",
    "range": "Touch",
    "duration": "8 hours",
    "components": "V, S",
    "description": "You touch a willing creature. For the duration, the target can add 1d8 to its initiative rolls.",
    "classes": [
      "wizard"
    ]
  },
  {
    "name": "Goodberry",
    "level": 1,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Instantaneous",
    "components": "V, S, M (a sprig of mistletoe)",
    "description": "Up to ten berries appear in your hand and are infused with magic for the duration. A creature can use its action to eat one berry. Eating a berry restores 1 hit point, and the berry provides enough nourishment to sustain a creature for one day.\n\nThe berries lose their potency if they have not been consumed within 24 hours of the casting of this spell.",
    "classes": [
      "druid",
      "ranger"
    ]
  },
  {
    "name": "Grease",
    "level": 1,
    "school": "Conjuration",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "1 minute",
    "components": "V, S, M (a bit of pork rind or butter)",
    "description": "Slick grease covers the ground in a 10-foot square centered on a point within range and turns it into difficult terrain for the duration.\n\nWhen the grease appears, each creature standing in its area must succeed on a Dexterity saving throw or fall prone. A creature that enters the area or ends its turn there must also succeed on a Dexterity saving throw or fall prone.",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Guiding Bolt",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "120 Feet",
    "duration": "1 round",
    "components": "V, S",
    "description": "A flash of light streaks toward a creature of your choice within range. Make a ranged spell attack against the target. On a hit, the target takes 4d6 radiant damage, and the next attack roll made against this target before the end of your next turn has advantage, thanks to the mystical dim light glittering on the target until then.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.",
    "classes": [
      "cleric"
    ]
  },
  // {
  //   "name": "Guiding Hand (UA)",
  //   "level": 1,
  //   "school": "Divination",
  //   "castTime": "1 Minute",
  //   "range": "5 feet",
  //   "duration": "Concentration, up to 8 hours",
  //   "components": "V, S",
  //   "description": "You create a Tiny incorporeal hand of shimmering light in an unoccupied space you can see within range. The hand exists for the duration, but it disappears if you teleport or you travel to a different plane of existence.\n\nWhen the hand appears, you name one major landmark, such as a city, mountain, castle, or battlefield on the same plane of existence as you. Someone in history must have visited the site and mapped it. If the landmark appears on no map in existence, the spell fails. Otherwise, whenever you move toward the hand, it moves away from you at the same speed you moved, and it moves in the direction of the landmark, always remaining 5 feet away from you.\n\nIf you don’t move toward the hand, it remains in place until you do and beckons for you to follow once every 1d4 minutes.",
  //   "classes": [
  //     "bard",
  //     "cleric",
  //     "druid",
  //     "wizard"
  //   ]
  // },
  {
    "name": "Hail of Thorns",
    "level": 1,
    "school": "Conjuration",
    "castTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V",
    "description": "The next time you hit a creature with a ranged weapon attack before the spell ends, this spell creates a rain of thorns that sprouts from your ranged weapon or ammunition. In addition to the normal effect of the attack, the target of the attack and each creature within 5 feet of it must make a Dexterity saving throw. A creature takes 1d10 piercing damage on a failed save, or half as much damage on a successful one.\n\nAt Higher Levels. If you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d10 for each slot level above 1st (to a maximum of 6d10).",
    "classes": [
      "ranger"
    ]
  },
  // {
  //   "name": "Healing Elixir (UA)",
  //   "level": 1,
  //   "school": "Conjuration",
  //   "castTime": "1 Minute",
  //   "range": "Self",
  //   "duration": "24 hours",
  //   "components": "V, S, M (alchemist’s supplies)",
  //   "description": "You create a healing elixir in a simple vial that appears in your hand. The elixir retains its potency for the duration or until it’s consumed, at which point the vial vanishes.\n\nAs an action, a creature can drink the elixir or administer it to another creature. The drinker regains 2d4 + 2 hit points.",
  //   "classes": [
  //     "warlock",
  //     "wizard"
  //   ]
  // },
  {
    "name": "Healing Word",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Bonus Action",
    "range": "60 Feet",
    "duration": "Instantaneous",
    "components": "V",
    "description": "A creature of your choice that you can see within range regains hit points equal to 1d4 + your spellcasting ability modifier. This spell has no effect on undead or constructs.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d4 for each slot level above 1st.",
    "classes": [
      "bard",
      "cleric",
      "druid"
    ]
  },
  {
    "name": "Hellish Rebuke",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Reaction",
    "range": "60 Feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "You point your finger, and the creature that damaged you is momentarily surrounded by hellish flames. The creature must make a Dexterity saving throw. It takes 2d10 fire damage on a failed save, or half as much damage on a successful one.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d10 for each slot level above 1st.",
    "classes": [
      "warlock"
    ]
  },
  {
    "name": "Heroism",
    "level": 1,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "description": "A willing creature you touch is imbued with bravery. Until the spell ends, the creature is immune to being frightened and gains temporary hit points equal to your spellcasting ability modifier at the start of each of its turns. When the spell ends, the target loses any remaining temporary hit points from this spell.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st.",
    "classes": [
      "bard",
      "paladin"
    ]
  },
  {
    "name": "Hex",
    "level": 1,
    "school": "Enchantment",
    "castTime": "1 Bonus Action",
    "range": "90 feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M (the petrified eye of a newt)",
    "description": "You place a curse on a creature that you can see within range. Until the spell ends, you deal an extra 1d6 necrotic damage to the target whenever you hit it with an attack. Also, choose one ability when you cast the spell. The target has disadvantage on ability checks made with the chosen ability.\n\nIf the target drops to 0 hit points before this spell ends, you can use a bonus action on a subsequent turn of yours to curse a new creature.\n\nA Remove Curse cast on the target ends this spell early.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd or 4th level, you can maintain your concentration on the spell for up to 8 hours. When you use a spell slot of 5th level or higher, you can maintain your concentration on the spell for up to 24 hours.",
    "classes": [
      "warlock"
    ]
  },
  {
    "name": "Hunter's Mark",
    "level": 1,
    "school": "Divination",
    "castTime": "1 Bonus Action",
    "range": "90 feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V",
    "description": "You choose a creature you can see within range and mystically mark it as your quarry. Until the spell ends, you deal an extra 1d6 damage to the target whenever you hit it with a weapon attack, and you have advantage on any Wisdom (Perception) or Wisdom (Survival) check you make to find it.\n\nIf the target drops to 0 hit points before this spell ends, you can use a bonus action on a subsequent turn of yours to mark a new creature.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd or 4th level, you can maintain your concentration on the spell for up to 8 hours. When you use a spell slot of 5th level or higher, you can maintain your concentration on the spell for up to 24 hours.",
    "classes": [
      "ranger"
    ]
  },
  {
    "name": "Ice Knife",
    "level": 1,
    "school": "Conjuration",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Instantaneous",
    "components": "S, M (a drop of water or piece of ice)",
    "description": "You create a shard of ice and fling it at one creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 piercing damage. Hit or miss, the shard then explodes. The target and each creature within 5 feet of the point where the ice exploded must succeed on a Dexterity saving throw or take 2d6 cold damage.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the cold damage increases by 1d6 for each slot level above 1st.",
    "classes": [
      "druid",
      "sorcerer",
      "wizard"
    ]
  },
  // {
  //   "name": "Id Insinuation (UA)",
  //   "level": 1,
  //   "school": "Enchantment",
  //   "castTime": "1 Action",
  //   "range": "60 Feet",
  //   "duration": "Concentration, up to 1 minute",
  //   "components": "V, S",
  //   "description": "You unleash a torrent of conflicting desires in the mind of one creature you can see within range, impairing its ability to make decisions. The target must succeed on a Wisdom saving throw or be incapacitated. At the end of each of its turns, it takes 1d12 psychic damage, and it can then make another Wisdom saving throw. On a success, the spell ends on the target.",
  //   "classes": [
  //     "sorcerer",
  //     "warlock",
  //     "wizard"
  //   ]
  // },
  {
    "name": "Identify",
    "level": 1,
    "school": "Divination",
    "castTime": "1 Minute",
    "range": "Touch",
    "duration": "Instantaneous",
    "components": "V, S, M (a pearl worth at least 100 gp and an owl feather)",
    "description": "You choose one object that you must touch throughout the casting of the spell. If it is a magic item or some other magic-imbued object, you learn its properties and how to use them, whether it requires attunement to use, and how many charges it has, if any. You learn whether any spells are affecting the item and what they are. If the item was created by a spell, you learn which spell created it.\n\nIf you instead touch a creature throughout the casting, you learn what spells, if any, are currently affecting it.",
    "classes": [
      "bard",
      "wizard"
    ]
  },
  {
    "name": "Illusory Script",
    "level": 1,
    "school": "Illusion",
    "castTime": "1 Minute",
    "range": "Touch",
    "duration": "10 days",
    "components": "S, M (a lead-based ink worth at least 10 gp, which the spell consumes)",
    "description": "You write on parchment, paper, or some other suitable writing material and imbue it with a potent illusion that lasts for the duration.\n\nTo you and any creatures you designate when you cast the spell, the writing appears normal, written in your hand, and conveys whatever meaning you intended when you wrote the text. To all others, the writing appears as if it were written in an unknown or magical script that is unintelligible. Alternatively, you can cause the writing to appear to be an entirely different message, written in a different hand and language, though the language must be one you know.\n\nShould the spell be dispelled, the original script and the illusion both disappear. A creature with truesight can read the hidden message.",
    "classes": [
      "bard",
      "warlock",
      "wizard"
    ]
  },
  // {
  //   "name": "Infallible Relay (UA)",
  //   "level": 1,
  //   "school": "Divination",
  //   "castTime": "1 Minute",
  //   "range": "Self",
  //   "duration": "Concentration, up to 10 minutes",
  //   "components": "V, S, M (a mobile phone)",
  //   "description": "With this spell, you can target any creature with whom you have spoken previously, as long as the two of you are on the same plane of existence. When you cast the spell, the nearest functioning telephone or similar communications device within 100 feet of the target begins to ring. If there is no suitable device close enough to the target, the spell fails.\n\nThe target must make a successful Charisma saving throw or be compelled to answer your call. Once the connection is established, the call is crystal clear and cannot be dropped until the conversation has ended or the spell’s duration ends. You can end the conversation at any time, but a target must succeed on a Charisma saving throw to end the conversation.",
  //   "classes": [
  //     "sorcerer",
  //     "warlock",
  //     "wizard"
  //   ]
  // },
  {
    "name": "Inflict Wounds",
    "level": 1,
    "school": "Necromancy",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "Make a melee spell attack against a creature you can reach. On a hit, the target takes 3d10 necrotic damage.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d10 for each slot level above 1st.",
    "classes": [
      "cleric"
    ]
  },
  {
    "name": "Jim's Magic Missile",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "120 Feet",
    "duration": "Instantaneous",
    "components": "V, S, M (1 gold coin, which is consumed as tax for using the spell)",
    "description": "You create three twisting, whistling, hypoallergenic, gluten-free darts of magical force. Each dart can target a creature of your choice that you can see within range. Make a ranged spell attack for each missile. On a hit, the missile does 2d4 force damage.\n\nIf the attack roll scores a critical, the missile does 5d4 force damage instead of the 4d4 force that you would normally get on a critical. If any of the attack roll is a natural one, all missiles turn around and hit the caster for 1 force damage per missile.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the spell creates one more dart for each slot level above 1st. This also increases the tax by 1 gp per spell slot over 1st.",
    "classes": [
      "wizard"
    ]
  },
  {
    "name": "Jump",
    "level": 1,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "1 minute",
    "components": "V, S, M (a grasshopper’s hind leg)",
    "description": "You touch a creature. The creature’s jump distance is tripled until the spell ends.",
    "classes": [
      "druid",
      "ranger",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Longstrider",
    "level": 1,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "1 hour",
    "components": "V, S, M (a pinch of dirt)",
    "description": "You touch a creature. The target’s speed increases by 10 feet until the spell ends.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st.",
    "classes": [
      "bard",
      "druid",
      "ranger",
      "wizard"
    ]
  },
  {
    "name": "Mage Armor",
    "level": 1,
    "school": "Abjuration",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "8 hours",
    "components": "V, S, M (a piece of cured leather)",
    "description": "You touch a willing creature who isn’t wearing armor, and a protective magical force surrounds it until the spell ends. The target’s base AC becomes 13 + its Dexterity modifier. The spell ends if the target dons armor or if you dismiss the spell as an action.",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Magic Missile",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "120 Feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range. A dart deals 1d4 + 1 force damage to its target. The darts all strike simultaneously and you can direct them to hit one creature or several.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the spell creates one more dart for each slot level above 1st.",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Magnify Gravity",
    "level": 1,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "1 round",
    "components": "V, S",
    "description": "The gravity in a 10-foot-radius sphere centered on a point you can see within range increases for a moment. Each creature in the sphere on the turn when you cast the spell must make a Constitution saving throw. On a failed save, a creature takes 2d8 force damage, and its speed is halved until the end of its next turn. On a successful save, a creature takes half as much damage and suffers no reduction to its speed.\n\nUntil the start of your next turn, any object that isn't being worn or carried in the sphere requires a successful Strength check against your spell save DC to pick up or move.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st.",
    "classes": [
      "wizard"
    ]
  },
  {
    "name": "Protection from Evil and Good",
    "level": 1,
    "school": "Abjuration",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S, M (holy water or powdered silver and iron, which the spell consumes)",
    "description": "Until the spell ends, one willing creature you touch is protected against certain types of creatures: aberrations, celestials, elementals, fey, fiends, and undead.\n\nThe protection grants several benefits. Creatures of those types have disadvantage on attack rolls against the target. The target also can’t be charmed, frightened, or possessed by them. If the target is already charmed, frightened, or possessed by such a creature, the target has advantage on any new saving throw against the relevant effect.",
    "classes": [
      "cleric",
      "druid",
      "paladin",
      "warlock",
      "wizard"
    ]
  },
  // {
  //   "name": "Puppet (UA)",
  //   "level": 1,
  //   "school": "Enchantment",
  //   "castTime": "1 Action",
  //   "range": "120 Feet",
  //   "duration": "Instantaneous",
  //   "components": "V",
  //   "description": "Your gesture forces one humanoid you can see within range to make a Constitution saving throw. On a failed save, the target must move up to its speed in a direction you choose. In addition, you can cause the target to drop whatever it is holding. This spell has no effect on a humanoid that is immune to being charmed.",
  //   "classes": [
  //     "bard",
  //     "warlock",
  //     "wizard"
  //   ]
  // },
  {
    "name": "Purify Food and Drink",
    "level": 1,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "10 feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "All nonmagical food and drink within a 5-foot-radius sphere centered on a point of your choice within range is purified and rendered free of poison and disease.",
    "classes": [
      "cleric",
      "druid",
      "paladin"
    ]
  },
  {
    "name": "Ray of Sickness",
    "level": 1,
    "school": "Necromancy",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "A ray of sickening greenish energy lashes out toward a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 2d8 poison damage and must make a Constitution saving throw. On a failed save, it is also poisoned until the end of your next turn.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st.",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  // {
  //   "name": "Remote Access (UA)",
  //   "level": 1,
  //   "school": "Transmutation",
  //   "castTime": "1 Action",
  //   "range": "120 Feet",
  //   "duration": "10 minutes",
  //   "components": "V, S",
  //   "description": "You can use any electronic device within range as if it were in your hands. This is not a telekinesis effect. Rather, this spell allows you to simulate a device's mechanical functions electronically. You are able to access only functions that a person using the device manually would be able to access. You can use remote access with only one device at a time.",
  //   "classes": [
  //     "sorcerer",
  //     "warlock",
  //     "wizard"
  //   ]
  // },
  {
    "name": "Sanctuary",
    "level": 1,
    "school": "Abjuration",
    "castTime": "1 Bonus Action",
    "range": "30 Feet",
    "duration": "1 minute",
    "components": "V, S, M (a small silver mirror)",
    "description": "You ward a creature within range against attack. Until the spell ends, any creature who targets the warded creature with an attack or a harmful spell must first make a Wisdom saving throw. On a failed save, the creature must choose a new target or lose the attack or spell. This spell doesn’t protect the warded creature from area effects, such as the explosion of a fireball.\n\nIf the warded creature makes an attack or casts a spell that affects an enemy creature, this spell ends.",
    "classes": [
      "cleric"
    ]
  },
  {
    "name": "Searing Smite",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V",
    "description": "The next time you hit a creature with a melee weapon attack during the spell’s duration, your weapon flares with white-hot intensity, and the attack deals an extra 1d6 fire damage to the target and causes the target to ignite in flames.\n\nAt the start of each of its turns until the spell ends, the target must make a Constitution saving throw. On a failed save, it takes 1d6 fire damage. On a successful save, the spells ends. If the target or a creature within 5 feet of it uses an action to put out the flames, or if some other effect douses the flames (such as the target being submerged in water), the spell ends.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the initial extra damage dealt by the attack increases by 1d6 for each slot.",
    "classes": [
      "paladin",
      "ranger"
    ]
  },
  // {
  //   "name": "Sense Emotion (UA)",
  //   "level": 1,
  //   "school": "Divination",
  //   "castTime": "1 Action",
  //   "range": "Self",
  //   "duration": "Concentration, up to 1 minute",
  //   "components": "V, S",
  //   "description": "You attune your senses to pick up the emotions of others for the duration. When you cast the spell, and as your action on each turn until the spell ends, you can focus your senses on one humanoid you can see within 30 feet of you. You instantly learn the target’s prevailing emotion, whether it’s love, anger, pain, fear, calm, or something else. If the target isn’t actually humanoid or it is immune to being charmed, you sense that it is calm.",
  //   "classes": [
  //     "bard",
  //     "warlock",
  //     "wizard"
  //   ]
  // },
  {
    "name": "Shield",
    "level": 1,
    "school": "Abjuration",
    "castTime": "1 Reaction",
    "range": "Self",
    "duration": "1 round",
    "components": "V, S",
    "description": "An invisible barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from Magic Missile.",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Shield of Faith",
    "level": 1,
    "school": "Abjuration",
    "castTime": "1 Bonus Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M (a small parchment with a bit of holy text written on it)",
    "description": "A shimmering field appears and surrounds a creature of your choice within range, granting it a +2 bonus to AC for the duration.",
    "classes": [
      "cleric",
      "paladin"
    ]
  },
  {
    "name": "Silent Image",
    "level": 1,
    "school": "Illusion",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S, M (a bit of fleece)",
    "description": "You create the image of an object, a creature, or some other visible phenomenon that is no larger than a 15-foot cube. The image appears at a spot within range and lasts for the duration. The image is purely visual; it isn’t accompanied by sound, smell, or other sensory effects.\n\nYou can use your action to cause the image to move to any spot within range. As the image changes location, you can alter its appearance so that its movements appear natural for the image. For example, if you create an image of a creature and move it, you can alter the image so that it appears to be walking.\n\nPhysical interaction with the image reveals it to be an illusion, because things can pass through it. A creature that uses its action to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, the creature can see through the image.",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Sleep",
    "level": 1,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "90 feet",
    "duration": "1 minute",
    "components": "V, S, M (a pinch of fine sand, rose petals, or a cricket)",
    "description": "This spell sends creatures into a magical slumber. Roll 5d8, the total is how many hit points of creatures this spell can affect. Creatures within 20 feet of a point you choose within range are affected in ascending order of their current hit points (ignoring unconscious creatures).\n\nStarting with the creature that has the lowest current hit points, each creature affected by this spell falls unconscious until the spell ends, the sleeper takes damage, or someone uses an action to shake or slap the sleeper awake. Subtract each creature’s hit points from the total before moving on to the creature with the next lowest hit points. A creature’s hit points must be equal to or less than the remaining total for that creature to be affected. Undead and creatures immune to being charmed aren’t affected by this spell.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, roll an additional 2d8 for each slot level above 1st.",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Snare",
    "level": 1,
    "school": "Abjuration",
    "castTime": "1 Minute",
    "range": "Touch",
    "duration": "Until dispelled or triggered",
    "components": "V, S, M (30 feet of cord or rope, which is consumed by the spell)",
    "description": "While you cast this spell, you use the cord or rope to create a circle with a 5-foot radius on a flat surface within your reach. When you finish casting, the cord or rope disappears to become a magical trap.\n\nThe trap is nearly invisible and requires a successful Intelligence (Investigation) check against your spell save DC to be found.\n\nThe trap triggers when a Small creature or larger moves into the area protected by the spell. The triggering creature must succeed on a Dexterity saving throw or fall prone and be hoisted into the air until it hangs upside down 3 feet above the protected surface, where it is restrained.\n\nThe restrained creature can make a Dexterity saving throw with disadvantage at the end of each of its turns and ends the restrained effect on a success. Alternatively, another creature that can reach the restrained creature can use an action to make an Intelligence (Arcana) check against your spell save DC. On a success, the restrained effect also ends.",
    "classes": [
      "druid",
      "ranger",
      "wizard"
    ]
  },
  {
    "name": "Speak with Animals",
    "level": 1,
    "school": "Divination",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "10 minutes",
    "components": "V, S",
    "description": "You gain the ability to comprehend and verbally communicate with beasts for the duration. The knowledge and awareness of many beasts is limited by their intelligence, but at minimum, beasts can give you information about nearby locations and monsters, including whatever they can perceive or have perceived within the past day. You might be able to persuade a beast to perform a small favor for you, at the DM’s discretion.",
    "classes": [
      "bard",
      "druid",
      "ranger"
    ]
  },
  // {
  //   "name": "Sudden Awakening (UA)",
  //   "level": 1,
  //   "school": "Enchantment",
  //   "castTime": "1 Bonus Action",
  //   "range": "10 feet",
  //   "duration": "Instantaneous",
  //   "components": "V",
  //   "description": "Each sleeping creature you choose within range awakens, and then each prone creature within range can stand up without expending any movement.",
  //   "classes": [
  //     "bard",
  //     "ranger",
  //     "sorcerer",
  //     "wizard"
  //   ]
  // },
  {
    "name": "Tasha's Caustic Brew",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "Self (30-foot line)",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M (a bit of rotten food)",
    "description": "A stream of acid emanates from you in a line 30 feet long and 5 feet wide in a direction you choose. Each creature in the line must succeed on a Dexterity saving throw or be covered in acid for the spell’s duration or until a creature uses its action to scrape or wash the acid off itself or another creature. A creature covered in the acid takes 2d4 acid damage at start of each of its turns.\n\nAt Higher Levels. When you cast this spell using a spell slot 2nd level or higher, the damage increases by 2d4 for each slot level above 1st.",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Tasha's Hideous Laughter",
    "level": 1,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M (tiny tarts and a feather that is waved in the air)",
    "description": "A creature of your choice that you can see within range perceives everything as hilariously funny and falls into fits of laughter if this spell affects it. The target must succeed on a Wisdom saving throw or fall prone, becoming incapacitated and unable to stand up for the duration. A creature with an Intelligence score of 4 or less isn’t affected.\n\nAt the end of each of its turns, and each time it takes damage, the target can make another Wisdom saving throw. The target has advantage on the saving throw if it’s triggered by damage. On a success, the spell ends.",
    "classes": [
      "bard",
      "wizard"
    ]
  },
  {
    "name": "Tenser's Floating Disk",
    "level": 1,
    "school": "Conjuration",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "1 hour",
    "components": "V, S, M (a drop of mercury)",
    "description": "This spell creates a circular, horizontal plane of force, 3 feet in diameter and 1 inch thick, that floats 3 feet above the ground in an unoccupied space of your choice that you can see within range. The disk remains for the duration, and can hold up to 500 pounds. If more weight is placed on it, the spell ends, and everything on the disk falls to the ground.\n\nThe disk is immobile while you are within 20 feet of it. If you move more than 20 feet away from it, the disk follows you so that it remains within 20 feet of you. It can move across uneven terrain, up or down stairs, slopes, and the like, but it can’t cross an elevation change of 10 feet or more. For example, the disk can’t move across a 10-foot-deep pit, nor could it leave such a pit if it were created at the bottom.\n\nIf you move more than 100 feet from the disk (typically because it can’t move around an obstacle to follow you), the spell ends.",
    "classes": [
      "wizard"
    ]
  },
  {
    "name": "Thunderous Smite",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V",
    "description": "The first time you hit with a melee weapon attack during this spell’s duration, your weapon rings with thunder that is audible within 300 feet of you, and the attack deals an extra 2d6 thunder damage to the target. Additionally, if the target is a creature, it must succeed on a Strength saving throw or be pushed 10 feet away from you and knocked prone.",
    "classes": [
      "paladin"
    ]
  },
  {
    "name": "Thunderwave",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "Self (15-foot cube)",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "A wave of thunderous force sweeps out from you. Each creature in a 15-foot cube originating from you must make a Constitution saving throw. On a failed save, a creature takes 2d8 thunder damage and is pushed 10 feet away from you. On a successful save, the creature takes half as much damage and isn’t pushed.\n\nIn addition, unsecured objects that are completely within the area of effect are automatically pushed 10 feet away from you by the spell’s effect, and the spell emits a thunderous boom audible out to 300 feet.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st.",
    "classes": [
      "bard",
      "druid",
      "sorcerer",
      "wizard"
    ]
  },
  // {
  //   "name": "Unearthly Chorus (UA)",
  //   "level": 1,
  //   "school": "Illusion",
  //   "castTime": "1 Action",
  //   "range": "Self (30-foot radius)",
  //   "duration": "Concentration, up to 10 minutes",
  //   "components": "V",
  //   "description": "Music of a style you choose fills the air around you in a 30-foot radius. The music spreads around corners and can be heard from up to 100 feet away. The music moves with you, centered on you for the duration.\n\nUntil the spell ends, you make Charisma (Performance) checks with advantage. In addition, you can use a bonus action on each of your turns to beguile one creature you choose within 30 feet of you that can see you and hear the music. The creature must make a Charisma saving throw. If you or your companions are attacking it, the creature automatically succeeds on the saving throw. On a failure, the creature becomes friendly to you for as long as it can hear the music and for 1 hour thereafter. You make Charisma (Deception) checks and Charisma (Persuasion) checks against creatures made friendly by this spell with advantage.",
  //   "classes": [
  //     "bard"
  //   ]
  // },
  {
    "name": "Unseen Servant",
    "level": 1,
    "school": "Conjuration",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "1 hour",
    "components": "V, S, M (a piece of string and a bit of wood)",
    "description": "This spell creates an invisible, mindless, shapeless, Medium force that performs simple tasks at your command until the spell ends. The servant springs into existence in an unoccupied space on the ground within range. It has AC 10, 1 hit point, and a Strength of 2, and it can’t attack. If it drops to 0 hit points, the spell ends.\n\nOnce on each of your turns as a bonus action, you can mentally command the servant to move up to 15 feet and interact with an object. The servant can perform simple tasks that a human servant could do, such as fetching things, cleaning, mending, folding clothes, lighting fires, serving food, and pouring wine. Once you give the command, the servant performs the task to the best of its ability until it completes the task, then waits for your next command.\n\nIf you command the servant to perform a task that would move it more than 60 feet away from you, the spell ends.",
    "classes": [
      "bard",
      "warlock",
      "wizard"
    ]
  },
  // {
  //   "name": "Wild Cunning (UA)",
  //   "level": 1,
  //   "school": "Transmutation",
  //   "castTime": "1 Action",
  //   "range": "120 Feet",
  //   "duration": "Instantaneous",
  //   "components": "V, S",
  //   "description": "You call out to the spirits of nature to aid you. When you cast this spell, choose one of the following effects:\n\nIf there are any tracks on the ground within range, you know where they are, and you make Wisdom (Survival) checks to follow these tracks with advantage for 1 hour or until you cast this spell again.\nIf there is edible forage within range, you know it and where to find it.\nIf there is clean drinking water within range, you know it and where to find it.\nIf there is suitable shelter for you and your companions within range, you know it and where to find it.\nSend the spirits to bring back wood for a fire and to set up a campsite in the area using your supplies. The spirits build the fire in a circle of stones, put up tents, unroll bedrolls, and put out any rations and water for consumption.\nHave the spirits instantly break down a campsite, which includes putting out a fire, taking down tents, packing up bags, and burying any rubbish.",
  //   "classes": [
  //     "druid",
  //     "ranger"
  //   ]
  // },
  {
    "name": "Witch Bolt",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M (a twig from a tree that has been struck by lightning)",
    "description": "A beam of crackling, blue energy lances out toward a creature within range, forming a sustained arc of lightning between you and the target. Make a ranged spell attack against that creature. On a hit, the target takes 1d12 lightning damage, and on each of your turns for the duration, you can use your action to deal 1d12 lightning damage to the target automatically. The spell ends if you use your action to do anything else. The spell also ends if the target is ever outside the spell’s range or if it has total cover from you.\n\nAt Higher Levels. When you cast this spell using a spell slot of 2nd level or higher, the initial damage increases by 1d12 for each slot level above 1st.",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Wrathful Smite",
    "level": 1,
    "school": "Evocation",
    "castTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V",
    "description": "The next time you hit with a melee weapon attack during this spell’s duration, your attack deals an extra 1d6 psychic damage. Additionally, if the target is a creature, it must make a Wisdom saving throw or be frightened of you until the spell ends. As an action, the creature can make a Wisdom check against your spell save DC to steel its resolve and end this spell.",
    "classes": [
      "paladin"
    ]
  },
  {
    "name": "Zephyr Strike",
    "level": 1,
    "school": "Transmutation",
    "castTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V",
    "description": "You move like the wind. For the duration, your movement doesn’t provoke opportunity attacks.\n\nOnce before the spell ends, you can give yourself advantage on one weapon attack roll on your turn. That attack deals an extra 1d8 force damage on a hit. Whether you hit or miss, your walking speed increases by 30 feet until the end of that turn.",
    "classes": [
      "ranger"
    ]
  },
  {
    "name": "Aganazzar's Scorcher",
    "level": 2,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "Instantaneous",
    "components": "V, S, M (a red dragon’s scale)",
    "description": "A line of roaring flame 30 feet long and 5 feet wide emanates from you in a direction you choose. Each creature in the line must make a Dexterity saving throw. A creature takes 3d8 fire damage on a failed save, or half as much damage on a successful one.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d8 for each slot level above 2nd.",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Aid",
    "level": 2,
    "school": "Abjuration",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "8 hours",
    "components": "V, S, M (a tiny strip of white cloth)",
    "description": "Your spell bolsters your allies with toughness and resolve. Choose up to three creatures within range. Each target’s hit point maximum and current hit points increase by 5 for the duration.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, a target’s hit points increase by an additional 5 for each slot level above 2nd.",
    "classes": [
      "bard",
      "cleric",
      // "paladin",
      // "ranger"
    ]
  },
  {
    "name": "Alter Self",
    "level": 2,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S",
    "description": "You assume a different form. When you cast the spell, choose one of the following options, the effects of which last for the duration of the spell. While the spell lasts, you can end one option as an action to gain the benefits of a different one.\n\nAquatic Adaptation. You adapt your body to an aquatic environment, sprouting gills, and growing webbing between your fingers. You can breathe underwater and gain a swimming speed equal to your walking speed.\n\nChange Appearance. You transform your appearance. You decide what you look like, including your height, weight, facial features, sound of your voice, hair length, coloration, and distinguishing characteristics, if any. You can make yourself appear as a member of another race, though none of your statistics change. You also don’t appear as a creature of a different size than you, and your basic shape stays the same; if you're bipedal, you can’t use this spell to become quadrupedal, for instance. At any time for the duration of the spell, you can use your action to change your appearance in this way again.\n\nNatural Weapons. You grow claws, fangs, spines, horns, or a different natural weapon of your choice. Your unarmed strikes deal 1d6 bludgeoning, piercing, or slashing damage, as appropriate to the natural weapon you chose, and you are proficient with your unarmed strikes. Finally, the natural weapon is magic and you have a +1 bonus to the attack and damage rolls you make using it.",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Animal Messenger",
    "level": 2,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "24 hours",
    "components": "V, S, M (a morsel of food)",
    "description": "By means of this spell, you use an animal to deliver a message. Choose a Tiny beast you can see within range, such as a squirrel, a blue jay, or a bat. You specify a location, which you must have visited, and a recipient who matches a general description, such as “a man or woman dressed in the uniform of the town guard” or “a red-haired dwarf wearing a pointed hat.” You also speak a message of up to twenty-five words. The target beast travels for the duration of the spell toward the specified location, covering about 50 miles per 24 hours for a flying messenger, or 25 miles for other animals.\n\nWhen the messenger arrives, it delivers your message to the creature that you described, replicating the sound of your voice. The messenger speaks only to a creature matching the description you gave. If the messenger doesn’t reach its destination before the spell ends, the message is lost, and the beast makes its way back to where you cast this spell.\n\nAt Higher Levels. If you cast this spell using a spell slot of 3rd level or higher, the duration of the spell increases by 48 hours for each slot level above 2nd.",
    "classes": [
      "bard",
      "druid",
      // "ranger"
    ]
  },
  // {
  //   "name": "Arcane Hacking (UA)",
  //   "level": 2,
  //   "school": "Transmutation",
  //   "castTime": "1 Action",
  //   "range": "Self",
  //   "duration": "Concentration, up to 1 hour",
  //   "components": "V, S, M (hacking tools)",
  //   "description": "You gain advantage on all Intelligence checks using hacking tools to break software encryption or online security when using a foreign system.\n\nThis spell also allows you to break 2nd level and lower protective spells such as Arcane Lock or Glyph of Warding by making an Intelligence check using hacking tools against the spell save DC of the spell’s caster.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, you can attempt to counteract a spell set to secure the foreign system if the spell’s level is equal to or less than the level of the spell slot you used.",
  //   "classes": [
  //     "sorcerer",
  //     "warlock",
  //     "wizard"
  //   ]
  // },
  {
    "name": "Arcane Lock",
    "level": 2,
    "school": "Abjuration",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Until dispelled",
    "components": "V, S, M (gold dust worth at least 25 gp, which the spell consumes)",
    "description": "You touch a closed door, window, gate, chest, or other entryway, and it becomes locked for the duration.\n\nYou and the creatures you designate when you cast this spell can open the object normally. You can also set a password that, when spoken within 5 feet of the object, suppresses this spell for 1 minute. Otherwise, it is impassable until it is broken or the spell is dispelled or suppressed. Casting knock on the object suppresses arcane lock for 10 minutes.\n\nWhile affected by this spell, the object is more difficult to break or force open; the DC to break it or pick any locks on it increases by 10.",
    "classes": [
      "wizard"
    ]
  },
  {
    "name": "Augury",
    "level": 2,
    "school": "Divination",
    "castTime": "1 Minute",
    "range": "Self",
    "duration": "Instantaneous",
    "components": "V, S, M (specially marked sticks, bones, or similar tokens worth at least 25 gp)",
    "description": "By casting gem-inlaid sticks, rolling dragon bones, laying out ornate cards, or employing some other divining tool, you receive an omen from an otherworldly entity about the results of a specific course of action that you plan to take within the next 30 minutes. The DM chooses from the following possible omens:\n\nWeal, for good results\nWoe, for bad results\nWeal and woe, for both good and bad results\nNothing, for results that aren’t especially good or bad\nThe spell doesn’t take into account any possible circumstances that might change the outcome, such as the casting of additional spells or the loss or gain of a companion. If you cast the spell two or more times before completing your next long rest, there is a cumulative 25 percent chance for each casting after the first that you get a random reading. The DM makes this roll in secret.",
    "classes": [
      "cleric",
      "druid",
      "wizard"
    ]
  },
  {
    "name": "Barkskin",
    "level": 2,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M (a handful of oak bark)",
    "description": "You touch a willing creature. Until the spell ends, the target’s skin has a rough, bark-like appearance, and the target’s AC can’t be less than 16, regardless of what kind of armor it is wearing.",
    "classes": [
      "druid",
      // "ranger"
    ]
  },
  {
    "name": "Beast Sense",
    "level": 2,
    "school": "Divination",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Concentration, up to 1 hour",
    "components": "S",
    "description": "You touch a willing beast. For the duration of the spell, you can use your action to see through the beast’s eyes and hear what it hears, and continue to do so until you use your action to return to your normal senses.",
    "classes": [
      "druid",
      // "ranger"
    ]
  },
  {
    "name": "Blindness/Deafness",
    "level": 2,
    "school": "Necromancy",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "1 minute",
    "components": "V",
    "description": "You can blind or deafen a foe. Choose one creature that you can see within range to make a Constitution saving throw. If it fails, the target is either blinded or deafened (your choice) for the duration. At the end of each of its turns, the target can make a Constitution saving throw. On a success, the spell ends.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd.",
    "classes": [
      "bard",
      "cleric",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Blur",
    "level": 2,
    "school": "Illusion",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V",
    "description": "Your body becomes blurred, shifting and wavering to all who can see you. For the duration, any creature has disadvantage on attack rolls against you. An attacker is immune to this effect if it doesn't rely on sight, as with blindsight, or can see through illusions, as with truesight.",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Branding Smite",
    "level": 2,
    "school": "Evocation",
    "castTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V",
    "description": "The next time you hit a creature with a weapon attack before this spell ends, the weapon gleams with astral radiance as you strike. The attack deals an extra 2d6 radiant damage to the target, which becomes visible if it is invisible, and the target sheds dim light in a 5-foot radius and can’t become invisible until the spell ends.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the extra damage increases by 1d6 for each slot level above 2nd.",
    "classes": [
      // "paladin"
    ]
  },
  {
    "name": "Calm Emotions",
    "level": 2,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "description": "You attempt to suppress strong emotions in a group of people. Each humanoid in a 20-foot-radius sphere centered on a point you choose within range must make a Charisma saving throw; a creature can choose to fail this saving throw if it wishes. If a creature fails its saving throw, choose one of the following two effects. You can suppress any effect causing a target to be charmed or frightened. When this spell ends, any suppressed effect resumes, provided that its duration has not expired in the meantime.\n\nAlternatively, you can make a target indifferent about creatures of your choice that it is hostile toward. This indifference ends if the target is attacked or harmed by a spell or if it witnesses any of its friends being harmed. When the spell ends, the creature becomes hostile again, unless the DM rules otherwise.",
    "classes": [
      "bard",
      "cleric"
    ]
  },
  {
    "name": "Cloud of Daggers",
    "level": 2,
    "school": "Conjuration",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M (a sliver of glass)",
    "description": "You fill the air with spinning daggers in a cube 5 feet on each side, centered on a point you choose within range. A creature takes 4d4 slashing damage when it enters the spell’s area for the first time on a turn or starts its turn there.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 2d4 for each slot level above 2nd.",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Continual Flame",
    "level": 2,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Until dispelled",
    "components": "V, S, M (ruby dust worth 50 gp, which the spell consumes)",
    "description": "A flame, equivalent in brightness to a torch, springs forth from an object that you touch. The effect looks like a regular flame, but it creates no heat and doesn’t use oxygen. A continual flame can be covered or hidden but not smothered or quenched.",
    "classes": [
      "cleric",
      "druid",
      "wizard"
    ]
  },
  {
    "name": "Cordon of Arrows",
    "level": 2,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "5 feet",
    "duration": "8 hours",
    "components": "V, S, M (four or more arrows or bolts)",
    "description": "You plant four pieces of nonmagical ammunition – arrows or crossbow bolts – in the ground within range and lay magic upon them to protect an area. Until the spell ends, whenever a creature other than you comes within 30 feet of the ammunition for the first time on a turn or ends its turn there, one piece of ammunition flies up to strike it. The creature must succeed on a Dexterity saving throw or take 1d6 piercing damage. The piece of ammunition is then destroyed. The spell ends when no ammunition remains.\n\nWhen you cast this spell, you can designate any creatures you choose, and the spell ignores them.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the amount of ammunition that can be affected increases by two for each slot level above 2nd.",
    "classes": [
      // "ranger"
    ]
  },
  {
    "name": "Crown of Madness",
    "level": 2,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "120 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "description": "One humanoid of your choice that you can see within range must succeed on a Wisdom saving throw or become charmed by you for the duration. While the target is charmed in this way, a twisted crown of jagged iron appears on its head, and a madness glows in its eyes.\n\nThe charmed target must use its action before moving on each of its turns to make a melee attack against a creature other than itself that you mentally choose. The target can act normally on its turn if you choose no creature or if none are within its reach.\n\nOn your subsequent turns, you must use your action to maintain control over the target, or the spell ends. Also, the target can make a Wisdom saving throw at the end of each of its turns. On a success, the spell ends.",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Darkness",
    "level": 2,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, M (bat fur and a drop of pitch or piece of coal)",
    "description": "Magical darkness spreads from a point you choose within range to fill a 15-foot radius sphere for the duration. The darkness spreads around corners. A creature with darkvision can’t see through this darkness, and nonmagical light can’t illuminate it.\n\nIf the point you choose is on an object you are holding or one that isn’t being worn or carried, the darkness emanates from the object and moves with it. Completely covering the source of the darkness with an opaque object, such as a bowl or a helm, blocks the darkness.\n\nIf any of this spell’s area overlaps with an area of light created by a spell of 2nd level or lower, the spell that created the light is dispelled.",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Darkvision",
    "level": 2,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "8 hours",
    "components": "V, S, M (either a pinch of dried carrot or an agate)",
    "description": "You touch a willing creature to grant it the ability to see in the dark. For the duration, that creature has darkvision out to a range of 60 feet.",
    "classes": [
      "druid",
      // "ranger",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Detect Thoughts",
    "level": 2,
    "school": "Divination",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M (a copper piece)",
    "description": "For the duration, you can read the thoughts of certain creatures. When you cast the spell and as your action on each turn until the spell ends, you can focus your mind on any one creature that you can see within 30 feet of you. If the creature you choose has an Intelligence of 3 or lower or doesn’t speak any language, the creature is unaffected.\n\nYou initially learn the surface thoughts of the creature—what is most on its mind in that moment. As an action, you can either shift your attention to another creature’s thoughts or attempt to probe deeper into the same creature’s mind. If you probe deeper, the target must make a Wisdom saving throw. If it fails, you gain insight into its reasoning (if any), its emotional state, and something that loom s large in its mind (such as something it worries over, loves, or hates). If it succeeds, the spell ends. Either way, the target knows that you are probing into its mind, and unless you shift your attention to another creature’s thoughts, the creature can use its action on its turn to make an Intelligence check contested by your Intelligence check; if it succeeds, the spell ends.\n\nQuestions verbally directed at the target creature naturally shape the course of its thoughts, so this spell is particularly effective as part of an interrogation.\n\nYou can also use this spell to detect the presence of thinking creatures you can’t see. When you cast the spell or as your action during the duration, you can search for thoughts within 30 feet of you. The spell can penetrate barriers, but 2 feet of rock, 2 inches of any metal other than lead, or a thin sheet of lead blocks you. You can’t detect a creature with an Intelligence of 3 or lower or one that doesn’t speak any language.\n\nOnce you detect the presence of a creature in this way, you can read its thoughts for the rest of the duration as described above, even if you can’t see it, but it must still be within range.",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ]
  },
  // {
  //   "name": "Digital Phantom (UA)",
  //   "level": 2,
  //   "school": "Abjuration",
  //   "castTime": "1 Action",
  //   "range": "Self",
  //   "duration": "Concentration, up to 1 hour",
  //   "components": "V, S, M (a small piece of copper wire)",
  //   "description": "This spell works to actively hide your presence within a computer system. For the spell’s duration, you and any other users you choose on your local network gain a +10 bonus to Intelligence checks to avoid detection by administrators, knowbots, tracking software, and the like. Whenever you and your chosen users leave any computer system you are working in while this spell is in effect, all trace of your previous presence in that system is erased.",
  //   "classes": [
  //     "sorcerer",
  //     "warlock",
  //     "wizard"
  //   ]
  // },
  {
    "name": "Dragon's Breath",
    "level": 2,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M (a hot pepper)",
    "description": "You touch one willing creature and imbue it with the power to spew magical energy from its mouth, provided it has one. Choose acid, cold, fire, lightning, or poison. Until the spell ends, the creature can use an action to exhale energy of the chosen type in a 15-foot cone. Each creature in that area must make a Dexterity saving throw, taking 3d6 damage of the chosen type on a failed save, or half as much damage on a successful one.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d6 for each slot level above 2nd.",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Dust Devil",
    "level": 2,
    "school": "Conjuration",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M (a pinch of dust)",
    "description": "Choose an unoccupied 5-foot cube of air that you can see within range. An elemental force that resembles a dust devil appears in the cube and lasts for the spell’s duration.\n\nAny creature that ends its turn within 5 feet of the dust devil must make a Strength saving throw. On a failed save, the creature takes 1d8 bludgeoning damage and is pushed 10 feet away. On a successful save, the creature takes half as much damage and isn’t pushed.\n\nAs a bonus action, you can move the dust devil up to 30 feet in any direction. If the dust devil moves over sand, dust, loose dirt, or small gravel, it sucks up the material and forms a 10-foot-radius cloud of debris around itself that lasts until the start of your next turn. The cloud heavily obscures its area.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d8 for each slot level above 2nd.",
    "classes": [
      "druid",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Earthbind",
    "level": 2,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "300 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V",
    "description": "Choose one creature you can see within range. Yellow strips of magical energy loop around the creature. The target must succeed on a Strength saving throw or its flying speed (if any) is reduced to 0 feet for the spell’s duration. An airborne creature affected by this spell descends at 60 feet per round until it reaches the ground or the spell ends.",
    "classes": [
      "druid",
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Enhance Ability",
    "level": 2,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M (fur or a feather from a beast)",
    "description": "You touch a creature and bestow upon it a magical enhancement. Choose one of the following effects; the target gains the effect until the spell ends.\n\nBear’s Endurance. The target has advantage on Constitution checks. It also gains 2d6 temporary hit points, which are lost when the spell ends.\nBull’s Strength. The target has advantage on Strength checks, and their carrying capacity doubles.\nCat’s Grace. The target has advantage on Dexterity checks. It also doesn’t take damage from falling 20 feet or less if it isn’t incapacitated.\nEagle’s Splendor. The target has advantage on Charisma checks.\nFox’s Cunning. The target has advantage on Intelligence checks.\nOwl’s Wisdom. The target has advantage on Wisdom checks.\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd.",
    "classes": [
      "bard",
      "cleric",
      "druid",
      // "ranger",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Enlarge/Reduce",
    "level": 2,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M ((a pinch of powdered iron)",
    "description": "You cause a creature or an object you can see within range to grow larger or smaller for the duration. Choose either a creature or an object that is neither worn nor carried. If the target is unwilling, it can make a Constitution saving throw. On a success, the spell has no effect.\n\nIf the target is a creature, everything it is wearing and carrying changes size with it. Any item dropped by an affected creature returns to normal size at once.\n\nEnlarge. The target’s size doubles in all dimensions, and its weight is multiplied by eight. This growth increases its size by one category – from Medium to Large, for example. If there isn’t enough room for the target to double its size, the creature or object attains the maximum possible size in the space available. Until the spell ends, the target also has advantage on Strength checks and Strength saving throws. The target’s weapons also grow to match its new size. While these weapons are enlarged, the target’s attack with them deal 1d4 extra damage.\n\nReduce. The target’s size is halved in all dimensions, and its weight is reduced to one-eighth of normal. This reduction decreases its size by one category – from Medium to Small, for example. Until the spell ends, the target also has disadvantage on Strength checks and Strength saving throws. The target’s weapons also shrink to match its new size. While these weapons are reduced, the target’s attacks with them deal 1d4 less damage (this can’t reduce the damage below 1).",
    "classes": [
      "bard",
      "druid",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Enthrall",
    "level": 2,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "1 minute",
    "components": "V, S",
    "description": "You weave a distracting string of words, causing creatures of your choice that you can see within range and that can hear you to make a Wisdom saving throw. Any creature that can’t be charmed succeeds on this saving throw automatically, and if you or your companions are fighting a creature, it has advantage on the save. On a failed save, the target has disadvantage on Wisdom (Perception) checks made to perceive any creature other than you until the spell ends or until the target can no longer hear you. The spell ends if you are incapacitated or can no longer speak.",
    "classes": [
      "bard",
      "warlock"
    ]
  },
  {
    "name": "Find Steed",
    "level": 2,
    "school": "Conjuration",
    "castTime": "10 Minutes",
    "range": "30 Feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "You summon a spirit that assumes the form of an unusually intelligent, strong, and loyal steed, creating a long-lasting bond with it. Appearing in an unoccupied space within range, the steed takes on a form that you choose: a warhorse, a pony, a camel, an elk, or a mastiff. (Your DM might allow other animals to be summoned as steeds.) The steed has the statistics of the chosen form, though it is a celestial, fey, or fiend (your choice) instead of its normal type. Additionally, if your steed has an Intelligence of 5 or less, its Intelligence becomes 6, and it gains the ability to understand one language of your choice that you speak.\n\nYour steed serves you as a mount, both in combat and out, and you have an instinctive bond with it that allows you to fight as a seamless unit. While mounted on your steed, you can make any spell you cast that targets only you also target your steed.\n\nWhen the steed drops to 0 hit points, it disappears, leaving behind no physical form. You can also dismiss your steed at any time as an action, causing it to disappear. In either case, casting this spell again summons the same steed, restored to its hit point maximum.\n\nWhile your steed is within 1 mile of you, you can communicate with it telepathically. You can’t have more than one steed bonded by this spell at a time. As an action, you can release the steed from its bond at any time, causing it to disappear.",
    "classes": [
      // "paladin"
    ]
  },
  {
    "name": "Find Traps",
    "level": 2,
    "school": "Divination",
    "castTime": "1 Action",
    "range": "120 Feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "You sense the presence of any trap within range that is within line of sight.\nA trap, for the purpose of this spell, includes anything that would inflict a sudden or unexpected effect you consider harmful or undesirable, which was specifically intended as such by its creator. Thus, the spell would sense an area affected by the alarm spell, a glyph of warding, or a mechanical pit trap, but it would not reveal a natural weakness in the floor, an unstable ceiling, or a hidden sinkhole.\n\nThis spell merely reveals that a trap is present. You don’t learn the location of each trap, but you do learn the general nature of the danger posed by a trap you sense.",
    "classes": [
      "cleric",
      "druid",
      // "ranger"
    ]
  },
  // {
  //   "name": "Find Vehicle (UA)",
  //   "level": 2,
  //   "school": "Conjuration",
  //   "castTime": "10 Minutes",
  //   "range": "30 Feet",
  //   "duration": "8 hours",
  //   "components": "V, S",
  //   "description": "You summon a spirit that assumes the form of a nonmilitary land vehicle of your choice, appearing in an unoccupied space within range. The vehicle has the statistics of a normal vehicle of its sort, though it is celestial, fey, or fiendish (your choice in origin). The physical characteristics of the vehicle reflect its origin to some degree. For example, a fiendish SUV might be jet black in color, with tinted windows and a sinister-looking front grille.\n\nYou have a supernatural bond with the conjured vehicle that allows you to drive beyond your normal ability. While driving the conjured vehicle, you are considered proficient with vehicles of its type, and you add double your proficiency bonus to ability checks related to driving the vehicle. While driving the vehicle, you can make any spell you cast that targets only you also target the vehicle.\n\nIf the vehicle drops to 0 hit points, it disappears, leaving behind no physical form. You can also dismiss the vehicle at any time as an action, causing it to disappear.\n\nYou can't have more than one vehicle bonded by this spell at a time. As an action, you can release the vehicle from its bond at any time, causing it to disappear.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, you can conjure a nonmilitary water vehicle large enough to carry six Medium creatures. When you cast this spell using a spell slot of 5th level or higher, you can conjure a nonmilitary air vehicle large enough to carry ten Medium creatures. When you cast this spell using a spell slot of 7th level or higher, you can conjure any type of vehicle, subject to the DM's approval.",
  //   "classes": [
  //     // "paladin",
  //     "sorcerer",
  //     "warlock",
  //     "wizard"
  //   ]
  // },
  {
    "name": "Flame Blade",
    "level": 2,
    "school": "Evocation",
    "castTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S, M (a leaf of sumac)",
    "description": "You evoke a fiery blade in your free hand. The blade is similar in size and shape to a scimitar, and it lasts for the duration. If you let go of the blade, it disappears, but you can evoke the blade again as a bonus action.\n\nYou can use your action to make a melee spell attack with the fiery blade. On a hit, the target takes 3d6 fire damage. The flaming blade sheds bright light in a 10-foot radius and dim light for an additional 10 feet.\n\nAt Higher Levels. When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for every two slot levels above 2nd.",
    "classes": [
      "druid",
      "sorcerer"
    ]
  },
  {
    "name": "Flaming Sphere",
    "level": 2,
    "school": "Conjuration",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M (a bit of tallow, a pinch of brimstone, and a dusting of powdered iron)",
    "description": "A 5-foot-diameter sphere of fire appears in an unoccupied space of your choice within range and lasts for the duration. Any creature that ends its turn within 5 feet of the sphere must make a Dexterity saving throw. The creature takes 2d6 fire damage on a failed save, or half as much damage on a successful one.\n\nAs a bonus action, you can move the sphere up to 30 feet. If you ram the sphere into a creature, that creature must make the saving throw against the sphere’s damage, and the sphere stops moving this turn.\n\nWhen you move the sphere, you can direct it over barriers up to 5 feet tall and jump it across pits up to 10 feet wide. The sphere ignites flammable objects not being worn or carried, and it sheds bright light in a 20-foot radius and dim light for an additional 20 feet.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d6 for each slot level above 2nd.",
    "classes": [
      "druid",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Flock of Familiars",
    "level": 2,
    "school": "Conjuration",
    "castTime": "1 Minute",
    "range": "Touch",
    "duration": "1 hour",
    "components": "V, S",
    "description": "You temporarily summon three familiars – spirits that take animal forms of your choice. Each familiar uses the same rules and options for a familiar conjured by the Find Familiar spell. All the familiars conjured by this spell must be the same type of creature (celestials, fey, or fiends; your choice). If you already have a familiar conjured by the Find Familiar spell or similar means, then one fewer familiars are conjured by this spell.\n\nFamiliars summoned by this spell can telepathically communicate with you and share their visual or auditory senses while they are within 1 mile of you.\n\nWhen you cast a spell with a range of touch, one of the familiars conjured by this spell can deliver the spell, as normal. However, you can cast a touch spell through only one familiar per turn.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, you conjure an additional familiar for each slot level above 2nd.",
    "classes": [
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Fortune's Favor",
    "level": 2,
    "school": "Divination",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "1 hour",
    "components": "V, S, M (a white pearl worth at least 100 gp, which the spell consumes)",
    "description": "You impart latent luck to yourself or one willing creature you can see within range. When the chosen creature makes an attack roll, an ability check, or a saving throw before the spell ends, it can dismiss this spell on itself to roll an additional d20 and choose which of the d20s to use. Alternatively, when an attack roll is made against the chosen creature, it can dismiss this spell on itself to roll a d20 and choose which of the d20s to use, the one it rolled or the one the attacker rolled.\n\nIf the original d20 roll has advantage or disadvantage, the creature rolls the additional d20 after advantage or disadvantage has been applied to the original roll.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd.",
    "classes": [
      "wizard"
    ]
  },
  {
    "name": "Gentle Repose",
    "level": 2,
    "school": "Necromancy",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "10 days",
    "components": "V, S, M (a pinch of salt and one copper piece placed on each of the corpse’s eyes, which must remain there for the duration)",
    "description": "You touch a corpse or other remains. For the duration, the target is protected from decay and can’t become undead.\n\nThe spell also effectively extends the time limit on raising the target from the dead, since days spent under the influence of this spell don’t count against the time limit of spells such as raise dead.",
    "classes": [
      "cleric",
      // "paladin",
      "wizard"
    ]
  },
  {
    "name": "Gift of Gab",
    "level": 2,
    "school": "Enchantment",
    "castTime": "1 Reaction",
    "range": "Self",
    "duration": "Instantaneous",
    "components": "V, S, M (2 gold coins, which is consumed as tax for using the spell)",
    "description": "When you cast this spell, you skillfully reshape the memories of listeners in your immediate area, so that each creature of your choice within 5 feet of you forgets everything you said within the last 6 seconds. Those creatures then remember that you actually said the words you speak as the verbal component of the spell.",
    "classes": [
      "bard",
      "wizard"
    ]
  },
  {
    "name": "Gust of Wind",
    "level": 2,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "Self (60-foot line)",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M (a legume seed)",
    "description": "A line of strong wind 60 feet long and 10 feet wide blasts from you in a direction you choose for the spell’s duration. Each creature that starts its turn in the line must succeed on a Strength saving throw or be pushed 15 feet away from you in a direction following the line.\n\nAny creature in the line must spend 2 feet of movement for every 1 foot it moves when moving closer to you.\n\nThe gust disperses gas or vapor, and it extinguishes candles, torches, and similar unprotected flames in the area. It causes protected flames, such as those of lanterns, to dance wildly and has a 50 percent chance to extinguish them.\n\nAs a bonus action on each of your turns before the spell ends, you can change the direction in which the line blasts from you.",
    "classes": [
      "druid",
      // "ranger",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Healing Spirit",
    "level": 2,
    "school": "Conjuration",
    "castTime": "1 Bonus Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "description": "You call forth a nature spirit to soothe the wounded. The intangible spirit appears in a space that is a 5-foot cube you can see within range. The spirit looks like a transparent beast or fey (your choice). Until the spell ends, whenever you or a creature you can see moves into the spirits space for the first time on a turn or starts its turn there, you can cause the spirit to restore 1d6 hit points to that creature (no action required). The spirit can’t heal constructs or undead. As a bonus action on your turn, you can move the Spirit up to 30 feet to a space you can see. The spirit can heal a number of times equal to 1 + your spellcasting ability modifier (minimum of twice). After healing that number of times, the spirit disappears.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the healing increases 1d6 for each slot level above 2nd.",
    "classes": [
      "druid",
      // "ranger"
    ]
  },
  {
    "name": "Heat Metal",
    "level": 2,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M (a piece of iron and a flame)",
    "description": "Choose a manufactured metal object, such as a metal weapon or a suit of heavy or medium metal armor, that you can see within range. You cause the object to glow red-hot. Any creature in physical contact with the object takes 2d8 fire damage when you cast the spell. Until the spell ends, you can use a bonus action on each of your subsequent turns to cause this damage again.\n\nIf a creature is holding or wearing the object and takes the damage from it, the creature must succeed on a Constitution saving throw or drop the object if it can. If it doesn’t drop the object, it has disadvantage on attack rolls and ability checks until the start of your next turn.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d8 for each slot level above 2nd.",
    "classes": [
      "bard",
      "druid"
    ]
  },
  {
    "name": "Hold Person",
    "level": 2,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M (a small, straight piece of iron)",
    "description": "Choose a humanoid that you can see within range. The target must succeed on a Wisdom saving throw or be paralyzed for the duration. At the end of each of its turns, the target can make another Wisdom saving throw. On a success, the spell ends on the target.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, you can target one additional humanoid for each slot level above 2nd. The humanoids must be within 30 feet of each other when you target them.",
    "classes": [
      "bard",
      "cleric",
      "druid",
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  // {
  //   "name": "Icingdeath's Frost (UA)",
  //   "level": 2,
  //   "school": "Evocation",
  //   "castTime": "1 Action",
  //   "range": "Self (15-foot cone)",
  //   "duration": "Instantaneous",
  //   "components": "S, M (a vial of meltwater)",
  //   "description": "A burst of icy cold energy emanates from you in a 30-foot cone. Each creature in that area must make a Constitution saving throw. On a failed save, a creature takes 3d8 cold damage and is covered in ice for 1 minute or until a creature uses its action to break the ice off itself or another creature. A creature covered in ice has its speed reduced to 0. On a successful save, a creature takes half as much damage with no additional effects.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, increase the cold damage by 1d8 for each slot level above 2nd.",
  //   "classes": [
  //     "sorcerer",
  //     "wizard"
  //   ]
  // },
  {
    "name": "Immovable Object",
    "level": 2,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "1 hour",
    "components": "V, S, M (gold dust worth at least 25 gp, which the spell consumes)",
    "description": "You touch an object that weighs no more than 10 pounds and cause it to become magically fixed in place. You and the creatures you designate when you cast this spell can move the object normally. You can also set a password that, when spoken within 5 feet of the object, suppresses this spell for 1 minute.\n\nIf the object is fixed in the air, it can hold up to 4,000 pounds of weight. More weight causes the object to fall. Otherwise, a creature can use an action to make a Strength check against your spell save DC. On a success, the creature can move the object up to 10 feet.\n\nAt Higher Levels. If you cast this spell using a spell slot of 4th or 5th level, the DC to move the object increases by 5, it can carry up to 8,000 pounds of weight, and the duration increases to 24 hours. If you cast this spell using a spell slot of 6th level or higher, the DC to move the object increases by 10, it can carry up to 20,000 pounds of weight, and the effect is permanent until dispelled.",
    "classes": [
      "wizard"
    ]
  },
  {
    "name": "Invisibility",
    "level": 2,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M (an eyelash encased in gum arabic)",
    "description": "A creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target’s person. The spell ends for a target that attacks or casts a spell.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd.",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Jim's Glowing Coin",
    "level": 2,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "1 minute",
    "components": "S, M (a coin, 2 gold coins, which is consumed as tax for using the spell)",
    "description": "When you cast the spell, you hurl the coin that is the spell's material component to any spot within range. The coin lights up as if under the effect of a light spell. Each creature of your choice that you can see within 30 feet of the coin must succeed on a Wisdom saving throw or be distracted for the duration. While distracted, a creature has disadvantage on Wisdom (Perception) checks and initiative rolls.",
    "classes": [
      "wizard"
    ]
  },
  {
    "name": "Knock",
    "level": 2,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Instantaneous",
    "components": "V",
    "description": "Choose an object that you can see within range. The object can be a door, a box, a chest, a set of manacles, a padlock, or another object that contains a mundane or magical means that prevents access.\n\nA target that is held shut by a mundane lock or that is stuck or barred becomes unlocked, unstuck, or unbarred. If the object has multiple locks, only one of them is unlocked.\n\nIf you choose a target that is held shut with Arcane Lock, that spell is suppressed for 10 minutes, during which time the target can be opened and shut normally.\n\nWhen you cast the spell, a loud knock, audible from as far away as 300 feet, emanates from the target object.",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Lesser Restoration",
    "level": 2,
    "school": "Abjuration",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "You touch a creature and can end either one disease or one condition afflicting it. The condition can be blinded, deafened, paralyzed, or poisoned.",
    "classes": [
      "bard",
      "cleric",
      "druid",
      // "paladin",
      // "ranger"
    ]
  },
  {
    "name": "Levitate",
    "level": 2,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S, M (either a small leather loop or a piece of golden wire bent into a cup shape with a long shank on one end)",
    "description": "One creature or object of your choice that you can see within range rises vertically, up to 20 feet, and remains suspended there for the duration. The spell can levitate a target that weighs up to 500 pounds. An unwilling creature that succeeds on a Constitution saving throw is unaffected.\n\nThe target can move only by pushing or pulling against a fixed object or surface within reach (such as a wall or a ceiling), which allows it to move as if it were climbing. You can change the target’s altitude by up to 20 feet in either direction on your turn. If you are the target, you can move up or down as part of your move. Otherwise, you can use your action to move the target, which must remain within the spell’s range.\n\nWhen the spell ends, the target floats gently to the ground if it is still aloft.",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Locate Animals or Plants",
    "level": 2,
    "school": "Divination",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "Instantaneous",
    "components": "V, S, M (a bit of fur from a bloodhound)",
    "description": "Describe or name a specific kind of beast or plant. Concentrating on the voice of nature in your surroundings, you learn the direction and distance to the closest creature or plant of that kind within 5 miles, if any are present.",
    "classes": [
      "bard",
      "druid",
      // "ranger"
    ]
  },
  {
    "name": "Locate Object",
    "level": 2,
    "school": "Divination",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S, M (a forked twig)",
    "description": "Describe or name an object that is familiar to you. You sense the direction to the object’s location, as long as that object is within 1,000 feet of you. If the object is in motion, you know the direction of its movement.\n\nThe spell can locate a specific object known to you, as long as you have seen it up close – within 30 feet – at least once. Alternatively, the spell can locate the nearest object of a particular kind, such as a certain kind of apparel, jewelry, furniture, tool, or weapon.\n\nThis spell can’t locate an object if any thickness of lead, even a thin sheet, blocks a direct path between you and the object.",
    "classes": [
      "bard",
      "cleric",
      "druid",
      // "paladin",
      // "ranger",
      "wizard"
    ]
  },
  {
    "name": "Magic Mouth",
    "level": 2,
    "school": "Illusion",
    "castTime": "1 Minute",
    "range": "30 Feet",
    "duration": "Until dispelled",
    "components": "V, S, M (a small bit of honeycomb and jade dust worth at least 10 gp, which the spell consumes)",
    "description": "You implant a message within an object in range, a message that is uttered when a trigger condition is met. Choose an object that you can see and that isn’t being worn or carried by another creature. Then speak the message, which must be 25 words or less, though it can be delivered over as long as 10 minutes. Finally, determine the circumstance that will trigger the spell to deliver your message.\n\nWhen that circumstance occurs, a magical mouth appears on the object and recites the message in your voice and at the same volume you spoke. If the object you chose has a mouth or something that looks like a mouth (for example, the mouth of a statue), the magical mouth appears there so that words appear to come from the object’s mouth. When you cast this spell, you can have the spell end after it delivers its message, or it can remain and repeats its message whenever the trigger occurs.\n\nThe triggering circumstance can be as general or as detailed as you like, though it must be based on visual or audible conditions that occur within 30 feet of the object. For example, you could instruct the mouth to speak when any creature moves within 30 feet of the object or when a silver bell rings within 30 feet of it.",
    "classes": [
      "bard",
      "wizard"
    ]
  },
  {
    "name": "Magic Weapon",
    "level": 2,
    "school": "Transmutation",
    "castTime": "1 Bonus Action",
    "range": "Touch",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S",
    "description": "You touch a nonmagical weapon. Until the spell ends, that weapon becomes a magic weapon with a +1 bonus to attack rolls and damage rolls.\n\nAt Higher Levels. When you cast this spell using a spell slot of 4th level or higher, the bonus increases to +2. When you use a spell slot of 6th level or higher, the bonus increases to +3.",
    "classes": [
      // "paladin",
      // "ranger",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Maximillian's Earthen Grasp",
    "level": 2,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M (a miniature hand sculpted from clay)",
    "description": "You choose a 5-foot-square unoccupied space on the ground that you can see within range. A Medium hand made from compacted soil rises there and reaches for one creature you can see within 5 feet of it. The target must make a Strength saving throw. On a failed save, the target takes 2d6 bludgeoning damage and is restrained for the spell’s duration.\n\nAs an action, you can cause the hand to crush the restrained target, who must make a Strength saving throw. It takes 2d6 bludgeoning damage on a failed save, or half as much damage on a successful one.\n\nTo break out, the restrained target can make a Strength check against your spell save DC. On a success, the target escapes and is no longer restrained by the hand.\n\nAs an action, you can cause the hand to reach for a different creature or to move to a different unoccupied space within range. The hand releases a restrained target if you do either.",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Melf's Acid Arrow",
    "level": 2,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "90 feet",
    "duration": "Instantaneous",
    "components": "V, S, M (powdered rhubarb leaf and an adder’s stomach)",
    "description": "A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the damage (both initial and later) increases by 1d4 for each slot level above 2nd.",
    "classes": [
      "wizard"
    ]
  },
  // {
  //   "name": "Mental Barrier (UA)",
  //   "level": 2,
  //   "school": "Abjuration",
  //   "castTime": "1 Reaction",
  //   "range": "Self",
  //   "duration": "1 round",
  //   "components": "V",
  //   "description": "You protect your mind with a wall of looping, repetitive thought. Until the start of your next turn, you have advantage on Intelligence, Wisdom, and Charisma saving throws, and you have resistance to psychic damage.",
  //   "classes": [
  //     "sorcerer",
  //     "warlock",
  //     "wizard"
  //   ]
  // },
  {
    "name": "Mind Spike",
    "level": 2,
    "school": "Divination",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 1 hour",
    "components": "S",
    "description": "You reach into the mind of one creature you can see within range. The target must make a Wisdom saving throw, taking 3d8 psychic damage on a failed save, or half as much damage on a successful one. On a failed save, you also always know the target's location until the spell ends, but only while the two of you are on the same plane of existence. While you have this knowledge, the target can’t become hidden from you, and if it’s invisible, it gains no benefit from that condition against you.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d8 for each slot level above 2nd.",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  // {
  //   "name": "Mind Thrust (UA)",
  //   "level": 2,
  //   "school": "Enchantment",
  //   "castTime": "1 Bonus Action",
  //   "range": "60 Feet",
  //   "duration": "1 round",
  //   "components": "V, S",
  //   "description": "You thrust a lance of psychic disruption into the mind of one creature you can see within range. The target must make an Intelligence saving throw. On a failed save, the target takes 3d6 psychic damage, and it can’t take a reaction until the end of its next turn. Moreover, on its next turn, it must choose whether it gets a move, an action, or a bonus action; it gets only one of the three. On a successful save, the target takes half as much damage and suffers none of the spell’s other effects.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd. The creatures must be within 30 feet of each other when you target them.",
  //   "classes": [
  //     "sorcerer",
  //     "warlock",
  //     "wizard"
  //   ]
  // },
  {
    "name": "Mirror Image",
    "level": 2,
    "school": "Illusion",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "1 minute",
    "components": "V, S",
    "description": "Three illusory duplicates of yourself appear in your space. Until the spell ends, the duplicates move with you and mimic your actions, shifting position so it’s impossible to track which image is real. You can use your action to dismiss the illusory duplicates.\n\nEach time a creature targets you with an attack during the spell’s duration, roll a d20 to determine whether the attack instead targets one of your duplicates.\n\nIf you have three duplicates, you must roll a 6 or higher to change the attack’s target to a duplicate. With two duplicates, you must roll an 8 or higher. With one duplicate, you must roll an 11 or higher.\n\nA duplicate’s AC equals 10 + your Dexterity modifier. If an attack hits a duplicate, the duplicate is destroyed. A duplicate can be destroyed only by an attack that hits it. It ignores all other damage and effects. The spell ends when all three duplicates are destroyed.\n\nA creature is unaffected by this spell if it can’t see, if it relies on senses other than sight, such as blindsight, or if it can perceive illusions as false, as with truesight.",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Misty Step",
    "level": 2,
    "school": "Conjuration",
    "castTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Instantaneous",
    "components": "V",
    "description": "Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space that you can see.",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Moonbeam",
    "level": 2,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "120 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M (several seeds of any moonseed plant and a piece of opalescent feldspar)",
    "description": "A silvery beam of pale light shines down in a 5-foot radius, 40-foot-high cylinder centered on a point within range. Until the spell ends, dim light fills the cylinder.\n\nWhen a creature enters the spell’s area for the first time on a turn or starts its turn there, it is engulfed in ghostly flames that cause searing pain, and it must make a Constitution saving throw. It takes 2d10 radiant damage on a failed save, or half as much damage on a successful one.\n\nA shapechanger makes its saving throw with disadvantage. If it fails, it also instantly reverts to its original form and can’t assume a different form until it leaves the spell’s light.\n\nOn each of your turns after you cast this spell, you can use an action to move the beam 60 feet in any direction.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d10 for each slot level above 2nd.",
    "classes": [
      "druid"
    ]
  },
  // {
  //   "name": "Nathair's Mischief (UA)",
  //   "level": 2,
  //   "school": "Illusion",
  //   "castTime": "1 Action",
  //   "range": "60 Feet",
  //   "duration": "Concentration, up to 1 minute",
  //   "components": "S, M (a piece of crust from an apple pie)",
  //   "description": "You fill a 20-foot cube centered on a point you choose within range with fey and draconic magic. Roll on the Mischievous Surge table to determine the magical effect produced. At the start of each of your turns, you can move the cube up to 10 feet and reroll on the table.\n\nMischievous Surge\nd4\tEffect\n1\tThe smell of apple pie fills the air, and each creature in the cube must succeed on a Wisdom saving throw or become charmed by you until the start of your next turn.\n2\tBouquets of flowers appear all around, and each creature in the cube must succeed on a Dexterity saving throw or be blinded until the start of your next turn as the flowers spray water in their faces.\n3\tEach creature in the cube must succeed on a Wisdom saving throw or begin giggling until the start of your next turn. A giggling creature is incapacitated and uses all its movement to move in a random direction.\n4\tDrops of molasses appear and hover in the cube, turning it into difficult terrain until the start of your next turn.",
  //   "classes": [
  //     "bard",
  //     "sorcerer",
  //     "wizard"
  //   ]
  // },
  {
    "name": "Nystul's Magic Aura",
    "level": 2,
    "school": "Illusion",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "24 hours",
    "components": "V, S, M (a small square of silk)",
    "description": "You place an illusion on a creature or an object you touch so that divination spells reveal false information about it. The target can be a willing creature or an object that isn’t being carried or worn by another creature.\n\nWhen you cast the spell, choose one or both of the following effects. The effect lasts for the duration. If you cast this spell on the same creature or object every day for 30 days, placing the same effect on it each time, the illusion lasts until it is dispelled.\n\nFalse Aura. You change the way the target appears to spells and magical effects, such as Detect Magic, that detect magical auras. You can make a nonmagical object appear magical, a magical object appear nonmagical, or change the object’s magical aura so that it appears to belong to a specific school of magic that you choose. When you use this effect on an object, you can make the false magic apparent to any creature that handles the item.\n\nMask. You change the way the target appears to spells and magical effects that detect creature types, such as a paladin’s Divine Sense or the trigger of a sym bol spell. You choose a creature type and other spells and magical effects treat the target as if it were a creature of that type or of that alignment.",
    "classes": [
      "wizard"
    ]
  },
  {
    "name": "Pass Without Trace",
    "level": 2,
    "school": "Abjuration",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M (ashes from a burned leaf of mistletoe and a sprig of spruce)",
    "description": "A veil of shadows and silence radiates from you, masking you and your companions from detection. For the duration, each creature you choose within 30 feet of you (including you) has a +10 bonus to Dexterity (Stealth) checks and can’t be tracked except by magical means. A creature that receives this bonus leaves behind no tracks or other traces of its passage.",
    "classes": [
      "druid",
      // "ranger"
    ]
  },
  {
    "name": "Phantasmal Force",
    "level": 2,
    "school": "Illusion",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M (a bit of fleece)",
    "description": "You craft an illusion that takes root in the mind of a creature that you can see within range. The target must make an Intelligence saving throw. On a failed save, you create a phantasmal object, creature, or other visible phenomenon of your choice that is no larger than a 10-foot cube and that is perceivable only to the target for the duration. This spell has no effect on undead or constructs.\n\nThe phantasm includes sound, temperature, and other stimuli, also evident only to the creature.\n\nThe target can use its action to examine the phantasm with an Intelligence (Investigation) check against your spell save DC. If the check succeeds, the target realizes that the phantasm is an illusion, and the spell ends.\n\nWhile a target is affected by the spell, the target treats the phantasm as if it were real. The target rationalizes any illogical outcomes from interacting with the phantasm. For example, a target attempting to walk across a phantasmal bridge that spans a chasm falls once it steps onto the bridge. If the target survives the fall, it still believes that the bridge exists and comes up with some other explanation for its fall; it was pushed, it slipped, or a strong wind might have knocked it off.\n\nAn affected target is so convinced of the phantasm’s reality that it can even take damage from the illusion. A phantasm created to appear as a creature can attack the target. Similarly, a phantasm created to appear as fire, a pool of acid, or lava can burn the target. Each round on your turn, the phantasm can deal 1d6 psychic damage to the target if it is in the phantasm’s area or within 5 feet of the phantasm, provided that the illusion is of a creature or hazard that could logically deal damage, such as by attacking. The target perceives the damage as a type appropriate to the illusion.",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Prayer of Healing",
    "level": 2,
    "school": "Evocation",
    "castTime": "10 Minutes",
    "range": "Touch",
    "duration": "Instantaneous",
    "components": "V",
    "description": "Up to six creatures of your choice that you can see within range each regain hit points equal to 2d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the healing increases by 1d8 for each slot level above 2nd.",
    "classes": [
      "cleric",
      // "paladin"
    ]
  },
  {
    "name": "Protection from Poison",
    "level": 2,
    "school": "Abjuration",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "1 hour",
    "components": "V, S",
    "description": "You touch a creature. If it is poisoned, you neutralize the poison. If more than one poison afflicts the target, you neutralize one poison that you know is present, or you neutralize one at random.\n\nFor the duration, the target has advantage on saving throws against being poisoned, and it has resistance to poison damage.",
    "classes": [
      "cleric",
      "druid",
      // "paladin",
      // "ranger"
    ]
  },
  {
    "name": "Pyrotechnics",
    "level": 2,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "Choose an area of flame that you can see and that can fit within a 5-foot cube within range. You can extinguish the fire in that area, and you create either fireworks or smoke.\n\nFireworks. The target explodes with a dazzling display of colors. Each creature within 10 feet of the target must succeed on a Constitution saving throw or become blinded until the end of your next turn.\n\nSmoke. Thick black smoke spreads out from the target in a 20-foot radius, moving around corners. The area of the smoke is heavily obscured. The smoke persists for 1 minute or until a strong wind disperses it.",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Ray of Enfeeblement",
    "level": 2,
    "school": "Necromancy",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "description": "A black beam of enervating energy springs from your finger toward a creature within range.\nMake a ranged spell attack against the target. On a hit, the target deals only half damage with weapon attacks that use Strength until the spell ends.\n\nAt the end of each of the target’s turns, it can make a Constitution saving throw against the spell. On a success, the spell ends.",
    "classes": [
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Rope Trick",
    "level": 2,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "1 hour",
    "components": "V, S, M (powdered corn extract and a twisted loop of parchment)",
    "description": "You touch a length of rope that is up to 60 feet long. One end of the rope then rises into the air until the whole rope hangs perpendicular to the ground. At the upper end of the rope, an invisible entrance opens to an extradimensional space that lasts until the spell ends.\n\nThe extradimensional space can be reached by climbing to the top of the rope. The space can hold as many as eight Medium or smaller creatures. The rope can be pulled into the space, making the rope disappear from view outside the space.\n\nAttacks and spells can’t cross through the entrance into or out of the extradimensional space, but those inside can see out of it as if through a 3-foot-by-5-foot window centered on the rope.\n\nAnything inside the extradimensional space drops out when the spell ends.",
    "classes": [
      "wizard"
    ]
  },
  {
    "name": "Scorching Ray",
    "level": 2,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "120 Feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "description": "You create three rays of fire and hurl them at targets within range. You can hurl them at one target or several. Make a ranged spell attack for each ray. On a hit, the target takes 2d6 fire damage.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, you create one additional ray for each slot level above 2nd.",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "See Invisibility",
    "level": 2,
    "school": "Divination",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "1 hour",
    "components": "V, S, M (pinch of talc and a small sprinkling of powdered silver)",
    "description": "For the duration, you see invisible creatures and objects as if they were visible, and you can see into the Ethereal Plane. Ethereal creatures and objects appear ghostly and translucent.",
    "classes": [
      "bard",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Shadow Blade",
    "level": 2,
    "school": "Illusion",
    "castTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "description": "You weave together threads of shadow to create a sword of solidified gloom in your hand. This magic sword lasts until the spell ends. It counts as a simple melee weapon with which you are proficient. It deals 2d8 psychic damage on a hit and has the finesse, light, and thrown properties (range 20/60). In addition, when you use the sword to attack a target that is in dim light or darkness, you make the attack roll with advantage.\n\nIf you drop the weapon or throw it, it dissipates at the end of the turn. Thereafter, while the spell persists, you can use a bonus action to cause the sword to reappear in your hand.\n\nAt Higher Levels. When you cast this spell using a 3rd- or 4th-level spell slot, the damage increases to 3d8. When you cast it using a 5th- or 6th-level spell slot, the damage increases to 4d8. When you cast it using a spell slot of 7th level or higher, the damage increases to 5d8.",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Shatter",
    "level": 2,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Instantaneous",
    "components": "V, S, M (a chip of mica)",
    "description": "A sudden loud ringing noise, painfully intense, erupts from a point of your choice within range. Each creature in a 10-foot-radius sphere centered on that point must make a Constitution saving throw. A creature takes 3d8 thunder damage on a failed save, or half as much damage on a successful one. A creature made of inorganic material such as stone, crystal, or metal has disadvantage on this saving throw.\n\nA nonmagical object that isn’t being worn or carried also takes the damage if it’s in the spell’s area.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d8 for each slot level above 2nd.",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Silence",
    "level": 2,
    "school": "Illusion",
    "castTime": "1 Action",
    "range": "120 Feet",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S",
    "description": "For the duration, no sound can be created within or pass through a 20-foot-radius sphere centered on a point you choose within range. Any creature or object entirely inside the sphere is immune to thunder damage, and creatures are deafened while entirely inside it. Casting a spell that includes a verbal component is impossible there.",
    "classes": [
      "bard",
      "cleric",
      // "ranger"
    ]
  },
  {
    "name": "Skywrite",
    "level": 2,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "Sight",
    "duration": "Concentration, up to 1 day",
    "components": "V, S",
    "description": "You cause up to ten words to form in a part of the sky you can see. The words appear to be made of cloud and remain in place for the spell’s duration. The words dissipate when the spell ends. A strong wind can disperse the clouds and end the spell early.",
    "classes": [
      "bard",
      "druid",
      "wizard"
    ]
  },
  {
    "name": "Snilloc's Snowball Storm",
    "level": 2,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "90 feet",
    "duration": "Instantaneous",
    "components": "V, S, M (a piece of ice or a small white rock chip)",
    "description": "A flurry of magic snowballs erupts from a point you choose within range. Each creature in a 5-foot-radius sphere centered on that point must make a Dexterity saving throw. A creature takes 3d6 cold damage on a failed save, or half as much damage on a successful one.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d6 for each slot level above 2nd.",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Spider Climb",
    "level": 2,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M (a drop of bitumen and a spider)",
    "description": "Until the spell ends, one willing creature you touch gains the ability to move up, down, and across vertical surfaces and upside down along ceilings, while leaving its hands free. The target also gains a climbing speed equal to its walking speed.",
    "classes": [
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Spike Growth",
    "level": 2,
    "school": "Transmutation",
    "castTime": "1 Action",
    "range": "150 Feet",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S, M (seven sharp thorns or seven small twigs, each sharpened to a point)",
    "description": "The ground in a 20-foot radius centered on a point within range twists and sprouts hard spikes and thorns. The area becomes difficult terrain for the duration. When a creature moves into or within the area, it takes 2d4 piercing damage for every 5 feet it travels.\n\nThe transformation of the ground is camouflaged to look natural. Any creature that can’t see the area at the time the spell is cast must make a Wisdom (Perception) check against your spell save DC to recognize the terrain as hazardous before entering it.",
    "classes": [
      "druid",
      // "ranger"
    ]
  },
  {
    "name": "Spiritual Weapon",
    "level": 2,
    "school": "Evocation",
    "castTime": "1 Bonus Action",
    "range": "60 Feet",
    "duration": "1 minute",
    "components": "V, S",
    "description": "You create a floating, spectral weapon within range that lasts for the duration or until you cast this spell again.\n\nWhen you cast the spell, you can make a melee spell attack against a creature within 5 feet of the weapon. On a hit, the target takes force damage equal to 1d8 + your spellcasting ability modifier.\n\nAs a bonus action on your turn, you can move the weapon up to 20 feet and repeat the attack against a creature within 5 feet of it.\n\nThe weapon can take whatever form you choose. Clerics of deities who are associated with a particular weapon (as St. Cuthbert is known for his mace and Thor for his hammer) make this spell’s effect resemble that weapon.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d8 for every two slot levels above the 2nd.",
    "classes": [
      "cleric"
    ]
  },
  {
    "name": "Suggestion",
    "level": 2,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "30 Feet",
    "duration": "Concentration, up to 8 hours",
    "components": "V, M (a snake’s tongue and either a bit of honeycomb or a drop of sweet oil)",
    "description": "You suggest a course of activity (limited to a sentence or two) and magically influence a creature you can see within range that can hear and understand you. Creatures that can’t be charmed are immune to this effect. The suggestion must be worded in such a manner as to make the course of action sound reasonable. Asking the creature to stab itself, throw itself onto a spear, immolate itself, or do some other obviously harmful act ends the spell.\n\nThe target must make a Wisdom saving throw. On a failed save, it purses the course of action you described to the best of its ability. The suggested course of action can continue for the entire duration. If the suggested activity can be completed in a shorter time, the spell ends when the subject finishes what it was asked to do.\n\nYou can also specify conditions that will trigger a special activity during the duration. For example, you might suggest that a knight give her warhorse to the first beggar she meets. If the condition isn’t met before the spell expires, the activity isn’t preformed.\n\nIf you or any of your companions damage the target, the spell ends.",
    "classes": [
      "bard",
      "sorcerer",
      "warlock",
      "wizard"
    ]
  },
  {
    "name": "Summon Beast",
    "level": 2,
    "school": "Conjuration",
    "castTime": "1 Action",
    "range": "90 feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M (a feather, tuft of fur, and fish tail inside a gilded acorn worth at least 200 gp)",
    "description": "You call forth a bestial spirit. It manifests in an unoccupied space that you can see within range. This corporeal form uses the Bestial Spirit stat block. When you cast the spell, choose an environment: Air, Land, or Water. The creature resembles an animal of your choice that is native to the chosen environment, which determines certain traits in its stat block. The creature disappears when it drops to 0 hit points or when the spell ends.\n\nThe creature is an ally to you and your companions. In combat, the creature shares your initiative count, but it takes its turn immediately after yours. It obeys your verbal commands (no action required by you). If you don’t issue any, it takes the Dodge action and uses its move to avoid danger.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, use the higher level where the spell’s level appears in the stat block.",
    "classes": [
      "druid",
      // "ranger"
    ]
  },
  {
    "name": "Tasha's Mind Whip",
    "level": 2,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "90 feet",
    "duration": "1 round",
    "components": "V",
    "description": "You psychically lash out at one creature you can see within range. The target must make an Intelligence saving throw. On a failed save, the target takes 3d6 psychic damage, and it can’t take a reaction until the end of its next turn. Moreover, on its next turn, it must choose whether it gets a move, an action, or a bonus action; it gets only one of the three. On a successful save, the target takes half as much damage and suffers none of the spell’s other effects.\n\nAt Higher Levels. When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd. The creatures must be within 30 feet of each other when you target them.",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  // {
  //   "name": "Thought Shield (UA)",
  //   "level": 2,
  //   "school": "Abjuration",
  //   "castTime": "1 Action",
  //   "range": "Touch",
  //   "duration": "8 hours",
  //   "components": "V, S",
  //   "description": "You weave a clouding veil over the mind of one creature you touch. For the duration, the target’s mind can’t be read or detected, creatures can’t telepathically communicate with the target unless the target allows it, and the target has advantage on saving throws against any effect that would determine whether it is telling the truth.",
  //   "classes": [
  //     "sorcerer",
  //     "warlock",
  //     "wizard"
  //   ]
  // },
  {
    "name": "Warding Bond",
    "level": 2,
    "school": "Abjuration",
    "castTime": "1 Action",
    "range": "Touch",
    "duration": "1 hour",
    "components": "V, S, M (a pair of platinum rings worth at least 50 gp each, which you and target must wear for the duration)",
    "description": "This spell wards a willing creature you touch and creates a mystic connection between you and the target until the spell ends.\n\nWhile the target is within 60 feet of you, it gains a +1 bonus to AC and saving throws, and it has resistance to all damage. Also, each time it takes damage, you take the same amount of damage.\n\nThe spell ends if you drop to 0 hit points or if you and the target become separated by more than 60 feet. It also ends if the spell is cast again on either of the connected creatures. You can also dismiss the spell as an action.",
    "classes": [
      "cleric",
      // "paladin"
    ]
  },
  {
    "name": "Warding Wind",
    "level": 2,
    "school": "Evocation",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "Concentration, up to 10 minutes",
    "components": "V",
    "description": "A strong wind (20 miles per hour) blows around you in a 10-foot radius and moves with you, remaining centered on you. The wind lasts for the spell’s duration.\n\nThe wind has the following effects:\n\nIt deafens you and other creatures in its area.\nIt extinguishes unprotected flames in its area that are torch-sized or smaller.\nThe area is difficult terrain for creatures other than you.\nThe attack rolls of ranged weapon attacks have disadvantage if they pass in or out of the wind.\nIt hedges out vapor, gas, and fog that can be dispersed by strong wind.",
    "classes": [
      "bard",
      "druid",
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Web",
    "level": 2,
    "school": "Conjuration",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M (a bit of spiderweb)",
    "description": "You conjure a mass of thick, sticky webbing at a point of your choice within range. The webs fill a 20-foot cube from that point for the duration. The webs are difficult terrain and lightly obscure their area.\n\nIf the webs aren’t anchored between two solid masses (such as walls or trees) or layered across a floor, wall, or ceiling, the conjured web collapses on itself, and the spell ends at the start of your next turn. Webs layered over a flat surface have a depth of 5 feet.\n\nEach creature that starts its turn in the webs or that enters them during its turn must make a Dexterity saving throw. On a failed save, the creature is restrained as long as it remains in the webs or until it breaks free.\n\nA creature restrained by the webs can use its action to make a Strength check against your spell save DC. If it succeeds, it is no longer restrained.\n\nThe webs are flammable. Any 5-foot cube of webs exposed to fire burns away in 1 round, dealing 2d4 fire damage to any creature that starts its turn in the fire.",
    "classes": [
      "sorcerer",
      "wizard"
    ]
  },
  {
    "name": "Wristpocket",
    "level": 2,
    "school": "Conjuration",
    "castTime": "1 Action",
    "range": "Self",
    "duration": "Concentration, up to 1 hour",
    "components": "S",
    "description": "You flick your wrist, causing one object in your hand to vanish. The object, which only you can be holding and can weigh no more than 5 pounds, is transported to an extradimensional space, where it remains for the duration.\n\nUntil the spell ends, you can use your action to summon the object to your free hand, and you can use your action to return the object to the extradimensional space. An object still in the pocket plane when the spell ends appears in your space, at your feet.",
    "classes": [
      "wizard"
    ]
  },
  {
    "name": "Zone of Truth",
    "level": 2,
    "school": "Enchantment",
    "castTime": "1 Action",
    "range": "60 Feet",
    "duration": "10 minutes",
    "components": "V, S",
    "description": "You create a magical zone that guards against deception in a 15-foot-radius sphere centered on a point of your choice within range. Until the spell ends, a creature that enters the spell’s area for the first time on a turn or starts its turn there must make a Charisma saving throw. On a failed save, a creature can’t speak a deliberate lie while in the radius. You know whether each creature succeeds or fails on its saving throw.\n\nAn affected creature is aware of the spell and can thus avoid answering questions to which it would normally respond with a lie. Such creatures can be evasive in its answers as long as it remains within the boundaries of the truth.",
    "classes": [
      "bard",
      "cleric",
      // "paladin"
    ]
  }
];

export const CLASS_SPELL_LISTS: ClassSpellList[] = BASE_CASTER_CLASS_IDS.map((classId) => ({
  classId,
  cantrips: SPELLS.filter((s) => s.level === 0 && s.classes.includes(classId)),
  level1: SPELLS.filter((s) => s.level === 1 && s.classes.includes(classId)),
  level2: SPELLS.filter((s) => s.level === 2 && s.classes.includes(classId)),
}));

export function getClassSpellList(classId: string): ClassSpellList | undefined {
  return CLASS_SPELL_LISTS.find((l) => l.classId === classId);
}
