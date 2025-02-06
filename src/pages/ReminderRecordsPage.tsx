import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecordsStore } from '../store/recordsStore';
import ReminderPanel from '../components/reminder/ReminderPanel';
import { DB } from '../services/storage/db';

const ReminderRecordsPage: React.FC = () => {
  const navigate = useNavigate();
  const { reminders = [], toggleReminder, deleteReminder, addReminder, loadReminders } = useRecordsStore();
  const [showAddReminder, setShowAddReminder] = useState(false);

  useEffect(() => {
    // Initialize DB and load reminders
    const initializeDB = async () => {
      await DB.init();
      await loadReminders();
    };
    initializeDB();
  }, [loadReminders]);

  const handleDelete = async (id: string) => {
    try {
      if (await DB.hasStore('reminders')) {
        if (confirm('Are you sure you want to delete this reminder?')) {
          await deleteReminder(id);
        }
      }
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  const handleAddReminder = async (reminderType: string, time: Date) => {
    try {
      await addReminder({
        id: crypto.randomUUID(),
        title: 'Custom Reminder',
        type: reminderType,
        timestamp: new Date(),
        time,
        isActive: true,
        repeat: reminderType !== 'none' ? {
          type: 'daily',
          days: []
        } : undefined
      });
      setShowAddReminder(false);
    } catch (error) {
      console.error('Error adding reminder:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => navigate('/')} className="text-gray-600">
            ←
          </button>
          <h1 className="text-lg font-semibold">Reminder Records</h1>
          <button 
            onClick={() => setShowAddReminder(true)}
            className="text-pink-500 text-xl"
          >
            +
          </button>
        </div>
      </div>

      <div className="p-4">
        {Array.isArray(reminders) && reminders.map((reminder) => (
          <div 
            key={reminder.id}
            className="bg-white p-4 rounded-lg mb-4 shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{reminder.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(reminder.time).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </p>
                {reminder.repeat && (
                  <p className="text-xs text-gray-400">
                    Repeats {reminder.repeat.type}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleReminder(reminder.id)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    reminder.isActive ? 'bg-pink-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                    reminder.isActive ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
                <button
                  onClick={() => handleDelete(reminder.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ReminderPanel
        isOpen={showAddReminder}
        onClose={() => setShowAddReminder(false)}
        onSave={handleAddReminder}
      />
    </div>
  );
};

export default ReminderRecordsPage;