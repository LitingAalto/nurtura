import React from 'react';
import { Food } from '../../types/solid';

interface FoodDetailsProps {
  foods: Food[];
  amounts: Record<string, string>;
  onAmountChange: (foodId: string, amount: string) => void;
  onAddMore: () => void;
}

const FoodDetails: React.FC<FoodDetailsProps> = ({
  foods,
  amounts,
  onAmountChange,
  onAddMore,
}) => {
  return (
    <div className="p-4">
      {foods.map((food) => (
        <div key={food.id} className="flex items-center mb-4">
          <span className="text-2xl mr-3">{food.icon}</span>
          <div className="flex-1">
            <div className="text-sm font-medium">{food.name}</div>
            <input
              type="text"
              value={amounts[food.id] || ''}
              onChange={(e) => onAmountChange(food.id, e.target.value)}
              placeholder="Amount (e.g., 2 spoons)"
              className="w-full mt-1 p-2 text-sm bg-gray-50 rounded-lg"
            />
          </div>
        </div>
      ))}
      <button
        onClick={onAddMore}
        className="text-pink-500 text-sm"
      >
        + Add more food
      </button>
    </div>
  );
};

export default FoodDetails;