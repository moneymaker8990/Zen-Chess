/**
 * Delete Broken Patterns Script
 * Removes all patterns that fail validation, keeping only valid patterns
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { enhancedPatterns } from '../src/data/positional/enhancedPatterns';
import { validatePattern } from './validatePatterns';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function deleteBrokenPatterns() {
  console.log('Validating all patterns...\n');
  
  const validPatterns: any[] = [];
  const brokenPatterns: any[] = [];
  const validByCategory: Record<string, number> = {};
  
  // Validate each pattern
  for (const pattern of enhancedPatterns) {
    const result = validatePattern(pattern);
    if (result.valid) {
      validPatterns.push(pattern);
      validByCategory[pattern.category] = (validByCategory[pattern.category] || 0) + 1;
    } else {
      brokenPatterns.push(pattern);
    }
  }
  
  console.log('='.repeat(70));
  console.log('VALIDATION RESULTS');
  console.log('='.repeat(70));
  console.log(`Total patterns: ${enhancedPatterns.length}`);
  console.log(`Valid patterns: ${validPatterns.length}`);
  console.log(`Broken patterns to delete: ${brokenPatterns.length}`);
  console.log();
  
  console.log('Valid patterns by category:');
  console.log('-'.repeat(70));
  Object.entries(validByCategory)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([category, count]) => {
      console.log(`  ${category.padEnd(25)} ${count} valid`);
    });
  console.log();
  
  // Calculate how many patterns need to be generated per category
  const categories = [
    'OUTPOSTS', 'WEAK_PAWNS', 'PAWN_STRUCTURE', 'OPEN_FILES', 'BISHOP_PAIR',
    'GOOD_BAD_BISHOP', 'KNIGHT_PLACEMENT', 'SPACE_ADVANTAGE', 'PIECE_COORDINATION',
    'PROPHYLAXIS', 'MINORITY_ATTACK', 'PAWN_BREAKS', 'KING_ACTIVITY',
    'EXCHANGE_STRATEGY', 'BLOCKADE', 'CENTRALIZATION'
  ];
  
  console.log('Patterns needed per category (to reach 15):');
  console.log('-'.repeat(70));
  let totalNeeded = 0;
  categories.forEach(category => {
    const valid = validByCategory[category] || 0;
    const needed = Math.max(0, 15 - valid);
    totalNeeded += needed;
    if (needed > 0) {
      console.log(`  ${category.padEnd(25)} needs ${needed} patterns (has ${valid})`);
    }
  });
  console.log();
  console.log(`Total new patterns needed: ${totalNeeded}`);
  console.log();
  
  // Now create new files with only valid patterns
  console.log('Creating backup of original files...');
  
  const enhancedPatternsPath = path.join(__dirname, '../src/data/positional/enhancedPatterns.ts');
  const morePatternsPath = path.join(__dirname, '../src/data/positional/morePatterns.ts');
  
  // Backup original files
  const backupDir = path.join(__dirname, '../src/data/positional/backup');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  fs.copyFileSync(
    enhancedPatternsPath,
    path.join(backupDir, `enhancedPatterns.${timestamp}.ts`)
  );
  fs.copyFileSync(
    morePatternsPath,
    path.join(backupDir, `morePatterns.${timestamp}.ts`)
  );
  
  console.log(`Backups created in: ${backupDir}`);
  console.log();
  
  // Read the original file to preserve imports and types
  const enhancedPatternsContent = fs.readFileSync(enhancedPatternsPath, 'utf-8');
  
  // Extract the header (everything before the patterns array)
  const headerMatch = enhancedPatternsContent.match(/([\s\S]*?const enhancedPatterns: EnhancedPattern\[\] = \[)/);
  const header = headerMatch ? headerMatch[1] : '';
  
  // Create new file with only valid patterns
  const validPatternsStr = validPatterns.map(p => {
    return `  {
    id: '${p.id}',
    category: '${p.category}',
    title: '${p.title.replace(/'/g, "\\'")}',
    ${p.subtitle ? `subtitle: '${p.subtitle.replace(/'/g, "\\'")}',` : ''}
    fen: '${p.fen}',
    toMove: '${p.toMove}',
    introduction: '${p.introduction.replace(/'/g, "\\'")}',
    keyIdeas: ${JSON.stringify(p.keyIdeas)},
    mainLine: ${JSON.stringify(p.mainLine, null, 6).replace(/"([^"]+)":/g, '$1:')},
    summary: '${p.summary.replace(/'/g, "\\'")}',
    keyTakeaways: ${JSON.stringify(p.keyTakeaways)},
    ${p.memoryTip ? `memoryTip: '${p.memoryTip.replace(/'/g, "\\'")}',` : ''}
    difficulty: ${p.difficulty},
    estimatedMinutes: ${p.estimatedMinutes},
    ${p.source ? `source: '${p.source.replace(/'/g, "\\'")}',` : ''}
    ${p.playerExample ? `playerExample: ${JSON.stringify(p.playerExample)},` : ''}
    ${p.themes ? `themes: ${JSON.stringify(p.themes)},` : ''}
  }`;
  }).join(',\n\n');
  
  // Write the new file content (just overwrite morePatterns.ts since it's smaller)
  const newMorePatternsContent = `// ============================================
// ADDITIONAL POSITIONAL PATTERNS
// Valid patterns only - all broken patterns removed
// ============================================

import type { EnhancedPattern } from './enhancedPatterns';

const additionalPatterns: EnhancedPattern[] = [
${validPatternsStr}
];

export default additionalPatterns;
`;
  
  fs.writeFileSync(morePatternsPath, newMorePatternsContent);
  
  // Clear the enhancedPatterns.ts main array (we'll use only morePatterns)
  const newEnhancedPatternsContent = enhancedPatternsContent.replace(
    /const enhancedPatterns: EnhancedPattern\[\] = \[[\s\S]*?\];/,
    `const enhancedPatterns: EnhancedPattern[] = [...additionalPatterns];`
  );
  
  // Add import for additionalPatterns if not present
  let finalEnhancedContent = newEnhancedPatternsContent;
  if (!finalEnhancedContent.includes('import additionalPatterns')) {
    finalEnhancedContent = finalEnhancedContent.replace(
      /(import type { PatternType } from '@\/lib\/types';)/,
      `$1\nimport additionalPatterns from './morePatterns';`
    );
  }
  
  fs.writeFileSync(enhancedPatternsPath, finalEnhancedContent);
  
  console.log('='.repeat(70));
  console.log('FILES UPDATED');
  console.log('='.repeat(70));
  console.log(`✓ Updated: ${enhancedPatternsPath}`);
  console.log(`✓ Updated: ${morePatternsPath}`);
  console.log(`✓ Valid patterns: ${validPatterns.length}`);
  console.log(`✓ Broken patterns removed: ${brokenPatterns.length}`);
  console.log();
  console.log('Next steps:');
  console.log(`  1. Generate ${totalNeeded} new patterns to reach 15 per category`);
  console.log('  2. Run validation to confirm all patterns are now valid');
  console.log();
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}`) {
  deleteBrokenPatterns().catch(console.error);
}

export { deleteBrokenPatterns };
