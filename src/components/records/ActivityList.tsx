import React from 'react';
import { useActivityStore } from '../../store/activityStore';
import DayGroup from './DayGroup';
import { calculateBabyAge } from '../../utils/dateUtils';

const ActivityList: React.FC = () => {
  const activities = useActivityStore(state => state.activities);
  
  // Group activities by date
  const groupedActivities = React.useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    
    activities.forEach(activity => {
      const date = activity.timestamp.toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(activity);
    });
    
    // Sort dates in descending order
    return Object.entries(groups)
      .sort(([dateA], [dateB]) => 
        new Date(dateB).getTime() - new Date(dateA).getTime()
      )
      .reduce((acc, [date, activities]) => {
        acc[date] = activities;
        return acc;
      }, {} as { [key: string]: any[] });
  }, [activities]);

  return (
    <div className="px-4">
      {Object.entries(groupedActivities).map(([date, activities]) => {
        const babyAge = calculateBabyAge(new Date('2023-08-15')); // Replace with actual birth date
        
        return (
          <DayGroup 
            key={date} 
            date={date} 
            activities={activities}
            babyAge={babyAge}
          />
        );
      })}
    </div>
  );
};

export default ActivityList;