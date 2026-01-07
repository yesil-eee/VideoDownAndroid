#!/bin/bash

# VideoDownAndroid APK Build Script
# This script builds the APK using Expo Build Service

set -e

echo "📱 VideoDownAndroid APK Builder"
echo "================================"
echo ""

# Check if eas-cli is installed
if ! command -v eas &> /dev/null; then
    echo "❌ EAS CLI not found. Installing..."
    npm install -g eas-cli
fi

# Check if user is logged in
if ! eas whoami &> /dev/null; then
    echo "⚠️  You need to log in to Expo to build APK"
    echo "Run: eas login"
    echo ""
    exit 1
fi

echo "✅ EAS CLI is ready"
echo ""

# Ask user for build type
echo "Choose build type:"
echo "1) Development (debug)"
echo "2) Production (release)"
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        PROFILE="development"
        echo "Building development APK..."
        ;;
    2)
        PROFILE="production"
        echo "Building production APK..."
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""

# Start build
eas build --platform android --profile $PROFILE

echo ""
echo "✅ Build complete!"
echo "📥 Download your APK from the link provided above"
echo ""
