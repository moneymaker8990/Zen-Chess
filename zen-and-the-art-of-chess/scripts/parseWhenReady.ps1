# Helper script - Run this AFTER you've downloaded the PGN files
# This will parse all downloaded files automatically

Write-Host "🎯 Parsing downloaded legend games..." -ForegroundColor Cyan
Write-Host ""

$pgnDir = "data\pgns"
$outputDir = "public\data\legends"

if (-not (Test-Path $pgnDir)) {
    Write-Host "❌ Error: $pgnDir not found!" -ForegroundColor Red
    Write-Host "Please download PGN files first. See DOWNLOAD_NOW.md" -ForegroundColor Yellow
    exit 1
}

$legends = @(
    @{name="fischer"; file="fischer.pgn"},
    @{name="capablanca"; file="capablanca.pgn"},
    @{name="steinitz"; file="steinitz.pgn"}
)

$found = 0
$missing = @()

foreach ($legend in $legends) {
    $pgnFile = Join-Path $pgnDir $legend.file
    if (Test-Path $pgnFile) {
        $found++
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Blue
        Write-Host "Processing $($legend.name.ToUpper())..." -ForegroundColor Yellow
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Blue
        
        npx tsx scripts/parseLegendPGNs.ts $legend.name $pgnFile $outputDir
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ $($legend.name) parsed successfully!" -ForegroundColor Green
        } else {
            Write-Host "❌ Failed to parse $($legend.name)" -ForegroundColor Red
        }
        Write-Host ""
    } else {
        $missing += $legend.name
        Write-Host "⚠️  $($legend.file) not found - skipping" -ForegroundColor Yellow
    }
}

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  Processed: $found / 3" -ForegroundColor $(if ($found -eq 3) { "Green" } else { "Yellow" })

if ($missing.Count -gt 0) {
    Write-Host "  Missing: $($missing -join ', ')" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "💡 Download missing files from:" -ForegroundColor Cyan
    Write-Host "   https://www.pgnmentor.com/files.html" -ForegroundColor White
    Write-Host "   See DOWNLOAD_NOW.md for instructions" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "✅ All legends processed! Your game databases are ready!" -ForegroundColor Green
    Write-Host "   Files are in: $outputDir" -ForegroundColor Cyan
}








