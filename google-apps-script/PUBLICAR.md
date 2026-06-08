# Publicar el receptor de Google Sheets

Hoja: https://docs.google.com/spreadsheets/d/1U_1_FwmksXvV7pcit9SyLMnmokGd6vQ3hAm-h7NVn0k/edit

1. Abre la hoja del enlace anterior.
2. Ve a `Extensiones > Apps Script`.
3. Reemplaza el contenido de `Codigo.gs` con el contenido de `Code.gs` de esta carpeta.
4. Pulsa `Implementar > Nueva implementacion`.
5. Selecciona `Aplicacion web`.
6. En `Ejecutar como`, elige `Yo`.
7. En `Quien tiene acceso`, elige `Cualquier persona`.
8. Autoriza el acceso y copia la URL terminada en `/exec`.

La URL publicada ya está configurada en `GOOGLE_SHEETS_WEB_APP_URL` dentro de `index.html`.

La fecha y hora se generan automaticamente con la zona horaria de El Salvador.
