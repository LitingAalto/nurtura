import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useActivityStore } from '../store/activityStore';
import { useWindowStore } from '../store/windowStore';
import { SleepTimerDisplay } from '../components/tracking/sleep';
import ManualInput from '../components/tracking/sleep/ManualInput';
import ConfirmDialog from '../components/common/ConfirmDialog';
import ModeSwitchDialog from '../components/common/ModeSwitchDialog';

const SleepPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addActivity, updateActivity, deleteActivity } = useActivityStore();
  const { minimizeWindow } = useWindowStore();
  const existingActivity = location.state?.activity;
  
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showModeSwitchDialog, setShowModeSwitchDialog] = useState(false);
  const [isManualMode, setIsManualMode] = useState(!!existingActivity);
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [manualStartTime, setManualStartTime] = useState(new Date());
  const [manualEndTime, setManualEndTime] = useState(new Date());
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (existingActivity) {
      setManualStartTime(existingActivity.startTime);
      setManualEndTime(existingActivity.endTime);
      setNotes(existingActivity.notes || '');
    }
  }, [existingActivity]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const handleModeSwitch = () => {
    if (!existingActivity && (isActive || (isManualMode && manualStartTime < manualEndTime))) {
      setShowModeSwitchDialog(true);
    } else if (!existingActivity) {
      setIsManualMode(!isManualMode);
    }
  };

  const handleModeSwitchConfirm = () => {
    if (isActive) {
      setIsActive(false);
      setDuration(0);
      setStartTime(null);
    }
    setIsManualMode(!isManualMode);
    setShowModeSwitchDialog(false);
  };

  const handleTimerToggle = () => {
    if (!isActive) {
      setStartTime(new Date());
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const handleSave = () => {
    const activity = {
      id: existingActivity?.id || crypto.randomUUID(),
      type: 'sleep' as const,
      timestamp: isManualMode ? manualStartTime : startTime || new Date(),
      startTime: isManualMode ? manualStartTime : startTime || new Date(),
      endTime: isManualMode ? manualEndTime : new Date(),
      duration: isManualMode 
        ? Math.floor((manualEndTime.getTime() - manualStartTime.getTime()) / 1000)
        : duration,
      notes
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
      type: 'sleep',
      title: 'Sleep',
      icon: '😴',
      timestamp: new Date(),
      state: {
        isActive,
        duration,
        startTime,
        isManualMode,
        manualStartTime,
        manualEndTime,
        notes
      }
    });
    navigate('/records');
  };

  const handleExit = () => {
    if (isActive || (isManualMode && manualStartTime < manualEndTime)) {
      setShowExitDialog(true);
    } else {
      navigate('/records');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-purple-50">
      <div className="flex justify-between items-center p-4 border-b border-purple-100">
        {isActive ? (
          <button onClick={handleMinimize} className="text-gray-600 text-xl">
            ⎯
          </button>
        ) : (
          <button onClick={handleExit} className="text-gray-600 text-xl">
            ×
          </button>
        )}
        <div className="text-center">
          <h1 className="text-lg font-medium">Sleep</h1>
          <p className="text-sm text-gray-500">Track baby's sleep</p>
        </div>
        {existingActivity && (
          <button 
            onClick={() => setShowDeleteDialog(true)}
            className="text-gray-600"
          >
            🗑️
          </button>
        )}
      </div>

      {!existingActivity && (
        <div className="flex justify-center space-x-4 p-4">
          <button
            onClick={handleModeSwitch}
            className={`px-6 py-2 rounded-full ${
              !isManualMode ? 'bg-purple-500 text-white' : 'bg-gray-100'
            }`}
          >
            Timer
          </button>
          <button
            onClick={handleModeSwitch}
            className={`px-6 py-2 rounded-full ${
              isManualMode ? 'bg-purple-500 text-white' : 'bg-gray-100'
            }`}
          >
            Manual Input
          </button>
        </div>
      )}

      <div className="flex-1">
        {isManualMode ? (
          <ManualInput
            startTime={manualStartTime}
            endTime={manualEndTime}
            onStartTimeChange={setManualStartTime}
            onEndTimeChange={setManualEndTime}
          />
        ) : (
          <SleepTimerDisplay
            isActive={isActive}
            duration={duration}
            startTime={startTime}
            onToggle={handleTimerToggle}
            onDurationChange={setDuration}
          />
        )}
      </div>

      <button
        onClick={handleSave}
        className="bg-purple-500 text-white p-4 mx-4 mb-4 rounded-full text-lg font-medium"
      >
        {existingActivity ? 'Update' : 'Save'}
      </button>

      <ConfirmDialog
        isOpen={showExitDialog}
        title="Exit without saving?"
        message="You have an active sleep timer. Do you want to save before exiting?"
        onConfirm={handleSave}
        onCancel={() => navigate('/records')}
      />

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Record"
        message="Are you sure you want to delete this record? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />

      <ModeSwitchDialog
        isOpen={showModeSwitchDialog}
        onConfirm={handleModeSwitchConfirm}
        onCancel={() => setShowModeSwitchDialog(false)}
      />
    </div>
  );
};

export default SleepPage;