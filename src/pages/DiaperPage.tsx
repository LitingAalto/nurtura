import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useActivityStore } from '../store/activityStore';
import TimeSelector from '../components/tracking/common/TimeSelector';
import ConfirmDialog from '../components/common/ConfirmDialog';

const DiaperPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addActivity, updateActivity, deleteActivity } = useActivityStore();
  const existingActivity = location.state?.activity;

  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [type, setType] = useState<'pee' | 'poop' | 'both'>('pee');
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (existingActivity) {
      setType(existingActivity.diaperType);
      setStartTime(existingActivity.timestamp);
      setNotes(existingActivity.notes || '');
    }
  }, [existingActivity]);

  const handleSave = () => {
    const activity = {
      id: existingActivity?.id || crypto.randomUUID(),
      type: 'diaper' as const,
      timestamp: startTime,
      diaperType: type,
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

  const handleExit = () => {
    if (type !== 'pee' || notes) {
      setShowExitDialog(true);
    } else {
      navigate('/records');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-pink-50">
      <div className="flex justify-between items-center p-4 border-b border-pink-100">
        <button onClick={handleExit} className="text-gray-600 text-xl">×</button>
        <div className="text-center">
          <h1 className="text-lg font-medium">Diaper Change</h1>
          <p className="text-sm text-gray-500">Track diaper change</p>
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

      <div className="flex-1 p-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <TimeSelector
            label="Time"
            value={startTime}
            onChange={setStartTime}
          />

          <div className="mb-8">
            <p className="text-gray-600 mb-4">Type</p>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setType('pee')}
                className={`p-4 rounded-lg text-center ${
                  type === 'pee' ? 'bg-pink-500 text-white' : 'bg-gray-100'
                }`}
              >
                💧<br />Pee
              </button>
              <button
                onClick={() => setType('poop')}
                className={`p-4 rounded-lg text-center ${
                  type === 'poop' ? 'bg-pink-500 text-white' : 'bg-gray-100'
                }`}
              >
                💩<br />Poop
              </button>
              <button
                onClick={() => setType('both')}
                className={`p-4 rounded-lg text-center ${
                  type === 'both' ? 'bg-pink-500 text-white' : 'bg-gray-100'
                }`}
              >
                🔄<br />Both
              </button>
            </div>
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes..."
            className="w-full p-3 bg-gray-50 rounded-lg text-gray-700 resize-none"
            rows={3}
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-pink-500 text-white p-4 mx-4 mb-4 rounded-full text-lg font-medium"
      >
        {existingActivity ? 'Update' : 'Save'}
      </button>

      <ConfirmDialog
        isOpen={showExitDialog}
        title="Exit without saving?"
        message="You have unsaved diaper change data. Do you want to save before exiting?"
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
    </div>
  );
};

export default DiaperPage;