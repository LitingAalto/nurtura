import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TabBarProps {
  activeTab: 'mom' | 'baby';
  onTabChange: (tab: 'mom' | 'baby') => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();
  
  const handleTabChange = (tab: 'mom' | 'baby') => {
    onTabChange(tab);
    navigate(tab === 'mom' ? '/mom' : '/');
  };

  return (
    <div className="flex justify-center space-x-12 p-4 bg-white border-b border-pink-100">
      <button
        onClick={() => handleTabChange('mom')}
        className={`px-8 py-2 rounded-full ${
          activeTab === 'mom' ? 'bg-pink-500 text-white' : 'text-gray-500'
        }`}
      >
        Mom
      </button>
      <button
        onClick={() => handleTabChange('baby')}
        className={`px-8 py-2 rounded-full ${
          activeTab === 'baby' ? 'bg-pink-500 text-white' : 'text-gray-500'
        }`}
      >
        Baby
      </button>
    </div>
  );
};

export default TabBar;