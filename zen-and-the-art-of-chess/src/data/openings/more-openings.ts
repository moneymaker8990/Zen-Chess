// Additional opening lines - 50 per major opening
import type { OpeningLine } from './index';

export const moreOpenings: OpeningLine[] = [
  // ==========================================
  // FRENCH DEFENSE - 25 more lines (Black)
  // ==========================================
  { id: 'fr-m1', name: 'French Defense', variation: 'Winawer Poisoned Pawn', eco: 'C18', moves: ['e4','e6','d4','d5','Nc3','Bb4','e5','c5','a3','Bxc3+','bxc3','Ne7','Qg4','Qc7','Qxg7','Rg8','Qxh7','cxd4','Ne2','Nbc6','f4','Bd7'], fen: '', description: 'Sharp Winawer with pawn grab.', keyIdeas: ['Kingside attack', 'Central counter', 'Piece activity'], difficulty: 5, category: 'e4', side: 'black' },
  { id: 'fr-m2', name: 'French Defense', variation: 'Advance 5...Qb6', eco: 'C02', moves: ['e4','e6','d4','d5','e5','c5','c3','Nc6','Nf3','Qb6','Be2','cxd4','cxd4','Nh6','Nc3','Nf5','Na4','Qa5+','Bd2','Bb4'], fen: '', description: 'Advance with Qb6 pressure.', keyIdeas: ['Attack d4', 'Piece activity', 'Queenside play'], difficulty: 3, category: 'e4', side: 'black' },
  { id: 'fr-m3', name: 'French Defense', variation: 'Advance Milner-Barry', eco: 'C02', moves: ['e4','e6','d4','d5','e5','c5','c3','Nc6','Nf3','Qb6','Bd3','cxd4','cxd4','Bd7','O-O','Nxd4','Nxd4','Qxd4','Nc3','a6'], fen: '', description: 'Milner-Barry Gambit.', keyIdeas: ['Development lead', 'Central pressure', 'Open lines'], difficulty: 4, category: 'e4', side: 'black' },
  { id: 'fr-m4', name: 'French Defense', variation: 'Classical Steinitz', eco: 'C11', moves: ['e4','e6','d4','d5','Nc3','Nf6','e5','Nfd7','f4','c5','Nf3','Nc6','Be3','a6','Qd2','b5','a3','Qb6'], fen: '', description: 'Classical Steinitz variation.', keyIdeas: ['Queenside expansion', 'f6 break', 'Central tension'], difficulty: 3, category: 'e4', side: 'black' },
  { id: 'fr-m5', name: 'French Defense', variation: 'Tarrasch Guimard', eco: 'C04', moves: ['e4','e6','d4','d5','Nd2','Nc6','Ngf3','Nf6','e5','Nd7','Nb3','f6','Bb5','Be7','exf6','Bxf6','O-O','O-O'], fen: '', description: 'Guimard with Nc6.', keyIdeas: ['Early f6', 'Piece activity', 'Central play'], difficulty: 3, category: 'e4', side: 'black' },
  { id: 'fr-m6', name: 'French Defense', variation: 'Rubinstein Fort Knox', eco: 'C10', moves: ['e4','e6','d4','d5','Nc3','dxe4','Nxe4','Bd7','Nf3','Bc6','Bd3','Nd7','O-O','Ngf6','Nxf6+','Nxf6','c3','Be7'], fen: '', description: 'Fort Knox - ultra solid.', keyIdeas: ['Solid structure', 'Endgame focus', 'No weaknesses'], difficulty: 2, category: 'e4', side: 'black' },
  { id: 'fr-m7', name: 'French Defense', variation: 'Winawer Armenian', eco: 'C18', moves: ['e4','e6','d4','d5','Nc3','Bb4','e5','c5','a3','Ba5','b4','cxd4','Qg4','Ne7','bxa5','dxc3','Qxg7','Rg8','Qxh7','Nbc6'], fen: '', description: 'Armenian variation.', keyIdeas: ['Material vs attack', 'Open lines', 'Tactical play'], difficulty: 5, category: 'e4', side: 'black' },
  { id: 'fr-m8', name: 'French Defense', variation: 'Classical McCutcheon', eco: 'C12', moves: ['e4','e6','d4','d5','Nc3','Nf6','Bg5','Bb4','e5','h6','Bd2','Bxc3','bxc3','Ne4','Qg4','g6','Bd3','Nxd2','Kxd2'], fen: '', description: 'McCutcheon with Bb4.', keyIdeas: ['Attack the bishop', 'Structural play', 'King safety'], difficulty: 4, category: 'e4', side: 'black' },
  { id: 'fr-m9', name: 'French Defense', variation: 'Tarrasch Open 3...c5', eco: 'C07', moves: ['e4','e6','d4','d5','Nd2','c5','exd5','exd5','Ngf3','Nc6','Bb5','Bd6','dxc5','Bxc5','O-O','Nge7','Nb3','Bd6','Bg5'], fen: '', description: 'Open Tarrasch main line.', keyIdeas: ['IQP play', 'Development', 'Central tension'], difficulty: 3, category: 'e4', side: 'black' },
  { id: 'fr-m10', name: 'French Defense', variation: 'Advance 6.a3', eco: 'C02', moves: ['e4','e6','d4','d5','e5','c5','c3','Nc6','Nf3','Qb6','a3','c4','Nbd2','Na5','Be2','Bd7','O-O','Ne7'], fen: '', description: 'Advance with a3.', keyIdeas: ['Queenside play', 'f6 break', 'Slow maneuvering'], difficulty: 3, category: 'e4', side: 'black' },

  // ==========================================
  // CARO-KANN DEFENSE - 25 more lines (Black)
  // ==========================================
  { id: 'ck-m1', name: 'Caro-Kann Defense', variation: 'Classical 5...exf6', eco: 'B19', moves: ['e4','c6','d4','d5','Nc3','dxe4','Nxe4','Bf5','Ng3','Bg6','h4','h6','Nf3','Nd7','h5','Bh7','Bd3','Bxd3','Qxd3','e6','Bf4','Qa5+'], fen: '', description: 'Classical with h4-h5.', keyIdeas: ['Kingside space', 'Slow buildup', 'Solid structure'], difficulty: 3, category: 'e4', side: 'black' },
  { id: 'ck-m2', name: 'Caro-Kann Defense', variation: 'Advance Short', eco: 'B12', moves: ['e4','c6','d4','d5','e5','Bf5','Nf3','e6','Be2','Nd7','O-O','h6','Nbd2','Ne7','Nb3','Qc7','Bd2','g5'], fen: '', description: 'Short system in Advance.', keyIdeas: ['Kingside expansion', 'c5 break', 'Maneuvering'], difficulty: 3, category: 'e4', side: 'black' },
  { id: 'ck-m3', name: 'Caro-Kann Defense', variation: 'Advance Botvinnik-Carls', eco: 'B12', moves: ['e4','c6','d4','d5','e5','Bf5','Nc3','e6','g4','Bg6','Nge2','c5','h4','h5','Nf4','Bh7','Nxh5','Nc6'], fen: '', description: 'Botvinnik-Carls with g4.', keyIdeas: ['Kingside attack', 'Space advantage', 'Tactical play'], difficulty: 4, category: 'e4', side: 'black' },
  { id: 'ck-m4', name: 'Caro-Kann Defense', variation: 'Panov Attack Main', eco: 'B14', moves: ['e4','c6','d4','d5','exd5','cxd5','c4','Nf6','Nc3','e6','Nf3','Bb4','cxd5','Nxd5','Bd2','Nc6','Bd3','O-O','O-O','Be7'], fen: '', description: 'Panov Attack IQP.', keyIdeas: ['IQP dynamics', 'Piece activity', 'Attacking chances'], difficulty: 3, category: 'e4', side: 'black' },
  { id: 'ck-m5', name: 'Caro-Kann Defense', variation: 'Exchange 5.Bd3', eco: 'B13', moves: ['e4','c6','d4','d5','exd5','cxd5','Bd3','Nc6','c3','Nf6','Bf4','Bg4','Qb3','Qd7','Nd2','e6','Ngf3','Bd6'], fen: '', description: 'Exchange with Bd3.', keyIdeas: ['Central control', 'Development', 'Solid play'], difficulty: 2, category: 'e4', side: 'black' },
  { id: 'ck-m6', name: 'Caro-Kann Defense', variation: 'Two Knights 3...Bg4', eco: 'B11', moves: ['e4','c6','Nc3','d5','Nf3','Bg4','h3','Bxf3','Qxf3','e6','d4','Nf6','Bd3','dxe4','Nxe4','Qxd4','c3','Qd8'], fen: '', description: 'Two Knights with Bg4.', keyIdeas: ['Bishop pair', 'Central play', 'Solid structure'], difficulty: 2, category: 'e4', side: 'black' },
  { id: 'ck-m7', name: 'Caro-Kann Defense', variation: 'Classical Seirawan', eco: 'B19', moves: ['e4','c6','d4','d5','Nc3','dxe4','Nxe4','Bf5','Ng3','Bg6','h4','h6','Nf3','Nd7','h5','Bh7','Bd3','Bxd3','Qxd3','Ngf6','Bd2','e6','O-O-O'], fen: '', description: 'Seirawan variation.', keyIdeas: ['Opposite castling', 'Kingside play', 'Central tension'], difficulty: 4, category: 'e4', side: 'black' },
  { id: 'ck-m8', name: 'Caro-Kann Defense', variation: 'Bronstein-Larsen', eco: 'B16', moves: ['e4','c6','d4','d5','Nc3','dxe4','Nxe4','Nf6','Nxf6+','gxf6','c3','Bf5','Nf3','e6','g3','Bd6','Bg2','Qc7'], fen: '', description: 'Bronstein-Larsen with gxf6.', keyIdeas: ['Open g-file', 'Piece activity', 'Attacking play'], difficulty: 3, category: 'e4', side: 'black' },
  { id: 'ck-m9', name: 'Caro-Kann Defense', variation: 'Advance Van der Wiel', eco: 'B12', moves: ['e4','c6','d4','d5','e5','Bf5','Nc3','e6','g4','Bg6','Nge2','c5','h4','h6','Be3','Nc6','dxc5','Bxc5'], fen: '', description: 'Van der Wiel Attack.', keyIdeas: ['Kingside expansion', 'Central tension', 'Attacking play'], difficulty: 4, category: 'e4', side: 'black' },
  { id: 'ck-m10', name: 'Caro-Kann Defense', variation: 'Modern 4...Nd7', eco: 'B15', moves: ['e4','c6','d4','d5','Nc3','dxe4','Nxe4','Nd7','Bc4','Ngf6','Ng5','e6','Qe2','Nb6','Bb3','h6','N5f3','c5'], fen: '', description: 'Modern with Nd7.', keyIdeas: ['Solid development', 'c5 break', 'Central play'], difficulty: 3, category: 'e4', side: 'black' },

  // ==========================================
  // ALEKHINE DEFENSE - 15 lines (Black)
  // ==========================================
  { id: 'ale-1', name: 'Alekhine Defense', variation: 'Modern Main Line', eco: 'B04', moves: ['e4','Nf6','e5','Nd5','d4','d6','Nf3','Bg4','Be2','e6','O-O','Be7','c4','Nb6','exd6','cxd6','Nc3','O-O'], fen: '', description: 'Modern variation main line.', keyIdeas: ['Central pressure', 'Piece activity', 'c5 break'], difficulty: 3, category: 'e4', side: 'black' },
  { id: 'ale-2', name: 'Alekhine Defense', variation: 'Four Pawns Attack', eco: 'B03', moves: ['e4','Nf6','e5','Nd5','d4','d6','c4','Nb6','f4','dxe5','fxe5','Nc6','Be3','Bf5','Nc3','e6','Nf3','Be7'], fen: '', description: 'Four Pawns - aggressive!', keyIdeas: ['Counter the center', 'Piece pressure', 'e5 weakness'], difficulty: 4, category: 'e4', side: 'black' },
  { id: 'ale-3', name: 'Alekhine Defense', variation: 'Exchange Variation', eco: 'B03', moves: ['e4','Nf6','e5','Nd5','d4','d6','c4','Nb6','exd6','cxd6','Nc3','g6','Be3','Bg7','Rc1','O-O','b3','Nc6'], fen: '', description: 'Exchange variation.', keyIdeas: ['Central control', 'Fianchetto', 'Solid play'], difficulty: 2, category: 'e4', side: 'black' },
  { id: 'ale-4', name: 'Alekhine Defense', variation: 'Scandinavian Variation', eco: 'B02', moves: ['e4','Nf6','Nc3','d5','e5','Ne4','Nce2','d4','c3','Nc6','cxd4','Nxd4','Nxd4','Qxd4','d3','Nf6'], fen: '', description: 'Scandinavian style.', keyIdeas: ['Central break', 'Piece activity', 'Early queen'], difficulty: 3, category: 'e4', side: 'black' },
  { id: 'ale-5', name: 'Alekhine Defense', variation: 'Brooklyn Variation', eco: 'B02', moves: ['e4','Nf6','e5','Ng8','d4','d6','Nf3','Bg4','Be2','Nc6','c3','e6','exd6','Bxd6','O-O','Nge7'], fen: '', description: 'Brooklyn - knight retreats.', keyIdeas: ['Solid structure', 'Slow development', 'Counter play'], difficulty: 2, category: 'e4', side: 'black' },

  // ==========================================
  // SCANDINAVIAN DEFENSE - 15 lines (Black)
  // ==========================================
  { id: 'sca-1', name: 'Scandinavian Defense', variation: 'Main Line 3...Qa5', eco: 'B01', moves: ['e4','d5','exd5','Qxd5','Nc3','Qa5','d4','Nf6','Nf3','c6','Bc4','Bf5','Bd2','e6','Nd5','Qd8','Nxf6+','Qxf6'], fen: '', description: 'Main line with Qa5.', keyIdeas: ['Solid structure', 'Development', 'c6 support'], difficulty: 2, category: 'e4', side: 'black' },
  { id: 'sca-2', name: 'Scandinavian Defense', variation: 'Modern 3...Qd6', eco: 'B01', moves: ['e4','d5','exd5','Qxd5','Nc3','Qd6','d4','Nf6','Nf3','c6','Ne5','Nbd7','Nc4','Qc7','Qf3','Nb6'], fen: '', description: 'Modern with Qd6.', keyIdeas: ['Flexible queen', 'Solid play', 'Development'], difficulty: 2, category: 'e4', side: 'black' },
  { id: 'sca-3', name: 'Scandinavian Defense', variation: 'Icelandic Gambit', eco: 'B01', moves: ['e4','d5','exd5','Nf6','c4','e6','dxe6','Bxe6','d4','Bb4+','Bd2','Qe7','Bxb4','Qxb4+','Qd2','Nc6'], fen: '', description: 'Icelandic Gambit.', keyIdeas: ['Development lead', 'Piece activity', 'Attacking chances'], difficulty: 4, category: 'e4', side: 'black' },
  { id: 'sca-4', name: 'Scandinavian Defense', variation: 'Portuguese Gambit', eco: 'B01', moves: ['e4','d5','exd5','Nf6','d4','Bg4','Be2','Bxe2','Qxe2','Qxd5','Nf3','Nc6','c3','e6','O-O','Be7'], fen: '', description: 'Portuguese with Bg4.', keyIdeas: ['Bishop trade', 'Solid position', 'Development'], difficulty: 3, category: 'e4', side: 'black' },
  { id: 'sca-5', name: 'Scandinavian Defense', variation: 'Marshall Variation', eco: 'B01', moves: ['e4','d5','exd5','Nf6','d4','Nxd5','c4','Nb4','Qa4+','N4c6','d5','Nd4','Qd1','e5','dxe6','Qxd1+','Kxd1','Bxe6'], fen: '', description: 'Marshall with Nf6.', keyIdeas: ['Knight play', 'Endgame focus', 'Solid structure'], difficulty: 3, category: 'e4', side: 'black' },

  // ==========================================
  // PIRC/MODERN DEFENSE - 15 lines (Black)
  // ==========================================
  { id: 'pir-1', name: 'Pirc Defense', variation: 'Classical Main Line', eco: 'B08', moves: ['e4','d6','d4','Nf6','Nc3','g6','Nf3','Bg7','Be2','O-O','O-O','c6','a4','Nbd7','h3','e5','dxe5','dxe5'], fen: '', description: 'Classical Pirc.', keyIdeas: ['Central control', 'Fianchetto', 'e5 break'], difficulty: 3, category: 'e4', side: 'black' },
  { id: 'pir-2', name: 'Pirc Defense', variation: 'Austrian Attack', eco: 'B09', moves: ['e4','d6','d4','Nf6','Nc3','g6','f4','Bg7','Nf3','O-O','Bd3','Na6','O-O','c5','d5','Nc7','a4','b6'], fen: '', description: 'Austrian Attack with f4.', keyIdeas: ['Kingside attack', 'e5 push', 'Central space'], difficulty: 4, category: 'e4', side: 'black' },
  { id: 'pir-3', name: 'Pirc Defense', variation: '150 Attack', eco: 'B07', moves: ['e4','d6','d4','Nf6','Nc3','g6','Be3','Bg7','Qd2','O-O','O-O-O','c6','f3','b5','h4','Nbd7','g4','b4'], fen: '', description: '150 Attack - aggressive!', keyIdeas: ['Opposite castling', 'Kingside storm', 'Pawn attack'], difficulty: 4, category: 'e4', side: 'black' },
  { id: 'pir-4', name: 'Modern Defense', variation: 'Standard', eco: 'B06', moves: ['e4','g6','d4','Bg7','Nc3','d6','Nf3','a6','a4','Nf6','Be2','O-O','O-O','Nc6','Be3','e5','dxe5','dxe5'], fen: '', description: 'Standard Modern.', keyIdeas: ['Flexible structure', 'Central play', 'Counterattack'], difficulty: 3, category: 'e4', side: 'black' },
  { id: 'pir-5', name: 'Modern Defense', variation: 'Pterodactyl', eco: 'B06', moves: ['e4','g6','d4','Bg7','Nc3','c5','dxc5','Qa5','Bd2','Qxc5','Nf3','Nf6','Bc4','O-O','O-O','Nc6'], fen: '', description: 'Pterodactyl with c5.', keyIdeas: ['Early queen', 'c5 pressure', 'Piece activity'], difficulty: 3, category: 'e4', side: 'black' },

  // ==========================================
  // DUTCH DEFENSE - 20 lines (Black)
  // ==========================================
  { id: 'dut-1', name: 'Dutch Defense', variation: 'Leningrad Main', eco: 'A87', moves: ['d4','f5','g3','Nf6','Bg2','g6','Nf3','Bg7','O-O','O-O','c4','d6','Nc3','Nc6','d5','Ne5','Nxe5','dxe5'], fen: '', description: 'Leningrad main line.', keyIdeas: ['Kingside attack', 'e5 control', 'Piece activity'], difficulty: 4, category: 'd4', side: 'black' },
  { id: 'dut-2', name: 'Dutch Defense', variation: 'Stonewall', eco: 'A90', moves: ['d4','f5','g3','Nf6','Bg2','e6','Nf3','d5','O-O','Bd6','c4','c6','Nc3','O-O','Qc2','Ne4','Rb1','Nd7'], fen: '', description: 'Stonewall formation.', keyIdeas: ['e4 control', 'Kingside play', 'Solid center'], difficulty: 3, category: 'd4', side: 'black' },
  { id: 'dut-3', name: 'Dutch Defense', variation: 'Classical', eco: 'A96', moves: ['d4','f5','g3','Nf6','Bg2','e6','Nf3','Be7','O-O','O-O','c4','d6','Nc3','Qe8','Qc2','Qh5','e4','fxe4'], fen: '', description: 'Classical Dutch.', keyIdeas: ['Central break', 'Piece activity', 'Kingside play'], difficulty: 3, category: 'd4', side: 'black' },
  { id: 'dut-4', name: 'Dutch Defense', variation: 'Leningrad 7.Nc3', eco: 'A89', moves: ['d4','f5','g3','Nf6','Bg2','g6','Nf3','Bg7','O-O','O-O','c4','d6','Nc3','Qe8','d5','Na6','Rb1','Nc5','b4','Nce4'], fen: '', description: 'Leningrad with Nc3.', keyIdeas: ['Queenside expansion', 'Central control', 'Piece activity'], difficulty: 4, category: 'd4', side: 'black' },
  { id: 'dut-5', name: 'Dutch Defense', variation: 'Anti-Dutch 2.Bg5', eco: 'A80', moves: ['d4','f5','Bg5','h6','Bh4','g5','Bg3','Nf6','e3','d6','Nd2','Bg7','c3','O-O','Bd3','Nc6','Ne2'], fen: '', description: 'Anti-Dutch with Bg5.', keyIdeas: ['Kingside expansion', 'Bishop pressure', 'Central play'], difficulty: 3, category: 'd4', side: 'black' },

  // ==========================================
  // QUEEN'S INDIAN - 15 lines (Black)
  // ==========================================
  { id: 'qid-1', name: "Queen's Indian Defense", variation: 'Petrosian System', eco: 'E12', moves: ['d4','Nf6','c4','e6','Nf3','b6','a3','Bb7','Nc3','d5','cxd5','Nxd5','Qc2','Nxc3','bxc3','Be7','e4','O-O'], fen: '', description: 'Petrosian with a3.', keyIdeas: ['Central pawns', 'Bishop pair', 'Solid structure'], difficulty: 3, category: 'd4', side: 'black' },
  { id: 'qid-2', name: "Queen's Indian Defense", variation: 'Classical Main', eco: 'E17', moves: ['d4','Nf6','c4','e6','Nf3','b6','g3','Bb7','Bg2','Be7','O-O','O-O','Nc3','Ne4','Qc2','Nxc3','Qxc3','f5'], fen: '', description: 'Classical with g3.', keyIdeas: ['Fianchetto', 'Central control', 'f5 break'], difficulty: 3, category: 'd4', side: 'black' },
  { id: 'qid-3', name: "Queen's Indian Defense", variation: 'Nimzowitsch Variation', eco: 'E15', moves: ['d4','Nf6','c4','e6','Nf3','b6','g3','Ba6','b3','Bb4+','Bd2','Be7','Bg2','c6','Bc3','d5','Ne5','Nfd7'], fen: '', description: 'Nimzowitsch with Ba6.', keyIdeas: ['Light square play', 'c4 pressure', 'Piece activity'], difficulty: 3, category: 'd4', side: 'black' },
  { id: 'qid-4', name: "Queen's Indian Defense", variation: 'Miles Variation', eco: 'E12', moves: ['d4','Nf6','c4','e6','Nf3','b6','Bg5','Bb7','e3','h6','Bh4','Be7','Nc3','O-O','Bd3','d5','O-O','Nbd7'], fen: '', description: 'Miles with Bg5.', keyIdeas: ['Pin the knight', 'Central tension', 'Development'], difficulty: 3, category: 'd4', side: 'black' },
  { id: 'qid-5', name: "Queen's Indian Defense", variation: 'Fianchetto Traditional', eco: 'E17', moves: ['d4','Nf6','c4','e6','Nf3','b6','g3','Bb7','Bg2','Be7','O-O','O-O','Nc3','d5','Ne5','c6','cxd5','cxd5'], fen: '', description: 'Fianchetto traditional.', keyIdeas: ['Central control', 'Piece coordination', 'Solid play'], difficulty: 3, category: 'd4', side: 'black' },

  // ==========================================
  // BOGO-INDIAN - 10 lines (Black)
  // ==========================================
  { id: 'bog-1', name: 'Bogo-Indian Defense', variation: 'Main Line', eco: 'E11', moves: ['d4','Nf6','c4','e6','Nf3','Bb4+','Bd2','Qe7','g3','Nc6','Nc3','Bxc3','Bxc3','Ne4','Rc1','d6','Bg2','O-O'], fen: '', description: 'Bogo main line.', keyIdeas: ['Flexible play', 'Central control', 'Piece activity'], difficulty: 3, category: 'd4', side: 'black' },
  { id: 'bog-2', name: 'Bogo-Indian Defense', variation: 'Nimzowitsch Variation', eco: 'E11', moves: ['d4','Nf6','c4','e6','Nf3','Bb4+','Nbd2','b6','a3','Bxd2+','Qxd2','Bb7','e3','O-O','Be2','d6','O-O','Nbd7'], fen: '', description: 'Nimzowitsch with Nbd2.', keyIdeas: ['Bishop trade', 'Central control', 'Solid play'], difficulty: 2, category: 'd4', side: 'black' },
  { id: 'bog-3', name: 'Bogo-Indian Defense', variation: 'Wade Variation', eco: 'E11', moves: ['d4','Nf6','c4','e6','Nf3','Bb4+','Bd2','a5','g3','d5','Bg2','O-O','O-O','c6','Qc2','Nbd7','Bf4','Ne4'], fen: '', description: 'Wade with a5.', keyIdeas: ['Queenside control', 'Solid structure', 'Piece activity'], difficulty: 3, category: 'd4', side: 'black' },

  // ==========================================
  // MODERN BENONI - 15 lines (Black)
  // ==========================================
  { id: 'ben-1', name: 'Modern Benoni', variation: 'Classical Main', eco: 'A70', moves: ['d4','Nf6','c4','c5','d5','e6','Nc3','exd5','cxd5','d6','e4','g6','Nf3','Bg7','Be2','O-O','O-O','Re8','Nd2','Na6'], fen: '', description: 'Classical Benoni.', keyIdeas: ['e5 break', 'b5 expansion', 'Piece activity'], difficulty: 4, category: 'd4', side: 'black' },
  { id: 'ben-2', name: 'Modern Benoni', variation: 'Fianchetto', eco: 'A62', moves: ['d4','Nf6','c4','c5','d5','e6','Nc3','exd5','cxd5','d6','Nf3','g6','g3','Bg7','Bg2','O-O','O-O','a6','a4','Nbd7'], fen: '', description: 'Fianchetto Benoni.', keyIdeas: ['Long diagonal', 'b5 break', 'Piece coordination'], difficulty: 3, category: 'd4', side: 'black' },
  { id: 'ben-3', name: 'Modern Benoni', variation: 'Taimanov Attack', eco: 'A67', moves: ['d4','Nf6','c4','c5','d5','e6','Nc3','exd5','cxd5','d6','e4','g6','f4','Bg7','Bb5+','Nfd7','a4','Na6','Nf3','Nc7'], fen: '', description: 'Taimanov with f4.', keyIdeas: ['Kingside attack', 'Central space', 'e5 push'], difficulty: 4, category: 'd4', side: 'black' },
  { id: 'ben-4', name: 'Benko Gambit', variation: 'Accepted Main', eco: 'A58', moves: ['d4','Nf6','c4','c5','d5','b5','cxb5','a6','bxa6','g6','Nc3','Bxa6','e4','Bxf1','Kxf1','d6','g3','Bg7','Kg2','O-O'], fen: '', description: 'Benko Gambit accepted.', keyIdeas: ['Queenside pressure', 'a+b files', 'Piece activity'], difficulty: 4, category: 'd4', side: 'black' },
  { id: 'ben-5', name: 'Benko Gambit', variation: 'Declined', eco: 'A57', moves: ['d4','Nf6','c4','c5','d5','b5','Nf3','Bb7','Bg5','bxc4','e4','e6','Bxc4','exd5','exd5','Be7','O-O','O-O'], fen: '', description: 'Benko declined.', keyIdeas: ['Central pawns', 'Development', 'Solid play'], difficulty: 3, category: 'd4', side: 'black' },

  // ==========================================
  // LONDON SYSTEM - 20 lines (White)
  // ==========================================
  { id: 'lon-m1', name: 'London System', variation: 'vs d5/Nf6', eco: 'D02', moves: ['d4','d5','Nf3','Nf6','Bf4','c5','e3','Nc6','c3','e6','Nbd2','Bd6','Bg3','O-O','Bd3','b6','Ne5','Bb7'], fen: '', description: 'London vs d5/Nf6.', keyIdeas: ['e4 break', 'Solid center', 'Kingside play'], difficulty: 2, category: 'd4', side: 'white' },
  { id: 'lon-m2', name: 'London System', variation: 'vs King\'s Indian', eco: 'A48', moves: ['d4','Nf6','Nf3','g6','Bf4','Bg7','e3','O-O','Be2','d6','h3','c5','c3','Nc6','O-O','Qb6','Qc1','cxd4'], fen: '', description: 'London vs KID.', keyIdeas: ['Central control', 'h3-g4', 'Solid play'], difficulty: 2, category: 'd4', side: 'white' },
  { id: 'lon-m3', name: 'London System', variation: 'Accelerated', eco: 'D00', moves: ['d4','d5','Bf4','Nf6','e3','c5','c3','Nc6','Nd2','e6','Ngf3','Bd6','Bg3','O-O','Bd3','Qe7','Ne5','Nd7'], fen: '', description: 'Accelerated London.', keyIdeas: ['Early Bf4', 'e4 break', 'Solid center'], difficulty: 2, category: 'd4', side: 'white' },
  { id: 'lon-m4', name: 'London System', variation: 'vs c5 early', eco: 'A46', moves: ['d4','Nf6','Nf3','c5','Bf4','cxd4','Nxd4','e5','Nb5','d5','Bg3','a6','N5c3','d4','Nd5','Nxd5','Qxd5','Qxd5'], fen: '', description: 'London vs early c5.', keyIdeas: ['Knight outpost', 'Central play', 'Piece activity'], difficulty: 3, category: 'd4', side: 'white' },
  { id: 'lon-m5', name: 'London System', variation: 'Jobava Style', eco: 'D00', moves: ['d4','d5','Bf4','Nf6','Nc3','c5','e3','cxd4','exd4','a6','Nf3','Nc6','Be2','Bg4','Ne5','Bf5','g4','Bg6','h4','h6'], fen: '', description: 'Jobava London.', keyIdeas: ['Aggressive h4-h5', 'Piece activity', 'Kingside attack'], difficulty: 3, category: 'd4', side: 'white' },

  // ==========================================
  // TORRE ATTACK - 10 lines (White)
  // ==========================================
  { id: 'tor-1', name: 'Torre Attack', variation: 'Classical', eco: 'A46', moves: ['d4','Nf6','Nf3','e6','Bg5','c5','e3','Be7','Nbd2','d5','c3','Nc6','Bd3','O-O','O-O','b6','Ne5','Bb7'], fen: '', description: 'Classical Torre.', keyIdeas: ['Bg5 pin', 'Central control', 'Kingside play'], difficulty: 2, category: 'd4', side: 'white' },
  { id: 'tor-2', name: 'Torre Attack', variation: 'vs Fianchetto', eco: 'A48', moves: ['d4','Nf6','Nf3','g6','Bg5','Bg7','Nbd2','O-O','c3','d6','e4','h6','Bh4','e5','dxe5','dxe5','Bc4','Qe7'], fen: '', description: 'Torre vs fianchetto.', keyIdeas: ['Pin the knight', 'e4 break', 'Central control'], difficulty: 2, category: 'd4', side: 'white' },
  { id: 'tor-3', name: 'Torre Attack', variation: 'Petrosian-Smyslov', eco: 'A46', moves: ['d4','Nf6','Nf3','e6','Bg5','d5','e3','Be7','Nbd2','O-O','Bd3','c5','c3','Nbd7','O-O','b6','Ne5','Bb7'], fen: '', description: 'Petrosian-Smyslov.', keyIdeas: ['Central outpost', 'Piece coordination', 'Solid play'], difficulty: 2, category: 'd4', side: 'white' },

  // ==========================================
  // TROMPOWSKY - 10 lines (White)
  // ==========================================
  { id: 'tro-1', name: 'Trompowsky Attack', variation: 'Main Line', eco: 'A45', moves: ['d4','Nf6','Bg5','Ne4','Bf4','d5','e3','c5','Bd3','Nc6','c3','e6','Nd2','Nxd2','Qxd2','Bd6','Bxd6','Qxd6'], fen: '', description: 'Trompowsky main.', keyIdeas: ['Bishop pair', 'Central control', 'Piece activity'], difficulty: 2, category: 'd4', side: 'white' },
  { id: 'tro-2', name: 'Trompowsky Attack', variation: 'Raptor Variation', eco: 'A45', moves: ['d4','Nf6','Bg5','Ne4','h4','c5','d5','Qb6','Nd2','Nxg5','hxg5','e6','e4','exd5','e5','Nc6','Ngf3','Be7'], fen: '', description: 'Raptor with h4.', keyIdeas: ['Kingside expansion', 'Space advantage', 'Aggressive play'], difficulty: 3, category: 'd4', side: 'white' },
  { id: 'tro-3', name: 'Trompowsky Attack', variation: '2...d5', eco: 'A45', moves: ['d4','Nf6','Bg5','d5','Bxf6','exf6','e3','c5','c3','Nc6','Nd2','Bd6','Bd3','O-O','Ngf3','Re8','O-O','Bg4'], fen: '', description: 'Trompowsky vs d5.', keyIdeas: ['Doubled pawns', 'Central control', 'Solid play'], difficulty: 2, category: 'd4', side: 'white' },

  // ==========================================
  // ENGLISH OPENING - 20 lines (White)
  // ==========================================
  { id: 'eng-m1', name: 'English Opening', variation: 'Symmetrical Four Knights', eco: 'A33', moves: ['c4','c5','Nc3','Nc6','Nf3','Nf6','d4','cxd4','Nxd4','e6','g3','Qb6','Nb3','Ne5','e4','Bb4','Qe2','d6'], fen: '', description: 'Four Knights Symmetrical.', keyIdeas: ['Central control', 'Development', 'Piece activity'], difficulty: 3, category: 'c4', side: 'white' },
  { id: 'eng-m2', name: 'English Opening', variation: 'Botvinnik System', eco: 'A36', moves: ['c4','c5','Nc3','Nc6','g3','g6','Bg2','Bg7','e4','d6','Nge2','e5','d3','Nge7','O-O','O-O','a3','a5','Rb1','Be6'], fen: '', description: 'Botvinnik with e4.', keyIdeas: ['Strong center', 'f4 ideas', 'Piece coordination'], difficulty: 3, category: 'c4', side: 'white' },
  { id: 'eng-m3', name: 'English Opening', variation: 'Hedgehog', eco: 'A30', moves: ['c4','c5','Nf3','Nf6','Nc3','e6','g3','b6','Bg2','Bb7','O-O','Be7','d4','cxd4','Qxd4','d6','Rd1','a6','b3','Nbd7'], fen: '', description: 'English Hedgehog.', keyIdeas: ['Central pressure', 'Piece coordination', 'b5 break'], difficulty: 3, category: 'c4', side: 'white' },
  { id: 'eng-m4', name: 'English Opening', variation: 'Anglo-Indian', eco: 'A15', moves: ['c4','Nf6','Nc3','e6','Nf3','d5','d4','Be7','Bf4','O-O','e3','c5','dxc5','Bxc5','Qc2','Nc6','a3','Qa5'], fen: '', description: 'Anglo-Indian setup.', keyIdeas: ['Transposition', 'Central control', 'Flexibility'], difficulty: 2, category: 'c4', side: 'white' },
  { id: 'eng-m5', name: 'English Opening', variation: 'King\'s English', eco: 'A20', moves: ['c4','e5','Nc3','Nc6','g3','g6','Bg2','Bg7','d3','d6','e4','Nge7','Nge2','O-O','O-O','f5','exf5','gxf5'], fen: '', description: 'King\'s English.', keyIdeas: ['Fianchetto', 'Central control', 'f5 play'], difficulty: 3, category: 'c4', side: 'white' },

  // ==========================================
  // RÉTI OPENING - 15 lines (White)
  // ==========================================
  { id: 'ret-m1', name: 'Réti Opening', variation: 'KIA Transposition', eco: 'A07', moves: ['Nf3','d5','g3','Nf6','Bg2','c6','O-O','Bg4','d3','Nbd7','Nbd2','e6','e4','dxe4','dxe4','Bc5','Qe2','O-O'], fen: '', description: 'KIA from Réti.', keyIdeas: ['e4 center', 'Kingside play', 'Flexibility'], difficulty: 2, category: 'nf3', side: 'white' },
  { id: 'ret-m2', name: 'Réti Opening', variation: 'Double Fianchetto', eco: 'A06', moves: ['Nf3','d5','g3','c6','Bg2','Bg4','b3','Nd7','Bb2','e6','d3','Ngf6','Nbd2','Bd6','O-O','O-O','e4','dxe4'], fen: '', description: 'Double fianchetto.', keyIdeas: ['Both diagonals', 'Central breaks', 'Flexible play'], difficulty: 2, category: 'nf3', side: 'white' },
  { id: 'ret-m3', name: 'Réti Opening', variation: 'Anglo-Slav', eco: 'A11', moves: ['Nf3','d5','c4','c6','b3','Nf6','Bb2','Bf5','g3','e6','Bg2','Nbd7','O-O','h6','d3','Be7','Nbd2','O-O'], fen: '', description: 'Anglo-Slav setup.', keyIdeas: ['Solid structure', 'Central control', 'Piece coordination'], difficulty: 2, category: 'nf3', side: 'white' },
  { id: 'ret-m4', name: 'Réti Opening', variation: 'Advance Variation', eco: 'A09', moves: ['Nf3','d5','c4','d4','e3','Nc6','exd4','Nxd4','Nxd4','Qxd4','Nc3','e5','d3','Nf6','Be2','Bc5','O-O','O-O'], fen: '', description: 'Advance with d4.', keyIdeas: ['Central break', 'Open position', 'Development lead'], difficulty: 3, category: 'nf3', side: 'white' },
  { id: 'ret-m5', name: 'Réti Opening', variation: 'Lasker System', eco: 'A06', moves: ['Nf3','d5','g3','Nf6','Bg2','c6','O-O','Bf5','d3','e6','Nbd2','Be7','Qe1','O-O','e4','Bh7','Qe2','Nbd7'], fen: '', description: 'Lasker system.', keyIdeas: ['e4 break', 'Central control', 'Flexible play'], difficulty: 2, category: 'nf3', side: 'white' },
];

export default moreOpenings;










