import { allInstructiveGames } from '../src/data/instructiveGames';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.id === 'botvinnik-capablanca');
if (!game) {
  console.log('Game not found');
  process.exit(1);
}

const chess = new Chess();
let errors = 0;

for (let i = 0; i < game.moves.length; i++) {
  try {
    const result = chess.move(game.moves[i].move);
    if (!result) {
      console.log(`MOVE_ERROR at move ${i+1}: ${game.moves[i].move}`);
      errors++;
      break;
    }
  } catch (e) {
    console.log(`MOVE_ERROR at move ${i+1}: ${game.moves[i].move} - ${e}`);
    errors++;
    break;
  }
}

if (errors === 0) {
  console.log(`Day 11 validated successfully! Total moves: ${game.moves.length}`);
} else {
  console.log(`Day 11 has ${errors} errors`);
}


