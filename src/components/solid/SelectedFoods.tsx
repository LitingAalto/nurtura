import React from 'react';
import { Food } from '../../types/solid';

interface SelectedFoodsProps {
  foods: Food[];
  onRemove: (foodId: string) => void;
}

const SelectedFoods: React.FC<SelectedFoodsProps> = ({ foods, onRemove }) => {
  if (foods.length === 0) return null;

  return (
    <div className="p-4 bg-white border-b border-gray-100">
      <h3 className="text-sm text-gray-600 mb-2">Selected Foods</h3>
      <div className="flex flex-wrap gap-2">
        {foods.map((food) => (
          <div
            key={food.id}
            className="flex items-center bg-gray-50 rounded-full px-3 py-1"
          >
            <span className="mr-1">{food.icon}</span>
            <span className="text-sm">{food.name}</span>
            <button
              onClick={() => onRemove(food.id)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedFoods;