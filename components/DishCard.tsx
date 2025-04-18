// components/DishCard.tsx
import { ArrowRight } from 'lucide-react';

interface DishCardProps {
  restaurant: string;
  rating: number;
  deliveryTime: string;
  dishName: string;
  price: number;
  imageUrl: string;
  onMoreDetails: () => void; // NEW
}

export const DishCard = ({
  restaurant,
  rating,
  deliveryTime,
  dishName,
  price,
  imageUrl,
  onMoreDetails,
}: DishCardProps) => {
  return (
    <div className="rounded-2xl shadow-md p-4 flex flex-col gap-2 w-full max-w-sm
      bg-gradient-to-br from-white/10 via-white/20 to-white/10
      backdrop-blur-xl border border-white/10 ring-1 ring-white/10
      transition-transform hover:scale-[1.02] duration-300
    ">
      {/* Restaurant Info */}
      <div className="flex justify-between items-center text-gray-200 text-sm font-semibold">
        <span>By {restaurant}</span>
        <ArrowRight className="w-4 h-4" />
      </div>

      {/* Dish Details */}
      <div className="flex gap-4">
        {/* Dish Info */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-300">⭐ {rating} · {deliveryTime}</span>
          <h3 className="font-bold text-lg text-white">{dishName}</h3>
          <p className="text-base font-semibold text-white">₹{price}</p>

          <button
            onClick={onMoreDetails}
            className="mt-1 text-sm text-white hover:text-white/90 flex items-center gap-1"
          >
            More Details <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Dish Image */}
        <div className="shrink-0">
          <img
            src={imageUrl}
            alt={dishName}
            className="w-24 h-24 rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};
