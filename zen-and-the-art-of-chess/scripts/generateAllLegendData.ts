// Generate opening books and position indexes for ALL legends from their games JSON files
// Usage: npx tsx scripts/generateAllLegendData.ts

import fs from 'fs';
import path from 'path';
import { Chess } from 'chess.js';

type LegendId = 
  | "fischer" 
  | "capablanca" 
  | "steinitz" 
  | "alekhine" 
  | "spassky"
  | "kasparov"
  | "karpov"
  | "tal"
  | "botvinnik"
  | "morphy"
  | "carlsen"
  | "lasker";

type LegendGame = {
  id: string;
  legend: string;
  pgn: string;
  white: string;
  black: string;
};

type OpeningBookNode = {
  fen: string;
  move: string;
  count: number;
};

type LegendPosition = {
  fen: string;
  move: string;
  gameId: string;
  moveNumber: number;
  color: 'w' | 'b';
};

const MAX_OPENING_FULLMOVE = 20; // Extended to 20 for more opening coverage

// Comprehensive name patterns for all legends
const LEGEND_NAME_PATTERNS: Record<LegendId, string[]> = {
  fischer: [
    "Fischer", "Robert James Fischer", "Bobby Fischer", "Robert J Fischer", 
    "Fischer, Robert", "Fischer,Robert", "R Fischer", "R. Fischer",
    "Fischer, R", "Fischer,R"
  ],
  capablanca: [
    "Capablanca", "Jose Raul Capablanca", "José Raúl Capablanca", 
    "Capablanca, Jose", "Capablanca,Jose", "J.R. Capablanca", 
    "JR Capablanca", "Capablanca, J", "Capablanca,J"
  ],
  steinitz: [
    "Steinitz", "Wilhelm Steinitz", "Steinitz, Wilhelm", 
    "Steinitz,Wilhelm", "W Steinitz", "W. Steinitz",
    "Steinitz, W", "Steinitz,W"
  ],
  alekhine: [
    "Alekhine", "Alexander Alekhine", "Aleksandr Alekhine", 
    "Alekhine, Alexander", "Alekhine,Alexander", "A Alekhine", 
    "A. Alekhine", "Alekhine, A", "Alechine", "Aljechin"
  ],
  spassky: [
    "Spassky", "Boris Spassky", "Boris V Spassky", "Boris Vasilyevich Spassky",
    "Spassky, Boris", "Spassky,Boris", "B Spassky", "B. Spassky",
    "Spassky, B", "Spassky,B", "Spasskij", "Spasski"
  ],
  kasparov: [
    "Kasparov", "Garry Kasparov", "Gary Kasparov", "Garri Kasparov",
    "Kasparov, Garry", "Kasparov,Garry", "G Kasparov", "G. Kasparov",
    "Kasparov, G", "Kasparov,G", "Kasp"
  ],
  karpov: [
    "Karpov", "Anatoly Karpov", "Anatoli Karpov", "A Karpov",
    "Karpov, Anatoly", "Karpov,Anatoly", "A. Karpov",
    "Karpov, A", "Karpov,A"
  ],
  tal: [
    "Tal,", "Tal ", "Mikhail Tal", "Mihail Tal", "M Tal", "M. Tal",
    "Tal, Mikhail", "Tal,Mikhail", "Tal, M", "Tal,M", 
    "Misha Tal", "Tahl"
  ],
  botvinnik: [
    "Botvinnik", "Mikhail Botvinnik", "Michail Botvinnik", 
    "Botvinnik, Mikhail", "Botvinnik,Mikhail", "M Botvinnik", 
    "M. Botvinnik", "Botvinnik, M", "Botvinnik,M", "Botwinnik"
  ],
  morphy: [
    "Morphy", "Paul Morphy", "P Morphy", "P. Morphy",
    "Morphy, Paul", "Morphy,Paul", "Morphy, P", "Morphy,P"
  ],
  carlsen: [
    "Carlsen", "Magnus Carlsen", "M Carlsen", "M. Carlsen",
    "Carlsen, Magnus", "Carlsen,Magnus", "Carlsen, M", "Carlsen,M",
    "Sven Magnus"
  ],
  lasker: [
    "Lasker, E", "Emanuel Lasker", "Lasker, Emanuel", "Em Lasker",
    "Emmanuel Lasker", "E Lasker", "E. Lasker", "Lasker,E",
    "Lasker,Emanuel", "Dr. Lasker"
  ],
};

function legendMatchesName(legend: LegendId, name: string | undefined): boolean {
  if (!name) return false;
  const patterns = LEGEND_NAME_PATTERNS[legend];
  const nameLower = name.toLowerCase();
  return patterns.some((p) => nameLower.includes(p.toLowerCase()));
}

function uciFromMove(move: any): string {
  const from = move.from;
  const to = move.to;
  const promo = move.promotion ? move.promotion : '';
  return from + to + promo;
}

function processGames(games: LegendGame[], legend: LegendId) {
  const openingMap = new Map<string, OpeningBookNode>();
  const positionIndex: Record<string, LegendPosition[]> = {};
  
  let gamesProcessed = 0;
  let gamesWithLegend = 0;
  let movesProcessed = 0;
  let openingMoves = 0;
  let legendPositions = 0;

  games.forEach((game, idx) => {
    const chess = new Chess();
    
    try {
      // Try to load PGN with multiple approaches
      let loaded = false;
      let cleanPgn = game.pgn;
      
      // Try original
      try {
        chess.loadPgn(cleanPgn, { sloppy: true });
        if (chess.history().length > 0) loaded = true;
      } catch {}
      
      // Try stripping comments and variations
      if (!loaded) {
        cleanPgn = game.pgn
          .replace(/\{[^}]*\}/g, '') // Remove comments
          .replace(/\([^)]*\)/g, '') // Remove variations
          .replace(/\$\d+/g, '');     // Remove NAGs
        try {
          chess.reset();
          chess.loadPgn(cleanPgn, { sloppy: true });
          if (chess.history().length > 0) loaded = true;
        } catch {}
      }
      
      if (!loaded) return;
      gamesProcessed++;
      
      const isLegendWhite = legendMatchesName(legend, game.white);
      const isLegendBlack = legendMatchesName(legend, game.black);
      
      if (!isLegendWhite && !isLegendBlack) return;
      gamesWithLegend++;
      
      const legendColor: 'w' | 'b' = isLegendWhite ? 'w' : 'b';
      const moveHistory = chess.history({ verbose: true });
      
      if (moveHistory.length === 0) return;
      
      // Reset and replay to track positions
      const board = new Chess();
      let plyCount = 0; // Track half-moves (plies) for opening book
      
      for (const move of moveHistory) {
        const fenBefore = board.fen();
        const fullmove = Math.floor(plyCount / 2) + 1; // Calculate fullmove from ply
        const sideToMove = board.turn();
        
        movesProcessed++;
        
        // Opening book - store ALL moves in first 20 full moves (40 plies)
        // This allows us to respond to any opening variation
        if (fullmove <= MAX_OPENING_FULLMOVE) {
          const uci = uciFromMove(move);
          const key = `${fenBefore}|${uci}`;
          const existing = openingMap.get(key);
          if (existing) {
            existing.count += 1;
          } else {
            openingMap.set(key, { fen: fenBefore, move: uci, count: 1 });
          }
          openingMoves++;
        }
        
        // Position index - only legend's moves (ALL positions, not just opening)
        if (sideToMove === legendColor) {
          const legendMoveUci = uciFromMove(move);
          if (!positionIndex[fenBefore]) {
            positionIndex[fenBefore] = [];
          }
          positionIndex[fenBefore].push({
            fen: fenBefore,
            move: legendMoveUci,
            gameId: game.id,
            moveNumber: fullmove,
            color: legendColor,
          });
          legendPositions++;
        }
        
        try {
          board.move(move);
          plyCount++;
        } catch {
          break; // Stop if move fails
        }
      }
    } catch (err) {
      // Silently skip problematic games
    }
  });

  const openingBook = Array.from(openingMap.values());
  openingBook.sort((a, b) => b.count - a.count);

  return { 
    openingBook, 
    positionIndex,
    stats: {
      totalGames: games.length,
      gamesProcessed,
      gamesWithLegend,
      movesProcessed,
      openingMoves,
      legendPositions,
      uniqueOpeningPositions: openingBook.length,
      uniquePositions: Object.keys(positionIndex).length
    }
  };
}

async function processLegend(legend: LegendId): Promise<void> {
  const gamesPath = path.resolve(`public/data/legends/legend-${legend}-games.json`);
  
  if (!fs.existsSync(gamesPath)) {
    console.log(`⚠️  Games file not found for ${legend}: ${gamesPath}`);
    return;
  }

  console.log(`\n📖 Processing ${legend}...`);
  
  const gamesRaw = fs.readFileSync(gamesPath, 'utf8');
  let games: LegendGame[];
  
  try {
    games = JSON.parse(gamesRaw);
  } catch (err) {
    console.log(`❌ Failed to parse games JSON for ${legend}`);
    return;
  }
  
  if (!Array.isArray(games) || games.length === 0) {
    console.log(`⚠️  No games found for ${legend}`);
    return;
  }
  
  const { openingBook, positionIndex, stats } = processGames(games, legend);

  const bookPath = path.resolve(`public/data/legends/legend-${legend}-opening-book.json`);
  const posPath = path.resolve(`public/data/legends/legend-${legend}-positions.json`);

  fs.writeFileSync(bookPath, JSON.stringify(openingBook, null, 2));
  fs.writeFileSync(posPath, JSON.stringify(positionIndex, null, 2));

  console.log(`✅ ${legend.toUpperCase()}:`);
  console.log(`   Total games: ${stats.totalGames}`);
  console.log(`   Games with ${legend}: ${stats.gamesWithLegend}`);
  console.log(`   Opening book entries: ${openingBook.length}`);
  console.log(`   Unique middlegame positions: ${stats.uniquePositions}`);
  console.log(`   Total legend moves indexed: ${stats.legendPositions}`);
}

async function main() {
  const legends: LegendId[] = [
    'fischer', 'capablanca', 'steinitz', 'alekhine', 'spassky',
    'kasparov', 'karpov', 'tal', 'botvinnik', 'morphy', 'carlsen', 'lasker'
  ];

  console.log('🏛️  GENERATING LEGEND DATA FOR ALL LEGENDS');
  console.log('==========================================');
  
  for (const legend of legends) {
    await processLegend(legend);
  }
  
  console.log('\n✅ ALL LEGENDS PROCESSED!');
  console.log('\n🎮 The legends are now ready to play with their real moves!');
}

main().catch(console.error);

