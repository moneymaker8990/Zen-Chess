# Performance Optimization Guide

## Executive Summary

This document covers performance optimizations for the Zen Chess app, focusing on:
- Mobile-first experience
- Bundle size optimization
- Runtime performance
- PWA caching strategies

---

## 1. Build & Bundle Optimization

### Current Vite Config ✅
- **React plugin**: Standard React Fast Refresh
- **VitePWA**: Service worker with intelligent caching
- **Path aliases**: Clean imports via `@/`
- **WASM handling**: Stockfish WASM excluded from optimization

### Recommendations

#### Code Splitting (Already Implemented via React Router)
All 41 pages are separate components, allowing for route-based code splitting via dynamic imports if needed.

#### Bundle Analysis
```bash
# Run to analyze bundle
npm run build -- --mode production
npx vite-bundle-visualizer
```

#### Potential Optimizations
1. **Lazy load heavy pages**: Consider wrapping less-used pages with `React.lazy()`
2. **Tree-shake unused dependencies**: Verify no dead code in production

---

## 2. Runtime Performance

### Chessboard Rendering ✅

The `useBoardSize` hook is well-optimized:
- Debounced resize calculations
- Mobile-first breakpoints
- Orientation change handling
- ResizeObserver for container-based sizing

### State Management (Zustand) ✅

Zustand stores are properly structured:
- Separate stores for different concerns
- Persist middleware for localStorage
- Selective subscriptions prevent unnecessary re-renders

### Potential Improvements

#### Memoization Checklist
- [ ] Verify heavy computations are memoized with `useMemo`
- [ ] Check callback stability with `useCallback`
- [ ] Review chess.js game instances for unnecessary recreations

#### Example Pattern
```typescript
// Good: Memoize puzzle filtering
const filteredPuzzles = useMemo(() => 
  allPuzzles.filter(p => p.difficulty === selectedDifficulty),
  [selectedDifficulty]
);

// Good: Stable callback
const handleMove = useCallback((from: Square, to: Square) => {
  // move logic
}, [game, currentPuzzle]);
```

---

## 3. Mobile-First Optimization

### Current Implementation ✅

| Feature | Status | Notes |
|---------|--------|-------|
| Responsive board size | ✅ | `useBoardSize` hook |
| Touch targets | ✅ | 44px minimum |
| Viewport meta | ✅ | Proper mobile viewport |
| Orientation handling | ✅ | Resize on orientation change |
| Safe area margins | ✅ | Extra padding on mobile |

### Mobile Performance Checklist

- [x] Board renders within viewport on all devices
- [x] No horizontal scroll on mobile
- [x] Touch gestures work for piece movement
- [x] Sound system works on iOS (user interaction required)
- [x] PWA installable on mobile

### Capacitor Considerations

For iOS/Android builds:
- WebView performance matches native React performance
- Stockfish runs in Web Worker (off main thread)
- Images cached via service worker

---

## 4. PWA Caching Strategy ✅

### Cache Configuration (vite.config.ts)

| Resource | Strategy | Expiration |
|----------|----------|------------|
| HTML (navigation) | NetworkFirst | 1 hour |
| JS bundles | NetworkFirst | 1 day |
| Google Fonts | CacheFirst | 1 year |
| Images | StaleWhileRevalidate | 30 days |
| Stockfish WASM | Precache | Permanent |

### Offline Capability
- Pages load from cache when offline
- User data persisted in localStorage
- Sound preloading for offline playback

---

## 5. Image & Asset Optimization

### Current State
- SVG for icons (crisp at any scale)
- PNG for PWA icons (required by manifest)
- Sound files loaded from Lichess CDN (with fallback)

### Recommendations

1. **Compress PNG icons**:
   ```bash
   npx imagemin-cli public/*.png --out-dir=public
   ```

2. **Use WebP where supported**:
   - Add WebP alternatives for larger images
   - Use `<picture>` element for fallback

3. **Lazy load images**:
   ```tsx
   <img loading="lazy" src="..." />
   ```

---

## 6. Stockfish Engine Performance

### Current Setup ✅
- Runs in Web Worker (non-blocking)
- WASM version for performance
- Request queuing for thread safety
- Health monitoring with auto-recovery

### Optimization Tips

1. **Limit analysis depth**:
   - Default: 12 (good balance)
   - Mobile: Consider 10 for battery

2. **Cancel unnecessary analysis**:
   ```typescript
   // Stop analysis when leaving page
   useEffect(() => () => stockfish.stop(), []);
   ```

3. **Debounce position analysis**:
   ```typescript
   // Don't analyze every keystroke in explorer
   const debouncedAnalyze = useMemo(
     () => debounce((fen) => stockfish.analyzePosition(fen, cb), 300),
     []
   );
   ```

---

## 7. Performance Monitoring

### Development

```typescript
// React DevTools Profiler
// - Enable "Highlight updates" to see re-renders
// - Record performance profiles for slow interactions

// Browser DevTools
// - Performance tab for flame graphs
// - Memory tab for leak detection
// - Network tab for request waterfall
```

### Production

Consider adding (if not already):
```typescript
// Web Vitals tracking
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
```

---

## 8. Memory Management

### Cleanup Patterns ✅

All useEffect hooks should clean up:
```typescript
useEffect(() => {
  const handler = () => { /* ... */ };
  window.addEventListener('resize', handler);
  
  return () => window.removeEventListener('resize', handler);
}, []);
```

### Potential Memory Leaks to Watch

1. **Uncanceled timers**: Verify `setTimeout`/`setInterval` cleared
2. **Event listeners**: Check all event listeners removed
3. **Web Workers**: Stockfish singleton pattern prevents duplicates
4. **Audio contexts**: Limited to 2 (chess + UI sounds)

---

## 9. Critical Rendering Path

### Above-the-fold Content
- Hero section loads immediately
- Navigation visible without JS delay
- Skeleton screens for async content

### Lazy Loading Strategy
```typescript
// Pages that can be lazy-loaded (rarely visited)
const TournamentPrepPage = lazy(() => import('@/pages/TournamentPrepPage'));
const PricingPage = lazy(() => import('@/pages/PricingPage'));
```

---

## 10. Performance Checklist

### Before Release

- [ ] Run Lighthouse audit (target: 90+ on all metrics)
- [ ] Test on low-end Android device
- [ ] Test on older iPhone (SE, 8)
- [ ] Verify offline functionality
- [ ] Check bundle size under 1MB gzipped (main chunk)
- [ ] Confirm no memory leaks after 10 minutes of use

### Metrics Targets

| Metric | Target | Current |
|--------|--------|---------|
| First Contentful Paint | < 1.5s | TBD |
| Largest Contentful Paint | < 2.5s | TBD |
| Time to Interactive | < 3s | TBD |
| Total Blocking Time | < 200ms | TBD |
| Cumulative Layout Shift | < 0.1 | TBD |

---

## 11. Quick Wins

1. **Preload critical fonts**:
   ```html
   <link rel="preload" href="/fonts/..." as="font" crossorigin>
   ```

2. **DNS prefetch for external resources**:
   ```html
   <link rel="dns-prefetch" href="https://lichess1.org">
   <link rel="dns-prefetch" href="https://fonts.googleapis.com">
   ```

3. **Preconnect to critical origins**:
   ```html
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   ```

---

*Documentation completed: Phase 6*
*Last updated: December 2025*





