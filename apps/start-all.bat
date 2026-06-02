@echo off
chcp 65001 >nul
title Kanban Launcher
echo ============================================================
echo  Starting Kanban (no admin required)...
echo  Each service opens in its own window.
echo ============================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-all.ps1"
echo.
echo ============================================================
echo  Launcher finished. Services run in separate windows.
echo  You can close THIS window now.
echo ============================================================
pause >nul
