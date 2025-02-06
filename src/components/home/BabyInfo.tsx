import React from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateBabyAge } from '../../utils/dateUtils';

interface BabyInfoProps {
  birthDate: Date;
  name: string;
}

const BabyInfo: React.FC<BabyInfoProps> = ({ birthDate, name }) => {
  const navigate = useNavigate();
  const age = calculateBabyAge(birthDate);

  return (
    <div 
      className="p-4 bg-pink-50 rounded-lg mb-4 cursor-pointer"
      onClick={() => navigate('/baby-weekly')}
    >
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center">
          👶
        </div>
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-gray-600">{age}</p>
        </div>
      </div>
      <p className="mt-2 text-gray-600">
        Click to view weekly development details
      </p>
    </div>
  );
};

export default BabyInfo;