# AI-Assisted Pattern Generation Guide

## Current Status

**Valid Patterns**: 3 out of 70 (4.3%)
- 1 OUTPOSTS pattern  
- 1 GOOD_BAD_BISHOP pattern
- 1 OUTPOSTS pattern (newly generated)

**Patterns Needed**: ~237 more patterns

## What We've Built

### 1. Validation Infrastructure ✅
- `scripts/validatePatterns.ts` - Full validation using chess.js
- `scripts/analyzePatternErrors.ts` - Error categorization
- Real-time move validation during generation

### 2. AI-Assisted Generation System ✅  
- `scripts/generateValidatedPatterns.ts` - Pattern generator with built-in validation
- Generates patterns with legal chess moves
- Validates immediately using chess.js
- Only saves valid patterns

### 3. First Successful Generation ✅
- Generated 3 pattern candidates
- 1 passed validation (33% success rate on first attempt)
- Pattern saved to `morePatterns.ts`

## How to Generate More Patterns

### Method 1: Extend the Generator Script (Recommended)

Add more pattern generation functions to `scripts/generateValidatedPatterns.ts`:

```typescript
function generateMoreOutpostPatterns(): EnhancedPattern[] {
  return [
    {
      id: 'outpost-f5-kingside',
      category: 'OUTPOSTS',
      title: 'f5 Outpost Attack',
      fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 5',
      toMove: 'white',
      // ... complete pattern with validated moves
    }
  ];
}
```

Then add to the generators array:
```typescript
const generators = [
  { name: 'OUTPOSTS', fn: generateOutpostPatterns },
  { name: 'OUTPOSTS_BATCH2', fn: generateMoreOutpostPatterns },
  // ... add more
];
```

### Method 2: Manual Creation with Validation

1. Create pattern in `morePatterns.ts`
2. Run validation: `npx tsx scripts/validatePatterns.ts`
3. Fix any errors
4. Repeat

### Method 3: Use Chess.js Playground

Create a test file to verify moves work:

```typescript
import { Chess } from 'chess.js';

const game = new Chess('YOUR_FEN_HERE');
console.log('Legal moves:', game.moves());

// Try your moves
game.move('e4');
game.move('e5');
// ...

console.log('Final position:', game.fen());
```

## Pattern Generation Workflow

### Step 1: Plan the Pattern
- Choose a category (OUTPOSTS, WEAK_PAWNS, etc.)
- Decide on the strategic concept to teach
- Find or create a suitable starting position (FEN)

### Step 2: Verify the Position
```bash
npx tsx -e "import {Chess} from 'chess.js'; const g = new Chess('YOUR_FEN'); console.log(g.moves());"
```

### Step 3: Build Move Sequence
- Start from the FEN
- Apply each move and verify it's legal  
- Record the sequence

### Step 4: Create Pattern Object
```typescript
{
  id: 'unique-pattern-id',
  category: 'CATEGORY_NAME',
  title: 'Pattern Title',
  fen: 'validated fen string',
  toMove: 'white' | 'black',
  mainLine: [
    {
      move: 'e4',  // Must be legal!
      isMainLine: true,
      annotation: '!',
      explanation: 'Why this move is good',
      conceptTag: 'Opening'
    },
    // ... more moves
  ],
  // ... other required fields
}
```

### Step 5: Validate
```bash
npx tsx scripts/validatePatterns.ts
```

### Step 6: Commit
```bash
git add -A
git commit -m "Add X validated patterns for CATEGORY"
git push
```

## Tips for Success

### ✅ DO:
- Verify FEN positions before using them
- Test each move sequence in chess.js first
- Use `game.moves()` to see legal moves
- Start with simple, clear patterns
- Generate in small batches (3-5 patterns)
- Validate frequently

### ❌ DON'T:
- Copy FEN positions without validating
- Assume moves will work without testing
- Generate large batches without validation
- Use complex positions for simple concepts
- Skip the validation step

## Common FEN Sources

### Starting Positions
```typescript
// Start of game
'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

// After 1.e4
'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1'

// After 1.e4 e5
'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2'
```

### Tools to Get FEN
1. **Lichess Analysis Board**: lichess.org/analysis
   - Set up position
   - Click "FEN" button
   - Copy FEN string

2. **Chess.com Analysis**: chess.com/analysis
   - Set up position
   - Copy FEN from URL or board

3. **Chess.js in Node**:
   ```typescript
   import { Chess } from 'chess.js';
   const game = new Chess();
   game.move('e4');
   game.move('e5');
   console.log(game.fen());
   ```

## Pattern Requirements

Every pattern must have:

1. **Valid FEN** - Must parse correctly in chess.js
2. **Legal Moves** - Every move in mainLine must be legal
3. **Strategic Value** - Must teach a useful concept
4. **Clear Explanations** - Each move should explain why it's played
5. **Appropriate Length** - 5-15 moves is ideal
6. **Proper Categorization** - Must match one of the 16 categories

## Categories to Fill

| Category | Current | Needed | Priority |
|----------|---------|--------|----------|
| BISHOP_PAIR | 0 | 15 | 🔴 High |
| BLOCKADE | 0 | 15 | 🔴 High |
| CENTRALIZATION | 0 | 15 | 🔴 High |
| EXCHANGE_STRATEGY | 0 | 15 | 🔴 High |
| GOOD_BAD_BISHOP | 1 | 14 | 🔴 High |
| KING_ACTIVITY | 0 | 15 | 🔴 High |
| KNIGHT_PLACEMENT | 0 | 15 | 🔴 High |
| MINORITY_ATTACK | 0 | 15 | 🔴 High |
| OPEN_FILES | 0 | 15 | 🔴 High |
| OUTPOSTS | 2 | 13 | 🟡 Medium |
| PAWN_BREAKS | 0 | 15 | 🔴 High |
| PAWN_STRUCTURE | 0 | 15 | 🔴 High |
| PIECE_COORDINATION | 0 | 15 | 🔴 High |
| PROPHYLAXIS | 0 | 15 | 🔴 High |
| SPACE_ADVANTAGE | 0 | 15 | 🔴 High |
| WEAK_PAWNS | 0 | 15 | 🔴 High |

## Recommended Generation Order

### Week 1 (Days 1-7): Foundation Categories
1. **OUTPOSTS** (13 more) - Most straightforward
2. **WEAK_PAWNS** (15) - Clear weaknesses to identify
3. **PAWN_STRUCTURE** (15) - Fundamental patterns

### Week 2 (Days 8-14): Piece Play
4. **KNIGHT_PLACEMENT** (15) - Knight maneuvering
5. **BISHOP_PAIR** (15) - Bishop coordination
6. **GOOD_BAD_BISHOP** (14 more) - Bishop evaluation

### Week 3 (Days 15-21): Strategic Concepts
7. **CENTRALIZATION** (15) - Piece placement
8. **PIECE_COORDINATION** (15) - Multi-piece harmony
9. **SPACE_ADVANTAGE** (15) - Territorial control

### Week 4 (Days 22-28): Advanced Concepts
10. **PROPHYLAXIS** (15) - Preventive thinking
11. **BLOCKADE** (15) - Restraint strategies
12. **MINORITY_ATTACK** (15) - Pawn minorities

### Week 5 (Days 29-35): Finishing Touches
13. **PAWN_BREAKS** (15) - Pawn breaks
14. **OPEN_FILES** (15) - File control
15. **KING_ACTIVITY** (15) - Endgame king use
16. **EXCHANGE_STRATEGY** (15) - Trading pieces

## Quick Start: Generate Your First Batch

```bash
cd zen-and-the-art-of-chess

# Edit the generator script
code scripts/generateValidatedPatterns.ts

# Add 3-5 patterns to one of the generator functions

# Run generation with validation
npx tsx scripts/generateValidatedPatterns.ts

# Check validation status  
npx tsx scripts/validatePatterns.ts

# If all valid, commit
git add -A
git commit -m "Add 5 validated OUTPOSTS patterns"
git push
```

## Success Metrics

- **Target**: 15-20 patterns per category
- **Total Goal**: 240-320 patterns
- **Current**: 3 patterns (1.3% complete)
- **Validation Rate**: 100% of saved patterns must be valid
- **Estimated Time**: 20-30 hours at 8-12 patterns/hour

## Next Steps

1. ✅ Cleanup completed
2. ✅ Validation infrastructure built  
3. ✅ AI-assisted generator created
4. ✅ First pattern generated successfully
5. ⏳ **Continue generating patterns** (in progress)
   - Add more functions to `generateValidatedPatterns.ts`
   - Or manually create patterns with validation
   - Focus on OUTPOSTS category first (need 13 more)
6. ⏳ Expand to other categories
7. ⏳ Reach 15-20 patterns per category

---

**Last Updated**: 2025-01-01  
**Status**: AI-Assisted Generation Active
**Valid Patterns**: 3/240 (1.3%)
