const SPREADSHEET_ID = "1U_1_FwmksXvV7pcit9SyLMnmokGd6vQ3hAm-h7NVn0k";
const SHEET_NAME = "Respuestas";
const DASHBOARD_NAME = "Dashboard privado";
const TIME_ZONE = "America/El_Salvador";
const HEADERS = [
  "Fecha",
  "Hora",
  "Nombre completo",
  "WhatsApp",
  "Ciudad",
  "Horario preferido",
  "Comentario",
  "Autorizó contacto",
  "Perfil",
  "Lo que más le interesa",
  "Lo que quiere mejorar",
  "Lo que más le detiene",
  "Tiempo disponible",
  "Apoyo que necesita",
  "Nivel de interés",
  "Tipo de reunión",
  "Origen"
];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Panel de oportunidad")
    .addItem("Crear o actualizar dashboard", "setupDashboard")
    .addToUi();
}

function doPost(event) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);
    const data = parseRequest(event);
    if (!data.nombre || !data.whatsapp) {
      throw new Error("Solicitud incompleta: faltan nombre o WhatsApp.");
    }

    const sheet = getOrCreateSheet();
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
    ensureDashboard();

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, error: String(error) });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function doGet() {
  try {
    const sheet = getOrCreateSheet();
    return jsonResponse({
      ok: true,
      service: "Registro Oportunidad Mary Kay",
      sheet: sheet.getName(),
      rows: sheet.getLastRow()
    });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function testSetup() {
  const sheet = getOrCreateSheet();
  const dashboard = setupDashboard();
  console.log("Configuración correcta. Hojas: " + sheet.getName() + " y " + dashboard.getName());
}

function parseRequest(event) {
  if (!event) return {};

  if (event.parameter && Object.keys(event.parameter).length > 0) {
    return event.parameter;
  }

  const content = event.postData && event.postData.contents;
  if (content) {
    try {
      return JSON.parse(content);
    } catch (error) {
      // Continue with form parameters when the body is not JSON.
    }
  }

  return {};
}

function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setBackground("#920B62")
      .setFontColor("#FFFFFF")
      .setFontWeight("bold")
      .setWrap(true);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function ensureDashboard() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const dashboard = spreadsheet.getSheetByName(DASHBOARD_NAME);
  return dashboard || setupDashboard();
}

function setupDashboard() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  getOrCreateSheet();

  let dashboard = spreadsheet.getSheetByName(DASHBOARD_NAME);
  if (!dashboard) {
    dashboard = spreadsheet.insertSheet(DASHBOARD_NAME, 0);
  }

  dashboard.clear();
  dashboard.getCharts().forEach((chart) => dashboard.removeChart(chart));
  dashboard.setHiddenGridlines(true);
  dashboard.setFrozenRows(3);
  dashboard.setTabColor("#E83E9D");

  dashboard.getRange("A1:H1").merge()
    .setValue("Panel privado · Oportunidad Mary Kay")
    .setBackground("#920B62")
    .setFontColor("#FFFFFF")
    .setFontSize(20)
    .setFontWeight("bold")
    .setHorizontalAlignment("left");
  dashboard.setRowHeight(1, 52);

  dashboard.getRange("A2:H2").merge()
    .setValue("Resumen de las respuestas recibidas. Esta pestaña solo es visible para quienes tengan acceso al archivo.")
    .setBackground("#FCE7F3")
    .setFontColor("#6F5365")
    .setFontSize(10);

  dashboard.getRange("A4:B4").merge().setValue("Total de registros");
  dashboard.getRange("C4:D4").merge().setValue("Registros de hoy");
  dashboard.getRange("E4:F4").merge().setValue("Listas para el modelo");
  dashboard.getRange("G4:H4").merge().setValue("Interesadas con dudas");
  dashboard.getRange("A5:B6").merge().setFormula('=MAX(COUNTA(Respuestas!C:C)-1,0)');
  dashboard.getRange("C5:D6").merge().setFormula('=COUNTIF(Respuestas!A:A,TEXT(TODAY(),"yyyy-mm-dd"))');
  dashboard.getRange("E5:F6").merge().setFormula('=COUNTIF(Respuestas!I:I,"Lista para conocer el modelo")');
  dashboard.getRange("G5:H6").merge().setFormula('=COUNTIF(Respuestas!I:I,"Interesada con dudas")');

  dashboard.getRange("A4:H4")
    .setBackground("#FFF3F9")
    .setFontColor("#6F5365")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");
  dashboard.getRange("A5:H6")
    .setBackground("#FFFFFF")
    .setFontColor("#920B62")
    .setFontSize(24)
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");

  writeSummaryBlock(dashboard, "A8:B8", "A9:B11", "Perfiles", [
    ["Exploradora", '=COUNTIF(Respuestas!I:I,A9)'],
    ["Interesada con dudas", '=COUNTIF(Respuestas!I:I,A10)'],
    ["Lista para conocer el modelo", '=COUNTIF(Respuestas!I:I,A11)']
  ]);

  writeSummaryBlock(dashboard, "D8:E8", "D9:E14", "Principales intereses", [
    ["Generar ingresos extra", '=COUNTIF(Respuestas!J:J,D9)'],
    ["Aprender belleza y cuidado", '=COUNTIF(Respuestas!J:J,"Aprender más de belleza y cuidado de la piel")'],
    ["Tener algo propio", '=COUNTIF(Respuestas!J:J,D11)'],
    ["Crecer en confianza", '=COUNTIF(Respuestas!J:J,D12)'],
    ["Conocer una comunidad", '=COUNTIF(Respuestas!J:J,"Conocer una comunidad de mujeres")'],
    ["Solo quiere saber más", '=COUNTIF(Respuestas!J:J,"Aún no estoy segura, solo quiero saber más")']
  ]);

  writeSummaryBlock(dashboard, "G8:H8", "G9:H14", "Objeciones principales", [
    ["Pena de vender", '=COUNTIF(Respuestas!L:L,"Me da pena vender")'],
    ["Falta de tiempo", '=COUNTIF(Respuestas!L:L,"No sé si tengo tiempo")'],
    ["Pocos contactos", '=COUNTIF(Respuestas!L:L,"No conozco muchas personas")'],
    ["Duda de su capacidad", '=COUNTIF(Respuestas!L:L,"No sé si soy buena para esto")'],
    ["Preocupación por invertir", '=COUNTIF(Respuestas!L:L,"No tengo el dinero / Me preocupa invertir")'],
    ["Miedo al rechazo", '=COUNTIF(Respuestas!L:L,"Me da miedo que me digan que no")']
  ]);

  dashboard.getRange("A17:H17").merge()
    .setValue("Respuestas recientes")
    .setBackground("#920B62")
    .setFontColor("#FFFFFF")
    .setFontWeight("bold");
  dashboard.getRange("A18:H18").setValues([[
    "Fecha", "Nombre", "WhatsApp", "Ciudad", "Perfil", "Interés", "Objeción", "Horario"
  ]]);
  dashboard.getRange("A19").setFormula(
    '=IFERROR(QUERY(Respuestas!A2:Q,"select A,C,D,E,I,J,L,F where C is not null order by A desc, B desc limit 15",0),"Sin registros todavía")'
  );
  dashboard.getRange("A18:H18")
    .setBackground("#F8B6D8")
    .setFontColor("#4A123A")
    .setFontWeight("bold");
  dashboard.getRange("A19:H34")
    .setBackground("#FFFFFF")
    .setFontColor("#24121F")
    .setWrap(true)
    .setVerticalAlignment("top");

  try {
    const profileChart = dashboard.newChart()
      .asPieChart()
      .addRange(dashboard.getRange("A9:B11"))
      .setPosition(36, 1, 0, 0)
      .setOption("title", "Distribución de perfiles")
      .setOption("pieHole", 0.48)
      .setOption("legend", { position: "right" })
      .setOption("colors", ["#F8B6D8", "#E83E9D", "#920B62"])
      .build();
    dashboard.insertChart(profileChart);

    const objectionChart = dashboard.newChart()
      .asBarChart()
      .addRange(dashboard.getRange("G9:H14"))
      .setPosition(36, 5, 0, 0)
      .setOption("title", "Objeciones más frecuentes")
      .setOption("legend", { position: "none" })
      .setOption("colors", ["#E83E9D"])
      .build();
    dashboard.insertChart(objectionChart);
  } catch (chartError) {
    console.warn("El dashboard se creó sin gráficos: " + chartError);
  }

  [120, 170, 115, 145, 180, 210, 210, 110].forEach((width, index) => {
    dashboard.setColumnWidth(index + 1, width);
  });
  dashboard.setRowHeights(19, 16, 42);
  dashboard.getRange("A1:H60").setBorder(
    false, false, false, false, true, true, "#E8D5E1", SpreadsheetApp.BorderStyle.SOLID
  );

  return dashboard;
}

function writeSummaryBlock(sheet, headerRange, dataRange, title, rows) {
  sheet.getRange(headerRange).merge()
    .setValue(title)
    .setBackground("#920B62")
    .setFontColor("#FFFFFF")
    .setFontWeight("bold");

  const range = sheet.getRange(dataRange);
  const values = rows.map(([label]) => [label, ""]);
  range.setValues(values)
    .setBackground("#FFFFFF")
    .setFontColor("#24121F")
    .setWrap(true);

  rows.forEach(([, formula], index) => {
    range.getCell(index + 1, 2).setFormula(formula);
  });
  range.offset(0, 1, rows.length, 1)
    .setFontWeight("bold")
    .setFontColor("#920B62")
    .setHorizontalAlignment("center");
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
