import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WeekSelector from '../components/mom/postpartum/WeekSelector';
import PhysicalChanges from '../components/mom/postpartum/PhysicalChanges';
import PsychologicalChanges from '../components/mom/postpartum/PsychologicalChanges';
import RecoveryTips from '../components/mom/postpartum/RecoveryTips';

const PostpartumDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentWeek, setCurrentWeek] = useState(19);

  const handleWeekChange = (week: number) => {
    setCurrentWeek(week);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="flex items-center p-4">
          <button onClick={() => navigate(-1)} className="text-gray-600">
            ←
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold">Postpartum Recovery</h1>
          <div className="w-8" />
        </div>
        
        <WeekSelector 
          currentWeek={currentWeek} 
          onWeekChange={handleWeekChange} 
        />
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-pink-500 text-white p-4 rounded-lg">
          <div className="text-lg font-semibold">Postpartum Week {currentWeek}</div>
          <div className="text-sm mt-1">
            {new Date().toLocaleDateString('en-US', { 
              month: 'short',
              day: 'numeric'
            })}
          </div>
        </div>

        <PhysicalChanges />
        <PsychologicalChanges />
        <RecoveryTips />
      </div>
    </div>
  );
};

export default PostpartumDetailsPage;