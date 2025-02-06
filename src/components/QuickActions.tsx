import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  
  const actions = [
    { text: 'Track Development', onClick: () => navigate('/tracking') },
    { text: 'My Calendar', onClick: () => console.log('Calendar clicked') },
    { text: 'Baby Development', onClick: () => console.log('Development clicked') },
    { text: 'Resources', onClick: () => console.log('Resources clicked') }
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          className="bg-purple-500 text-white rounded-lg p-3 hover:bg-purple-600 transition-colors"
        >
          {action.text}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;