# RevenueCat Setup Guide

RevenueCat handles in-app purchases for iOS and Android, giving you a unified API and dashboard for managing subscriptions.

## Why RevenueCat?

1. **One SDK for iOS & Android** - No need to learn both StoreKit and Google Play Billing
2. **Server-side receipt validation** - Prevents fraud
3. **Webhooks** - Sync subscription status to your backend
4. **Analytics** - Revenue, churn, LTV tracking
5. **Free tier** - $2,500 MTR before you pay anything

## Step 1: Create RevenueCat Account

1. Go to [revenuecat.com](https://www.revenuecat.com)
2. Sign up (free)
3. Create a new project for "Zen Chess"

## Step 2: Connect App Stores

### iOS (App Store Connect)

1. In RevenueCat dashboard, go to **Project Settings** → **Apps** → **Add New App**
2. Select "iOS"
3. Create an **App Store Connect API Key**:
   - Go to [App Store Connect](https://appstoreconnect.apple.com)
   - Navigate to **Users and Access** → **Keys**
   - Click the **+** to add a key
   - Name: "RevenueCat"
   - Access: "Admin" (or at least "App Manager")
   - Download the `.p8` file
4. Upload the key to RevenueCat
5. Enter your **Bundle ID**: `com.zenchess.app` (or your actual bundle ID)

### Android (Google Play Console)

1. In RevenueCat dashboard, add a new Android app
2. Create a **Service Account** in Google Cloud:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a service account
   - Grant "Editor" role
   - Create and download JSON key
3. In Google Play Console:
   - Go to **Setup** → **API access**
   - Link the service account
   - Grant "Admin" permissions
4. Upload the JSON key to RevenueCat
5. Enter your **Package Name**: `com.zenchess.app`

## Step 3: Create Products in App Stores

### iOS Products (App Store Connect)

1. Go to App Store Connect → Your App → **In-App Purchases**
2. Create a **Subscription Group** called "Zen Chess Premium"
3. Create subscriptions:

| Reference Name | Product ID | Duration | Price |
|----------------|------------|----------|-------|
| Monthly | `zen_chess_monthly` | 1 month | $9.99 |
| Yearly | `zen_chess_yearly` | 1 year | $59.99 |

4. Create a non-consumable for lifetime:

| Reference Name | Product ID | Price |
|----------------|------------|-------|
| Lifetime | `zen_chess_lifetime` | $149.99 |

5. Submit products for review

### Android Products (Google Play Console)

1. Go to Play Console → Your App → **Monetize** → **Products**
2. Create subscriptions:
   - `zen_chess_monthly` - $9.99/month
   - `zen_chess_yearly` - $59.99/year
3. Create one-time product:
   - `zen_chess_lifetime` - $149.99

## Step 4: Configure RevenueCat Products

### Create Entitlements

1. In RevenueCat → **Project** → **Entitlements**
2. Create entitlement: `premium`
3. This is what your app checks for access

### Create Products

1. Go to **Products**
2. Add each product:
   - `zen_chess_monthly` (iOS + Android)
   - `zen_chess_yearly` (iOS + Android)
   - `zen_chess_lifetime` (iOS + Android)
3. Link each product to the `premium` entitlement

### Create Offerings

1. Go to **Offerings**
2. Create offering: `default`
3. Add packages:
   - Monthly → `zen_chess_monthly`
   - Annual → `zen_chess_yearly`
   - Lifetime → `zen_chess_lifetime`
4. Set as "Current Offering"

## Step 5: Get API Keys

1. Go to **Project Settings** → **API Keys**
2. Copy the public keys:
   - iOS: `appl_xxxxxxxxxx`
   - Android: `goog_xxxxxxxxxx`
3. Add to your `.env`:

```env
VITE_REVENUECAT_IOS_KEY=appl_your_ios_key
VITE_REVENUECAT_ANDROID_KEY=goog_your_android_key
```

## Step 6: Native Setup

### iOS

Add to `ios/App/App/AppDelegate.swift` (if not automatic):

```swift
import Purchases

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // RevenueCat is configured via Capacitor plugin
        return true
    }
}
```

### Android

Add to `android/app/build.gradle`:

```gradle
dependencies {
    implementation "com.revenuecat.purchases:purchases:6.+"
}
```

## Step 7: Sync Capacitor

Run after making native changes:

```bash
npm run cap:sync
```

## Step 8: Test Purchases

### iOS Sandbox Testing

1. Create sandbox tester in App Store Connect:
   - **Users and Access** → **Sandbox Testers**
   - Add a new tester (use a unique email)
2. On your test device:
   - Sign out of App Store
   - Open Zen Chess
   - Try to purchase
   - Sign in with sandbox account when prompted
3. Sandbox purchases don't charge real money

### Android Test Purchases

1. In Play Console → **Setup** → **License Testing**
2. Add your test email
3. Publish app to internal testing track
4. Test purchases won't charge

## Step 9: Webhooks (Optional but Recommended)

Set up webhooks to sync subscription status to your Supabase database:

1. In RevenueCat → **Project Settings** → **Webhooks**
2. Add webhook URL: `https://your-project.supabase.co/functions/v1/revenuecat-webhook`
3. Select events:
   - `INITIAL_PURCHASE`
   - `RENEWAL`
   - `CANCELLATION`
   - `EXPIRATION`
   - `BILLING_ISSUE`

### Supabase Edge Function

Create `supabase/functions/revenuecat-webhook/index.ts`:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

serve(async (req) => {
  const event = await req.json()
  
  const userId = event.app_user_id
  const eventType = event.type
  
  switch (eventType) {
    case 'INITIAL_PURCHASE':
    case 'RENEWAL':
      await supabase.from('profiles').update({
        subscription_tier: 'premium',
        subscription_status: 'active',
        subscription_end_date: event.expiration_at_ms 
          ? new Date(event.expiration_at_ms).toISOString() 
          : null,
      }).eq('id', userId)
      break
      
    case 'CANCELLATION':
      await supabase.from('profiles').update({
        subscription_status: 'canceled',
      }).eq('id', userId)
      break
      
    case 'EXPIRATION':
      await supabase.from('profiles').update({
        subscription_tier: 'free',
        subscription_status: null,
        subscription_end_date: null,
      }).eq('id', userId)
      break
  }
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

## Using in Your App

### Check Premium Status

```typescript
import { useRevenueCat } from '@/hooks/useRevenueCat';

function MyComponent() {
  const { isPremium, tier, packages, purchase, restore } = useRevenueCat();
  
  if (isPremium) {
    return <PremiumContent />;
  }
  
  return (
    <div>
      {packages.map(pkg => (
        <button key={pkg.identifier} onClick={() => purchase(pkg)}>
          {pkg.product.title} - {pkg.product.priceString}
        </button>
      ))}
      <button onClick={restore}>Restore Purchases</button>
    </div>
  );
}
```

### Link to User Account

```typescript
import { identifyUser } from '@/lib/revenuecat';

// When user signs in
async function onUserSignIn(userId: string) {
  await identifyUser(userId);
}
```

## Troubleshooting

### "No products found"

- Products not approved in App Store Connect (iOS)
- Products not published in Play Console (Android)
- RevenueCat products not linked to entitlements
- Wrong product IDs

### "Purchase not working"

- Not using sandbox/test account
- Bundle ID mismatch
- API keys incorrect

### "Restore not finding purchases"

- User signed into different App Store account
- Purchases made with different RevenueCat app user ID

## Revenue Attribution

RevenueCat automatically tracks:
- Monthly Recurring Revenue (MRR)
- Customer Lifetime Value (LTV)
- Churn rate
- Trial conversion rate

View in RevenueCat Dashboard → **Charts**

## Support

- [RevenueCat Docs](https://docs.revenuecat.com)
- [RevenueCat Community](https://community.revenuecat.com)
- [Capacitor Plugin Docs](https://github.com/revenuecat/purchases-capacitor)






