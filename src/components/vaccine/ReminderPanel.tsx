import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ReminderPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reminderType: string, time: Date) => void;
}

const ReminderPanel: React.FC<ReminderPanelProps> = ({ isOpen, onClose, onSave }) => {
  const [selectedType, setSelectedType] = React.useState('same-day');
  const [selectedTime, setSelectedTime] = React.useState(new Date());

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(selectedType, selectedTime);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end">
      <div className="bg-white w-full rounded-t-2xl p-4">
        <h2 className="text-lg font-semibold mb-4">Set Vaccine Reminder</h2>
        
        <div className="space-y-3 mb-4">
          {[
            { id: 'none', label: 'No Reminder' },
            { id: 'two-days', label: '2 Days Before' },
            { id: 'one-day', label: '1 Day Before' },
            { id: 'same-day', label: 'On the Same Day' }
          ].map(option => (
            <button
              key={option.id}
              onClick={() => setSelectedType(option.id)}
              className={`w-full p-3 rounded-lg text-left ${
                selectedType === option.id 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-gray-100'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {selectedType !== 'none' && (
          <div className="mb-4">
            <p className="text-gray-600 mb-2">Reminder Time</p>
            <DatePicker
              selected={selectedTime}
              onChange={(date) => setSelectedTime(date || new Date())}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="h:mm aa"
              className="w-full p-3 bg-gray-100 rounded-lg"
            />
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 p-3 rounded-lg bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 p-3 rounded-lg bg-pink-500 text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReminderPanel;