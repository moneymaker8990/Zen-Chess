import { allInstructiveGames } from '../src/data/instructiveGames/index.ts';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.id === 'samisch-nimzowitsch' && g.dayNumber === 40);
if (!game) {
  console.log('Game not found');
  process.exit(1);
}

if (game.moves.length === 0) {
  console.log('Day 40 has no moves defined (likely uses generateRemainingGames function)');
  process.exit(0);
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
  console.log(`Day 40 validated successfully! ${game.moves.length} moves`);
} else {
  console.log(`Day 40 has ${errors} errors`);
}
