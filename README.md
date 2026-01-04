# VideoDownAndroid

A modern Android application for downloading YouTube videos and playlists with quality selection, built with React Native and Expo.

## Features

- **Quality Selection**: Download videos in your preferred resolution (2160p, 1440p, 1080p, 720p, 480p, 360p)
- **Smart Fallback**: If your preferred quality isn't available, automatically falls back to the next best option
- **Playlist Support**: Download entire playlists at once
- **Dual Mode**: Download as video (MP4) or audio (MP3)
- **Progress Tracking**: Real-time download progress with speed and ETA
- **Download Management**: View, play, share, and delete downloaded files
- **Concurrent Downloads**: Configure simultaneous downloads for faster processing
- **Auto Retry**: Automatic retry mechanism for failed downloads
- **Error Handling**: Handles 403 errors and age-restricted content with fallback strategies

## Tech Stack

- **React Native 0.81** - Cross-platform mobile framework
- **Expo SDK 54** - Development and deployment platform
- **TypeScript** - Type-safe development
- **NativeWind 4** - Tailwind CSS for React Native
- **Expo Router** - File-based routing
- **AsyncStorage** - Local data persistence

## Project Structure

```
app/
  (tabs)/
    index.tsx          ← Download screen
    downloads.tsx      ← Downloads management
    settings.tsx       ← Settings and preferences
components/
  screen-container.tsx ← SafeArea wrapper
  ui/
    icon-symbol.tsx    ← Tab bar icons
lib/
  utils.ts            ← Utility functions
hooks/
  use-colors.ts       ← Theme colors hook
design.md             ← UI/UX design specifications
todo.md               ← Feature tracking
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- Android Studio (for APK building)
- Expo CLI: `npm install -g expo-cli`

### Installation

```bash
# Clone the repository
git clone https://github.com/yesil-eee/VideoDownAndroid.git
cd VideoDownAndroid

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

### Running on Android

#### Option 1: Expo Go (Quick Testing)
```bash
pnpm android
# Scan the QR code with Expo Go app on your Android device
```

#### Option 2: Android Studio (APK Building)

1. **Build the APK:**
   ```bash
   eas build --platform android --local
   ```

2. **Or use Android Studio directly:**
   - Open Android Studio
   - Select "Open an Existing Project"
   - Navigate to the project directory
   - Build → Build Bundle(s) / APK(s) → Build APK(s)

### Building APK Manually

If you prefer to build the APK without EAS:

```bash
# Generate native Android project
npx expo prebuild --clean

# Build APK using Gradle
cd android
./gradlew assembleRelease
cd ..

# APK will be located at:
# android/app/build/outputs/apk/release/app-release.apk
```

## Configuration

### App Settings

Edit `app.config.ts` to customize:
- App name and slug
- Bundle ID and package name
- Permissions
- Splash screen and icons

### Theme Customization

Edit `theme.config.js` to change colors:
```js
const themeColors = {
  primary: { light: '#0a7ea4', dark: '#0a7ea4' },
  background: { light: '#ffffff', dark: '#151718' },
  // ... more colors
};
```

### Default Download Settings

Edit `app/(tabs)/settings.tsx` to change default preferences:
- Default quality (1080p)
- Download mode (MP4/MP3)
- Concurrent downloads (2)
- Auto-retry enabled

## Backend Integration

The app currently works with local storage. To integrate with a backend server:

1. Update the download API endpoint in the home screen
2. Implement WebSocket for real-time progress updates
3. Add server-side download queue management

See `server/README.md` for backend setup instructions.

## Troubleshooting

### "Download failed" error
- Check your internet connection
- Verify the YouTube URL is valid and accessible
- Try a different quality setting
- Enable auto-retry in settings

### APK won't install
- Ensure your Android device has enough storage
- Check that the APK is built for your device architecture (ARM64 recommended)
- Clear Google Play Store cache and try again

### App crashes on startup
- Clear app cache: Settings → Apps → Video Download → Storage → Clear Cache
- Reinstall the app
- Check the logs: `adb logcat | grep VideoDownAndroid`

## Development

### Adding New Features

1. Update `todo.md` with the feature
2. Create new screens in `app/(tabs)/`
3. Update tab navigation in `app/(tabs)/_layout.tsx`
4. Test on Android device

### Code Quality

```bash
# Check TypeScript
pnpm check

# Format code
pnpm format

# Run linter
pnpm lint
```

## Performance Tips

- Limit concurrent downloads to 2-3 for stable performance
- Clear old downloads periodically to free up storage
- Use 720p or lower for faster downloads on slower connections
- Enable auto-retry for unreliable network conditions

## Known Limitations

- Age-restricted videos require cookies to download
- Very large playlists (1000+) may require pagination
- Some videos may not be available in all regions

## License

This project is provided as-is for personal use.

## Support

For issues and feature requests, please visit the [GitHub repository](https://github.com/yesil-eee/VideoDownAndroid).

## Version History

### v1.0.0 (Initial Release)
- Core download functionality
- Quality selection with fallback
- Playlist support
- Download management
- Settings and preferences
