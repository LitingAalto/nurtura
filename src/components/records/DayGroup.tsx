import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity } from '../../types/activities';
import ActivityItem from './ActivityItem';
import { getDailySummary } from '../../utils/activitySummary';
import { startOfDay, endOfDay } from 'date-fns';

interface DayGroupProps {
  date: string;
  activities: Activity[];
  babyAge: string;
}

const DayGroup: React.FC<DayGroupProps> = ({ date, activities, babyAge }) => {
  const navigate = useNavigate();
  const isToday = new Date(date).toDateString() === new Date().toDateString();

  // Split sleep activities that cross midnight
  const processedActivities = activities.reduce((acc: Activity[], activity) => {
    if (activity.type === 'sleep') {
      const sleepActivity = activity as Activity & { startTime: Date; endTime: Date };
      const dayStart = startOfDay(new Date(date));
      const dayEnd = endOfDay(new Date(date));

      if (sleepActivity.startTime < dayStart && sleepActivity.endTime > dayStart) {
        // Sleep started previous day and ends today
        acc.push({
          ...sleepActivity,
          id: `${sleepActivity.id}-today`,
          startTime: dayStart,
          endTime: sleepActivity.endTime,
          duration: Math.floor((sleepActivity.endTime.getTime() - dayStart.getTime()) / 1000)
        });
      } else if (sleepActivity.startTime < dayEnd && sleepActivity.endTime > dayEnd) {
        // Sleep starts today and continues to next day
        acc.push({
          ...sleepActivity,
          id: `${sleepActivity.id}-today`,
          startTime: sleepActivity.startTime,
          endTime: dayEnd,
          duration: Math.floor((dayEnd.getTime() - sleepActivity.startTime.getTime()) / 1000)
        });
      } else if (sleepActivity.startTime >= dayStart && sleepActivity.endTime <= dayEnd) {
        // Sleep starts and ends today
        acc.push(sleepActivity);
      }
    } else {
      acc.push(activity);
    }
    return acc;
  }, []);

  // Calculate daily summary after processing sleep records
  const summary = getDailySummary(processedActivities);

  const handleActivityClick = (activity: Activity) => {
    let route = '';
    switch (activity.type) {
      case 'breastfeeding':
        route = '/feeding';
        break;
      case 'formula':
        route = '/formula';
        break;
      case 'pumped_milk':
        route = '/mothers-milk';
        break;
      case 'sleep':
        route = '/sleep';
        break;
      case 'diaper':
        route = '/diaper';
        break;
      case 'pump':
        route = '/pump';
        break;
    }
    navigate(route, { state: { activity } });
  };

  return (
    <div className="mb-6">
      <div className="text-sm text-gray-600 mb-2">
        {isToday ? `Today (${babyAge})` : `${date} (${babyAge})`}
      </div>
      
      {summary && (
        <div className="text-xs text-gray-500 mb-3">
          {summary}
        </div>
      )}

      <div className="space-y-2">
        {processedActivities.map((activity) => (
          <div 
            key={activity.id} 
            onClick={() => handleActivityClick(activity)}
            className="cursor-pointer"
          >
            <ActivityItem activity={activity} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayGroup;