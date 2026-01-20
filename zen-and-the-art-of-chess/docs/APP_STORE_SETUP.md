# App Store Publication Guide

This guide covers how to set up signing certificates and publish Zen Chess to the Apple App Store and Google Play Store.

## Table of Contents

1. [Android - Google Play Store](#android---google-play-store)
2. [iOS - Apple App Store](#ios---apple-app-store)
3. [CI/CD Configuration](#cicd-configuration)

---

## Android - Google Play Store

### 1. Generate a Signing Keystore

```bash
# Navigate to the android/app directory
cd android/app

# Generate a new keystore
keytool -genkeypair -v -storetype PKCS12 \
  -keystore release-key.keystore \
  -alias zen-chess \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -dname "CN=Zen Chess, OU=Mobile, O=Your Company, L=City, ST=State, C=US"
```

**Important:** Store your keystore securely! If you lose it, you cannot update your app.

### 2. Configure Local Signing

Copy the example file and fill in your credentials:

```bash
cp android/app/signing.properties.example android/app/signing.properties
```

Edit `signing.properties`:
```properties
STORE_FILE=release-key.keystore
STORE_PASSWORD=your_keystore_password
KEY_ALIAS=zen-chess
KEY_PASSWORD=your_key_password
```

### 3. Build Release APK/AAB

```bash
# Build the web app first
npm run build

# Sync with Capacitor
npx cap sync android

# Open Android Studio
npx cap open android

# In Android Studio:
# Build -> Generate Signed Bundle / APK
# Select "Android App Bundle" for Play Store
```

Alternatively, build from command line:

```bash
cd android
./gradlew bundleRelease
# Output: android/app/build/outputs/bundle/release/app-release.aab
```

### 4. Google Play Console Setup

1. Go to [Google Play Console](https://play.google.com/console)
2. Create a new app
3. Fill in app details, screenshots, and privacy policy
4. Upload your signed AAB
5. Configure pricing and distribution
6. Submit for review

---

## iOS - Apple App Store

### 1. Prerequisites

- Mac with Xcode installed
- Apple Developer account ($99/year)
- App ID created in Apple Developer Portal

### 2. Configure Xcode Signing

```bash
# Build web app and sync
npm run build
npx cap sync ios

# Open Xcode
npx cap open ios
```

In Xcode:

1. Select the "App" target
2. Go to "Signing & Capabilities"
3. Select your Team
4. Enable "Automatically manage signing"
5. Xcode will create/download certificates automatically

### 3. Configure App Icons

Icons are already configured in `ios/App/App/Assets.xcassets/AppIcon.appiconset/`.

To regenerate from a source image:
```bash
npx @capacitor/assets generate --ios
```

### 4. Build for App Store

In Xcode:

1. Select "Any iOS Device" as the target
2. Product -> Archive
3. Window -> Organizer
4. Select your archive -> Distribute App
5. Choose "App Store Connect"
6. Follow the wizard to upload

### 5. App Store Connect Setup

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Create a new app
3. Fill in metadata, screenshots, and privacy policy
4. Select your uploaded build
5. Submit for review

---

## CI/CD Configuration

### GitHub Actions Secrets

Add these secrets to your GitHub repository:

#### Android Secrets
- `ANDROID_KEYSTORE_BASE64`: Base64-encoded keystore file
  ```bash
  base64 -i android/app/release-key.keystore | pbcopy
  ```
- `ANDROID_KEYSTORE_PASSWORD`: Keystore password
- `ANDROID_KEY_ALIAS`: Key alias (e.g., `zen-chess`)
- `ANDROID_KEY_PASSWORD`: Key password

#### iOS Secrets (for Fastlane)
- `APP_STORE_CONNECT_API_KEY_ID`: API key ID
- `APP_STORE_CONNECT_API_KEY_ISSUER_ID`: Issuer ID
- `APP_STORE_CONNECT_API_KEY_P8`: Contents of .p8 file
- `MATCH_PASSWORD`: Password for match certificates

### Environment Variables

The build.gradle is already configured to read from environment variables:

```groovy
storeFile file(System.getenv('ANDROID_KEYSTORE_PATH'))
storePassword System.getenv('ANDROID_KEYSTORE_PASSWORD')
keyAlias System.getenv('ANDROID_KEY_ALIAS')
keyPassword System.getenv('ANDROID_KEY_PASSWORD')
```

---

## Version Management

Before each release, bump the version:

```bash
# Patch release (1.0.0 -> 1.0.1)
npm run version:patch

# Minor release (1.0.0 -> 1.1.0)
npm run version:minor

# Major release (1.0.0 -> 2.0.0)
npm run version:major
```

This updates:
- `package.json` version
- Android `versionCode` and `versionName`
- iOS `MARKETING_VERSION` and `CURRENT_PROJECT_VERSION`

---

## Checklist Before Submission

### Content
- [ ] Privacy Policy URL (accessible and up-to-date)
- [ ] Terms of Service URL
- [ ] App description (short and long)
- [ ] Keywords/tags
- [ ] Category selection
- [ ] Age rating questionnaire completed

### Visual Assets
- [ ] App icon (1024x1024 for iOS, 512x512 for Android)
- [ ] Feature graphic (Android: 1024x500)
- [ ] Screenshots for all required device sizes
- [ ] Optional: Promo video

### Technical
- [ ] Version number bumped
- [ ] Build tested on real devices
- [ ] Crash reporting configured (Sentry)
- [ ] Analytics configured (PostHog)
- [ ] Deep links tested
- [ ] Push notifications tested (if applicable)

### Legal
- [ ] Privacy policy accessible from within the app
- [ ] Terms of service linked
- [ ] GDPR compliance (if applicable)
- [ ] CCPA compliance (if applicable)
- [ ] Children's privacy compliance (COPPA)

---

## Troubleshooting

### Android: "Keystore was tampered with"
Your keystore password is incorrect. Check `signing.properties`.

### Android: "Failed to read key"
Your key alias or key password is incorrect.

### iOS: "No signing certificate"
1. Open Keychain Access
2. Delete expired certificates
3. In Xcode, disable and re-enable automatic signing

### iOS: "Provisioning profile doesn't include signing certificate"
1. Go to Apple Developer Portal
2. Revoke old provisioning profiles
3. Let Xcode recreate them automatically
