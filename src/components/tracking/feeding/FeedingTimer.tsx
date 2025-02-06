import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFeedingStore } from '../../../store/feedingStore';
import { formatTime } from '../../../utils/timeUtils';
import ConfirmDialog from '../../common/ConfirmDialog';

// Define the FeedingLog type to match your store's expected type
interface FeedingLog {
  id: string;
  timestamp: Date;
  type: "Breastfeeding" | "Bottle" | "Solids"; // Use a union type for allowed values
  duration: {
    left: number;
    right: number;
  };
}

const FeedingTimer: React.FC = () => {
  const navigate = useNavigate();
  const addFeedingLog = useFeedingStore(state => state.addFeedingLog);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [activeTimer, setActiveTimer] = useState<'left' | 'right' | null>(null);
  const [duration, setDuration] = useState({ left: 0, right: 0 });
  const [startTime, setStartTime] = useState<Date | null>(null);

  const handleTimerToggle = (side: 'left' | 'right') => {
    if (!startTime) {
      setStartTime(new Date());
    }

    if (activeTimer === side) {
      setActiveTimer(null);
    } else {
      setActiveTimer(side);
    }
  };

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeTimer) {
      interval = setInterval(() => {
        setDuration(prev => ({
          ...prev,
          [activeTimer]: prev[activeTimer] + 1
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTimer]);

  const handleSave = () => {
    const feedingLog: FeedingLog = { // Explicitly type feedingLog
      id: crypto.randomUUID(),
      timestamp: startTime || new Date(),
      type: 'Breastfeeding', // Use a value that matches the FeedingLog type
      duration:  duration.left + duration.right,
    };

    addFeedingLog(feedingLog);
    navigate('/records');
  };

  const handleExit = () => {
    if (duration.left > 0 || duration.right > 0) {
      setShowExitDialog(true);
    } else {
      navigate('/records');
    }
  };

  const totalDuration = duration.left + duration.right;
  const formattedTotal = formatTime(totalDuration);

  return (
    <div className="flex flex-col h-screen bg-pink-50">
      <div className="flex justify-between items-center p-4 border-b border-pink-100">
        <button onClick={() => navigate('/records')} className="text-gray-600 text-xl">×</button>
        <div className="text-center">
          <h1 className="text-lg font-medium">Breastfeeding</h1>
          <p className="text-sm text-gray-500">Last: 57 minutes ago</p>
        </div>
        <div className="w-8" />
      </div>

      <div className="flex-1 p-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-center space-x-4 mb-4">
            <button className={`px-6 py-2 rounded-full ${activeTimer === null ? 'bg-pink-100 text-pink-600' : 'bg-gray-100'}`}>
              Timer
            </button>
            <button className={`px-6 py-2 rounded-full ${activeTimer !== null ? 'bg-gray-100' : 'bg-gray-100'}`}>
              Manual Input
            </button>
          </div>

          <div className="text-center mb-8">
            <p className="text-gray-600 mb-2">Total Feeding Time</p>
            <h2 className="text-4xl font-medium">{formattedTotal}</h2>
          </div>

          <div className="mb-4">
            <p className="text-gray-600 mb-2">Start Time</p>
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span>{startTime ? startTime.toLocaleTimeString() : '--:--'}</span>
              <span className="text-pink-500">▼</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => handleTimerToggle('left')}
              className={`aspect-square rounded-full flex flex-col items-center justify-center ${
                activeTimer === 'left' ? 'bg-pink-500 text-white' : 'bg-pink-100'
              }`}
            >
              <span>Left</span>
              <span>{formatTime(duration.left)}</span>
              <span>{activeTimer === 'left' ? '⏸' : '▶'}</span>
            </button>
            <button
              onClick={() => handleTimerToggle('right')}
              className={`aspect-square rounded-full flex flex-col items-center justify-center ${
                activeTimer === 'right' ? 'bg-pink-500 text-white' : 'bg-pink-100'
              }`}
            >
              <span>Right</span>
              <span>{formatTime(duration.right)}</span>
              <span>{activeTimer === 'right' ? '⏸' : '▶'}</span>
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-pink-500 text-white p-4 mx-4 mb-4 rounded-full text-lg font-medium"
      >
        Save
      </button>

      <ConfirmDialog
        isOpen={showExitDialog}
        title="Exit without saving?"
        message="You have unsaved feeding data. Do you want to save before exiting?"
        onConfirm={handleSave}
        onCancel={handleExit}
      />
    </div>
  );
};

export default FeedingTimer;
