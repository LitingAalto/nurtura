import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TimeSelector from '../components/reminder/TimeSelector';
import DaySelector from '../components/reminder/DaySelector';

const ReminderPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const returnPath = location.state?.returnPath || '/';

  const [mode, setMode] = useState<'at' | 'in'>('at');
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(true);

  const handleSave = () => {
    // Save reminder logic here
    navigate(returnPath);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="flex items-center p-4">
          <button onClick={() => navigate(returnPath)} className="text-gray-600">
            ←
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold">Set Reminder</h1>
          <div className="w-8" />
        </div>

        <div className="flex border-b">
          <button
            onClick={() => setMode('at')}
            className={`flex-1 py-2 text-center ${
              mode === 'at' ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-500'
            }`}
          >
            Remind At
          </button>
          <button
            onClick={() => setMode('in')}
            className={`flex-1 py-2 text-center ${
              mode === 'in' ? 'text-pink-500 border-b-2 border-pink-500' : 'text-gray-500'
            }`}
          >
            Remind In
          </button>
        </div>
      </div>

      <TimeSelector
        selectedTime={selectedTime}
        onChange={setSelectedTime}
      />

      <DaySelector
        selectedDays={selectedDays}
        onChange={setSelectedDays}
      />

      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <span>Sound</span>
          <button
            onClick={() => setSound(!sound)}
            className={`w-12 h-6 rounded-full transition-colors ${
              sound ? 'bg-pink-500' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
              sound ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>

        <div className="flex justify-between items-center">
          <span>Vibration</span>
          <button
            onClick={() => setVibration(!vibration)}
            className={`w-12 h-6 rounded-full transition-colors ${
              vibration ? 'bg-pink-500' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
              vibration ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
      </div>

      <div className="p-4 mt-auto">
        <button
          onClick={handleSave}
          className="w-full bg-pink-500 text-white py-3 rounded-full"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ReminderPage;