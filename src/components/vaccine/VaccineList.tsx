import React from 'react';
import { useNavigate } from 'react-router-dom';
import { VaccineSchedule } from '../../types/vaccine';

interface VaccineListProps {
  vaccines: VaccineSchedule[];
  onToggleComplete: (id: string) => void;
  onReminderClick: (id: string) => void;
}

const VaccineList: React.FC<VaccineListProps> = ({
  vaccines,
  onToggleComplete,
  onReminderClick
}) => {
  const navigate = useNavigate();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {vaccines.map((vaccine) => (
        <div 
          key={vaccine.id}
          className="bg-white p-4 rounded-lg shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1">
              <h3 
                className="font-medium cursor-pointer"
                onClick={() => navigate(`/vaccine/${vaccine.id}`)}
              >
                {vaccine.name}
              </h3>
              <p className="text-sm text-gray-500">
                {formatDate(vaccine.scheduledDate)}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onReminderClick(vaccine.id);
                }}
                className="text-gray-600"
              >
                🔔
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleComplete(vaccine.id);
                }}
                className={`w-6 h-6 rounded-full border-2 ${
                  vaccine.completed 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-gray-300'
                }`}
              >
                {vaccine.completed && (
                  <span className="text-white">✓</span>
                )}
              </button>
            </div>
          </div>
          {vaccine.reminder && (
            <div className="text-xs text-gray-500">
              Reminder set for: {formatDate(vaccine.reminder.time)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VaccineList;