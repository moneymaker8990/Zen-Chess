# Accessibility & UX Polish Guide

## Executive Summary

This document covers accessibility (a11y) features and UX polish for Zen Chess. The goal is to ensure the app is usable by everyone, including users with disabilities, and provides a delightful experience across all platforms.

**Accessibility Rating**: 🟡 Good Foundation, Improvements Needed

---

## 1. Current Accessibility Features

### ✅ Already Implemented

#### Keyboard Navigation
- **Global keyboard shortcuts** via `useKeyboardShortcuts.ts`
  - `H` - Home
  - `P` - Play
  - `T` - Training/Puzzles
  - `C` - Coach
  - `O` - Openings
  - `M` - Mind Training
  - `J` - Journey
  - `S` - Settings
  - `Shift+?` - Show shortcuts help
  - `Escape` - Close dialogs

- **Game-specific shortcuts** via `useGameShortcuts`
  - `Ctrl+N` - New game
  - `F` - Flip board
  - `Ctrl+Z` - Undo
  - `Ctrl+Shift+Z` - Redo
  - `←/→` - Navigate moves
  - `I` - Hint

- **Puzzle-specific shortcuts** via `usePuzzleShortcuts`
  - `N` or `Space` - Next puzzle
  - `I` - Hint
  - `R` - Retry
  - `Shift+S` - Skip

#### Visual Accessibility
- **High contrast themes** available in board settings
- **Customizable board colors** (8+ themes)
- **Piece style options** (6+ styles including Neo for clarity)
- **Move highlights** showing legal moves and last move
- **Sound feedback** for all interactions

#### Touch Accessibility
- **Large touch targets** for mobile (48px minimum)
- **Responsive design** adapting to screen sizes
- **Safe area insets** for notched devices

---

## 2. Recommended Improvements

### High Priority

#### 2.1 ARIA Labels for Interactive Elements

Add `aria-label` attributes to all buttons and interactive elements:

```tsx
// Before
<button onClick={handleClick}>
  {Icons.play}
</button>

// After
<button 
  onClick={handleClick}
  aria-label="Start playing chess"
>
  {Icons.play}
</button>
```

**Key areas needing ARIA labels:**
- [ ] Navigation icons in Layout
- [ ] Chessboard squares (e.g., "Square e4, white pawn")
- [ ] Move list entries
- [ ] Settings toggles
- [ ] Floating action buttons (AskAnything, GeniusWhisper)
- [ ] Modal close buttons

#### 2.2 Screen Reader Announcements

Add live regions for dynamic content:

```tsx
// Create a screen reader announcer
function ScreenReaderAnnouncer({ message }: { message: string }) {
  return (
    <div 
      role="status" 
      aria-live="polite" 
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}
```

**Events requiring announcements:**
- Puzzle solved/failed
- Check/checkmate
- Move made (for blind users)
- Turn change
- Game end

#### 2.3 Focus Management

```tsx
// Add focus trap for modals
import { FocusTrap } from '@headlessui/react';

// Example usage
<FocusTrap>
  <ModalContent />
</FocusTrap>
```

**Dialogs needing focus traps:**
- Keyboard shortcuts help
- Settings modals
- Game over dialogs
- Promotion selection

### Medium Priority

#### 2.4 Color Contrast Improvements

Current contrast ratios should meet WCAG 2.1 AA standard (4.5:1 for text):

| Element | Current | Target |
|---------|---------|--------|
| Muted text | ~3.5:1 | 4.5:1 |
| Purple accent on dark | ~6:1 | ✅ OK |
| Gold accent on dark | ~7:1 | ✅ OK |

**CSS improvements:**
```css
:root {
  /* Improve muted text contrast */
  --text-muted: #9ca3af; /* was #6b7280 */
}
```

#### 2.5 Skip Navigation Links

Add skip links for keyboard users:

```tsx
// Add at top of Layout component
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded"
>
  Skip to main content
</a>

// Mark main content
<main id="main-content">
  {children}
</main>
```

#### 2.6 Reduced Motion Support

```css
/* Already using animations, add preference check */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Low Priority

#### 2.7 Semantic HTML Improvements

Ensure proper heading hierarchy:

```tsx
// Each page should have a clear h1
<h1 className="sr-only">Zen Chess - {pageName}</h1>

// Sections should use h2, subsections h3
<section aria-labelledby="puzzles-heading">
  <h2 id="puzzles-heading">Puzzles</h2>
  ...
</section>
```

#### 2.8 Form Accessibility

```tsx
// Add proper labels and descriptions
<label htmlFor="difficulty">Engine Difficulty</label>
<input 
  id="difficulty" 
  type="range" 
  aria-describedby="difficulty-desc"
/>
<span id="difficulty-desc" className="sr-only">
  Adjust from beginner (1) to grandmaster (20)
</span>
```

---

## 3. UX Polish Checklist

### Navigation & Flow

- [x] Clear back navigation on all pages
- [x] Breadcrumbs where appropriate
- [x] Loading states for all async operations
- [x] Error states with recovery options
- [x] 404 page with navigation back
- [x] Offline indicator

### Visual Feedback

- [x] Button hover/active states
- [x] Move highlight on chessboard
- [x] Legal move indicators
- [x] Puzzle success/failure feedback
- [x] Streak and achievement animations
- [x] Loading spinners for long operations

### Touch & Mobile

- [x] 48px minimum touch targets
- [x] Bottom navigation optimized for thumb reach
- [x] Safe area insets for notched devices
- [x] Pull-to-refresh where applicable
- [x] Swipe gestures for navigation

### Sound & Haptics

- [x] Move sounds (capture, castle, check, etc.)
- [x] UI feedback sounds (optional)
- [x] Synthesized fallback sounds
- [x] Volume control
- [ ] Haptic feedback for mobile (future)

### Error Handling

- [x] Network error recovery
- [x] Engine loading fallbacks
- [x] Invalid move feedback
- [x] Session recovery
- [x] Error boundary with retry

---

## 4. Testing Accessibility

### Manual Testing

1. **Keyboard-only navigation**
   - Tab through all interactive elements
   - Use shortcuts to navigate
   - Enter/Space to activate buttons
   - Escape to close dialogs

2. **Screen reader testing**
   - VoiceOver (macOS/iOS)
   - NVDA (Windows)
   - TalkBack (Android)

3. **Color contrast**
   - Use browser DevTools
   - Test with colorblindness simulators

### Automated Testing

```bash
# Add axe-core for accessibility testing
npm install --save-dev @axe-core/playwright

# In Playwright tests
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home page has no accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

---

## 5. Component-Level Recommendations

### Chessboard

```tsx
// Add ARIA for chessboard
<div 
  role="grid" 
  aria-label="Chess board"
  aria-describedby="board-description"
>
  <div id="board-description" className="sr-only">
    Interactive chess board. Use arrow keys to navigate squares.
  </div>
  {/* squares */}
</div>
```

### Navigation

```tsx
// Add current page indicator
<NavLink
  to={item.path}
  aria-current={isActive ? 'page' : undefined}
>
```

### Toggles

```tsx
// Use proper switch role
<button
  role="switch"
  aria-checked={isEnabled}
  onClick={toggle}
>
  {isEnabled ? 'On' : 'Off'}
</button>
```

### Modals

```tsx
// Proper dialog implementation
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Settings</h2>
  <p id="modal-description">Configure your preferences</p>
</div>
```

---

## 6. CSS Utility Classes

Add these to your global CSS:

```css
/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Visible on focus */
.sr-only.focus:not-sr-only:focus,
.focus\\:not-sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}

/* Focus visible outline */
:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 7. Implementation Priority

### Phase 1 (Critical)
1. Add `aria-label` to all icon-only buttons
2. Add skip navigation link
3. Implement screen reader announcements for moves

### Phase 2 (Important)
4. Add focus traps to modals
5. Improve color contrast for muted text
6. Add reduced motion support

### Phase 3 (Enhancement)
7. Comprehensive ARIA for chessboard
8. Form accessibility improvements
9. Automated accessibility testing in CI

---

## 8. Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Inclusive Components](https://inclusive-components.design/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

---

*Documentation completed: Phase 9*
*Last updated: December 2025*



