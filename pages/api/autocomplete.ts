import type { NextApiRequest, NextApiResponse } from 'next';
import { mockDishData } from '../../data/mockData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const { query } = req.body;
  if (!query || typeof query !== 'string') return res.status(400).json({ error: 'Invalid query' });

  const normalizedQuery = query.trim().toLowerCase();

  // 1. Get all dish names from mock data
  const allDishes = mockDishData.map((entry) => entry.dish.toLowerCase());

  // 2. Intelligent match logic
  const prefixMatches: string[] = [];
  const fuzzyMatches: string[] = [];

  allDishes.forEach((dish) => {
    if (dish.startsWith(normalizedQuery)) {
      prefixMatches.push(dish);
    } else if (dish.includes(normalizedQuery) || isCloseMatch(normalizedQuery, dish)) {
      fuzzyMatches.push(dish);
    }
  });

  // 3. Combine, remove duplicates, and limit to 10
  const combined = [...prefixMatches, ...fuzzyMatches];
  const unique = Array.from(new Set(combined)).slice(0, 10);

  return res.status(200).json({ suggestions: unique });
}

// Helper function to catch simple typos or close matches
function isCloseMatch(a: string, b: string): boolean {
  if (a.length < 3 || b.length < 3) return false;

  const mismatchCount = [...a].reduce((acc, char, i) => {
    return acc + (char !== b[i] ? 1 : 0);
  }, 0);

  return mismatchCount <= 2 || b.includes(a); // allow 1–2 typo tolerance or substring match
}

  
  