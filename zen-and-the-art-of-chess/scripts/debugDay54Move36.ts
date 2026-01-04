import { allInstructiveGames } from '../src/data/instructiveGames/index.ts';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.dayNumber === 54);
if (!game) process.exit(1);

const chess = new Chess();

// Play moves up to move 36 (index 35)
for (let i = 0; i < 35; i++) {
  const result = chess.move(game.moves[i].move);
  if (!result) {
    console.error(`Error at move ${i + 1}: ${game.moves[i].move}`);
    break;
  }
}

console.log(`Position before move 36:`);
console.log(chess.ascii());
console.log(`\nMove 35 was: ${game.moves[34].move}`);
console.log(`Move 36 should be: ${game.moves[35].move}`);
console.log(`\nLegal moves: ${chess.moves().join(', ')}`);
