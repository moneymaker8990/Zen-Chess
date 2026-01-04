import { Chess } from 'chess.js';

const chess = new Chess();

// Play moves up to after Qf3 Qb7
const moves = `d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5 Bd2 Bxc3 Bxc3 Nc6 O-O a6 dxc5 Bd7 Qe2 b5 cxb5 axb5 Rfc1 b4 a4 Qb6 Ne5 Nxe5 Bxe5 Rfd8 Qf3 Qb7`.split(' ');

for (const m of moves) {
  const r = chess.move(m);
  if (!r) {
    console.error(`Error at: ${m}`);
    break;
  }
}

console.log(`Position before Rc7:`);
console.log(chess.ascii());
console.log(`\nFEN: ${chess.fen()}`);
console.log(`Turn: ${chess.turn() === 'w' ? 'White' : 'Black'}`);
console.log(`\nLegal moves for White: ${chess.moves().join(', ')}`);

