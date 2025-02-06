import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface TimeSelectProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  maxDate?: Date;
}

const TimeSelect: React.FC<TimeSelectProps> = ({ 
  label, 
  value, 
  onChange,
  maxDate = new Date()
}) => {
  return (
    <div className="mb-4">
      <p className="text-gray-600 mb-2">{label}</p>
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
    </div>
  );
};

export default TimeSelect;