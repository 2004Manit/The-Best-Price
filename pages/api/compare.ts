import type { NextApiRequest, NextApiResponse } from 'next';
import { mockDishData } from '../../data/mockData';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed' });
  }

  const { dish } = req.body;

  if (!dish) {
    return res.status(400).json({ error: 'Dish name is required' });
  }

  // Convert dish name to lowercase to ensure case-insensitivity
  const dishData = mockDishData.find(d => d.dish.toLowerCase() === dish.toLowerCase());

  if (!dishData) {
    return res.status(404).json({ error: 'Dish not found in our database' });
  }

  const result: Record<string, { cheapestPrice: number }> = {};

  // Iterate over each platform (e.g., "Swiggy", "Zomato", "EatSure") for the given dish
  for (const platform in dishData.platforms) {
    const platformData = dishData.platforms[platform]; // Get the restaurant data for the current platform

    // Find the minimum price for the current platform
    const cheapest = Math.min(...platformData.restaurants.map(r => r.price));

    // Store the cheapest price in the result object
    result[platform] = { cheapestPrice: cheapest };
  }

  // Return the response with the cheapest prices for each platform
  return res.status(200).json({ dish: dishData.dish, platforms: result });
}


