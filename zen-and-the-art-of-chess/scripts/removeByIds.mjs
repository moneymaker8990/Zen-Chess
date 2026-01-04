/**
 * Remove variations by ID
 * Uses the broken-variations-report.json to remove specific variations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the broken variations report
const report = JSON.parse(fs.readFileSync(path.join(__dirname, 'broken-variations-report.json'), 'utf8'));

// Group by file
const byFile = {};
for (const item of report) {
  if (!byFile[item.file]) byFile[item.file] = [];
  byFile[item.file].push(item.id);
}

console.log('\n🔧 Removing broken variations by ID...\n');

const coursesDir = path.join(__dirname, '../src/data/courses');
const variationsDir = path.join(coursesDir, 'variations');

let totalRemoved = 0;

for (const [filename, ids] of Object.entries(byFile)) {
  let filePath = path.join(coursesDir, filename);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(variationsDir, filename);
  }
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filename}`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let removedCount = 0;
  
  for (const id of ids) {
    // Find the variation block by its ID
    // Match from { ... id: 'xxx' ... } to closing brace at same level
    const idRegex = new RegExp(`id:\\s*['"]${id}['"]`);
    const match = content.match(idRegex);
    
    if (!match) continue;
    
    // Find the opening brace before this id
    let startIdx = match.index;
    while (startIdx > 0 && content[startIdx] !== '{') {
      startIdx--;
    }
    
    // Now find the matching closing brace
    let braceCount = 0;
    let endIdx = startIdx;
    for (let i = startIdx; i < content.length; i++) {
      if (content[i] === '{') braceCount++;
      else if (content[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
          endIdx = i + 1;
          break;
        }
      }
    }
    
    if (endIdx > startIdx) {
      // Remove the block plus trailing comma/whitespace
      let removeEnd = endIdx;
      while (removeEnd < content.length && /[\s,]/.test(content[removeEnd])) {
        removeEnd++;
      }
      
      // Also remove leading whitespace
      let removeStart = startIdx;
      while (removeStart > 0 && /[\s]/.test(content[removeStart - 1]) && content[removeStart - 1] !== '[' && content[removeStart - 1] !== ',') {
        removeStart--;
      }
      // If there's a comma before, remove it too
      if (removeStart > 0 && content[removeStart - 1] === ',') {
        removeStart--;
      }
      
      content = content.slice(0, removeStart) + content.slice(removeEnd);
      removedCount++;
    }
  }
  
  // Clean up
  content = content
    .replace(/,\s*,/g, ',')
    .replace(/\[\s*,/g, '[')
    .replace(/,\s*\]/g, '\n]')
    .replace(/\n{3,}/g, '\n\n');
  
  fs.writeFileSync(filePath, content);
  console.log(`${filename}: removed ${removedCount}/${ids.length}`);
  totalRemoved += removedCount;
}

console.log(`\n📊 Total removed: ${totalRemoved}`);
console.log('\n✅ Done! Run validation again to verify.\n');


