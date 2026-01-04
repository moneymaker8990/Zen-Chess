import { allInstructiveGames } from '../src/data/instructiveGames/index.ts';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.id === 'alekhine-bogoljubov-wc' && g.dayNumber === 45);
if (!game) {
  console.log('Game not found');
  process.exit(1);
}

const chess = new Chess();
console.log('Replaying moves up to move 18...\n');

for (let i = 0; i < 17; i++) {
  const result = chess.move(game.moves[i].move);
  if (!result) {
    console.log(`ERROR at move ${i+1}: ${game.moves[i].move}`);
    process.exit(1);
  }
}

console.log(`Position after move 17 (${game.moves[16].move}):`);
console.log(`FEN: ${chess.fen()}`);
console.log(`Turn: ${chess.turn() === 'w' ? 'White' : 'Black'}`);
console.log(`\nLegal moves:`);
const legalMoves = chess.moves();
console.log(legalMoves.slice(0, 30).join(', '));
console.log(`\nAttempting move 18: ${game.moves[17].move}`);
const result = chess.move(game.moves[17].move);
if (!result) {
  console.log(`\nERROR: Invalid move: ${game.moves[17].move}`);
} else {
  console.log(`Move successful!`);
  console.log(`Position after move 18: ${chess.fen()}`);
  console.log(`Turn: ${chess.turn() === 'w' ? 'White' : 'Black'}`);
}
