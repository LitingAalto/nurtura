import React from 'react';
import { Activity } from '../../types/activity';

interface ActivitySelectorProps {
  activities: Activity[];
  selectedActivity: Activity | null;
  onSelect: (activity: Activity) => void;
}

const ActivitySelector: React.FC<ActivitySelectorProps> = ({
  activities,
  selectedActivity,
  onSelect,
}) => {
  return (
    <div className="overflow-x-auto bg-white mb-4">
      <div className="flex space-x-6 p-4 min-w-min">
        {activities.map((activity) => (
          <button
            key={activity.id}
            onClick={() => onSelect(activity)}
            className="flex flex-col items-center min-w-[64px]"
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
              selectedActivity?.id === activity.id
                ? 'bg-lime-400 text-white'
                : 'bg-gray-100'
            }`}>
              <span className="text-2xl">{activity.icon}</span>
            </div>
            <span className="text-xs text-gray-600 whitespace-nowrap">{activity.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActivitySelector;