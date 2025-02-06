import React from 'react';
import { formatTime } from '../../../utils/timeUtils';

interface TimerProps {
  side: 'left' | 'right';
  isActive: boolean;
  duration: number;
  onStart: () => void;
  onStop: () => void;
}

const Timer: React.FC<TimerProps> = ({ side, isActive, duration, onStart, onStop }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-sm mb-1 text-white">{side === 'left' ? '左' : '右'}</div>
      <button
        onClick={isActive ? onStop : onStart}
        className={`w-24 h-24 rounded-full flex items-center justify-center ${
          isActive ? 'bg-pink-500' : 'bg-gray-200'
        }`}
      >
        <div className={`text-lg ${isActive ? 'text-white' : 'text-gray-700'}`}>
          {formatTime(duration)}
        </div>
      </button>
    </div>
  );
};

export default Timer;