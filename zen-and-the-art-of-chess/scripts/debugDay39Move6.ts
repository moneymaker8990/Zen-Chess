import { allInstructiveGames } from '../src/data/instructiveGames/index.ts';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.id === 'gruenfeld-alekhine' && g.dayNumber === 39);
if (!game) {
  console.log('Game not found');
  process.exit(1);
}

const chess = new Chess();
console.log('Replaying moves up to move 6...\n');

for (let i = 0; i < 5; i++) {
  const result = chess.move(game.moves[i].move);
  if (!result) {
    console.log(`ERROR at move ${i+1}: ${game.moves[i].move}`);
    process.exit(1);
  }
  console.log(`Move ${i+1}: ${game.moves[i].move}`);
}

console.log(`\nPosition after move 5 (${game.moves[4].move}):`);
console.log(`FEN: ${chess.fen()}`);
console.log(`\nLegal moves for Black:`);
const legalMoves = chess.moves();
console.log(legalMoves.slice(0, 20).join(', '));
console.log(`\nAttempting move 6: ${game.moves[5].move}`);
const result = chess.move(game.moves[5].move);
if (!result) {
  console.log(`\nERROR: Invalid move: ${game.moves[5].move}`);
} else {
  console.log(`Move successful!`);
}
