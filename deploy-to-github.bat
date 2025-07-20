@echo off
title MindEase - GitHub Deployment Helper
echo.
echo ========================================
echo    MindEase - GitHub Deployment Helper
echo ========================================
echo.
echo This script will help you deploy MindEase to GitHub Pages.
echo.
echo Prerequisites:
echo - GitHub account (free)
echo - Git installed on your computer
echo - All MindEase files in this folder
echo.
echo ========================================
echo.

echo Step 1: Checking if Git is installed...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/
    echo Then run this script again.
    pause
    exit /b 1
)
echo ✅ Git is installed!

echo.
echo Step 2: Initializing Git repository...
git init
if %errorlevel% neq 0 (
    echo ERROR: Failed to initialize Git repository!
    pause
    exit /b 1
)
echo ✅ Git repository initialized!

echo.
echo Step 3: Adding all files to Git...
git add .
if %errorlevel% neq 0 (
    echo ERROR: Failed to add files!
    pause
    exit /b 1
)
echo ✅ Files added to Git!

echo.
echo Step 4: Making initial commit...
git commit -m "Initial MindEase deployment"
if %errorlevel% neq 0 (
    echo ERROR: Failed to commit files!
    pause
    exit /b 1
)
echo ✅ Initial commit created!

echo.
echo ========================================
echo    MANUAL STEPS REQUIRED
echo ========================================
echo.
echo Now you need to:
echo.
echo 1. Go to GitHub.com and create a new repository
echo    - Name it: mindease (or any name you prefer)
echo    - Make it PUBLIC (required for GitHub Pages)
echo    - Don't initialize with README
echo.
echo 2. Copy your repository URL (it will look like):
echo    https://github.com/YOUR_USERNAME/mindease.git
echo.
echo 3. Come back here and press any key to continue...
echo.
pause

echo.
echo Step 5: Setting up remote repository...
echo Please enter your GitHub repository URL:
echo (Example: https://github.com/johndoe/mindease.git)
echo.
set /p repo_url="Repository URL: "

git remote add origin %repo_url%
if %errorlevel% neq 0 (
    echo ERROR: Failed to add remote repository!
    echo Please check your repository URL and try again.
    pause
    exit /b 1
)
echo ✅ Remote repository added!

echo.
echo Step 6: Pushing to GitHub...
git branch -M main
git push -u origin main
if %errorlevel% neq 0 (
    echo ERROR: Failed to push to GitHub!
    echo Please check your GitHub credentials and try again.
    pause
    exit /b 1
)
echo ✅ Files pushed to GitHub!

echo.
echo ========================================
echo    FINAL STEPS REQUIRED
echo ========================================
echo.
echo 🎉 Your files are now on GitHub!
echo.
echo To enable GitHub Pages:
echo.
echo 1. Go to your GitHub repository
echo 2. Click "Settings" tab
echo 3. Scroll down to "Pages" (left sidebar)
echo 4. Under "Source", select "Deploy from a branch"
echo 5. Select "main" branch and "/ (root)" folder
echo 6. Click "Save"
echo 7. Wait 2-5 minutes for deployment
echo.
echo Your site will be available at:
echo https://YOUR_USERNAME.github.io/mindease
echo.
echo ========================================
echo.
echo Deployment helper completed!
echo.
pause 