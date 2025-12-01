import fs from 'fs';
import path from 'path';
import { Chess } from 'chess.js';

const PGN_DIR = './pgnmentor-pgns';

// Opening categories with their files
const OPENINGS = {
  // E4 WHITE
  'Italian Game': { files: ['GiuocoPiano.pgn', 'TwoKnights.pgn'], eco: 'C50', cat: 'e4', side: 'white', desc: 'Classical development with Bc4.' },
  'Scotch Game': { files: ['Scotch4Bc5.pgn', 'Scotch4Nf6.pgn', 'ScotchOther4.pgn'], eco: 'C45', cat: 'e4', side: 'white', desc: 'Open center early.' },
  'Vienna Game': { files: ['Vienna.pgn'], eco: 'C25', cat: 'e4', side: 'white', desc: 'Delay Nf3, play f4.' },
  "King's Gambit": { files: ['KingsGambit.pgn'], eco: 'C30', cat: 'e4', side: 'white', desc: 'Gambit the f-pawn.' },
  
  // E4 BLACK  
  'French Defense': { files: ['FrWinawerMain.pgn', 'FrenchClassical.pgn', 'FrenchAdvance.pgn', 'FrTarrasch3c5.pgn', 'FrTarrasch3Nf6.pgn', 'FrenchRubinstein.pgn', 'FrenchBurn.pgn', 'FrenchMacCutcheon.pgn', 'FrenchSteinitz.pgn'], eco: 'C00', cat: 'e4', side: 'black', desc: 'Solid fortress.' },
  'Caro-Kann Defense': { files: ['Caro-KannClassic.pgn', 'Caro-KannAdv.pgn', 'Caro-KannPan-Bot.pgn', 'Caro-Kann4Nd7.pgn', 'Caro-Kann4Nf6.pgn', 'Caro-KannEx.pgn'], eco: 'B10', cat: 'e4', side: 'black', desc: 'Solid as granite.' },
  'Alekhine Defense': { files: ['AlekhineModern.pgn', 'Alekhine4Pawns.pgn', 'AlekhineExchange.pgn'], eco: 'B02', cat: 'e4', side: 'black', desc: 'Provoke the pawns.' },
  'Scandinavian Defense': { files: ['Scand2Qxd5-3Qa5.pgn', 'Scand3Qd6-Qd8.pgn', 'Scand2Nf6-3d4.pgn'], eco: 'B01', cat: 'e4', side: 'black', desc: 'Strike with d5.' },
  'Pirc Defense': { files: ['PircClassical.pgn', 'PircAustrian.pgn'], eco: 'B07', cat: 'e4', side: 'black', desc: 'Fianchetto Bg7.' },
  'Modern Defense': { files: ['Modern3Nc3-d6.pgn', 'Modern3Nf3.pgn'], eco: 'B06', cat: 'e4', side: 'black', desc: 'Flexible g6.' },
  'Petrov Defense': { files: ['PetroffMain.pgn'], eco: 'C42', cat: 'e4', side: 'black', desc: 'Symmetrical reply.' },
  
  // D4 WHITE
  'London System': { files: ['London2e6.pgn', 'London2g6.pgn'], eco: 'D02', cat: 'd4', side: 'white', desc: 'Solid Bf4 system.' },
  'Trompowsky Attack': { files: ['Trompowsky2e6.pgn', 'Trompowsky2Ne4.pgn'], eco: 'A45', cat: 'd4', side: 'white', desc: 'Early Bg5 pin.' },
  'Torre Attack': { files: ['Torre2e6.pgn', 'Torre2g6.pgn'], eco: 'A46', cat: 'd4', side: 'white', desc: 'Bg5 system.' },
  'Catalan Opening': { files: ['CatalanOpen.pgn', 'CatalanClosed.pgn', 'Catalan3Bb4.pgn', 'Catalan3c5.pgn'], eco: 'E00', cat: 'd4', side: 'white', desc: 'Fianchetto pressure.' },
  
  // D4 BLACK
  'Dutch Defense': { files: ['DutchLeningrad.pgn', 'DutchClassical.pgn'], eco: 'A80', cat: 'd4', side: 'black', desc: 'Fight for e4 with f5.' },
  "Queen's Indian Defense": { files: ['QID4g3-Ba6.pgn', 'QID4a3.pgn', 'QID4Nc3.pgn'], eco: 'E12', cat: 'd4', side: 'black', desc: 'Solid b6 setup.' },
  'Bogo-Indian Defense': { files: ['Bogo4Bd2.pgn', 'Bogo4Nbd2.pgn'], eco: 'E11', cat: 'd4', side: 'black', desc: 'Flexible Bb4+ check.' },
  'Modern Benoni': { files: ['ModernBenoni6e4.pgn', 'ModernBenoni6Nf3.pgn', 'BenkoGambit.pgn'], eco: 'A60', cat: 'd4', side: 'black', desc: 'Queenside counter.' },
  
  // FLANK
  'Réti Opening': { files: ['Reti2c4.pgn', 'Reti2b3.pgn'], eco: 'A04', cat: 'nf3', side: 'white', desc: 'Hypermodern control.' },
};

function parseGame(pgn) {
  const lines = pgn.split('\n');
  let moveText = '';
  let inMoves = false;
  
  for (const line of lines) {
    if (line.startsWith('[')) continue;
    if (line.trim()) {
      moveText += ' ' + line;
      inMoves = true;
    }
  }
  
  // Clean move text
  moveText = moveText
    .replace(/\{[^}]*\}/g, '')  // Remove comments
    .replace(/\([^)]*\)/g, '')  // Remove variations
    .replace(/\d+\./g, ' ')     // Remove move numbers
    .replace(/1-0|0-1|1\/2-1\/2|\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  const tokens = moveText.split(' ').filter(t => t && t.length > 0);
  
  // Validate with chess.js
  const chess = new Chess();
  const moves = [];
  
  for (const token of tokens.slice(0, 24)) {
    try {
      chess.move(token);
      moves.push(token);
    } catch {
      break;
    }
  }
  
  return moves.length >= 8 ? { moves, fen: chess.fen() } : null;
}

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return [];
  
  const content = fs.readFileSync(filePath, 'utf8');
  const games = content.split(/(?=\[Event)/);
  const results = [];
  
  for (const game of games) {
    if (!game.includes('[Event')) continue;
    const parsed = parseGame(game);
    if (parsed) results.push(parsed);
  }
  
  return results;
}

// Main
const allLines = [];
let id = 10000;

for (const [name, config] of Object.entries(OPENINGS)) {
  const seen = new Set();
  let count = 0;
  
  for (const file of config.files) {
    const games = processFile(path.join(PGN_DIR, file));
    
    for (const game of games) {
      const key = game.moves.slice(0, 10).join(' ');
      if (seen.has(key)) continue;
      seen.add(key);
      
      allLines.push({
        id: `pgn-${id++}`,
        name,
        variation: file.replace('.pgn', '').replace(/([A-Z])/g, ' $1').trim(),
        eco: config.eco,
        moves: game.moves,
        fen: game.fen,
        description: config.desc,
        keyIdeas: ['Central control', 'Development', 'King safety'],
        difficulty: Math.min(5, Math.ceil(game.moves.length / 5)),
        category: config.cat,
        side: config.side,
      });
      count++;
    }
  }
  
  console.log(`${name}: ${count} lines`);
}

// Write output
const output = `// Generated opening lines from PGN files
// Total: ${allLines.length} lines

import type { OpeningLine } from './index';

export const pgnOpenings: OpeningLine[] = ${JSON.stringify(allLines, null, 2)};

export default pgnOpenings;
`;

fs.writeFileSync('./src/data/openings/pgn-openings.ts', output);
console.log(`\n✅ Total: ${allLines.length} lines written to pgn-openings.ts`);

