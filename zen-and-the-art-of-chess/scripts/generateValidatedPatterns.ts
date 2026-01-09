/**
 * AI-Assisted Pattern Generation with Validation
 * Generates chess patterns and validates them immediately using chess.js
 */

import { Chess } from 'chess.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { EnhancedPattern, PositionalCategory } from '../src/data/positional/enhancedPatterns';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validate a pattern's moves are all legal
function validatePattern(pattern: EnhancedPattern): { valid: boolean; error?: string } {
  try {
    const game = new Chess(pattern.fen);
    
    // Verify FEN is valid
    if (!game.fen()) {
      return { valid: false, error: 'Invalid FEN' };
    }
    
    // Verify each move in mainLine
    for (let i = 0; i < pattern.mainLine.length; i++) {
      const move = pattern.mainLine[i].move;
      const result = game.move(move);
      
      if (!result) {
        const legalMoves = game.moves();
        return { 
          valid: false, 
          error: `Illegal move at index ${i}: "${move}". Legal moves: ${legalMoves.slice(0, 10).join(', ')}`
        };
      }
    }
    
    return { valid: true };
  } catch (error) {
    return { 
      valid: false, 
      error: error instanceof Error ? error.message : 'Unknown validation error'
    };
  }
}

// Generate patterns for OUTPOSTS category
function generateOutpostPatterns(): EnhancedPattern[] {
  const patterns: EnhancedPattern[] = [];
  
  // Pattern 1: Classic d5 Outpost for Knight
  patterns.push({
    id: 'outpost-d5-knight-classic',
    category: 'OUTPOSTS',
    title: 'The d5 Knight Outpost',
    subtitle: 'Dominating the center from d5',
    fen: 'r1bqkb1r/ppp2ppp/2np1n2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 6',
    toMove: 'white',
    introduction: 'The d5 square is a dream outpost for a knight in many openings. When Black has pawns on c6 and e6, the d5 square cannot be attacked by pawns, making it an ideal home for our knight.',
    keyIdeas: [
      'Identify squares that cannot be attacked by enemy pawns',
      'Place knights on these outpost squares',
      'Support the outpost with pieces, not pawns',
      'Use the outpost to control key central squares'
    ],
    mainLine: [
      {
        move: 'cxd5',
        isMainLine: true,
        annotation: '!',
        explanation: 'We exchange on d5 to open the c-file and prepare Nd5.',
        conceptTag: 'Exchange'
      },
      {
        move: 'cxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black recaptures, maintaining central presence.',
        conceptTag: ''
      },
      {
        move: 'Nxd5',
        isMainLine: true,
        annotation: '!!',
        explanation: 'Our knight lands on the perfect outpost! From d5, it controls c7, e7, f6, f4, e3, and c3.',
        arrows: [
          { from: 'd5', to: 'c7', color: 'green' },
          { from: 'd5', to: 'e7', color: 'green' },
          { from: 'd5', to: 'f6', color: 'green' }
        ],
        highlights: ['d5'],
        conceptTag: 'Outpost'
      },
      {
        move: 'Nxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'Black must exchange the knight to remove this strong piece.',
        conceptTag: ''
      },
      {
        move: 'Qxd5',
        isMainLine: true,
        annotation: '',
        explanation: 'We recapture with the queen, maintaining central control.',
        conceptTag: ''
      }
    ],
    summary: 'Outposts on the 5th rank, especially d5 and e5, are extremely powerful for knights. These squares provide control over key central squares and are difficult for the opponent to challenge.',
    keyTakeaways: [
      'Outposts are squares that cannot be attacked by enemy pawns',
      'Knights are ideal pieces for outposts',
      'The d5 and e5 squares are classic outpost squares',
      'Control of an outpost often leads to a lasting advantage'
    ],
    memoryTip: 'A knight on d5 is like a thorn in your opponent\'s position',
    difficulty: 2,
    estimatedMinutes: 5,
    source: 'Classical opening principles'
  });
  
  // Pattern 2: e5 Outpost in Italian Game
  patterns.push({
    id: 'outpost-e5-italian',
    category: 'OUTPOSTS',
    title: 'The e5 Outpost in the Italian',
    subtitle: 'Central knight domination',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    introduction: 'In the Italian Game, White often fights for the e5 square. A knight on e5 is a powerful piece that dominates the center and attacks f7.',
    keyIdeas: [
      'Fight for control of central outpost squares',
      'Use piece exchanges to clear the path to outposts',
      'Coordinate pieces to support outpost placement',
      'Exploit weak squares in the opponent\'s position'
    ],
    mainLine: [
      {
        move: 'd4',
        isMainLine: true,
        annotation: '!',
        explanation: 'We challenge Black\'s central pawn structure and open lines for our pieces.',
        conceptTag: 'Central Break'
      },
      {
        move: 'exd4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black accepts the challenge and captures.',
        conceptTag: ''
      },
      {
        move: 'Nxd4',
        isMainLine: true,
        annotation: '',
        explanation: 'We recapture with the knight, heading toward the e5 outpost.',
        conceptTag: ''
      },
      {
        move: 'Nxd4',
        isMainLine: true,
        annotation: '',
        explanation: 'Black exchanges knights.',
        conceptTag: ''
      },
      {
        move: 'Qxd4',
        isMainLine: true,
        annotation: '',
        explanation: 'We recapture, and now our pieces eye the weakened dark squares.',
        conceptTag: ''
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Black castles for king safety.',
        conceptTag: ''
      },
      {
        move: 'Nc3',
        isMainLine: true,
        annotation: '!',
        explanation: 'Developing with a plan - this knight can jump to e5 later, occupying the perfect outpost.',
        highlights: ['e5'],
        conceptTag: 'Development'
      }
    ],
    summary: 'The e5 square in the Italian Game is a classic outpost. By controlling this square with pieces and preventing Black from challenging it with pawns, White gains a long-term positional advantage.',
    keyTakeaways: [
      'Central outposts like e5 are worth fighting for',
      'Use pawn breaks to open lines and create outposts',
      'Coordinate multiple pieces to control outpost squares',
      'Outposts near the enemy king are especially dangerous'
    ],
    difficulty: 3,
    estimatedMinutes: 6,
    source: 'Italian Game theory'
  });
  
  return patterns;
}

// Generate patterns for WEAK_PAWNS category
function generateWeakPawnsPatterns(): EnhancedPattern[] {
  const patterns: EnhancedPattern[] = [];
  
  // Pattern 1: Isolated Queen's Pawn
  patterns.push({
    id: 'weak-pawns-iqp-attack',
    category: 'WEAK_PAWNS',
    title: 'Attacking the Isolated Queen Pawn',
    subtitle: 'Exploiting structural weakness',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/1bPP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 9',
    toMove: 'white',
    introduction: 'An isolated queen pawn (IQP) on d5 or d4 is a double-edged feature. While it provides space and piece activity, it\'s also a long-term weakness that can be attacked.',
    keyIdeas: [
      'Blockade isolated pawns by placing pieces in front of them',
      'Attack isolated pawns repeatedly with pieces',
      'Trade pieces to increase the weakness',
      'Prevent pawn breaks that would eliminate the weakness'
    ],
    mainLine: [
      {
        move: 'Be2',
        isMainLine: true,
        annotation: '',
        explanation: 'We develop our bishop, preparing to castle and establish a blockade on d5.',
        conceptTag: 'Development'
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'Black castles.',
        conceptTag: ''
      },
      {
        move: 'O-O',
        isMainLine: true,
        annotation: '',
        explanation: 'We castle as well, completing development.',
        conceptTag: 'King Safety'
      },
      {
        move: 'Rc8',
        isMainLine: true,
        annotation: '',
        explanation: 'Black develops the rook to c8.',
        conceptTag: ''
      },
      {
        move: 'Rc1',
        isMainLine: true,
        annotation: '!',
        explanation: 'We place our rook on the c-file, pressuring the c6 knight and preparing to attack the d5 pawn.',
        highlights: ['d5'],
        conceptTag: 'Rook Activity'
      }
    ],
    summary: 'Isolated pawns, especially the IQP, are chronic weaknesses. The key plan is to blockade the pawn, trade pieces, and attack it repeatedly until it falls or the opponent is tied down defending it.',
    keyTakeaways: [
      'Isolated pawns cannot be defended by other pawns',
      'Blockade isolated pawns with pieces, especially knights',
      'Trade pieces when you have the weakness',
      'Attack the weakness repeatedly from multiple angles'
    ],
    memoryTip: 'Isolated pawns are lonely - exploit their weakness!',
    difficulty: 3,
    estimatedMinutes: 5,
    source: 'IQP Theory'
  });
  
  return patterns;
}

// Main generation function
async function generateAndValidatePatterns() {
  console.log('🎯 Starting AI-Assisted Pattern Generation\n');
  console.log('Generating patterns with immediate validation...\n');
  
  const allPatterns: EnhancedPattern[] = [];
  const errors: Array<{ id: string; error: string }> = [];
  
  // Generate patterns for each category (will be expanded)
  const generators = [
    { name: 'OUTPOSTS', fn: generateOutpostPatterns },
    { name: 'WEAK_PAWNS', fn: generateWeakPawnsPatterns },
  ];
  
  console.log('Note: This is batch 1. We\'ll generate 2-3 patterns per category initially.');
  console.log('More patterns will be added in subsequent batches.\n');
  
  for (const { name, fn } of generators) {
    console.log(`\n📦 Generating ${name} patterns...`);
    const patterns = fn();
    
    // Validate each pattern immediately
    for (const pattern of patterns) {
      const validation = validatePattern(pattern);
      if (validation.valid) {
        allPatterns.push(pattern);
        console.log(`  ✅ ${pattern.id} - VALID`);
      } else {
        errors.push({ id: pattern.id, error: validation.error || 'Unknown error' });
        console.log(`  ❌ ${pattern.id} - INVALID: ${validation.error}`);
      }
    }
  }
  
  console.log(`\n${'='.repeat(70)}`);
  console.log('GENERATION SUMMARY');
  console.log('='.repeat(70));
  console.log(`✅ Valid patterns generated: ${allPatterns.length}`);
  console.log(`❌ Invalid patterns skipped: ${errors.length}`);
  
  if (errors.length > 0) {
    console.log(`\n⚠️  Errors found:`);
    errors.forEach(({ id, error }) => {
      console.log(`   ${id}: ${error}`);
    });
  }
  
  // Save to morePatterns.ts
  if (allPatterns.length > 0) {
    const morePatternsPath = path.join(__dirname, '../src/data/positional/morePatterns.ts');
    
    const patternCode = allPatterns.map(p => {
      const mainLineStr = JSON.stringify(p.mainLine, null, 2)
        .replace(/"(\w+)":/g, '$1:') // Remove quotes from keys
        .split('\n')
        .map(line => '    ' + line)
        .join('\n');
      
      return `  {
    id: '${p.id}',
    category: '${p.category}',
    title: ${JSON.stringify(p.title)},
    subtitle: ${JSON.stringify(p.subtitle)},
    fen: '${p.fen}',
    toMove: '${p.toMove}',
    introduction: ${JSON.stringify(p.introduction)},
    keyIdeas: ${JSON.stringify(p.keyIdeas, null, 2).split('\n').map((l, i) => i === 0 ? l : '    ' + l).join('\n')},
    mainLine: ${mainLineStr.trim()},
    summary: ${JSON.stringify(p.summary)},
    keyTakeaways: ${JSON.stringify(p.keyTakeaways, null, 2).split('\n').map((l, i) => i === 0 ? l : '    ' + l).join('\n')},
    ${p.memoryTip ? `memoryTip: ${JSON.stringify(p.memoryTip)},` : ''}
    difficulty: ${p.difficulty},
    estimatedMinutes: ${p.estimatedMinutes},
    ${p.source ? `source: ${JSON.stringify(p.source)},` : ''}
  }`;
    }).join(',\n\n');
    
    const fileContent = `// ============================================
// ADDITIONAL POSITIONAL PATTERNS
// AI-generated with chess.js validation
// All patterns verified to have legal moves
// ============================================

import type { EnhancedPattern } from './enhancedPatterns';

const additionalPatterns: EnhancedPattern[] = [
${patternCode}
];

export default additionalPatterns;
`;
    
    fs.writeFileSync(morePatternsPath, fileContent);
    console.log(`\n💾 Saved ${allPatterns.length} patterns to morePatterns.ts`);
    console.log(`\n✨ Run validation: npx tsx scripts/validatePatterns.ts`);
  }
  
  return { valid: allPatterns.length, invalid: errors.length };
}

// Run if executed directly
if (process.argv[1] && process.argv[1].includes('generateValidatedPatterns')) {
  generateAndValidatePatterns().catch(console.error);
}

export { generateAndValidatePatterns, validatePattern };
