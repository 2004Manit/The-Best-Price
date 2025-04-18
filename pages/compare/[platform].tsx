import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { mockDishData } from '../../data/mockData';
import { DishCard } from '../../components/DishCard';
import { dishImageMap } from '../../data/dishImageMap';

const PlatformPage = () => {
  const router = useRouter();
  const { platform, dish } = router.query;

  const [dishName, setDishName] = useState<string>('');
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [selectedDish, setSelectedDish] = useState<any | null>(null);

  useEffect(() => {
    if (typeof dish === 'string') {
      setDishName(dish);
    }
  }, [dish]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const updateData = () => {
      
      const matchedDish = mockDishData.find(
        (d) => d.dish.toLowerCase() === dishName.toLowerCase()
      );

      const platformKey = (platform as string).toLowerCase();

      if (matchedDish && matchedDish.platforms) {
        const platformData = Object.entries(matchedDish.platforms).find(
          ([key]) => key.toLowerCase() === platformKey
        );

        if (platformData) {
          const imageUrl = dishImageMap[dishName.toLowerCase()] || 'https://via.placeholder.com/150';

          const baseCheapestPrice = platformData[1].cheapestPrice;
          const originalRestaurants = platformData[1].restaurants;

          const randomCheapestIndex = Math.floor(Math.random() * originalRestaurants.length);

          const restaurantData = originalRestaurants.map((restaurant, index) => {
            let price;
            if (index === randomCheapestIndex) {
              price = baseCheapestPrice;
            } else {
              price = baseCheapestPrice + Math.floor(Math.random() * 26) + 5; // +5 to +30
            }

            return {
              ...restaurant,
              price,
              rating: (Math.random() * 2 + 3).toFixed(1),
              deliveryTime: `${Math.floor(Math.random() * 15) + 20} mins`,
              imageUrl,
            };
          });

          setRestaurants(restaurantData);
        } else {
          console.warn('Platform data not found');
        }
      } else {
        console.warn('Dish not found');
      }
    };

    if (platform && dishName) {
      updateData(); // Initial fetch
      intervalId = setInterval(updateData, 30000); // Refresh every 30s
    }

    return () => clearInterval(intervalId);
  }, [platform, dishName]);

  if (!platform || !dishName) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-white p-6"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 z-0" />
      <div className="relative z-10">
        <h1 className="text-2xl font-bold capitalize mb-4">
          {platform} - Restaurants for "{dishName}"
        </h1>

        {restaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.map((restaurant, index) => (
              <DishCard
                key={index}
                restaurant={restaurant.name}
                rating={parseFloat(restaurant.rating)}
                deliveryTime={restaurant.deliveryTime}
                dishName={dishName}
                price={restaurant.price}
                imageUrl={restaurant.imageUrl}
                onMoreDetails={() => setSelectedDish(restaurant)}
              />
            ))}
          </div>
        ) : (
          <p>No restaurants available for this platform.</p>
        )}

        {selectedDish && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedDish(null)}
          >
            <div
              className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
                onClick={() => setSelectedDish(null)}
              >
                ×
              </button>

              <img
                src={selectedDish.imageUrl}
                alt={selectedDish.dishName || dishName}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />

              <h2 className="text-xl font-bold text-gray-800 mb-2">{dishName}</h2>
              <p className="text-lg text-gray-700 font-semibold mb-1">₹{selectedDish.price}</p>
              <p className="text-sm text-gray-500">
                🔥 {Math.floor(Math.random() * 300 + 250)} calories
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformPage;
