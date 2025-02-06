import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useActivityStore } from '../store/activityStore';
import TimeSelector from '../components/tracking/common/TimeSelector';
import FoodDetails from '../components/solid/FoodDetails';
import ReactionSelector from '../components/solid/ReactionSelector';
import { Food, Reaction } from '../types/solid';

const SolidFoodDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addActivity } = useActivityStore();
  
  const [startTime, setStartTime] = useState(new Date());
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [notes, setNotes] = useState('');
  
  const foods = location.state?.foods as Food[];

  const handleAmountChange = (foodId: string, amount: string) => {
    setAmounts({ ...amounts, [foodId]: amount });
  };

  const handleSave = () => {
    const activity = {
      id: crypto.randomUUID(),
      type: 'solid' as const,
      timestamp: startTime,
      foods: foods.map(food => ({
        food,
        amount: amounts[food.id] || ''
      })),
      reaction,
      notes
    };
    
    addActivity(activity);
    navigate('/records');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          ←
        </button>
        <h1 className="text-lg font-medium">Food Details</h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <TimeSelector
            label="Time"
            value={startTime}
            onChange={setStartTime}
          />
        </div>

        <FoodDetails
          foods={foods}
          amounts={amounts}
          onAmountChange={handleAmountChange}
          onAddMore={() => navigate('/solid')}
        />

        <ReactionSelector
          selected={reaction}
          onChange={setReaction}
        />

        <div className="p-4">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes..."
            className="w-full p-3 bg-white rounded-lg border border-gray-200 resize-none"
            rows={4}
          />
        </div>
      </div>

      <div className="p-4">
        <button
          onClick={handleSave}
          className="w-full py-3 rounded-full bg-pink-500 text-white text-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SolidFoodDetailsPage;