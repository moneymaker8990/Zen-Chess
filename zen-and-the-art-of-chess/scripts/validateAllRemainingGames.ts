import { allInstructiveGames } from '../src/data/instructiveGames/index.ts';
import { Chess } from 'chess.js';
import fs from 'fs';

// Get all games that need checking
const gamesNeedingCheck = JSON.parse(fs.readFileSync('scripts/games-needing-pgn-check.json', 'utf-8'));

const results: Array<{
  dayNumber: number;
  gameId: string;
  title: string;
  status: 'VALID' | 'ERROR' | 'NO_MOVES';
  moveCount?: number;
  errorMove?: number;
  errorMoveText?: string;
}> = [];

for (const gameInfo of gamesNeedingCheck) {
  const game = allInstructiveGames.find(g => g.id === gameInfo.gameId && g.dayNumber === gameInfo.dayNumber);
  
  if (!game) {
    continue;
  }

  if (game.moves.length === 0) {
    results.push({
      dayNumber: gameInfo.dayNumber,
      gameId: gameInfo.gameId,
      title: gameInfo.title,
      status: 'NO_MOVES',
    });
    continue;
  }

  const chess = new Chess();
  let errors = 0;
  let errorMove = 0;
  let errorMoveText = '';

  try {
    for (let i = 0; i < game.moves.length; i++) {
      try {
        const result = chess.move(game.moves[i].move);
        if (!result) {
          errors++;
          errorMove = i + 1;
          errorMoveText = game.moves[i].move;
          break;
        }
      } catch (e: any) {
        errors++;
        errorMove = i + 1;
        errorMoveText = game.moves[i].move;
        break;
      }
    }
  } catch (e: any) {
    errors++;
    errorMove = errorMove || 1;
    errorMoveText = errorMoveText || 'Unknown error';
  }

  if (errors === 0) {
    results.push({
      dayNumber: gameInfo.dayNumber,
      gameId: gameInfo.gameId,
      title: gameInfo.title,
      status: 'VALID',
      moveCount: game.moves.length,
    });
  } else {
    results.push({
      dayNumber: gameInfo.dayNumber,
      gameId: gameInfo.gameId,
      title: gameInfo.title,
      status: 'ERROR',
      moveCount: game.moves.length,
      errorMove: errorMove,
      errorMoveText: errorMoveText,
    });
  }
}

// Sort by day number
results.sort((a, b) => a.dayNumber - b.dayNumber);

// Print summary
const valid = results.filter(r => r.status === 'VALID');
const errors = results.filter(r => r.status === 'ERROR');
const noMoves = results.filter(r => r.status === 'NO_MOVES');

console.log(`\n=== VALIDATION SUMMARY ===`);
console.log(`Total games checked: ${results.length}`);
console.log(`✅ Valid: ${valid.length}`);
console.log(`❌ Errors: ${errors.length}`);
console.log(`⚠️  No moves: ${noMoves.length}\n`);

if (errors.length > 0) {
  console.log(`\n=== GAMES WITH ERRORS ===`);
  errors.forEach(r => {
    console.log(`Day ${r.dayNumber}: ${r.title} (${r.gameId})`);
    console.log(`  Error at move ${r.errorMove}: ${r.errorMoveText}`);
  });
}

// Write to file
fs.writeFileSync('scripts/current-validation-status.json', JSON.stringify(results, null, 2));
console.log(`\n📄 Full results written to scripts/current-validation-status.json`);
