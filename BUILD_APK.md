# Building APK for VideoDownAndroid

This guide explains how to build the APK file for Android deployment.

## Prerequisites

- **Android Studio** installed and configured
- **Java Development Kit (JDK)** 17 or higher
- **Android SDK** with API level 34+
- **Gradle** (usually included with Android Studio)
- **Node.js** and **pnpm** installed

## Method 1: Using Expo (Recommended for Beginners)

### Step 1: Install EAS CLI

```bash
npm install -g eas-cli
```

### Step 2: Authenticate with Expo

```bash
eas login
```

### Step 3: Configure EAS Build

```bash
eas build:configure
```

### Step 4: Build APK

```bash
# Build APK locally (requires Android SDK)
eas build --platform android --local

# Or build on Expo servers (no local setup needed)
eas build --platform android
```

The APK will be available for download after the build completes.

## Method 2: Using Android Studio (Most Control)

### Step 1: Prepare the Project

```bash
# Install dependencies
pnpm install

# Generate native Android files
npx expo prebuild --clean
```

### Step 2: Open in Android Studio

1. Open Android Studio
2. Select "Open an Existing Project"
3. Navigate to the project folder and select the `android` directory
4. Wait for Gradle to sync

### Step 3: Build the APK

#### Debug APK (for testing):
1. Go to **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Wait for the build to complete
3. APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

#### Release APK (for distribution):
1. Go to **Build** → **Generate Signed Bundle / APK**
2. Select **APK** and click **Next**
3. Create a new keystore or use existing:
   - **Key store path**: Choose a location to save the keystore
   - **Key store password**: Create a strong password
   - **Key alias**: e.g., "videodownandroid"
   - **Key password**: Same as keystore password (or different)
4. Select **Release** build variant
5. Click **Finish**
6. APK location: `android/app/build/outputs/apk/release/app-release.apk`

### Step 4: Install on Device

```bash
# Using ADB (Android Debug Bridge)
adb install -r android/app/build/outputs/apk/debug/app-debug.apk

# Or drag-and-drop the APK file onto your Android device
```

## Method 3: Using Gradle Command Line

### Step 1: Prepare the Project

```bash
pnpm install
npx expo prebuild --clean
```

### Step 2: Build APK

```bash
cd android

# Debug APK
./gradlew assembleDebug

# Release APK
./gradlew assembleRelease

cd ..
```

### Step 3: Locate the APK

- **Debug**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release**: `android/app/build/outputs/apk/release/app-release.apk`

## Creating a Release Keystore

For production releases, you need a signed APK:

```bash
# Generate keystore (one-time)
keytool -genkey -v -keystore videodownandroid.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias videodownandroid

# Store this keystore file safely!
# You'll need it for future updates
```

## Troubleshooting

### Build Fails with "SDK not found"
- Open Android Studio → Settings → Appearance & Behavior → System Settings → Android SDK
- Install API 34 and build tools 34.0.0

### Gradle Sync Issues
```bash
# Clear Gradle cache
cd android
./gradlew clean
cd ..

# Rebuild
./gradlew assembleDebug
```

### APK Installation Fails
```bash
# Check if app is already installed
adb shell pm list packages | grep videodownandroid

# Uninstall previous version
adb uninstall space.manus.VideoDownAndroid

# Install new APK
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

### Out of Memory Error
```bash
# Increase Gradle heap size
export GRADLE_OPTS="-Xmx4096m"
./gradlew assembleRelease
```

## APK Size Optimization

The default APK size is approximately 50-80 MB. To reduce:

1. **Enable ProGuard/R8** in `android/app/build.gradle`:
   ```gradle
   release {
       minifyEnabled true
       shrinkResources true
       proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
   }
   ```

2. **Remove unused languages** in `app.config.ts`:
   ```ts
   plugins: [
       ["expo-build-properties", {
           android: {
               enableProguard: true,
           }
       }]
   ]
   ```

## Testing the APK

### On Physical Device
```bash
# Connect device via USB
adb devices

# Install and run
adb install -r app-debug.apk
adb shell am start -n space.manus.VideoDownAndroid/space.manus.VideoDownAndroid.MainActivity
```

### On Android Emulator
```bash
# List available emulators
emulator -list-avds

# Start emulator
emulator -avd <emulator_name>

# Install APK
adb install -r app-debug.apk
```

## Distribution

### Google Play Store

1. Create a [Google Play Developer Account](https://play.google.com/console)
2. Create a new app
3. Upload the signed release APK
4. Fill in app details, screenshots, and description
5. Submit for review

### Direct Distribution

1. Host the APK on your website or cloud storage
2. Users can download and install directly
3. Requires enabling "Unknown sources" on Android device

## Version Updates

When updating the app:

1. Increment version in `app.config.ts`:
   ```ts
   version: "1.0.1"
   ```

2. Rebuild the APK following the same steps above

3. For Play Store: Upload new APK to existing app listing

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Android Studio Guide](https://developer.android.com/studio/intro)
- [Gradle Build System](https://gradle.org/)
- [Android App Signing](https://developer.android.com/studio/publish/app-signing)
