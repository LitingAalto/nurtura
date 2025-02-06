import React from 'react';

interface GrowthTabsProps {
  activeTab: 'records' | 'height' | 'weight' | 'head';
  onTabChange: (tab: 'records' | 'height' | 'weight' | 'head') => void;
}

const GrowthTabs: React.FC<GrowthTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'records', label: 'Record List' },
    { id: 'height', label: 'Height Curve' },
    { id: 'weight', label: 'Weight Curve' },
    { id: 'head', label: 'Head Measurement' },
  ];

  return (
    <div className="flex border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as any)}
          className={`flex-1 py-2 text-sm ${
            activeTab === tab.id
              ? 'text-pink-500 border-b-2 border-pink-500'
              : 'text-gray-500'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default GrowthTabs;