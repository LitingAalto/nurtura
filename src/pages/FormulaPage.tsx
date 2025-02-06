import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useActivityStore } from '../store/activityStore';
import TimeSelector from '../components/tracking/common/TimeSelector';
import ConfirmDialog from '../components/common/ConfirmDialog';

const FormulaPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addActivity, updateActivity, deleteActivity } = useActivityStore();
  const existingActivity = location.state?.activity;

  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [amount, setAmount] = useState(60);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (existingActivity) {
      setAmount(existingActivity.amount);
      setStartTime(existingActivity.timestamp);
      setNotes(existingActivity.notes || '');
    }
  }, [existingActivity]);

  const handleSave = () => {
    const activity = {
      id: existingActivity?.id || crypto.randomUUID(),
      type: 'formula' as const,
      timestamp: startTime,
      amount,
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
    if (amount > 0) {
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
          <h1 className="text-lg font-medium">Formula</h1>
          <p className="text-sm text-gray-500">Track formula feeding</p>
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
            label="Start Time"
            value={startTime}
            onChange={setStartTime}
          />

          <div className="mb-8">
            <p className="text-gray-600 mb-4">Amount (ml)</p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-3 bg-gray-50 rounded-lg text-center text-xl"
              min="0"
              max="500"
              step="5"
            />
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes..."
            className="w-full p-3 bg-gray-50 rounded-lg resize-none"
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
        message="You have unsaved formula data. Do you want to save before exiting?"
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

export default FormulaPage;