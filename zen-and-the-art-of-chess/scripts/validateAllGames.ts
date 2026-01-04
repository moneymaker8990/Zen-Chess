import { allInstructiveGames } from '../src/data/instructiveGames/index.ts';
import { Chess } from 'chess.js';
import fs from 'fs';

const gamesNeedingCheck = JSON.parse(fs.readFileSync('scripts/games-needing-pgn-check.json', 'utf-8'));

const results: Array<{
  gameId: string;
  dayNumber: number;
  status: 'VALID' | 'ERROR' | 'NOT_FOUND';
  moveCount?: number;
  errorMove?: number;
}> = [];

let validCount = 0;
let errorCount = 0;
let notFoundCount = 0;

for (const gameInfo of gamesNeedingCheck) {
  const game = allInstructiveGames.find(g => g.id === gameInfo.gameId);
  
  if (!game) {
    notFoundCount++;
    results.push({
      gameId: gameInfo.gameId,
      dayNumber: gameInfo.dayNumber,
      status: 'NOT_FOUND',
    });
    continue;
  }

  const chess = new Chess();
  let errors = 0;
  let errorMove = 0;

  for (let i = 0; i < game.moves.length; i++) {
    try {
      const result = chess.move(game.moves[i].move);
      if (!result) {
        errors++;
        errorMove = i + 1;
        break;
      }
    } catch (e) {
      errors++;
      errorMove = i + 1;
      break;
    }
  }

  if (errors === 0) {
    validCount++;
    results.push({
      gameId: gameInfo.gameId,
      dayNumber: gameInfo.dayNumber,
      status: 'VALID',
      moveCount: game.moves.length,
    });
  } else {
    errorCount++;
    results.push({
      gameId: gameInfo.gameId,
      dayNumber: gameInfo.dayNumber,
      status: 'ERROR',
      errorMove: errorMove,
    });
  }
}

console.log(`\n=== VALIDATION SUMMARY ===`);
console.log(`Total games checked: ${gamesNeedingCheck.length}`);
console.log(`Valid: ${validCount}`);
console.log(`Errors: ${errorCount}`);
console.log(`Not found: ${notFoundCount}`);

console.log(`\n=== VALID GAMES ===`);
results
  .filter(r => r.status === 'VALID')
  .forEach(r => console.log(`Day ${r.dayNumber}: ${r.gameId} (${r.moveCount} moves)`));

console.log(`\n=== GAMES WITH ERRORS (first 20) ===`);
results
  .filter(r => r.status === 'ERROR')
  .slice(0, 20)
  .forEach(r => console.log(`Day ${r.dayNumber}: ${r.gameId} (error at move ${r.errorMove})`));

// Write full results to file
fs.writeFileSync(
  'scripts/validation-results.json',
  JSON.stringify(results, null, 2)
);

console.log(`\nFull results written to scripts/validation-results.json`);


