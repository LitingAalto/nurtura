import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface TimeSelectorProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  maxDate?: Date;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  label,
  value,
  onChange,
  maxDate = new Date()
}) => {
  return (
    <div className="mb-4">
      <p className="text-gray-600 mb-2">{label}</p>
      <div className="relative">
        <DatePicker
          selected={value}
          onChange={onChange}
          showTimeSelect
          maxDate={maxDate}
          dateFormat="MMM d, yyyy h:mm aa"
          className="w-full p-3 rounded-lg bg-gray-50 text-gray-700"
          placeholderText="Select date and time"
          timeIntervals={15}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          ▼
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;