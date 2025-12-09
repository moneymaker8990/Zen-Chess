/**
 * PWA Icon Generator for Zen Chess
 * Creates all necessary icons from the SVG favicon
 * 
 * Run: node scripts/generate-all-icons.cjs
 * 
 * Note: This creates an HTML file that you open in a browser
 * to generate the actual PNG icons. This avoids needing sharp/canvas deps.
 */

const fs = require('fs');
const path = require('path');

// Read the SVG favicon
const svgPath = path.join(__dirname, '..', 'public', 'favicon.svg');
const svgContent = fs.readFileSync(svgPath, 'utf-8');

// Encode SVG for data URI
const svgBase64 = Buffer.from(svgContent).toString('base64');
const svgDataUri = `data:image/svg+xml;base64,${svgBase64}`;

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

// Splash screen configurations for iOS
const splashScreens = [
  { name: 'splash-1170x2532.png', width: 1170, height: 2532 }, // iPhone 12/13 Pro
  { name: 'splash-1284x2778.png', width: 1284, height: 2778 }, // iPhone 12/13 Pro Max
  { name: 'splash-1125x2436.png', width: 1125, height: 2436 }, // iPhone X/XS/11 Pro
];

// Screenshot configurations
const screenshots = [
  { name: 'screenshot-wide.png', width: 1280, height: 720 },
  { name: 'screenshot-narrow.png', width: 390, height: 844 },
];

// Generate HTML that creates all icons
const html = `<!DOCTYPE html>
<html>
<head>
  <title>Zen Chess Icon Generator</title>
  <style>
    body { 
      font-family: system-ui, sans-serif; 
      background: #1a1a2e; 
      color: #eee; 
      padding: 20px; 
      max-width: 800px; 
      margin: 0 auto; 
    }
    h1 { color: #a855f7; }
    .icon-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); 
      gap: 20px; 
      margin-top: 20px;
    }
    .icon-item { 
      background: #2a2a3e; 
      padding: 15px; 
      border-radius: 12px; 
      text-align: center;
    }
    .icon-item canvas { 
      max-width: 100%; 
      height: auto; 
      border-radius: 8px;
      background: #161512;
    }
    .icon-item h3 { margin: 10px 0 5px; font-size: 14px; }
    .icon-item p { margin: 0; font-size: 12px; color: #888; }
    button {
      background: linear-gradient(135deg, #a855f7, #7c3aed);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      margin: 10px;
    }
    button:hover { opacity: 0.9; }
    .controls { margin: 20px 0; }
    .status { 
      background: #2a2a3e; 
      padding: 15px; 
      border-radius: 8px; 
      margin-top: 20px;
      white-space: pre-wrap;
      font-family: monospace;
      font-size: 12px;
    }
    .splash-preview {
      max-width: 200px;
      max-height: 400px;
    }
  </style>
</head>
<body>
  <h1>♔ Zen Chess Icon Generator</h1>
  <p>This tool generates all PWA icons from your SVG favicon.</p>
  
  <div class="controls">
    <button onclick="generateAllIcons()">Generate All Icons</button>
    <button onclick="downloadAll()">Download All as ZIP</button>
  </div>
  
  <div id="status" class="status">Ready. Click "Generate All Icons" to start.</div>
  
  <h2>App Icons</h2>
  <div id="icon-grid" class="icon-grid"></div>
  
  <h2>Splash Screens</h2>
  <div id="splash-grid" class="icon-grid"></div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
  <script>
    const svgDataUri = '${svgDataUri}';
    const icons = ${JSON.stringify(icons)};
    const splashScreens = ${JSON.stringify(splashScreens)};
    
    const generatedFiles = {};
    
    function log(msg) {
      document.getElementById('status').textContent += msg + '\\n';
    }
    
    async function loadSvgAsImage() {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = svgDataUri;
      });
    }
    
    function createIconCanvas(img, size, maskable) {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      
      // Background
      ctx.fillStyle = '#161512';
      ctx.fillRect(0, 0, size, size);
      
      if (maskable) {
        // For maskable icons, draw smaller (80% of size) and centered
        // Safe zone is 80% of the icon, so we draw at 80% and center
        const padding = size * 0.1; // 10% padding on each side
        const iconSize = size * 0.8;
        ctx.drawImage(img, padding, padding, iconSize, iconSize);
      } else {
        // Full size
        ctx.drawImage(img, 0, 0, size, size);
      }
      
      return canvas;
    }
    
    function createSplashCanvas(img, width, height) {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      // Dark gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(1, '#161512');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Center the icon at a reasonable size
      const iconSize = Math.min(width, height) * 0.3;
      const x = (width - iconSize) / 2;
      const y = (height - iconSize) / 2 - height * 0.05; // Slightly above center
      
      ctx.drawImage(img, x, y, iconSize, iconSize);
      
      // Add app name below
      ctx.fillStyle = '#f0f0f0';
      ctx.font = \`bold \${Math.round(iconSize * 0.25)}px "Playfair Display", Georgia, serif\`;
      ctx.textAlign = 'center';
      ctx.fillText('Zen Chess', width / 2, y + iconSize + iconSize * 0.4);
      
      return canvas;
    }
    
    async function generateAllIcons() {
      const statusEl = document.getElementById('status');
      statusEl.textContent = 'Generating icons...\\n';
      
      const iconGrid = document.getElementById('icon-grid');
      const splashGrid = document.getElementById('splash-grid');
      iconGrid.innerHTML = '';
      splashGrid.innerHTML = '';
      
      try {
        const img = await loadSvgAsImage();
        log('SVG loaded successfully');
        
        // Generate app icons
        for (const icon of icons) {
          const canvas = createIconCanvas(img, icon.size, icon.maskable);
          const dataUrl = canvas.toDataURL('image/png');
          generatedFiles[icon.name] = dataUrl;
          
          const item = document.createElement('div');
          item.className = 'icon-item';
          item.innerHTML = \`
            <canvas width="\${Math.min(icon.size, 128)}" height="\${Math.min(icon.size, 128)}"></canvas>
            <h3>\${icon.name}</h3>
            <p>\${icon.size}x\${icon.size}\${icon.maskable ? ' (maskable)' : ''}</p>
            <button onclick="downloadIcon('\${icon.name}')">Download</button>
          \`;
          
          const previewCanvas = item.querySelector('canvas');
          const previewCtx = previewCanvas.getContext('2d');
          const previewSize = Math.min(icon.size, 128);
          previewCanvas.width = previewSize;
          previewCanvas.height = previewSize;
          previewCtx.drawImage(canvas, 0, 0, previewSize, previewSize);
          
          iconGrid.appendChild(item);
          log(\`✓ Generated \${icon.name}\`);
        }
        
        // Generate splash screens
        for (const splash of splashScreens) {
          const canvas = createSplashCanvas(img, splash.width, splash.height);
          const dataUrl = canvas.toDataURL('image/png');
          generatedFiles[splash.name] = dataUrl;
          
          const item = document.createElement('div');
          item.className = 'icon-item';
          item.innerHTML = \`
            <canvas class="splash-preview"></canvas>
            <h3>\${splash.name}</h3>
            <p>\${splash.width}x\${splash.height}</p>
            <button onclick="downloadIcon('\${splash.name}')">Download</button>
          \`;
          
          const previewCanvas = item.querySelector('canvas');
          const scale = 150 / splash.width;
          previewCanvas.width = 150;
          previewCanvas.height = splash.height * scale;
          const previewCtx = previewCanvas.getContext('2d');
          previewCtx.drawImage(canvas, 0, 0, previewCanvas.width, previewCanvas.height);
          
          splashGrid.appendChild(item);
          log(\`✓ Generated \${splash.name}\`);
        }
        
        log('\\n✅ All icons generated! Click "Download All as ZIP" or download individually.');
        
      } catch (err) {
        log('Error: ' + err.message);
        console.error(err);
      }
    }
    
    function downloadIcon(name) {
      const dataUrl = generatedFiles[name];
      if (!dataUrl) {
        alert('Icon not generated yet!');
        return;
      }
      
      const link = document.createElement('a');
      link.download = name;
      link.href = dataUrl;
      link.click();
    }
    
    async function downloadAll() {
      if (Object.keys(generatedFiles).length === 0) {
        alert('Generate icons first!');
        return;
      }
      
      const zip = new JSZip();
      
      for (const [name, dataUrl] of Object.entries(generatedFiles)) {
        const base64 = dataUrl.split(',')[1];
        zip.file(name, base64, { base64: true });
      }
      
      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.download = 'zen-chess-icons.zip';
      link.href = URL.createObjectURL(content);
      link.click();
      
      log('\\n📦 Downloaded all icons as ZIP');
    }
    
    // Auto-generate on load
    window.onload = () => setTimeout(generateAllIcons, 500);
  </script>
</body>
</html>`;

// Write the HTML generator file
const outputPath = path.join(__dirname, '..', 'scripts', 'icon-generator.html');
fs.writeFileSync(outputPath, html);

console.log('✅ Icon generator created at: scripts/icon-generator.html');
console.log('');
console.log('To generate all icons:');
console.log('1. Open scripts/icon-generator.html in your browser');
console.log('2. Click "Download All as ZIP"');
console.log('3. Extract the ZIP to the public/ folder');
console.log('');
console.log('Required files will be generated:');
icons.forEach(icon => console.log(`  - ${icon.name}`));
splashScreens.forEach(s => console.log(`  - ${s.name}`));






