import { allInstructiveGames } from '../src/data/instructiveGames/index.ts';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.dayNumber === 53);
if (!game) process.exit(1);

const chess = new Chess();

// Play moves up to move 31
for (let i = 0; i < 30; i++) {
  const result = chess.move(game.moves[i].move);
  if (!result) {
    console.error(`Error at move ${i + 1}: ${game.moves[i].move}`);
    break;
  }
}

console.log(`Position before move 31:`);
console.log(chess.ascii());
console.log(`\nMove 30 was: ${game.moves[29].move}`);
console.log(`Move 31 should be: ${game.moves[30].move}`);
console.log(`\nLegal moves: ${chess.moves().join(', ')}`);

