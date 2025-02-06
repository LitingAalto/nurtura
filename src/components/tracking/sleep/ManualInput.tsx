import React, { useEffect } from 'react';
import TimeSelector from '../common/TimeSelector';
import { formatDuration } from '../../../utils/timeUtils';

interface ManualInputProps {
  startTime: Date;
  endTime: Date;
  onStartTimeChange: (date: Date) => void;
  onEndTimeChange: (date: Date) => void;
}

const ManualInput: React.FC<ManualInputProps> = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}) => {
  // Calculate duration in seconds
  const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

  // Enforce 24-hour limit
  useEffect(() => {
    const maxEndTime = new Date(startTime.getTime() + (24 * 60 * 60 * 1000));
    if (endTime > maxEndTime) {
      onEndTimeChange(maxEndTime);
    }
  }, [startTime, endTime, onEndTimeChange]);

  return (
    <div className="flex-1 p-4">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">😴</div>
          <p className="text-gray-600 mb-2">Total Duration</p>
          <h2 className="text-4xl font-light">
            {formatDuration(Math.max(0, duration))}
          </h2>
        </div>

        <div className="space-y-6">
          <TimeSelector
            label="Start Time"
            value={startTime}
            onChange={(date) => {
              onStartTimeChange(date);
              // Adjust end time if it would exceed 24 hours
              const maxEndTime = new Date(date.getTime() + (24 * 60 * 60 * 1000));
              if (endTime > maxEndTime) {
                onEndTimeChange(maxEndTime);
              }
            }}
            maxDate={endTime}
          />

          <TimeSelector
            label="End Time"
            value={endTime}
            onChange={onEndTimeChange}
            maxDate={new Date(startTime.getTime() + (24 * 60 * 60 * 1000))}
          />
        </div>
      </div>
    </div>
  );
};

export default ManualInput;