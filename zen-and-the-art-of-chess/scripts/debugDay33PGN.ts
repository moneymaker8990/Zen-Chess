import { Chess } from 'chess.js';

// Debug the PGN to find where it goes wrong
const pgnMoves = `d4 d5 Nf3 Nf6 c4 e6 Nc3 c5 cxd5 Nxd5 e4 Nxc3 bxc3 cxd4 cxd4 Bb4+ Bd2 Qa5 Rb1 Bxd2+ Qxd2 Qxd2+ Kxd2 O-O Bd3 a6 Rhc1 b5 Rc7 Nd7 Ke3 Nf6 Ne5 Rd8 g4 h6 f4 Nd7 Nc6 Re8 e5 Nb6 Be4 Nc4+ Kd3 Kf8 a4 Nb6 a5 Nd5 Bxd5 exd5 f5 h5 h3 hxg4 hxg4 g6 Rf1 gxf5 gxf5 Kg7 e6 Kf6 Rxf7+ Kg5 Rg1+ Kf4 Ne5 Bxe6 fxe6+`.split(' ');

const chess = new Chess();
console.log('Replaying PGN to find error...\n');

for (let i = 0; i < pgnMoves.length; i++) {
  const m = pgnMoves[i];
  const r = chess.move(m);
  if (!r) {
    console.log(`ERROR at move ${i+1} (${m}):`);
    console.log(`Current FEN: ${chess.fen()}`);
    console.log(`Legal moves: ${chess.moves().slice(0, 20).join(', ')}`);
    if (i > 0) {
      console.log(`Previous move was: ${pgnMoves[i-1]}`);
    }
    break;
  }
}

console.log(`\nAfter ${pgnMoves.length} moves, FEN: ${chess.fen()}`);
console.log(`Legal moves for Black: ${chess.moves().slice(0, 20).join(', ')}`);


