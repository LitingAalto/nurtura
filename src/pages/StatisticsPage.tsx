import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActivityStore } from '../store/activityStore';
import { Activity } from '../types/activities';
import { format, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

type ActivityTab = 'all' | 'feeding' | 'sleeping' | 'solid' | 'diaper';

const StatisticsPage: React.FC = () => {
  const navigate = useNavigate();
  const activities = useActivityStore(state => state.activities);
  const [activeTab, setActiveTab] = useState<ActivityTab>('all');

  // Generate hours array for every 2 hours
  const hours = Array.from({ length: 12 }, (_, i) => i * 2);
  
  // Generate last 14 days
  const days = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  }).reverse();

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

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'sleep': return 'bg-purple-200';
      case 'breastfeeding': return 'bg-pink-200';
      case 'formula': return 'bg-blue-200';
      case 'pumped_milk': return 'bg-indigo-200';
      case 'diaper': return 'bg-green-200';
      case 'pump': return 'bg-orange-200';
      default: return 'bg-gray-200';
    }
  };

  const filterActivities = (activities: Activity[]) => {
    switch (activeTab) {
      case 'feeding':
        return activities.filter(a => 
          ['breastfeeding', 'formula', 'pumped_milk'].includes(a.type)
        );
      case 'sleeping':
        return activities.filter(a => a.type === 'sleep');
      case 'solid':
        return activities.filter(a => a.type === 'solid');
      case 'diaper':
        return activities.filter(a => a.type === 'diaper');
      default:
        return activities;
    }
  };

  const handleActivityClick = (activity: Activity) => {
    let route = '';
    switch (activity.type) {
      case 'breastfeeding':
        route = '/feeding';
        break;
      case 'formula':
        route = '/formula';
        break;
      case 'pumped_milk':
        route = '/mothers-milk';
        break;
      case 'sleep':
        route = '/sleep';
        break;
      case 'diaper':
        route = '/diaper';
        break;
      case 'pump':
        route = '/pump';
        break;
    }
    navigate(route, { state: { activity } });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center p-4">
          <button onClick={() => navigate('/records')} className="text-gray-600">
            ←
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold">Activity Analysis</h1>
          <div className="w-8" />
        </div>

        {/* Tab Bar */}
        <div className="flex overflow-x-auto p-2 space-x-2">
          {[
            { id: 'all', label: 'All' },
            { id: 'feeding', label: 'Feeding' },
            { id: 'sleeping', label: 'Sleeping' },
            { id: 'solid', label: 'Solid' },
            { id: 'diaper', label: 'Diaper' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ActivityTab)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Grid - Scrollable Container */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-max p-4">
          <div className="relative flex">
            {/* Hours Column - Fixed Position */}
            <div className="sticky left-0 w-16 flex-shrink-0 bg-gray-50 z-10">
              <div className="h-4" /> {/* Spacer for date headers */}
              {hours.map(hour => (
                <div key={hour} className="h-8 flex items-center justify-end pr-2 text-xs text-gray-500">
                  {hour.toString().padStart(2, '0')}:00
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="flex-1">
              {/* Date Headers */}
              <div className="flex h-4 sticky top-0 bg-gray-50 z-10">
                {days.map(day => (
                  <div key={day.toISOString()} className="flex-1 min-w-[80px] text-xs text-gray-500 text-center">
                    {format(day, 'MMM d')}
                  </div>
                ))}
              </div>

              {/* Activity Grid */}
              {hours.map(hour => (
                <div key={hour} className="flex h-8">
                  {days.map(day => {
                    const dayStart = startOfDay(day);
                    const dayEnd = endOfDay(day);
                    const hourStart = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour);
                    const hourEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour + 2);

                    const sleepActivities = filterActivities(activities)
                      .filter(activity => {
                        if (activity.type === 'sleep') {
                          const sleepActivity = activity as Activity & { startTime: Date; endTime: Date };
                          return (
                            sleepActivity.startTime <= hourEnd &&
                            sleepActivity.endTime >= hourStart &&
                            (sleepActivity.startTime <= dayEnd && sleepActivity.endTime >= dayStart)
                          );
                        }
                        return false;
                      });

                    const otherActivities = filterActivities(activities)
                      .filter(activity => 
                        activity.type !== 'sleep' &&
                        activity.timestamp >= hourStart &&
                        activity.timestamp < hourEnd &&
                        activity.timestamp >= dayStart &&
                        activity.timestamp <= dayEnd
                      );

                    return (
                      <div 
                        key={`${day.toISOString()}-${hour}`}
                        className="flex-1 min-w-[80px] border border-gray-100 relative"
                      >
                        {/* Sleep Blocks */}
                        {sleepActivities.map(activity => {
                          const sleepActivity = activity as Activity & { startTime: Date; endTime: Date };
                          const blockStart = Math.max(
                            hourStart.getTime(),
                            Math.max(sleepActivity.startTime.getTime(), dayStart.getTime())
                          );
                          const blockEnd = Math.min(
                            hourEnd.getTime(),
                            Math.min(sleepActivity.endTime.getTime(), dayEnd.getTime())
                          );
                          
                          const blockHeight = ((blockEnd - blockStart) / (2 * 3600000)) * 32; // 32px is height of 2-hour block
                          const blockTop = ((blockStart - hourStart.getTime()) / (2 * 3600000)) * 32;

                          return (
                            <div
                              key={activity.id}
                              onClick={() => handleActivityClick(activity)}
                              className="absolute left-0 right-0 bg-purple-200 cursor-pointer"
                              style={{
                                top: `${blockTop}px`,
                                height: `${blockHeight}px`
                              }}
                            />
                          );
                        })}

                        {/* Other Activities */}
                        <div className="absolute inset-0 flex items-center justify-center gap-1 flex-wrap p-1">
                          {otherActivities.map(activity => (
                            <div
                              key={activity.id}
                              onClick={() => handleActivityClick(activity)}
                              className={`w-4 h-4 rounded-full flex items-center justify-center cursor-pointer text-xs ${getActivityColor(activity.type)}`}
                            >
                              {getActivityIcon(activity.type)}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-200 rounded-sm mr-2" />
            <span className="text-sm">Sleep</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-pink-200 rounded-full mr-2" />
            <span className="text-sm">Breastfeeding</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-200 rounded-full mr-2" />
            <span className="text-sm">Formula</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-indigo-200 rounded-full mr-2" />
            <span className="text-sm">Mother's Milk</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-200 rounded-full mr-2" />
            <span className="text-sm">Diaper</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;