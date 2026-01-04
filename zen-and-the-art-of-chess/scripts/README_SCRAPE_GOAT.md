# Scrape Chessgames.com GOAT Games

This script scrapes notable games from the chessgames.com GOAT (Greatest Of All Time) page and downloads them as PGN files.

## Usage

```bash
# Basic usage (uses default decade=1000 and saves to ./data/pgns)
node scripts/scrapeChessgamesGOAT.mjs

# Specify output directory
node scripts/scrapeChessgamesGOAT.mjs ./data/pgns

# Specify output directory and decade
node scripts/scrapeChessgamesGOAT.mjs ./data/pgns 1000
```

## Features

- ✅ Fetches game list from chessgames.com GOAT page
- ✅ Extracts all game IDs from the page
- ✅ Downloads PGN format for each game
- ✅ Handles multiple download methods (tries various endpoints)
- ✅ Rate limiting (1 second delay between requests)
- ✅ Resume capability (skips already downloaded games)
- ✅ Progress tracking and error handling
- ✅ Saves all games to a single PGN file

## Output

The script creates a PGN file named `chessgames-goat-{decade}.pgn` in the specified output directory (default: `./data/pgns`).

Example: `./data/pgns/chessgames-goat-1000.pgn`

## How It Works

1. Fetches the GOAT page HTML from chessgames.com
2. Parses the HTML to extract all game IDs (from links like `/perl/chessgame?gid=XXXXXXX`)
3. For each game ID:
   - Tries multiple methods to download the PGN:
     - Direct PGN download endpoints
     - Game page with download parameters
     - Extracts download links from game page HTML
   - Saves the PGN if successfully retrieved
4. Combines all downloaded games into a single PGN file
5. Supports resuming - if you run the script again, it skips already downloaded games

## Using Downloaded Games

After downloading, you can use the PGN file as a reference database for other games. The file can be:

1. **Parsed with existing scripts:**
   ```bash
   npx tsx scripts/parseLegendPGNs.ts <legend> ./data/pgns/chessgames-goat-1000.pgn ./public/data/legends
   ```

2. **Used as a reference database** - The games can be referenced when processing other game collections

3. **Imported into chess databases** - Standard PGN format compatible with all chess software

## Notes

- The script includes rate limiting (1 second delay) to be respectful to chessgames.com's servers
- If a download fails for a particular game, the script continues with the next game
- The script is designed to handle chessgames.com's structure, but website changes may require script updates
- Some games may require authentication or may not be publicly accessible

## Troubleshooting

**No games found:**
- Verify the URL is correct: https://www.chessgames.com/perl/goat.pl?decade=1000
- The page structure may have changed - check manually in a browser

**Download failures:**
- Some games may require login/authentication
- Network issues - try running again (script will resume from where it left off)
- Rate limiting - the script already includes delays, but you may need to increase DELAY_MS if you get blocked

**HTML instead of PGN:**
- The script tries multiple methods automatically
- If all methods fail, the game will be skipped (check the error messages)

