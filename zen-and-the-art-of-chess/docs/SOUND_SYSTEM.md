# Sound System Documentation

## Overview
The chess app uses a centralized sound system located at `src/lib/soundSystem.ts` that provides:
- Authentic wooden chess piece sounds (via Lichess's open-source audio)
- UI feedback sounds
- Synthesized fallback sounds for offline/error cases
- Smart move sound detection

## Architecture

### Sound Store (Zustand)
```typescript
interface SoundSettings {
  enabled: boolean;
  volume: number;
  moveSounds: boolean;
  captureSounds: boolean;
  checkSounds: boolean;
  notificationSounds: boolean;
  achievementSounds: boolean;
}
```

Persisted to localStorage under key `'zen-chess-sounds'`.

### Audio Sources
Primary sounds loaded from Lichess CDN (CC licensed):
- `move` - Standard piece placement
- `capture` - Piece capture
- `check` - Check alert
- `castle` - Castling (king + rook)
- `promote` - Pawn promotion
- `gameStart` - Game beginning
- `illegal` - Invalid move attempt
- `success` - Confirmation

### Fallback System
If audio files fail to load (offline, CORS issues), synthesized WebAudio tones are generated as fallback.

---

## API Reference

### Chess Sounds (`ChessSounds`)
| Method | Description | Respects Setting |
|--------|-------------|-----------------|
| `ChessSounds.move()` | Wooden piece placement | `moveSounds` |
| `ChessSounds.capture()` | Capture sound | `captureSounds` |
| `ChessSounds.check()` | Check alert | `checkSounds` |
| `ChessSounds.checkmate()` | Capture + success combo | `checkSounds` |
| `ChessSounds.castle()` | Double placement | `moveSounds` |
| `ChessSounds.promote()` | Promotion celebration | `moveSounds` |
| `ChessSounds.illegal()` | Error sound | `enabled` |
| `ChessSounds.gameStart()` | Game start notification | `enabled` |

### UI Sounds (`UISounds`)
| Method | Description | Respects Setting |
|--------|-------------|-----------------|
| `UISounds.notification()` | General notification | `notificationSounds` |
| `UISounds.success()` | Success confirmation | `enabled` |
| `UISounds.error()` | Error feedback | `enabled` |
| `UISounds.achievement()` | Achievement unlocked | `achievementSounds` |
| `UISounds.click()` | Button click | `enabled` |
| `UISounds.puzzleCorrect()` | Puzzle solved | `enabled` |
| `UISounds.puzzleWrong()` | Puzzle failed | `enabled` |
| `UISounds.streakMilestone()` | Streak achievement | `achievementSounds` |
| `UISounds.tiltWarning()` | Tilt detection warning | `enabled` |
| `UISounds.meditationBell()` | Meditation bell | `enabled` |
| `UISounds.breathingPrompt()` | Breathing exercise | `enabled` |

### Smart Move Sound (`playSmartMoveSound`)
**Recommended for all board interactions.**

```typescript
playSmartMoveSound(game: Chess, move: Move | null, options?: { isCapture?: boolean }): void
```

Automatically detects and plays the appropriate sound based on:
1. Checkmate → `checkmate()`
2. Check → `check()`
3. Castling → `castle()`
4. Promotion → `promote()`
5. Capture → `capture()`
6. Regular move → `move()`

### Hook (`useSound`)
```typescript
const { settings, updateSettings, toggleSound, chess, ui, isEnabled, playMoveSound, preloadSounds } = useSound();
```

---

## Usage Verification

### Pages Using Sound System ✅

| Page | Import | Usage | Status |
|------|--------|-------|--------|
| `PlayPage.tsx` | `playSmartMoveSound` | Move handling | ✅ Correct |
| `PuzzlesPage.tsx` | `playSmartMoveSound` | Puzzle moves | ✅ Correct |
| `LiveGamePage.tsx` | `playSmartMoveSound` | Real-time moves | ✅ Correct |
| `DailyChallengesPage.tsx` | `playSmartMoveSound` | Challenge moves | ✅ Correct |
| `OpeningsPage.tsx` | `playSmartMoveSound` | Opening explorer | ✅ Correct |
| `SpacedRepetitionPage.tsx` | `playSmartMoveSound` | Review moves | ✅ Correct |
| `CourseLearningPage.tsx` | `playSmartMoveSound` | Course moves | ✅ Correct |
| `LegendDetailPage.tsx` | `playSmartMoveSound` | Replay moves | ✅ Correct |

### Components Using Sound System ✅

| Component | Import | Usage | Status |
|-----------|--------|-------|--------|
| `ChessBoardPanel` | `playSmartMoveSound` | Shared board | ✅ Correct |
| `ZenChessboard` | `ChessSounds` | Custom board | ✅ Correct |

### Other Sound Integrations

| File | Import | Usage | Status |
|------|--------|-------|--------|
| `achievementSystem.ts` | `UISounds` | Achievement unlock | ✅ Correct |

---

## Consistency Checks

### ✅ All Verified
1. **Centralized API**: All sounds go through `soundSystem.ts`
2. **Settings Respected**: All sound methods check `useSoundStore.getState().settings`
3. **Preloading**: `preloadSounds()` called on first interaction
4. **Fallback**: Synthesized sounds available if CDN fails
5. **Volume Control**: All sounds use `settings.volume` multiplier

### Best Practices
1. **Always use `playSmartMoveSound`** for move-related sounds on chessboards
2. Use `ChessSounds` only when you need specific sound without game context
3. Use `UISounds` for non-chess interface feedback
4. Call `preloadSounds()` early in user interaction flow

---

## Settings Integration

The sound settings are managed in `SettingsPage.tsx`:
- Master toggle: `soundEnabled` (from progress store, synced)
- Individual toggles via `useSoundStore` for granular control

---

## Testing

Unit tests exist in `tests/unit/soundSystem.test.ts` covering:
- Store state management
- Exported function availability
- Settings persistence

---

## Mobile Considerations

1. **Audio Context Resume**: WebAudio requires user interaction to start
   - `getAudioContext()` calls `resume()` automatically
2. **Preloading**: Sounds preloaded on first interaction
3. **Volume**: Respects device volume settings

---

## Capacitor/Native App

For iOS/Android builds:
- Sound system works via WebView's WebAudio API
- No native plugins required
- Sounds work in background (if app is active)

---

*Documentation verified: Phase 5*
*Last updated: December 2025*


