# Zen Chess - Mobile App Setup

Your app is now ready for mobile deployment! Here's how to get it running on your phone.

## Quick Start

### For Android (Easiest - works on Windows)

1. **Install Android Studio**: Download from https://developer.android.com/studio

2. **Open the Android project**:
   ```powershell
   npm run mobile:android
   ```
   This builds the web app and opens Android Studio.

3. **Run on your phone**:
   - Connect your Android phone via USB
   - Enable "Developer Options" and "USB Debugging" on your phone
   - In Android Studio, click the green "Run" button (▶️)
   - Select your connected device

4. **Build an APK to share**:
   - In Android Studio: `Build > Build Bundle(s) / APK(s) > Build APK(s)`
   - The APK will be in `android/app/build/outputs/apk/debug/`
   - Send this file to your phone and install it!

### For iOS (Requires a Mac)

1. **Install Xcode** from the Mac App Store

2. **Install CocoaPods**:
   ```bash
   sudo gem install cocoapods
   ```

3. **Open the iOS project**:
   ```bash
   npm run mobile:ios
   ```

4. **Run on your iPhone**:
   - Connect your iPhone
   - Select it as the target device in Xcode
   - Click the "Run" button

## Development Workflow

After making changes to your React code:

```powershell
# Build and sync to both platforms
npm run mobile:build

# Or sync to just one platform
npm run build && npx cap sync android
npm run build && npx cap sync ios
```

## Live Reload (Development)

For faster development, enable live reload:

1. Find your computer's IP address:
   ```powershell
   ipconfig
   ```

2. Edit `capacitor.config.ts`:
   ```typescript
   server: {
     url: 'http://YOUR_IP:5173',
     cleartext: true,
   }
   ```

3. Run the dev server:
   ```powershell
   npm run dev -- --host
   ```

4. Run the app on your device - it will connect to your dev server!

5. **Important**: Remove the `url` line before building for production!

## Custom App Icon & Splash Screen

To customize your app icon:

1. Create a 1024x1024 PNG icon
2. Create a 2732x2732 PNG splash screen
3. Place them in a `resources` folder:
   ```
   resources/
     icon.png
     splash.png
   ```

4. Generate the assets:
   ```powershell
   npx @capacitor/assets generate
   ```

## Building for App Store / Play Store

### Android (Play Store)

1. Generate a signing key:
   ```bash
   keytool -genkey -v -keystore zen-chess.keystore -alias zen-chess -keyalg RSA -keysize 2048 -validity 10000
   ```

2. In Android Studio: `Build > Generate Signed Bundle / APK`

3. Upload to Google Play Console: https://play.google.com/console

### iOS (App Store)

1. In Xcode, set up your Apple Developer account
2. Archive: `Product > Archive`
3. Upload to App Store Connect via Xcode

## Troubleshooting

### "SDK location not found" (Android)
Create `android/local.properties` with:
```
sdk.dir=C\:\\Users\\YOUR_USERNAME\\AppData\\Local\\Android\\Sdk
```

### App is blank or crashes
- Check the browser console: `chrome://inspect` (for Android)
- Make sure you ran `npm run build` before syncing

### Changes not appearing
Always run `npm run mobile:build` after code changes!

---

**Your app ID**: `com.zenchess.app`  
**App Name**: Zen Chess

Need to change these? Edit `capacitor.config.ts` and the platform-specific files in `android/` and `ios/`.








