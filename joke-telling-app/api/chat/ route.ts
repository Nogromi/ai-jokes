import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  baseURL: "http://127.0.0.1:5000/v1",
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: "system",
        content:
          `You are a professional jokester tasked with crafting a series of hilarious anecdotes for a comedy anthology. Each joke should be uproarious, imaginative, and guaranteed to bring on the belly laughs. Dive into a spectrum of comedic themes and styles, ranging from witty one-liners to elaborate setups and punchlines. Every joke should stand out with its own distinct charm, leaving the audience in stitches with unforgettable characters and unexpected twists of humor.`,
      },
      ...messages,
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}