
/**
 * Google Apps Script Web App to receive RSVP JSON and log to Google Sheets + email notification.
 *
 * Setup:
 * 1) Create a Google Sheet and get its ID (from the URL).
 * 2) Paste this script in Apps Script (Extensions → Apps Script) and set the SHEET_ID.
 * 3) Deploy → New deployment → Type: Web app.
 *    - Description: RSVP endpoint
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    Copy the Web app URL and paste it into CONFIG.rsvp.endpoint in your index.html.
 */

const SHEET_ID = 'PUT_YOUR_SHEET_ID_HERE'; // e.g., 1AbC... from the Sheet URL
const SHEET_NAME = 'RSVP_Responses';
const NOTIFY_EMAIL = 'your_email@example.com'; // change to your email(s). For multiple, use 'a@x.com, b@y.com'

function doPost(e) {
  try {
    const body = e.postData && e.postData.contents ? e.postData.contents : '{}';
    const data = JSON.parse(body);

    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

    // Ensure header
    const header = ['Timestamp','Name','Attendance','Guests','Diet','Message','User Agent','IP'];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(header);
    }

    // Append row
    const ua = e && e.parameter ? e.parameter['user-agent'] : '';
    const ip = e && e.parameter ? e.parameter['X-Forwarded-For'] : '';
    const row = [
      new Date(),
      data.name || '',
      data.attendance || '',
      data.guests || '',
      data.diet || '',
      data.message || '',
      ua,
      ip
    ];
    sheet.appendRow(row);

    // Email notification
    if (NOTIFY_EMAIL && NOTIFY_EMAIL.indexOf('@') > -1) {
      const subject = `New RSVP: ${data.name || 'Guest'}`;
      const msg = `A new RSVP has been submitted.

` +
                  `Name: ${data.name || ''}
` +
                  `Attendance: ${data.attendance || ''}
` +
                  `Guests: ${data.guests || ''}
` +
                  `Diet: ${data.diet || ''}
` +
                  `Message: ${data.message || ''}
`;
      MailApp.sendEmail(NOTIFY_EMAIL, subject, msg);
    }

    return ContentService
      .createTextOutput(JSON.stringify({status:'ok'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({status:'error', message: err && err.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
