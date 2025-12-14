# Complete setup script for Windows - Downloads and processes all legend databases
# This gives you the most authentic experience possible!

Write-Host "🎯 Setting up COMPLETE game databases for all legends..." -ForegroundColor Cyan
Write-Host "This will download and process 800-1000+ games per legend!" -ForegroundColor Yellow
Write-Host ""

# Create directories
New-Item -ItemType Directory -Force -Path "data\pgns" | Out-Null
New-Item -ItemType Directory -Force -Path "public\data\legends" | Out-Null

$legends = @("fischer", "capablanca", "steinitz")

foreach ($legend in $legends) {
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Blue
    Write-Host "Processing $($legend.Substring(0,1).ToUpper() + $legend.Substring(1))..." -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Blue
    
    # Download
    Write-Host "`n[1/3] Downloading games database..." -ForegroundColor Blue
    node scripts/downloadLegendGames.mjs $legend ./data/pgns
    
    $pgnFile = "data\pgns\$legend.pgn"
    if (-not (Test-Path $pgnFile)) {
        Write-Host "⚠️  Download failed or file not found. Skipping..." -ForegroundColor Yellow
        Write-Host "    Please download manually from:" -ForegroundColor Yellow
        Write-Host "    https://www.pgnmentor.com/players/$($legend.Substring(0,1).ToUpper() + $legend.Substring(1)).pgn" -ForegroundColor Yellow
        continue
    }
    
    # Parse
    Write-Host "`n[2/3] Parsing PGN and generating data structures..." -ForegroundColor Blue
    npx tsx scripts/parseLegendPGNs.ts $legend ".\data\pgns\$legend.pgn" ".\public\data\legends"
    
    # Verify
    Write-Host "`n[3/3] Verifying generated files..." -ForegroundColor Blue
    
    $gamesFile = "public\data\legends\legend-$legend-games.json"
    $bookFile = "public\data\legends\legend-$legend-opening-book.json"
    $posFile = "public\data\legends\legend-$legend-positions.json"
    
    if (Test-Path $gamesFile) {
        $gameCount = (Select-String -Path $gamesFile -Pattern '"id"' -AllMatches).Matches.Count
        Write-Host "  ✅ Games: $gameCount found" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️ Games file not found" -ForegroundColor Yellow
    }
    
    if (Test-Path $bookFile) {
        $bookSize = (Select-String -Path $bookFile -Pattern '"fen"' -AllMatches).Matches.Count
        Write-Host "  ✅ Opening book: $bookSize positions" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️ Opening book not found" -ForegroundColor Yellow
    }
    
    if (Test-Path $posFile) {
        $posSize = (Select-String -Path $posFile -Pattern '"fen"' -AllMatches).Matches.Count
        Write-Host "  ✅ Position index: $posSize positions" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️ Position index not found" -ForegroundColor Yellow
    }
    
    Write-Host ""
}

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""
Write-Host "Your legends are now ready with comprehensive game databases!" -ForegroundColor Cyan
Write-Host "Play against them in the app - they'll use their actual moves!" -ForegroundColor Cyan
Write-Host ""














