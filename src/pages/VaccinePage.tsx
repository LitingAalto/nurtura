import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVaccineStore } from '../store/vaccineStore';
import { useRecordsStore } from '../store/recordsStore';
import VaccineList from '../components/vaccine/VaccineList';
import ReminderPanel from '../components/vaccine/ReminderPanel';

const VaccinePage: React.FC = () => {
  const navigate = useNavigate();
  const { vaccines, toggleVaccineComplete, setVaccineReminder } = useVaccineStore();
  const { addReminder } = useRecordsStore();
  const [showReminderPanel, setShowReminderPanel] = useState(false);
  const [selectedVaccineId, setSelectedVaccineId] = useState<string | null>(null);

  const handleToggleComplete = (id: string) => {
    toggleVaccineComplete(id);
  };

  const handleSetReminder = (reminderType: string, time: Date) => {
    if (selectedVaccineId) {
      const vaccine = vaccines.find(v => v.id === selectedVaccineId);
      if (vaccine) {
        // Set reminder in vaccine store
        setVaccineReminder(selectedVaccineId, { type: reminderType, time });
        
        // Add reminder to records store
        addReminder({
          id: crypto.randomUUID(),
          title: `Vaccine: ${vaccine.name}`,
          type: 'vaccine',
          timestamp: new Date(),
          time,
          isActive: true,
          repeat: reminderType !== 'none' ? {
            type: 'once',
            days: []
          } : undefined
        });
      }
      setShowReminderPanel(false);
      setSelectedVaccineId(null);
    }
  };

  const handleReminderClick = (id: string) => {
    setSelectedVaccineId(id);
    setShowReminderPanel(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => navigate(-1)} className="text-gray-600">
            ←
          </button>
          <h1 className="text-lg font-semibold">Vaccine Schedule</h1>
          <button 
            onClick={() => navigate('/vaccine/add')}
            className="text-pink-500 text-xl"
          >
            +
          </button>
        </div>
      </div>

      <div className="p-4">
        <VaccineList 
          vaccines={vaccines}
          onToggleComplete={handleToggleComplete}
          onReminderClick={handleReminderClick}
        />
      </div>

      <ReminderPanel
        isOpen={showReminderPanel}
        onClose={() => {
          setShowReminderPanel(false);
          setSelectedVaccineId(null);
        }}
        onSave={handleSetReminder}
      />
    </div>
  );
};

export default VaccinePage;