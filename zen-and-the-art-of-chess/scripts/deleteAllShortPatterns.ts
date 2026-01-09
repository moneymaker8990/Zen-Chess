import { enhancedPatterns, baseEnhancedPatterns } from '../src/data/positional/enhancedPatterns';
import { additionalPatterns } from '../src/data/positional/morePatterns';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Get all short pattern IDs
const shortPatternIds = new Set(
  enhancedPatterns
    .filter(p => p.mainLine.length < 10)
    .map(p => p.id)
);

console.log(`Found ${shortPatternIds.size} patterns with < 10 moves to delete`);

// Read files
const enhancedPath = join(__dirname, '../src/data/positional/enhancedPatterns.ts');
const morePath = join(__dirname, '../src/data/positional/morePatterns.ts');

let enhancedContent = readFileSync(enhancedPath, 'utf8');
let moreContent = readFileSync(morePath, 'utf8');

// Delete patterns from enhancedPatterns.ts
const enhancedLines = enhancedContent.split('\n');
const patternsToDelete: Array<{ start: number; end: number }> = [];

for (let i = 0; i < enhancedLines.length; i++) {
  for (const patternId of shortPatternIds) {
    const idRegex = new RegExp(`id:\\s*['"]${patternId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`);
    if (idRegex.test(enhancedLines[i])) {
      let start = i;
      let end = i;
      let braceDepth = 0;
      
      for (let j = i - 1; j >= 0; j--) {
        if (enhancedLines[j].trim() === '{') {
          start = j;
          braceDepth = 1;
          break;
        }
      }
      
      for (let j = start; j < enhancedLines.length; j++) {
        const open = (enhancedLines[j].match(/\{/g) || []).length;
        const close = (enhancedLines[j].match(/\}/g) || []).length;
        braceDepth += open - close;
        if (braceDepth === 0 && close > 0) {
          end = j;
          break;
        }
      }
      
      if (end > start) {
        patternsToDelete.push({ start, end });
      }
      break;
    }
  }
}

patternsToDelete.sort((a, b) => b.start - a.start);
for (const p of patternsToDelete) {
  enhancedLines.splice(p.start, p.end - p.start + 1);
}

// Delete patterns from morePatterns.ts
const moreLines = moreContent.split('\n');
const morePatternsToDelete: Array<{ start: number; end: number }> = [];

for (let i = 0; i < moreLines.length; i++) {
  for (const patternId of shortPatternIds) {
    const idRegex = new RegExp(`id:\\s*['"]${patternId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`);
    if (idRegex.test(moreLines[i])) {
      let start = i;
      let end = i;
      let braceDepth = 0;
      
      for (let j = i - 1; j >= 0; j--) {
        if (moreLines[j].trim() === '{') {
          start = j;
          braceDepth = 1;
          break;
        }
      }
      
      for (let j = start; j < moreLines.length; j++) {
        const open = (moreLines[j].match(/\{/g) || []).length;
        const close = (moreLines[j].match(/\}/g) || []).length;
        braceDepth += open - close;
        if (braceDepth === 0 && close > 0) {
          end = j;
          break;
        }
      }
      
      if (end > start) {
        morePatternsToDelete.push({ start, end });
      }
      break;
    }
  }
}

morePatternsToDelete.sort((a, b) => b.start - a.start);
for (const p of morePatternsToDelete) {
  moreLines.splice(p.start, p.end - p.start + 1);
}

// Write back
writeFileSync(enhancedPath, enhancedLines.join('\n'), 'utf8');
writeFileSync(morePath, moreLines.join('\n'), 'utf8');

console.log(`Deleted ${patternsToDelete.length} patterns from enhancedPatterns.ts`);
console.log(`Deleted ${morePatternsToDelete.length} patterns from morePatterns.ts`);
