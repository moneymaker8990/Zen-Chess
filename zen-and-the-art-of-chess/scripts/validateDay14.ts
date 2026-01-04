import { allInstructiveGames } from '../src/data/instructiveGames/index.ts';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.id === 'kasparov-karpov-wc85-g16' && g.dayNumber === 14);
if (!game) {
  console.log('Game not found');
  process.exit(1);
}

const chess = new Chess();
let errors = 0;
for (let i = 0; i < game.moves.length; i++) {
  const result = chess.move(game.moves[i].move);
  if (!result) {
    console.log(`ERROR at move ${i+1}: ${game.moves[i].move}`);
    errors++;
    break;
  }
}

if (errors === 0) {
  console.log(`Day 14 validated successfully! ${game.moves.length} moves`);
} else {
  console.log(`Day 14 has ${errors} errors`);
}


