import React from 'react';

interface WeeklyProgressProps {
  currentWeek: number;
  dateRange: string; 
  onWeekChange?: (week: number) => void;
}

const WeeklyProgress: React.FC<WeeklyProgressProps> = ({ 
  currentWeek,
  onWeekChange 
}) => {
  const weeks = [
    currentWeek - 2,
    currentWeek - 1,
    currentWeek,
    currentWeek + 1,
    currentWeek + 2
  ].filter(week => week > 0 && week <= 52);
  
  return (
    <div className="flex justify-between px-4 py-2 border-b border-pink-100">
      {weeks.map((week) => (
        <div
          key={week}
          onClick={() => onWeekChange?.(week)}
          className={`text-center cursor-pointer ${
            week === currentWeek ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-500'
          }`}
        >
          <div className="text-sm">Week {week}</div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyProgress;
