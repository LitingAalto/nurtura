import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { id: 'home', icon: '🏠', label: 'Home', path: '/mom' },
    { id: 'community', icon: '👥', label: 'Community', path: '/mom' },
    { id: 'shop', icon: '🛍️', label: 'Shop', path: '/shop' },
    { id: 'messages', icon: '💬', label: 'Messages', path: '/messages' },
    { id: 'profile', icon: '👤', label: 'Profile', path: '/mom/mode' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center p-1 min-w-[60px] ${
            location.pathname === item.path ? 'text-pink-500' : 'text-gray-500'
          }`}
        >
          <span className="text-2xl mb-1">{item.icon}</span>
          <span className="text-[10px]">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;