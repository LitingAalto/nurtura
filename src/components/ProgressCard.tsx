import React from 'react';
import { formatDate } from '../utils/dateUtils';

interface ProgressCardProps {
  currentWeek: number;
  dueDate: Date;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ currentWeek, dueDate }) => {
  return (
    <div className="mb-4 bg-white rounded-lg p-4 shadow">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-purple-600">{currentWeek}</div>
          <div className="text-sm text-gray-600">Current Week</div>
        </div>
        <div className="text-center">
          <div className="text-xl text-purple-600">
            {formatDate(dueDate)}
          </div>
          <div className="text-sm text-gray-600">Due Date</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;