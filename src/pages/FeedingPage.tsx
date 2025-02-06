import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useActivityStore } from '../store/activityStore';
import { useWindowStore } from '../store/windowStore';
import BreastfeedingTimer from '../components/tracking/feeding/BreastfeedingTimer';
import ReminderIcon from '../components/reminder/ReminderIcon';

const FeedingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addActivity, updateActivity, deleteActivity } = useActivityStore();
  const { minimizeWindow } = useWindowStore();
  const existingActivity = location.state?.activity;
  
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showModeSwitchDialog, setShowModeSwitchDialog] = useState(false);
  const [isManualMode, setIsManualMode] = useState(!!existingActivity);
  const [duration, setDuration] = useState({ left: 0, right: 0 });
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [activeTimer, setActiveTimer] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    if (existingActivity) {
      setDuration({
        left: existingActivity.duration.left,
        right: existingActivity.duration.right
      });
      setStartTime(existingActivity.timestamp);
    }
  }, [existingActivity]);

  const handleModeSwitch = () => {
    if (!existingActivity && (duration.left > 0 || duration.right > 0)) {
      setShowModeSwitchDialog(true);
    } else if (!existingActivity) {
      setIsManualMode(!isManualMode);
    }
  };

  const handleModeSwitchConfirm = () => {
    setDuration({ left: 0, right: 0 });
    setIsManualMode(!isManualMode);
    setShowModeSwitchDialog(false);
  };

  const handleSave = () => {
    const activity = {
      id: existingActivity?.id || crypto.randomUUID(),
      type: 'breastfeeding' as const,
      timestamp: startTime,
      duration,
      notes: ''
    };
    
    if (existingActivity) {
      updateActivity(activity);
    } else {
      addActivity(activity);
    }
    navigate('/records');
  };

  const handleDelete = () => {
    if (existingActivity) {
      deleteActivity(existingActivity.id);
      navigate('/records');
    }
  };

  const handleMinimize = () => {
    minimizeWindow({
      id: crypto.randomUUID(),
      type: 'feeding',
      title: 'Breastfeeding',
      icon: '🤱',
      timestamp: new Date(),
      state: {
        duration,
        startTime,
        isManualMode,
        activeTimer
      }
    });
    navigate('/records');
  };

  const handleExit = () => {
    if (duration.left > 0 || duration.right > 0) {
      setShowExitDialog(true);
    } else {
      navigate('/records');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-pink-50">
      <div className="flex justify-between items-center p-4 border-b border-pink-100">
        {activeTimer ? (
          <button onClick={handleMinimize} className="text-gray-600 text-xl">
            ⎯
          </button>
        ) : (
          <button onClick={handleExit} className="text-gray-600 text-xl">
            ×
          </button>
        )}
        <div className="text-center">
          <h1 className="text-lg font-medium">Breastfeeding</h1>
          <p className="text-sm text-gray-500">Track breastfeeding</p>
        </div>
        <div className="flex items-center space-x-4">
          <ReminderIcon />
          {existingActivity && (
            <button 
              onClick={() => setShowDeleteDialog(true)}
              className="text-gray-600"
            >
              🗑️
            </button>
          )}
        </div>
      </div>

      <BreastfeedingTimer
        existingActivity={existingActivity}
        onSave={handleSave}
        onDelete={handleDelete}
        onExit={handleExit}
        showExitDialog={showExitDialog}
        showDeleteDialog={showDeleteDialog}
        showModeSwitchDialog={showModeSwitchDialog}
        isManualMode={isManualMode}
        onModeSwitch={handleModeSwitch}
        onModeSwitchConfirm={handleModeSwitchConfirm}
        onModeSwitchCancel={() => setShowModeSwitchDialog(false)}
        duration={duration}
        onDurationChange={setDuration}
        startTime={startTime}
        onTimeChange={setStartTime}
        onExitDialogClose={() => setShowExitDialog(false)}
        onDeleteDialogClose={() => setShowDeleteDialog(false)}
        activeTimer={activeTimer}
        setActiveTimer={setActiveTimer}
      />
    </div>
  );
};

export default FeedingPage;