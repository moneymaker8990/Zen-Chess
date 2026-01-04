import { allInstructiveGames } from '../src/data/instructiveGames/index.ts';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.dayNumber === 54);
if (!game) process.exit(1);

const chess = new Chess();

// Play moves up to after Nc6
for (let i = 0; i < 25; i++) {
  const result = chess.move(game.moves[i].move);
  if (!result) {
    console.error(`Error at move ${i + 1}: ${game.moves[i].move}`);
    console.error(`Position: ${chess.fen()}`);
    console.error(`Legal moves: ${chess.moves().slice(0, 10).join(', ')}`);
    break;
  }
}

console.log(`Position after move 25 (Nc6):`);
console.log(chess.ascii());
console.log(`\nMove 26 should be: ${game.moves[25]?.move}`);
console.log(`\nLegal moves for White: ${chess.moves().slice(0, 15).join(', ')}`);

