@echo off
cd /d "%~dp0"
"C:\Python312\python.exe" -m http.server 5173 --bind 127.0.0.1 --directory "%~dp0dist"
