import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  
  const actions = [
    { icon: '🍼', label: 'Feeding', onClick: () => navigate('/records') },
    { icon: '💉', label: 'Vaccine', onClick: () => navigate('/vaccine') },
    { icon: '📏', label: 'Growth', onClick: () => navigate('/growth') },
    { icon: '🔔', label: 'Reminder List', onClick: () => navigate('/reminder-records') }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-xl mb-1">
            {action.icon}
          </div>
          <span className="text-xs text-gray-600">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;