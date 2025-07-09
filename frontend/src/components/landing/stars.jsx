import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const ratingLabels = {
  1: '1 - Poor',
  2: '2 - Fair',
  3: '3 - Good',
  4: '4 - Very Good',
  5: '5 - Excellent',
};

const StarRatingSelector = ({ rating, setRating }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="flex flex-col items-center space-y-1">
      <div className="flex justify-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = hovered ? hovered >= star : rating >= star;

          return (
            <FaStar
              key={star}
              size={28}
              title={ratingLabels[star]}
              className={`cursor-pointer transition-colors duration-200 ${
                isFilled ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(null)}
            />
          );
        })}
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400 h-4">
        {hovered ? ratingLabels[hovered] : rating ? ratingLabels[rating] : 'Select rating'}
      </span>
    </div>
  );
};

export default StarRatingSelector;
