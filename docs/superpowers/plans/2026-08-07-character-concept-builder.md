# D&D Character Concept Builder Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static Next.js wizard app where a D&D newcomer answers a guided sequence of questions and ends up with a race/subrace, class, and subclass concept for a level 3 character, submitted to a Google Sheet the GM controls.

**Architecture:** Single-page client-side wizard (no per-step routing) built with React state, backed by a plain-data module for race/class/subclass content and a pure scoring function for flavor-based class ordering. Answers persist to `localStorage` between steps. Final submission POSTs JSON to a Google Apps Script Web App endpoint that appends a timestamped row to a Google Sheet. The whole Next.js app builds via `output: 'export'` and deploys to GitHub Pages via GitHub Actions.

**Tech Stack:** Next.js 16 (App Router, already scaffolded), React 19, TypeScript, Tailwind CSS v4 (already configured), Vitest + React Testing Library (to be added) for tests, Google Apps Script for the sheet-writing webhook (separate from the Next.js app).

## Global Constraints

- No server/backend code beyond the Google Apps Script webhook — the Next.js app must build with `output: 'export'` and run purely static on GitHub Pages.
- No authentication or database. Small private group use only.
- Every submission appends a new row to the sheet with a server-added timestamp column; no dedup logic.
- All 12 D&D classes are always shown in the class step (never filtered out) — flavor answers only reorder/highlight them.
- Subclass step shows a curated default list per class with a "Show all subclasses" toggle to reveal the rest.
- Races are limited to the Core 8 (Human, Elf, Dwarf, Halfling, Half-Elf, Tiefling, Half-Orc, Dragonborn), with subraces only for Elf (High/Wood/Drow) and Dwarf (Hill/Mountain).
- Back navigation must be available from every step after Welcome, with prior answers preserved and editable.
- No ability scores, HP, spells, equipment, or feats anywhere in this feature — concept fields only (race, subrace, class, subclass, player name, character name).
- Repo: `dnd-new`, GitHub remote `https://github.com/ssreckovic/dnd-selector.git`, existing `create-next-app` scaffold with TypeScript + Tailwind v4 already in place.
- Git commits must list only the user as author/collaborator — never add Claude as a co-author.

---

### Task 1: Test tooling setup (Vitest + React Testing Library)

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Test: `lib/__tests__/smoke.test.ts`

**Interfaces:**
- Produces: `npm test` runs Vitest once; `npm run test:watch` runs it in watch mode. Later tasks' test files are picked up automatically by Vitest's default `**/*.test.{ts,tsx}` glob.

- [ ] **Step 1: Install test dependencies**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Create Vitest config**

`vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

- [ ] **Step 3: Create Vitest setup file**

`vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Add test scripts to package.json**

Add to the `"scripts"` object in `package.json`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Write a smoke test**

`lib/__tests__/smoke.test.ts`:

```ts
import { describe, it, expect } from "vitest";

describe("test harness", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 6: Run the smoke test**

Run: `npm test`
Expected: PASS, 1 test passed.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts vitest.setup.ts lib/__tests__/smoke.test.ts
git commit -m "test: add Vitest and React Testing Library harness"
```

---

### Task 2: D&D reference data module (races, classes, subclasses)

**Files:**
- Create: `lib/dnd-data.ts`
- Test: `lib/__tests__/dnd-data.test.ts`

**Interfaces:**
- Produces:
  - `type Subrace = { id: string; name: string; blurb: string }`
  - `type Race = { id: string; name: string; blurb: string; subraces?: Subrace[] }`
  - `type Subclass = { id: string; name: string; blurb: string }`
  - `type DndClass = { id: string; name: string; blurb: string; defaultSubclasses: Subclass[]; allSubclasses: Subclass[] }`
  - `const RACES: Race[]`
  - `const CLASSES: DndClass[]`
  - `function getRace(id: string): Race | undefined`
  - `function getClass(id: string): DndClass | undefined`

- [ ] **Step 1: Write the failing data-integrity test**

`lib/__tests__/dnd-data.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { RACES, CLASSES, getRace, getClass } from "@/lib/dnd-data";

describe("dnd-data", () => {
  it("has exactly the Core 8 races", () => {
    expect(RACES.map((r) => r.id).sort()).toEqual(
      [
        "human",
        "elf",
        "dwarf",
        "halfling",
        "half-elf",
        "tiefling",
        "half-orc",
        "dragonborn",
      ].sort(),
    );
  });

  it("gives Elf and Dwarf subraces, and no other race subraces", () => {
    for (const race of RACES) {
      if (race.id === "elf") {
        expect(race.subraces?.map((s) => s.id).sort()).toEqual(
          ["high-elf", "wood-elf", "drow"].sort(),
        );
      } else if (race.id === "dwarf") {
        expect(race.subraces?.map((s) => s.id).sort()).toEqual(
          ["hill-dwarf", "mountain-dwarf"].sort(),
        );
      } else {
        expect(race.subraces).toBeUndefined();
      }
    }
  });

  it("has exactly 12 classes with non-empty blurbs", () => {
    expect(CLASSES).toHaveLength(12);
    for (const cls of CLASSES) {
      expect(cls.blurb.length).toBeGreaterThan(0);
    }
  });

  it("every class's default subclasses are a subset of its all-subclasses list", () => {
    for (const cls of CLASSES) {
      const allIds = new Set(cls.allSubclasses.map((s) => s.id));
      for (const def of cls.defaultSubclasses) {
        expect(allIds.has(def.id)).toBe(true);
      }
      expect(cls.defaultSubclasses.length).toBeGreaterThanOrEqual(2);
      expect(cls.allSubclasses.length).toBeGreaterThanOrEqual(
        cls.defaultSubclasses.length,
      );
    }
  });

  it("getRace and getClass look up by id", () => {
    expect(getRace("human")?.name).toBe("Human");
    expect(getRace("nonexistent")).toBeUndefined();
    expect(getClass("wizard")?.name).toBe("Wizard");
    expect(getClass("nonexistent")).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- dnd-data`
Expected: FAIL with "Cannot find module '@/lib/dnd-data'" or similar.

- [ ] **Step 3: Implement the data module**

`lib/dnd-data.ts`:

```ts
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
};

export type DndClass = {
  id: string;
  name: string;
  blurb: string;
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
    defaultSubclasses: [
      { id: "champion", name: "Champion", blurb: "A straightforward, hard-hitting warrior who excels at landing critical blows." },
      { id: "battle-master", name: "Battle Master", blurb: "A tactician who uses special combat maneuvers to control the battlefield." },
      { id: "eldritch-knight", name: "Eldritch Knight", blurb: "A soldier who blends swordplay with a handful of arcane spells." },
    ],
    allSubclasses: [
      { id: "champion", name: "Champion", blurb: "A straightforward, hard-hitting warrior who excels at landing critical blows." },
      { id: "battle-master", name: "Battle Master", blurb: "A tactician who uses special combat maneuvers to control the battlefield." },
      { id: "eldritch-knight", name: "Eldritch Knight", blurb: "A soldier who blends swordplay with a handful of arcane spells." },
      { id: "arcane-archer", name: "Arcane Archer", blurb: "A ranged specialist who fires magic-infused arrows." },
      { id: "cavalier", name: "Cavalier", blurb: "A mounted protector who guards allies and punishes those who ignore them." },
      { id: "samurai", name: "Samurai", blurb: "An unshakeable warrior fueled by fighting spirit and resolve." },
    ],
  },
  {
    id: "monk",
    name: "Monk",
    blurb: "A disciplined martial artist who fights unarmed with incredible speed and precision.",
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
    defaultSubclasses: [
      { id: "thief", name: "Thief", blurb: "A nimble specialist in sleight of hand, locks, and climbing anything." },
      { id: "assassin", name: "Assassin", blurb: "A master of the element of surprise and the deadly first strike." },
      { id: "arcane-trickster", name: "Arcane Trickster", blurb: "A rogue who mixes in a handful of illusion and trickery spells." },
    ],
    allSubclasses: [
      { id: "thief", name: "Thief", blurb: "A nimble specialist in sleight of hand, locks, and climbing anything." },
      { id: "assassin", name: "Assassin", blurb: "A master of the element of surprise and the deadly first strike." },
      { id: "arcane-trickster", name: "Arcane Trickster", blurb: "A rogue who mixes in a handful of illusion and trickery spells." },
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- dnd-data`
Expected: PASS, all 5 tests passed.

- [ ] **Step 5: Commit**

```bash
git add lib/dnd-data.ts lib/__tests__/dnd-data.test.ts
git commit -m "feat: add D&D race and class reference data"
```

---

### Task 3: Flavor-to-class scoring module

**Files:**
- Create: `lib/scoring.ts`
- Test: `lib/__tests__/scoring.test.ts`

**Interfaces:**
- Consumes: `DndClass` from `@/lib/dnd-data` (only `.id` is used).
- Produces:
  - `type CombatRole = "melee" | "ranged" | "support" | "avoid"`
  - `type MagicInterest = "none" | "little" | "lot"`
  - `type SocialStyle = "leader" | "face" | "sneaky" | "loner"`
  - `type FlavorAnswers = { combatRole: CombatRole; magicInterest: MagicInterest; socialStyle: SocialStyle }`
  - `function scoreClasses(answers: FlavorAnswers, classes: DndClass[]): DndClass[]` — returns `classes` sorted by descending match score, stable on ties (original relative order preserved for equal scores).

- [ ] **Step 1: Write the failing test**

`lib/__tests__/scoring.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { scoreClasses, FlavorAnswers } from "@/lib/scoring";
import { CLASSES, getClass } from "@/lib/dnd-data";

describe("scoreClasses", () => {
  it("ranks melee, no-magic answers toward Fighter/Barbarian over Wizard", () => {
    const answers: FlavorAnswers = {
      combatRole: "melee",
      magicInterest: "none",
      socialStyle: "loner",
    };
    const ranked = scoreClasses(answers, CLASSES);
    const fighterIndex = ranked.findIndex((c) => c.id === "fighter");
    const wizardIndex = ranked.findIndex((c) => c.id === "wizard");
    expect(fighterIndex).toBeLessThan(wizardIndex);
  });

  it("ranks avoid-combat, heavy-magic answers toward Wizard/Sorcerer/Warlock over Fighter", () => {
    const answers: FlavorAnswers = {
      combatRole: "avoid",
      magicInterest: "lot",
      socialStyle: "loner",
    };
    const ranked = scoreClasses(answers, CLASSES);
    const wizardIndex = ranked.findIndex((c) => c.id === "wizard");
    const fighterIndex = ranked.findIndex((c) => c.id === "fighter");
    expect(wizardIndex).toBeLessThan(fighterIndex);
  });

  it("ranks support, heavy-magic, leader answers toward Cleric over Rogue", () => {
    const answers: FlavorAnswers = {
      combatRole: "support",
      magicInterest: "lot",
      socialStyle: "leader",
    };
    const ranked = scoreClasses(answers, CLASSES);
    const clericIndex = ranked.findIndex((c) => c.id === "cleric");
    const rogueIndex = ranked.findIndex((c) => c.id === "rogue");
    expect(clericIndex).toBeLessThan(rogueIndex);
  });

  it("never drops any class from the result", () => {
    const answers: FlavorAnswers = {
      combatRole: "ranged",
      magicInterest: "little",
      socialStyle: "sneaky",
    };
    const ranked = scoreClasses(answers, CLASSES);
    expect(ranked).toHaveLength(CLASSES.length);
    expect(new Set(ranked.map((c) => c.id))).toEqual(
      new Set(CLASSES.map((c) => c.id)),
    );
  });

  it("preserves original order for classes with tied scores", () => {
    // An answer combination where two classes at the tail of CLASSES have
    // no scoring entries at all (score 0 each) should keep their relative order.
    const answers: FlavorAnswers = {
      combatRole: "melee",
      magicInterest: "none",
      socialStyle: "loner",
    };
    const ranked = scoreClasses(answers, CLASSES);
    const bardIndex = ranked.findIndex((c) => c.id === "bard");
    const clericIndex = ranked.findIndex((c) => c.id === "cleric");
    // Both score 0 under these answers; Bard precedes Cleric in CLASSES already.
    expect(bardIndex).toBeLessThan(clericIndex);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- scoring`
Expected: FAIL with "Cannot find module '@/lib/scoring'".

- [ ] **Step 3: Implement the scoring module**

`lib/scoring.ts`:

```ts
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- scoring`
Expected: PASS, all 5 tests passed.

- [ ] **Step 5: Commit**

```bash
git add lib/scoring.ts lib/__tests__/scoring.test.ts
git commit -m "feat: add flavor-answer to class scoring"
```

---

### Task 4: Wizard answer types and localStorage persistence

**Files:**
- Create: `lib/wizard-storage.ts`
- Test: `lib/__tests__/wizard-storage.test.ts`

**Interfaces:**
- Consumes: `CombatRole`, `MagicInterest`, `SocialStyle` from `@/lib/scoring`.
- Produces:
  - `type WizardAnswers = { playerName: string; raceId: string | null; subraceId: string | null; combatRole: CombatRole | null; magicInterest: MagicInterest | null; socialStyle: SocialStyle | null; classId: string | null; subclassId: string | null; characterName: string }`
  - `const EMPTY_ANSWERS: WizardAnswers`
  - `function loadAnswers(): WizardAnswers`
  - `function saveAnswers(answers: WizardAnswers): void`
  - `function clearAnswers(): void`

- [ ] **Step 1: Write the failing test**

`lib/__tests__/wizard-storage.test.ts`:

```ts
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- wizard-storage`
Expected: FAIL with "Cannot find module '@/lib/wizard-storage'".

- [ ] **Step 3: Implement the storage module**

`lib/wizard-storage.ts`:

```ts
import type { CombatRole, MagicInterest, SocialStyle } from "@/lib/scoring";

export type WizardAnswers = {
  playerName: string;
  raceId: string | null;
  subraceId: string | null;
  combatRole: CombatRole | null;
  magicInterest: MagicInterest | null;
  socialStyle: SocialStyle | null;
  classId: string | null;
  subclassId: string | null;
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- wizard-storage`
Expected: PASS, all 4 tests passed.

- [ ] **Step 5: Commit**

```bash
git add lib/wizard-storage.ts lib/__tests__/wizard-storage.test.ts
git commit -m "feat: add wizard answer storage in localStorage"
```

---

### Task 5: Submission client

**Files:**
- Create: `lib/submit.ts`
- Test: `lib/__tests__/submit.test.ts`

**Interfaces:**
- Consumes: `WizardAnswers` from `@/lib/wizard-storage`.
- Produces: `type SubmitResult = { ok: true } | { ok: false; error: string }`; `function submitConcept(answers: WizardAnswers): Promise<SubmitResult>`.

- [ ] **Step 1: Write the failing test**

`lib/__tests__/submit.test.ts`:

```ts
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
      characterName: "Thistle",
      race: "halfling",
      subrace: null,
      class: "rogue",
      subclass: "thief",
    });
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- submit`
Expected: FAIL with "Cannot find module '@/lib/submit'".

- [ ] **Step 3: Implement the submission client**

`lib/submit.ts`:

```ts
import type { WizardAnswers } from "@/lib/wizard-storage";

export type SubmitResult = { ok: true } | { ok: false; error: string };

export async function submitConcept(
  answers: WizardAnswers,
): Promise<SubmitResult> {
  const endpoint = process.env.NEXT_PUBLIC_SHEETS_ENDPOINT;
  if (!endpoint) {
    return { ok: false, error: "Submission endpoint is not configured." };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      // text/plain avoids a CORS preflight against the Apps Script endpoint,
      // which does not implement OPTIONS handling.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        playerName: answers.playerName,
        characterName: answers.characterName,
        race: answers.raceId,
        subrace: answers.subraceId,
        class: answers.classId,
        subclass: answers.subclassId,
      }),
    });

    if (!response.ok) {
      return { ok: false, error: `Request failed with status ${response.status}` };
    }
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown submission error",
    };
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- submit`
Expected: PASS, all 4 tests passed.

- [ ] **Step 5: Commit**

```bash
git add lib/submit.ts lib/__tests__/submit.test.ts
git commit -m "feat: add Google Sheets submission client"
```

---

### Task 6: Google Apps Script webhook

**Files:**
- Create: `google-apps-script/Code.gs`
- Create: `google-apps-script/README.md`

**Interfaces:**
- Consumes: JSON body shape produced by `submitConcept` in Task 5 (`playerName`, `characterName`, `race`, `subrace`, `class`, `subclass`).
- Produces: an HTTP endpoint URL to be set as `NEXT_PUBLIC_SHEETS_ENDPOINT` (used by Task 5 and wired into the build in Task 11).

This task has no automated tests — Apps Script runs inside Google's environment, not locally. Verification is manual (Step 3).

- [ ] **Step 1: Write the Apps Script webhook**

`google-apps-script/Code.gs`:

```javascript
const SHEET_NAME = "Submissions";
const HEADER_ROW = [
  "Timestamp",
  "Player Name",
  "Character Name",
  "Race",
  "Subrace",
  "Class",
  "Subclass",
];

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADER_ROW);
  }
  return sheet;
}

function doPost(e) {
  const sheet = getOrCreateSheet_();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.playerName || "",
    data.characterName || "",
    data.race || "",
    data.subrace || "",
    data.class || "",
    data.subclass || "",
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true }),
  ).setMimeType(ContentService.MimeType.JSON);
}
```

- [ ] **Step 2: Write deployment instructions**

`google-apps-script/README.md`:

```markdown
# Google Sheets submission webhook

1. Create a new Google Sheet (or open the one you want submissions in).
2. In the Sheet, open **Extensions > Apps Script**.
3. Delete the default `Code.gs` contents and paste in this directory's `Code.gs`.
4. Click **Deploy > New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone** (required for the static site to POST to it without Google auth)
5. Click **Deploy**, authorize the script when prompted, and copy the resulting **Web app URL**.
6. Set that URL as the `NEXT_PUBLIC_SHEETS_ENDPOINT` value (see the main README for where this is configured for local dev and for the GitHub Actions build).
7. The first submission will create a "Submissions" sheet tab with a header row automatically.

If you ever change `Code.gs`, you must create a **new deployment version** (Deploy > Manage deployments > Edit > New version) for the change to take effect on the existing URL.
```

- [ ] **Step 3: Manually verify the webhook**

Deploy the script per the README above using a scratch/test Google Sheet, then run:

```bash
curl -X POST "<paste your Web app URL>" -H "Content-Type: text/plain" -d '{"playerName":"Test","characterName":"Testy","race":"human","subrace":null,"class":"fighter","subclass":"champion"}'
```

Expected: the response body is `{"ok":true}` and a new row appears in the "Submissions" tab with a timestamp, "Test", "Testy", "human", "", "fighter", "champion".

- [ ] **Step 4: Commit**

```bash
git add google-apps-script/Code.gs google-apps-script/README.md
git commit -m "docs: add Google Apps Script sheet-writing webhook"
```

---

### Task 7: Welcome and Race step components

**Files:**
- Create: `components/wizard/WelcomeStep.tsx`
- Create: `components/wizard/RaceStep.tsx`
- Test: `components/wizard/__tests__/WelcomeStep.test.tsx`
- Test: `components/wizard/__tests__/RaceStep.test.tsx`

**Interfaces:**
- Consumes: `RACES` from `@/lib/dnd-data`.
- Produces:
  - `function WelcomeStep(props: { playerName: string; onPlayerNameChange: (name: string) => void })`
  - `function RaceStep(props: { raceId: string | null; subraceId: string | null; onSelectRace: (raceId: string) => void; onSelectSubrace: (subraceId: string) => void })`
  - Both are presentational only — no navigation buttons; the Wizard orchestrator (Task 10) renders shared Back/Next buttons and calls these components' change handlers.

- [ ] **Step 1: Write the failing WelcomeStep test**

`components/wizard/__tests__/WelcomeStep.test.tsx`:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WelcomeStep } from "@/components/wizard/WelcomeStep";

describe("WelcomeStep", () => {
  it("shows the current player name and reports changes", async () => {
    const onPlayerNameChange = vi.fn();
    render(
      <WelcomeStep playerName="Sasha" onPlayerNameChange={onPlayerNameChange} />,
    );

    const input = screen.getByLabelText(/your name/i);
    expect(input).toHaveValue("Sasha");

    await userEvent.type(input, "!");
    expect(onPlayerNameChange).toHaveBeenLastCalledWith("Sasha!");
  });
});
```

- [ ] **Step 2: Write the failing RaceStep test**

`components/wizard/__tests__/RaceStep.test.tsx`:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RaceStep } from "@/components/wizard/RaceStep";

describe("RaceStep", () => {
  it("selects a race without subraces directly", async () => {
    const onSelectRace = vi.fn();
    const onSelectSubrace = vi.fn();
    render(
      <RaceStep
        raceId={null}
        subraceId={null}
        onSelectRace={onSelectRace}
        onSelectSubrace={onSelectSubrace}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: /human/i }));
    expect(onSelectRace).toHaveBeenCalledWith("human");
  });

  it("shows subrace options once a race with subraces is selected", () => {
    render(
      <RaceStep
        raceId="elf"
        subraceId={null}
        onSelectRace={vi.fn()}
        onSelectSubrace={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: /high elf/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /wood elf/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /drow/i })).toBeInTheDocument();
  });

  it("reports subrace selection", async () => {
    const onSelectSubrace = vi.fn();
    render(
      <RaceStep
        raceId="elf"
        subraceId={null}
        onSelectRace={vi.fn()}
        onSelectSubrace={onSelectSubrace}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: /wood elf/i }));
    expect(onSelectSubrace).toHaveBeenCalledWith("wood-elf");
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test -- WelcomeStep RaceStep`
Expected: FAIL with "Cannot find module '@/components/wizard/WelcomeStep'" and similar for RaceStep.

- [ ] **Step 4: Implement WelcomeStep**

`components/wizard/WelcomeStep.tsx`:

```tsx
"use client";

type WelcomeStepProps = {
  playerName: string;
  onPlayerNameChange: (name: string) => void;
};

export function WelcomeStep({ playerName, onPlayerNameChange }: WelcomeStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Build your character concept</h1>
      <p className="text-zinc-600">
        Answer a few questions about the kind of hero you want to play. No
        rules knowledge needed — we&apos;ll turn your answers into a race,
        class, and subclass for your GM to finish building your level 3
        character sheet.
      </p>
      <label className="flex flex-col gap-1" htmlFor="player-name">
        <span className="font-medium">Your name</span>
        <input
          id="player-name"
          aria-label="Your name"
          className="rounded border border-zinc-300 px-3 py-2"
          value={playerName}
          onChange={(e) => onPlayerNameChange(e.target.value)}
          placeholder="e.g. Sasha"
        />
      </label>
    </div>
  );
}
```

- [ ] **Step 5: Implement RaceStep**

`components/wizard/RaceStep.tsx`:

```tsx
"use client";

import { RACES } from "@/lib/dnd-data";

type RaceStepProps = {
  raceId: string | null;
  subraceId: string | null;
  onSelectRace: (raceId: string) => void;
  onSelectSubrace: (subraceId: string) => void;
};

export function RaceStep({
  raceId,
  subraceId,
  onSelectRace,
  onSelectSubrace,
}: RaceStepProps) {
  const selectedRace = RACES.find((r) => r.id === raceId);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Choose your race</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {RACES.map((race) => (
          <button
            key={race.id}
            type="button"
            onClick={() => onSelectRace(race.id)}
            className={`rounded border p-4 text-left transition-colors ${
              race.id === raceId
                ? "border-amber-600 bg-amber-50"
                : "border-zinc-300 hover:bg-zinc-50"
            }`}
          >
            <div className="font-medium">{race.name}</div>
            <div className="text-sm text-zinc-600">{race.blurb}</div>
          </button>
        ))}
      </div>

      {selectedRace?.subraces && (
        <div className="flex flex-col gap-3">
          <h3 className="font-medium">Choose your {selectedRace.name} lineage</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {selectedRace.subraces.map((subrace) => (
              <button
                key={subrace.id}
                type="button"
                onClick={() => onSelectSubrace(subrace.id)}
                className={`rounded border p-3 text-left transition-colors ${
                  subrace.id === subraceId
                    ? "border-amber-600 bg-amber-50"
                    : "border-zinc-300 hover:bg-zinc-50"
                }`}
              >
                <div className="font-medium">{subrace.name}</div>
                <div className="text-sm text-zinc-600">{subrace.blurb}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test -- WelcomeStep RaceStep`
Expected: PASS, all 4 tests passed.

- [ ] **Step 7: Commit**

```bash
git add components/wizard/WelcomeStep.tsx components/wizard/RaceStep.tsx components/wizard/__tests__/WelcomeStep.test.tsx components/wizard/__tests__/RaceStep.test.tsx
git commit -m "feat: add welcome and race wizard steps"
```

---

### Task 8: Flavor and Class step components

**Files:**
- Create: `components/wizard/FlavorStep.tsx`
- Create: `components/wizard/ClassStep.tsx`
- Test: `components/wizard/__tests__/FlavorStep.test.tsx`
- Test: `components/wizard/__tests__/ClassStep.test.tsx`

**Interfaces:**
- Consumes: `CombatRole`, `MagicInterest`, `SocialStyle`, `FlavorAnswers`, `scoreClasses` from `@/lib/scoring`; `CLASSES` from `@/lib/dnd-data`.
- Produces:
  - `function FlavorStep(props: { combatRole: CombatRole | null; magicInterest: MagicInterest | null; socialStyle: SocialStyle | null; onChange: (partial: Partial<FlavorAnswers>) => void })`
  - `function ClassStep(props: { classId: string | null; flavorAnswers: FlavorAnswers | null; onSelectClass: (classId: string) => void })` — when `flavorAnswers` is non-null, classes are ordered by `scoreClasses` and the top 3 get a "Recommended for you" badge; when null, classes render in their natural `CLASSES` order with no badges.

- [ ] **Step 1: Write the failing FlavorStep test**

`components/wizard/__tests__/FlavorStep.test.tsx`:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FlavorStep } from "@/components/wizard/FlavorStep";

describe("FlavorStep", () => {
  it("reports combat role, magic interest, and social style selections independently", async () => {
    const onChange = vi.fn();
    render(
      <FlavorStep
        combatRole={null}
        magicInterest={null}
        socialStyle={null}
        onChange={onChange}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: /melee/i }));
    expect(onChange).toHaveBeenCalledWith({ combatRole: "melee" });

    await userEvent.click(screen.getByRole("button", { name: /^a lot$/i }));
    expect(onChange).toHaveBeenCalledWith({ magicInterest: "lot" });

    await userEvent.click(screen.getByRole("button", { name: /leader/i }));
    expect(onChange).toHaveBeenCalledWith({ socialStyle: "leader" });
  });

  it("highlights the currently selected option in each group", () => {
    render(
      <FlavorStep
        combatRole="ranged"
        magicInterest={null}
        socialStyle={null}
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: /ranged/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: /melee/i })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });
});
```

- [ ] **Step 2: Write the failing ClassStep test**

`components/wizard/__tests__/ClassStep.test.tsx`:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClassStep } from "@/components/wizard/ClassStep";

describe("ClassStep", () => {
  it("renders all 12 classes even with no flavor answers", () => {
    render(
      <ClassStep classId={null} flavorAnswers={null} onSelectClass={vi.fn()} />,
    );
    expect(screen.getAllByRole("button")).toHaveLength(12);
  });

  it("marks the top-matching classes as recommended when flavor answers are present", () => {
    render(
      <ClassStep
        classId={null}
        flavorAnswers={{ combatRole: "melee", magicInterest: "none", socialStyle: "loner" }}
        onSelectClass={vi.fn()}
      />,
    );
    expect(screen.getAllByText(/recommended for you/i).length).toBeGreaterThan(0);
  });

  it("reports the selected class", async () => {
    const onSelectClass = vi.fn();
    render(
      <ClassStep classId={null} flavorAnswers={null} onSelectClass={onSelectClass} />,
    );
    await userEvent.click(screen.getByRole("button", { name: /wizard/i }));
    expect(onSelectClass).toHaveBeenCalledWith("wizard");
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test -- FlavorStep ClassStep`
Expected: FAIL with "Cannot find module" errors for both components.

- [ ] **Step 4: Implement FlavorStep**

`components/wizard/FlavorStep.tsx`:

```tsx
"use client";

import type { CombatRole, FlavorAnswers, MagicInterest, SocialStyle } from "@/lib/scoring";

type FlavorStepProps = {
  combatRole: CombatRole | null;
  magicInterest: MagicInterest | null;
  socialStyle: SocialStyle | null;
  onChange: (partial: Partial<FlavorAnswers>) => void;
};

const COMBAT_ROLE_OPTIONS: { value: CombatRole; label: string }[] = [
  { value: "melee", label: "Melee — right in the thick of it" },
  { value: "ranged", label: "Ranged — keep enemies at a distance" },
  { value: "support", label: "Support — heal and protect the party" },
  { value: "avoid", label: "Prefer to avoid combat" },
];

const MAGIC_INTEREST_OPTIONS: { value: MagicInterest; label: string }[] = [
  { value: "none", label: "None" },
  { value: "little", label: "A little" },
  { value: "lot", label: "A lot" },
];

const SOCIAL_STYLE_OPTIONS: { value: SocialStyle; label: string }[] = [
  { value: "leader", label: "Leader" },
  { value: "face", label: "Face-talker" },
  { value: "sneaky", label: "Sneaky" },
  { value: "loner", label: "Loner" },
];

function OptionGroup<T extends string>({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: { value: T; label: string }[];
  selected: T | null;
  onSelect: (value: T) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={option.value === selected}
            onClick={() => onSelect(option.value)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              option.value === selected
                ? "border-amber-600 bg-amber-50"
                : "border-zinc-300 hover:bg-zinc-50"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function FlavorStep({
  combatRole,
  magicInterest,
  socialStyle,
  onChange,
}: FlavorStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold">What's your playstyle?</h2>
      <OptionGroup
        title="How do you want to fight?"
        options={COMBAT_ROLE_OPTIONS}
        selected={combatRole}
        onSelect={(value) => onChange({ combatRole: value })}
      />
      <OptionGroup
        title="How interested are you in casting spells?"
        options={MAGIC_INTEREST_OPTIONS}
        selected={magicInterest}
        onSelect={(value) => onChange({ magicInterest: value })}
      />
      <OptionGroup
        title="What's your role in the group?"
        options={SOCIAL_STYLE_OPTIONS}
        selected={socialStyle}
        onSelect={(value) => onChange({ socialStyle: value })}
      />
    </div>
  );
}
```

- [ ] **Step 5: Implement ClassStep**

`components/wizard/ClassStep.tsx`:

```tsx
"use client";

import { CLASSES } from "@/lib/dnd-data";
import { scoreClasses, type FlavorAnswers } from "@/lib/scoring";

type ClassStepProps = {
  classId: string | null;
  flavorAnswers: FlavorAnswers | null;
  onSelectClass: (classId: string) => void;
};

const RECOMMENDED_COUNT = 3;

export function ClassStep({ classId, flavorAnswers, onSelectClass }: ClassStepProps) {
  const orderedClasses = flavorAnswers
    ? scoreClasses(flavorAnswers, CLASSES)
    : CLASSES;
  const recommendedIds = new Set(
    flavorAnswers
      ? orderedClasses.slice(0, RECOMMENDED_COUNT).map((c) => c.id)
      : [],
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Choose your class</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {orderedClasses.map((cls) => (
          <button
            key={cls.id}
            type="button"
            onClick={() => onSelectClass(cls.id)}
            className={`rounded border p-4 text-left transition-colors ${
              cls.id === classId
                ? "border-amber-600 bg-amber-50"
                : "border-zinc-300 hover:bg-zinc-50"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">{cls.name}</span>
              {recommendedIds.has(cls.id) && (
                <span className="rounded-full bg-amber-600 px-2 py-0.5 text-xs text-white">
                  Recommended for you
                </span>
              )}
            </div>
            <div className="text-sm text-zinc-600">{cls.blurb}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test -- FlavorStep ClassStep`
Expected: PASS, all 5 tests passed.

- [ ] **Step 7: Commit**

```bash
git add components/wizard/FlavorStep.tsx components/wizard/ClassStep.tsx components/wizard/__tests__/FlavorStep.test.tsx components/wizard/__tests__/ClassStep.test.tsx
git commit -m "feat: add flavor and class wizard steps"
```

---

### Task 9: Subclass and Summary step components

**Files:**
- Create: `components/wizard/SubclassStep.tsx`
- Create: `components/wizard/SummaryStep.tsx`
- Test: `components/wizard/__tests__/SubclassStep.test.tsx`
- Test: `components/wizard/__tests__/SummaryStep.test.tsx`

**Interfaces:**
- Consumes: `getClass`, `getRace` from `@/lib/dnd-data`; `WizardAnswers` from `@/lib/wizard-storage`.
- Produces:
  - `function SubclassStep(props: { classId: string; subclassId: string | null; onSelectSubclass: (subclassId: string) => void })` — has internal `showAll` state toggled by a "Show all subclasses" button.
  - `function SummaryStep(props: { answers: WizardAnswers; onCharacterNameChange: (name: string) => void })`

- [ ] **Step 1: Write the failing SubclassStep test**

`components/wizard/__tests__/SubclassStep.test.tsx`:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SubclassStep } from "@/components/wizard/SubclassStep";

describe("SubclassStep", () => {
  it("shows only the default subclasses initially", () => {
    render(
      <SubclassStep classId="fighter" subclassId={null} onSelectSubclass={vi.fn()} />,
    );
    expect(screen.getByRole("button", { name: /champion/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /arcane archer/i }),
    ).not.toBeInTheDocument();
  });

  it("reveals all subclasses after clicking the show-all toggle", async () => {
    render(
      <SubclassStep classId="fighter" subclassId={null} onSelectSubclass={vi.fn()} />,
    );
    await userEvent.click(screen.getByRole("button", { name: /show all subclasses/i }));
    expect(screen.getByRole("button", { name: /arcane archer/i })).toBeInTheDocument();
  });

  it("reports the selected subclass", async () => {
    const onSelectSubclass = vi.fn();
    render(
      <SubclassStep classId="fighter" subclassId={null} onSelectSubclass={onSelectSubclass} />,
    );
    await userEvent.click(screen.getByRole("button", { name: /champion/i }));
    expect(onSelectSubclass).toHaveBeenCalledWith("champion");
  });
});
```

- [ ] **Step 2: Write the failing SummaryStep test**

`components/wizard/__tests__/SummaryStep.test.tsx`:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SummaryStep } from "@/components/wizard/SummaryStep";
import { EMPTY_ANSWERS } from "@/lib/wizard-storage";

describe("SummaryStep", () => {
  it("recaps the chosen race, subrace, class, and subclass by name", () => {
    render(
      <SummaryStep
        answers={{
          ...EMPTY_ANSWERS,
          playerName: "Sasha",
          raceId: "elf",
          subraceId: "wood-elf",
          classId: "ranger",
          subclassId: "hunter",
        }}
        onCharacterNameChange={vi.fn()}
      />,
    );

    expect(screen.getByText(/wood elf/i)).toBeInTheDocument();
    expect(screen.getByText(/ranger/i)).toBeInTheDocument();
    expect(screen.getByText(/hunter/i)).toBeInTheDocument();
  });

  it("reports character name changes", async () => {
    const onCharacterNameChange = vi.fn();
    render(
      <SummaryStep
        answers={{ ...EMPTY_ANSWERS, raceId: "human", classId: "bard", subclassId: "lore" }}
        onCharacterNameChange={onCharacterNameChange}
      />,
    );

    await userEvent.type(screen.getByLabelText(/character name/i), "T");
    expect(onCharacterNameChange).toHaveBeenLastCalledWith("T");
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test -- SubclassStep SummaryStep`
Expected: FAIL with "Cannot find module" errors for both components.

- [ ] **Step 4: Implement SubclassStep**

`components/wizard/SubclassStep.tsx`:

```tsx
"use client";

import { useState } from "react";
import { getClass } from "@/lib/dnd-data";

type SubclassStepProps = {
  classId: string;
  subclassId: string | null;
  onSelectSubclass: (subclassId: string) => void;
};

export function SubclassStep({ classId, subclassId, onSelectSubclass }: SubclassStepProps) {
  const [showAll, setShowAll] = useState(false);
  const cls = getClass(classId);

  if (!cls) {
    return null;
  }

  const subclasses = showAll ? cls.allSubclasses : cls.defaultSubclasses;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Choose your {cls.name} subclass</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {subclasses.map((subclass) => (
          <button
            key={subclass.id}
            type="button"
            onClick={() => onSelectSubclass(subclass.id)}
            className={`rounded border p-4 text-left transition-colors ${
              subclass.id === subclassId
                ? "border-amber-600 bg-amber-50"
                : "border-zinc-300 hover:bg-zinc-50"
            }`}
          >
            <div className="font-medium">{subclass.name}</div>
            <div className="text-sm text-zinc-600">{subclass.blurb}</div>
          </button>
        ))}
      </div>
      {!showAll && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="self-start text-sm font-medium text-amber-700 underline"
        >
          Show all subclasses
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Implement SummaryStep**

`components/wizard/SummaryStep.tsx`:

```tsx
"use client";

import { getClass, getRace } from "@/lib/dnd-data";
import type { WizardAnswers } from "@/lib/wizard-storage";

type SummaryStepProps = {
  answers: WizardAnswers;
  onCharacterNameChange: (name: string) => void;
};

export function SummaryStep({ answers, onCharacterNameChange }: SummaryStepProps) {
  const race = answers.raceId ? getRace(answers.raceId) : undefined;
  const subrace = race?.subraces?.find((s) => s.id === answers.subraceId);
  const cls = answers.classId ? getClass(answers.classId) : undefined;
  const subclass = cls?.allSubclasses.find((s) => s.id === answers.subclassId);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Review your concept</h2>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
        <dt className="font-medium">Race</dt>
        <dd>{subrace ? `${subrace.name} (${race?.name})` : race?.name ?? "—"}</dd>
        <dt className="font-medium">Class</dt>
        <dd>{cls?.name ?? "—"}</dd>
        <dt className="font-medium">Subclass</dt>
        <dd>{subclass?.name ?? "—"}</dd>
      </dl>
      <label className="flex flex-col gap-1" htmlFor="character-name">
        <span className="font-medium">Character name</span>
        <input
          id="character-name"
          aria-label="Character name"
          className="rounded border border-zinc-300 px-3 py-2"
          value={answers.characterName}
          onChange={(e) => onCharacterNameChange(e.target.value)}
          placeholder="e.g. Thistle Fernwhisper"
        />
      </label>
    </div>
  );
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test -- SubclassStep SummaryStep`
Expected: PASS, all 5 tests passed.

- [ ] **Step 7: Commit**

```bash
git add components/wizard/SubclassStep.tsx components/wizard/SummaryStep.tsx components/wizard/__tests__/SubclassStep.test.tsx components/wizard/__tests__/SummaryStep.test.tsx
git commit -m "feat: add subclass and summary wizard steps"
```

---

### Task 10: Wizard orchestrator

**Files:**
- Create: `components/wizard/Wizard.tsx`
- Test: `components/wizard/__tests__/Wizard.test.tsx`

**Interfaces:**
- Consumes: `WelcomeStep`, `RaceStep`, `FlavorStep`, `ClassStep`, `SubclassStep`, `SummaryStep` (Tasks 7–9); `loadAnswers`, `saveAnswers`, `clearAnswers`, `EMPTY_ANSWERS`, `WizardAnswers` from `@/lib/wizard-storage`; `submitConcept` from `@/lib/submit`; `getRace` from `@/lib/dnd-data`.
- Produces: `function Wizard()` — a self-contained default export usable directly in a page. No props; all state is internal.

- [ ] **Step 1: Write the failing test**

`components/wizard/__tests__/Wizard.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Wizard } from "@/components/wizard/Wizard";
import * as submitModule from "@/lib/submit";

describe("Wizard", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("blocks advancing past Welcome until a player name is entered", async () => {
    render(<Wizard />);
    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();

    await userEvent.type(screen.getByLabelText(/your name/i), "Sasha");
    expect(screen.getByRole("button", { name: /next/i })).toBeEnabled();
  });

  it("walks forward through race, flavor, class, and subclass to the summary, and back again", async () => {
    render(<Wizard />);

    await userEvent.type(screen.getByLabelText(/your name/i), "Sasha");
    await userEvent.click(screen.getByRole("button", { name: /next/i }));

    // Race step: human has no subrace, so Next should be enabled right after picking it.
    await userEvent.click(screen.getByRole("button", { name: /^human$/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));

    // Flavor step
    await userEvent.click(screen.getByRole("button", { name: /melee/i }));
    await userEvent.click(screen.getByRole("button", { name: /^none$/i }));
    await userEvent.click(screen.getByRole("button", { name: /loner/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));

    // Class step
    await userEvent.click(screen.getByRole("button", { name: /fighter/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));

    // Subclass step
    await userEvent.click(screen.getByRole("button", { name: /champion/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));

    expect(screen.getByText(/review your concept/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /back/i }));
    expect(screen.getByText(/choose your fighter subclass/i)).toBeInTheDocument();
  });

  it("submits the concept and shows a confirmation on success", async () => {
    vi.spyOn(submitModule, "submitConcept").mockResolvedValue({ ok: true });
    render(<Wizard />);

    await userEvent.type(screen.getByLabelText(/your name/i), "Sasha");
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /^human$/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /melee/i }));
    await userEvent.click(screen.getByRole("button", { name: /^none$/i }));
    await userEvent.click(screen.getByRole("button", { name: /loner/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /fighter/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    await userEvent.click(screen.getByRole("button", { name: /champion/i }));
    await userEvent.click(screen.getByRole("button", { name: /next/i }));

    await userEvent.type(screen.getByLabelText(/character name/i), "Torren");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText(/your concept has been submitted/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- Wizard.test`
Expected: FAIL with "Cannot find module '@/components/wizard/Wizard'".

- [ ] **Step 3: Implement the Wizard orchestrator**

`components/wizard/Wizard.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { WelcomeStep } from "@/components/wizard/WelcomeStep";
import { RaceStep } from "@/components/wizard/RaceStep";
import { FlavorStep } from "@/components/wizard/FlavorStep";
import { ClassStep } from "@/components/wizard/ClassStep";
import { SubclassStep } from "@/components/wizard/SubclassStep";
import { SummaryStep } from "@/components/wizard/SummaryStep";
import { getRace } from "@/lib/dnd-data";
import {
  EMPTY_ANSWERS,
  loadAnswers,
  saveAnswers,
  clearAnswers,
  type WizardAnswers,
} from "@/lib/wizard-storage";
import { submitConcept } from "@/lib/submit";

const STEPS = ["welcome", "race", "flavor", "class", "subclass", "summary"] as const;
type Step = (typeof STEPS)[number];

function canAdvance(step: Step, answers: WizardAnswers): boolean {
  switch (step) {
    case "welcome":
      return answers.playerName.trim().length > 0;
    case "race": {
      const race = answers.raceId ? getRace(answers.raceId) : undefined;
      if (!race) return false;
      return race.subraces ? Boolean(answers.subraceId) : true;
    }
    case "flavor":
      return Boolean(
        answers.combatRole && answers.magicInterest && answers.socialStyle,
      );
    case "class":
      return Boolean(answers.classId);
    case "subclass":
      return Boolean(answers.subclassId);
    case "summary":
      return answers.characterName.trim().length > 0;
  }
}

export function Wizard() {
  const [step, setStep] = useState<Step>("welcome");
  const [answers, setAnswers] = useState<WizardAnswers>(EMPTY_ANSWERS);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setAnswers(loadAnswers());
  }, []);

  useEffect(() => {
    if (status !== "success") {
      saveAnswers(answers);
    }
  }, [answers, status]);

  function updateAnswers(partial: Partial<WizardAnswers>) {
    setAnswers((prev) => ({ ...prev, ...partial }));
  }

  const stepIndex = STEPS.indexOf(step);

  function goBack() {
    if (stepIndex > 0) {
      setStep(STEPS[stepIndex - 1]);
    }
  }

  async function goNext() {
    if (step === "summary") {
      setStatus("submitting");
      setErrorMessage(null);
      const result = await submitConcept(answers);
      if (result.ok) {
        setStatus("success");
        clearAnswers();
      } else {
        setStatus("error");
        setErrorMessage(result.error);
      }
      return;
    }
    if (stepIndex < STEPS.length - 1) {
      setStep(STEPS[stepIndex + 1]);
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Thanks, {answers.playerName}!</h1>
        <p>Your concept has been submitted. Your GM will follow up with your full character sheet.</p>
      </div>
    );
  }

  const flavorAnswers =
    answers.combatRole && answers.magicInterest && answers.socialStyle
      ? {
          combatRole: answers.combatRole,
          magicInterest: answers.magicInterest,
          socialStyle: answers.socialStyle,
        }
      : null;

  return (
    <div className="flex flex-col gap-6">
      {step === "welcome" && (
        <WelcomeStep
          playerName={answers.playerName}
          onPlayerNameChange={(playerName) => updateAnswers({ playerName })}
        />
      )}
      {step === "race" && (
        <RaceStep
          raceId={answers.raceId}
          subraceId={answers.subraceId}
          onSelectRace={(raceId) => updateAnswers({ raceId, subraceId: null })}
          onSelectSubrace={(subraceId) => updateAnswers({ subraceId })}
        />
      )}
      {step === "flavor" && (
        <FlavorStep
          combatRole={answers.combatRole}
          magicInterest={answers.magicInterest}
          socialStyle={answers.socialStyle}
          onChange={(partial) => updateAnswers(partial)}
        />
      )}
      {step === "class" && (
        <ClassStep
          classId={answers.classId}
          flavorAnswers={flavorAnswers}
          onSelectClass={(classId) => updateAnswers({ classId, subclassId: null })}
        />
      )}
      {step === "subclass" && answers.classId && (
        <SubclassStep
          classId={answers.classId}
          subclassId={answers.subclassId}
          onSelectSubclass={(subclassId) => updateAnswers({ subclassId })}
        />
      )}
      {step === "summary" && (
        <SummaryStep
          answers={answers}
          onCharacterNameChange={(characterName) => updateAnswers({ characterName })}
        />
      )}

      {status === "error" && (
        <p role="alert" className="text-red-600">
          Something went wrong submitting your concept: {errorMessage}. Please try again.
        </p>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={stepIndex === 0}
          className="rounded border border-zinc-300 px-4 py-2 disabled:opacity-40"
        >
          Back
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={!canAdvance(step, answers) || status === "submitting"}
          className="rounded bg-amber-600 px-4 py-2 text-white disabled:opacity-40"
        >
          {step === "summary" ? (status === "submitting" ? "Submitting…" : "Submit") : "Next"}
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- Wizard.test`
Expected: PASS, all 3 tests passed.

- [ ] **Step 5: Run the full test suite to confirm no regressions**

Run: `npm test`
Expected: PASS, all test files green.

- [ ] **Step 6: Commit**

```bash
git add components/wizard/Wizard.tsx components/wizard/__tests__/Wizard.test.tsx
git commit -m "feat: add wizard orchestrator with navigation and submission"
```

---

### Task 11: Wire into the app, static export, and GitHub Pages deploy

**Files:**
- Modify: `app/page.tsx`
- Modify: `next.config.ts`
- Create: `.env.local.example`
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: `Wizard` from `@/components/wizard/Wizard`.
- Produces: a deployable static site under `out/` on `npm run build`, and a GitHub Actions workflow that builds and publishes it to GitHub Pages on push to `main`.

- [ ] **Step 1: Replace the default page with the Wizard**

Replace the full contents of `app/page.tsx`:

```tsx
import { Wizard } from "@/components/wizard/Wizard";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 px-4 py-12">
      <Wizard />
    </main>
  );
}
```

- [ ] **Step 2: Configure static export for GitHub Pages**

Replace the full contents of `next.config.ts`:

```ts
import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "dnd-selector";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubActions ? `/${repoName}` : "",
};

export default nextConfig;
```

- [ ] **Step 3: Document the required environment variable**

`.env.local.example`:

```
# URL from google-apps-script/README.md step 5 (Deploy > New deployment)
NEXT_PUBLIC_SHEETS_ENDPOINT=https://script.google.com/macros/s/PLACEHOLDER/exec
```

- [ ] **Step 4: Add the GitHub Actions deploy workflow**

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch: {}

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
        env:
          NEXT_PUBLIC_SHEETS_ENDPOINT: ${{ secrets.NEXT_PUBLIC_SHEETS_ENDPOINT }}
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: PASS, all test files green.

- [ ] **Step 6: Build the static export locally**

Run: `NEXT_PUBLIC_SHEETS_ENDPOINT=https://example.com/exec npm run build`
Expected: build succeeds and produces an `out/` directory.

- [ ] **Step 7: Commit**

```bash
git add app/page.tsx next.config.ts .env.local.example .github/workflows/deploy.yml
git commit -m "feat: wire wizard into app and add GitHub Pages deploy workflow"
```

---

### Task 12: README and end-to-end manual verification

**Files:**
- Modify: `README.md`

**Interfaces:** None — documentation and manual verification only.

- [ ] **Step 1: Update the README**

Replace the full contents of `README.md`:

```markdown
# D&D Character Concept Builder

A small wizard app for a private D&D group: players answer flavor-first
questions and land on a race, subrace, class, and subclass concept for a
level 3 character. Submissions are appended to a Google Sheet so the GM can
finish each player's full character sheet.

## Local development

```bash
npm install
cp .env.local.example .env.local   # fill in your Apps Script URL, see below
npm run dev
```

## Running tests

```bash
npm test          # single run
npm run test:watch
```

## Google Sheets submission endpoint

See `google-apps-script/README.md` for deploying the Apps Script webhook
that receives submissions and appends them (with a timestamp) to a sheet.
Once deployed, set the resulting URL as `NEXT_PUBLIC_SHEETS_ENDPOINT`:

- Locally: in `.env.local`
- In CI/deploy: as the `NEXT_PUBLIC_SHEETS_ENDPOINT` repository secret, used
  by `.github/workflows/deploy.yml`

## Deploying to GitHub Pages

Push to `main` — the `deploy.yml` workflow builds a static export
(`output: 'export'` in `next.config.ts`) and publishes it to GitHub Pages.
Make sure GitHub Pages is set to the **GitHub Actions** source under
Settings > Pages, and that the `NEXT_PUBLIC_SHEETS_ENDPOINT` secret is set
under Settings > Secrets and variables > Actions.
```

- [ ] **Step 2: Commit the README**

```bash
git add README.md
git commit -m "docs: document setup, testing, and deployment"
```

- [ ] **Step 3: Manually verify the full flow locally**

Run: `npm run dev`, open the local URL, and click through: enter a player
name, pick a race with a subrace (e.g. Elf → Wood Elf) and one without
(e.g. Human on a second run), answer the three flavor questions, confirm
recommended classes appear highlighted, pick a class, expand "Show all
subclasses" at least once, pick a subclass, enter a character name, and
submit. Confirm the success message appears and a corresponding row lands
in the test Google Sheet from Task 6's manual verification.

- [ ] **Step 4: Manually verify back navigation and persistence**

Restart the flow, advance to the Class step, refresh the browser tab, and
confirm your race/flavor answers are still filled in (loaded from
`localStorage`). Click Back from Class through to Welcome and confirm every
earlier answer is still shown and editable.
