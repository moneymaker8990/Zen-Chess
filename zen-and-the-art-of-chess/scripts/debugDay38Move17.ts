import { allInstructiveGames } from '../src/data/instructiveGames/index.ts';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.id === 'reti-bogoljubov' && g.dayNumber === 38);
if (!game) {
  console.log('Game not found');
  process.exit(1);
}

const chess = new Chess();
console.log(`Day 38: ${game.white} vs ${game.black}, ${game.year}`);
console.log(`First 18 moves: ${game.moves.slice(0, 18).map(m => m.move).join(' ')}\n`);

for (let i = 0; i < game.moves.length; i++) {
  const result = chess.move(game.moves[i].move);
  if (!result) {
    console.log(`ERROR at move ${i+1}: ${game.moves[i].move}`);
    console.log(`Current FEN: ${chess.fen()}`);
    console.log(`Legal moves: ${chess.moves().slice(0, 20).join(', ')}`);
    if (i > 0) {
      console.log(`Previous move was: ${game.moves[i-1].move}`);
    }
    break;
  }
  if (i === 16) { // This corresponds to the 17th move (0-indexed)
    console.log(`After move 17 (${game.moves[16].move}):`);
    console.log(`FEN: ${chess.fen()}`);
    console.log(`Legal moves: ${chess.moves().slice(0, 20).join(', ')}\n`);
  }
}
