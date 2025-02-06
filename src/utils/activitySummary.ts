import { Activity } from '../types/activities';
import { formatDuration } from './timeUtils';

export const getDailySummary = (activities: Activity[]): string => {
  const summary = activities.reduce((acc, activity) => {
    switch (activity.type) {
      case 'breastfeeding':
        acc.breastfeeding = (acc.breastfeeding || 0) + 
          Math.round((activity.duration.left + activity.duration.right) / 60);
        break;
      case 'sleep':
        const sleepActivity = activity as Activity & { startTime: Date; endTime: Date };
        acc.sleep = (acc.sleep || 0) + 
          Math.floor((sleepActivity.endTime.getTime() - sleepActivity.startTime.getTime()) / 1000);
        break;
      case 'pump':
        acc.pump = (acc.pump || 0) + 
          (activity.amount.left + activity.amount.right);
        break;
      case 'formula':
        acc.formula = (acc.formula || 0) + activity.amount;
        break;
    }
    return acc;
  }, {} as Record<string, number>);

  const parts = [];
  if (summary.breastfeeding) {
    parts.push(`Breastfeeding ${summary.breastfeeding}m`);
  }
  if (summary.sleep) {
    const hours = Math.floor(summary.sleep / 3600);
    const minutes = Math.floor((summary.sleep % 3600) / 60);
    parts.push(`Sleep ${hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`}`);
  }
  if (summary.pump) {
    parts.push(`Pump ${summary.pump}ml`);
  }
  if (summary.formula) {
    parts.push(`Formula ${summary.formula}ml`);
  }

  return parts.join(' • ');
};