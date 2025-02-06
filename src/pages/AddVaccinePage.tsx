import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVaccineStore } from '../store/vaccineStore';
import { VaccineDose } from '../types/vaccine';

const AddVaccinePage: React.FC = () => {
  const navigate = useNavigate();
  const { addVaccine } = useVaccineStore();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [monthDue, setMonthDue] = useState(0);
  const [scheduledDate, setScheduledDate] = useState(new Date());
  const [doses, setDoses] = useState<VaccineDose[]>([
    { number: 1, timing: '', completed: false }
  ]);

  const handleAddDose = () => {
    setDoses([
      ...doses,
      { number: doses.length + 1, timing: '', completed: false }
    ]);
  };

  const handleDoseChange = (index: number, timing: string) => {
    const newDoses = [...doses];
    newDoses[index] = { ...newDoses[index], timing };
    setDoses(newDoses);
  };

  const handleSubmit = () => {
    const vaccine = {
      id: crypto.randomUUID(),
      name,
      description,
      monthDue,
      completed: false,
      scheduledDate: new Date(scheduledDate),
      doses,
      reminder: null
    };
    
    addVaccine(vaccine);
    navigate('/vaccine');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="flex items-center p-4">
          <button onClick={() => navigate(-1)} className="text-gray-600">
            ←
          </button>
          <h1 className="flex-1 text-center text-lg font-semibold">Add Vaccine</h1>
          <div className="w-8" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white p-4 rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Vaccine Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter vaccine name"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-lg"
                rows={3}
                placeholder="Enter vaccine description"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Month Due</label>
              <input
                type="number"
                value={monthDue}
                onChange={(e) => setMonthDue(Number(e.target.value))}
                className="w-full p-2 border rounded-lg"
                min="0"
                max="24"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Scheduled Date</label>
              <input
                type="date"
                value={scheduledDate.toISOString().split('T')[0]}
                onChange={(e) => setScheduledDate(new Date(e.target.value))}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Doses</label>
              {doses.map((dose, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-gray-500">Dose {dose.number}</span>
                  <input
                    type="text"
                    value={dose.timing}
                    onChange={(e) => handleDoseChange(index, e.target.value)}
                    className="flex-1 p-2 border rounded-lg"
                    placeholder="Enter timing (e.g., 2 months)"
                  />
                </div>
              ))}
              <button
                onClick={handleAddDose}
                className="text-pink-500 text-sm"
              >
                + Add another dose
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!name || !description || doses.some(d => !d.timing)}
          className="w-full bg-pink-500 text-white p-4 rounded-full disabled:bg-gray-300"
        >
          Save Vaccine
        </button>
      </div>
    </div>
  );
};

export default AddVaccinePage;