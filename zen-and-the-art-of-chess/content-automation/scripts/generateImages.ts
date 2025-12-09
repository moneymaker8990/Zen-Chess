import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config';

interface GenerationResult {
  generationId: string;
  status: string;
}

interface GeneratedImage {
  url: string;
  id: string;
}

// Leonardo.AI model IDs
const MODELS = {
  creative: '6bef9f1b-29cb-40c7-b9df-32b51c1f67d3', // Leonardo Creative
  diffusion: '1e60896f-3c26-4296-8ecc-53e2afecc132', // Leonardo Diffusion XL
  vision: 'ac614f96-1082-45bf-be9d-757f2d31c174',   // Leonardo Vision XL
  kino: 'd69c8273-6b17-4a30-a13e-d6637ae1c644',     // Leonardo Kino XL (cinematic)
};

/**
 * Generate an image using Leonardo.AI
 */
export async function generateImage(
  prompt: string,
  options: {
    width?: number;
    height?: number;
    modelId?: string;
    numImages?: number;
  } = {}
): Promise<string[]> {
  const {
    width = 1080,
    height = 1920, // 9:16 for TikTok/Shorts
    modelId = MODELS.kino, // Cinematic model
    numImages = 1,
  } = options;

  // Enhance prompt for chess/zen theme
  const enhancedPrompt = `${prompt}, cinematic lighting, dramatic atmosphere, high quality, detailed, chess theme, zen aesthetic, dark moody tones with accent lighting`;
  
  const negativePrompt = 'blurry, low quality, distorted, amateur, poorly lit, oversaturated, cartoon, anime';

  console.log(`🎨 Generating image...`);
  console.log(`   Prompt: ${prompt.substring(0, 60)}...`);
  
  // Create generation request
  const createResponse = await axios.post(
    'https://cloud.leonardo.ai/api/rest/v1/generations',
    {
      prompt: enhancedPrompt,
      negative_prompt: negativePrompt,
      modelId,
      width,
      height,
      num_images: numImages,
      guidance_scale: 7,
      presetStyle: 'CINEMATIC',
      scheduler: 'LEONARDO',
      public: false,
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.LEONARDO_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const generationId = createResponse.data.sdGenerationJob.generationId;
  console.log(`   Generation ID: ${generationId}`);
  
  // Poll for completion
  let attempts = 0;
  const maxAttempts = 60; // 2 minutes max
  
  while (attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const statusResponse = await axios.get(
      `https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.LEONARDO_API_KEY}`,
        },
      }
    );
    
    const generation = statusResponse.data.generations_by_pk;
    
    if (generation?.status === 'COMPLETE' && generation?.generated_images?.length > 0) {
      const urls = generation.generated_images.map((img: GeneratedImage) => img.url);
      console.log(`   ✅ Generated ${urls.length} image(s)`);
      return urls;
    }
    
    if (generation?.status === 'FAILED') {
      throw new Error('Image generation failed');
    }
    
    attempts++;
    if (attempts % 5 === 0) {
      console.log(`   ⏳ Still generating... (${attempts * 2}s)`);
    }
  }
  
  throw new Error('Image generation timed out after 2 minutes');
}

/**
 * Download an image from URL and save locally
 */
async function downloadImage(url: string, outputPath: string): Promise<void> {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  await fs.writeFile(outputPath, response.data);
}

/**
 * Generate images from the latest script
 */
async function generateFromLatestScript(): Promise<string[]> {
  const scriptsDir = path.join(process.cwd(), 'output', 'scripts');
  
  let files: string[];
  try {
    files = await fs.readdir(scriptsDir);
  } catch {
    throw new Error('No scripts folder found. Run npm run generate:script first.');
  }
  
  const jsonFiles = files.filter(f => f.endsWith('.json')).sort().reverse();
  
  if (jsonFiles.length === 0) {
    throw new Error('No scripts found. Run npm run generate:script first.');
  }

  const latestScript = jsonFiles[0];
  console.log(`\n📄 Using script: ${latestScript}`);
  
  const scriptPath = path.join(scriptsDir, latestScript);
  const script = JSON.parse(await fs.readFile(scriptPath, 'utf-8'));
  
  if (!script.imagePrompts || script.imagePrompts.length === 0) {
    throw new Error('Script has no image prompts');
  }
  
  const imagesDir = path.join(process.cwd(), 'output', 'images', latestScript.replace('.json', ''));
  await fs.mkdir(imagesDir, { recursive: true });
  
  const savedPaths: string[] = [];
  
  console.log(`\n🖼️ Generating ${script.imagePrompts.length} images...\n`);
  
  for (let i = 0; i < script.imagePrompts.length; i++) {
    const prompt = script.imagePrompts[i];
    console.log(`\n[${i + 1}/${script.imagePrompts.length}] Generating image...`);
    
    try {
      const [imageUrl] = await generateImage(prompt);
      
      // Download and save
      const imagePath = path.join(imagesDir, `scene_${i + 1}.png`);
      await downloadImage(imageUrl, imagePath);
      console.log(`   💾 Saved to ${imagePath}`);
      savedPaths.push(imagePath);
      
      // Rate limiting - wait between requests
      if (i < script.imagePrompts.length - 1) {
        console.log(`   ⏳ Waiting 3s before next generation...`);
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error) {
      console.error(`   ❌ Failed to generate image ${i + 1}:`, error);
    }
  }
  
  console.log(`\n✅ Generated ${savedPaths.length}/${script.imagePrompts.length} images`);
  console.log(`📁 Output folder: ${imagesDir}`);
  
  return savedPaths;
}

async function main() {
  const command = process.argv[2];
  
  if (command === 'test') {
    const testPrompt = process.argv[3] || 'A chess king piece dramatically lit, dark moody atmosphere';
    console.log(`\n🧪 Testing image generation...`);
    
    const [url] = await generateImage(testPrompt);
    const testPath = path.join(process.cwd(), 'output', 'images', 'test-image.png');
    await fs.mkdir(path.dirname(testPath), { recursive: true });
    await downloadImage(url, testPath);
    console.log(`\n✅ Test image saved to ${testPath}`);
    return;
  }
  
  // Default: generate from latest script
  try {
    await generateFromLatestScript();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('401') || error.message.includes('403')) {
        console.error('\n❌ Authentication failed - Check your LEONARDO_API_KEY in .env');
      } else if (error.message.includes('No scripts')) {
        console.error(`\n❌ ${error.message}`);
      } else {
        throw error;
      }
    }
  }
}

if (process.argv[1]?.includes('generateImages')) {
  main().catch(console.error);
}

export { generateFromLatestScript as generateImagesFromLatestScript };







