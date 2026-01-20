# App Store Screenshot Requirements

This document outlines the screenshot requirements for Apple App Store and Google Play Store.

## Apple App Store (iOS)

### Required Device Sizes

| Device | Resolution | Aspect Ratio | Required |
|--------|-----------|--------------|----------|
| iPhone 6.9" (iPhone 16 Pro Max) | 1320 x 2868 | 9:19.5 | Yes |
| iPhone 6.7" (iPhone 15 Pro Max) | 1290 x 2796 | 9:19.5 | Yes |
| iPhone 6.5" (iPhone 14 Plus) | 1284 x 2778 | 9:19.5 | Yes |
| iPhone 5.5" (iPhone 8 Plus) | 1242 x 2208 | 9:16 | Yes |
| iPad 12.9" Pro (6th gen) | 2048 x 2732 | 3:4 | If iPad supported |
| iPad 12.9" Pro (2nd gen) | 2048 x 2732 | 3:4 | If iPad supported |

### Number of Screenshots
- **Minimum:** 1 screenshot per device
- **Maximum:** 10 screenshots per device
- **Recommended:** 5-8 screenshots showing key features

### iOS Screenshot Content Suggestions

1. **Home Screen** - Show the main dashboard/menu
2. **Puzzle Training** - Active puzzle being solved
3. **AI Coach** - Conversation with AI coach
4. **Pattern Learning** - Chess pattern explanation
5. **Play vs Engine** - Game in progress
6. **Progress Tracking** - User's achievements/streak
7. **Opening Repertoire** - Opening study screen
8. **Mindfulness Feature** - Breathing exercise or calm play

---

## Google Play Store (Android)

### Required Device Sizes

| Type | Resolution | Aspect Ratio | Required |
|------|-----------|--------------|----------|
| Phone | 1080 x 1920 (min 320 x 320) | 16:9 | Yes |
| 7" Tablet | 1200 x 1920 | 16:10 | If tablet supported |
| 10" Tablet | 1800 x 2560 | 16:10 | If tablet supported |

### Number of Screenshots
- **Minimum:** 2 screenshots
- **Maximum:** 8 screenshots
- **Recommended:** 4-8 screenshots

### Feature Graphic (Required)
- **Size:** 1024 x 500 pixels
- **Format:** PNG or JPEG
- **Use:** Displayed prominently in Play Store

### Additional Assets

| Asset | Size | Required |
|-------|------|----------|
| App Icon | 512 x 512 | Yes (already have) |
| Feature Graphic | 1024 x 500 | Yes |
| Promo Video | YouTube URL | Optional |
| TV Banner | 1280 x 720 | If Android TV supported |

---

## Screenshot Best Practices

### Do
- Use actual app screenshots (not mockups for main screenshots)
- Show the app in action with real content
- Highlight unique features (AI coaching, mindfulness integration)
- Use consistent styling across all screenshots
- Consider adding captions overlaid on screenshots
- Test screenshots on actual devices at target resolutions

### Don't
- Show empty states or error screens
- Include sensitive user data
- Use placeholder content
- Add excessive text that's hard to read
- Include device frames that don't match the target device

---

## Screenshot Capture Guide

### iOS

Using Xcode Simulator:
```bash
# Start simulator
npx cap open ios
# Build and run the app
# Use Cmd + S to capture screenshot
# Screenshots saved to Desktop
```

Using a real device:
- Press Side Button + Volume Up simultaneously
- Screenshots appear in Photos app

### Android

Using Android Studio Emulator:
```bash
# Start emulator
npx cap open android
# Build and run the app
# Click camera icon in emulator controls
# Or use Android Studio: View -> Tool Windows -> Device File Explorer
```

Using a real device:
- Press Power + Volume Down simultaneously
- Screenshots saved to Screenshots folder

---

## File Naming Convention

Save screenshots with descriptive names:

```
ios/
├── 6.9-inch/
│   ├── 01-home-screen.png
│   ├── 02-puzzle-training.png
│   ├── 03-ai-coach.png
│   ├── 04-pattern-learning.png
│   └── 05-progress-tracking.png
├── 6.5-inch/
│   └── (same naming)
└── 5.5-inch/
    └── (same naming)

android/
├── phone/
│   ├── 01-home-screen.png
│   ├── 02-puzzle-training.png
│   └── ...
├── feature-graphic.png
└── tablet/
    └── (if supported)
```

---

## Screenshot Checklist

### Before Capturing
- [ ] App in release/production mode
- [ ] Using polished UI (not debug)
- [ ] Test data that looks realistic
- [ ] No personal information visible
- [ ] Battery and time look normal
- [ ] Network connection indicator appropriate

### After Capturing
- [ ] Verify resolution matches requirements
- [ ] Check for any cut-off content
- [ ] Ensure text is readable
- [ ] Test file size (< 8MB for iOS, varies for Android)
- [ ] Verify proper color profile (sRGB)

---

## Existing Assets

The following PWA/splash assets already exist in `/public`:

| File | Size | Use |
|------|------|-----|
| pwa-192x192.png | 192x192 | PWA icon |
| pwa-512x512.png | 512x512 | PWA icon / Play Store icon |
| apple-touch-icon.png | 180x180 | iOS home screen |
| splash-1125x2436.png | 1125x2436 | iOS splash |
| splash-1170x2532.png | 1170x2532 | iOS splash |
| splash-1284x2778.png | 1284x2778 | iOS splash |

---

## Tools for Screenshot Enhancement

### Adding Device Frames
- [Shots](https://shots.so/) - Beautiful device mockups
- [MockuPhone](https://mockuphone.com/) - Free device frames
- [AppLaunchpad](https://theapplaunchpad.com/) - Screenshot generator

### Adding Captions/Text
- Figma - Design tool with templates
- Canva - Easy drag-and-drop design
- Screenshots Pro - iOS app for adding text

### Automation
- [Fastlane Snapshot](https://docs.fastlane.tools/actions/snapshot/) - Automated iOS screenshots
- [Fastlane Screengrab](https://docs.fastlane.tools/actions/screengrab/) - Automated Android screenshots
