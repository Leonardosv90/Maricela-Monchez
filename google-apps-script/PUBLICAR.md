# Publicar el receptor de Google Sheets

Hoja: https://docs.google.com/spreadsheets/d/1U_1_FwmksXvV7pcit9SyLMnmokGd6vQ3hAm-h7NVn0k/edit

1. Abre la hoja del enlace anterior.
2. Ve a `Extensiones > Apps Script`.
3. Reemplaza todo el contenido de `Codigo.gs` con el contenido de `Code.gs` de esta carpeta.
4. Guarda el proyecto y ejecuta manualmente `testSetup`.
5. Autoriza el acceso solicitado. El registro debe indicar `Configuración correcta`.
   Esto también crea la pestaña privada `Dashboard privado` con indicadores,
   gráficos y los registros recientes.
6. Pulsa `Implementar > Nueva implementacion`.
7. Selecciona `Aplicacion web`.
8. En `Ejecutar como`, elige `Yo`.
9. En `Quien tiene acceso`, elige `Cualquier persona`.
10. Pulsa `Implementar` y copia la URL terminada en `/exec`.
11. Abre esa URL en otra pestaña. Debe mostrar `"ok":true`.
12. Si la URL es distinta, reemplaza `GOOGLE_SHEETS_WEB_APP_URL` en `index.html`.

Cuando se cambie el código después de publicar:

1. Ve a `Implementar > Gestionar implementaciones`.
2. Edita la implementación activa.
3. En `Version`, selecciona `Nueva version`.
4. Vuelve a implementar. Guardar el código no actualiza por sí solo la aplicación web.

## Privacidad del panel

El panel no se publica dentro de la landing. Vive dentro del mismo archivo de
Google Sheets y usa los permisos privados de Google Drive. No compartas la hoja
como pública; concede acceso únicamente a las cuentas que deban consultar los
resultados.

La URL publicada ya está configurada en `GOOGLE_SHEETS_WEB_APP_URL` dentro de `index.html`.

La fecha y hora se generan automaticamente con la zona horaria de El Salvador.
