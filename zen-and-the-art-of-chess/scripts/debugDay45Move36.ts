import { allInstructiveGames } from '../src/data/instructiveGames/index.ts';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.id === 'alekhine-bogoljubov-wc' && g.dayNumber === 45);
if (!game) {
  console.log('Game not found');
  process.exit(1);
}

const chess = new Chess();
console.log('Replaying moves up to move 36...\n');

for (let i = 0; i < 35; i++) {
  const result = chess.move(game.moves[i].move);
  if (!result) {
    console.log(`ERROR at move ${i+1}: ${game.moves[i].move}`);
    process.exit(1);
  }
}

console.log(`Position after move 35 (${game.moves[34].move}):`);
console.log(`FEN: ${chess.fen()}`);
console.log(`\nLegal moves for White:`);
const legalMoves = chess.moves();
console.log(legalMoves.slice(0, 30).join(', '));
console.log(`\nAttempting move 36: ${game.moves[35].move}`);
const result = chess.move(game.moves[35].move);
if (!result) {
  console.log(`\nERROR: Invalid move: ${game.moves[35].move}`);
  console.log(`\nPossible alternatives:`);
  const similar = legalMoves.filter(m => m.includes('f5') || m.includes('Q'));
  console.log(similar.join(', '));
} else {
  console.log(`Move successful!`);
}
