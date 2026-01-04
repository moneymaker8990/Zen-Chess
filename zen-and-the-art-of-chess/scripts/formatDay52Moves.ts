import { Chess } from 'chess.js';

// Correct PGN for Bronstein vs Botvinnik 1951 World Championship Game 11
const pgnMoves = `d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 h6 Bh4 b6 cxd5 Nxd5 Bxe7 Qxe7 Nxd5 exd5 Rc1 Be6 Qa4 c5 Qa3 Rc8 Bb5 a6 dxc5 bxc5 O-O Ra7 Be2 Nd7 Nd4 Qf8 Nxe6 fxe6 e4 d4 f4 Qe7 e5 Rb8 Bc4 Kh8 Qh3 Nf8 b3 a5 f5 exf5 Rxf5 Nh7 Rcf1 Rf8 Qg3 Raa8 h4 Rxf5 Rxf5 Rf8 Rxf8+ Nxf8 Qf4 Ng6 Qf5 Nf8 h5 Nh7 Bd3 Nf8 Kf2 Kg8 Bc4+ Kh8 Ke2 Nh7 Kd3 Ng5 Qc8+`.split(' ');

const chess = new Chess();
const moves: Array<{ move: string; fen: string; comment?: string; isKeyMove?: boolean }> = [];

// Key move indices (approximate based on game flow)
const keyMoves = new Set([3, 4, 6, 7, 12, 19, 20, 21, 22, 23, 24, 26, 27, 28, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80]);

for (let i = 0; i < pgnMoves.length; i++) {
  const m = pgnMoves[i];
  const r = chess.move(m);
  if (r) {
    let comment = '';
    if (i === 0) comment = 'Bronstein opens with the Queen\'s Gambit.';
    else if (i === 1) comment = 'Botvinnik responds with the Queen\'s Gambit Declined.';
    else if (i === 3) comment = 'The Queen\'s Gambit Declined.';
    else if (i === 6) comment = 'The bishop pins the knight.';
    else if (i === 7) comment = 'Developing the bishop.';
    else if (i === 9) comment = 'Castling to safety.';
    else if (i === 11) comment = 'Challenging the bishop.';
    else if (i === 12) comment = 'The bishop retreats.';
    else if (i === 19) comment = 'The knight centralizes, attacking!';
    else if (i === 20) comment = 'Striking at the center!';
    else if (i === 21) comment = 'Pushing the pawn, preparing the attack!';
    else if (i === 22) comment = 'The queen repositions.';
    else if (i === 23) comment = 'The bishop develops to an active square.';
    else if (i === 24) comment = 'The king moves to safety.';
    else if (i === 25) comment = 'The queen attacks!';
    else if (i === 26) comment = 'The knight retreats.';
    else if (i === 27) comment = 'Pushing the pawn, gaining space.';
    else if (i === 28) comment = 'Taking the pawn!';
    else if (i === 29) comment = 'Recapturing.';
    else if (i === 30) comment = 'The rook attacks!';
    else if (i === 31) comment = 'The rook defends.';
    else if (i === 32) comment = 'Exchanging rooks.';
    else if (i === 33) comment = 'Recapturing.';
    else if (i === 34) comment = 'The queen centralizes.';
    else if (i === 35) comment = 'The knight repositions.';
    else if (i === 36) comment = 'The queen attacks!';
    else if (i === 37) comment = 'The knight repositions.';
    else if (i === 38) comment = 'Pushing the pawn!';
    else if (i === 39) comment = 'The knight repositions.';
    else if (i === 40) comment = 'The bishop repositions.';
    else if (i === 41) comment = 'The knight repositions.';
    else if (i === 42) comment = 'The king centralizes.';
    else if (i === 43) comment = 'The king moves.';
    else if (i === 44) comment = 'Check!';
    else if (i === 45) comment = 'The king moves.';
    else if (i === 46) comment = 'The king centralizes.';
    else if (i === 47) comment = 'The knight repositions.';
    else if (i === 48) comment = 'The king centralizes further.';
    else if (i === 49) comment = 'The knight repositions.';
    else if (i === 50) comment = 'Check! The queen delivers the final blow!';
    else comment = '';
    
    moves.push({
      move: r.san,
      fen: chess.fen(),
      comment: comment || undefined,
      isKeyMove: keyMoves.has(i + 1),
    });
  } else {
    console.error(`Invalid move: ${m} at position ${i + 1}`);
    break;
  }
}

// Format output for games.ts
console.log('    moves: [');
moves.forEach((m, i) => {
  const parts = [`      { move: '${m.move}'`, `fen: '${m.fen}'`];
  if (m.comment) parts.push(`comment: '${m.comment}'`);
  if (m.isKeyMove) parts.push('isKeyMove: true');
  if (i === moves.length - 1) {
    parts.push(`evaluation: '1-0'`);
  }
  console.log(`${parts.join(', ')},`);
});
console.log('    ],');

