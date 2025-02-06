import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChartBarIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import ActivityList from '../components/records/ActivityList';
import BottomNav from '../components/records/BottomNav';
import MinimizedWindows from '../components/records/MinimizedWindows';
import { calculateBabyAge } from '../utils/dateUtils';
import { useActivityStore } from '../store/activityStore';

const RecordsPage: React.FC = () => {
  const navigate = useNavigate();
  const { loadActivities } = useActivityStore();
  const babyAge = calculateBabyAge(new Date('2024-08-15')); // Replace with actual birth date
  
  useEffect(() => {
    // Load last 30 days of activities
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    loadActivities(startDate, endDate).catch(console.error);
  }, [loadActivities]);

  const handleBack = () => {
    navigate('/', { state: { activeTab: 'baby' } });
  };

  return (
    <div className="flex flex-col h-screen bg-pink-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-pink-100">
        <div className="flex items-center">
          <button 
            onClick={handleBack}
            className="text-gray-600"
          >
            ←
          </button>
          <h1 className="text-lg font-medium ml-2">All Records</h1>
        </div>
        <div className="flex space-x-4">
          <button>
            <AdjustmentsHorizontalIcon className="h-6 w-6 text-gray-600" />
          </button>
          <button onClick={() => navigate('/statistics')}>
            <ChartBarIcon className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Baby Age */}
      <div className="px-4 py-2 text-sm text-gray-600">
        Today ({babyAge})
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto">
        <ActivityList />
      </div>

      {/* Minimized Windows */}
      <MinimizedWindows />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default RecordsPage;