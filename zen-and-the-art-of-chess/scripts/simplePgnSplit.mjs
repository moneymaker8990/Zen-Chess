// Test: How to properly split the PGN file
import fs from 'fs';

const pgnContent = fs.readFileSync('data/pgns/alekhine/Alekhine.pgn', 'utf8');

// Try different splitting methods
console.log('Testing different split methods...\n');

// Method 1: Split by newline + [Event (no lookahead)
const method1 = pgnContent.split(/\n(?=\[Event)/);
console.log(`Method 1 (\\n(?=\[Event)): ${method1.length} games`);

// Method 2: Split by double newline + [Event
const method2 = pgnContent.split(/\n\n+(?=\[Event)/);
console.log(`Method 2 (\\n\\n+(?=\[Event)): ${method2.length} games`);

// Method 3: Split by result + newline + [Event
const method3 = pgnContent.split(/(?:1-0|0-1|1\/2-1\/2)\s*\n\n+(?=\[Event)/);
console.log(`Method 3 (result + newlines): ${method3.length} games`);

// Method 4: Just split by [Event
const method4 = pgnContent.split(/(?=\[Event)/);
console.log(`Method 4 ((?=\[Event)): ${method4.length} games`);

// Count actual [Event tags
const eventCount = (pgnContent.match(/\[Event/g) || []).length;
console.log(`\nActual [Event] tags: ${eventCount}`);

// Best method
console.log(`\nBest match: Method ${eventCount === method4.length ? '4' : eventCount === method1.length ? '1' : 'unknown'}`);



