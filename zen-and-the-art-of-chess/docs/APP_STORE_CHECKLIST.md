# Zen Chess - App Store Publication Checklist

A complete step-by-step guide to publish Zen Chess on the Apple App Store and Google Play Store.

---

## Phase 1: Account Setup (Do Once)

### Apple Developer Account
- [ ] Go to [developer.apple.com](https://developer.apple.com)
- [ ] Click "Account" → "Enroll"
- [ ] Pay $99/year enrollment fee
- [ ] Wait 24-48 hours for approval
- [ ] Once approved, go to [App Store Connect](https://appstoreconnect.apple.com)

### Google Play Developer Account
- [ ] Go to [play.google.com/console](https://play.google.com/console)
- [ ] Sign in with Google account
- [ ] Pay $25 one-time registration fee
- [ ] Complete identity verification (takes 2-7 days)
- [ ] Accept Developer Distribution Agreement

---

## Phase 2: Third-Party Services Setup

### 2.1 Sentry (Crash Reporting)
1. [ ] Go to [sentry.io](https://sentry.io) and create account
2. [ ] Create new project → Select "React"
3. [ ] Copy the DSN (looks like `https://xxx@xxx.ingest.sentry.io/xxx`)
4. [ ] Add to your `.env` file:
   ```
   VITE_SENTRY_DSN=https://your-dsn-here
   ```

### 2.2 PostHog (Analytics)
1. [ ] Go to [posthog.com](https://posthog.com) and create account
2. [ ] Create new project
3. [ ] Go to Project Settings → Project API Key
4. [ ] Add to your `.env` file:
   ```
   VITE_POSTHOG_KEY=phc_your_key_here
   VITE_POSTHOG_HOST=https://app.posthog.com
   ```

### 2.3 Supabase (Already configured - verify)
1. [ ] Confirm your Supabase project is set up at [supabase.com](https://supabase.com)
2. [ ] Verify `.env` has:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
3. [ ] Enable Email Auth in Supabase Dashboard:
   - Authentication → Providers → Email → Enable
   - Configure email templates for verification

### 2.4 Stripe (Web Payments)
1. [ ] Go to [stripe.com](https://stripe.com) and create account
2. [ ] Complete business verification
3. [ ] Create products in Stripe Dashboard:
   - Monthly subscription
   - Yearly subscription
   - Lifetime purchase
4. [ ] Add to `.env`:
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
   VITE_STRIPE_PRICE_MONTHLY=price_xxx
   VITE_STRIPE_PRICE_YEARLY=price_xxx
   VITE_STRIPE_PRICE_LIFETIME=price_xxx
   ```

### 2.5 RevenueCat (Mobile Payments)
1. [ ] Go to [revenuecat.com](https://revenuecat.com) and create account
2. [ ] Create new project "Zen Chess"
3. [ ] Add iOS app (requires Apple Developer account)
4. [ ] Add Android app (requires Play Console account)
5. [ ] Create Products matching your Stripe products
6. [ ] Add to `.env`:
   ```
   VITE_REVENUECAT_IOS_KEY=appl_xxx
   VITE_REVENUECAT_ANDROID_KEY=goog_xxx
   ```

---

## Phase 3: App Content Preparation

### 3.1 App Store Metadata
Create a document with the following (you'll need this for both stores):

- [ ] **App Name:** Zen Chess (or your chosen name, max 30 chars)
- [ ] **Subtitle:** Master Chess Through Mindfulness (max 30 chars)
- [ ] **Short Description:** (max 80 chars for Play Store)
  ```
  AI-powered chess training with mindfulness. Learn from legends, master patterns.
  ```
- [ ] **Full Description:** (max 4000 chars)
  ```
  Zen Chess is the world's first chess app that combines AI coaching with
  mindfulness training. Whether you're a beginner or an experienced player,
  our 12 specialized AI agents guide every aspect of your game.

  FEATURES:
  • AI Coach - Personal guidance from Claude AI
  • 245+ Pattern Training exercises
  • Learn from Chess Legends (Kasparov, Fischer, Carlsen)
  • Opening Repertoire Builder
  • Tilt Prevention System
  • Breathing Exercises & Calm Play Mode
  • 365-Day Structured Learning Journey
  • Puzzle Training with Spaced Repetition
  • Game Analysis with Engine Support

  MINDFULNESS INTEGRATION:
  The only chess app that trains your mind and emotions, not just tactics.
  Prevent tilt, build focus, and develop the mental game of a champion.

  PREMIUM FEATURES:
  • Unlimited puzzles and games
  • Full AI coaching access
  • Advanced pattern training
  • Cloud sync across devices
  ```
- [ ] **Keywords:** chess, AI, learning, puzzles, mindfulness, training, strategy
- [ ] **Category:** Games → Board (iOS) / Games → Board (Android)
- [ ] **Content Rating:** Complete questionnaires (likely Everyone/4+)

### 3.2 Legal Pages (Already exist - verify URLs)
- [ ] Privacy Policy hosted at: `https://your-domain.com/privacy`
- [ ] Terms of Service hosted at: `https://your-domain.com/terms`
- [ ] Verify pages are accessible and up-to-date

### 3.3 Support Information
- [ ] Support Email: support@zenchess.app (or your email)
- [ ] Support URL: https://your-domain.com/support (optional)
- [ ] Marketing URL: https://your-domain.com (optional)

---

## Phase 4: Visual Assets Creation

### 4.1 App Icon (Already exists - verify quality)
- [ ] Verify `public/pwa-512x512.png` looks good at small sizes
- [ ] iOS requires no transparency, no rounded corners (system adds them)
- [ ] Android adaptive icons configured in `android/app/src/main/res/`

### 4.2 Screenshots (REQUIRED - Must Create)

#### For iPhone (Required sizes)
Capture these screens from the app running on a device/simulator:

| Screenshot | Content to Show |
|------------|-----------------|
| 1 | Home dashboard with features visible |
| 2 | Puzzle training in action |
| 3 | AI Coach conversation |
| 4 | Pattern learning explanation |
| 5 | Opening repertoire view |
| 6 | Progress/achievements screen |

**Required resolutions:**
- [ ] 6.7" (1290 x 2796) - iPhone 15 Pro Max
- [ ] 6.5" (1284 x 2778) - iPhone 14 Plus
- [ ] 5.5" (1242 x 2208) - iPhone 8 Plus

**How to capture:**
```bash
# Run iOS simulator
npm run mobile:ios
# In Simulator: Cmd + S to save screenshot
```

#### For Android (Required)
- [ ] Phone screenshots (1080 x 1920 minimum)
- [ ] Feature Graphic (1024 x 500) - promotional banner

**How to capture:**
```bash
# Run Android emulator
npm run mobile:android
# Use emulator's camera button or Android Studio capture
```

### 4.3 Optional but Recommended
- [ ] App Preview Video (15-30 seconds showing app in use)
- [ ] Promotional Text for featuring

---

## Phase 5: Android Build & Release

### 5.1 Generate Signing Key (Do Once)
```bash
cd android/app

# Generate keystore
keytool -genkeypair -v -storetype PKCS12 \
  -keystore release-key.keystore \
  -alias zen-chess \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# When prompted:
# - Enter a strong password (SAVE THIS!)
# - Enter your name/organization details
```

- [ ] Save `release-key.keystore` in a secure location (Dropbox, 1Password, etc.)
- [ ] Save the password in a password manager
- [ ] **NEVER** commit the keystore to git

### 5.2 Configure Signing
```bash
# Copy the example file
cp android/app/signing.properties.example android/app/signing.properties

# Edit signing.properties with your values:
STORE_FILE=release-key.keystore
STORE_PASSWORD=your_password_here
KEY_ALIAS=zen-chess
KEY_PASSWORD=your_password_here
```

### 5.3 Build Release
```bash
# Bump version (first release = 1.0.0, already set)
# For updates: npm run version:patch

# Build web app
npm run build

# Sync and build Android
npx cap sync android
cd android
./gradlew bundleRelease

# Output: android/app/build/outputs/bundle/release/app-release.aab
```

### 5.4 Create Play Store Listing
1. [ ] Go to [Google Play Console](https://play.google.com/console)
2. [ ] Click "Create app"
3. [ ] Fill in:
   - App name: Zen Chess
   - Default language: English
   - App or game: Game
   - Free or paid: Free (with in-app purchases)
4. [ ] Complete Store Listing:
   - [ ] Short description
   - [ ] Full description
   - [ ] Upload screenshots (phone required, tablet optional)
   - [ ] Upload feature graphic (1024x500)
   - [ ] App icon (512x512 - auto-pulled from APK usually)
5. [ ] Complete Content Rating questionnaire
6. [ ] Set up Pricing & Distribution
7. [ ] Complete App Content declarations:
   - [ ] Privacy policy URL
   - [ ] Ads declaration (no ads)
   - [ ] App access (if login required for features)
   - [ ] Content ratings
   - [ ] Target audience
   - [ ] Data safety form

### 5.5 Upload & Submit
1. [ ] Go to Release → Production → Create new release
2. [ ] Upload your `.aab` file
3. [ ] Add release notes
4. [ ] Review and roll out
5. [ ] Wait for review (typically 1-3 days, up to 7 days first time)

---

## Phase 6: iOS Build & Release

### 6.1 Configure Xcode Project
```bash
# Build web app
npm run build

# Sync with Capacitor
npx cap sync ios

# Open Xcode
npx cap open ios
```

In Xcode:
1. [ ] Select "App" target in left sidebar
2. [ ] Go to "Signing & Capabilities" tab
3. [ ] Select your Team (Apple Developer account)
4. [ ] Check "Automatically manage signing"
5. [ ] Xcode will create certificates/profiles automatically

### 6.2 Configure App Details in Xcode
1. [ ] Verify Bundle Identifier: `com.zenchess.app`
2. [ ] Verify Version: 1.0.0
3. [ ] Verify Build: 10000 (or appropriate number)
4. [ ] Check Display Name: Zen Chess

### 6.3 Build Archive
1. [ ] Select "Any iOS Device" as build target (not a simulator)
2. [ ] Product → Archive
3. [ ] Wait for build to complete
4. [ ] Window → Organizer opens automatically

### 6.4 Upload to App Store Connect
1. [ ] In Organizer, select your archive
2. [ ] Click "Distribute App"
3. [ ] Select "App Store Connect"
4. [ ] Click "Upload"
5. [ ] Wait for upload and processing (10-30 minutes)

### 6.5 Create App Store Listing
1. [ ] Go to [App Store Connect](https://appstoreconnect.apple.com)
2. [ ] My Apps → + → New App
3. [ ] Fill in:
   - Platform: iOS
   - Name: Zen Chess
   - Primary Language: English
   - Bundle ID: com.zenchess.app
   - SKU: zenchess001
4. [ ] Complete App Information:
   - [ ] Subtitle
   - [ ] Privacy Policy URL
   - [ ] Category: Games → Board
5. [ ] Complete Pricing and Availability:
   - [ ] Price: Free
   - [ ] In-App Purchases: Configure after app approved
6. [ ] Go to iOS App → Version:
   - [ ] Upload screenshots for each device size
   - [ ] Add description
   - [ ] Add keywords
   - [ ] Add support URL
   - [ ] Set age rating
   - [ ] Select build (the one you uploaded)

### 6.6 Submit for Review
1. [ ] Ensure all fields are complete (green checkmarks)
2. [ ] Click "Add for Review"
3. [ ] Answer export compliance questions (No encryption = No)
4. [ ] Submit
5. [ ] Wait for review (typically 1-2 days)

---

## Phase 7: Post-Launch

### 7.1 Monitor
- [ ] Check Sentry dashboard for crashes daily (first week)
- [ ] Check PostHog for user analytics
- [ ] Monitor app store reviews
- [ ] Respond to user feedback

### 7.2 Set Up CI/CD Secrets (for automated releases)
In GitHub repository Settings → Secrets:

**Android:**
- [ ] `ANDROID_KEYSTORE_BASE64`: Run `base64 -i release-key.keystore`
- [ ] `ANDROID_KEYSTORE_PASSWORD`: Your keystore password
- [ ] `ANDROID_KEY_ALIAS`: zen-chess
- [ ] `ANDROID_KEY_PASSWORD`: Your key password

**Environment:**
- [ ] `VITE_SUPABASE_URL`
- [ ] `VITE_SUPABASE_ANON_KEY`
- [ ] `VITE_STRIPE_PUBLISHABLE_KEY`
- [ ] `VITE_SENTRY_DSN`
- [ ] `VITE_POSTHOG_KEY`

### 7.3 Future Updates
For each new version:
```bash
# 1. Bump version
npm run version:patch  # or minor/major

# 2. Commit and tag
git add .
git commit -m "Release v1.0.1"
git tag v1.0.1
git push && git push --tags

# 3. GitHub Actions will build automatically (if secrets configured)
# 4. Or manually build and upload as in Phase 5/6
```

---

## Quick Reference: Timeline Estimate

| Phase | Time Required |
|-------|--------------|
| Account Setup | 1-7 days (verification) |
| Third-Party Services | 2-4 hours |
| Content Preparation | 2-4 hours |
| Visual Assets | 4-8 hours |
| Android Build & Submit | 2-4 hours |
| iOS Build & Submit | 2-4 hours |
| App Review | 1-7 days each store |

**Total: ~2-3 weeks** from start to apps live in stores

---

## Troubleshooting

### "App rejected for metadata"
- Check screenshots match actual app
- Verify description doesn't have banned words
- Ensure privacy policy is accessible

### "App rejected for bugs"
- Test thoroughly on real devices
- Check Sentry for crash reports
- Fix and resubmit

### "Build fails to upload"
- Check certificate/provisioning profiles (iOS)
- Verify keystore passwords (Android)
- Ensure version/build numbers are incremented

### Need Help?
- Apple: [developer.apple.com/support](https://developer.apple.com/support)
- Google: [support.google.com/googleplay/android-developer](https://support.google.com/googleplay/android-developer)
- Capacitor: [capacitorjs.com/docs](https://capacitorjs.com/docs)
