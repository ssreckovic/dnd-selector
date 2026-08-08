# D&D 5e Character Concept Builder — Design

## Purpose

A small web app for a private group of D&D newcomers (some coming from Baldur's Gate 3, not tabletop) to walk through a guided, flavor-first series of choices and land on a character *concept*: race/subrace, class, and subclass, for a level 3 character. It does not generate a full mechanical sheet — ability scores, HP, spells, and equipment are filled in by the GM (the user) afterward using the submitted concept as a starting point. Mechanical depth (stats/feats) may be added in a future iteration, but is explicitly out of scope now.

## Architecture

- **Next.js**, static export (`output: 'export'` in `next.config`), hosted on GitHub Pages.
- Single-page wizard: one route, step index held in React state. No per-step routing — avoids GitHub Pages/static-export complications with dynamic routes and basePath.
- Answers persist to `localStorage` as the player progresses, so a refresh or closed tab doesn't lose progress. Cleared after a successful submission.
- Back navigation is available from any step after Welcome; previous answers stay editable.
- On final submit, the full answer set is POSTed to a **Google Apps Script Web App** URL. The Apps Script (deployed separately, owned by the user) appends a row to a Google Sheet, adding a server-side timestamp column. Every submission is a new row — no dedup/merge logic; the user filters/sorts by timestamp in Sheets to find the latest submission per player.
- No authentication, no database, no server code beyond the Apps Script endpoint.

## Data Model (submission payload)

| Field | Notes |
|---|---|
| `playerName` | required, free text |
| `characterName` | required, free text |
| `race` | one of the Core 8 |
| `subrace` | optional, only for races with subraces |
| `class` | one of the 12 core classes |
| `subclass` | one of the curated or full list for that class |
| `timestamp` | added by the Apps Script on receipt, not sent by client |

Flavor-question answers (combat role, magic interest, social style) are used client-side only to influence class ordering/highlighting; they are not persisted to the sheet since they're not part of the requested concept fields (race/class/subclass/character name).

## Flow Steps

1. **Welcome** — short intro to the tool, `playerName` input.
2. **Race** — Core 8: Human, Elf (High/Wood/Drow), Dwarf (Hill/Mountain), Halfling, Half-Elf, Tiefling, Half-Orc, Dragonborn. Each option shows a one-paragraph, jargon-free flavor blurb (no ability-score bonuses or mechanical text).
3. **Flavor questions** (3 single-select questions, no free text):
   - Combat role: melee / ranged / support / prefer to avoid combat
   - Magic interest: none / a little / a lot
   - Social style: leader / face-talker / sneaky / loner
4. **Class** — all 12 classes always shown (never filtered out), but re-ordered so classes matching the flavor answers surface first, with a subtle "recommended for you" marker on the top matches. Each class has a short blurb in plain English.
5. **Subclass** — curated default list per class (see below), each with a one-line flavor description. A "Show all subclasses" link/toggle reveals the full official subclass list for that class.
6. **Summary + Submit** — recap of every choice, `characterName` input, confirm button → POST to the Apps Script endpoint. On success, show a confirmation screen and clear localStorage; on network failure, show an error and let them retry without losing answers.

## Curated Subclass Defaults

Two to three iconic, PHB-only subclasses per class, chosen for name recognition and being illustrative of the class's main playstyles:

- **Barbarian:** Path of the Berserker, Path of the Totem Warrior
- **Bard:** College of Lore, College of Valor
- **Cleric:** Life Domain, Light Domain, War Domain
- **Druid:** Circle of the Land, Circle of the Moon
- **Fighter:** Champion, Battle Master, Eldritch Knight
- **Monk:** Way of the Open Hand, Way of Shadow
- **Paladin:** Oath of Devotion, Oath of Vengeance
- **Ranger:** Hunter, Beast Master
- **Rogue:** Thief, Assassin, Arcane Trickster
- **Sorcerer:** Draconic Bloodline, Wild Magic
- **Warlock:** The Fiend, The Archfey
- **Wizard:** School of Evocation, School of Abjuration

"Show all subclasses" reveals the complete official PHB+ subclass list for that class (exact non-default list to be finalized during implementation, sourced from open 5e reference data).

## Class ↔ Flavor Matching (indicative, refined during implementation)

Flavor answers score each class; classes are sorted by score, ties broken by original list order. Rough mapping:
- Melee + no magic → Fighter, Barbarian, Rogue, Monk
- Melee + some/a lot of magic → Paladin, Ranger
- Ranged → Ranger, Rogue, Fighter
- Support + a lot of magic → Cleric, Druid, Bard
- Avoid combat + a lot of magic → Wizard, Sorcerer, Warlock, Bard
- Social style nudges: leader → Paladin/Bard/Cleric; face-talker → Bard/Sorcerer/Warlock; sneaky → Rogue/Ranger; loner → Druid/Ranger/Barbarian

This is a soft ordering/highlighting signal only — every class remains selectable regardless of match score.

## Styling

Lightweight fantasy-adjacent theme (parchment/ink color palette, a serif display font for headings), built with Tailwind CSS for speed. No heavy illustration assets — keep it "quick and dirty" per the stated goal.

## Error Handling

- Required fields (player name, character name) block advancing/submitting with inline validation messages.
- Submission network failure shows a retry option; answers remain in state/localStorage.
- No handling needed for concurrent submissions or rate limiting — private, small-group use.

## Testing

- Component-level tests for the wizard's step logic (advance/back, validation gating) and the flavor-to-class scoring function, using the project's existing test setup if present, otherwise a minimal Vitest + React Testing Library setup.
- Manual verification of the static export running locally (`next build` with `output: 'export'`) and a real end-to-end submission to a test Google Sheet before hooking up the real one.

## Out of Scope (this iteration)

- Ability scores, HP, skills/proficiencies, spells, equipment, feats.
- Any account/auth system.
- Automatic latest-submission detection or dedup in the sheet.
- Non-Core-8 races, non-PHB subclasses in the default (non-toggled) view.
