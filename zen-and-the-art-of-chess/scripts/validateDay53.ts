import { allInstructiveGames } from '../src/data/instructiveGames/index.ts';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.dayNumber === 53);

if (!game) {
  console.error('Game 53 not found!');
  process.exit(1);
}

console.log(`Validating Game 53: ${game.title}`);
console.log(`${game.white} vs ${game.black} (${game.year})\n`);

const chess = new Chess();
let errors = 0;

for (let i = 0; i < game.moves.length; i++) {
  const move = game.moves[i];
  try {
    const result = chess.move(move.move);
    if (!result) {
      console.error(`❌ Invalid move at index ${i} (move ${i + 1}): ${move.move}`);
      console.error(`   Position: ${chess.fen()}`);
      console.error(`   Legal moves: ${chess.moves().slice(0, 10).join(', ')}`);
      errors++;
      break;
    }
    // Check FEN matches (first 4 parts)
    const actualFen = chess.fen().split(' ').slice(0, 4).join(' ');
    const storedFen = move.fen.split(' ').slice(0, 4).join(' ');
    if (actualFen !== storedFen) {
      console.warn(`⚠️  FEN mismatch at move ${i + 1}:`);
      console.warn(`   Stored: ${move.fen}`);
      console.warn(`   Actual: ${chess.fen()}`);
    }
  } catch (e: any) {
    console.error(`❌ Error at move ${i + 1}: ${move.move}`);
    console.error(`   ${e.message}`);
    errors++;
    break;
  }
}

if (errors === 0) {
  console.log(`✅ Game 53 is valid! All ${game.moves.length} moves are legal.`);
} else {
  console.log(`\n❌ Game 53 has ${errors} error(s).`);
  process.exit(1);
}

