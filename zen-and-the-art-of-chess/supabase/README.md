# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Wait for the database to be provisioned

## 2. Run the Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the contents of `schema.sql`
3. Paste and run the SQL

## 3. Configure Authentication

### Enable Email Auth
1. Go to **Authentication** → **Providers**
2. Email should be enabled by default

### Enable Google Auth (Optional but Recommended)
1. Go to **Authentication** → **Providers** → **Google**
2. Enable Google provider
3. Add your Google OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`

## 4. Get API Keys

1. Go to **Settings** → **API**
2. Copy the `URL` and `anon public` key
3. Add them to your `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 5. Configure RLS (Row Level Security)

The schema.sql file already sets up RLS policies. Make sure they're enabled:

1. Go to **Database** → **Tables**
2. For each table (profiles, user_progress, subscriptions):
   - Click on the table
   - Go to **RLS** tab
   - Verify RLS is enabled

## 6. Test Your Setup

After adding the environment variables and restarting your dev server:

1. Go to `/auth` in your app
2. Try signing up with an email
3. Check your Supabase dashboard for the new user

## Stripe Webhook Setup

To handle subscription updates, you'll need to set up Stripe webhooks:

### Option A: Supabase Edge Functions

Create an edge function to handle Stripe webhooks:

```typescript
// supabase/functions/stripe-webhook/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2022-11-15',
})

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')!
  const body = await req.text()
  
  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    Deno.env.get('STRIPE_WEBHOOK_SECRET')!
  )
  
  // Handle the event...
})
```

### Option B: Vercel API Routes

See `/api/stripe-webhook.ts` for a Vercel-compatible webhook handler.

## Database Backup

Enable Point-in-Time Recovery in your Supabase project settings for automatic backups.







