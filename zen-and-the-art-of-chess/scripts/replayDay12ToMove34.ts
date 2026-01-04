import { allInstructiveGames } from '../src/data/instructiveGames';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.id === 'tal-larsen')!;
const chess = new Chess();

console.log('Replaying Day 12 moves:\n');
for (let i = 0; i < 34; i++) {
  const result = chess.move(game.moves[i].move);
  if (!result) {
    console.log(`ERROR at move ${i+1}: ${game.moves[i].move}`);
    break;
  }
  if (i < 10 || i >= 24) {
    console.log(`Move ${i+1}: ${game.moves[i].move}`);
  }
}

console.log('\nPosition after move 34:');
console.log(chess.fen());
console.log('\nBoard:');
console.log(chess.ascii());


