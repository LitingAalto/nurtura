import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useVaccineStore } from '../store/vaccineStore';
import { useRecordsStore } from '../store/recordsStore';
import VaccineDetails from '../components/vaccine/VaccineDetails';
import ReminderPanel from '../components/vaccine/ReminderPanel';

const VaccineDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { vaccines, setVaccineReminder } = useVaccineStore();
  const { addReminder } = useRecordsStore();
  const [showReminderPanel, setShowReminderPanel] = useState(false);
  
  const vaccine = vaccines.find(v => v.id === id);
  
  if (!vaccine) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Vaccine not found</p>
      </div>
    );
  }

  const handleSetReminder = (reminderType: string, time: Date) => {
    // Set reminder in vaccine store
    setVaccineReminder(vaccine.id, { type: reminderType, time });
    
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
    
    setShowReminderPanel(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => navigate(-1)} className="text-gray-600">
            ←
          </button>
          <h1 className="text-lg font-semibold">{vaccine.name}</h1>
          <button 
            onClick={() => setShowReminderPanel(true)}
            className="text-gray-600"
          >
            🔔
          </button>
        </div>
      </div>

      <div className="p-4">
        <VaccineDetails 
          details={{
            name: vaccine.name,
            description: vaccine.description,
            preventedDiseases: [],
            administrationMethod: '',
            sideEffects: [],
            precautions: []
          }}
          onSetAlarm={() => setShowReminderPanel(true)}
        />
      </div>

      <ReminderPanel
        isOpen={showReminderPanel}
        onClose={() => setShowReminderPanel(false)}
        onSave={handleSetReminder}
      />
    </div>
  );
};

export default VaccineDetailsPage;