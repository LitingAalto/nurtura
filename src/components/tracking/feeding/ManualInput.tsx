import React from 'react';
import TimeSelector from '../common/TimeSelector';
import DurationPicker from './DurationPicker';

interface ManualInputProps {
  duration: { left: number; right: number };
  setDuration: (duration: { left: number; right: number }) => void;
  startTime: Date;
  setStartTime: (date: Date) => void;
}

const ManualInput: React.FC<ManualInputProps> = ({
  duration,
  setDuration,
  startTime,
  setStartTime
}) => {
  const handleDurationChange = (side: 'left' | 'right', value: number) => {
    // Convert minutes to seconds and ensure it doesn't exceed 60 minutes
    const seconds = Math.min(value * 60, 59 * 60);
    setDuration({
      ...duration,
      [side]: seconds
    });
  };

  return (
    <div className="flex-1 p-4">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <TimeSelector
          label="Start Time"
          value={startTime}
          onChange={setStartTime}
        />

        <div className="mt-6">
          <h3 className="text-gray-600 mb-4">Duration</h3>
          <div className="grid grid-cols-2 gap-4">
            <DurationPicker
              side="left"
              value={Math.round(duration.left / 60)}
              onChange={(value) => handleDurationChange('left', value)}
            />
            <DurationPicker
              side="right"
              value={Math.round(duration.right / 60)}
              onChange={(value) => handleDurationChange('right', value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualInput;