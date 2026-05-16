@echo off
title Gamified Agro Learn App

echo =====================================
echo Starting Gamified Agro Learn Project
echo =====================================

:: Go to project folder
cd /d "%~dp0"

:: Install node modules if not installed
if not exist node_modules (
    echo Installing dependencies...
    npm install
)

:: Start Vite React app
echo Starting development server...
npm run dev

pause