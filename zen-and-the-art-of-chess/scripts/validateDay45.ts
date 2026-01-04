import { allInstructiveGames } from '../src/data/instructiveGames/index.ts';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.id === 'alekhine-bogoljubov-wc' && g.dayNumber === 45);
if (!game) {
  console.log('Game not found');
  process.exit(1);
}

const chess = new Chess();
let moveCount = 0;

for (let i = 0; i < game.moves.length; i++) {
  const result = chess.move(game.moves[i].move);
  if (!result) {
    console.log(`ERROR at move ${i+1}: ${game.moves[i].move}`);
    console.log(`FEN: ${chess.fen()}`);
    process.exit(1);
  }
  moveCount++;
}

console.log(`Day 45 validated successfully! ${moveCount} moves`);
console.log(`Final position: ${chess.fen()}`);
console.log(`Is checkmate: ${chess.isCheckmate()}`);




