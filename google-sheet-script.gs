/**
 * =======================================================================
 * 💍 HANISHA & RONISH WEDDING — GOOGLE SHEETS RSVP WEBHOOK SCRIPT
 * =======================================================================
 * 
 * FEATURES:
 * - Automatically records new RSVPs into Google Sheets.
 * - SMART IN-PLACE EDITING: When a guest edits their RSVP on the website,
 *   it automatically finds their existing row (by Email or Name)
 *   and UPDATES the same row in-place instead of creating duplicate lines!
 * 
 * 1. CLICK "RUN" IN APPS SCRIPT:
 *    - Select "setupSheet" from the toolbar dropdown and click "Run".
 *    - It will initialize Row 1 with Royal Maroon headers and insert a test row.
 * 
 * 2. DEPLOY AS WEBHOOK:
 *    - Click "Deploy" (top right) -> "Manage deployments".
 *    - Click the ✏️ pencil icon (Edit) on the active deployment.
 *    - Select Version: "New version".
 *    - Ensure:
 *        * Execute as: "Me"
 *        * Who has access: "Anyone" (CRITICAL: Do NOT choose "Only myself")
 *    - Click "Deploy".
 * =======================================================================
 */

// RSVP Columns Definition (10 Columns)
var HEADERS = [
  "Timestamp",
  "Guest Name",
  "Email / Contact",
  "Total Guests",
  "Sangeet",
  "Haldi",
  "Pellikoduku & Pellikuthuru",
  "Wedding Ceremony",
  "Attending Events",
  "Warm Wishes / Notes"
];

/**
 * Searches the sheet to find an existing row for this guest.
 * Returns the 1-based row number (e.g. 2, 3...) if found, or -1 if new.
 */
function findExistingRowIndex(sheet, data) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return -1; // Only header row or empty

  // Read columns A to D (Timestamp, Name, Email, Total Guests) for rows 2 to lastRow
  var values = sheet.getRange(2, 1, lastRow - 1, Math.min(sheet.getLastColumn(), 6)).getValues();

  var targetEmail = data.email && data.email !== "-" ? String(data.email).trim().toLowerCase() : "";
  var targetOrigEmail = data.original_email && data.original_email !== "-" ? String(data.original_email).trim().toLowerCase() : "";
  var targetName = data.name && data.name !== "-" ? String(data.name).trim().toLowerCase().replace(/\s+/g, " ") : "";
  var targetOrigName = data.original_name && data.original_name !== "-" ? String(data.original_name).trim().toLowerCase().replace(/\s+/g, " ") : "";

  // 1. Primary check: Email match (searches newest rows first)
  if (targetEmail || targetOrigEmail) {
    for (var j = values.length - 1; j >= 0; j--) {
      for (var col = 0; col < values[j].length; col++) {
        var cellVal = String(values[j][col]).trim().toLowerCase();
        if (cellVal && cellVal.includes("@") && cellVal !== "-") {
          if (cellVal === targetEmail || (targetOrigEmail && cellVal === targetOrigEmail)) {
            return j + 2; // Convert 0-based array index to 1-based sheet row
          }
        }
      }
    }
  }

  // 2. Secondary check: Guest Name match
  if (targetName || targetOrigName) {
    for (var k = values.length - 1; k >= 0; k--) {
      var rowName = String(values[k][1]).trim().toLowerCase().replace(/\s+/g, " ");
      if (rowName && rowName.length > 2 && (rowName === targetName || (targetOrigName && rowName === targetOrigName))) {
        return k + 2;
      }
    }
  }

  return -1; // New RSVP
}

/**
 * MAIN SETUP FUNCTION
 * Run this from Apps Script editor to initialize headers and insert a sample test row!
 */
function setupSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // 1. Write the 10 Column Headers to Row 1
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  
  // 2. Format Header Row with Royal Maroon & White text
  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#7D0A0A"); // Royal Maroon
  headerRange.setFontColor("#FFFFFF");  // Crisp White
  headerRange.setHorizontalAlignment("center");
  sheet.setFrozenRows(1);
  
  // 3. Set column widths for clean readability
  sheet.setColumnWidth(1, 160); // Timestamp
  sheet.setColumnWidth(2, 180); // Guest Name
  sheet.setColumnWidth(3, 200); // Email / Contact
  sheet.setColumnWidth(4, 110); // Total Guests
  sheet.setColumnWidth(5, 110); // Sangeet
  sheet.setColumnWidth(6, 110); // Haldi
  sheet.setColumnWidth(7, 190); // Pellikoduku & Pellikuthuru
  sheet.setColumnWidth(8, 150); // Wedding Ceremony
  sheet.setColumnWidth(9, 200); // Attending Events
  sheet.setColumnWidth(10, 260); // Warm Wishes / Notes

  // 4. Add a Sample Test RSVP row
  var testRow = [
    new Date().toLocaleString("en-US", { timeZone: "America/Chicago" }),
    "Test Guest (Sample RSVP)",
    "hanisha.guest@example.com",
    2,
    "Yes",
    "Yes",
    "Yes",
    "Yes",
    "Sangeet, Haldi, Pellikoduku & Pellikuthuru, Wedding Ceremony",
    "Heartiest congratulations to Hanisha & Ronish!"
  ];
  
  sheet.appendRow(testRow);
  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 1, 1, testRow.length).setVerticalAlignment("middle");
  sheet.getRange(lastRow, 4, 1, 5).setHorizontalAlignment("center");

  Logger.log("🎉 SUCCESS! Row 1 headers updated and sample test row added at row " + lastRow);
  return "SUCCESS: Row 1 headers updated and sample test row added at row " + lastRow;
}

// Aliases so clicking "Run" on any selected function works seamlessly
function setupHeaders(sheet) {
  return setupSheet();
}

// Ensures headers exist when webhooks arrive from the live website
function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0 || sheet.getRange(1, 1).getValue() === "") {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#7D0A0A");
    headerRange.setFontColor("#FFFFFF");
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
  }
}

// Handles RSVP submissions and edits from the wedding website
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    ensureHeaders(sheet);
    
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Extract fields matching the website RSVP form
    var baseTimestamp = data.timestamp || new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });
    var name = data.name || "-";
    var email = (data.email && String(data.email).trim() !== "" && data.email !== "-") ? String(data.email).trim() : (data.contact || "-");
    var guestCount = data.guest_count !== undefined ? data.guest_count : (data.total_guests !== undefined ? data.total_guests : 1);
    
    var sangeet = data.sangeet || "No";
    var haldi = data.haldi || "No";
    var pellikoduku = data.pellikoduku || "No";
    var wedding = data.wedding || "No";
    var attending = data.attending_events || "-";
    var note = data.note || data.warm_wishes || "-";

    // Check if this guest already submitted earlier (find existing row)
    var existingRow = findExistingRowIndex(sheet, data);
    var targetRow = existingRow > 0 ? existingRow : (sheet.getLastRow() + 1);

    // If updating, mark timestamp as edited
    var timestamp = existingRow > 0 ? (baseTimestamp + " (Edited)") : baseTimestamp;

    var row = [
      timestamp,
      name,
      email,
      Number(guestCount),
      sangeet,
      haldi,
      pellikoduku,
      wedding,
      attending,
      note
    ];
    
    if (existingRow > 0) {
      // UPDATE THE EXACT SAME LINE IN-PLACE (no extra row created!)
      sheet.getRange(targetRow, 1, 1, row.length).setValues([row]);
    } else {
      // NEW GUEST: Append a new row
      sheet.appendRow(row);
      targetRow = sheet.getLastRow();
    }
    
    sheet.getRange(targetRow, 1, 1, row.length).setVerticalAlignment("middle");
    sheet.getRange(targetRow, 4, 1, 5).setHorizontalAlignment("center");

    var actionTaken = existingRow > 0 ? "updated" : "created";
    Logger.log("RSVP " + actionTaken + " successfully at row " + targetRow + " for " + name);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      action: actionTaken,
      message: existingRow > 0 ? "RSVP updated in same row in Google Sheets" : "RSVP recorded in Google Sheets",
      name: name,
      rowNumber: targetRow
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error in doPost: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

// Health check endpoint for testing in browser
function doGet(e) {
  return ContentService.createTextOutput("💍 Hanisha & Ronish RSVP Google Sheets Webhook is ACTIVE and connected! Ready to receive RSVPs.")
    .setMimeType(ContentService.MimeType.TEXT);
}

// Test function to run directly from Google Apps Script editor
function testRsvpSubmission() {
  setupSheet();
  
  // Test editing the sample row in-place
  var dummyUpdate = {
    postData: {
      contents: JSON.stringify({
        is_update: true,
        name: "Test Guest (Sample RSVP)",
        email: "hanisha.guest@example.com",
        original_email: "hanisha.guest@example.com",
        guest_count: 4,
        sangeet: "Yes",
        haldi: "Yes",
        pellikoduku: "Yes",
        wedding: "Yes",
        attending_events: "Sangeet, Haldi, Pellikoduku & Pellikuthuru, Wedding Ceremony",
        note: "Updated attendance to 4 guests — verified in-place update!"
      })
    }
  };
  
  var result = doPost(dummyUpdate);
  Logger.log("Update result: " + result.getContent());
  return result.getContent();
}
