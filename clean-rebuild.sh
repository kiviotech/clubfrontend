#!/bin/bash

# Script to clean and rebuild the Expo project

echo "🧹 Cleaning project..."

# Remove node_modules
echo "Removing node_modules..."
rm -rf node_modules

# Remove yarn/npm caches
echo "Clearing package manager caches..."
if command -v yarn &> /dev/null; then
  yarn cache clean
else
  npm cache clean --force
fi

# Remove Expo caches
echo "Clearing Expo caches..."
rm -rf .expo
rm -rf .expo-shared
rm -rf web-build
rm -rf dist

# Remove Metro bundler cache
echo "Clearing Metro bundler cache..."
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/haste-map-*

# Remove Babel cache
echo "Clearing Babel cache..."
rm -rf .babel-cache

# Remove Watchman cache (if Watchman is installed)
if command -v watchman &> /dev/null; then
  echo "Clearing Watchman cache..."
  watchman watch-del-all
fi

# Reinstall dependencies
echo "📦 Reinstalling dependencies..."
if [ -f "yarn.lock" ]; then
  echo "Using yarn to install dependencies..."
  yarn install
else
  echo "Using npm to install dependencies..."
  npm install
fi

# Start the project
echo "🚀 Starting the project..."
if [ -f "yarn.lock" ]; then
  yarn start --clear
else
  npm start -- --clear
fi

echo "✅ Clean rebuild completed!" 