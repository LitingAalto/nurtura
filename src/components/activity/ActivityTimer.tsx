import React from 'react';
import { formatDuration } from '../../utils/timeUtils';

interface ActivityTimerProps {
  isActive: boolean;
  duration: number;
  onToggle: () => void;
}

const ActivityTimer: React.FC<ActivityTimerProps> = ({
  isActive,
  duration,
  onToggle,
}) => {
  return (
    <div className="flex flex-col items-center py-8">
      <div className="text-4xl font-light mb-8">
        {formatDuration(duration)}
      </div>
      <button
        onClick={onToggle}
        className={`w-32 h-32 rounded-full flex items-center justify-center text-white text-xl ${
          isActive ? 'bg-red-500' : 'bg-purple-500'
        }`}
      >
        {isActive ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};

export default ActivityTimer;