import { allInstructiveGames } from '../src/data/instructiveGames/index.ts';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.id === 'gruenfeld-alekhine' && g.dayNumber === 39);
if (!game) {
  console.log('Game not found');
  process.exit(1);
}

const chess = new Chess();
console.log(`Validating Day 39 with ${game.moves.length} moves...\n`);

for (let i = 0; i < game.moves.length; i++) {
  const result = chess.move(game.moves[i].move);
  if (!result) {
    console.log(`ERROR at move ${i+1}: ${game.moves[i].move}`);
    console.log(`Current FEN: ${chess.fen()}`);
    console.log(`Legal moves: ${chess.moves().slice(0, 10).join(', ')}`);
    process.exit(1);
  }
  if (i < 10 || i >= game.moves.length - 5) {
    console.log(`Move ${i+1}: ${game.moves[i].move} - OK`);
  }
}

console.log(`\nDay 39 validated successfully! ${game.moves.length} moves`);
