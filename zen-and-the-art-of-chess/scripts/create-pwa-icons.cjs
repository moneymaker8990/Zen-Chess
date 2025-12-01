// Simple script to create placeholder PWA icons
// Run: node scripts/create-pwa-icons.cjs

const fs = require('fs');
const path = require('path');

// Minimal valid 1x1 purple PNG (placeholder)
function createPlaceholderIcon() {
  // This is a minimal valid PNG - a purple pixel
  return Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
    0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, // IHDR length + type
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, // 1x1 dimensions
    0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, // bit depth, color type, etc
    0xDE, // CRC
    0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41, 0x54, // IDAT chunk
    0x08, 0xD7, 0x63, 0xA8, 0x55, 0xF7, 0x00, 0x00, // Purple color data
    0x01, 0x06, 0x00, 0x85, 0xC7, 0xA3, 0x72, 0x82, // compressed
    0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, // IEND
    0xAE, 0x42, 0x60, 0x82
  ]);
}

const publicDir = path.join(__dirname, '..', 'public');

// Create simple placeholder PNGs
const placeholder = createPlaceholderIcon();

fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), placeholder);
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), placeholder);

console.log('✓ Created placeholder PWA icons in public/');
console.log('');
console.log('IMPORTANT: These are tiny placeholder icons!');
console.log('');
console.log('To create proper icons:');
console.log('1. Open scripts/generate-pwa-icons.html in your browser');
console.log('2. Download both icons');
console.log('3. Replace the files in the public/ folder');

