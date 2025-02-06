import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActivitySelector } from '../components/activity';
import { TimeSelector } from '../components/tracking/common';
import { Activity, predefinedActivities } from '../types/activity';
import { useActivityStore } from '../store/activityStore';

const ActivityPage: React.FC = () => {
  const navigate = useNavigate();
  const { addActivity } = useActivityStore();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [customActivityName, setCustomActivityName] = useState('');
  const [startTime, setStartTime] = useState(new Date());

  const handleActivitySelect = (activity: Activity) => {
    setSelectedActivity(activity);
    if (activity.id !== 'other') {
      setCustomActivityName('');
    }
  };

  const handleSave = () => {
    if (!selectedActivity) return;

    const activity = {
      id: crypto.randomUUID(),
      activityId: selectedActivity.id,
      timestamp: startTime,
      duration: 0,
      notes: selectedActivity.id === 'other' ? customActivityName : ''
    };

    addActivity(activity);
    navigate('/records');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <button onClick={() => navigate('/records')} className="text-gray-600">
          ×
        </button>
        <h1 className="text-lg font-medium">Activity</h1>
        <div className="w-8" />
      </div>

      <ActivitySelector
        activities={predefinedActivities}
        selectedActivity={selectedActivity}
        onSelect={handleActivitySelect}
      />

      {selectedActivity?.id === 'other' && (
        <div className="px-4 mb-4">
          <input
            type="text"
            value={customActivityName}
            onChange={(e) => setCustomActivityName(e.target.value)}
            placeholder="Enter activity name"
            className="w-full p-3 rounded-lg border border-gray-200"
          />
        </div>
      )}

      <div className="p-4">
        <TimeSelector
          label="Start Time"
          value={startTime}
          onChange={setStartTime}
        />
      </div>

      <div className="mt-auto p-4">
        <button
          onClick={handleSave}
          disabled={!selectedActivity || (selectedActivity.id === 'other' && !customActivityName)}
          className="w-full bg-pink-500 text-white p-4 rounded-full text-lg font-medium disabled:bg-gray-300"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ActivityPage;