# Adaptive Puzzle System

The Zen Chess puzzle system is designed to work like chess.com's tactics trainer with proper Elo ratings, non-repeating selection, theme variety, and adaptive difficulty.

## Architecture

### Data Flow

```
User → PuzzlesPage.tsx → puzzleService.ts → puzzlePool.ts (local) or Supabase (cloud)
                                ↓
                      localStorage (anonymous users)
                      Supabase (logged-in users)
```

### Key Files

- `src/lib/puzzleService.ts` - Core puzzle logic, Elo calculations, Supabase integration
- `src/lib/puzzlePool.ts` - Local puzzle selection for offline/anonymous users
- `src/hooks/usePuzzleSystem.ts` - React hook for unified puzzle state management
- `src/pages/PuzzlesPage.tsx` - Main puzzle UI
- `supabase/puzzle-schema.sql` - Database schema for cloud storage
- `scripts/import-lichess-puzzles.ts` - Lichess puzzle import script

## Features

### 1. Adaptive Difficulty (Chess.com Style)

- Each puzzle has a rating (800-2500+)
- User has a separate puzzle rating (starts at 1000)
- Puzzle selection targets ±200 rating points from user
- Elo updates after each puzzle in Rated mode

### 2. Non-Repeating Selection

- Last 100-200 puzzles tracked
- Session-based repetition avoidance
- Automatic pool reset when exhausted

### 3. Theme Variety

- Tracks last 5 themes shown
- Avoids showing same theme 3+ times in a row
- Supports all Lichess themes

### 4. Multiple Modes

| Mode | Rating Changes | Description |
|------|----------------|-------------|
| **Rated** | Yes | Standard adaptive puzzles |
| **Streak** | No | Progressive difficulty, ends on fail |
| **Rush** | No | 3 minutes, 3 strikes |
| **Daily** | No | Same puzzle for everyone each day |
| **Custom** | No | Filter by theme/difficulty |

## Rating System

### Elo Calculation

```typescript
const K = 32;  // K-factor
const expected = 1 / (1 + Math.pow(10, (puzzleRating - userRating) / 400));
const change = K * (actualScore - expected);
// actualScore = 1 if solved, 0 if failed
```

### Example Rating Changes

| User Rating | Puzzle Rating | Solved | Rating Change |
|-------------|---------------|--------|---------------|
| 1000 | 1000 | Yes | +16 |
| 1000 | 1000 | No | -16 |
| 1000 | 1200 | Yes | +24 |
| 1000 | 1200 | No | -8 |
| 1000 | 800 | Yes | +8 |
| 1000 | 800 | No | -24 |

## Storage

### Anonymous Users (localStorage)

```typescript
// Key: zenChess_puzzleData_v2
{
  rating: number,
  highestRating: number,
  lowestRating: number,
  gamesPlayed: number,
  wins: number,
  losses: number,
  currentStreak: number,
  bestStreak: number,
  lastThemes: string[],
  recentPuzzleIds: string[],  // Last 200
  lastUpdated: string
}
```

### Logged-in Users (Supabase)

- `user_puzzle_ratings` - Current rating and stats
- `user_puzzle_history` - Every puzzle attempt
- `puzzles` - Puzzle database (populated via import script)

## Importing Lichess Puzzles

### Setup

1. Set environment variables:
   ```bash
   export SUPABASE_URL="https://xxx.supabase.co"
   export SUPABASE_SERVICE_ROLE_KEY="eyJ..."
   ```

2. Run the SQL schema:
   ```bash
   # In Supabase SQL Editor, run:
   # supabase/puzzle-schema.sql
   ```

3. Import puzzles:
   ```bash
   npx ts-node scripts/import-lichess-puzzles.ts \
     --min-rating=600 \
     --max-rating=2800 \
     --limit=100000
   ```

### Options

| Flag | Default | Description |
|------|---------|-------------|
| `--min-rating` | 600 | Minimum puzzle rating |
| `--max-rating` | 2800 | Maximum puzzle rating |
| `--limit` | 100000 | Max puzzles to import |
| `--skip-download` | false | Use existing CSV file |

## Local Puzzle Pool

For offline/anonymous users, puzzles are selected from the static pool:

- `src/data/puzzles/index.ts` - Main puzzles
- `src/data/puzzles/expanded-puzzles.ts` - Additional puzzles
- `src/data/puzzles/master-puzzles.ts` - Master-level puzzles

Total: ~100+ high-quality puzzles with proper difficulty ratings.

## UI Features

### Chess.com Style Display

- **Rating**: Shows current rating with change (e.g., "1023 (+14)")
- **Puzzle Rating**: Shows difficulty of current puzzle
- **Themes**: Tags showing puzzle themes
- **Difficulty**: Star rating (1-5 stars)

### Feedback

- Green highlight for correct moves
- Red highlight for incorrect moves (allows retry in Rated mode)
- Progressive hints: piece highlight → square highlight → show move
- Gentle "Not quite — have another go" message

## API Reference

### puzzleService.ts

```typescript
// Get user's puzzle stats
getPuzzleStats(userId?: string): Promise<UserPuzzleData>

// Submit result and get rating update
submitPuzzleResult(result: PuzzleResult, userId?: string): Promise<RatingUpdate>

// Calculate Elo change
calculateEloChange(userRating: number, puzzleRating: number, solved: boolean): number
```

### puzzlePool.ts

```typescript
// Select puzzle matching user rating
selectLocalPuzzle(config: SelectionConfig): PuzzleWithMeta | null

// Get daily puzzle (deterministic by date)
getDailyPuzzle(): PuzzleWithMeta

// Get streak puzzle (progressive difficulty)
getStreakPuzzle(streakCount: number): PuzzleWithMeta | null

// Get rush puzzle (slightly easier for speed)
getRushPuzzle(userRating: number): PuzzleWithMeta | null
```

## Migration from Old System

The new system is backwards compatible:

1. Old stats in `zenChessPuzzleStats` are read on first load
2. New stats saved to both old and new formats
3. Puzzle selection uses new algorithm but falls back to old if needed

