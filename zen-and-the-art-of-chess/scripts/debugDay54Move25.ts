import { allInstructiveGames } from '../src/data/instructiveGames/index.ts';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.dayNumber === 54);
if (!game) process.exit(1);

const chess = new Chess();

// Play moves up to move 25
for (let i = 0; i < 24; i++) {
  const result = chess.move(game.moves[i].move);
  if (!result) {
    console.error(`Error at move ${i + 1}: ${game.moves[i].move}`);
    break;
  }
}

console.log(`Position before move 25:`);
console.log(chess.ascii());
console.log(`\nMove 24 was: ${game.moves[23].move}`);
console.log(`Move 25 should be: ${game.moves[24].move}`);
console.log(`\nLegal moves: ${chess.moves().join(', ')}`);

