import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBabyStore } from '../store/babyStore';

const AddBabyPage: React.FC = () => {
  const navigate = useNavigate();
  const { addBaby } = useBabyStore();
  
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [birthDate, setBirthDate] = useState<Date>(new Date());

  const handleSubmit = () => {
    if (!name || !birthDate) return;

    addBaby({
      name,
      gender,
      birthDate: new Date(birthDate)
    });
    
    navigate('/baby-management');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          Cancel
        </button>
        <h1 className="text-lg font-semibold">Add Baby</h1>
        <button 
          onClick={handleSubmit}
          className="text-pink-500"
          disabled={!name || !birthDate}
        >
          Done
        </button>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-lg p-4 space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Baby's Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter baby's name"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Gender</label>
            <div className="flex space-x-4">
              <button
                onClick={() => setGender('male')}
                className={`flex-1 py-2 rounded-lg ${
                  gender === 'male' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100'
                }`}
              >
                Male
              </button>
              <button
                onClick={() => setGender('female')}
                className={`flex-1 py-2 rounded-lg ${
                  gender === 'female' 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-gray-100'
                }`}
              >
                Female
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Birth Date</label>
            <input
              type="date"
              value={birthDate.toISOString().split('T')[0]}
              onChange={(e) => setBirthDate(new Date(e.target.value))}
              className="w-full p-3 border rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBabyPage;