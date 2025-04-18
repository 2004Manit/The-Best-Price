// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!, // Use server-side env var
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  try {
    const response = await groq.chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages,
    });

    const reply = response.choices[0]?.message.content || 'Hmm, no response.';
    res.status(200).json({ reply });
  } catch (error) {
    console.error('Groq error:', error);
    res.status(500).json({ error: 'Groq API error' });
  }
}
