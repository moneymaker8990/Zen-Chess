# Legends PGN Parser - Setup Complete ✅

## What Was Created

### 1. Parser Script (`scripts/parseLegendPGNs.ts`)
- ✅ Fixed and ready to use
- Parses PGN files for Fischer, Capablanca, and Steinitz
- Generates three JSON files per legend:
  - `legend-{name}-games.json` - Complete game metadata
  - `legend-{name}-opening-book.json` - Opening moves with frequency
  - `legend-{name}-positions.json` - Position index for Guess-the-Move

### 2. Helper Scripts
- ✅ `scripts/parse-all-legends.ps1` (Windows)
- ✅ `scripts/parse-all-legends.sh` (Linux/Mac)
- Batch process all legends at once

### 3. Helper Functions (`src/lib/legendHelpers.ts`)
- ✅ `getLegendBookMove()` - Get opening book moves
- ✅ `getRandomLegendPosition()` - Get random position for Guess-the-Move
- ✅ `createGuessSessionFromGame()` - Create session from specific game
- ✅ `getRandomLegendGame()` - Get random game
- ✅ `getLegendStats()` - Get statistics about legend data

### 4. Documentation
- ✅ Updated `data/legends/README.md` with full setup instructions

## Quick Start

### Step 1: Download Complete Game Databases

**🎯 For maximum authenticity, download ALL known games!**

See `DOWNLOAD_COMPLETE_GAMES.md` for comprehensive sources and automated download script.

**Quick automated download:**
```bash
# Download complete databases (800-1000+ games each)
node scripts/downloadLegendGames.mjs fischer ./data/pgns
node scripts/downloadLegendGames.mjs capablanca ./data/pgns
node scripts/downloadLegendGames.mjs steinitz ./data/pgns
```

**Or manually download from:**
- PGN Mentor: https://www.pgnmentor.com/players/
- Chessgames.com: https://www.chessgames.com/perl/chessplayer

Place PGN files in `data/pgns/`:
- `fischer.pgn` (853 games available)
- `capablanca.pgn` (589 games available)
- `steinitz.pgn` (1,022 games available)

### Step 2: Run Parser

**Windows:**
```powershell
.\scripts\parse-all-legends.ps1
```

**Linux/Mac:**
```bash
chmod +x scripts/parse-all-legends.sh
./scripts/parse-all-legends.sh
```

**Or parse individually:**
```bash
npx tsx scripts/parseLegendPGNs.ts fischer ./data/legends/fischer.pgn ./data/legends
```

### Step 3: Copy to Public Directory

```powershell
# Windows
Copy-Item data\legends\legend-*.json public\data\legends\

# Linux/Mac
cp data/legends/legend-*.json public/data/legends/
```

## Usage in Your App

### Play vs Legend (Opening Book)

```typescript
import { getLegendBookMove } from './lib/legendHelpers';
import type { LegendId } from './lib/legendTypes';
import { Chess } from 'chess.js';

async function makeLegendMove(legend: LegendId, chess: Chess): Promise<string | null> {
  const fen = chess.fen();
  
  // Try to get a move from the legend's opening book
  const bookMove = await getLegendBookMove(legend, fen);
  
  if (bookMove) {
    return bookMove; // Use legend's actual move
  }
  
  // Fall back to your humanized Stockfish + style wrapper
  return await getHumanizedEngineMove(chess, legend);
}
```

### Guess the Move

```typescript
import { getRandomLegendPosition, createGuessSessionFromGame } from './lib/legendHelpers';
import type { LegendId } from './lib/legendTypes';

// Option 1: Random position
async function startRandomGuess(legend: LegendId) {
  const position = await getRandomLegendPosition(legend, {
    minMoveNumber: 10,
    maxMoveNumber: 40,
    color: 'w', // Only positions where legend is White
  });
  
  if (position) {
    // Show position, let user guess, compare with position.move
  }
}

// Option 2: Full game session
async function startGameGuess(legend: LegendId, gameId: string) {
  const session = await createGuessSessionFromGame(legend, gameId);
  
  if (session) {
    // Step through session.positions, let user guess each move
    // Compare userGuess with correctMove
  }
}
```

## Integration Points

### 1. PlayTheGreatsPage.tsx
Update to use `getLegendBookMove()` for opening moves, then fall back to your existing `legendEngine.ts` for out-of-book positions.

### 2. Guess-the-Move Feature
Use `getRandomLegendPosition()` or `createGuessSessionFromGame()` to create sessions.

### 3. Legend Detail Pages
Use `getAllLegendGames()` and `getLegendStats()` to show legend information.

## File Structure

```
zen-and-the-art-of-chess/
├── scripts/
│   ├── parseLegendPGNs.ts          ✅ Parser script
│   ├── parse-all-legends.ps1       ✅ Windows batch script
│   └── parse-all-legends.sh        ✅ Linux/Mac batch script
├── data/
│   └── legends/
│       ├── README.md               ✅ Setup instructions
│       ├── fischer.pgn             ⚠️  Add your PGN file
│       ├── capablanca.pgn           ⚠️  Add your PGN file
│       └── steinitz.pgn             ⚠️  Add your PGN file
├── public/
│   └── data/
│       └── legends/
│           ├── legend-fischer-games.json          (generated)
│           ├── legend-fischer-opening-book.json   (generated)
│           ├── legend-fischer-positions.json      (generated)
│           └── ... (same for capablanca, steinitz)
└── src/
    └── lib/
        ├── legendTypes.ts           ✅ Type definitions
        └── legendHelpers.ts         ✅ Helper functions
```

## Next Steps

1. **Add PGN Files**: Download or obtain PGN files for the three legends
2. **Run Parser**: Execute the parser script to generate JSON files
3. **Copy to Public**: Move generated JSON files to `public/data/legends/`
4. **Integrate**: Update `PlayTheGreatsPage.tsx` and Guess-the-Move components to use the helpers
5. **Test**: Verify opening book moves and Guess-the-Move sessions work correctly

## Dependencies

All dependencies are already installed:
- ✅ `chess.js` - Chess logic and PGN parsing
- ✅ `pgn-parser` - PGN file parsing
- ✅ `tsx` - TypeScript execution (in devDependencies)

## Notes

- The parser filters games to only include those where the legend is actually playing
- Opening book includes moves up to move 16 (configurable via `MAX_OPENING_FULLMOVE`)
- Position index only includes positions where the legend is to move
- All data is cached after first load for performance
