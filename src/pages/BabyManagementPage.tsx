import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBabyStore } from '../store/babyStore';

const BabyManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { babies, deleteBaby } = useBabyStore();

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const months = (today.getFullYear() - birth.getFullYear()) * 12 +
      today.getMonth() - birth.getMonth();
    const days = today.getDate() - birth.getDate();
    
    return `${months} months ${days} days`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          ←
        </button>
        <h1 className="text-lg font-semibold">Baby Management</h1>
        <button 
          onClick={() => navigate('/baby-management/add')}
          className="text-pink-500"
        >
          Add Baby
        </button>
      </div>

      <div className="p-4">
        {babies.map((baby) => (
          <div 
            key={baby.id}
            className="bg-white rounded-lg p-4 mb-4 shadow"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                {baby.gender === 'male' ? '👶' : '👶'}
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-medium">{baby.name}</h3>
                <p className="text-sm text-gray-500">
                  {calculateAge(baby.birthDate)}
                </p>
              </div>
              <button 
                onClick={() => navigate(`/baby-management/edit/${baby.id}`)}
                className="text-gray-400 mr-2"
              >
                ✏️
              </button>
              <button 
                onClick={() => {
                  if (confirm('Are you sure you want to delete this baby?')) {
                    deleteBaby(baby.id);
                  }
                }}
                className="text-gray-400"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BabyManagementPage;