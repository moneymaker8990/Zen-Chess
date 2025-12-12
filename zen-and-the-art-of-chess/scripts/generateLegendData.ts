// Quick script to generate opening book and positions from games JSON
// This generates the files that would normally come from parsing PGN files

import fs from 'fs';
import path from 'path';
import { Chess } from 'chess.js';

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

const MAX_OPENING_FULLMOVE = 16;

function uciFromMove(chess: Chess, move: any): string {
  const from = move.from;
  const to = move.to;
  const promo = move.promotion ? move.promotion : '';
  return from + to + promo;
}

function processGames(games: LegendGame[], legend: string) {
  const openingMap = new Map<string, OpeningBookNode>();
  const positionIndex: Record<string, LegendPosition[]> = {};

  const namePatterns = {
    fischer: ['Fischer', 'Bobby Fischer'],
    capablanca: ['Capablanca', 'Jose Raul Capablanca', 'José Raúl Capablanca'],
    steinitz: ['Steinitz', 'Wilhelm Steinitz'],
  };

  const patterns = namePatterns[legend as keyof typeof namePatterns] || [];
  const legendMatches = (name: string) => 
    patterns.some(p => name.toLowerCase().includes(p.toLowerCase()));

  games.forEach((game) => {
    const chess = new Chess();
    
    try {
      chess.loadPgn(game.pgn, { sloppy: true });
      
      const isLegendWhite = legendMatches(game.white);
      const isLegendBlack = legendMatches(game.black);
      
      if (!isLegendWhite && !isLegendBlack) return;
      
      const legendColor: 'w' | 'b' = isLegendWhite ? 'w' : 'b';
      const moveHistory = chess.history({ verbose: true });
      
      // Reset and replay
      const board = new Chess();
      
      for (const move of moveHistory) {
        const fenBefore = board.fen();
        const fullmove = board.fullMoveNumber;
        
        // Opening book
        if (fullmove <= MAX_OPENING_FULLMOVE) {
          const uci = uciFromMove(board, move);
          const key = `${fenBefore}|${uci}`;
          const existing = openingMap.get(key);
          if (existing) {
            existing.count += 1;
          } else {
            openingMap.set(key, { fen: fenBefore, move: uci, count: 1 });
          }
        }
        
        // Position index
        const sideToMove = board.turn();
        if (sideToMove === legendColor) {
          const legendMoveUci = uciFromMove(board, move);
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
        }
        
        board.move(move);
      }
    } catch (err) {
      console.warn(`Error processing game ${game.id}:`, err);
    }
  });

  const openingBook = Array.from(openingMap.values());
  openingBook.sort((a, b) => b.count - a.count);

  return { openingBook, positionIndex };
}

async function main() {
  const [, , legendArg] = process.argv;
  
  if (!legendArg) {
    console.error('Usage: tsx scripts/generateLegendData.ts <legendId>');
    process.exit(1);
  }

  const legend = legendArg as 'fischer' | 'capablanca' | 'steinitz';
  const gamesPath = path.resolve(`public/data/legends/legend-${legend}-games.json`);
  
  if (!fs.existsSync(gamesPath)) {
    console.error(`Games file not found: ${gamesPath}`);
    process.exit(1);
  }

  const games = JSON.parse(fs.readFileSync(gamesPath, 'utf8')) as LegendGame[];
  const { openingBook, positionIndex } = processGames(games, legend);

  const bookPath = path.resolve(`public/data/legends/legend-${legend}-opening-book.json`);
  const posPath = path.resolve(`public/data/legends/legend-${legend}-positions.json`);

  fs.writeFileSync(bookPath, JSON.stringify(openingBook, null, 2));
  fs.writeFileSync(posPath, JSON.stringify(positionIndex, null, 2));

  console.log(`✅ Generated for ${legend}:`);
  console.log(`   Opening book: ${openingBook.length} positions`);
  console.log(`   Position index: ${Object.keys(positionIndex).length} unique positions`);
}

main().catch(console.error);











