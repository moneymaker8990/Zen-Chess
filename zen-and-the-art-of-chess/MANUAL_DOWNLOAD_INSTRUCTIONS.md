# 📥 Manual Download Instructions - Complete Game Databases

Since automated downloads aren't working, here's the **easiest way** to get all the games manually:

## Step 1: Download PGN Files

### Option A: PGN Mentor (Recommended - Easiest)

1. Visit: https://www.pgnmentor.com/files.html
2. Click on **"Players"** section
3. Download these files:
   - `Fischer.pgn` - Right-click → Save As → `fischer.pgn`
   - `Capablanca.pgn` - Right-click → Save As → `capablanca.pgn`
   - `Steinitz.pgn` - Right-click → Save As → `steinitz.pgn`

4. Save them in: `data/pgns/` folder (create it if needed)

### Option B: Direct Search

If the files page doesn't work, try searching:
- **Fischer**: https://www.pgnmentor.com/search.html?query=fischer
- **Capablanca**: https://www.pgnmentor.com/search.html?query=capablanca
- **Steinitz**: https://www.pgnmentor.com/search.html?query=steinitz

### Option C: Chessgames.com (Most Complete)

1. Visit: https://www.chessgames.com/
2. Search for each player:
   - Bobby Fischer: https://www.chessgames.com/perl/chessplayer?pid=15833
   - José Capablanca: https://www.chessgames.com/perl/chessplayer?pid=15940
   - Wilhelm Steinitz: https://www.chessgames.com/perl/chessplayer?pid=13187
3. Look for "Download" or "Export" button
4. Choose "Download all games as PGN"
5. Save in `data/pgns/`

## Step 2: Verify Files

Check that your files exist:
```powershell
# Windows
dir data\pgns\*.pgn

# Should show:
# fischer.pgn
# capablanca.pgn
# steinitz.pgn
```

## Step 3: Parse the Files

Once you have the files, I'll run the parser for you! Just tell me when the files are ready.

Or run manually:
```powershell
npx tsx scripts/parseLegendPGNs.ts fischer data/pgns/fischer.pgn public/data/legends
npx tsx scripts/parseLegendPGNs.ts capablanca data/pgns/capablanca.pgn public/data/legends
npx tsx scripts/parseLegendPGNs.ts steinitz data/pgns/steinitz.pgn public/data/legends
```

## Expected Results

After parsing, you'll have:
- **Fischer**: 800+ games → 50,000+ positions
- **Capablanca**: 500+ games → 35,000+ positions  
- **Steinitz**: 1,000+ games → 60,000+ positions

## Quick Checklist

- [ ] Create `data/pgns/` folder
- [ ] Download `fischer.pgn` from PGN Mentor
- [ ] Download `capablanca.pgn` from PGN Mentor
- [ ] Download `steinitz.pgn` from PGN Mentor
- [ ] Save all files in `data/pgns/`
- [ ] Ready to parse!

Once you've downloaded the files, let me know and I'll parse them for you! 🎯




