/**
 * Pink Poop Diary - Google Apps Script Backend (v2.1)
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a Google Sheet.
 * 2. Rename the tab (worksheet) to "pinkpoop".
 * 3. Set headers in Row 1: 
 *    A1: date | B1: poop_shape | C1: mood | D1: memo
 * 4. Extensions > Apps Script > Paste this code.
 * 5. Deploy > New Deployment > Web App > Who has access: Anyone.
 */

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000); // Wait up to 10s for concurrent requests

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // 1. Sheet Configuration
    // Target specific sheet 'pinkpoop', fallback to first sheet if missing
    let sheet = ss.getSheetByName('pinkpoop');
    if (!sheet) {
      sheet = ss.getSheets()[0];
    }

    // 2. Parse Frontend Data
    // Expecting JSON: { poop_shape, mood, memo }
    const data = JSON.parse(e.postData.contents);

    // 3. Server-side Date Generation (Column A)
    // Strictly using server time with specified locale/timezone
    const timestamp = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });

    // 4. Append Row
    // Mapping to Columns A, B, C, D
    sheet.appendRow([
      timestamp,       // Column A: date (Server Generated)
      data.poop_shape, // Column B: poop_shape
      data.mood,       // Column C: mood
      data.memo        // Column D: memo
    ]);

    // Return Success JSON
    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Sheet Configuration
  let sheet = ss.getSheetByName('pinkpoop');
  if (!sheet) {
    sheet = ss.getSheets()[0];
  }

  // 2. Read Data
  const lastRow = sheet.getLastRow();
  
  // Return empty array if only header exists or sheet is empty
  if (lastRow < 2) {
    return ContentService.createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Get range: Row 2 to Last Row, Columns 1(A) to 4(D)
  const range = sheet.getRange(2, 1, lastRow - 1, 4);
  const values = range.getValues();

  // 3. Map to JSON Structure
  const result = values.map(row => ({
    date: row[0],       // Col A
    poop_shape: row[1], // Col B
    mood: row[2],       // Col C
    memo: row[3]        // Col D
  }));

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}