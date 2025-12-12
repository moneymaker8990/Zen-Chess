import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config';

interface VoiceOptions {
  text: string;
  voiceId?: string;
  stability?: number;
  similarityBoost?: number;
  style?: number;
  speakerBoost?: boolean;
}

interface VoiceInfo {
  voice_id: string;
  name: string;
  category: string;
}

/**
 * List all available voices in your ElevenLabs account
 */
export async function listVoices(): Promise<VoiceInfo[]> {
  const response = await axios.get(
    'https://api.elevenlabs.io/v1/voices',
    {
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
      },
    }
  );
  return response.data.voices;
}

/**
 * Generate speech from text using ElevenLabs
 */
export async function generateVoice(options: VoiceOptions): Promise<Buffer> {
  const {
    text,
    voiceId = process.env.ELEVENLABS_VOICE_ID,
    stability = 0.5,
    similarityBoost = 0.75,
    style = 0.0,
    speakerBoost = true,
  } = options;

  if (!voiceId) {
    throw new Error('No voice ID provided. Set ELEVENLABS_VOICE_ID in .env or pass voiceId option.');
  }

  console.log(`🎤 Generating speech (${text.length} characters)...`);
  
  const response = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      text,
      model_id: 'eleven_turbo_v2_5', // Fastest model with good quality
      voice_settings: {
        stability,
        similarity_boost: similarityBoost,
        style,
        use_speaker_boost: speakerBoost,
      },
    },
    {
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
    }
  );

  return Buffer.from(response.data);
}

/**
 * Generate voice from the latest script file
 */
async function generateFromLatestScript(): Promise<{ audioPath: string; script: any }> {
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
  console.log(`📄 Using script: ${latestScript}`);
  
  const scriptPath = path.join(scriptsDir, latestScript);
  const script = JSON.parse(await fs.readFile(scriptPath, 'utf-8'));
  
  // Combine hook + body + cta for full voiceover
  // Add natural pauses with periods
  const fullText = `${script.hook}... ${script.body}... ${script.cta}`;
  
  console.log(`📝 Text preview: "${fullText.substring(0, 80)}..."`);
  
  const audioBuffer = await generateVoice({ text: fullText });
  
  // Save audio file
  const audioDir = path.join(process.cwd(), 'output', 'audio');
  await fs.mkdir(audioDir, { recursive: true });
  
  const audioFilename = latestScript.replace('.json', '.mp3');
  const audioPath = path.join(audioDir, audioFilename);
  
  await fs.writeFile(audioPath, audioBuffer);
  console.log(`✅ Audio saved to ${audioPath}`);
  
  return { audioPath, script };
}

async function main() {
  const command = process.argv[2];
  
  if (command === 'list') {
    console.log('\n🎤 Available Voices:\n');
    const voices = await listVoices();
    voices.forEach(v => {
      console.log(`  ${v.name}`);
      console.log(`    ID: ${v.voice_id}`);
      console.log(`    Category: ${v.category}\n`);
    });
    return;
  }
  
  if (command === 'test') {
    const testText = process.argv[3] || 'Welcome to Zen Chess. Master the board, master your mind.';
    console.log(`\n🧪 Testing voice with: "${testText}"`);
    
    const audioBuffer = await generateVoice({ text: testText });
    const testPath = path.join(process.cwd(), 'output', 'audio', 'test-voice.mp3');
    await fs.mkdir(path.dirname(testPath), { recursive: true });
    await fs.writeFile(testPath, audioBuffer);
    console.log(`✅ Test audio saved to ${testPath}`);
    return;
  }
  
  // Default: generate from latest script
  try {
    await generateFromLatestScript();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        console.error('\n❌ Authentication failed - Check your ELEVENLABS_API_KEY in .env');
      } else if (error.message.includes('No scripts')) {
        console.error(`\n❌ ${error.message}`);
      } else {
        throw error;
      }
    }
  }
}

if (process.argv[1]?.includes('generateVoice')) {
  main().catch(console.error);
}

export { generateFromLatestScript };











