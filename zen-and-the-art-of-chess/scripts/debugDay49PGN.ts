import { Chess } from 'chess.js';

// Correct PGN for Euwe vs Keres 1940 Netherlands Match Game 9
const pgnMoves = `d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 d5 Ne5 c6 cxd5 cxd5 Bf4 a6 Rc1 b5 Qb3 Nc6 Nxc6 Bxc6 Rfd1 Qd7 Be5 Rfc8 Bxf6 Bxf6 e4 dxe4 Nxe4 Bxe4 Bxe4 Rxc1 Rxc1 Rd8 d5 exd5 Rd1 d4 Qd3 Qxd3`.split(' ');

const chess = new Chess();
console.log('Replaying moves up to Qxd3...\n');

for (let i = 0; i < pgnMoves.length - 1; i++) {
  const r = chess.move(pgnMoves[i]);
  if (!r) {
    console.error(`Invalid move at ${i+1}: ${pgnMoves[i]}`);
    console.error(`FEN: ${chess.fen()}`);
    break;
  }
}

console.log(`Position before Qxd3:`);
console.log(`FEN: ${chess.fen()}`);
console.log(`Turn: ${chess.turn() === 'w' ? 'White' : 'Black'}`);
console.log(`\nLegal moves:`);
const legalMoves = chess.moves();
console.log(legalMoves.slice(0, 30).join(', '));
console.log(`\nAttempting: Qxd3`);
const result = chess.move('Qxd3');
if (!result) {
  console.log(`\nERROR: Invalid move`);
  console.log(`\nSimilar moves:`);
  const similar = legalMoves.filter(m => m.includes('d3') || m.includes('Q'));
  console.log(similar.join(', '));
}





