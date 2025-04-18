import { mockDishData } from './mockData';
import { DishData, RestaurantInfo } from './mockData';

function getRandomCheapestPrice(): number {
  return Math.floor(Math.random() * 151) + 50; // ₹50–₹200
}

function getSlightlyHigherPrice(basePrice: number): number {
  return basePrice + Math.floor(Math.random() * 26) + 5; // +₹5 to +₹30
}

export function updateMockPrices(): DishData[] {
  return mockDishData.map((dish) => {
    const updatedPlatforms: DishData['platforms'] = {};

    for (const platform in dish.platforms) {
      const originalRestaurants = dish.platforms[platform].restaurants;
      const cheapestPrice = getRandomCheapestPrice();

      // Clone restaurant list to avoid mutation
      const restaurants = [...originalRestaurants];

      // Randomly pick one restaurant to have the cheapest price
      const randomIndex = Math.floor(Math.random() * restaurants.length);

      const updatedRestaurants = restaurants.map((restaurant, index) => {
        const updatedPrice = index === randomIndex
          ? cheapestPrice
          : getSlightlyHigherPrice(cheapestPrice);

        return {
          ...restaurant,
          price: updatedPrice,
        };
      });

      updatedPlatforms[platform] = {
        restaurants: updatedRestaurants,
        cheapestPrice,
      };
    }

    return {
      ...dish,
      platforms: updatedPlatforms,
    };
  });
}