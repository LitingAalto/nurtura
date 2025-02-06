import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBack }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="text-gray-600">←</button>
        <button 
          onClick={() => navigate('/profile')}
          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
        >
          👤
        </button>
      </div>
      <div className="flex space-x-4">
        <button className="text-gray-600">🔔</button>
        <button className="text-gray-600">✉️</button>
        <button className="text-gray-600">⚙️</button>
      </div>
    </div>
  );
};

export default Header;