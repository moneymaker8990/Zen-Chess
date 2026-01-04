import { Chess } from 'chess.js';

// Correct PGN for Botvinnik vs Keres 1948 World Championship Round 10
// Nimzo-Indian Defense: Saemisch Variation - Botvinnik wins
const pgnMoves = `d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O a3 Bxc3+ bxc3 c5 Bd3 Nc6 Ne2 b6 e4 Ne8 O-O Ba6 f4 f5 exf5 exf5 dxc5 bxc5 Be3 d6 Ng3 g6 Re1 Na5 Bf2 Ng7 Be2 Bxc4 Bf3 Rb8 Bd5+ Kh8 Bxc4 Nxc4 Qd5 Nb6 Qc6 Rc8 Qb5 Nd5 Qc4 Nb6 Qa6 Qc7 Rad1 Rfe8 Rxe8+ Rxe8 a4 Ne6 a5 Nd7 Rxd6 Nxf4 Qb5 Re7 Rc6 Qe5 Rc8+ Kg7 Qc4 Ne6 h3 h5 Nf1 f4 Nd2 g5 Nf3 Qf5 Ra8 g4 hxg4 hxg4 Nh4 Qb1+ Qf1 Qxf1+ Kxf1 Kf6 Rxa7 Ne5 Rxe7 Kxe7 a6 Nc6 Nf5+ Kd7 Nh6 g3 Bg1 Kc7 Ke2 Kb6 Kf3 Kxa6 Ke4 Kb5 Kd5 Ng5 Bxc5 f3 gxf3 Nxf3 Nf5 g2 Nd6+ Ka4 Kxc6 g1=Q Bxg1 Nxg1 c4 Nf3 Kd5 Kb4 c5 Ng5 c6 Nh7 c7 Nf6+ Ke6 Ne8 Nxe8 Kc5 c8=Q+ Kd4 Qc6 Ke3 Qd5 Kf4 Qe5+ Kf3 Kf5 Kf2 Qe4 Kg3 Qf4+ Kg2 Kg4 Kg1 Qd2 Kf1 Kg3 Kg1 Qg2#`.split(' ');

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
