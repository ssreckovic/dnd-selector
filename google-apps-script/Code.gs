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
