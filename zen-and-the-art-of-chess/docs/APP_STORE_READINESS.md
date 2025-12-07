# App Store Readiness Guide

## Executive Summary

This document covers the requirements and checklist for submitting Zen Chess to the Apple App Store (iOS) and Google Play Store (Android).

**Current Status**: 🟡 Ready for Beta Testing

---

## 1. Platform Configuration

### Capacitor Setup ✅

```typescript
// capacitor.config.ts
{
  appId: 'com.zenchess.app',
  appName: 'Zen Chess',
  webDir: 'dist',
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    backgroundColor: '#161512'
  },
  android: {
    backgroundColor: '#161512',
    allowMixedContent: true
  }
}
```

### Build Commands

```bash
# Build web assets
npm run build

# Sync to native projects
npx cap sync

# Open iOS project
npx cap open ios

# Open Android project
npx cap open android
```

---

## 2. iOS App Store Requirements

### Apple Developer Account
- [ ] Apple Developer Program membership ($99/year)
- [ ] Distribution certificate created
- [ ] App ID registered (com.zenchess.app)
- [ ] Provisioning profile created

### App Store Connect Setup
- [ ] Create app listing in App Store Connect
- [ ] Set up pricing (Free with IAP or Paid)
- [ ] Configure in-app purchases if applicable

### Required Assets

| Asset | Size | Status |
|-------|------|--------|
| App Icon | 1024x1024 | ✅ Created |
| App Icon (maskable) | 1024x1024 | ✅ Created |
| Launch Screen | Varies | ✅ Storyboard configured |
| Screenshots (iPhone 6.7") | 1290x2796 | ⚠️ Needed |
| Screenshots (iPhone 5.5") | 1242x2208 | ⚠️ Needed |
| Screenshots (iPad Pro 12.9") | 2048x2732 | ⚠️ Needed |
| App Preview Video | 1920x1080 | Optional |

### Info.plist Requirements ✅

Located at `ios/App/App/Info.plist`:
- Bundle identifier: `com.zenchess.app`
- Version number
- Privacy descriptions (if needed)

### Privacy & Permissions

Current permissions needed: **None required**

If adding features:
| Feature | Permission Key | When Needed |
|---------|----------------|-------------|
| Photos | NSPhotoLibraryUsageDescription | If sharing screenshots |
| Camera | NSCameraUsageDescription | If adding AR features |
| Microphone | NSMicrophoneUsageDescription | If adding voice commands |

### App Review Guidelines Checklist

- [ ] No private API usage
- [ ] No placeholder content
- [ ] All links functional
- [ ] Privacy policy URL provided
- [ ] Support URL provided
- [ ] All IAPs properly configured
- [ ] App runs without crashes
- [ ] Content appropriate for all ages (4+)

---

## 3. Google Play Store Requirements

### Google Play Console Account
- [ ] Google Play Developer account ($25 one-time)
- [ ] App registered in Play Console
- [ ] Keystore generated and secured

### Required Assets

| Asset | Size | Status |
|-------|------|--------|
| App Icon | 512x512 | ✅ Created |
| Feature Graphic | 1024x500 | ⚠️ Needed |
| Screenshots (Phone) | 320-3840px | ⚠️ Needed |
| Screenshots (Tablet 7") | Min 1024px | Optional |
| Screenshots (Tablet 10") | Min 1024px | Optional |
| Promo Video | YouTube URL | Optional |

### AndroidManifest.xml ✅

Located at `android/app/src/main/AndroidManifest.xml`:
- Package: `com.zenchess.app`
- Internet permission (default)
- No sensitive permissions required

### build.gradle Configuration

```gradle
// android/app/build.gradle
defaultConfig {
    applicationId "com.zenchess.app"
    minSdkVersion 22
    targetSdkVersion 34
    versionCode 1
    versionName "1.0.0"
}
```

### Play Console Requirements

- [ ] Store listing complete
- [ ] Content rating questionnaire
- [ ] Data safety form
- [ ] Target audience declared
- [ ] App category: Games > Board
- [ ] Privacy policy URL

### Signing Configuration

```gradle
signingConfigs {
    release {
        storeFile file('keystore.jks')
        storePassword System.getenv("KEYSTORE_PASSWORD")
        keyAlias 'zen-chess'
        keyPassword System.getenv("KEY_PASSWORD")
    }
}
```

**Important**: Keep keystore secure! If lost, you cannot update the app.

---

## 4. App Store Listing Content

### App Name
**Zen Chess - Master Chess**
(30 character limit for iOS, 50 for Android)

### Subtitle (iOS) / Short Description (Android)
**Train your mind, master chess**
(30 character limit for iOS, 80 for Android)

### Description

```
Master chess through mindfulness. Zen Chess is a 365-day journey combining spiritual wisdom, chess mastery, and psychological insight.

🧠 TRAIN YOUR MIND
• Daily lessons blending chess and mindfulness
• Guided breathing exercises
• Mental focus training

♟️ MASTER CHESS
• Thousands of tactical puzzles
• Opening repertoire builder
• Play against legendary masters
• Stockfish-powered analysis

📈 TRACK YOUR PROGRESS
• Puzzle rating system
• Daily streaks and achievements
• Performance analytics

🎓 LEARN FROM THE BEST
• Study games from Kasparov, Fischer, Carlsen
• Opening explorer with master games
• Pattern recognition training

✨ BEAUTIFUL EXPERIENCE
• Authentic wooden piece sounds
• Zen-inspired design
• Offline play support
• No ads interrupting your practice

Start your journey to chess mastery today.
```

### Keywords (iOS, 100 chars)
`chess,puzzles,tactics,training,mindfulness,strategy,brain,game,learn,master`

### Category
- Primary: Games > Board
- Secondary: Education

### Age Rating
- iOS: 4+ (no objectionable content)
- Android: Everyone

---

## 5. Pre-Release Testing

### TestFlight (iOS)

1. Archive build in Xcode
2. Upload to App Store Connect
3. Add internal testers
4. Distribute via TestFlight

### Google Play Internal Testing

1. Build signed APK/AAB
2. Upload to Internal testing track
3. Add testers via email
4. Distribute via Play Store link

### Testing Checklist

- [ ] Fresh install works
- [ ] Upgrade from previous version works
- [ ] All features functional
- [ ] No crashes on supported devices
- [ ] Sound works correctly
- [ ] Offline mode works
- [ ] Push notifications work (if implemented)

---

## 6. Version Strategy

### Versioning Scheme
- **Version Name**: `1.0.0` (Semantic versioning)
- **Version Code**: `1` (Integer, must increase)

### Release Types

| Type | Version | Description |
|------|---------|-------------|
| Major | 2.0.0 | New major features |
| Minor | 1.1.0 | New features |
| Patch | 1.0.1 | Bug fixes |

---

## 7. Legal Requirements

### Privacy Policy ⚠️ REQUIRED

Create and host at: `https://zenchess.app/privacy`

Must include:
- What data is collected (local only vs. cloud)
- How data is used
- Third-party services (Supabase, if used)
- User rights (GDPR, CCPA)
- Contact information

### Terms of Service ⚠️ REQUIRED

Create and host at: `https://zenchess.app/terms`

Must include:
- Acceptable use policy
- Account termination rights
- Liability limitations
- Governing law

---

## 8. App Store Screenshots

### Screenshot Dimensions

| Device | Size | Count |
|--------|------|-------|
| iPhone 6.7" | 1290x2796 | 3-10 |
| iPhone 5.5" | 1242x2208 | 3-10 |
| iPad Pro 12.9" | 2048x2732 | 3-10 |

### Suggested Screenshots

1. **Home screen** - Daily journey view
2. **Puzzle solving** - Interactive puzzle
3. **Play vs Engine** - Game in progress
4. **Opening explorer** - Tree view
5. **Progress tracking** - Stats dashboard
6. **Settings** - Customization options

### Tools for Screenshots
- Xcode Simulator (iOS)
- Android Emulator
- Figma/Sketch for frames

---

## 9. Submission Checklist

### iOS App Store

- [ ] App builds without errors in Xcode
- [ ] All required icons present
- [ ] Launch screen configured
- [ ] Version and build number set
- [ ] Archive uploaded to App Store Connect
- [ ] App preview/screenshots uploaded
- [ ] Store listing complete
- [ ] Privacy policy linked
- [ ] Review notes provided (if needed)
- [ ] Contact information provided

### Google Play Store

- [ ] App builds without errors in Android Studio
- [ ] Signed AAB generated
- [ ] All required graphics present
- [ ] Store listing complete
- [ ] Data safety form complete
- [ ] Content rating complete
- [ ] Privacy policy linked
- [ ] Target API level compliant
- [ ] App bundle uploaded

---

## 10. Post-Release

### Monitoring
- Crash reports (Firebase Crashlytics recommended)
- App Store reviews
- Download analytics

### Update Strategy
- Regular bug fixes
- Feature updates
- Respond to user feedback

### Marketing
- App Store Optimization (ASO)
- Social media presence
- Chess community engagement

---

## Quick Commands

```bash
# iOS Build
npm run build
npx cap sync ios
cd ios/App && xcodebuild -scheme App -configuration Release

# Android Build
npm run build
npx cap sync android
cd android && ./gradlew assembleRelease
```

---

*Documentation completed: Phase 8*
*Last updated: December 2025*


