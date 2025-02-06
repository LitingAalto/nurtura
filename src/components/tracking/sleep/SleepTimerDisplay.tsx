import React, { useEffect } from 'react';
import { formatDuration } from '../../../utils/timeUtils';

interface SleepTimerDisplayProps {
  isActive: boolean;
  duration: number;
  startTime: Date | null;
  onToggle: () => void;
  onDurationChange: (duration: number) => void;
}

const SleepTimerDisplay: React.FC<SleepTimerDisplayProps> = ({
  isActive,
  duration,
  startTime,
  onToggle,
  onDurationChange
}) => {
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        onDurationChange(duration + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, duration, onDurationChange]);

  return (
    <div className="flex flex-col items-center px-4 py-6">
      <div className="text-center mb-8">
        <h2 className="text-gray-600 mb-2">Total Duration</h2>
        <div className="text-4xl font-light">
          {formatDuration(duration)}
        </div>
      </div>

      {startTime && (
        <div className="w-full mb-8">
          <p className="text-gray-600 mb-2">Start Time</p>
          <div className="bg-gray-50 p-3 rounded-lg">
            {startTime.toLocaleString('en-US', {
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            })}
          </div>
        </div>
      )}

      <div className="w-32 h-32 mb-8">
        <button
          onClick={onToggle}
          className={`w-full h-full rounded-full ${
            isActive ? 'bg-red-500' : 'bg-purple-500'
          } text-white flex items-center justify-center text-xl`}
        >
          {isActive ? '⏸' : '▶'}
        </button>
      </div>
    </div>
  );
};

export default SleepTimerDisplay;