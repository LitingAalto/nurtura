import React from 'react';

interface DaySelectorProps {
  selectedDays: string[];
  onChange: (days: string[]) => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({ selectedDays, onChange }) => {
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const toggleDay = (day: string) => {
    const newDays = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day];
    onChange(newDays);
  };

  return (
    <div className="p-4">
      <h3 className="text-gray-600 mb-2">Repeat</h3>
      <div className="flex justify-between">
        {days.map(day => (
          <button
            key={day}
            onClick={() => toggleDay(day)}
            className={`w-10 h-10 rounded-full ${
              selectedDays.includes(day)
                ? 'bg-pink-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DaySelector;