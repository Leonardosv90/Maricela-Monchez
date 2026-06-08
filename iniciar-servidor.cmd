@echo off
title Servidor Maricela Monchez
cd /d "%~dp0"
echo Iniciando sitio en http://127.0.0.1:5173/
echo Mantenga esta ventana abierta mientras usa el sitio.
echo.
call npm.cmd run dev -- --port 5173 --host 127.0.0.1 > "%~dp0servidor.log" 2>&1
echo.
echo El servidor se detuvo. Presione una tecla para cerrar.
pause >nul
