import React from 'react';

interface ActivityTypeFilterProps {
  selectedTypes: string[];
  onTypeSelect: (types: string[]) => void;
}

const ActivityTypeFilter: React.FC<ActivityTypeFilterProps> = ({
  selectedTypes,
  onTypeSelect,
}) => {
  const types = [
    { id: 'all', label: 'All' },
    { id: 'breastfeeding', label: 'Breastfeeding', icon: '🤱' },
    { id: 'sleep', label: 'Sleep', icon: '😴' },
    { id: 'diaper', label: 'Diaper', icon: '👶' },
    { id: 'formula', label: 'Formula', icon: '🍼' },
    { id: 'pumped_milk', label: "Mother's Milk", icon: '💧' },
    { id: 'pump', label: 'Pump', icon: '⚡' },
  ];

  const handleTypeClick = (typeId: string) => {
    if (typeId === 'all') {
      onTypeSelect(['all']);
    } else {
      const newTypes = selectedTypes.includes('all')
        ? [typeId]
        : selectedTypes.includes(typeId)
          ? selectedTypes.filter(t => t !== typeId)
          : [...selectedTypes, typeId];
      onTypeSelect(newTypes.length ? newTypes : ['all']);
    }
  };

  return (
    <div className="p-4 bg-white border-b border-pink-100">
      <div className="flex overflow-x-auto space-x-2 pb-2">
        {types.map(type => (
          <button
            key={type.id}
            onClick={() => handleTypeClick(type.id)}
            className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap ${
              selectedTypes.includes(type.id)
                ? 'bg-pink-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {type.icon && <span className="mr-1">{type.icon}</span>}
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActivityTypeFilter;