import { NextRequest, NextResponse } from 'next/server';
import { generateKimiResponse } from '@/lib/kimi-ai';

export async function POST(request: NextRequest) {
  try {
    const { message, knowledgeBase } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.KIMI_API_KEY) {
      console.warn('KIMI_API_KEY not configured, using fallback responses');
      return NextResponse.json({
        response: "I'm currently running in demo mode. To enable full AI capabilities, please configure the KIMI_API_KEY in your environment variables.",
      });
    }

    // Check if API key is the placeholder
    if (process.env.KIMI_API_KEY === 'your_kimi_api_key_here') {
      return NextResponse.json({
        response: "Please replace the placeholder API key with your actual Kimi API key from https://platform.moonshot.ai/console/api-keys",
      });
    }

    // Generate response using Kimi AI
    const response = await generateKimiResponse(message, knowledgeBase);

    return NextResponse.json({ response });
  } catch (error: any) {
    console.error('API Error:', error);
    
    // Check for specific error messages
    if (error?.message?.includes('Invalid Kimi API key')) {
      return NextResponse.json({
        response: "The Kimi API key appears to be invalid. Please check your API key at https://platform.moonshot.ai/console/api-keys and ensure it's correctly copied to your .env.local file.",
      });
    }
    
    // For other errors, return the fallback message
    return NextResponse.json({
      response: "I'm experiencing technical difficulties connecting to the AI service. However, I can still provide information about Omoniyi's experience. What would you like to know?",
    });
  }
}
