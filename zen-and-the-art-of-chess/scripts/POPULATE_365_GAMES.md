# Populate 365 Notable Chess Games - Workflow Guide

This guide explains how to populate the remaining 365 notable chess games using the scripts we've created.

## Current Status

- ✅ **54 games completed** (need 311 more)
- ✅ Extraction script created (`extractNotableGamesFromPGNs.ts`)
- ✅ Reference list created (`notableGamesReference.json`)
- ✅ Game generator script created (`generateGameEntries.ts`)
- ✅ Validation script created (`validateGames.ts`)
- ✅ Integration script created (`integrateGames.ts`)

## Workflow Steps

### Step 1: Extract Notable Games (if not already done)

If you haven't already extracted notable games from your PGN files:

```bash
npx tsx scripts/extractNotableGamesFromPGNs.ts notable-games-extracted.json
```

This will:
- Parse all PGN files in `data/pgns/`
- Filter for notable games (WC, Candidates, famous tournaments)
- Prioritize games by importance
- Output to `notable-games-extracted.json`

### Step 2: Generate Game Entries

Generate InstructiveGame entries from the extracted games:

```bash
npx tsx scripts/generateGameEntries.ts notable-games-extracted.json generated-game-entries.json
```

This will:
- Read the extracted notable games
- Generate proper InstructiveGame structure
- Assign day numbers (avoiding duplicates)
- Generate FEN positions for all moves
- Create annotations and metadata
- Output to `generated-game-entries.json`

### Step 3: Validate Games

Validate all generated games:

```bash
npx tsx scripts/validateGames.ts generated-game-entries.json
```

This will:
- Check all moves are legal
- Verify FEN positions are correct
- Validate metadata completeness
- Check for duplicate day numbers/IDs
- Generate validation report

### Step 4: Integrate Games

Generate TypeScript code for integration:

```bash
npx tsx scripts/integrateGames.ts generated-game-entries.json
```

This will:
- Generate TypeScript code for all games
- Output to `generated-games-code.ts`
- You can then manually review and integrate into `games.ts`

### Step 5: Manual Integration

1. Open `generated-games-code.ts`
2. Review the generated game entries
3. Copy games into the `instructiveGames` array in `src/data/instructiveGames/games.ts`
4. Ensure proper formatting and no duplicates

### Step 6: Final Validation

After integration, validate the entire games.ts file:

```bash
npx tsx scripts/validateInstructiveGames.ts
```

## Era Distribution Target

The scripts aim for this distribution:
- **Romantic (1850s)**: ~30 games
- **Classical (1880-1920)**: ~40 games
- **Hypermodern (1920s)**: ~35 games
- **Soviet (1940-1970)**: ~60 games
- **Modern (1970-2000)**: ~70 games
- **Contemporary (2000+)**: ~76 games

## File Structure

```
scripts/
├── extractNotableGamesFromPGNs.ts    # Extract & filter notable games
├── notableGamesReference.json         # Curated reference list
├── generateGameEntries.ts             # Generate InstructiveGame entries
├── validateGames.ts                   # Validate generated games
├── integrateGames.ts                  # Generate integration code
└── POPULATE_365_GAMES.md             # This file

Generated files:
├── notable-games-extracted.json       # Extracted notable games
├── generated-game-entries.json        # Generated game entries
├── generated-games-code.ts            # TypeScript code for integration
└── *-validation-report.json          # Validation reports
```

## Troubleshooting

### No notable games extracted
- Check that PGN files exist in `data/pgns/`
- Verify PGN files are valid
- Check extraction script output for errors

### Generated games have errors
- Run validation script to see specific errors
- Check that source games have valid moves
- Verify PGN parsing worked correctly

### Day number conflicts
- The script automatically skips existing day numbers
- Check `games.ts` for current day numbers
- Manually adjust if needed

## Next Steps After Integration

1. Test the application to ensure games load correctly
2. Verify all 365 days have games assigned
3. Check that games display properly in the UI
4. Review game quality and annotations



