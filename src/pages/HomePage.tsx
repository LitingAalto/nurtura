import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TabBar from '../components/home/TabBar';
import BabyInfo from '../components/home/BabyInfo';
import QuickActions from '../components/home/QuickActions';
import RecentActivities from '../components/home/RecentActivities';

const HomePage: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'mom' | 'baby'>('baby');
  const birthDate = new Date(2024, 8, 15); // Example birth date

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === 'baby' && (
        <>
          <BabyInfo 
            birthDate={birthDate}
            name="Baby"
          />
          <QuickActions />
          <RecentActivities />
          
          <div className="p-4 mt-auto">
            <button 
              onClick={() => {/* Implement invite functionality */}}
              className="w-full bg-pink-500 text-white py-3 rounded-full font-medium"
            >
              Invite Family Members
            </button>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              2 family members linked
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;