import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBabyStore } from '../store/babyStore';
import { getWeekData } from '../data/weeklyDevelopment';
import WeeklyProgress from '../components/baby-details/WeeklyProgress';
import DevelopmentSection from '../components/baby-details/DevelopmentSection';
import GrowthStats from '../components/baby-details/GrowthStats';
import ActivitySection from '../components/baby-details/ActivitySection';

const BabyWeeklyPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentWeek, setCurrentWeek] = useState(24);
  const weekData = getWeekData(currentWeek);

  const handleAnswer = (answer: boolean) => {
    // Store the answer in local storage or state management
    console.log('Development milestone answered:', answer);
  };

  const handleWeekChange = (week: number) => {
    if (week > 0 && week <= 52) {
      setCurrentWeek(week);
    }
  };

  if (!weekData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">No data available for this week</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="flex items-center p-4">
          <button onClick={() => navigate(-1)} className="text-gray-600">
            ←
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold">Baby's Weekly Development</h1>
          <div className="w-8" />
        </div>
        
        <WeeklyProgress 
          currentWeek={currentWeek} 
          dateRange={`Week ${currentWeek}`}
          onWeekChange={handleWeekChange}
        />
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-purple-600 mb-2">{weekData.title}</h2>
          <p className="text-gray-600">{weekData.description}</p>
        </div>

        <DevelopmentSection
          description={weekData.milestones.join('\n')}
          question={weekData.developmentQuestion.question}
          onAnswer={handleAnswer}
        />

        <GrowthStats
          height={weekData.heightRange}
          weight={weekData.weightRange}
        />

        {weekData.activities.map((activity, index) => (
          <ActivitySection
            key={index}
            description={`${activity.title}: ${activity.description}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BabyWeeklyPage;