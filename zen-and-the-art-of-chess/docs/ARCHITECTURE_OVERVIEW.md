# Zen Chess - Architecture Overview

> Generated as part of the Elite Full Audit & Polish process
> Last updated: December 7, 2025

---

## 1. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | React | 18.3.1 |
| **Build Tool** | Vite | 5.4.10 |
| **Language** | TypeScript | 5.6.2 |
| **Mobile** | Capacitor | 7.4.4 |
| **Styling** | Tailwind CSS | 3.4.15 |
| **State Management** | Zustand | 5.0.1 |
| **Routing** | React Router DOM | 6.28.0 |
| **Animations** | Framer Motion | 12.23.25 |
| **Chess Logic** | chess.js | 1.4.0 |
| **Chess UI** | react-chessboard | 4.7.2 |
| **Engine** | Stockfish WASM | 0.10.0 |
| **Backend** | Supabase | 2.86.0 |
| **Payments (Web)** | Stripe | 8.5.3 |
| **Payments (Mobile)** | RevenueCat | 11.2.16 |
| **AI** | Anthropic Claude SDK | 0.71.0 |
| **PWA** | vite-plugin-pwa | 1.2.0 |

---

## 2. Project Structure

```
zen-and-the-art-of-chess/
├── src/
│   ├── App.tsx                 # Main router & app shell
│   ├── main.tsx                # Entry point
│   ├── components/             # Shared UI components (44 files)
│   │   ├── AICoach/            # AI coaching interface
│   │   ├── ChessBoardPanel/    # Board wrapper with controls
│   │   ├── EvaluationBar/      # Engine eval display
│   │   ├── GameViewer/         # PGN game replay
│   │   ├── Layout/             # App shell & navigation
│   │   ├── MoveTrainer/        # Opening training
│   │   ├── OpeningTrainer/     # Opening repertoire
│   │   ├── PatternTrainer/     # Pattern recognition
│   │   ├── PuzzleGeniusPanel/  # AI puzzle analysis
│   │   ├── ResponsiveBoard/    # Mobile-adaptive board
│   │   ├── TiltTracker/        # Mental state monitoring
│   │   ├── ZenChessboard/      # Styled board component
│   │   └── ErrorBoundary.tsx   # Global error handling
│   ├── data/                   # Static content (59 files)
│   │   ├── courses/            # Structured courses
│   │   ├── curriculum/         # 365-day journey
│   │   ├── days/               # Daily lessons (6 phases)
│   │   ├── flashPositions.ts   # Pattern positions
│   │   ├── instructiveGames/   # Master games
│   │   ├── openings/           # Opening repertoire
│   │   ├── positional/         # Positional patterns
│   │   └── puzzles/            # Tactical puzzles
│   ├── engine/                 # Chess engine (4 files)
│   │   └── stockfish.ts        # Stockfish WASM wrapper
│   ├── hooks/                  # React hooks (14 files)
│   │   ├── useBoardSize.ts     # Responsive board sizing
│   │   ├── useTiltDetection.ts # Mental state detection
│   │   ├── useMultiplayer.ts   # Real-time game sync
│   │   └── useRevenueCat.tsx   # Premium features
│   ├── lib/                    # Core utilities (47 files)
│   │   ├── agents/             # AI agent system
│   │   ├── multiplayer/        # Supabase real-time
│   │   ├── soundSystem.ts      # Audio playback
│   │   ├── moveValidation.ts   # Chess move validation
│   │   ├── spacedRepetition.ts # SRS algorithm
│   │   └── supabase.ts         # Database client
│   ├── pages/                  # Route pages (41 files)
│   └── state/                  # Zustand stores (9 files)
├── public/
│   ├── data/                   # JSON content (legends, PGNs)
│   ├── stockfish.js            # Engine worker
│   ├── stockfish.wasm          # Engine binary
│   └── [PWA assets]
├── android/                    # Capacitor Android project
├── ios/                        # Capacitor iOS project
├── docs/                       # Documentation
└── supabase/                   # Database schema
```

---

## 3. Screen Inventory (41 Pages)

### Core Navigation

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Dashboard with daily focus |
| `/day` | DayPage | Current day lesson |
| `/hub` | CommandCenterPage | Stats & progress hub |
| `/settings` | SettingsPage | App configuration |

### Training & Puzzles

| Route | Page | Description |
|-------|------|-------------|
| `/train` | PuzzlesPage | Puzzle training (rated, rush, streak) |
| `/daily-challenges` | DailyChallengesPage | Daily themed puzzles |
| `/flash-training` | FlashTrainingPage | Pattern recognition drills |
| `/spaced-repetition` | SpacedRepetitionPage | SRS review system |
| `/thinking-system` | ThinkingSystemPage | 5-step framework |
| `/blindfold` | BlindfoldTrainerPage | Visualization training |
| `/intuition` | IntuitionTrainerPage | GM intuition drills |
| `/weakness-detector` | WeaknessDetectorPage | Weakness analysis |

### Study & Learning

| Route | Page | Description |
|-------|------|-------------|
| `/courses` | CoursesPage | Course catalog |
| `/courses/:id` | CourseDetailPage | Course overview |
| `/courses/:id/learn` | CourseLearningPage | Lesson player |
| `/openings` | OpeningsPage | Opening repertoire |
| `/patterns` | PatternsManualPage | Pattern library |
| `/study` | StudyPage | Game analysis |
| `/notes` | NotesPage | Personal notes |
| `/study-plan` | StudyPlanPage | Training schedule |
| `/beginner` | BeginnerPage | New player guide |
| `/how-to` | HowToPage | App tutorial |

### Play

| Route | Page | Description |
|-------|------|-------------|
| `/play` | PlayPage | Play vs engine |
| `/play/friend` | PlayFriendPage | Create/join friend game |
| `/play/friend/:code` | PlayFriendPage | Join via invite |
| `/play/live/:gameId` | LiveGamePage | Active multiplayer game |
| `/sparring` | SparringPage | Position sparring |
| `/calm-play` | CalmPlayPage | Anti-tilt slow play |

### Legends & Games

| Route | Page | Description |
|-------|------|-------------|
| `/greats` | PlayTheGreatsPage | Legend profiles |
| `/greats/:id` | LegendDetailPage | Legend games |
| `/games` | GamesPage | Game history |

### Mental Training

| Route | Page | Description |
|-------|------|-------------|
| `/mind` | MindTrainingPage | Meditation & focus |
| `/journey` | JourneyPage | 365-day progress |
| `/mistakes` | MistakesPage | Mistake library |

### AI & Coach

| Route | Page | Description |
|-------|------|-------------|
| `/coach` | CoachPage | AI coach chat |
| `/ai-coach` | AICoachDashboard | AI coach hub |

### Auth & Monetization

| Route | Page | Description |
|-------|------|-------------|
| `/auth` | AuthPage | Login/register |
| `/pricing` | PricingPage | Premium plans |

### Social

| Route | Page | Description |
|-------|------|-------------|
| `/social` | SocialPage | Community features |
| `/tournament` | TournamentPrepPage | Tournament prep |

---

## 4. State Management

### Zustand Stores

| Store | File | Purpose |
|-------|------|---------|
| **useStore** | `state/useStore.ts` | Game state, progress, UI |
| **useAuthStore** | `state/useAuthStore.ts` | Authentication |
| **coachStore** | `state/coachStore.ts` | AI coach state |
| **boardSettingsStore** | `state/boardSettingsStore.ts` | Board themes/settings |
| **aiPreferencesStore** | `state/aiPreferencesStore.ts` | AI feature prefs |
| **multiplayerStore** | `state/multiplayerStore.ts` | Multiplayer game state |
| **notesStore** | `state/notesStore.ts` | User notes |
| **tournamentStore** | `state/tournamentStore.ts` | Tournament prep |
| **trainingStore** | `state/trainingStore.ts` | Training session |
| **useSoundStore** | `lib/soundSystem.ts` | Audio settings |

### Persistence

All critical stores use Zustand's `persist` middleware with `localStorage`:
- `zen-chess-progress` - User progress & streak
- `zen-chess-sounds` - Sound preferences
- `zen-chess-board-settings` - Board configuration
- `zen-chess-coach` - Coach interaction history

---

## 5. Key Components

### Chess Board Components

| Component | File | Purpose |
|-----------|------|---------|
| **ZenChessboard** | `components/ZenChessboard/` | Styled board with animations |
| **ResponsiveBoard** | `components/ResponsiveBoard/` | Mobile-adaptive board |
| **ChessBoardPanel** | `components/ChessBoardPanel/` | Board with controls |
| **GameViewer** | `components/GameViewer/` | PGN replay viewer |

### Training Components

| Component | File | Purpose |
|-----------|------|---------|
| **MoveTrainer** | `components/MoveTrainer/` | Opening line drills |
| **OpeningTrainer** | `components/OpeningTrainer/` | Repertoire builder |
| **PatternTrainer** | `components/PatternTrainer/` | Pattern recognition |
| **PuzzleGeniusPanel** | `components/PuzzleGeniusPanel/` | AI puzzle analysis |

### Core Infrastructure

| Component | File | Purpose |
|-----------|------|---------|
| **ErrorBoundary** | `components/ErrorBoundary.tsx` | Global error handler |
| **Layout** | `components/Layout/` | App shell, nav, sidebar |
| **PageTransition** | `components/PageTransition/` | Route animations |
| **Tutorial** | `components/Tutorial/` | Onboarding system |

---

## 6. Sound System

**File:** `src/lib/soundSystem.ts`

### Architecture
- Uses Web Audio API with `AudioContext`
- Preloads sounds from Lichess CDN (CC licensed)
- Fallback synthesized sounds if network fails
- Centralized via `useSoundStore`

### Sound Events

| Category | Events |
|----------|--------|
| **Chess** | move, capture, check, checkmate, castle, promote, illegal |
| **UI** | notification, success, error, achievement, click, puzzleCorrect, puzzleWrong |
| **Mindfulness** | meditationBell, breathingPrompt, tiltWarning |

### Smart Move Sound
```typescript
playSmartMoveSound(game, move, options)
```
Automatically determines correct sound based on game state (check, capture, etc.)

---

## 7. Engine Integration

**File:** `src/engine/stockfish.ts`

### Architecture
- Stockfish loaded as Web Worker from `/stockfish.js`
- WASM binary: `/stockfish.wasm`
- Thread-safe request queue system
- Health monitoring with auto-recovery

### Key Methods

| Method | Purpose |
|--------|---------|
| `init()` | Initialize engine (async) |
| `analyzePosition(fen, callback)` | Get live evaluation |
| `getBestMove(fen)` | Get best move (Promise) |
| `playMove(fen, callback)` | Engine plays a move |
| `setStrength(0-20)` | Adjust skill level |

---

## 8. API & Backend Dependencies

### Supabase

**File:** `src/lib/supabase.ts`

| Feature | Tables |
|---------|--------|
| **Auth** | `auth.users` (Supabase Auth) |
| **Multiplayer** | `games`, `game_moves`, `invites` |
| **Progress** | `user_progress`, `puzzle_attempts` |
| **Social** | `friendships`, `leaderboard` |

### External APIs

| Service | Purpose | File |
|---------|---------|------|
| **Lichess** | Sound assets | `lib/soundSystem.ts` |
| **Anthropic Claude** | AI coach, genius features | `lib/claude.ts` |
| **RevenueCat** | Mobile subscriptions | `lib/revenuecat.ts` |
| **Stripe** | Web payments | `lib/stripe.ts` |

---

## 9. Mobile Configuration

### Capacitor Config

**File:** `capacitor.config.ts`

```typescript
{
  appId: 'com.zenchess.app',
  appName: 'Zen Chess',
  webDir: 'dist',
  ios: { contentInset: 'automatic' },
  android: { allowMixedContent: true },
  plugins: {
    SplashScreen: { launchShowDuration: 2000 },
    StatusBar: { style: 'DARK' }
  }
}
```

### Build Commands

```bash
npm run mobile:build     # Build + sync
npm run mobile:android   # Open Android Studio
npm run mobile:ios       # Open Xcode
```

---

## 10. PWA Configuration

**File:** `vite.config.ts`

- Service Worker: Workbox with runtime caching
- Offline: Network-first for pages, cache-first for fonts
- App Icons: 64px, 192px, 512px (+ maskable)
- Splash Screens: 1125x2436, 1170x2532, 1284x2778

---

## 11. Known Risks & Technical Debt

### High Priority

1. **No Automated Tests**
   - Zero unit tests for chess logic
   - No component tests for UI
   - No E2E tests for critical flows
   - Risk: Regressions go undetected

2. **Console.log Statements**
   - Production code contains debugging logs
   - Performance impact on mobile
   - Security risk (exposes internals)

3. **Engine Error Handling**
   - Stockfish failures partially handled
   - No offline fallback for engine features
   - Risk: Silent failures in vs-engine mode

### Medium Priority

4. **Type Safety Gaps**
   - Some `any` types in coach/agent system
   - Missing type guards for API responses
   - Risk: Runtime errors in edge cases

5. **Duplicated Logic**
   - Board rendering code in 4+ components
   - Sound triggering scattered across pages
   - Risk: Inconsistent behavior

6. **Large Bundle Size**
   - All puzzles/courses loaded eagerly
   - No code splitting for data files
   - Impact: Slow initial load on mobile

7. **State Persistence**
   - LocalStorage used for all state
   - No server sync for guest users
   - Risk: Data loss on device change

### Low Priority

8. **Accessibility Gaps**
   - Missing ARIA labels on board
   - Keyboard navigation incomplete
   - Risk: App Store rejection (iOS)

9. **Offline Mode Incomplete**
   - PWA caches pages but not all features
   - No offline indicator in UI
   - Risk: Confusing UX without network

10. **Documentation**
    - No API docs for lib functions
    - Component props not documented
    - Risk: Onboarding difficulty

---

## 12. Test Coverage Status

| Category | Coverage | Status |
|----------|----------|--------|
| Unit Tests | 0% | ❌ Not configured |
| Component Tests | 0% | ❌ Not configured |
| E2E Tests | 0% | ❌ Not configured |
| Type Coverage | ~85% | ⚠️ Some gaps |

---

## 13. Build & Deploy

### Development
```bash
npm run dev          # Start Vite dev server
```

### Production
```bash
npm run build        # Build for production
npm run preview      # Preview production build
```

### Mobile
```bash
npm run cap:sync     # Sync web assets to native
npm run cap:android  # Open Android Studio
npm run cap:ios      # Open Xcode
```

---

## 14. File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Pages | `PascalCasePage.tsx` | `HomePage.tsx` |
| Components | `PascalCase/index.tsx` | `ChessBoardPanel/index.tsx` |
| Hooks | `useCamelCase.ts` | `useBoardSize.ts` |
| Stores | `camelCaseStore.ts` | `coachStore.ts` |
| Utils | `camelCase.ts` | `soundSystem.ts` |
| Types | `types.ts` or `*Types.ts` | `coachTypes.ts` |

---

## 15. Import Aliases

Configured in `vite.config.ts` and `tsconfig.json`:

```typescript
'@' → './src'
```

Example:
```typescript
import { HomePage } from '@/pages/HomePage';
import { useSound } from '@/lib/soundSystem';
```

---

*This document should be kept updated as the architecture evolves.*







