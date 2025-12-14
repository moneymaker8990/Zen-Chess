/**
 * Lichess Puzzle Downloader and Converter
 * 
 * Downloads puzzles from Lichess database and converts them to our app's format.
 * Lichess puzzles are guaranteed to have legal moves.
 * 
 * Lichess CSV format:
 * PuzzleId,FEN,Moves,Rating,RatingDeviation,Popularity,NbPlays,Themes,GameUrl,OpeningTags
 * 
 * Moves are in UCI format (e2e4 e7e5) - we need to convert to SAN (e4 e5)
 */

import { Chess } from 'chess.js';
import * as fs from 'fs';
import * as path from 'path';

// Theme mapping from Lichess to our PatternType
const LICHESS_TO_PATTERN: Record<string, string> = {
  'fork': 'FORK',
  'pin': 'PIN',
  'skewer': 'SKEWER',
  'discoveredAttack': 'DISCOVERY',
  'deflection': 'DEFLECTION',
  'attraction': 'DECOY',
  'quietMove': 'QUIET_MOVE',
  'intermezzo': 'ZWISCHENZUG',
  'backRankMate': 'BACK_RANK',
  'mateIn1': 'MATE_PATTERN',
  'mateIn2': 'MATE_PATTERN',
  'mateIn3': 'MATE_PATTERN',
  'mateIn4': 'MATE_PATTERN',
  'mateIn5': 'MATE_PATTERN',
  'smotheredMate': 'MATE_PATTERN',
  'arabianMate': 'MATE_PATTERN',
  'anastasiasMate': 'MATE_PATTERN',
  'sacrifice': 'SACRIFICE',
  'xRayAttack': 'SKEWER',
  'doubleCheck': 'DISCOVERY',
  'exposedKing': 'TACTICAL',
  'hangingPiece': 'TACTICAL',
  'trappedPiece': 'TACTICAL',
  'advancedPawn': 'TACTICAL',
  'passedPawn': 'TACTICAL',
  'promotion': 'TACTICAL',
  'endgame': 'TACTICAL',
  'pawnEndgame': 'TACTICAL',
  'rookEndgame': 'TACTICAL',
  'bishopEndgame': 'TACTICAL',
  'knightEndgame': 'TACTICAL',
  'queenEndgame': 'TACTICAL',
  'defensiveMove': 'TACTICAL',
  'crushing': 'TACTICAL',
  'advantage': 'TACTICAL',
  'equality': 'TACTICAL',
  'capturingDefender': 'DEFLECTION',
  'clearance': 'TACTICAL',
  'interference': 'TACTICAL',
  'kingsideAttack': 'TACTICAL',
  'queensideAttack': 'TACTICAL',
  'attackingF7f2': 'TACTICAL',
  'long': 'TACTICAL',
  'veryLong': 'TACTICAL',
  'short': 'TACTICAL',
  'oneMove': 'TACTICAL',
  'master': 'TACTICAL',
  'masterVsMaster': 'TACTICAL',
  'middlegame': 'TACTICAL',
  'opening': 'TACTICAL',
};

interface LichessPuzzle {
  puzzleId: string;
  fen: string;
  moves: string; // UCI format separated by spaces
  rating: number;
  themes: string[];
  gameUrl: string;
}

interface ConvertedPuzzle {
  id: string;
  fen: string;
  solution: string[];
  themes: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  rating: number;
  title?: string;
  explanation?: string;
  source: string;
}

/**
 * Convert UCI move to SAN using chess.js
 */
function uciToSan(game: Chess, uci: string): string | null {
  try {
    const from = uci.substring(0, 2);
    const to = uci.substring(2, 4);
    const promotion = uci.length > 4 ? uci[4] : undefined;
    
    const move = game.move({ from, to, promotion });
    if (!move) return null;
    return move.san;
  } catch {
    return null;
  }
}

/**
 * Convert rating to difficulty (1-5)
 */
function ratingToDifficulty(rating: number): 1 | 2 | 3 | 4 | 5 {
  if (rating < 1000) return 1;
  if (rating < 1400) return 2;
  if (rating < 1800) return 3;
  if (rating < 2200) return 4;
  return 5;
}

/**
 * Map Lichess themes to our PatternType
 */
function mapThemes(lichessThemes: string[]): string[] {
  const mapped = new Set<string>();
  for (const theme of lichessThemes) {
    const pattern = LICHESS_TO_PATTERN[theme];
    if (pattern) {
      mapped.add(pattern);
    }
  }
  // Default to TACTICAL if no themes matched
  if (mapped.size === 0) {
    mapped.add('TACTICAL');
  }
  return Array.from(mapped);
}

/**
 * Convert a Lichess puzzle to our format
 */
function convertPuzzle(puzzle: LichessPuzzle): ConvertedPuzzle | null {
  try {
    const game = new Chess(puzzle.fen);
    const uciMoves = puzzle.moves.split(' ');
    const sanMoves: string[] = [];
    
    // The first move in Lichess puzzles is the opponent's move that sets up the puzzle
    // We skip it and start from the position after that move
    if (uciMoves.length < 2) return null;
    
    // Make the setup move
    const setupSan = uciToSan(game, uciMoves[0]);
    if (!setupSan) return null;
    
    // Now convert the solution moves (everything after the first move)
    for (let i = 1; i < uciMoves.length; i++) {
      const san = uciToSan(game, uciMoves[i]);
      if (!san) {
        console.warn(`Invalid move ${uciMoves[i]} in puzzle ${puzzle.puzzleId}`);
        return null;
      }
      sanMoves.push(san);
    }
    
    if (sanMoves.length === 0) return null;
    
    return {
      id: `lc-${puzzle.puzzleId}`,
      fen: game.fen(), // Position after setup move (puzzle starting position)
      solution: sanMoves,
      themes: mapThemes(puzzle.themes),
      difficulty: ratingToDifficulty(puzzle.rating),
      rating: puzzle.rating,
      source: puzzle.gameUrl,
    };
  } catch (e) {
    console.warn(`Error converting puzzle ${puzzle.puzzleId}:`, e);
    return null;
  }
}

/**
 * Parse CSV line (handles quoted fields)
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

/**
 * Read and parse Lichess puzzle CSV
 */
function parseLichessCSV(csvContent: string): LichessPuzzle[] {
  const lines = csvContent.split('\n');
  const puzzles: LichessPuzzle[] = [];
  
  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const fields = parseCSVLine(line);
    if (fields.length < 8) continue;
    
    puzzles.push({
      puzzleId: fields[0],
      fen: fields[1],
      moves: fields[2],
      rating: parseInt(fields[3], 10),
      themes: fields[7].split(' ').filter(t => t.length > 0),
      gameUrl: fields[8] || '',
    });
  }
  
  return puzzles;
}

/**
 * Filter puzzles by themes and rating
 */
function filterPuzzles(
  puzzles: LichessPuzzle[],
  themes: string[],
  minRating: number = 800,
  maxRating: number = 2200,
  limit: number = 50
): LichessPuzzle[] {
  return puzzles
    .filter(p => p.rating >= minRating && p.rating <= maxRating)
    .filter(p => themes.length === 0 || p.themes.some(t => themes.includes(t)))
    .slice(0, limit);
}

/**
 * Generate TypeScript file with puzzles
 */
function generatePuzzleFile(puzzles: ConvertedPuzzle[]): string {
  const puzzleStrings = puzzles.map(p => `  {
    id: '${p.id}',
    fen: '${p.fen}',
    solution: [${p.solution.map(m => `'${m}'`).join(', ')}],
    themes: [${p.themes.map(t => `'${t}'`).join(', ')}] as PatternType[],
    difficulty: ${p.difficulty} as const,
    title: '${p.themes[0]} Puzzle',
    explanation: 'Find the best move in this position.',
    source: '${p.source}',
  }`).join(',\n');

  return `// ============================================
// VERIFIED LICHESS PUZZLES
// All puzzles validated with legal moves
// ============================================

import type { PatternType } from '@/lib/types';

export interface LichessPuzzle {
  id: string;
  fen: string;
  solution: string[];
  themes: PatternType[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  title?: string;
  explanation?: string;
  source?: string;
}

export const verifiedPuzzles: LichessPuzzle[] = [
${puzzleStrings}
];

// Filter helpers
export function getPuzzlesByTheme(theme: PatternType): LichessPuzzle[] {
  return verifiedPuzzles.filter(p => p.themes.includes(theme));
}

export function getPuzzlesByDifficulty(difficulty: 1 | 2 | 3 | 4 | 5): LichessPuzzle[] {
  return verifiedPuzzles.filter(p => p.difficulty === difficulty);
}

export function getPuzzlesByThemes(themes: PatternType[]): LichessPuzzle[] {
  return verifiedPuzzles.filter(p => p.themes.some(t => themes.includes(t)));
}

export default verifiedPuzzles;
`;
}

// Main execution
async function main() {
  console.log('Lichess Puzzle Downloader');
  console.log('========================\n');
  
  // Check if we have a local CSV file
  const csvPath = path.join(__dirname, 'lichess_puzzles.csv');
  
  if (!fs.existsSync(csvPath)) {
    console.log('No local puzzle file found.');
    console.log('To use this script:');
    console.log('1. Download puzzles from https://database.lichess.org/#puzzles');
    console.log('2. Extract the CSV and save as scripts/lichess_puzzles.csv');
    console.log('3. Run this script again\n');
    console.log('Alternatively, the verified-puzzles.ts file includes curated puzzles.');
    return;
  }
  
  console.log('Reading puzzle file...');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const puzzles = parseLichessCSV(csvContent);
  console.log(`Parsed ${puzzles.length} puzzles\n`);
  
  // Define theme groups for each course chapter
  const themeGroups = [
    { name: 'pins', themes: ['pin'], count: 30 },
    { name: 'skewers', themes: ['skewer', 'xRayAttack'], count: 30 },
    { name: 'forks', themes: ['fork'], count: 40 },
    { name: 'backRank', themes: ['backRankMate'], count: 30 },
    { name: 'discovery', themes: ['discoveredAttack', 'doubleCheck'], count: 30 },
    { name: 'deflection', themes: ['deflection', 'attraction'], count: 30 },
    { name: 'mateIn1', themes: ['mateIn1'], count: 40 },
    { name: 'mateIn2', themes: ['mateIn2'], count: 40 },
    { name: 'mateIn3', themes: ['mateIn3'], count: 30 },
    { name: 'sacrifice', themes: ['sacrifice'], count: 50 },
    { name: 'quietMove', themes: ['quietMove'], count: 20 },
    { name: 'zwischenzug', themes: ['intermezzo'], count: 20 },
    { name: 'endgame', themes: ['endgame', 'pawnEndgame', 'rookEndgame'], count: 60 },
    { name: 'defense', themes: ['defensiveMove'], count: 30 },
  ];
  
  const allConverted: ConvertedPuzzle[] = [];
  
  for (const group of themeGroups) {
    console.log(`Processing ${group.name}...`);
    const filtered = filterPuzzles(puzzles, group.themes, 800, 2200, group.count * 2);
    
    let converted = 0;
    for (const puzzle of filtered) {
      if (converted >= group.count) break;
      const result = convertPuzzle(puzzle);
      if (result) {
        allConverted.push(result);
        converted++;
      }
    }
    console.log(`  -> Converted ${converted}/${group.count} puzzles`);
  }
  
  console.log(`\nTotal converted: ${allConverted.length} puzzles`);
  
  // Generate output file
  const outputPath = path.join(__dirname, '..', 'src', 'data', 'puzzles', 'verified-puzzles.ts');
  const fileContent = generatePuzzleFile(allConverted);
  fs.writeFileSync(outputPath, fileContent);
  console.log(`\nWritten to ${outputPath}`);
}

main().catch(console.error);
