import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

// Rate limiting configuration
const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 15,
};

// Request validation schema
const requestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().min(1)
  })).min(1),
  model: z.enum(['gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo']).optional().default('gpt-4-turbo'),
  temperature: z.number().min(0).max(2).optional().default(0.7),
  max_tokens: z.number().min(1).max(4096).optional().default(2048),
  stream: z.boolean().optional().default(true)
});

type OpenAIRequest = z.infer<typeof requestSchema>;

// Simple in-memory rate limiter
const requestCounts = new Map<string, number>();

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';

  // Rate limiting check
  const currentCount = requestCounts.get(ip) || 0;
  if (currentCount >= RATE_LIMIT.maxRequests) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { 
        status: 429,
        headers: {
          'Retry-After': `${RATE_LIMIT.windowMs / 1000}`,
          'X-RateLimit-Limit': RATE_LIMIT.maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      }
    );
  }

  try {
    // Validate environment configuration
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable not configured');
    }

    // Validate request body
    const requestBody = await req.json();
    const validation = requestSchema.safeParse(requestBody);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Invalid request format',
          details: validation.error.flatten() 
        },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        }
      );
    }

    const { messages, model, temperature, max_tokens, stream } = validation.data;

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: apiKey,
      timeout: 30000 // 30 seconds timeout
    });

    // Create chat completion
    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens,
      stream
    });

    // Handle streaming response
    if (stream) {
      const encoder = new TextEncoder();
      
      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            // Type assertion for streaming chunks
            for await (const chunk of completion as AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk>) {
              const content = chunk.choices[0]?.delta?.content || '';
              const data = `data: ${JSON.stringify(content)}\n\n`;
              controller.enqueue(encoder.encode(data));
            }
          } catch (error) {
            console.error('Stream error:', error);
            controller.error(error);
          } finally {
            controller.close();
          }
        }
      });

      return new Response(readableStream, {
        headers: {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    }

    // Handle non-streaming response
    const chatCompletion = completion as OpenAI.Chat.Completions.ChatCompletion;
    if (chatCompletion.choices?.[0]?.message?.content) {
      const result = chatCompletion.choices[0].message.content;
      return NextResponse.json({
        result
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    }

    throw new Error('Invalid response format from OpenAI API');

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    const statusCode = 500;
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';

    return NextResponse.json(
      { error: errorMessage },
      { 
        status: statusCode,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      }
    );
  } finally {
    // Update rate limiting
    const current = requestCounts.get(ip) || 0;
    requestCounts.set(ip, current + 1);
    setTimeout(() => {
      const current = requestCounts.get(ip) || 0;
      requestCounts.set(ip, Math.max(0, current - 1));
    }, RATE_LIMIT.windowMs);
  }
}

// Add CORS headers for preflight requests
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  });
}