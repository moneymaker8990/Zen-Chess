// Sicilian Defense Lines - Target: 45+ (Chessreps has 38)
import type { OpeningLine } from './index';

export const sicilianLines: OpeningLine[] = [
  // NAJDORF VARIATION
  { id: 'sic-1', name: 'Sicilian Defense', variation: 'Najdorf, English Attack', eco: 'B90', moves: ['e4','c5','Nf3','d6','d4','cxd4','Nxd4','Nf6','Nc3','a6','Be3','e5','Nb3','Be6','f3','Be7','Qd2','O-O','O-O-O','Nbd7'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'English Attack - opposite side castling leads to mutual attacks.', keyIdeas: ['g4-g5 attack', 'b5 counter', 'Race to attack'], difficulty: 5, category: 'e4', side: 'black' },
  { id: 'sic-2', name: 'Sicilian Defense', variation: 'Najdorf, 6.Bg5', eco: 'B96', moves: ['e4','c5','Nf3','d6','d4','cxd4','Nxd4','Nf6','Nc3','a6','Bg5','e6','f4','Be7','Qf3','Qc7','O-O-O','Nbd7'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Classical Bg5 attack. Sharp and critical.', keyIdeas: ['Kingside attack', 'e5 break', 'Tactical shots'], difficulty: 5, category: 'e4', side: 'black' },
  { id: 'sic-3', name: 'Sicilian Defense', variation: 'Najdorf, 6.Be2', eco: 'B92', moves: ['e4','c5','Nf3','d6','d4','cxd4','Nxd4','Nf6','Nc3','a6','Be2','e5','Nb3','Be7','O-O','O-O','Be3','Be6'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Quiet Be2 - solid positional play.', keyIdeas: ['f4 ideas', 'Central control', 'Slow buildup'], difficulty: 3, category: 'e4', side: 'black' },
  { id: 'sic-4', name: 'Sicilian Defense', variation: 'Najdorf, Poisoned Pawn', eco: 'B97', moves: ['e4','c5','Nf3','d6','d4','cxd4','Nxd4','Nf6','Nc3','a6','Bg5','e6','f4','Qb6','Qd2','Qxb2','Rb1','Qa3'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'The famous Poisoned Pawn. High stakes!', keyIdeas: ['Material vs attack', 'King safety', 'Precise defense'], difficulty: 5, category: 'e4', side: 'black' },
  { id: 'sic-5', name: 'Sicilian Defense', variation: 'Najdorf, 6.Bc4', eco: 'B90', moves: ['e4','c5','Nf3','d6','d4','cxd4','Nxd4','Nf6','Nc3','a6','Bc4','e6','Bb3','b5','O-O','Be7','Qf3','Qc7'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Sozin-style Bc4 vs Najdorf.', keyIdeas: ['f4-f5 ideas', 'Kingside attack', 'e6 pressure'], difficulty: 4, category: 'e4', side: 'black' },
  { id: 'sic-6', name: 'Sicilian Defense', variation: 'Najdorf, Adams Attack', eco: 'B90', moves: ['e4','c5','Nf3','d6','d4','cxd4','Nxd4','Nf6','Nc3','a6','h3','e5','Nde2','Be7','g4','b5','Bg2'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Adams Attack with h3-g4.', keyIdeas: ['Kingside pawn storm', 'g5 ideas', 'Long-term attack'], difficulty: 4, category: 'e4', side: 'black' },
  
  // DRAGON VARIATION
  { id: 'sic-7', name: 'Sicilian Defense', variation: 'Dragon, Yugoslav Attack', eco: 'B77', moves: ['e4','c5','Nf3','d6','d4','cxd4','Nxd4','Nf6','Nc3','g6','Be3','Bg7','f3','O-O','Qd2','Nc6','Bc4','Bd7','O-O-O','Rc8','Bb3','Ne5'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Yugoslav Attack main line. The ultimate battle!', keyIdeas: ['Opposite castling', 'h4-h5 vs Rxc3', 'Race attacks'], difficulty: 5, category: 'e4', side: 'black' },
  { id: 'sic-8', name: 'Sicilian Defense', variation: 'Dragon, Classical', eco: 'B72', moves: ['e4','c5','Nf3','d6','d4','cxd4','Nxd4','Nf6','Nc3','g6','Be2','Bg7','O-O','O-O','Be3','Nc6','Nb3','Be6'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Classical Dragon - less sharp but solid.', keyIdeas: ['Central play', 'd5 ideas', 'Positional battle'], difficulty: 3, category: 'e4', side: 'black' },
  { id: 'sic-9', name: 'Sicilian Defense', variation: 'Dragon, Levenfish', eco: 'B71', moves: ['e4','c5','Nf3','d6','d4','cxd4','Nxd4','Nf6','Nc3','g6','f4','Bg7','Nf3','O-O','Bd3','Nc6','O-O','Bg4'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Levenfish Attack with f4.', keyIdeas: ['e5 push', 'f4-f5', 'Kingside play'], difficulty: 4, category: 'e4', side: 'black' },
  { id: 'sic-10', name: 'Sicilian Defense', variation: 'Accelerated Dragon', eco: 'B35', moves: ['e4','c5','Nf3','Nc6','d4','cxd4','Nxd4','g6','Nc3','Bg7','Be3','Nf6','Bc4','O-O','Bb3','d6','f3','Bd7'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Accelerated Dragon - skip d6.', keyIdeas: ['d5 ideas', 'Maroczy bind', 'Flexible structure'], difficulty: 4, category: 'e4', side: 'black' },
  { id: 'sic-11', name: 'Sicilian Defense', variation: 'Hyper-Accelerated Dragon', eco: 'B27', moves: ['e4','c5','Nf3','g6','d4','cxd4','Nxd4','Bg7','Nc3','Nc6','Be3','Nf6','Bc4','O-O','Bb3','d6'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Fianchetto before Nc6.', keyIdeas: ['Early Bg7', 'd5 pressure', 'Flexible play'], difficulty: 3, category: 'e4', side: 'black' },
  
  // SVESHNIKOV VARIATION
  { id: 'sic-12', name: 'Sicilian Defense', variation: 'Sveshnikov, Main Line', eco: 'B33', moves: ['e4','c5','Nf3','Nc6','d4','cxd4','Nxd4','Nf6','Nc3','e5','Ndb5','d6','Bg5','a6','Na3','b5','Nd5','Be7','Bxf6','Bxf6','c3'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Critical Sveshnikov mainline.', keyIdeas: ['d5 outpost', 'f5 counter', 'Piece activity'], difficulty: 5, category: 'e4', side: 'black' },
  { id: 'sic-13', name: 'Sicilian Defense', variation: 'Sveshnikov, Novosibirsk', eco: 'B33', moves: ['e4','c5','Nf3','Nc6','d4','cxd4','Nxd4','Nf6','Nc3','e5','Ndb5','d6','Bg5','a6','Na3','b5','Bxf6','gxf6','Nd5','f5'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Novosibirsk variation with gxf6.', keyIdeas: ['Open g-file', 'f5 break', 'Dynamic play'], difficulty: 5, category: 'e4', side: 'black' },
  { id: 'sic-14', name: 'Sicilian Defense', variation: 'Sveshnikov, 9.Bxf6', eco: 'B33', moves: ['e4','c5','Nf3','Nc6','d4','cxd4','Nxd4','Nf6','Nc3','e5','Ndb5','d6','Bg5','a6','Na3','b5','Bxf6','Qxf6','Nd5','Qd8','c4'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: '9.Bxf6 and c4 setup.', keyIdeas: ['c4 pressure', 'Nd5 fortress', 'Positional squeeze'], difficulty: 4, category: 'e4', side: 'black' },
  
  // SCHEVENINGEN VARIATION
  { id: 'sic-15', name: 'Sicilian Defense', variation: 'Scheveningen, Classical', eco: 'B84', moves: ['e4','c5','Nf3','d6','d4','cxd4','Nxd4','Nf6','Nc3','e6','Be2','Be7','O-O','O-O','f4','Nc6','Be3','a6'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Classical Scheveningen setup.', keyIdeas: ['e5 break', 'Keres Attack', 'Central tension'], difficulty: 4, category: 'e4', side: 'black' },
  { id: 'sic-16', name: 'Sicilian Defense', variation: 'Scheveningen, Keres Attack', eco: 'B81', moves: ['e4','c5','Nf3','d6','d4','cxd4','Nxd4','Nf6','Nc3','e6','g4','h6','h4','Nc6','Rg1','d5'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Keres Attack - aggressive g4!', keyIdeas: ['Kingside attack', 'g5 push', 'Tactical play'], difficulty: 5, category: 'e4', side: 'black' },
  { id: 'sic-17', name: 'Sicilian Defense', variation: 'Scheveningen, English Attack', eco: 'B90', moves: ['e4','c5','Nf3','d6','d4','cxd4','Nxd4','Nf6','Nc3','e6','Be3','Be7','f3','O-O','Qd2','a6','O-O-O','Qc7','g4'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'English Attack vs Scheveningen.', keyIdeas: ['g4-g5 storm', 'h4-h5', 'Opposite castling'], difficulty: 5, category: 'e4', side: 'black' },
  
  // TAIMANOV VARIATION
  { id: 'sic-18', name: 'Sicilian Defense', variation: 'Taimanov, Main Line', eco: 'B48', moves: ['e4','c5','Nf3','Nc6','d4','cxd4','Nxd4','e6','Nc3','Qc7','Be3','a6','Qd2','Nf6','O-O-O','Bb4','f3','Ne5'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Main Taimanov with Qc7.', keyIdeas: ['b5 expansion', 'Flexible structure', 'Central play'], difficulty: 4, category: 'e4', side: 'black' },
  { id: 'sic-19', name: 'Sicilian Defense', variation: 'Taimanov, English Attack', eco: 'B48', moves: ['e4','c5','Nf3','Nc6','d4','cxd4','Nxd4','e6','Nc3','Qc7','Be3','a6','Qd2','Nf6','f3','b5','g4','b4','Na4'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'English Attack vs Taimanov.', keyIdeas: ['g4-g5 attack', 'Na4 outpost', 'Kingside storm'], difficulty: 5, category: 'e4', side: 'black' },
  { id: 'sic-20', name: 'Sicilian Defense', variation: 'Taimanov, 6.Be2', eco: 'B47', moves: ['e4','c5','Nf3','Nc6','d4','cxd4','Nxd4','e6','Nc3','Qc7','Be2','a6','O-O','Nf6','Be3','Be7','f4','d6'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Quiet Be2 vs Taimanov.', keyIdeas: ['f4-f5 ideas', 'Central control', 'Slow buildup'], difficulty: 3, category: 'e4', side: 'black' },
  
  // KAN VARIATION
  { id: 'sic-21', name: 'Sicilian Defense', variation: 'Kan, Main Line', eco: 'B42', moves: ['e4','c5','Nf3','e6','d4','cxd4','Nxd4','a6','Bd3','Nf6','O-O','Qc7','Qe2','d6','c4','g6','Nc3','Bg7'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Hedgehog structure from the Kan.', keyIdeas: ['b5 break', 'Flexible pawns', 'Hedgehog setup'], difficulty: 3, category: 'e4', side: 'black' },
  { id: 'sic-22', name: 'Sicilian Defense', variation: 'Kan, Polugaevsky', eco: 'B43', moves: ['e4','c5','Nf3','e6','d4','cxd4','Nxd4','a6','Nc3','Qc7','Bd3','Nf6','O-O','Bc5','Nb3','Be7','f4'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Polugaevsky variation with f4.', keyIdeas: ['e5 push', 'Kingside attack', 'Central play'], difficulty: 4, category: 'e4', side: 'black' },
  
  // CLASSICAL VARIATION
  { id: 'sic-23', name: 'Sicilian Defense', variation: 'Classical, Richter-Rauzer', eco: 'B60', moves: ['e4','c5','Nf3','d6','d4','cxd4','Nxd4','Nf6','Nc3','Nc6','Bg5','e6','Qd2','Be7','O-O-O','O-O','f4','Nxd4','Qxd4','Qa5'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Richter-Rauzer Attack. Sharp!', keyIdeas: ['f4-f5', 'e5 push', 'Opposite castling'], difficulty: 5, category: 'e4', side: 'black' },
  { id: 'sic-24', name: 'Sicilian Defense', variation: 'Classical, Sozin Attack', eco: 'B57', moves: ['e4','c5','Nf3','d6','d4','cxd4','Nxd4','Nf6','Nc3','Nc6','Bc4','e6','Be3','Be7','Qe2','O-O','O-O-O','a6'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Sozin Attack with Bc4.', keyIdeas: ['Bxe6 ideas', 'f4-f5', 'Kingside attack'], difficulty: 4, category: 'e4', side: 'black' },
  { id: 'sic-25', name: 'Sicilian Defense', variation: 'Classical, Boleslavsky', eco: 'B58', moves: ['e4','c5','Nf3','d6','d4','cxd4','Nxd4','Nf6','Nc3','Nc6','Be2','e5','Nb3','Be7','O-O','O-O','Bg5','Be6'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Boleslavsky variation with e5.', keyIdeas: ['Central control', 'd5 square', 'Piece activity'], difficulty: 3, category: 'e4', side: 'black' },
  
  // ALAPIN VARIATION
  { id: 'sic-26', name: 'Sicilian Defense', variation: 'Alapin, Main Line', eco: 'B22', moves: ['e4','c5','c3','Nf6','e5','Nd5','d4','cxd4','Nf3','Nc6','cxd4','d6','Bc4','Nb6','Bb3','dxe5','dxe5','Qxd1+','Kxd1'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Main Alapin leading to endgame.', keyIdeas: ['Pawn structure', 'Piece activity', 'Endgame play'], difficulty: 2, category: 'e4', side: 'black' },
  { id: 'sic-27', name: 'Sicilian Defense', variation: 'Alapin, 2...d5', eco: 'B22', moves: ['e4','c5','c3','d5','exd5','Qxd5','d4','Nf6','Nf3','e6','Be2','cxd4','cxd4','Nc6','Nc3','Qd6','O-O','Be7'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: '2...d5 counter to the Alapin.', keyIdeas: ['IQP play', 'Development', 'Central tension'], difficulty: 2, category: 'e4', side: 'black' },
  
  // GRAND PRIX ATTACK
  { id: 'sic-28', name: 'Sicilian Defense', variation: 'Grand Prix Attack', eco: 'B23', moves: ['e4','c5','Nc3','Nc6','f4','g6','Nf3','Bg7','Bb5','Nd4','O-O','Nxb5','Nxb5','d6','d3','a6','Na3'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Grand Prix Attack with f4.', keyIdeas: ['Kingside attack', 'f5 push', 'Piece activity'], difficulty: 3, category: 'e4', side: 'black' },
  { id: 'sic-29', name: 'Sicilian Defense', variation: 'Grand Prix, 3.f4', eco: 'B23', moves: ['e4','c5','f4','d5','exd5','Nf6','Bb5+','Bd7','Bxd7+','Qxd7','c4','e6','Qe2','Bd6','d3','O-O','Nf3'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Early f4 Grand Prix.', keyIdeas: ['Central pawns', 'd4 ideas', 'Piece development'], difficulty: 3, category: 'e4', side: 'black' },
  
  // CLOSED SICILIAN
  { id: 'sic-30', name: 'Sicilian Defense', variation: 'Closed Sicilian', eco: 'B25', moves: ['e4','c5','Nc3','Nc6','g3','g6','Bg2','Bg7','d3','d6','Be3','Rb8','Qd2','b5','Nge2','Nd4','O-O','e5'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Closed Sicilian - positional play.', keyIdeas: ['f4 ideas', 'Kingside play', 'Slow buildup'], difficulty: 2, category: 'e4', side: 'black' },
  { id: 'sic-31', name: 'Sicilian Defense', variation: 'Closed, Spassky', eco: 'B26', moves: ['e4','c5','Nc3','Nc6','g3','g6','Bg2','Bg7','d3','d6','f4','e6','Nf3','Nge7','O-O','O-O','Be3','Nd4'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Spassky system with f4.', keyIdeas: ['Kingside pressure', 'Nd4 outpost', 'Central control'], difficulty: 3, category: 'e4', side: 'black' },
  
  // ROSSOLIMO VARIATION
  { id: 'sic-32', name: 'Sicilian Defense', variation: 'Rossolimo, Main Line', eco: 'B31', moves: ['e4','c5','Nf3','Nc6','Bb5','g6','O-O','Bg7','Re1','e5','Bxc6','dxc6','d3','Ne7','a4','O-O','Na3'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Rossolimo with Bxc6.', keyIdeas: ['Pawn structure', 'a4-a5', 'Central play'], difficulty: 3, category: 'e4', side: 'black' },
  { id: 'sic-33', name: 'Sicilian Defense', variation: 'Rossolimo, 3...e6', eco: 'B30', moves: ['e4','c5','Nf3','Nc6','Bb5','e6','O-O','Nge7','d4','cxd4','Nxd4','a6','Be2','Nxd4','Qxd4','Nc6','Qd1'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Rossolimo with e6 setup.', keyIdeas: ['Development', 'd5 ideas', 'Central play'], difficulty: 2, category: 'e4', side: 'black' },
  
  // MOSCOW VARIATION
  { id: 'sic-34', name: 'Sicilian Defense', variation: 'Moscow, Main Line', eco: 'B52', moves: ['e4','c5','Nf3','d6','Bb5+','Bd7','Bxd7+','Qxd7','O-O','Nc6','c3','Nf6','Re1','e6','d4','cxd4','cxd4','d5'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Moscow variation with Bb5+.', keyIdeas: ['IQP play', 'Central tension', 'Piece activity'], difficulty: 3, category: 'e4', side: 'black' },
  { id: 'sic-35', name: 'Sicilian Defense', variation: 'Moscow, Nd7', eco: 'B51', moves: ['e4','c5','Nf3','d6','Bb5+','Nd7','d4','Nf6','Nc3','cxd4','Qxd4','e5','Qd3','h6','Be3','Be7','O-O-O'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Moscow with Nd7 block.', keyIdeas: ['Central tension', 'Piece development', 'd5 ideas'], difficulty: 3, category: 'e4', side: 'black' },
  
  // KALASHNIKOV VARIATION
  { id: 'sic-36', name: 'Sicilian Defense', variation: 'Kalashnikov', eco: 'B32', moves: ['e4','c5','Nf3','Nc6','d4','cxd4','Nxd4','e5','Nb5','d6','N1c3','a6','Na3','b5','Nd5','Nge7','c4'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Kalashnikov - Sveshnikov without a6.', keyIdeas: ['d5 control', 'b5 expansion', 'Piece play'], difficulty: 4, category: 'e4', side: 'black' },
  
  // FOUR KNIGHTS VARIATION
  { id: 'sic-37', name: 'Sicilian Defense', variation: 'Four Knights', eco: 'B45', moves: ['e4','c5','Nf3','e6','d4','cxd4','Nxd4','Nf6','Nc3','Nc6','Ndb5','Bb4','a3','Bxc3+','Nxc3','d5','exd5','exd5'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Four Knights Sicilian.', keyIdeas: ['IQP play', 'Piece activity', 'Central control'], difficulty: 3, category: 'e4', side: 'black' },
  
  // PIN VARIATION
  { id: 'sic-38', name: 'Sicilian Defense', variation: 'Pin Variation', eco: 'B40', moves: ['e4','c5','Nf3','e6','d4','cxd4','Nxd4','Nf6','Nc3','Bb4','e5','Nd5','Bd2','Nxc3','bxc3','Be7','Qg4','O-O','Bd3'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Pin variation with Bb4.', keyIdeas: ['e5 pawn', 'Kingside attack', 'Piece activity'], difficulty: 3, category: 'e4', side: 'black' },
  
  // PELIKAN VARIATION
  { id: 'sic-39', name: 'Sicilian Defense', variation: 'Pelikan, Chelyabinsk', eco: 'B33', moves: ['e4','c5','Nf3','Nc6','d4','cxd4','Nxd4','Nf6','Nc3','e5','Ndb5','d6','Bg5','a6','Na3','Be6','Nc4','Rc8'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Pelikan/Chelyabinsk with Be6.', keyIdeas: ['Nc4 pressure', 'b5 counter', 'Dynamic play'], difficulty: 4, category: 'e4', side: 'black' },
  
  // O'KELLY VARIATION
  { id: 'sic-40', name: 'Sicilian Defense', variation: "O'Kelly", eco: 'B28', moves: ['e4','c5','Nf3','a6','c3','d5','exd5','Qxd5','d4','Nf6','Be2','e6','O-O','Nc6','Be3','cxd4','cxd4'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: "O'Kelly with 2...a6.", keyIdeas: ['Flexible setup', 'IQP play', 'Development'], difficulty: 2, category: 'e4', side: 'black' },
  
  // WING GAMBIT
  { id: 'sic-41', name: 'Sicilian Defense', variation: 'Wing Gambit', eco: 'B20', moves: ['e4','c5','b4','cxb4','a3','d5','exd5','Qxd5','Nf3','e5','axb4','Bxb4','c3','Be7','Na3','Nf6'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Wing Gambit - pawn sacrifice for initiative.', keyIdeas: ['Development lead', 'Open lines', 'Initiative'], difficulty: 3, category: 'e4', side: 'black' },
  
  // SMITH-MORRA GAMBIT
  { id: 'sic-42', name: 'Sicilian Defense', variation: 'Smith-Morra Gambit', eco: 'B21', moves: ['e4','c5','d4','cxd4','c3','dxc3','Nxc3','Nc6','Nf3','d6','Bc4','e6','O-O','Nf6','Qe2','Be7','Rd1','O-O'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Smith-Morra Gambit accepted.', keyIdeas: ['Development lead', 'Open c-file', 'Piece activity'], difficulty: 3, category: 'e4', side: 'black' },
  { id: 'sic-43', name: 'Sicilian Defense', variation: 'Smith-Morra Declined', eco: 'B21', moves: ['e4','c5','d4','cxd4','c3','Nf6','e5','Nd5','cxd4','d6','Nf3','Nc6','Bc4','Nb6','Bb3','dxe5','dxe5'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Declining the Morra gambit.', keyIdeas: ['Solid defense', 'e5 pawn', 'Development'], difficulty: 2, category: 'e4', side: 'black' },
  
  // FRENCH VARIATION
  { id: 'sic-44', name: 'Sicilian Defense', variation: 'French Variation', eco: 'B40', moves: ['e4','c5','Nf3','e6','d3','Nc6','g3','d5','Nbd2','Bd6','Bg2','Nge7','O-O','O-O','Re1','b6'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'King\'s Indian Attack vs Sicilian.', keyIdeas: ['Slow buildup', 'e4-e5', 'Kingside play'], difficulty: 2, category: 'e4', side: 'black' },
  
  // PAULSEN VARIATION
  { id: 'sic-45', name: 'Sicilian Defense', variation: 'Paulsen, Main Line', eco: 'B46', moves: ['e4','c5','Nf3','e6','d4','cxd4','Nxd4','a6','Nc3','Qc7','Be2','Nf6','O-O','Bb4','Na4','Be7','Be3','d6'], fen: '8/8/8/8/8/8/8/8 w - - 0 1', description: 'Paulsen variation setup.', keyIdeas: ['b5 expansion', 'Flexible structure', 'Central play'], difficulty: 3, category: 'e4', side: 'black' },
];

export default sicilianLines;








