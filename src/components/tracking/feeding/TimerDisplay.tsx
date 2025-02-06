import React, { useEffect } from 'react';
import { formatTime } from '../../../utils/timeUtils';

interface TimerDisplayProps {
  activeTimer: 'left' | 'right' | null;
  duration: { left: number; right: number };
  onTimerToggle: (side: 'left' | 'right') => void;
  onDurationChange: (duration: { left: number; right: number }) => void;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
  activeTimer,
  duration,
  onTimerToggle,
  onDurationChange
}) => {
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeTimer) {
      interval = setInterval(() => {
        onDurationChange({
          ...duration,
          [activeTimer]: duration[activeTimer] + 1
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTimer, duration, onDurationChange]);

  return (
    <div className="flex-1 p-4">
      <div className="text-center mb-8">
        <p className="text-gray-600 mb-2">Total Duration</p>
        <h2 className="text-4xl font-medium">
          {formatTime(duration.left + duration.right)}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onTimerToggle('left')}
          className={`aspect-square rounded-full flex flex-col items-center justify-center ${
            activeTimer === 'left' ? 'bg-pink-500 text-white' : 'bg-pink-100'
          }`}
        >
          <span>Left</span>
          <span className="text-2xl my-2">{formatTime(duration.left)}</span>
          <span>{activeTimer === 'left' ? '⏸' : '▶'}</span>
        </button>

        <button
          onClick={() => onTimerToggle('right')}
          className={`aspect-square rounded-full flex flex-col items-center justify-center ${
            activeTimer === 'right' ? 'bg-pink-500 text-white' : 'bg-pink-100'
          }`}
        >
          <span>Right</span>
          <span className="text-2xl my-2">{formatTime(duration.right)}</span>
          <span>{activeTimer === 'right' ? '⏸' : '▶'}</span>
        </button>
      </div>
    </div>
  );
};

export default TimerDisplay;