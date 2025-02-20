function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const email = payload.email;

    // Validate email
    if (!email || !validateEmail(email)) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, message: "Invalid email provided" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = getOrCreateSheet("Emails");

    // Check if the sheet contains any data beyond the header row
    let existingEmails = [];
    const lastRow = sheet.getLastRow();

    if (lastRow > 1) {
      const range = sheet.getRange(2, 1, lastRow - 1, 1); // Get range of emails
      existingEmails = range.getValues().flat();
    }

    if (existingEmails.includes(email)) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, message: "Email already exists" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // Append the new email and timestamp
    sheet.appendRow([email, new Date().toISOString()]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: "Email added successfully" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}


// Validates an email address using a regex pattern.

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


// Gets or creates a Google Sheet with the specified name.

function getOrCreateSheet(sheetName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(sheetName);

  // Create the sheet if it doesn't exist
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.appendRow(["Email", "Timestamp"]); // Header row
  }

  return sheet;
}
