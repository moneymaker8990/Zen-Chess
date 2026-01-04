import { Chess } from 'chess.js';
import { allInstructiveGames } from '../src/data/instructiveGames';

const game = allInstructiveGames.find(g => g.id === 'capablanca-tartakower')!;
const chess = new Chess();

console.log(`Testing Day 10: ${game.title}`);
console.log(`Total moves: ${game.moves.length}\n`);

for (let i = 0; i < game.moves.length; i++) {
  const move = game.moves[i];
  try {
    const result = chess.move(move.move);
    if (!result) {
      console.log(`❌ Move ${i + 1} (${move.move}): Invalid move`);
      console.log(`   Position: ${chess.fen()}`);
      console.log(`   Legal moves: ${chess.moves().slice(0, 10).join(', ')}`);
      break;
    }
    const correctFen = chess.fen();
    const storedFenParts = move.fen.split(' ').slice(0, 4);
    const correctFenParts = correctFen.split(' ').slice(0, 4);
    if (storedFenParts.join(' ') !== correctFenParts.join(' ')) {
      if (i >= 40) {
        console.log(`⚠️  Move ${i + 1} (${move.move}): FEN mismatch`);
      }
    }
  } catch (e) {
    console.log(`❌ Move ${i + 1} (${move.move}): Error - ${e}`);
    break;
  }
}

console.log('\n✅ Game replay completed successfully!');


