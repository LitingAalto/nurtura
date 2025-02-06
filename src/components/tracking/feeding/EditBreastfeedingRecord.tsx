import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BreastfeedingActivity } from '../../../types/activities';
import { useActivityStore } from '../../../store/activityStore';
import DurationSelector from './DurationSelector';
import TimeSelector from '../common/TimeSelector';
import Header from '../common/Header';

const EditBreastfeedingRecord: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activity = location.state?.activity as BreastfeedingActivity;
  const { updateActivity } = useActivityStore();

  const [startTime, setStartTime] = React.useState(activity.timestamp);
  const [endTime, setEndTime] = React.useState(new Date(activity.timestamp.getTime() + 
    (activity.duration.left + activity.duration.right) * 1000));
  const [leftDuration, setLeftDuration] = React.useState(activity.duration.left);
  const [rightDuration, setRightDuration] = React.useState(activity.duration.right);

  const totalDuration = leftDuration + rightDuration;

  const handleSave = () => {
    const updatedActivity: BreastfeedingActivity = {
      ...activity,
      timestamp: startTime,
      duration: {
        left: leftDuration,
        right: rightDuration
      }
    };
    updateActivity(updatedActivity);
    navigate('/records');
  };

  return (
    <div className="flex flex-col h-screen bg-pink-50">
      <Header 
        title="Breastfeeding"
        subtitle="Edit Record"
        onClose={() => navigate('/records')}
        showDelete
        onDelete={() => {
          // Implement delete functionality
          navigate('/records');
        }}
      />

      <div className="flex-1 p-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-2">Total Duration</p>
            <h2 className="text-4xl font-medium">{totalDuration} min</h2>
          </div>

          <TimeSelector
            label="Start Time"
            value={startTime}
            onChange={setStartTime}
          />

          <div className="mb-8">
            <p className="text-gray-600 mb-4">Duration</p>
            <div className="grid grid-cols-2 gap-4">
              <DurationSelector
                side="left"
                duration={leftDuration}
                onChange={setLeftDuration}
              />
              <DurationSelector
                side="right"
                duration={rightDuration}
                onChange={setRightDuration}
              />
            </div>
          </div>

          <TimeSelector
            label="End Time"
            value={endTime}
            onChange={setEndTime}
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-pink-500 text-white p-4 mx-4 mb-4 rounded-full text-lg font-medium"
      >
        Save
      </button>
    </div>
  );
};

export default EditBreastfeedingRecord;