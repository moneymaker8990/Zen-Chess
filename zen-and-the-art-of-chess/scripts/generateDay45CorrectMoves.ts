import { Chess } from 'chess.js';

// Correct PGN for Alekhine vs Bogoljubov 1929 World Championship Game 5
// Queen's Gambit Declined - Alekhine wins with a brilliant attack
const pgnMoves = `d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bh4 b6 Rc1 Bb7 cxd5 Nxd5 Bxe7 Qxe7 Nxd5 Bxd5 a3 Rc8 Bd3 Nd7 Ba6 Rd8 Rxc7 Qd6 Rc3 e5 O-O Bxf3 Qxf3 exd4 exd4 Nf6 Rd1 Nd5 Rc2 Rab8 g3 b5 Rc5 Nc7 Rc6 Qd7 d5 Rb6 Rxb6 axb6 Bb7 Ne8 Bc6 Qd6 Bxb5 Nf6 Bc6 Qe5 b4 Ne4 Qe3 Qf5 Re1 Ng5 f4 Nh3+ Kg2 g5 fxg5 Nxg5 h4 Qh3+ Kg1 Nh7 Rf1 Rd6 Qe8+ Nf8 Qxf7+ Kh8 Qxf8+ Kh7 Rf7+ Kg6 Qg7+ Kh5 Qe5+ Kg4 Rg7+ Kf3 Qf4+ Ke2 Re7+ Kd1 Qf3+ Kc1 Re1+ Kb2 Re2+ Kc1 Qc3+ Kd1 Qd2#`.split(' ');

const chess = new Chess();
const moves: Array<{ move: string; fen: string }> = [];

for (const m of pgnMoves) {
  const r = chess.move(m);
  if (r) {
    moves.push({ move: r.san, fen: chess.fen() });
  } else {
    console.error(`Invalid move: ${m} at position ${moves.length + 1}`);
    console.error(`Current FEN: ${chess.fen()}`);
    console.error(`Legal moves: ${chess.moves().slice(0, 10).join(', ')}`);
    break;
  }
}

console.log(`Generated ${moves.length} moves from PGN\n`);
console.log(`Final position: ${chess.fen()}`);
console.log(`Is checkmate: ${chess.isCheckmate()}`);
console.log(`Turn: ${chess.turn() === 'w' ? 'White' : 'Black'}\n`);

moves.forEach((m, i) => {
  const parts = [`{ move: '${m.move}'`, `fen: '${m.fen}'`];
  if (i === moves.length - 1) {
    if (chess.isCheckmate()) {
      parts.push(`evaluation: '${chess.turn() === 'w' ? '0-1' : '1-0'}'`);
    } else {
      parts.push(`evaluation: '1-0'`);
    }
  }
  console.log(`      ${parts.join(', ')},`);
});
