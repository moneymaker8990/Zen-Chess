/**
 * Direct Icon Generator using Sharp
 * Generates all PWA icons directly to the public folder
 * 
 * Run: node scripts/generateIconsDirect.mjs
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const svgPath = path.join(publicDir, 'favicon.svg');

// Read SVG content
const svgContent = fs.readFileSync(svgPath, 'utf-8');

// Icon configurations
const icons = [
  // PWA icons
  { name: 'pwa-64x64.png', size: 64, maskable: false },
  { name: 'pwa-192x192.png', size: 192, maskable: false },
  { name: 'pwa-512x512.png', size: 512, maskable: false },
  // Maskable icons (with padding for safe zone)
  { name: 'pwa-192x192-maskable.png', size: 192, maskable: true },
  { name: 'pwa-512x512-maskable.png', size: 512, maskable: true },
  // Favicons
  { name: 'favicon-16x16.png', size: 16, maskable: false },
  { name: 'favicon-32x32.png', size: 32, maskable: false },
  // Apple touch icons
  { name: 'apple-touch-icon.png', size: 180, maskable: false },
  { name: 'apple-touch-icon-180x180.png', size: 180, maskable: false },
  { name: 'apple-touch-icon-152x152.png', size: 152, maskable: false },
  { name: 'apple-touch-icon-144x144.png', size: 144, maskable: false },
  { name: 'apple-touch-icon-120x120.png', size: 120, maskable: false },
  { name: 'apple-touch-icon-114x114.png', size: 114, maskable: false },
  { name: 'apple-touch-icon-76x76.png', size: 76, maskable: false },
  { name: 'apple-touch-icon-72x72.png', size: 72, maskable: false },
  { name: 'apple-touch-icon-60x60.png', size: 60, maskable: false },
  { name: 'apple-touch-icon-57x57.png', size: 57, maskable: false },
];

// Background color
const bgColor = { r: 22, g: 21, b: 18, alpha: 1 }; // #161512

async function generateIcon(config) {
  const { name, size, maskable } = config;
  const outputPath = path.join(publicDir, name);
  
  try {
    // Create a buffer from the SVG
    const svgBuffer = Buffer.from(svgContent);
    
    if (maskable) {
      // For maskable icons, render SVG smaller and composite on background
      const iconSize = Math.round(size * 0.8);
      const padding = Math.round(size * 0.1);
      
      // Render the SVG at the inner size
      const iconBuffer = await sharp(svgBuffer, { density: 300 })
        .resize(iconSize, iconSize, { fit: 'contain', background: bgColor })
        .png()
        .toBuffer();
      
      // Create background and composite
      await sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: bgColor
        }
      })
        .composite([{
          input: iconBuffer,
          top: padding,
          left: padding
        }])
        .png()
        .toFile(outputPath);
    } else {
      // Regular icon - just resize
      await sharp(svgBuffer, { density: 300 })
        .resize(size, size, { fit: 'contain', background: bgColor })
        .flatten({ background: bgColor })
        .png()
        .toFile(outputPath);
    }
    
    console.log(`✓ Generated ${name} (${size}x${size})`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to generate ${name}: ${error.message}`);
    return false;
  }
}

async function generateSplashScreen(width, height, name) {
  const outputPath = path.join(publicDir, name);
  
  try {
    const svgBuffer = Buffer.from(svgContent);
    const iconSize = Math.round(Math.min(width, height) * 0.3);
    
    // Render the icon
    const iconBuffer = await sharp(svgBuffer, { density: 300 })
      .resize(iconSize, iconSize, { fit: 'contain', background: bgColor })
      .png()
      .toBuffer();
    
    // Calculate position (centered, slightly above middle)
    const x = Math.round((width - iconSize) / 2);
    const y = Math.round((height - iconSize) / 2 - height * 0.05);
    
    // Create gradient background manually (solid color for simplicity)
    await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: bgColor
      }
    })
      .composite([{
        input: iconBuffer,
        top: y,
        left: x
      }])
      .png()
      .toFile(outputPath);
    
    console.log(`✓ Generated ${name} (${width}x${height})`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to generate ${name}: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('🎨 Generating PWA icons from favicon.svg...\n');
  
  // Generate all app icons
  console.log('App Icons:');
  for (const icon of icons) {
    await generateIcon(icon);
  }
  
  // Generate splash screens
  console.log('\nSplash Screens:');
  const splashScreens = [
    { width: 1170, height: 2532, name: 'splash-1170x2532.png' },
    { width: 1284, height: 2778, name: 'splash-1284x2778.png' },
    { width: 1125, height: 2436, name: 'splash-1125x2436.png' },
  ];
  
  for (const splash of splashScreens) {
    await generateSplashScreen(splash.width, splash.height, splash.name);
  }
  
  console.log('\n✅ All icons generated in public/ folder!');
  console.log('\nReady for deployment.');
}

main().catch(console.error);






