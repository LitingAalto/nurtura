import React from 'react';
import { useNavigate } from 'react-router-dom';

const MomQuickActions: React.FC = () => {
  const navigate = useNavigate();
  
  const actions = [
    { 
      icon: '💝', 
      label: "Mom's Recovery",
      onClick: () => navigate('/mom/recovery')
    },
    { 
      icon: '📝', 
      label: 'Records',
      onClick: () => navigate('/mom/records')
    },
    { 
      icon: '🥗', 
      label: 'Diet Tips',
      onClick: () => navigate('/mom/diet')
    },
    {
      icon: '🏪',
      label: 'Marketplace',
      onClick: () => navigate('/marketplace')
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-white">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-xl mb-1">
            {action.icon}
          </div>
          <span className="text-xs text-gray-600 text-center">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MomQuickActions;