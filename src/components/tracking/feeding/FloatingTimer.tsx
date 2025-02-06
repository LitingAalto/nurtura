import React from 'react';
import { formatTime } from '../../../utils/timeUtils';

interface FloatingTimerProps {
  duration: { left: number; right: number };
  activeTimer: 'left' | 'right' | null;
  onClose: () => void;
}

const FloatingTimer: React.FC<FloatingTimerProps> = ({
  duration,
  activeTimer,
  onClose
}) => {
  return (
    <div className="fixed bottom-4 right-4 bg-pink-500 text-white rounded-full p-4 shadow-lg">
      <button onClick={onClose} className="absolute -top-2 -right-2 bg-white text-pink-500 rounded-full w-6 h-6">
        ×
      </button>
      <div className="text-center">
        <div className="text-sm">
          {activeTimer === 'left' ? 'Left' : 'Right'}: {formatTime(activeTimer === 'left' ? duration.left : duration.right)}
        </div>
        <div className="text-xs">
          Total: {formatTime(duration.left + duration.right)}
        </div>
      </div>
    </div>
  );
};

export default FloatingTimer;