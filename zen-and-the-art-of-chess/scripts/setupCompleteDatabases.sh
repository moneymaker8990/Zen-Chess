#!/bin/bash
# Complete setup script - Downloads and processes all legend databases
# This gives you the most authentic experience possible!

set -e

echo "🎯 Setting up COMPLETE game databases for all legends..."
echo "This will download and process 800-1000+ games per legend!"
echo ""

# Create directories
mkdir -p data/pgns
mkdir -p public/data/legends

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

LEGENDS=("fischer" "capablanca" "steinitz")

for legend in "${LEGENDS[@]}"; do
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}Processing ${legend^}...${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    # Download
    echo -e "\n${BLUE}[1/3]${NC} Downloading games database..."
    node scripts/downloadLegendGames.mjs "$legend" ./data/pgns
    
    if [ ! -f "data/pgns/${legend}.pgn" ]; then
        echo -e "${YELLOW}⚠️  Download failed or file not found. Skipping...${NC}"
        echo -e "${YELLOW}    Please download manually from:${NC}"
        echo -e "${YELLOW}    https://www.pgnmentor.com/players/${legend^}.pgn${NC}"
        continue
    fi
    
    # Parse
    echo -e "\n${BLUE}[2/3]${NC} Parsing PGN and generating data structures..."
    npx tsx scripts/parseLegendPGNs.ts "$legend" \
        "./data/pgns/${legend}.pgn" \
        "./public/data/legends"
    
    # Verify
    echo -e "\n${BLUE}[3/3]${NC} Verifying generated files..."
    
    GAMES_FILE="public/data/legends/legend-${legend}-games.json"
    BOOK_FILE="public/data/legends/legend-${legend}-opening-book.json"
    POS_FILE="public/data/legends/legend-${legend}-positions.json"
    
    if [ -f "$GAMES_FILE" ]; then
        GAME_COUNT=$(grep -c '"id"' "$GAMES_FILE" || echo "0")
        echo -e "  ${GREEN}✅${NC} Games: $GAME_COUNT found"
    else
        echo -e "  ${YELLOW}⚠️${NC} Games file not found"
    fi
    
    if [ -f "$BOOK_FILE" ]; then
        BOOK_SIZE=$(grep -c '"fen"' "$BOOK_FILE" || echo "0")
        echo -e "  ${GREEN}✅${NC} Opening book: $BOOK_SIZE positions"
    else
        echo -e "  ${YELLOW}⚠️${NC} Opening book not found"
    fi
    
    if [ -f "$POS_FILE" ]; then
        POS_SIZE=$(grep -c '"fen"' "$POS_FILE" || echo "0")
        echo -e "  ${GREEN}✅${NC} Position index: $POS_SIZE positions"
    else
        echo -e "  ${YELLOW}⚠️${NC} Position index not found"
    fi
    
    echo ""
done

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Setup complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Your legends are now ready with comprehensive game databases!"
echo "Play against them in the app - they'll use their actual moves!"
echo ""











