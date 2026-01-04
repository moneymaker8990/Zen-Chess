import { allInstructiveGames } from '../src/data/instructiveGames/index.ts';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.id === 'rubinstein-schlechter' && g.dayNumber === 33);
if (!game) {
  console.log('Game not found');
  process.exit(1);
}

const chess = new Chess();
console.log(`Day 33: ${game.white} vs ${game.black}, ${game.year}`);
console.log(`First 15 moves: ${game.moves.slice(0, 15).map(m => m.move).join(' ')}\n`);

for (let i = 0; i < game.moves.length; i++) {
  const result = chess.move(game.moves[i].move);
  if (!result) {
    console.log(`ERROR at move ${i+1}: ${game.moves[i].move}`);
    console.log(`Current FEN: ${chess.fen()}`);
    console.log(`Legal moves: ${chess.moves().slice(0, 15).join(', ')}`);
    break;
  }
  if (i === 23) { // This corresponds to the 24th move (0-indexed)
    console.log(`After move 24 (${game.moves[23].move}):`);
    console.log(`FEN: ${chess.fen()}`);
    console.log(`Legal moves: ${chess.moves().slice(0, 15).join(', ')}\n`);
  }
}


