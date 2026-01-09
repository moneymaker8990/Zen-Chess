import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Import patterns directly
const filePath = join(dirname(fileURLToPath(import.meta.url)), '../src/data/positional/enhancedPatterns.ts');

// Read the file
let content = readFileSync(filePath, 'utf8');

// We need to evaluate the TypeScript file to get the patterns
// Since we can't easily eval TS, let's parse it manually
// Actually, let's use a simpler approach - import from the built JS if available, or parse the TS

// For now, let's parse the TypeScript file to find patterns with < 10 moves
const shortPatternIds = [];

// Find all pattern objects and count their mainLine moves
const patternRegex = /id:\s*['"]([^'"]+)['"].*?mainLine:\s*\[([^\]]*(?:\{[^}]*\}[^\]]*)*)\]/gs;
let match;

// Better approach: find each pattern block and count moves
const lines = content.split('\n');
let currentPattern = null;
let patternStart = -1;
let inMainLine = false;
let mainLineStart = -1;
let moveCount = 0;
let braceDepth = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Start of a pattern
  if (line.trim() === '{' && i + 1 < lines.length && lines[i + 1].trim().startsWith('id:')) {
    if (currentPattern && moveCount < 10) {
      shortPatternIds.push({
        id: currentPattern.id,
        start: patternStart,
        end: i - 1,
        moves: moveCount
      });
    }
    patternStart = i;
    currentPattern = { id: null };
    moveCount = 0;
    inMainLine = false;
  }
  
  // Extract ID
  if (currentPattern && line.includes('id:') && !currentPattern.id) {
    const idMatch = line.match(/id:\s*['"]([^'"]+)['"]/);
    if (idMatch) currentPattern.id = idMatch[1];
  }
  
  // Start of mainLine
  if (line.includes('mainLine: [')) {
    inMainLine = true;
    mainLineStart = i;
    moveCount = 0;
    braceDepth = 0;
  }
  
  // Count moves in mainLine - each move is an object with move: property
  if (inMainLine) {
    // Count opening braces
    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;
    
    // Check if this line starts a new move object
    if (line.includes('move:') && line.match(/move:\s*['"]/)) {
      // This might be a new move, but we need to check if we're in a nested structure
      if (braceDepth === 1) {
        moveCount++;
      }
    }
    
    braceDepth += openBraces - closeBraces;
    
    // End of mainLine
    if (line.includes('],')) {
      inMainLine = false;
    }
  }
  
  // End of pattern
  if (currentPattern && line.trim() === '}' && !inMainLine && i > patternStart) {
    if (moveCount < 10) {
      shortPatternIds.push({
        id: currentPattern.id,
        start: patternStart,
        end: i,
        moves: moveCount
      });
    }
    currentPattern = null;
  }
}

console.log(`Found ${shortPatternIds.length} patterns with < 10 moves`);
shortPatternIds.forEach(p => console.log(`  ${p.id}: ${p.moves} moves`));

// Now delete them - work backwards to preserve line numbers
shortPatternIds.sort((a, b) => b.start - a.start);

let deletedCount = 0;
for (const pattern of shortPatternIds) {
  // Delete from end to start
  const startLine = pattern.start;
  const endLine = pattern.end;
  const linesToDelete = endLine - startLine + 1;
  
  // Remove the lines
  const before = lines.slice(0, startLine);
  const after = lines.slice(endLine + 1);
  lines.splice(0, lines.length, ...before, ...after);
  
  deletedCount++;
  console.log(`Deleted ${pattern.id} (${pattern.moves} moves)`);
}

// Write back
writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log(`\nDeleted ${deletedCount} patterns with < 10 moves`);
