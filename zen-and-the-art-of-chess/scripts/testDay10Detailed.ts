import { Chess } from 'chess.js';
import { allInstructiveGames } from '../src/data/instructiveGames';

const game = allInstructiveGames.find(g => g.id === 'capablanca-tartakower')!;
const chess = new Chess();

console.log(`Testing Day 10: ${game.title}`);
console.log(`Total moves: ${game.moves.length}\n`);

for (let i = 0; i < Math.min(45, game.moves.length); i++) {
  const move = game.moves[i];
  try {
    const result = chess.move(move.move);
    if (!result) {
      console.log(`❌ Move ${i + 1} (${move.move}): Invalid move`);
      console.log(`   Position before: ${chess.fen()}`);
      console.log(`   Legal moves: ${chess.moves().slice(0, 15).join(', ')}`);
      break;
    }
    if (i >= 40 && i <= 45) {
      console.log(`Move ${i + 1}: ${move.move} - Position: ${chess.fen().substring(0, 50)}...`);
    }
  } catch (e) {
    console.log(`❌ Move ${i + 1} (${move.move}): Error - ${e}`);
    console.log(`   Position: ${chess.fen()}`);
    console.log(`   Legal moves: ${chess.moves().slice(0, 15).join(', ')}`);
    break;
  }
}


