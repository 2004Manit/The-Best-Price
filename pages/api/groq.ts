import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  console.log('Loaded GROQ_API_KEY:', process.env.GROQ_API_KEY); // TEMP DEBUG

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      }),
    });

    if (!groqRes.ok) {
      const errorText = await groqRes.text(); // read raw response
      throw new Error(`Groq error (${groqRes.status}): ${errorText}`);
    }

    const result = await groqRes.json();
    const answer = result?.choices?.[0]?.message?.content?.trim();

    res.status(200).json({ answer });
  } catch (err) {
    console.error('[Groq API Error]', err);
    res.status(500).json({ error: 'Something went wrong with Groq API' });
  }
}


