import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Function to find pattern boundaries more accurately
function findPatternBoundaries(lines, startIdx) {
  let braceDepth = 0;
  let foundStart = false;
  let start = startIdx;
  let end = startIdx;
  
  // Go backwards to find the opening brace
  for (let j = startIdx; j >= 0; j--) {
    const line = lines[j].trim();
    if (line === '{') {
      start = j;
      foundStart = true;
      break;
    }
    // Stop if we hit another pattern's closing or a comment section
    if (line === '},' || line === '},') {
      break;
    }
  }
  
  if (!foundStart) return null;
  
  // Count braces from start to find the end
  braceDepth = 0;
  for (let j = start; j < lines.length; j++) {
    const line = lines[j];
    const opens = (line.match(/\{/g) || []).length;
    const closes = (line.match(/\}/g) || []).length;
    braceDepth += opens - closes;
    
    if (braceDepth === 0 && closes > 0) {
      end = j;
      break;
    }
  }
  
  return { start, end };
}

// Function to count moves in a pattern block
function countMoves(lines, start, end) {
  let count = 0;
  let inMainLine = false;
  let braceDepth = 0;
  
  for (let i = start; i <= end; i++) {
    const line = lines[i];
    
    if (line.includes('mainLine:')) {
      inMainLine = true;
      braceDepth = 0;
    }
    
    if (inMainLine) {
      // Count move objects - look for "move:" at depth 1 within mainLine
      if (line.match(/^\s+move:\s*['"]/) && braceDepth === 1) {
        count++;
      }
      
      const opens = (line.match(/\{/g) || []).length;
      const closes = (line.match(/\}/g) || []).length;
      braceDepth += opens - closes;
      
      // End of mainLine array
      if (line.includes('],') && braceDepth <= 0) {
        inMainLine = false;
      }
    }
  }
  
  return count;
}

// Process a file
function processFile(filePath, arrayName) {
  console.log(`\nProcessing ${filePath}...`);
  
  let content = readFileSync(filePath, 'utf8');
  let lines = content.split('\n');
  
  // Find all patterns and their move counts
  const patterns = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const idMatch = line.match(/^\s+id:\s*['"]([^'"]+)['"]/);
    
    if (idMatch) {
      const id = idMatch[1];
      const bounds = findPatternBoundaries(lines, i);
      
      if (bounds) {
        const moveCount = countMoves(lines, bounds.start, bounds.end);
        patterns.push({
          id,
          start: bounds.start,
          end: bounds.end,
          moves: moveCount
        });
      }
    }
  }
  
  // Find patterns with < 10 moves
  const toDelete = patterns.filter(p => p.moves < 10);
  const toKeep = patterns.filter(p => p.moves >= 10);
  
  console.log(`Found ${patterns.length} patterns total`);
  console.log(`Keeping ${toKeep.length} patterns (>= 10 moves)`);
  console.log(`Deleting ${toDelete.length} patterns (< 10 moves)`);
  
  if (toDelete.length === 0) {
    console.log('No patterns to delete.');
    return 0;
  }
  
  // Sort by start line descending to delete from end to beginning
  toDelete.sort((a, b) => b.start - a.start);
  
  // Delete each pattern
  for (const pattern of toDelete) {
    console.log(`  Deleting: ${pattern.id} (${pattern.moves} moves) - lines ${pattern.start + 1}-${pattern.end + 1}`);
    lines.splice(pattern.start, pattern.end - pattern.start + 1);
  }
  
  // Write back
  writeFileSync(filePath, lines.join('\n'), 'utf8');
  
  return toDelete.length;
}

// Main
const enhancedPath = join(__dirname, '../src/data/positional/enhancedPatterns.ts');
const morePath = join(__dirname, '../src/data/positional/morePatterns.ts');

let totalDeleted = 0;

totalDeleted += processFile(enhancedPath, 'baseEnhancedPatterns');
totalDeleted += processFile(morePath, 'additionalPatterns');

console.log(`\n=== Total deleted: ${totalDeleted} patterns ===`);
