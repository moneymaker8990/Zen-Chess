# Fix Local Puzzle System - Setup Instructions

## Problem
Your localhost is showing only 50 basic fallback puzzles instead of the full adaptive Lichess puzzle database (10,000+ puzzles) that works on production.

## Root Cause
Missing Supabase credentials in your local development environment.

## Solution: Create .env File

### Step 1: Get Credentials from Vercel

1. Go to https://vercel.com/dashboard
2. Select your **Zen Chess** project
3. Navigate to **Settings → Environment Variables**
4. Find and copy these two values:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Step 2: Create .env File

Create a new file called `.env` in the project root:

```
zen-and-the-art-of-chess/.env
```

Add the following content (replace with your actual values from Vercel):

```env
# Supabase Configuration for Adaptive Puzzles
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional: Add other credentials if needed
# VITE_ANTHROPIC_API_KEY=your-key-here
```

### Step 3: Restart Dev Server

```bash
# Stop your current dev server (Ctrl+C)
npm run dev
```

### Step 4: Verify It's Working

1. Open http://localhost:5173
2. Navigate to the Puzzles page
3. Open DevTools Console (F12)
4. Look for:
   - ✅ **No "Using 50 static fallback puzzles" warning**
   - ✅ **Supabase queries in Network tab**
   - ✅ **Varied, adaptive puzzles based on your rating**

## What Changed

I've improved the error messaging in `puzzleService.ts` so you'll now see clear warnings in the console when Supabase credentials are missing:

```
⚠️ SUPABASE NOT CONFIGURED - Using fallback puzzles. Add credentials to .env
🧩 Puzzle System: Using 50 static fallback puzzles. Configure Supabase for full adaptive puzzle experience.
```

## Security Note

The `.env` file is already in `.gitignore` and will NOT be committed to git. Your credentials stay local and secure.

## Need Help?

If you don't have access to Vercel or can't find the credentials, let me know and we can:
1. Check your Supabase project directly
2. Regenerate the keys if needed
3. Set up a new Supabase project

---

**After setup:** Your localhost will have the same 10,000+ adaptive puzzle experience as production! 🎉

