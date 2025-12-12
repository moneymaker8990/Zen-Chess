# 💰 Monetization Setup Guide

Complete guide to setting up payments for Zen Chess.

## Overview

We use a hybrid monetization approach:
- **Web**: Stripe for direct payments
- **iOS**: RevenueCat → App Store
- **Android**: RevenueCat → Google Play

## Step 1: Supabase Setup (Database & Auth)

### Create Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy URL and anon key to `.env`:
   ```
   VITE_SUPABASE_URL=https://xxx.supabase.co
   VITE_SUPABASE_ANON_KEY=xxx
   ```

### Run Database Schema
1. Open SQL Editor in Supabase
2. Paste contents of `supabase/schema.sql`
3. Execute

### Enable Auth Providers
1. Go to Authentication → Providers
2. Enable Email (default)
3. Enable Google OAuth (recommended):
   - Create credentials at console.cloud.google.com
   - Add redirect URI: `https://xxx.supabase.co/auth/v1/callback`

## Step 2: Stripe Setup (Web Payments)

### Create Stripe Account
1. Go to [stripe.com](https://stripe.com)
2. Create account and verify business

### Create Products
1. Go to Products → Add Product
2. Create these products:

**Premium Monthly**
- Name: Zen Chess Premium
- Price: $9.99/month
- Copy price ID → `VITE_STRIPE_PRICE_MONTHLY`

**Premium Yearly**
- Name: Zen Chess Premium Annual  
- Price: $59.99/year
- Copy price ID → `VITE_STRIPE_PRICE_YEARLY`

**Lifetime**
- Name: Zen Chess Lifetime
- Price: $149.99 one-time
- Copy price ID → `VITE_STRIPE_PRICE_LIFETIME`

### Get API Keys
1. Go to Developers → API Keys
2. Copy Publishable key → `VITE_STRIPE_PUBLISHABLE_KEY`
3. Copy Secret key (for backend only) → `STRIPE_SECRET_KEY`

### Set Up Webhooks
You need a backend to receive Stripe webhooks. Options:

**Option A: Supabase Edge Functions**
```bash
supabase functions new stripe-webhook
```

**Option B: Vercel API Routes**
Create `api/stripe-webhook.ts`:

```typescript
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export default async function handler(req, res) {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(
    req.body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  switch (event.type) {
    case 'checkout.session.completed':
      // Activate subscription
      break;
    case 'customer.subscription.updated':
      // Update subscription status
      break;
    case 'customer.subscription.deleted':
      // Cancel subscription
      break;
  }

  res.json({ received: true });
}
```

### Configure Webhook in Stripe
1. Go to Developers → Webhooks
2. Add endpoint: `https://your-api.com/api/stripe-webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`

## Step 3: RevenueCat Setup (Mobile IAP)

### Create RevenueCat Account
1. Go to [revenuecat.com](https://revenuecat.com)
2. Create account (free up to $2.5K MTR)

### Connect App Stores

**iOS:**
1. App Store Connect → Users and Access → Keys
2. Generate App Store Connect API Key
3. Add to RevenueCat

**Android:**
1. Google Play Console → Setup → API access
2. Create service account
3. Add to RevenueCat

### Create Products in RevenueCat
1. Create Entitlements:
   - `premium` - Access to premium features
   
2. Create Products matching Stripe:
   - `zen_chess_monthly` → $9.99/mo
   - `zen_chess_yearly` → $59.99/yr
   - `zen_chess_lifetime` → $149.99

### Install RevenueCat SDK
```bash
npm install @revenuecat/purchases-capacitor
```

### Configure in App
```typescript
// src/lib/revenuecat.ts
import Purchases from '@revenuecat/purchases-capacitor';

export async function initializeRevenueCat() {
  await Purchases.configure({
    apiKey: import.meta.env.VITE_REVENUECAT_KEY,
  });
}

export async function purchasePackage(packageId: string) {
  const offerings = await Purchases.getOfferings();
  const package_ = offerings.current?.availablePackages.find(
    p => p.identifier === packageId
  );
  
  if (package_) {
    const { customerInfo } = await Purchases.purchasePackage({ aPackage: package_ });
    return customerInfo.entitlements.active['premium']?.isActive;
  }
  return false;
}

export async function checkPremiumStatus() {
  const { customerInfo } = await Purchases.getCustomerInfo();
  return customerInfo.entitlements.active['premium']?.isActive ?? false;
}
```

## Step 4: Create App Store Products

### iOS (App Store Connect)
1. Go to App Store Connect → Your App → In-App Purchases
2. Create:
   - Auto-Renewable Subscription: zen_chess_monthly
   - Auto-Renewable Subscription: zen_chess_yearly
   - Non-Consumable: zen_chess_lifetime

3. Create Subscription Group: "Zen Chess Premium"
4. Submit for review (can take 24-48 hours)

### Android (Google Play Console)
1. Go to Play Console → Your App → Monetize → Products
2. Create:
   - Subscription: zen_chess_monthly
   - Subscription: zen_chess_yearly
   - One-time product: zen_chess_lifetime

## Step 5: Environment Variables

### Development (.env)
```
# Supabase
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx

# Stripe (Test Mode)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
VITE_STRIPE_PRICE_MONTHLY=price_xxx
VITE_STRIPE_PRICE_YEARLY=price_xxx
VITE_STRIPE_PRICE_LIFETIME=price_xxx

# RevenueCat
VITE_REVENUECAT_KEY=xxx

# API
VITE_API_URL=http://localhost:3000/api
```

### Production
Same keys but with live/production values.

## Step 6: Testing

### Test Stripe (Web)
1. Use test card: `4242 4242 4242 4242`
2. Any future expiry, any CVC
3. Verify webhook received in Stripe dashboard

### Test iOS
1. Create Sandbox tester in App Store Connect
2. Sign out of real App Store on device
3. Sign in with sandbox account
4. Make test purchase

### Test Android
1. Add test account in Play Console
2. License testing with that account
3. Make test purchase

## Pricing Strategy

### Recommended Prices

| Plan | Price | Why |
|------|-------|-----|
| Monthly | $9.99 | Standard for premium apps |
| Yearly | $59.99 | 50% discount, high LTV |
| Lifetime | $149.99 | ~15 months, attracts committed users |

### Free Trial
Consider offering:
- 7-day free trial on monthly/yearly
- No trial on lifetime (already one-time)

### Geographic Pricing
Use Stripe/App Store price tiers for:
- Lower prices in developing markets
- Higher prices in expensive markets (Switzerland, Norway)

## Launch Checklist

- [ ] Supabase project created
- [ ] Database schema deployed
- [ ] Auth providers configured
- [ ] Stripe account verified
- [ ] Stripe products created
- [ ] Stripe webhook configured
- [ ] RevenueCat account created
- [ ] RevenueCat connected to app stores
- [ ] RevenueCat products created
- [ ] iOS IAP products submitted
- [ ] Android IAP products created
- [ ] Test purchases working
- [ ] Webhook handling tested
- [ ] Production environment variables set

## Common Issues

### "No products available"
- IAP products not approved yet (iOS)
- RevenueCat not synced properly
- Wrong API keys (test vs live)

### Webhook not receiving
- Wrong endpoint URL
- HTTPS required in production
- Signature verification failing

### Subscription not activating
- User ID not matching
- Webhook not updating database
- Entitlement not configured

## Support Resources

- [Stripe Docs](https://stripe.com/docs)
- [RevenueCat Docs](https://docs.revenuecat.com)
- [Supabase Docs](https://supabase.com/docs)
- [App Store Connect Help](https://developer.apple.com/help/app-store-connect/)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer/)











