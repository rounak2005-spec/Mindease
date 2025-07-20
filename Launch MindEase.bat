@echo off
title MindEase - AI Therapy Companion
echo.
echo ========================================
echo    MindEase - AI Therapy Companion
echo ========================================
echo.
echo Starting MindEase...
echo.
echo If your browser doesn't open automatically,
echo please open start.html in your web browser.
echo.
echo ========================================
echo.

REM Try to open the launcher page in the default browser
start "" "start.html"

REM Wait a moment and then also try to open the login page as backup
timeout /t 2 /nobreak >nul
start "" "login.html"

echo MindEase is now accessible!
echo.
echo You can close this window.
echo.
pause 