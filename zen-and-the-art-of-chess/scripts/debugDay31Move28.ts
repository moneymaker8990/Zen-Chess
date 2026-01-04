import { allInstructiveGames } from '../src/data/instructiveGames/index.ts';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.id === 'capablanca-lasker-wc' && g.dayNumber === 31);
if (!game) {
  console.log('Game not found');
  process.exit(1);
}

const chess = new Chess();
console.log(`Day 31: ${game.white} vs ${game.black}, ${game.year}`);
console.log(`First 10 moves: ${game.moves.slice(0, 10).map(m => m.move).join(' ')}\n`);

for (let i = 0; i < game.moves.length; i++) {
  const result = chess.move(game.moves[i].move);
  if (!result) {
    console.log(`ERROR at move ${i+1}: ${game.moves[i].move}`);
    console.log(`Current FEN: ${chess.fen()}`);
    console.log(`Legal moves: ${chess.moves().slice(0, 10).join(', ')}`);
    break;
  }
  if (i === 26) {
    console.log(`After move 27 (${game.moves[26].move}):`);
    console.log(`FEN: ${chess.fen()}`);
    console.log(`Legal moves: ${chess.moves().slice(0, 15).join(', ')}\n`);
  }
}


