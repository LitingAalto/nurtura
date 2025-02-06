import React from 'react';

interface RecoveryTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const RecoveryTabs: React.FC<RecoveryTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: '1-2', label: '1-2 postpartum' },
    { id: '3-4', label: '3-4 postpartum' },
    { id: '5-6', label: '5-6 postpartum' }
  ];

  return (
    <div className="flex border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-3 text-sm relative ${
            activeTab === tab.id
              ? 'text-yellow-600'
              : 'text-gray-500'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-600" />
          )}
        </button>
      ))}
    </div>
  );
};

export default RecoveryTabs;