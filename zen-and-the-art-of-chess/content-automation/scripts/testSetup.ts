import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import axios from 'axios';

interface TestResult {
  service: string;
  status: 'pass' | 'fail' | 'skip';
  message: string;
}

async function testAnthropic(): Promise<TestResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      service: 'Anthropic (Claude)',
      status: 'skip',
      message: 'ANTHROPIC_API_KEY not set in .env',
    };
  }
  
  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 50,
      messages: [{ role: 'user', content: 'Say "API working" and nothing else.' }],
    });
    
    return {
      service: 'Anthropic (Claude)',
      status: 'pass',
      message: 'Connected successfully ✓',
    };
  } catch (error) {
    return {
      service: 'Anthropic (Claude)',
      status: 'fail',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function testElevenLabs(): Promise<TestResult> {
  if (!process.env.ELEVENLABS_API_KEY) {
    return {
      service: 'ElevenLabs',
      status: 'skip',
      message: 'ELEVENLABS_API_KEY not set in .env',
    };
  }
  
  try {
    const response = await axios.get('https://api.elevenlabs.io/v1/user', {
      headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY },
    });
    
    const chars = response.data.subscription?.character_count || 0;
    const limit = response.data.subscription?.character_limit || 0;
    
    return {
      service: 'ElevenLabs',
      status: 'pass',
      message: `Connected ✓ (${chars.toLocaleString()}/${limit.toLocaleString()} chars used)`,
    };
  } catch (error) {
    return {
      service: 'ElevenLabs',
      status: 'fail',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function testLeonardo(): Promise<TestResult> {
  if (!process.env.LEONARDO_API_KEY) {
    return {
      service: 'Leonardo.AI',
      status: 'skip',
      message: 'LEONARDO_API_KEY not set in .env',
    };
  }
  
  try {
    const response = await axios.get('https://cloud.leonardo.ai/api/rest/v1/me', {
      headers: { 'Authorization': `Bearer ${process.env.LEONARDO_API_KEY}` },
    });
    
    const tokens = response.data.user_details?.[0]?.apiConcurrencySlots || 0;
    
    return {
      service: 'Leonardo.AI',
      status: 'pass',
      message: `Connected ✓ (${tokens} concurrent slots available)`,
    };
  } catch (error) {
    return {
      service: 'Leonardo.AI',
      status: 'fail',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

function checkVoiceId(): TestResult {
  if (!process.env.ELEVENLABS_VOICE_ID) {
    return {
      service: 'Voice ID',
      status: 'skip',
      message: 'ELEVENLABS_VOICE_ID not set (needed for voice generation)',
    };
  }
  
  return {
    service: 'Voice ID',
    status: 'pass',
    message: `Configured: ${process.env.ELEVENLABS_VOICE_ID.substring(0, 8)}...`,
  };
}

async function main() {
  console.log('\n' + '═'.repeat(60));
  console.log('🧪 ZEN CHESS CONTENT AUTOMATION - SETUP TEST');
  console.log('═'.repeat(60) + '\n');
  
  const results: TestResult[] = [];
  
  // Test each service
  console.log('Testing API connections...\n');
  
  results.push(await testAnthropic());
  results.push(await testElevenLabs());
  results.push(await testLeonardo());
  results.push(checkVoiceId());
  
  // Display results
  console.log('─'.repeat(60));
  console.log('RESULTS');
  console.log('─'.repeat(60) + '\n');
  
  for (const result of results) {
    const icon = result.status === 'pass' ? '✅' : result.status === 'fail' ? '❌' : '⚠️';
    console.log(`${icon} ${result.service}`);
    console.log(`   ${result.message}\n`);
  }
  
  // Summary
  const passed = results.filter(r => r.status === 'pass').length;
  const failed = results.filter(r => r.status === 'fail').length;
  const skipped = results.filter(r => r.status === 'skip').length;
  
  console.log('─'.repeat(60));
  console.log(`\n📊 Summary: ${passed} passed, ${failed} failed, ${skipped} skipped\n`);
  
  if (passed === results.length) {
    console.log('🎉 All services connected! You\'re ready to generate content.\n');
    console.log('Try: npm run daily\n');
  } else if (failed > 0) {
    console.log('⚠️  Some services failed. Check your API keys in .env\n');
  } else if (skipped > 0) {
    console.log('📝 Some services not configured yet.\n');
    console.log('Next steps:');
    console.log('1. Copy env-template.txt to .env');
    console.log('2. Add your API keys');
    console.log('3. Run this test again: npm test\n');
  }
}

main().catch(console.error);









