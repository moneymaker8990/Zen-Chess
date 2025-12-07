# Stability & Error Handling Guide

## Overview

This document covers the app's stability mechanisms, offline handling, and error recovery systems.

---

## 1. Error Boundaries

### Global Error Boundary

Located at `src/components/ErrorBoundary.tsx`, wraps the entire app.

**Features:**
- Catches all unhandled React errors
- Logs errors to localStorage for debugging
- Provides recovery options:
  - "Go to Home" - Resets state and navigates home
  - "Reload Page" - Full page refresh
  - "Try Again" - Attempt to recover current state
  - "Reset all data" - Nuclear option for corrupted state

### Mini Error Boundary

For smaller components that shouldn't crash the whole app:

```tsx
<MiniErrorBoundary name="Chessboard">
  <ChessboardComponent />
</MiniErrorBoundary>
```

Shows a localized error message with retry option.

---

## 2. Offline Handling

### OfflineIndicator Component

New component at `src/components/OfflineIndicator.tsx`:
- Shows banner when app goes offline
- Explains what works offline vs. needs internet
- Can be dismissed by user
- Reappears when connection is lost again

### useOnlineStatus Hook

```tsx
import { useOnlineStatus } from '@/components/OfflineIndicator';

function MyComponent() {
  const isOnline = useOnlineStatus();
  
  if (!isOnline) {
    return <OfflineMessage />;
  }
  // ...
}
```

### What Works Offline

| Feature | Offline Support | Notes |
|---------|-----------------|-------|
| Puzzles | ✅ Full | Cached via service worker |
| Play vs Engine | ✅ Full | Stockfish runs locally |
| Daily Lessons | ✅ Full | Static content cached |
| Progress Tracking | ✅ Full | localStorage |
| Settings | ✅ Full | localStorage |
| Sound Effects | ⚠️ Partial | Works if previously loaded |
| Play with Friends | ❌ None | Requires real-time connection |
| Cloud Sync | ❌ None | Requires server |
| AI Coaching | ❌ None | Requires API |

### PWA Caching

The service worker (configured in `vite.config.ts`) provides:
- **NetworkFirst** for HTML and JS (fresh code, fallback to cache)
- **CacheFirst** for fonts (rarely change)
- **StaleWhileRevalidate** for images (show cached, update in background)

---

## 3. Data Persistence

### localStorage Keys

| Key | Purpose | Recovery |
|-----|---------|----------|
| `zen-chess-progress` | Main progress data | Reset to day 1 |
| `zen-chess-sounds` | Sound settings | Reset to defaults |
| `zenChessPuzzleStats` | Puzzle statistics | Reset to defaults |
| `courseProgress` | Course progress | Reset to empty |
| `zenChessErrorLog` | Error history | Clear on demand |

### Data Corruption Recovery

If localStorage data becomes corrupted:
1. App catches JSON parse errors
2. Falls back to default values
3. User can manually reset via Settings > Clear All Data

---

## 4. Stockfish Engine Stability

### Engine Health Monitoring

Located in `src/engine/stockfish.ts`:
- Tracks last message time
- Sends periodic "isready" pings
- Auto-recovers from stuck states

### Request Queuing

Prevents race conditions:
- One request processed at a time
- Queue for pending requests
- Timeout handling for stuck requests

### Crash Recovery

If Web Worker crashes:
- All pending requests rejected with error
- Engine reinitialized on next use
- User sees "Engine unavailable" message

---

## 5. Navigation Safety

### 404 Handling

- Global catch-all route renders `NotFoundPage`
- Dynamic routes (e.g., `/courses/:id`) validate parameters
- Invalid routes show helpful suggestions

### Route Protection

Pages with dynamic parameters validate data:
```tsx
// LegendDetailPage.tsx
if (!legendData) {
  return <LegendNotFound />;
}

// CourseDetailPage.tsx
if (notFound || !course) {
  return <CourseNotFound />;
}
```

---

## 6. State Management Safety

### Zustand Store Patterns

All stores use safe patterns:
```typescript
// Safe state updates
updateSettings: (newSettings) => set((state) => ({
  settings: { ...state.settings, ...newSettings }
}))

// Persist middleware with error handling
persist(
  (set) => ({ /* ... */ }),
  { 
    name: 'store-name',
    // Automatic handling of corrupted storage
  }
)
```

### React State Safety

- useCallback for stable callbacks
- useMemo for expensive computations
- Proper cleanup in useEffect

---

## 7. Network Request Handling

### API Error Handling

```typescript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.json();
} catch (error) {
  // Log error
  console.error('API Error:', error);
  // Show user-friendly message
  showToast('Unable to connect. Please try again.');
  // Return safe fallback
  return defaultValue;
}
```

### Retry Logic

For critical requests:
```typescript
async function fetchWithRetry(url: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}
```

---

## 8. User Feedback

### Toast Notifications

For transient messages:
- Success: Green theme, auto-dismiss
- Error: Red theme, requires dismiss
- Warning: Orange theme, auto-dismiss

### Loading States

All async operations show:
- Loading spinner or skeleton
- Progress indicator if quantifiable
- Cancel option for long operations

### Error Messages

User-friendly error messages:
- No technical jargon
- Clear action to take
- Contact support option if needed

---

## 9. Testing Stability

### Error Boundary Tests

```typescript
// tests/components/ErrorBoundary.test.tsx
it('should catch errors and show fallback', () => {
  const ThrowError = () => { throw new Error('Test error'); };
  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  );
  expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
});
```

### Offline Tests

```typescript
// Simulate offline
Object.defineProperty(navigator, 'onLine', { value: false });
window.dispatchEvent(new Event('offline'));

// Verify offline indicator shows
expect(screen.getByText(/You're Offline/)).toBeInTheDocument();
```

---

## 10. Monitoring & Debugging

### Error Log

Errors stored in localStorage:
```javascript
const errorLog = JSON.parse(localStorage.getItem('zenChessErrorLog') || '[]');
console.table(errorLog);
```

### Debug Mode

Access via browser console:
```javascript
// Enable verbose logging
localStorage.setItem('zenChessDebug', 'true');

// View all stored data
Object.keys(localStorage)
  .filter(k => k.includes('zen'))
  .forEach(k => console.log(k, localStorage.getItem(k)));
```

---

## 11. Recovery Procedures

### For Users

1. **App not loading**: Clear browser cache, reload
2. **Progress lost**: Check if logged in (cloud sync)
3. **Sounds not working**: Check Settings > Sound Effects
4. **Engine not responding**: Reload page

### For Support

1. **Collect error log**: Settings > About > Export Debug Info
2. **Check browser console**: F12 > Console tab
3. **Verify storage**: F12 > Application > Local Storage
4. **Test offline**: DevTools > Network > Offline

---

*Documentation completed: Phase 7*
*Last updated: December 2025*

