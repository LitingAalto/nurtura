import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface TimeSelectorProps {
  selectedTime: Date;
  onChange: (date: Date) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ selectedTime, onChange }) => {
  return (
    <div className="p-4">
      <h3 className="text-gray-600 mb-2">Select Time</h3>
      <DatePicker
        selected={selectedTime}
        onChange={onChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        dateFormat="h:mm aa"
        className="w-full p-3 rounded-lg border border-gray-200 text-center"
      />
    </div>
  );
};

export default TimeSelector;