import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white p-4">
      <div className="text-center mb-4">
        <h2 className="text-lg font-medium">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map(day => (
          <button
            key={day.toString()}
            onClick={() => onDateSelect(day)}
            className={`aspect-square flex items-center justify-center rounded-full
              ${format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                ? 'bg-pink-500 text-white'
                : 'hover:bg-gray-100'}`}
          >
            {format(day, 'd')}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;