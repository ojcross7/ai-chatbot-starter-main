import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

// ✅ Rate limit settings (prevents spam)
const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 15,
};

// ✅ Request validation schema
const requestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().min(1),
  })).min(1),
  model: z.enum(['gpt-4-turbo', 'gpt-4', 'gpt-3.5-turbo']).optional().default('gpt-4-turbo'),
  temperature: z.number().min(0).max(2).optional().default(0.7),
  max_tokens: z.number().min(1).max(4096).optional().default(2048),
  stream: z.boolean().optional().default(false),
});

type OpenAIRequest = z.infer<typeof requestSchema>;
const requestCounts = new Map<string, number>();

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';

  // ✅ Rate limiting
  if ((requestCounts.get(ip) || 0) >= RATE_LIMIT.maxRequests) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  try {
    if (!apiKey) throw new Error('API key missing');
    
    const requestBody = await req.json();
    const validation = requestSchema.safeParse(requestBody);
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }

    const { messages, model, temperature, max_tokens, stream } = validation.data;
    const openai = new OpenAI({ apiKey, timeout: 30000 });

    if (stream) {
      const completion = await openai.chat.completions.create({
        model,
        messages,
        temperature,
        max_tokens,
        stream: true,
      });

      // ✅ Ensure the response stream is handled correctly
      const encoder = new TextEncoder();
      const responseStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of completion) {
              const content = chunk.choices[0]?.delta?.content || '';
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(content)}\n\n`));
            }
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          } catch (error) {
            controller.error(error);
          } finally {
            controller.close();
          }
        }
      });

      return new Response(responseStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    }

    // ✅ Non-streaming response
    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens,
    });

    if (!completion.choices || completion.choices.length === 0) {
      throw new Error('Invalid response from OpenAI');
    }

    const responseText = completion.choices[0]?.message?.content || 'I am here to assist you!';

    return NextResponse.json({ result: responseText });

  } catch (error) {
    console.error('🔥 API Error:', error);
    return NextResponse.json({ error: 'There was an issue processing your request.' }, { status: 500 });
  } finally {
    // ✅ Proper rate limit tracking
    requestCounts.set(ip, (requestCounts.get(ip) || 0) + 1);
    setTimeout(() => {
      requestCounts.set(ip, Math.max(0, (requestCounts.get(ip) || 0) - 1));
    }, RATE_LIMIT.windowMs);
  }
}
