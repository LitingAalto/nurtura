import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FoodGrid from '../components/solid/FoodGrid';
import SelectedFoods from '../components/solid/SelectedFoods';
import { Food } from '../types/solid';

const popularFoods: Food[] = [
  { id: '1', name: 'Apple', icon: '🍎', category: 'Fruit' },
  { id: '2', name: 'Banana', icon: '🍌', category: 'Fruit' },
  { id: '3', name: 'Carrot', icon: '🥕', category: 'Vegetable' },
  { id: '4', name: 'Sweet Potato', icon: '🍠', category: 'Vegetable' },
  { id: '5', name: 'Avocado', icon: '🥑', category: 'Fruit' },
  { id: '6', name: 'Pear', icon: '🍐', category: 'Fruit' },
  { id: '7', name: 'Broccoli', icon: '🥦', category: 'Vegetable' },
  { id: '8', name: 'Rice', icon: '🍚', category: 'Grain' },
];

const SolidFoodPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFoods, setSelectedFoods] = useState<Food[]>([]);

  const handleFoodSelect = (food: Food) => {
    if (!selectedFoods.find(f => f.id === food.id)) {
      setSelectedFoods([...selectedFoods, food]);
    }
  };

  const handleFoodRemove = (foodId: string) => {
    setSelectedFoods(selectedFoods.filter(food => food.id !== foodId));
  };

  const handleNext = () => {
    if (selectedFoods.length > 0) {
      navigate('/solid/details', { state: { foods: selectedFoods } });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <button onClick={() => navigate('/records')} className="text-gray-600">
          ×
        </button>
        <h1 className="text-lg font-medium">Add Solid Food</h1>
        <div className="w-8" />
      </div>

      <SelectedFoods foods={selectedFoods} onRemove={handleFoodRemove} />

      <div className="flex-1 overflow-y-auto">
        <FoodGrid foods={popularFoods} onFoodSelect={handleFoodSelect} />
      </div>

      <div className="p-4">
        <button
          onClick={handleNext}
          disabled={selectedFoods.length === 0}
          className={`w-full py-3 rounded-full text-white text-lg ${
            selectedFoods.length > 0 ? 'bg-pink-500' : 'bg-gray-300'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SolidFoodPage;