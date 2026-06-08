const SPREADSHEET_ID = "1U_1_FwmksXvV7pcit9SyLMnmokGd6vQ3hAm-h7NVn0k";
const SHEET_NAME = "Respuestas";
const TIME_ZONE = "America/El_Salvador";

function doPost(event) {
  try {
    const data = JSON.parse(event.postData.contents || "{}");
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    const now = new Date();

    sheet.appendRow([
      Utilities.formatDate(now, TIME_ZONE, "yyyy-MM-dd"),
      Utilities.formatDate(now, TIME_ZONE, "HH:mm:ss"),
      data.nombre || "",
      data.whatsapp || "",
      data.ciudad || "",
      data.horario || "",
      data.comentario || "",
      data.permiso ? "Si" : "No",
      data.perfil || "",
      data.motivacion || "",
      data.dolor || "",
      data.objecion || "",
      data.tiempo || "",
      data.apoyo || "",
      data.interes || "",
      data.reunion || "",
      data.origen || ""
    ]);

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function doGet() {
  return jsonResponse({ ok: true, service: "Registro Oportunidad Mary Kay" });
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
