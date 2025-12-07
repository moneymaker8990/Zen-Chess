# Script to fix and re-parse all legends with proper position extraction
Write-Host "`n🔧 Fixing and re-parsing all legends with comprehensive position extraction...`n" -ForegroundColor Cyan

$legends = @(
    @{name="fischer"; file="fischer\Fischer.pgn"},
    @{name="capablanca"; file="capablanca\Capablanca.pgn"},
    @{name="steinitz"; file="steinitz\Steinitz.pgn"},
    @{name="alekhine"; file="alekhine\Alekhine.pgn"},
    @{name="spassky"; file="spassky\Spassky.pgn"}
)

foreach ($legend in $legends) {
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Blue
    Write-Host "Processing $($legend.name.ToUpper())..." -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Blue
    
    $pgnPath = "data\pgns\$($legend.file)"
    
    if (Test-Path $pgnPath) {
        Write-Host "`nParsing from: $pgnPath" -ForegroundColor Cyan
        npx tsx scripts/parseLegendPGNs.ts $legend.name $pgnPath public/data/legends
        
        # Check results
        $gamesFile = "public\data\legends\legend-$($legend.name)-games.json"
        $bookFile = "public\data\legends\legend-$($legend.name)-opening-book.json"
        
        if (Test-Path $gamesFile) {
            $games = Get-Content $gamesFile -Raw | ConvertFrom-Json
            Write-Host "  Games: $($games.Count)" -ForegroundColor Green
        }
        
        if (Test-Path $bookFile) {
            $book = Get-Content $bookFile -Raw | ConvertFrom-Json
            Write-Host "  Opening positions: $($book.Count)" -ForegroundColor $(if ($book.Count -gt 0) { "Green" } else { "Yellow" })
        }
        
        Write-Host ""
    } else {
        Write-Host "⚠️  PGN file not found: $pgnPath" -ForegroundColor Yellow
    }
}

Write-Host "✅ Complete!`n" -ForegroundColor Green








