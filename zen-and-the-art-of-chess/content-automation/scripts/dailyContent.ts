import { generateScript, ContentType, CONTENT_TYPES, VideoScript } from './generateScript.js';
import { generateVoice } from './generateVoice.js';
import { generateImage } from './generateImages.js';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config';

// Rotate through content types based on day of week
const CONTENT_ROTATION: ContentType[] = [
  'chess_tip',       // Sunday
  'inner_compass',   // Monday
  'mindfulness',     // Tuesday
  'puzzle_challenge', // Wednesday
  'legend_feature',  // Thursday
  'rating_improvement', // Friday
  'beginner_mistake', // Saturday
];

interface PipelineResult {
  date: string;
  contentType: ContentType;
  outputDir: string;
  script: VideoScript;
  audioPath: string;
  imagePaths: string[];
}

/**
 * Run the full daily content generation pipeline
 */
export async function runDailyPipeline(
  contentType?: ContentType
): Promise<PipelineResult> {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const dateStr = today.toISOString().split('T')[0];
  const selectedContentType = contentType || CONTENT_ROTATION[dayOfWeek];
  
  console.log('\n' + '═'.repeat(60));
  console.log(`🎬 DAILY CONTENT PIPELINE`);
  console.log(`📅 Date: ${dateStr}`);
  console.log(`📋 Content Type: ${selectedContentType}`);
  console.log('═'.repeat(60));
  
  const outputDir = path.join(process.cwd(), 'output', dateStr);
  await fs.mkdir(outputDir, { recursive: true });
  
  // ═══════════════════════════════════════════════════════════
  // STEP 1: Generate Script
  // ═══════════════════════════════════════════════════════════
  console.log('\n📝 STEP 1/4: Generating Script...');
  const script = await generateScript(selectedContentType);
  
  await fs.writeFile(
    path.join(outputDir, 'script.json'),
    JSON.stringify(script, null, 2)
  );
  console.log('   ✅ Script generated');
  console.log(`   Hook: "${script.hook.substring(0, 50)}..."`);
  
  // ═══════════════════════════════════════════════════════════
  // STEP 2: Generate Voiceover
  // ═══════════════════════════════════════════════════════════
  console.log('\n🎤 STEP 2/4: Generating Voiceover...');
  const fullText = `${script.hook}... ${script.body}... ${script.cta}`;
  
  let audioPath = '';
  try {
    const audioBuffer = await generateVoice({ text: fullText });
    audioPath = path.join(outputDir, 'voiceover.mp3');
    await fs.writeFile(audioPath, audioBuffer);
    console.log('   ✅ Voiceover generated');
  } catch (error) {
    console.log('   ⚠️  Voiceover skipped (check ElevenLabs API key)');
    audioPath = '';
  }
  
  // ═══════════════════════════════════════════════════════════
  // STEP 3: Generate Images
  // ═══════════════════════════════════════════════════════════
  console.log('\n🖼️  STEP 3/4: Generating Images...');
  const imagePaths: string[] = [];
  
  for (let i = 0; i < script.imagePrompts.length; i++) {
    const prompt = script.imagePrompts[i];
    console.log(`   [${i + 1}/${script.imagePrompts.length}] Generating...`);
    
    try {
      const [imageUrl] = await generateImage(prompt);
      const imagePath = path.join(outputDir, `scene_${i + 1}.png`);
      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      await fs.writeFile(imagePath, imageResponse.data);
      imagePaths.push(imagePath);
      console.log(`   ✅ Scene ${i + 1} saved`);
      
      // Rate limit between images
      if (i < script.imagePrompts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error) {
      console.log(`   ⚠️  Scene ${i + 1} skipped (check Leonardo API key)`);
    }
  }
  
  // ═══════════════════════════════════════════════════════════
  // STEP 4: Generate Assembly Instructions
  // ═══════════════════════════════════════════════════════════
  console.log('\n📋 STEP 4/4: Creating Assembly Instructions...');
  
  const instructions = `# Video Assembly Instructions
## ${dateStr} - ${selectedContentType}

---

## 📝 Script

### Hook (0-3 seconds)
${script.hook}

### Body (3-45 seconds)
${script.body}

### Call to Action (45-60 seconds)
${script.cta}

---

## 📁 Generated Files

| File | Description |
|------|-------------|
| script.json | Full script data |
| voiceover.mp3 | AI-generated narration |
| scene_1.png | Visual for hook section |
| scene_2.png | Visual for body section |
| scene_3.png | Visual for CTA section |

---

## 🎬 Assembly Steps (CapCut)

1. **Create New Project**
   - Aspect ratio: 9:16 (TikTok/Shorts)
   - Resolution: 1080x1920

2. **Import Files**
   - Drag voiceover.mp3 to audio track
   - Import all scene images

3. **Arrange Timeline**
   - scene_1.png: 0-3 seconds (hook)
   - scene_2.png: 3-45 seconds (body)
   - scene_3.png: 45-60 seconds (CTA)

4. **Add Text Overlays**
   - Add key phrases as text
   - Use bold, readable fonts
   - Position in safe zones

5. **Effects (Optional)**
   - Ken Burns effect on images (subtle zoom/pan)
   - Add transitions between scenes
   - Background music (low volume)

6. **Export**
   - Format: MP4
   - Resolution: 1080x1920
   - Quality: High

---

## #️⃣ Hashtags

${script.hashtags.join(' ')}

---

## 📱 Posting Schedule

| Platform | Best Time | Notes |
|----------|-----------|-------|
| TikTok | 9am or 7pm | Use trending sounds |
| Instagram Reels | Same | Add to stories too |
| YouTube Shorts | Same | Optimize title |

---

## 💡 Tips

- First 3 seconds are CRITICAL - hook must grab attention
- Add captions for accessibility (CapCut has auto-captions)
- Engage with comments in first hour
- Cross-post to all platforms

Generated by Zen Chess Content Automation 🤖
`;

  await fs.writeFile(path.join(outputDir, 'INSTRUCTIONS.md'), instructions);
  console.log('   ✅ Instructions created');
  
  // ═══════════════════════════════════════════════════════════
  // COMPLETE
  // ═══════════════════════════════════════════════════════════
  console.log('\n' + '═'.repeat(60));
  console.log('✅ PIPELINE COMPLETE!');
  console.log('═'.repeat(60));
  console.log(`\n📁 Output folder: ${outputDir}`);
  console.log('\nGenerated files:');
  console.log('  📄 script.json');
  if (audioPath) console.log('  🎤 voiceover.mp3');
  imagePaths.forEach((_, i) => console.log(`  🖼️  scene_${i + 1}.png`));
  console.log('  📋 INSTRUCTIONS.md');
  console.log('\n🎬 Next step: Open CapCut and assemble the video!');
  console.log('═'.repeat(60) + '\n');
  
  return {
    date: dateStr,
    contentType: selectedContentType,
    outputDir,
    script,
    audioPath,
    imagePaths,
  };
}

async function main() {
  const contentType = process.argv[2] as ContentType | undefined;
  
  if (contentType && !CONTENT_TYPES.includes(contentType)) {
    console.log('\n❌ Invalid content type');
    console.log('Available types:', CONTENT_TYPES.join(', '));
    process.exit(1);
  }
  
  try {
    await runDailyPipeline(contentType);
  } catch (error) {
    console.error('\n❌ Pipeline failed:', error);
    process.exit(1);
  }
}

if (process.argv[1]?.includes('dailyContent')) {
  main().catch(console.error);
}


