import React from 'react';
import { Activity } from '../../types/activities';
import { formatDuration } from '../../utils/timeUtils';

interface ActivitySummaryProps {
  activity: Activity;
}

const ActivitySummary: React.FC<ActivitySummaryProps> = ({ activity }) => {
  switch (activity.type) {
    case 'breastfeeding':
      return (
        <>
          Left: {Math.round(activity.duration.left / 60)}m •
          Right: {Math.round(activity.duration.right / 60)}m
        </>
      );

    case 'formula':
      return <>{activity.amount}ml</>;

    case 'pumped_milk':
      return <>{activity.amount}ml</>;

    case 'sleep':
      const durationSeconds = Math.floor((activity.endTime.getTime() - activity.startTime.getTime()) / 1000);
      const formattedDuration = formatDuration(durationSeconds); // Use the imported function!

      return (
        <>
          {activity.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
          {activity.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} •
          {formattedDuration}
        </>
      );

    case 'diaper':
      return <>{activity.diaperType}</>;

    case 'pump':
      return (
        <>
          Left: {activity.amount.left}ml •
          Right: {activity.amount.right}ml
        </>
      );

    default:
      return null;
  }
};

export default ActivitySummary;