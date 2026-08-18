const SUBMISSIONS_SHEET_NAME = "Submissions";
const SUBMISSIONS_HEADER_ROW = [
  "Timestamp",
  "Player Name",
  "Effort Level",
  "Character Name",
  "Race",
  "Subrace",
  "Class",
  "Subclass",
  "Enemy Hook",
  "Ability Score Guidance",
  "Ability Score Method",
  "STR",
  "DEX",
  "CON",
  "INT",
  "WIS",
  "CHA",
  "Spell Choice Mode",
];

const SPELL_LISTS_SHEET_NAME = "Spell Lists";
const SPELL_LISTS_HEADER_ROW = [
  "Timestamp",
  "Player Name",
  "Class",
  "Cantrips",
  "Spells",
];

function getOrCreateSheet_(name, headerRow) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
    sheet.appendRow(headerRow);
  }
  return sheet;
}

function appendSubmission_(data) {
  const sheet = getOrCreateSheet_(SUBMISSIONS_SHEET_NAME, SUBMISSIONS_HEADER_ROW);
  sheet.appendRow([
    new Date(),
    data.playerName || "",
    data.effortLevel || "",
    data.characterName || "",
    data.race || "",
    data.subrace || "",
    data.class || "",
    data.subclass || "",
    data.enemyHook || "",
    data.abilityScoreGuidance || "",
    data.abilityScoreMethod || "",
    data.abilityScoreStr ?? "",
    data.abilityScoreDex ?? "",
    data.abilityScoreCon ?? "",
    data.abilityScoreInt ?? "",
    data.abilityScoreWis ?? "",
    data.abilityScoreCha ?? "",
    data.spellChoiceMode || "",
  ]);
}

function appendSpellList_(data) {
  const sheet = getOrCreateSheet_(SPELL_LISTS_SHEET_NAME, SPELL_LISTS_HEADER_ROW);
  sheet.appendRow([
    new Date(),
    data.playerName || "",
    data.class || "",
    (data.cantrips || []).join(", "),
    (data.spells || []).join(", "),
  ]);
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  if (data.type === "spellList") {
    appendSpellList_(data);
  } else {
    appendSubmission_(data);
  }

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true }),
  ).setMimeType(ContentService.MimeType.JSON);
}
