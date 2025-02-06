import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ModeOption } from '../../types/mode';

interface ModeOptionsProps {
  // mode: string;  <-- Removed this line
}

const ModeOptions: React.FC<ModeOptionsProps> = () => { 
 const navigate = useNavigate();

 const options: ModeOption[] = [
  {
   id: 'baby-management',
   label: 'Baby Management',
   icon: '👶',
   path: '/baby-management'
  },
  // Add other options here
 ];

 return (
  <div className="p-4">
   <h3 className="text-gray-600 mb-3">Settings</h3>
   <div className="space-y-3">
    {options.map((option) => (
     <button
      key={option.id}
      onClick={() => navigate(option.path)}
      className="w-full bg-white p-4 rounded-lg flex items-center justify-between"
     >
      <div className="flex items-center">
       <span className="text-xl mr-3">{option.icon}</span>
       <span className="text-gray-700">{option.label}</span>
      </div>
      <span className="text-gray-400">→</span>
     </button>
    ))}
   </div>
  </div>
 );
};

export default ModeOptions;