import React, { useState, useEffect } from 'react';
import { formatTime } from '../../../utils/timeUtils';

interface SleepTimerProps {
  onStart: (time: Date) => void;
  onStop: (time: Date) => void;
  isActive: boolean;
}

const SleepTimer: React.FC<SleepTimerProps> = ({ onStart, onStop, isActive }) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const handleToggle = () => {
    if (isActive) {
      onStop(new Date());
    } else {
      setDuration(0);
      onStart(new Date());
    }
  };

  return (
    <div className="flex flex-col items-center my-8">
      <div className="text-4xl font-bold mb-4">
        {formatTime(duration)}
      </div>
      <button
        onClick={handleToggle}
        className={`w-24 h-24 rounded-full flex items-center justify-center ${
          isActive ? 'bg-red-500' : 'bg-purple-500'
        } text-white text-4xl`}
      >
        {isActive ? '⏸' : '▶'}
      </button>
    </div>
  );
}

export default SleepTimer;