#!/bin/bash

echo "========================================"
echo "   MindEase - GitHub Deployment Helper"
echo "========================================"
echo ""
echo "This script will help you deploy MindEase to GitHub Pages."
echo ""
echo "Prerequisites:"
echo "- GitHub account (free)"
echo "- Git installed on your computer"
echo "- All MindEase files in this folder"
echo ""
echo "========================================"
echo ""

# Check if Git is installed
echo "Step 1: Checking if Git is installed..."
if ! command -v git &> /dev/null; then
    echo "ERROR: Git is not installed!"
    echo "Please install Git from: https://git-scm.com/"
    echo "Then run this script again."
    exit 1
fi
echo "✅ Git is installed!"

echo ""
echo "Step 2: Initializing Git repository..."
if ! git init; then
    echo "ERROR: Failed to initialize Git repository!"
    exit 1
fi
echo "✅ Git repository initialized!"

echo ""
echo "Step 3: Adding all files to Git..."
if ! git add .; then
    echo "ERROR: Failed to add files!"
    exit 1
fi
echo "✅ Files added to Git!"

echo ""
echo "Step 4: Making initial commit..."
if ! git commit -m "Initial MindEase deployment"; then
    echo "ERROR: Failed to commit files!"
    exit 1
fi
echo "✅ Initial commit created!"

echo ""
echo "========================================"
echo "    MANUAL STEPS REQUIRED"
echo "========================================"
echo ""
echo "Now you need to:"
echo ""
echo "1. Go to GitHub.com and create a new repository"
echo "   - Name it: mindease (or any name you prefer)"
echo "   - Make it PUBLIC (required for GitHub Pages)"
echo "   - Don't initialize with README"
echo ""
echo "2. Copy your repository URL (it will look like):"
echo "   https://github.com/YOUR_USERNAME/mindease.git"
echo ""
echo "3. Press Enter to continue..."
echo ""
read -p "Press Enter to continue..."

echo ""
echo "Step 5: Setting up remote repository..."
echo "Please enter your GitHub repository URL:"
echo "(Example: https://github.com/johndoe/mindease.git)"
echo ""
read -p "Repository URL: " repo_url

if ! git remote add origin "$repo_url"; then
    echo "ERROR: Failed to add remote repository!"
    echo "Please check your repository URL and try again."
    exit 1
fi
echo "✅ Remote repository added!"

echo ""
echo "Step 6: Pushing to GitHub..."
if ! git branch -M main; then
    echo "ERROR: Failed to rename branch!"
    exit 1
fi

if ! git push -u origin main; then
    echo "ERROR: Failed to push to GitHub!"
    echo "Please check your GitHub credentials and try again."
    exit 1
fi
echo "✅ Files pushed to GitHub!"

echo ""
echo "========================================"
echo "    FINAL STEPS REQUIRED"
echo "========================================"
echo ""
echo "🎉 Your files are now on GitHub!"
echo ""
echo "To enable GitHub Pages:"
echo ""
echo "1. Go to your GitHub repository"
echo "2. Click 'Settings' tab"
echo "3. Scroll down to 'Pages' (left sidebar)"
echo "4. Under 'Source', select 'Deploy from a branch'"
echo "5. Select 'main' branch and '/ (root)' folder"
echo "6. Click 'Save'"
echo "7. Wait 2-5 minutes for deployment"
echo ""
echo "Your site will be available at:"
echo "https://YOUR_USERNAME.github.io/mindease"
echo ""
echo "========================================"
echo ""
echo "Deployment helper completed!"
echo ""
read -p "Press Enter to exit..." 