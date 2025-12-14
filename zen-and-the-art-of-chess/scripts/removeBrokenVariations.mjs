/**
 * Remove Broken Variations Script
 * Reads the course-failures.json and removes broken variations from source files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load failures
const failures = JSON.parse(fs.readFileSync(path.join(__dirname, 'course-failures.json'), 'utf8'));

// Group failures by file
const failuresByFile = {};
for (const failure of failures) {
  if (!failuresByFile[failure.file]) {
    failuresByFile[failure.file] = [];
  }
  failuresByFile[failure.file].push(failure.id);
}

console.log('\n🔧 Removing broken variations...\n');

// Process each file
for (const [filename, ids] of Object.entries(failuresByFile)) {
  const coursesDir = path.join(__dirname, '../src/data/courses');
  const variationsDir = path.join(coursesDir, 'variations');
  
  // Find the file
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
    // Match the entire variation object by its id
    // This regex matches from { id: 'xxx' to the closing },
    const patterns = [
      // Standard multi-line format
      new RegExp(`\\{\\s*\\n?\\s*id:\\s*['"]${id}['"][\\s\\S]*?\\n\\s*\\},?\\n?`, 'g'),
      // Compact single-line format
      new RegExp(`\\{\\s*id:\\s*['"]${id}['"][^}]+\\},?\\s*`, 'g'),
    ];
    
    for (const pattern of patterns) {
      const before = content.length;
      content = content.replace(pattern, '');
      if (content.length < before) {
        removedCount++;
        break;
      }
    }
  }
  
  // Clean up any double commas or trailing commas before ]
  content = content.replace(/,\s*,/g, ',');
  content = content.replace(/,\s*\]/g, '\n]');
  content = content.replace(/\[\s*,/g, '[');
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ ${filename}: Removed ${removedCount} of ${ids.length} broken variations`);
}

console.log('\n✨ Done! Run validation again to verify.\n');
