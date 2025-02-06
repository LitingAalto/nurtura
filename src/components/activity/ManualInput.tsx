import React from 'react';

interface ManualInputProps {
  duration: number;
  onDurationChange: (duration: number) => void;
}

const ManualInput: React.FC<ManualInputProps> = ({ duration, onDurationChange }) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);

  const handleHourChange = (value: number) => {
    onDurationChange((value * 3600) + (minutes * 60));
  };

  const handleMinuteChange = (value: number) => {
    onDurationChange((hours * 3600) + (value * 60));
  };

  return (
    <div className="p-4">
      <div className="flex justify-center space-x-4">
        <div className="w-24">
          <input
            type="number"
            value={hours}
            onChange={(e) => handleHourChange(parseInt(e.target.value) || 0)}
            min="0"
            max="23"
            className="w-full p-3 text-center bg-white rounded-lg"
          />
          <div className="text-xs text-center mt-1 text-gray-500">Hours</div>
        </div>
        <div className="w-24">
          <input
            type="number"
            value={minutes}
            onChange={(e) => handleMinuteChange(parseInt(e.target.value) || 0)}
            min="0"
            max="59"
            className="w-full p-3 text-center bg-white rounded-lg"
          />
          <div className="text-xs text-center mt-1 text-gray-500">Minutes</div>
        </div>
      </div>
    </div>
  );
};

export default ManualInput;