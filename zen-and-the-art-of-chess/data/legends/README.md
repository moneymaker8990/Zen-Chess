# Legends Data Directory

This directory contains PGN files and generated JSON data for chess legends (Fischer, Capablanca, Steinitz).

## Setup

### 1. Install Dependencies

Dependencies are already in `package.json`, but if you need to reinstall:

```bash
npm install chess.js pgn-parser
```

### 2. Add PGN Files

Place your PGN files in this directory:

- `fischer.pgn` - Bobby Fischer's games
- `capablanca.pgn` - José Raúl Capablanca's games  
- `steinitz.pgn` - Wilhelm Steinitz's games

You can download PGN files from:
- [Chess.com](https://www.chess.com/games)
- [ChessBase](https://database.chessbase.com/)
- [PGN Mentor](https://www.pgnmentor.com/files.html)

### 3. Run the Parser

**Option A: Parse a single legend**
```bash
npx tsx scripts/parseLegendPGNs.ts fischer ./data/legends/fischer.pgn ./data/legends
```

**Option B: Parse all legends (Windows)**
```powershell
.\scripts\parse-all-legends.ps1
```

**Option C: Parse all legends (Linux/Mac)**
```bash
chmod +x scripts/parse-all-legends.sh
./scripts/parse-all-legends.sh
```

### 4. Generated Files

The parser generates three JSON files per legend:

- **`legend-{name}-games.json`** - Complete game metadata and PGN strings
- **`legend-{name}-opening-book.json`** - Opening moves (first 16 moves) with frequency counts
- **`legend-{name}-positions.json`** - Position index for Guess-the-Move feature

### 5. Copy to Public Directory

Copy the generated JSON files to `public/data/legends/` so the browser can access them:

```bash
# Windows PowerShell
Copy-Item data\legends\legend-*.json public\data\legends\

# Linux/Mac
cp data/legends/legend-*.json public/data/legends/
```

## Usage in App

### Play vs Legend

Load the opening book JSON and use it to make moves:

```typescript
import openingBook from '../public/data/legends/legend-fischer-opening-book.json';

function getLegendBookMove(fen: string): string | null {
  const candidates = openingBook.filter(entry => entry.fen === fen);
  if (candidates.length === 0) return null;
  
  // Weight by frequency
  const total = candidates.reduce((sum, c) => sum + c.count, 0);
  const rand = Math.random() * total;
  let acc = 0;
  for (const candidate of candidates) {
    acc += candidate.count;
    if (rand <= acc) return candidate.move;
  }
  return candidates[0].move;
}
```

### Guess the Move

Load positions JSON to create Guess-the-Move sessions:

```typescript
import positions from '../public/data/legends/legend-fischer-positions.json';

function getRandomPosition(legend: string): LegendPosition | null {
  const posIndex = positions; // Load appropriate legend's positions
  const fens = Object.keys(posIndex);
  if (fens.length === 0) return null;
  
  const randomFen = fens[Math.floor(Math.random() * fens.length)];
  const positionsAtFen = posIndex[randomFen];
  return positionsAtFen[Math.floor(Math.random() * positionsAtFen.length)];
}
```

## File Structure

```
data/legends/
├── README.md (this file)
├── fischer.pgn
├── capablanca.pgn
├── steinitz.pgn
├── legend-fischer-games.json (generated)
├── legend-fischer-opening-book.json (generated)
├── legend-fischer-positions.json (generated)
└── ... (same for other legends)

public/data/legends/
├── legend-fischer-games.json (copied here)
├── legend-fischer-opening-book.json (copied here)
├── legend-fischer-positions.json (copied here)
└── ... (same for other legends)
```

