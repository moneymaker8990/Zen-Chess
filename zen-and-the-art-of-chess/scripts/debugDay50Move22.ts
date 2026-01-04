import { allInstructiveGames } from '../src/data/instructiveGames/index.ts';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.id === 'smyslov-reshevsky' && g.dayNumber === 50);
if (!game) {
  console.log('Game not found');
  process.exit(1);
}

const chess = new Chess();
console.log('Replaying moves up to move 22...\n');

for (let i = 0; i < 21; i++) {
  const result = chess.move(game.moves[i].move);
  if (!result) {
    console.log(`ERROR at move ${i+1}: ${game.moves[i].move}`);
    process.exit(1);
  }
}

console.log(`Position after move 21 (${game.moves[20].move}):`);
console.log(`FEN: ${chess.fen()}`);
console.log(`Turn: ${chess.turn() === 'w' ? 'White' : 'Black'}`);
console.log(`\nLegal moves:`);
const legalMoves = chess.moves();
console.log(legalMoves.slice(0, 30).join(', '));
console.log(`\nAttempting move 22: ${game.moves[21].move}`);
const result = chess.move(game.moves[21].move);
if (!result) {
  console.log(`\nERROR: Invalid move: ${game.moves[21].move}`);
  console.log(`\nSimilar moves:`);
  const similar = legalMoves.filter(m => m.includes('d1') || m.includes('R'));
  console.log(similar.join(', '));
} else {
  console.log(`Move successful!`);
}





