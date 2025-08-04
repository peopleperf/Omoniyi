# Kimi AI Integration Guide

This document explains how to use Kimi-k2 AI with the OpenAI SDK in the Chat with Z.ai workspace.

## Overview

We've integrated Kimi AI (Moonshot AI) into the chat component using the OpenAI SDK. This allows you to leverage Kimi's powerful language models while using familiar OpenAI SDK patterns.

## Setup

### 1. Get Your API Key

1. Visit [Moonshot AI Platform](https://platform.moonshot.ai/console/api-keys)
2. Sign up or log in to your account
3. Generate a new API key

### 2. Configure Environment Variables

Add your Kimi API key to the `.env.local` file:

```env
KIMI_API_KEY=your_actual_kimi_api_key_here
```

### 3. Available Models

The integration supports three Kimi models:

- `moonshot-v1-8k` - 8K context window (fastest)
- `moonshot-v1-32k` - 32K context window (balanced)
- `moonshot-v1-128k` - 128K context window (most context)

## Implementation Details

### File Structure

- `/src/lib/kimi-ai.ts` - Core Kimi AI service using OpenAI SDK
- `/src/app/api/chat/kimi/route.ts` - API endpoint for chat requests
- `/src/components/ai-chat.tsx` - Updated chat component using Kimi AI

### Key Features

1. **OpenAI SDK Compatibility**: Uses the OpenAI SDK but points to Kimi's endpoint
2. **Fallback Support**: If Kimi API fails or no key is configured, falls back to local responses
3. **Knowledge Base Integration**: Incorporates Supabase knowledge base data into AI context
4. **Streaming Support**: Prepared for streaming responses (implementation ready)

### Usage Example

```typescript
import { kimiChat, KimiModels } from '@/lib/kimi-ai';

// Basic chat completion
const response = await kimiChat([
  { role: 'system', content: 'You are a helpful assistant.' },
  { role: 'user', content: 'Hello!' }
], {
  model: KimiModels.MOONSHOT_V1_32K,
  temperature: 0.7,
  max_tokens: 1000
});

// Using the high-level function with knowledge base
const response = await generateKimiResponse(userInput, knowledgeBase);
```

## API Endpoint

The API endpoint at `/api/chat/kimi` accepts POST requests:

```typescript
// Request
POST /api/chat/kimi
{
  "message": "User's question",
  "knowledgeBase": [...] // Optional knowledge base entries
}

// Response
{
  "response": "AI generated response"
}
```

## Troubleshooting

### No API Key Configured
If `KIMI_API_KEY` is not set, the chat will show a demo mode message and fall back to local pattern-based responses.

### API Errors
Check the console for detailed error messages. Common issues:
- Invalid API key
- Rate limiting
- Network connectivity

### Debugging

Enable debug logging by checking the browser console for:
- "KIMI_API_KEY not configured" warnings
- "Kimi AI Error" messages with details

## Best Practices

1. **Model Selection**: 
   - Use `moonshot-v1-8k` for quick responses
   - Use `moonshot-v1-32k` for balanced performance (default)
   - Use `moonshot-v1-128k` for complex conversations with lots of context

2. **Temperature Settings**:
   - 0.3-0.5 for factual, consistent responses
   - 0.7-0.8 for creative, varied responses (default: 0.8)
   - 0.9-1.0 for very creative outputs

3. **Token Limits**:
   - Set appropriate `max_tokens` based on expected response length
   - Default is 1500 tokens for comprehensive responses

## Security Notes

- Never commit your API key to version control
- The `.env.local` file is already in `.gitignore`
- API keys are only used server-side in the API route

## Future Enhancements

1. **Streaming Responses**: Full implementation of streaming for real-time responses
2. **Conversation History**: Maintain conversation context across sessions
3. **Custom Fine-tuning**: Support for fine-tuned Kimi models
4. **Analytics**: Track usage and response quality

## Support

For issues with:
- Kimi AI API: Visit [Moonshot AI Documentation](https://platform.moonshot.ai/docs/api)
- Integration: Check the implementation files or create an issue
