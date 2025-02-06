import React from 'react';
import { useNavigate } from 'react-router-dom';
import WeeklyProgress from '../components/baby-details/WeeklyProgress';
import DevelopmentSection from '../components/baby-details/DevelopmentSection';
import GrowthStats from '../components/baby-details/GrowthStats';
import ActivitySection from '../components/baby-details/ActivitySection';

const BabyDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleAnswer = (answer: boolean) => {
    // Handle the answer (can be integrated with state management later)
    console.log('Development milestone answered:', answer);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="flex items-center p-4">
          <button onClick={() => navigate(-1)} className="text-gray-600">
            ←
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold">Baby's Weekly Development</h1>
          <div className="w-8" /> {/* Spacer for alignment */}
        </div>
        
        <WeeklyProgress currentWeek={19} dateRange="Dec 22 - Dec 28" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <DevelopmentSection
          description="Your baby's ability to move and interact with toys has improved. They may now shake or grasp small rattles or similar toys for longer periods. Colors such as red, yellow, and green may also start to become recognizable."
          question="Can your baby shake and grasp toys by themselves?"
          onAnswer={handleAnswer}
        />

        <GrowthStats
          height="60.6-69.8cm"
          weight="6.0-9.5kg"
        />

        <ActivitySection
          description="Your baby's limb movements are becoming more active and coordinated. They can now grasp and play with toys, showing improved hand-eye coordination."
        />
      </div>
    </div>
  );
};

export default BabyDetailsPage;