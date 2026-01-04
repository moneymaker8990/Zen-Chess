# Chessgames.com GOAT Scraper Notes

## Current Status

The scraper is experiencing rate limiting (HTTP 429) from chessgames.com. This is common when making many requests in a short time period.

## Solutions

### Option 1: Run Over Time (Recommended)
Run the scraper with very long delays between requests. The script now includes:
- 5 second delays between requests
- 30 second delays on retries
- Up to 5 retries

**To run safely:**
```bash
# This will take a LONG time - potentially hours depending on how many games
node scripts/scrapeChessgamesGOAT.mjs
```

### Option 2: Use Existing Download
We already successfully downloaded 11 games from the decade=1000 page:
- File: `data/pgns/chessgames-goat-1000.pgn`
- Contains: 11 notable games including the "Game of the Century"

You can use this file as a starting point/reference.

### Option 3: Manual Download + Script Combination
1. Manually visit chessgames.com GOAT page for each era
2. Use browser extensions or manual copy/paste for games
3. Or wait 24 hours and try the scraper again (rate limits often reset daily)

### Option 4: Alternative Source
Consider using:
- PGN Mentor (already in your scripts)
- ChessBase databases
- Other chess databases that may have bulk download options

## Rate Limiting Explanation

Chessgames.com protects against automated scraping with rate limiting. Making too many requests too quickly results in HTTP 429 errors. The delays we've added help, but for a large scrape (potentially hundreds of games across all eras), you may need to:

1. Run the script over multiple days
2. Add even longer delays (10-15 seconds between requests)
3. Use a paid API if chessgames.com offers one
4. Contact chessgames.com for bulk download permission

## Current Script Features

✅ Scrapes all eras/decades automatically
✅ Retry logic with exponential backoff
✅ Resume capability (skips already downloaded games)
✅ Progress tracking
✅ Error handling

The script is ready to use - it just needs time and patience to avoid rate limiting.

