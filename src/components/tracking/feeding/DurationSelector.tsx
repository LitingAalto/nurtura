import React from 'react';

interface DurationSelectorProps {
  side: 'left' | 'right';
  duration: number;
  onChange: (duration: number) => void;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({
  side,
  duration,
  onChange
}) => {
  const durations = Array.from({ length: 7 }, (_, i) => {
    const centerIndex = 3;
    const offset = (i - centerIndex);
    return duration + offset;
  }).filter(val => val >= 0 && val <= 60);

  return (
    <div className="relative">
      <div className="text-center mb-2">
        {side === 'left' ? 'Left Side' : 'Right Side'}
      </div>
      <div className="flex flex-col items-center space-y-2">
        {durations.map((value) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`w-full text-center py-1 ${
              value === duration 
                ? 'text-xl font-medium text-pink-500' 
                : 'text-gray-400'
            }`}
          >
            {value} min
          </button>
        ))}
      </div>
    </div>
  );
};

export default DurationSelector;