@echo off
REM VideoDownAndroid APK Build Script for Windows
REM This script builds the APK using Expo Build Service

setlocal enabledelayedexpansion

echo.
echo 📱 VideoDownAndroid APK Builder
echo ================================
echo.

REM Check if eas-cli is installed
where eas >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ EAS CLI not found. Installing...
    npm install -g eas-cli
)

REM Check if user is logged in
eas whoami >nul 2>nul
if %errorlevel% neq 0 (
    echo ⚠️  You need to log in to Expo to build APK
    echo Run: eas login
    echo.
    pause
    exit /b 1
)

echo ✅ EAS CLI is ready
echo.

REM Ask user for build type
echo Choose build type:
echo 1) Development (debug)
echo 2) Production (release)
set /p choice="Enter choice (1 or 2): "

if "%choice%"=="1" (
    set PROFILE=development
    echo Building development APK...
) else if "%choice%"=="2" (
    set PROFILE=production
    echo Building production APK...
) else (
    echo ❌ Invalid choice
    pause
    exit /b 1
)

echo.

REM Start build
eas build --platform android --profile !PROFILE!

echo.
echo ✅ Build complete!
echo 📥 Download your APK from the link provided above
echo.
pause
