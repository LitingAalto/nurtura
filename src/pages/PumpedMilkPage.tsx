import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActivityStore } from '../store/activityStore';
import ConfirmDialog from '../components/common/ConfirmDialog';

const PumpedMilkPage: React.FC = () => {
  const navigate = useNavigate();
  const { addActivity } = useActivityStore();
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [amount, setAmount] = useState(60);
  const [startTime, setStartTime] = useState<Date>(new Date());

  const handleSave = () => {
    const activity = {
      id: crypto.randomUUID(),
      type: 'pumped_milk' as const,
      timestamp: startTime,
      amount: amount,
      notes: ''
    };
    
    addActivity(activity);
    navigate('/records');
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
      {/* ... rest of the component JSX ... */}
    </div>
  );
};

export default PumpedMilkPage;