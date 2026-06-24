import React from "react";
import { Star, StarHalf } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  className?: string;
  showNumber?: boolean;
}

export function RatingStars({ rating, className = "", showNumber = false }: RatingStarsProps) {
  const safeRating = typeof rating === "number" && !isNaN(rating) ? rating : 0;
  const fullStars = Math.floor(safeRating);
  const hasHalf = safeRating % 1 >= 0.25 && safeRating % 1 < 0.75;
  const roundedRating = safeRating % 1 >= 0.75 ? Math.ceil(safeRating) : fullStars;
  
  const starsArray = [];
  
  // Add full stars
  for (let i = 0; i < (safeRating % 1 >= 0.75 ? roundedRating : fullStars); i++) {
    starsArray.push("full");
  }
  
  // Add half star if applicable
  if (hasHalf) {
    starsArray.push("half");
  }
  
  // Fill the rest with empty
  while (starsArray.length < 5) {
    starsArray.push("empty");
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {starsArray.map((type, index) => {
          if (type === "full") {
            return (
              <Star
                key={index}
                className="h-3.5 w-3.5 fill-pink-400 text-pink-400 drop-shadow-[0_0_3px_rgba(244,143,171,0.3)]"
              />
            );
          }
          if (type === "half") {
            return (
              <div key={index} className="relative">
                <Star className="h-3.5 w-3.5 text-pink-200" />
                <div className="absolute inset-0 overflow-hidden w-[50%]">
                  <Star className="h-3.5 w-3.5 fill-pink-400 text-pink-400" />
                </div>
              </div>
            );
          }
          return (
            <Star
              key={index}
              className="h-3.5 w-3.5 text-pink-200 fill-transparent"
            />
          );
        })}
      </div>
      {showNumber && (
        <span className="text-[11px] font-bold text-neutral-600 ml-1">
          {safeRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
