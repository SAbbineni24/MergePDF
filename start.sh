#!/bin/bash

# PDF Merger - Quick Start Script
# This script helps you quickly start the application

echo "🚀 PDF Merger - Quick Start"
echo "=============================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
  echo ""
fi

# Check if CSS is built
if [ ! -f "src/styles/output.css" ]; then
  echo "🎨 Building Tailwind CSS..."
  npm run build:css
  echo ""
fi

# Check if webpack bundle exists
if [ ! -f "dist/renderer.js" ]; then
  echo "📦 Building webpack bundle..."
  npm run build
  echo ""
fi

echo "✅ All dependencies ready!"
echo ""
echo "🎉 Starting PDF Merger..."
echo ""
echo "To manually start in the future, run: npm start"
echo ""

# Start the application
npm start
