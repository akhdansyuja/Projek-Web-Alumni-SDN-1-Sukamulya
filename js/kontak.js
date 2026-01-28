function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.nama,
    data.email,
    data.pesan
  ]);

  return ContentService
    .createTextOutput("SUCCESS")
    .setMimeType(ContentService.MimeType.TEXT);
}