import { allInstructiveGames } from '../src/data/instructiveGames';
import { Chess } from 'chess.js';

const game = allInstructiveGames.find(g => g.id === 'steinitz-bardeleben');
if (!game) {
  console.log('Game not found');
  process.exit(1);
}

// PGN from web search
const pgnMoves = `e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4 exd4 cxd4 Bb4+ Nc3 d5 exd5 Nxd5 O-O Be6 Bg5 Be7 Bxd5 Bxd5 Nxd5 Qxd5 Bxe7 Nxe7 Re1 f6 Qe2 Qd7 Rac1 c6 d5 cxd5 Nd4 Kf7 Ne6 Rhc8 Qg4 g6 Ng5+ Ke8 Rxe7+ Kf8 Rf7+ Kg8 Rg7+ Kh8 Rxh7+ Kg8 Rg7+ Kh8 Qh4+ Kxg7 Qh7+ Kf8 Qh8+ Ke7 Qg7+ Ke8 Qg8+ Ke7 Qf7+ Kd8 Qf8+ Qe8 Nf7+ Kd7 Qd6#`.split(' ');

console.log(`Stored game has ${game.moves.length} moves`);
console.log(`PGN has ${pgnMoves.length} moves\n`);

const chess = new Chess();
let storedErrors = 0;
let pgnErrors = 0;

// Test stored game
console.log('Testing stored game:');
for (let i = 0; i < game.moves.length; i++) {
  try {
    const result = chess.move(game.moves[i].move);
    if (!result) {
      console.log(`  MOVE_ERROR at move ${i+1}: ${game.moves[i].move}`);
      storedErrors++;
      break;
    }
  } catch (e) {
    console.log(`  MOVE_ERROR at move ${i+1}: ${game.moves[i].move} - ${e}`);
    storedErrors++;
    break;
  }
}

// Test PGN
chess.reset();
console.log('\nTesting PGN:');
for (let i = 0; i < pgnMoves.length; i++) {
  try {
    const result = chess.move(pgnMoves[i]);
    if (!result) {
      console.log(`  MOVE_ERROR at move ${i+1}: ${pgnMoves[i]}`);
      pgnErrors++;
      break;
    }
  } catch (e) {
    console.log(`  MOVE_ERROR at move ${i+1}: ${pgnMoves[i]} - ${e}`);
    pgnErrors++;
    break;
  }
}

console.log(`\nStored game: ${storedErrors === 0 ? 'VALID' : `${storedErrors} errors`}`);
console.log(`PGN: ${pgnErrors === 0 ? 'VALID' : `${pgnErrors} errors`}`);

if (storedErrors === 0 && pgnErrors === 0) {
  console.log('\nComparing move sequences:');
  const minMoves = Math.min(game.moves.length, pgnMoves.length);
  let differences = 0;
  chess.reset();
  for (let i = 0; i < minMoves; i++) {
    const storedMove = game.moves[i].move;
    const pgnMove = pgnMoves[i];
    if (storedMove !== pgnMove) {
      differences++;
      if (differences <= 5) {
        console.log(`  Move ${i+1}: Stored="${storedMove}" vs PGN="${pgnMove}"`);
      }
    }
    chess.move(storedMove);
  }
  if (differences > 5) {
    console.log(`  ... and ${differences - 5} more differences`);
  }
  console.log(`\nTotal differences: ${differences}`);
}


