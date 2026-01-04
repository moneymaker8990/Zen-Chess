import { allInstructiveGames } from '../src/data/instructiveGames/index.ts';
import { Chess } from 'chess.js';

const daysToCheck = [7, 8, 9, 11, 12, 13, 14, 15, 16];

for (const day of daysToCheck) {
  const game = allInstructiveGames.find(g => g.dayNumber === day);
  if (!game) {
    console.log(`Day ${day}: Game not found`);
    continue;
  }

  if (game.moves.length === 0) {
    console.log(`Day ${day}: No moves defined`);
    continue;
  }

  const chess = new Chess();
  let errors = 0;
  let errorMove = 0;
  for (let i = 0; i < game.moves.length; i++) {
    const result = chess.move(game.moves[i].move);
    if (!result) {
      errors++;
      errorMove = i + 1;
      break;
    }
  }

  if (errors === 0) {
    console.log(`Day ${day} (${game.id}): ✅ Valid - ${game.moves.length} moves`);
  } else {
    console.log(`Day ${day} (${game.id}): ❌ ERROR at move ${errorMove}: ${game.moves[errorMove - 1]?.move}`);
  }
}
