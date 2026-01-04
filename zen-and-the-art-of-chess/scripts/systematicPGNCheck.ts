/**
 * Systematically check games against PGN sources
 * This will help identify which games need PGN verification and fixes
 */

import { allInstructiveGames } from '../src/data/instructiveGames';
import { Chess } from 'chess.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface GamePGNStatus {
  gameId: string;
  dayNumber: number;
  title: string;
  white: string;
  black: string;
  year: number;
  event: string;
  needsPGNResearch: boolean;
  firstFewMoves: string[];
  hasMOVE_ERROR: boolean;
  errorAtMove: number | null;
}

function getFirstMoves(game: typeof allInstructiveGames[0], count: number = 10): string[] {
  return game.moves.slice(0, count).map(m => m.move);
}

function checkGameForErrors(game: typeof allInstructiveGames[0]): { hasError: boolean; errorAtMove: number | null } {
  const chess = new Chess();
  
  for (let i = 0; i < game.moves.length; i++) {
    try {
      const result = chess.move(game.moves[i].move);
      if (!result) {
        return { hasError: true, errorAtMove: i + 1 };
      }
    } catch (e) {
      return { hasError: true, errorAtMove: i + 1 };
    }
  }
  
  return { hasError: false, errorAtMove: null };
}

async function main() {
  console.log('\n🔍 Systematic PGN Check for All Games\n');
  console.log('='.repeat(80));
  
  const gamesNeedingPGN: GamePGNStatus[] = [];
  
  for (const game of allInstructiveGames) {
    if (game.moves.length === 0) continue;
    
    const errorCheck = checkGameForErrors(game);
    
    if (errorCheck.hasError) {
      gamesNeedingPGN.push({
        gameId: game.id,
        dayNumber: game.dayNumber,
        title: game.title,
        white: game.white,
        black: game.black,
        year: game.year,
        event: game.event,
        needsPGNResearch: true,
        firstFewMoves: getFirstMoves(game, 8),
        hasMOVE_ERROR: true,
        errorAtMove: errorCheck.errorAtMove,
      });
    }
  }
  
  // Sort by day number
  gamesNeedingPGN.sort((a, b) => a.dayNumber - b.dayNumber);
  
  console.log(`\nGames needing PGN verification: ${gamesNeedingPGN.length}\n`);
  
  // Group by first few moves to identify potential duplicates or wrong games
  const gamesByOpening = new Map<string, GamePGNStatus[]>();
  
  gamesNeedingPGN.forEach(game => {
    const openingKey = game.firstFewMoves.slice(0, 4).join(' ');
    if (!gamesByOpening.has(openingKey)) {
      gamesByOpening.set(openingKey, []);
    }
    gamesByOpening.get(openingKey)!.push(game);
  });
  
  console.log('Games with MOVE_ERROR (need PGN check):\n');
  gamesNeedingPGN.forEach(game => {
    console.log(`Day ${game.dayNumber}: ${game.title}`);
    console.log(`  ${game.white} vs ${game.black} (${game.year}, ${game.event})`);
    console.log(`  Error at move: ${game.errorAtMove}`);
    console.log(`  Opening: ${game.firstFewMoves.slice(0, 6).join(' ')}...`);
    console.log(`  Search: "${game.white}" "${game.black}" ${game.year} "${game.event}" PGN`);
    console.log('');
  });
  
  // Write detailed report
  const outputPath = path.join(__dirname, 'pgn-check-report.json');
  fs.writeFileSync(outputPath, JSON.stringify(gamesNeedingPGN, null, 2));
  
  console.log(`\n📄 Detailed report written to: ${outputPath}\n`);
  console.log('Next steps:');
  console.log('1. Search for PGN for each game listed above');
  console.log('2. Compare stored moves with PGN');
  console.log('3. Fix discrepancies in games.ts');
  console.log('');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});


