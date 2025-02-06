import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface TimeSelectorProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ label, value, onChange }) => {
  return (
    <div className="mb-4">
      <div className="text-gray-600 mb-2">{label}</div>
      <div 
        className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100"
        onClick={() => {
          const picker = document.querySelector('.react-datepicker__input-container input');
          if (picker) {
            (picker as HTMLElement).click();
          }
        }}
      >
        <span>{value.toLocaleString('en-US', {
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })}</span>
        <span className="text-pink-500">▼</span>
      </div>
      <DatePicker
        selected={value}
        onChange={onChange}
        showTimeSelect
        dateFormat="MM/dd HH:mm"
        className="hidden"
      />
    </div>
  );
};

export default TimeSelector;