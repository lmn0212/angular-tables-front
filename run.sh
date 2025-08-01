#!/bin/bash

echo "🚀 Starting Angular Books Table Application..."

# Check if port 4200 is in use
if lsof -ti:4200 > /dev/null 2>&1; then
    echo "⚠️  Port 4200 is already in use. Stopping existing processes..."
    lsof -ti:4200 | xargs kill -9
    sleep 2
fi

echo "📱 The application will open in your default browser at http://localhost:4200"
echo "⏹️  Press Ctrl+C to stop the server"
echo ""

# Start the application
npm start 