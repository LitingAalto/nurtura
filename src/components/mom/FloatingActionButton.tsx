import React from 'react';
import { useNavigate } from 'react-router-dom';

const FloatingActionButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/create-post')}
      className="fixed bottom-20 right-4 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-lg"
    >
      <span className="text-2xl">+</span>
    </button>
  );
};

export default FloatingActionButton;