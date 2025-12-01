// Generate comprehensive opening lines from ALL PGN files
import * as fs from 'fs';
import * as path from 'path';
import { Chess } from 'chess.js';

interface OpeningLine {
  id: string;
  name: string;
  variation: string;
  eco: string;
  moves: string[];
  fen: string;
  description: string;
  keyIdeas: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  category: 'e4' | 'd4' | 'c4' | 'nf3' | 'other';
  side: 'white' | 'black';
}

// Opening definitions with their PGN files
const OPENING_DEFS: {
  name: string;
  files: string[];
  eco: string;
  category: 'e4' | 'd4' | 'c4' | 'nf3' | 'other';
  side: 'white' | 'black';
  description: string;
  keyIdeas: string[];
}[] = [
  // === E4 OPENINGS (White) ===
  { name: 'Italian Game', files: ['GiuocoPiano.pgn', 'TwoKnights.pgn', 'BishopsOpening.pgn'], eco: 'C50', category: 'e4', side: 'white', description: 'Classical development with Bc4.', keyIdeas: ['Central control', 'Development', 'Kingside attack'] },
  { name: 'Scotch Game', files: ['Scotch4Bc5.pgn', 'Scotch4Nf6.pgn', 'ScotchOther4.pgn', 'ScotchGambit.pgn'], eco: 'C45', category: 'e4', side: 'white', description: 'Open the center early with d4.', keyIdeas: ['Open center', 'Active play', 'Development'] },
  { name: 'Vienna Game', files: ['Vienna.pgn'], eco: 'C25', category: 'e4', side: 'white', description: 'Delay Nf3 to play f4.', keyIdeas: ['f4 advance', 'Piece activity', 'Aggressive'] },
  { name: "King's Gambit", files: ['KingsGambit.pgn'], eco: 'C30', category: 'e4', side: 'white', description: 'Sacrifice f2 pawn for attack.', keyIdeas: ['Development lead', 'Open f-file', 'King hunt'] },
  { name: 'Center Game', files: ['CenterGame-Danish.pgn'], eco: 'C21', category: 'e4', side: 'white', description: 'Immediate central exchange.', keyIdeas: ['Open center', 'Development', 'Early queen'] },
  
  // === E4 DEFENSES (Black) ===
  { name: 'Sicilian Defense', files: ['SicilianNajdorf6Bg5.pgn', 'SicilianNajdorf6Be3.pgn', 'SicilianNajdorf6Be2.pgn', 'SicilianNajdorf6Bc4.pgn', 'SicilianNajdorf6f3.pgn', 'SicilianNajdorf6f4.pgn', 'SicilianNajdorf6g3.pgn', 'SicilianNajdorf6a4.pgn', 'SicilianDragonYugoslav.pgn', 'SicilianDragonOther6.pgn', 'SicDragon6Be2-6Bc4.pgn', 'SicilianSveshnikov.pgn', 'SicilianTaimanovMain.pgn', 'SicilianTaimanov5Nb5.pgn', 'SicilianTaimanovOther5.pgn', 'SicilianAccelDragon.pgn', 'SicilianScheveningen.pgn', 'SicilianKan5Nc3.pgn', 'SicilianKan5Bd3.pgn', 'SicilianKan5c4.pgn', 'SicilianKanOther5.pgn', 'SicilianRichter-Rauzer.pgn', 'SicilianClassicalSozin.pgn', 'SicilianClassicalOther6.pgn', 'SicilianAlapin2Nf6.pgn', 'SicilianAlapin2d5.pgn', 'SicilianAlapinOther2.pgn', 'SicilianSmith-Morra.pgn', 'SicilianClosedOther3.pgn', 'Sic2Nc6-4Qc7-4Qb6.pgn', 'Sicilian2d6-4Qxd4.pgn', 'Sicilian2f4.pgn', 'Sicilian2Nc3-d6.pgn', 'Sicilian2Nc3-e6.pgn', 'Sicilian2Nc6Other5.pgn', 'Sicilian2Nf3Other2.pgn', 'SicilianMisc2.pgn'], eco: 'B20', category: 'e4', side: 'black', description: "Black's fighting response to 1.e4.", keyIdeas: ['Counterattack', 'Asymmetry', 'Dynamic play'] },
  { name: 'French Defense', files: ['FrWinawerMain.pgn', 'FrWinawerOtherB4.pgn', 'FrWinawerOtherW4.pgn', 'FrenchClassical.pgn', 'FrenchAdvance.pgn', 'FrenchMacCutcheon.pgn', 'FrenchBurn.pgn', 'FrTarrasch3c5.pgn', 'FrTarrasch3Nf6.pgn', 'FrTarraschOther3.pgn', 'FrenchRubinstein.pgn', 'FrenchSteinitz.pgn', 'FrenchOther2.pgn'], eco: 'C00', category: 'e4', side: 'black', description: 'Solid fortress with counterplay.', keyIdeas: ['c5 break', 'Pawn chains', 'Central tension'] },
  { name: 'Caro-Kann Defense', files: ['Caro-KannClassic.pgn', 'Caro-KannAdv.pgn', 'Caro-KannPan-Bot.pgn', 'Caro-Kann4Nd7.pgn', 'Caro-Kann4Nf6.pgn', 'Caro-KannEx.pgn', 'Caro-Kann2c4.pgn', 'Caro-Kann2Knight.pgn'], eco: 'B10', category: 'e4', side: 'black', description: 'Solid and reliable defense.', keyIdeas: ['Bishop development', 'Solid structure', 'Endgame focus'] },
  { name: 'Alekhine Defense', files: ['AlekhineModern.pgn', 'Alekhine4Pawns.pgn', 'AlekhineExchange.pgn', 'Alekhine2Nc3-d5.pgn', 'AlekhineOther3.pgn'], eco: 'B02', category: 'e4', side: 'black', description: 'Provoke and attack the center.', keyIdeas: ['Hypermodern', 'Counter-attack', 'Pawn hunting'] },
  { name: 'Scandinavian Defense', files: ['Scand2Qxd5-3Qa5.pgn', 'Scand3Qd6-Qd8.pgn', 'Scand2Nf6-3d4.pgn', 'Scand2Nf6Other.pgn'], eco: 'B01', category: 'e4', side: 'black', description: 'Strike back with d5 immediately.', keyIdeas: ['Early queen', 'Solid setup', 'Counterplay'] },
  { name: 'Pirc Defense', files: ['PircClassical.pgn', 'PircAustrian.pgn', 'PircOtherBlack3.pgn', 'PircOtherWhite3.pgn', 'PircOtherWhite4.pgn'], eco: 'B07', category: 'e4', side: 'black', description: 'Fianchetto and flexible structure.', keyIdeas: ['Fianchetto', 'Flexibility', 'Counter-attack'] },
  { name: 'Modern Defense', files: ['Modern3Nc3-d6.pgn', 'Modern3Nc3-c6.pgn', 'Modern3Nc3Other.pgn', 'Modern3Nf3.pgn', 'ModernOther3.pgn'], eco: 'B06', category: 'e4', side: 'black', description: 'Fianchetto without Nf6.', keyIdeas: ['Flexible', 'Fianchetto', 'Delayed development'] },
  { name: 'Petrov Defense', files: ['PetroffMain.pgn', 'PetroffOther3.pgn'], eco: 'C42', category: 'e4', side: 'black', description: 'Symmetrical and solid.', keyIdeas: ['Symmetry', 'Solid', 'Simplification'] },
  
  // === D4 OPENINGS (White) ===
  { name: "Queen's Gambit", files: ['QGDOrthoMain.pgn', 'QGDOrthoOther4.pgn', 'QGDOther34.pgn', 'QGD5Bf4.pgn', 'QGAMain.pgn', 'QGA3e4.pgn', 'QGAOther3.pgn', 'QGAOther4.pgn', 'QGDExchange.pgn', 'QG-Chigorin.pgn', 'QG-Albin.pgn', 'QGSym-Baltic.pgn'], eco: 'D00', category: 'd4', side: 'white', description: 'Classical positional chess.', keyIdeas: ['Central control', 'Minority attack', 'IQP play'] },
  { name: 'Slav Defense', files: ['SlavMain.pgn', 'Slav4a6.pgn', 'SlavOther34.pgn', 'SlavOther5.pgn', 'SemiSlavMeran.pgn', 'SemiSlavBotvinnik.pgn', 'SemiSlavOther5.pgn', 'SemiTarr5e3-Nc6.pgn'], eco: 'D10', category: 'd4', side: 'white', description: 'Solid Slav structure.', keyIdeas: ['Bf5 development', 'Solid structure', 'c6 support'] },
  { name: 'London System', files: ['London2e6.pgn', 'London2g6.pgn'], eco: 'D02', category: 'd4', side: 'white', description: 'Solid and reliable.', keyIdeas: ['Bf4 development', 'Solid center', 'e4 break'] },
  { name: 'Trompowsky Attack', files: ['Trompowsky2e6.pgn', 'Trompowsky2Ne4.pgn'], eco: 'A45', category: 'd4', side: 'white', description: 'Pin the knight with Bg5.', keyIdeas: ['Early pin', 'Surprise weapon', 'Flexible'] },
  { name: 'Torre Attack', files: ['Torre2e6.pgn', 'Torre2g6.pgn'], eco: 'A46', category: 'd4', side: 'white', description: 'Similar to London with Bg5.', keyIdeas: ['Bg5 pin', 'Central control', 'Solid play'] },
  { name: 'Catalan Opening', files: ['CatalanOpen.pgn', 'CatalanClosed.pgn', 'Catalan3Bb4.pgn', 'Catalan3c5.pgn'], eco: 'E00', category: 'd4', side: 'white', description: 'Fianchetto pressure.', keyIdeas: ['Long diagonal', 'Queenside pressure', 'Positional'] },
  
  // === D4 DEFENSES (Black) ===
  { name: "King's Indian Defense", files: ['KIDClassical.pgn', 'KIDSaemisch.pgn', 'KIDFianchetto.pgn', 'KID4pawns.pgn', 'KIDAverbakh.pgn', 'KIDPetrosian.pgn', 'KIDOther56.pgn', 'KIDOther7.pgn'], eco: 'E60', category: 'd4', side: 'black', description: 'Hypermodern counter-attack.', keyIdeas: ['f5 break', 'Kingside attack', 'Central counter'] },
  { name: 'Nimzo-Indian Defense', files: ['NimzoCl4O-O.pgn', 'NimzoCl4c5.pgn', 'NimzoRub4O-O.pgn', 'NimzoRub4c5.pgn', 'NimzoSaemisch.pgn', 'Nimzo4Nf3.pgn', 'Nimzo4f3.pgn', 'NimzoLeningrad.pgn', 'NimzoOther4.pgn'], eco: 'E20', category: 'd4', side: 'black', description: 'Pin and control e4.', keyIdeas: ['e4 control', 'Doubled pawns', 'Flexibility'] },
  { name: 'Grünfeld Defense', files: ['GrunfeldExchange.pgn', 'GrunfeldFianchetto.pgn', 'Grunfeld4Nf3.pgn', 'GrunfeldOther.pgn'], eco: 'D70', category: 'd4', side: 'black', description: 'Attack the center with pieces.', keyIdeas: ['Center pressure', 'Dragon bishop', 'Dynamic'] },
  { name: "Queen's Indian Defense", files: ['QID4g3-Ba6.pgn', 'QID4g3Other.pgn', 'QID4a3.pgn', 'QID4e3.pgn', 'QID4Nc3.pgn'], eco: 'E12', category: 'd4', side: 'black', description: 'Fianchetto and solid.', keyIdeas: ['b7 bishop', 'e4 control', 'Solid play'] },
  { name: 'Bogo-Indian Defense', files: ['Bogo4Bd2.pgn', 'Bogo4Nbd2.pgn'], eco: 'E11', category: 'd4', side: 'black', description: 'Flexible Bb4+ check.', keyIdeas: ['Flexibility', 'Solid', 'Transpositions'] },
  { name: 'Modern Benoni', files: ['ModernBenoni6e4.pgn', 'ModernBenoni6Nf3.pgn', 'BenkoGambit.pgn'], eco: 'A60', category: 'd4', side: 'black', description: 'Asymmetric queenside play.', keyIdeas: ['b5 expansion', 'Queenside counter', 'Dynamic'] },
  { name: 'Dutch Defense', files: ['DutchLeningrad.pgn', 'DutchClassical.pgn', 'Dutch3Nc3.pgn', 'DutchOther.pgn'], eco: 'A80', category: 'd4', side: 'black', description: 'Fight for e4 with f5.', keyIdeas: ['e4 control', 'Kingside play', 'Dynamic'] },
  
  // === FLANK OPENINGS (White) ===
  { name: 'English Opening', files: ['EnglishSymMain.pgn', 'EnglishSym3d4.pgn', 'EnglishSymOtherB3.pgn', 'EnglishSicRevClosed.pgn', 'EnglishSicRev4Knights.pgn', 'EnglishSicRev2g3.pgn', 'EnglishSicRevOtherB2.pgn', 'EnglishSymFourKnights.pgn', 'English1e6Main.pgn', 'English1e6-2Nc3-d5.pgn', 'English1e6-2Nf3-d5.pgn', 'EnglishSicRevBremen.pgn', 'English1b6.pgn', 'English1c6.pgn', 'English1f5.pgn', 'English1g6.pgn', 'English1Nf6-2g3.pgn', 'English1Nf6-2Nc3.pgn', 'English1Nf6-2Nf3.pgn', 'EnglishFlohr-Mikenas.pgn'], eco: 'A10', category: 'c4', side: 'white', description: 'Flexible flank opening.', keyIdeas: ['Flexibility', 'Transpositions', 'Central breaks'] },
  { name: 'Réti Opening', files: ['Reti2c4.pgn', 'Reti2b3.pgn'], eco: 'A04', category: 'nf3', side: 'white', description: 'Hypermodern control.', keyIdeas: ['Fianchetto', 'Central control', 'Flexibility'] },
  { name: 'Nimzo-Larsen Attack', files: ['Nimzowitsch-Larsen.pgn'], eco: 'A01', category: 'other', side: 'white', description: '1.b3 fianchetto.', keyIdeas: ['Long diagonal', 'Flexible', 'Surprise'] },
];

function extractMovesFromPgn(pgnContent: string): string[][] {
  const games: string[][] = [];
  
  // Split into individual games
  const gameBlocks = pgnContent.split(/(?=\[Event)/);
  
  for (const block of gameBlocks) {
    if (!block.trim() || !block.includes('[Event')) continue;
    
    // Find where headers end and moves begin (after last header line)
    const lines = block.split('\n');
    let moveStartIdx = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('[')) {
        moveStartIdx = i + 1;
      }
    }
    
    // Get move text
    let moveText = lines.slice(moveStartIdx).join(' ');
    
    // Remove comments and variations
    moveText = moveText.replace(/\{[^}]*\}/g, '');
    moveText = moveText.replace(/\([^)]*\)/g, '');
    // Remove results
    moveText = moveText.replace(/1-0|0-1|1\/2-1\/2|\*/g, '');
    // Remove move numbers with dots
    moveText = moveText.replace(/\d+\.\s*/g, ' ');
    moveText = moveText.replace(/\.\.\./g, '');
    // Clean up whitespace
    moveText = moveText.replace(/\s+/g, ' ').trim();
    
    const moves = moveText.split(' ').filter(m => m && m.length > 0);
    
    if (moves.length >= 10) {
      // Validate moves with chess.js
      const chess = new Chess();
      const validMoves: string[] = [];
      for (const move of moves.slice(0, 25)) {
        try {
          chess.move(move);
          validMoves.push(move);
        } catch {
          break;
        }
      }
      if (validMoves.length >= 10) {
        games.push(validMoves);
      }
    }
  }
  
  return games;
}

function getDifficulty(moves: string[]): 1 | 2 | 3 | 4 | 5 {
  const len = moves.length;
  if (len <= 12) return 1;
  if (len <= 16) return 2;
  if (len <= 20) return 3;
  if (len <= 24) return 4;
  return 5;
}

async function main() {
  const pgnDir = path.resolve('./pgnmentor-pgns');
  const allLines: OpeningLine[] = [];
  let idCounter = 5000;
  
  console.log('🎯 Generating comprehensive opening lines...\n');
  
  for (const def of OPENING_DEFS) {
    const seenLines = new Set<string>();
    let linesForOpening = 0;
    
    for (const file of def.files) {
      const filePath = path.join(pgnDir, file);
      if (!fs.existsSync(filePath)) continue;
      
      const content = fs.readFileSync(filePath, 'utf8');
      const games = extractMovesFromPgn(content);
      
      for (const moves of games) {
        // Create unique key from first 12 moves
        const key = moves.slice(0, 12).join(' ');
        if (seenLines.has(key)) continue;
        seenLines.add(key);
        
        // Get final position
        const chess = new Chess();
        for (const move of moves) {
          try { chess.move(move); } catch { break; }
        }
        
        // Extract variation name from file
        let variation = file.replace('.pgn', '')
          .replace(/([A-Z])/g, ' $1')
          .replace(/(\d+)/g, ' $1')
          .trim();
        
        const line: OpeningLine = {
          id: `gen-${idCounter++}`,
          name: def.name,
          variation,
          eco: def.eco,
          moves,
          fen: chess.fen(),
          description: def.description,
          keyIdeas: def.keyIdeas,
          difficulty: getDifficulty(moves),
          category: def.category,
          side: def.side,
        };
        
        allLines.push(line);
        linesForOpening++;
      }
    }
    
    console.log(`  ${def.name}: ${linesForOpening} lines`);
  }
  
  // Write output
  const outputPath = path.resolve('./src/data/openings/generated-openings.ts');
  const content = `// Auto-generated comprehensive opening lines
// Total: ${allLines.length} lines
import type { OpeningLine } from './index';

export const generatedOpenings: OpeningLine[] = ${JSON.stringify(allLines, null, 2)};

export default generatedOpenings;
`;
  
  fs.writeFileSync(outputPath, content, 'utf8');
  
  console.log(`\n✅ Generated ${allLines.length} opening lines!`);
  console.log(`📁 Output: ${outputPath}`);
}

main().catch(console.error);

