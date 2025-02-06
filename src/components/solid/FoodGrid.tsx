import React from 'react';
import { Food } from '../../types/solid';

interface FoodGridProps {
  foods: Food[];
  onFoodSelect: (food: Food) => void;
}

const FoodGrid: React.FC<FoodGridProps> = ({ foods, onFoodSelect }) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {foods.map((food) => (
        <button
          key={food.id}
          onClick={() => onFoodSelect(food)}
          className="flex flex-col items-center p-2 bg-white rounded-lg shadow-sm"
        >
          <span className="text-2xl mb-1">{food.icon}</span>
          <span className="text-xs text-gray-600">{food.name}</span>
        </button>
      ))}
    </div>
  );
};

export default FoodGrid;