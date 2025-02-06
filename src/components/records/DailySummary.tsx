import React from 'react';
import { Activity } from '../../types/activities';
import { formatTime } from '../../utils/timeUtils';

interface DailySummaryProps {
  activities: Activity[];
}

const DailySummary: React.FC<DailySummaryProps> = ({ activities }) => {
  const summary = activities.reduce((acc, activity) => {
    switch (activity.type) {
      case 'breastfeeding':
        acc.breastfeeding = (acc.breastfeeding || 0) + 1;
        break;
      case 'formula':
        acc.formulaAmount = (acc.formulaAmount || 0) + activity.amount;
        break;
      case 'pumped_milk':
        acc.pumpedAmount = (acc.pumpedAmount || 0) + activity.amount;
        break;
      case 'sleep':
        acc.sleep = (acc.sleep || 0) + 1;
        acc.totalSleepTime = (acc.totalSleepTime || 0) + 
          Math.floor((activity.endTime.getTime() - activity.startTime.getTime()) / 1000);
        break;
      case 'diaper':
        acc.diaper = (acc.diaper || 0) + 1;
        break;
      case 'pump':
        acc.pumpAmount = (acc.pumpAmount || 0) + 
          (activity.amount.left + activity.amount.right);
        break;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="text-xs text-gray-500 mb-3">
      {summary.breastfeeding > 0 && `• ${summary.breastfeeding}x Breastfeeding`}
      {summary.formulaAmount > 0 && ` • ${summary.formulaAmount}ml Formula`}
      {summary.pumpedAmount > 0 && ` • ${summary.pumpedAmount}ml Mother's Milk`}
      {summary.sleep > 0 && ` • ${summary.sleep}x Sleep (${formatTime(summary.totalSleepTime)})`}
      {summary.diaper > 0 && ` • ${summary.diaper}x Diaper`}
      {summary.pumpAmount > 0 && ` • ${summary.pumpAmount}ml Pumped`}
    </div>
  );
};

export default DailySummary;