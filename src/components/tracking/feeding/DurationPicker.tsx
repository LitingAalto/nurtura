import React from 'react';

interface DurationPickerProps {
  side: 'left' | 'right';
  value: number;
  onChange: (value: number) => void;
}

const DurationPicker: React.FC<DurationPickerProps> = ({ side, value, onChange }) => {
  // Generate minutes array from 1 to 59
  const minutes = Array.from({ length: 59 }, (_, i) => i + 1);

  return (
    <div className="text-center">
      <h4 className="text-gray-600 mb-2">{side === 'left' ? 'Left' : 'Right'} Side</h4>
      <div className="bg-gray-50 rounded-lg p-2">
        <div className="h-32 overflow-y-auto">
          {minutes.map((minute) => (
            <button
              key={minute}
              onClick={() => onChange(minute)}
              className={`w-full py-2 ${
                value === minute ? 'text-pink-500 font-bold' : 'text-gray-600'
              }`}
            >
              {minute} min
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DurationPicker;