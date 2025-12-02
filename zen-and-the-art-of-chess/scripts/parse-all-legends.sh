#!/bin/bash
# Script to parse all legend PGN files
# Usage: ./scripts/parse-all-legends.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DATA_DIR="$PROJECT_ROOT/data/legends"

cd "$PROJECT_ROOT"

echo "🎯 Parsing all legend PGN files..."
echo ""

# Check if PGN files exist
for legend in fischer capablanca steinitz; do
  pgn_file="$DATA_DIR/$legend.pgn"
  if [ ! -f "$pgn_file" ]; then
    echo "⚠️  Warning: $pgn_file not found. Skipping $legend."
    continue
  fi
  
  echo "📖 Processing $legend..."
  npx tsx scripts/parseLegendPGNs.ts "$legend" "$pgn_file" "$DATA_DIR"
  echo ""
done

echo "✅ Done! Check $DATA_DIR for generated JSON files."




