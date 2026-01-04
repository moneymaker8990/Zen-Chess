# Fixing Cache Issues - Quick Guide

## Problem
The website is showing old content because the service worker is caching old files.

## Solution 1: Clear Service Worker Cache (Recommended)

### In Chrome/Edge:
1. Open DevTools (F12)
2. Go to **Application** tab
3. Click **Service Workers** in the left sidebar
4. Click **Unregister** for any registered service workers
5. Click **Clear storage** in the left sidebar
6. Check all boxes and click **Clear site data**
7. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### In Firefox:
1. Open DevTools (F12)
2. Go to **Application** tab
3. Click **Service Workers** in the left sidebar
4. Click **Unregister** for any registered service workers
5. Click **Storage** in the left sidebar
6. Click **Clear All** or manually clear each cache
7. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Quick Browser Method:
- **Chrome/Edge**: `Ctrl+Shift+Delete` → Select "Cached images and files" → Clear
- **Firefox**: `Ctrl+Shift+Delete` → Select "Cache" → Clear

## Solution 2: Use Development Mode (No Service Worker)

The service worker is now **disabled in development mode**. To see your changes:

1. Make sure you're running the dev server:
   ```powershell
   npm run dev
   ```

2. Open `http://localhost:5173` (not the deployed URL)

3. The service worker won't register in dev mode, so you'll always see fresh changes

## Solution 3: Rebuild and Redeploy

If you're viewing a deployed version (like Vercel):

1. Rebuild the project:
   ```powershell
   npm run build
   ```

2. Deploy the new build to your hosting service

3. Clear the service worker cache (see Solution 1)

## What Changed

- ✅ Service worker is **disabled in development mode**
- ✅ Cache times reduced to 0 in development
- ✅ Auto-update enabled in development mode
- ✅ More aggressive cache clearing in production

## Still Not Working?

1. **Check you're on localhost**: Make sure the URL is `http://localhost:5173` not a deployed URL
2. **Restart dev server**: Stop and restart `npm run dev`
3. **Check browser console**: Look for any errors in DevTools
4. **Try incognito/private mode**: This bypasses all caches

