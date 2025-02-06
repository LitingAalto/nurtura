import React from 'react';

interface WeekSelectorProps {
  currentWeek: number;
  onWeekChange: (week: number) => void;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({ currentWeek, onWeekChange }) => {
  const dates = [
    { day: 'Yesterday', date: '12/27' },
    { day: 'Today', date: '12/28' },
    { day: 'Tomorrow', date: '12/29' }
  ];

  const handlePreviousWeek = () => {
    onWeekChange(currentWeek - 1);
  };

  const handleNextWeek = () => {
    onWeekChange(currentWeek + 1);
  };

  return (
    <div className="flex justify-between px-4 py-2 bg-white border-b border-pink-100">
      <button onClick={handlePreviousWeek}>Previous Week</button>
      {dates.map((date, index) => (
        <div key={date.day} className="text-center"> {/* Corrected key prop */}
          <div className="text-xs text-gray-500">{date.day}</div>
          <div className={`text-sm ${index === 1 ? 'text-pink-500 font-medium' : ''}`}>
            {date.date}
          </div>
        </div>
      ))}
      <button onClick={handleNextWeek}>Next Week</button>
    </div>
  );
};

export default WeekSelector;