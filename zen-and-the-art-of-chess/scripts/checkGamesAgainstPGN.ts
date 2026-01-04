/**
 * Systematically check games against PGN sources
 * This script helps identify which games need PGN verification
 */

import { allInstructiveGames } from '../src/data/instructiveGames';
import { Chess } from 'chess.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface GameStatus {
  gameId: string;
  dayNumber: number;
  title: string;
  white: string;
  black: string;
  year: number;
  event: string;
  needsPGNCheck: boolean;
  currentMoveCount: number;
  hasMOVE_ERROR: boolean;
}

function checkGame(game: typeof allInstructiveGames[0]): GameStatus {
  const chess = new Chess();
  let hasMOVE_ERROR = false;
  
  for (let i = 0; i < game.moves.length; i++) {
    try {
      const result = chess.move(game.moves[i].move);
      if (!result) {
        hasMOVE_ERROR = true;
        break;
      }
    } catch (e) {
      hasMOVE_ERROR = true;
      break;
    }
  }
  
  return {
    gameId: game.id,
    dayNumber: game.dayNumber,
    title: game.title,
    white: game.white,
    black: game.black,
    year: game.year,
    event: game.event,
    needsPGNCheck: hasMOVE_ERROR,
    currentMoveCount: game.moves.length,
    hasMOVE_ERROR,
  };
}

async function main() {
  console.log('\n🔍 Checking Games for PGN Verification Needs...\n');
  
  const gamesWithErrors: GameStatus[] = [];
  const gamesNeedingCheck: GameStatus[] = [];
  
  for (const game of allInstructiveGames) {
    if (game.moves.length === 0) continue;
    
    const status = checkGame(game);
    if (status.hasMOVE_ERROR) {
      gamesWithErrors.push(status);
      gamesNeedingCheck.push(status);
    }
  }
  
  // Sort by day number
  gamesNeedingCheck.sort((a, b) => a.dayNumber - b.dayNumber);
  
  console.log('='.repeat(80));
  console.log(`Games needing PGN verification: ${gamesNeedingCheck.length}`);
  console.log('='.repeat(80));
  console.log('\nGames with MOVE_ERROR (need PGN check):\n');
  
  gamesNeedingCheck.forEach(game => {
    console.log(`Day ${game.dayNumber}: ${game.title}`);
    console.log(`  ${game.white} vs ${game.black} (${game.year}, ${game.event})`);
    console.log(`  Game ID: ${game.gameId}`);
    console.log(`  Moves: ${game.currentMoveCount}`);
    console.log('');
  });
  
  // Write to file for reference
  const outputPath = path.join(__dirname, 'games-needing-pgn-check.json');
  fs.writeFileSync(outputPath, JSON.stringify(gamesNeedingCheck, null, 2));
  
  console.log(`\n📄 List written to: ${outputPath}\n`);
  console.log('Next steps:');
  console.log('1. Search for PGN for each game');
  console.log('2. Compare stored moves with PGN');
  console.log('3. Fix any discrepancies');
  console.log('');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});


