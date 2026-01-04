import { allInstructiveGames } from '../src/data/instructiveGames/index.ts';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.id === 'keres-euwe' && g.dayNumber === 49);
if (!game) {
  console.log('Game not found');
  process.exit(1);
}

const chess = new Chess();
console.log('Replaying moves up to move 32...\n');

for (let i = 0; i < 31; i++) {
  const result = chess.move(game.moves[i].move);
  if (!result) {
    console.log(`ERROR at move ${i+1}: ${game.moves[i].move}`);
    process.exit(1);
  }
}

console.log(`Position after move 31 (${game.moves[30].move}):`);
console.log(`FEN: ${chess.fen()}`);
console.log(`Turn: ${chess.turn() === 'w' ? 'White' : 'Black'}`);
console.log(`\nLegal moves:`);
const legalMoves = chess.moves();
console.log(legalMoves.slice(0, 30).join(', '));
console.log(`\nAttempting move 32: ${game.moves[31].move}`);
const result = chess.move(game.moves[31].move);
if (!result) {
  console.log(`\nERROR: Invalid move: ${game.moves[31].move}`);
} else {
  console.log(`Move successful!`);
}





