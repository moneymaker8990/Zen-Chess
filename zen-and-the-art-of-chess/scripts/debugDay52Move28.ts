import { Chess } from 'chess.js';

// PGN up to the failing move
const pgnMoves = `d4 Nf6 c4 g6 g3 Bg7 Bg2 O-O Nf3 d6 O-O Nbd7 Nc3 e5 e4 exd4 Nxd4 Re8 h3 a5 Re1 Nc5 Qc2 Ng4 Nf3 Ne5 Nxe5 Bxe5 Be3 Be6 b3 Qf6 Rac1 c6 f4 Bxc3 Qxc3 Qxc3 Rxc3 f5 e5 Ne4 Bxe4 fxe4 exd6 Bxh3 Bb6 a4 Kf2 h5 Ke3 Bf5 a3`.split(' ');

const chess = new Chess();
const moves: Array<{ move: string; fen: string }> = [];

console.log('Playing moves up to move 28...\n');

for (let i = 0; i < pgnMoves.length; i++) {
  const m = pgnMoves[i];
  const r = chess.move(m);
  if (r) {
    moves.push({ move: r.san, fen: chess.fen() });
    console.log(`Move ${i + 1}: ${r.san}`);
  } else {
    console.error(`Invalid move at ${i + 1}: ${m}`);
    break;
  }
}

console.log(`\nPosition after move ${moves.length}:`);
console.log(`FEN: ${chess.fen()}`);
console.log(`Turn: ${chess.turn() === 'w' ? 'White' : 'Black'}`);
console.log(`\nLegal moves for ${chess.turn() === 'w' ? 'White' : 'Black'}:`);
const legalMoves = chess.moves({ verbose: true });
legalMoves.forEach(m => {
  console.log(`  ${m.san} (from ${m.from} to ${m.to})`);
});

console.log(`\nLooking for king moves:`);
const kingMoves = legalMoves.filter(m => m.piece === 'k');
kingMoves.forEach(m => {
  console.log(`  ${m.san} (from ${m.from} to ${m.to})`);
});

