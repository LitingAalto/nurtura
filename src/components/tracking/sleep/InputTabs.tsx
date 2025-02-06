import React from 'react';

interface InputTabsProps {
  activeTab: 'timer' | 'manual';
  onTabChange: (tab: 'timer' | 'manual') => void;
}

const InputTabs: React.FC<InputTabsProps> = ({ activeTab, onTabChange }) => (
  <div className="flex justify-center space-x-4 mb-6">
    <button
      onClick={() => onTabChange('timer')}
      className={`px-6 py-2 rounded-full ${
        activeTab === 'timer' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100'
      }`}
    >
      Timer
    </button>
    <button
      onClick={() => onTabChange('manual')}
      className={`px-6 py-2 rounded-full ${
        activeTab === 'manual' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100'
      }`}
    >
      Manual Input
    </button>
  </div>
);

export default InputTabs;