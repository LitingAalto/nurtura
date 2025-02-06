import React from 'react';
import { Activity } from '../../types/activities';
import { format, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { CSSProperties } from 'react';

interface ActivityTimelineProps {
  activities: Activity[];
  selectedTypes: string[];
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  activities,
  selectedTypes,
}) => {
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  }).reverse();

  const filteredActivities = activities.filter(activity =>
    selectedTypes.includes('all') || selectedTypes.includes(activity.type)
  );

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'breastfeeding': return '🤱';
      case 'formula': return '🍼';
      case 'pumped_milk': return '💧';
      case 'sleep': return '😴';
      case 'diaper': return '👶';
      case 'pump': return '⚡';
      default: return '📝';
    }
  };

  const getSleepBlockStyle = (activity: Activity & { startTime: Date; endTime: Date }, hour: number, day: Date): CSSProperties | null => {
    const dayStart = startOfDay(day);
    const dayEnd = endOfDay(day);
    const hourStart = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour);
    const hourEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour + 1);

    // Adjust sleep times to day boundaries if they cross midnight
    const sleepStart = activity.startTime < dayStart ? dayStart : activity.startTime;
    const sleepEnd = activity.endTime > dayEnd ? dayEnd : activity.endTime;

    // Check if sleep spans across this hour
    if (sleepStart <= hourEnd && sleepEnd >= hourStart) {
      // Calculate position and height
      const blockStart = Math.max(hourStart.getTime(), sleepStart.getTime());
      const blockEnd = Math.min(hourEnd.getTime(), sleepEnd.getTime());

      const hourMs = 3600000; // 1 hour in milliseconds
      const top = ((blockStart - hourStart.getTime()) / hourMs) * 32; // 32px is the height of hour block
      const height = ((blockEnd - blockStart) / hourMs) * 32;

      return {
        position: 'absolute',
        top: `${top}px`,
        height: `${height}px`,
        left: 0,
        right: 0,
        backgroundColor: 'rgb(233 213 255)', // bg-purple-200
      };
    }

    return null;
  };

  return (
    <div className="p-4">
      <div className="relative">
        {/* Time labels */}
        <div className="absolute -left-8 top-8 bottom-0 w-6">
          {timeSlots.map(hour => (
            <div
              key={hour}
              className="absolute text-xs text-gray-500"
              style={{ top: `${(hour / 24) * 100}%` }}
            >
              {hour.toString().padStart(2, '0')}
            </div>
          ))}
        </div>

        {/* Activity grid */}
        <div className="ml-4 grid grid-cols-7 gap-1">
          {/* Date headers */}
          {days.map(date => (
            <div key={date.getTime()} className="text-center text-xs text-gray-500 mb-2">
              {format(date, 'MMM d')}
            </div>
          ))}

          {/* Activity columns */}
          {days.map(date => (
            <div
              key={date.getTime()}
              className="relative bg-gray-100 rounded-lg"
              style={{ height: '600px' }}
            >
              {/* Hour grid lines */}
              {timeSlots.map(hour => (
                <div
                  key={hour}
                  className="absolute w-full border-t border-gray-200"
                  style={{ top: `${(hour / 24) * 100}%` }}
                />
              ))}

              {/* Sleep blocks */}
              {filteredActivities
                .filter(activity =>
                  activity.type === 'sleep' &&
                  isWithinInterval(activity.timestamp, {
                    start: startOfDay(date),
                    end: endOfDay(date)
                  })
                )
                .map(activity => {
                  const sleepActivity = activity as Activity & { startTime: Date; endTime: Date };
                  return timeSlots.map(hour => {
                    const style = getSleepBlockStyle(sleepActivity, hour, date);
                    return style && (
                      <div
                        key={`${activity.id}-${hour}`}
                        style={style}
                      />
                    );
                  });
                })}

              {/* Other activities */}
              {filteredActivities
                .filter(activity =>
                  activity.type !== 'sleep' &&
                  isWithinInterval(activity.timestamp, {
                    start: startOfDay(date),
                    end: endOfDay(date)
                  })
                )
                .map(activity => {
                  const hour = activity.timestamp.getHours();
                  const minute = activity.timestamp.getMinutes();
                  const top = ((hour * 60 + minute) / (24 * 60)) * 100;

                  return (
                    <div
                      key={activity.id}
                      className="absolute w-full flex justify-center"
                      style={{ top: `${top}%` }}
                    >
                      <span className="text-sm">
                        {getActivityIcon(activity.type)}
                      </span>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;