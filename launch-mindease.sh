#!/bin/bash

echo "========================================"
echo "   MindEase - AI Therapy Companion"
echo "========================================"
echo ""
echo "Starting MindEase..."
echo ""
echo "If your browser doesn't open automatically,"
echo "please open start.html in your web browser."
echo ""
echo "========================================"
echo ""

# Try to open the launcher page in the default browser
if command -v xdg-open &> /dev/null; then
    # Linux
    xdg-open start.html
elif command -v open &> /dev/null; then
    # macOS
    open start.html
elif command -v start &> /dev/null; then
    # Windows (if running in WSL)
    start start.html
else
    echo "Could not automatically open browser."
    echo "Please manually open start.html in your web browser."
fi

# Wait a moment and try to open login page as backup
sleep 2

if command -v xdg-open &> /dev/null; then
    xdg-open login.html
elif command -v open &> /dev/null; then
    open login.html
elif command -v start &> /dev/null; then
    start login.html
fi

echo "MindEase is now accessible!"
echo ""
echo "You can close this terminal window."
echo ""
read -p "Press Enter to continue..." 