# PowerShell script to parse all legend PGN files
# Usage: .\scripts\parse-all-legends.ps1

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir
$DataDir = Join-Path $ProjectRoot "data\legends"

Set-Location $ProjectRoot

Write-Host "🎯 Parsing all legend PGN files..." -ForegroundColor Cyan
Write-Host ""

$legends = @("fischer", "capablanca", "steinitz")

foreach ($legend in $legends) {
    $pgnFile = Join-Path $DataDir "$legend.pgn"
    
    if (-not (Test-Path $pgnFile)) {
        Write-Host "⚠️  Warning: $pgnFile not found. Skipping $legend." -ForegroundColor Yellow
        continue
    }
    
    Write-Host "📖 Processing $legend..." -ForegroundColor Green
    npx tsx scripts/parseLegendPGNs.ts $legend $pgnFile $DataDir
    Write-Host ""
}

Write-Host "✅ Done! Check $DataDir for generated JSON files." -ForegroundColor Green



