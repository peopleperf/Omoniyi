import OpenAI from 'openai';

// Kimi-k2 AI configuration using OpenAI SDK
// Documentation: https://platform.moonshot.ai/docs/api
const KIMI_API_BASE = 'https://api.moonshot.ai/v1';

// Initialize OpenAI client with Kimi endpoint
export const kimiClient = new OpenAI({
  apiKey: process.env.KIMI_API_KEY || '',
  baseURL: KIMI_API_BASE,
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
});

// Available Kimi models
export const KimiModels = {
  KIMI_K2: 'kimi-k2-0711-preview',
  MOONSHOT_V1_8K: 'moonshot-v1-8k',
  MOONSHOT_V1_32K: 'moonshot-v1-32k',
  MOONSHOT_V1_128K: 'moonshot-v1-128k',
} as const;

export type KimiModel = typeof KimiModels[keyof typeof KimiModels];

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface KimiChatOptions {
  model?: KimiModel;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  stream?: boolean;
}

/**
 * Send a chat completion request to Kimi AI
 * @param messages Array of chat messages
 * @param options Chat completion options
 * @returns The AI response
 */
export async function kimiChat(
  messages: ChatMessage[],
  options: KimiChatOptions = {}
): Promise<string> {
  try {
    const {
      model = KimiModels.MOONSHOT_V1_8K,
      temperature = 0.7,
      max_tokens = 1000,
      top_p = 1,
      stream = false,
    } = options;

    const completion = await kimiClient.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens,
      top_p,
      stream,
    });

    if (stream) {
      // Handle streaming response if needed
      throw new Error('Streaming not implemented yet');
    }

    // Type guard to ensure we have a non-streaming completion
    if ('choices' in completion) {
      return completion.choices[0]?.message?.content || '';
    }
    
    return '';
  } catch (error: any) {
    console.error('Kimi AI Error:', error);
    
    // Check for specific error types
    if (error?.error?.message?.includes('Incorrect API key')) {
      throw new Error('Invalid Kimi API key. Please check your API key in the Moonshot AI console.');
    } else if (error?.status === 401) {
      throw new Error('Authentication failed. Please verify your Kimi API key.');
    } else if (error?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    
    throw new Error(`Failed to get response from Kimi AI: ${error?.message || 'Unknown error'}`);
  }
}

/**
 * Generate a response for the AI chat component
 * @param userInput User's input message
 * @param context Additional context (knowledge base)
 * @returns AI generated response
 */
export async function generateKimiResponse(
  userInput: string,
  context?: any[]
): Promise<string> {
  // Build system prompt with context - STRICT LIMITATIONS
  let systemPrompt = `You are Omoniyi Ipaye's AI assistant. Your ONLY purpose is to provide information about Omoniyi Ipaye based on the provided knowledge base.

CRITICAL RULES - YOU MUST FOLLOW THESE WITHOUT EXCEPTION:
1. ONLY answer questions about Omoniyi Ipaye's professional experience, skills, services, and background
2. NEVER provide information about any other topics, even if directly asked
3. If asked about anything unrelated to Omoniyi Ipaye, politely redirect to his expertise
4. Do not answer general knowledge questions, coding questions, or any other topics
5. Always stay focused on Omoniyi's People Operations and HR technology expertise

Omoniyi's core areas of expertise:
- People Operations with 10+ years of experience
- HR automation and technology implementation
- Global compliance frameworks for multi-country operations
- Building custom HR tools with React, Next.js, TypeScript, and Python
- Process optimization and workflow automation
- Scaling HR operations for high-growth companies

For ANY question not directly related to Omoniyi Ipaye, respond with:
"I'm specifically designed to provide information about Omoniyi Ipaye's professional experience and services in People Operations. Is there anything about his HR expertise or services you'd like to know?"`;

  if (context && context.length > 0) {
    systemPrompt += '\n\nKnowledge Base Context:\n';
    context.forEach(kb => {
      systemPrompt += `- ${kb.category}: ${kb.question} -> ${kb.answer}\n`;
    });
  }

  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: systemPrompt,
    },
    {
      role: 'user',
      content: userInput,
    },
  ];

  try {
    const response = await kimiChat(messages, {
      model: KimiModels.KIMI_K2, // Use latest Kimi K2 model
      temperature: 0.6, // Recommended temperature for Kimi K2
      max_tokens: 1500,
    });

    return response;
  } catch (error) {
    console.error('Error generating Kimi response:', error);
    // Fallback to a helpful error message
    return "I apologize, but I'm having trouble processing your request right now. Please try again in a moment, or feel free to contact Omoniyi directly at omoniyi@tuta.io for immediate assistance.";
  }
}

/**
 * Stream a chat completion response from Kimi AI
 * @param messages Array of chat messages
 * @param options Chat completion options
 * @param onChunk Callback for each streamed chunk
 */
export async function kimiChatStream(
  messages: ChatMessage[],
  options: KimiChatOptions = {},
  onChunk: (chunk: string) => void
): Promise<void> {
  try {
    const {
      model = KimiModels.MOONSHOT_V1_8K,
      temperature = 0.7,
      max_tokens = 1000,
      top_p = 1,
    } = options;

    const stream = await kimiClient.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens,
      top_p,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        onChunk(content);
      }
    }
  } catch (error: any) {
    console.error('Kimi AI Stream Error:', error);
    throw new Error(`Failed to stream response from Kimi AI: ${error?.message || 'Unknown error'}`);
  }
}
