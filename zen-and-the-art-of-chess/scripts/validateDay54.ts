import { allInstructiveGames } from '../src/data/instructiveGames/index.ts';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.dayNumber === 54);

if (!game) {
  console.error('Game 54 not found!');
  process.exit(1);
}

console.log(`Validating Game 54: ${game.title}`);
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
  } catch (e: any) {
    console.error(`❌ Error at move ${i + 1}: ${move.move}`);
    console.error(`   ${e.message}`);
    errors++;
    break;
  }
}

if (errors === 0) {
  console.log(`✅ Game 54 is valid! All ${game.moves.length} moves are legal.`);
} else {
  console.log(`\n❌ Game 54 has ${errors} error(s).`);
  process.exit(1);
}

