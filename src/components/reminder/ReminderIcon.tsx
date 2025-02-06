import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ReminderIcon: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate('/reminder', { state: { returnPath: location.pathname } });
  };

  return (
    <button 
      onClick={handleClick}
      className="text-gray-600 p-2"
    >
      🔔
    </button>
  );
};

export default ReminderIcon;