import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActivityStore } from '../store/activityStore';
import TimeSelector from '../components/tracking/common/TimeSelector';
import ConfirmDialog from '../components/common/ConfirmDialog';

const defaultMeds = ['D-vitamin', 'Iron', 'Multivitamin', 'Probiotics'];

const MedsPage: React.FC = () => {
  const navigate = useNavigate();
  const { addActivity } = useActivityStore();
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [medName, setMedName] = useState('D-vitamin');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState<'ml' | 'drops' | 'tsp'>('drops');
  const [notes, setNotes] = useState('');
  const [newMed, setNewMed] = useState('');
  const [customMeds, setCustomMeds] = useState<string[]>([]);

  const handleSave = () => {
    const activity = {
      id: crypto.randomUUID(),
      type: 'meds' as const,
      timestamp: startTime,
      medName,
      amount: Number(amount),
      unit,
      notes
    };
    
    addActivity(activity);
    navigate('/records');
  };

  const handleExit = () => {
    if (amount || notes) {
      setShowExitDialog(true);
    } else {
      navigate('/records');
    }
  };

  const handleAddNewMed = () => {
    if (newMed && !defaultMeds.includes(newMed) && !customMeds.includes(newMed)) {
      setCustomMeds([...customMeds, newMed]);
      setMedName(newMed);
      setNewMed('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-pink-50">
      <div className="flex justify-between items-center p-4 border-b border-pink-100">
        <button onClick={handleExit} className="text-gray-600 text-xl">×</button>
        <div className="text-center">
          <h1 className="text-lg font-medium">Meds & Vitamins</h1>
          <p className="text-sm text-gray-500">Track medications</p>
        </div>
        <div className="w-8" />
      </div>

      <div className="flex-1 p-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
          <TimeSelector
            label="Time"
            value={startTime}
            onChange={setStartTime}
          />

          <div>
            <label className="block text-gray-600 mb-2">Medicine/Vitamin</label>
            <select
              value={medName}
              onChange={(e) => setMedName(e.target.value)}
              className="w-full p-3 bg-gray-50 rounded-lg"
            >
              {[...defaultMeds, ...customMeds].map(med => (
                <option key={med} value={med}>{med}</option>
              ))}
            </select>
            <div className="mt-2 flex space-x-2">
              <input
                type="text"
                value={newMed}
                onChange={(e) => setNewMed(e.target.value)}
                placeholder="Add new medicine"
                className="flex-1 p-2 bg-gray-50 rounded-lg"
              />
              <button
                onClick={handleAddNewMed}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-2">Amount</label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 p-3 bg-gray-50 rounded-lg"
                placeholder="Amount"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as 'ml' | 'drops' | 'tsp')}
                className="w-24 p-3 bg-gray-50 rounded-lg"
              >
                <option value="ml">ml</option>
                <option value="drops">drops</option>
                <option value="tsp">tsp</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes..."
              className="w-full p-3 bg-gray-50 rounded-lg resize-none"
              rows={3}
            />
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
        message="You have unsaved medication data. Do you want to save before exiting?"
        onConfirm={handleSave}
        onCancel={() => navigate('/records')}
      />
    </div>
  );
};

export default MedsPage;