import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local
config({ path: join(__dirname, '.env.local') });

console.log('🔍 Checking Environment Configuration\n');

// Check if KIMI_API_KEY is set
const kimiKey = process.env.KIMI_API_KEY;
if (kimiKey) {
  console.log(`✅ KIMI_API_KEY is set: ${kimiKey.substring(0, 10)}...${kimiKey.substring(kimiKey.length - 4)}`);
  console.log(`   Length: ${kimiKey.length} characters`);
  
  // Check for common issues
  if (kimiKey === 'your_kimi_api_key_here') {
    console.log('❌ WARNING: API key is still the placeholder value!');
  } else if (kimiKey.includes(' ')) {
    console.log('❌ WARNING: API key contains spaces!');
  } else if (kimiKey.length < 20) {
    console.log('❌ WARNING: API key seems too short!');
  }
} else {
  console.log('❌ KIMI_API_KEY is NOT set');
}

// Show .env.local content (safely)
console.log('\n📄 .env.local content check:');
try {
  const envContent = readFileSync(join(__dirname, '.env.local'), 'utf-8');
  const lines = envContent.split('\n');
  const kimiLine = lines.find(line => line.startsWith('KIMI_API_KEY'));
  if (kimiLine) {
    console.log(`Found KIMI_API_KEY line: ${kimiLine.substring(0, 20)}...`);
  } else {
    console.log('❌ KIMI_API_KEY line not found in .env.local');
  }
} catch (error) {
  console.log('❌ Could not read .env.local:', error.message);
}

// Test direct API call
console.log('\n🔧 Testing direct API call to Kimi...');
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: kimiKey || '',
  baseURL: 'https://api.moonshot.cn/v1',
});

try {
  const completion = await client.chat.completions.create({
    model: 'moonshot-v1-8k',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Say hello in 5 words or less.' }
    ],
    max_tokens: 50,
  });
  
  console.log('✅ Direct API call successful!');
  console.log('Response:', completion.choices[0]?.message?.content);
} catch (error) {
  console.log('❌ Direct API call failed:', error.message);
  if (error.response) {
    console.log('Response status:', error.response.status);
    console.log('Response data:', error.response.data);
  }
}
