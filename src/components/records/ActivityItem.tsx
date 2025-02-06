import React from 'react';
import { Activity } from '../../types/activities';
import { getTimeAgo } from '../../utils/dateUtils';
import ActivitySummary from './ActivitySummary';

interface ActivityItemProps {
  activity: Activity;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'breastfeeding': return '🤱';
      case 'formula': return '🍼';
      case 'pumped_milk': return '💧';
      case 'sleep': return '😴';
      case 'diaper': return '👶';
      case 'pump': return '⚡';
      default: return '📝';
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'breastfeeding': return 'text-pink-500';
      case 'formula': return 'text-blue-500';
      case 'pumped_milk': return 'text-purple-500';
      case 'sleep': return 'text-indigo-500';
      case 'diaper': return 'text-green-500';
      case 'pump': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg">
      <div className="text-sm text-gray-500 w-16">
        {activity.timestamp.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </div>
      <div className={`w-6 ${getActivityColor(activity.type)}`}>
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1">
        <ActivitySummary activity={activity} />
        <div className={`text-xs ${getActivityColor(activity.type)}`}>
          {getTimeAgo(activity.timestamp)}
        </div>
        {activity.notes && (
          <div className="text-sm text-gray-600 mt-1">
            {activity.notes}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityItem;