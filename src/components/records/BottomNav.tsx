import React from 'react';
import { useNavigate } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  
  const navItems = [
    { id: 'breastfeeding', icon: '🤱', label: 'Breastfeeding', onClick: () => navigate('/feeding') },
    { id: 'formula', icon: '🍼', label: 'Formula', onClick: () => navigate('/formula') },
    { id: 'mothers-milk', icon: '💧', label: "Mother's Milk", onClick: () => navigate('/mothers-milk') },
    { id: 'sleep', icon: '😴', label: 'Sleep', onClick: () => navigate('/sleep') },
    { id: 'diaper', icon: '👶', label: 'Diaper', onClick: () => navigate('/diaper') },
    { id: 'pump', icon: '⚡', label: 'Pump', onClick: () => navigate('/pump') },
    { id: 'solid', icon: '🥄', label: 'Solid', onClick: () => navigate('/solid') },
    { id: 'meds', icon: '💊', label: 'Meds', onClick: () => navigate('/meds') },
    { id: 'activity', icon: '🎯', label: 'Activity', onClick: () => navigate('/activity') }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center p-2 bg-white border-t border-gray-200 overflow-x-auto">
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={item.onClick}
          className="flex flex-col items-center p-1 min-w-[60px]"
        >
          <span className="text-2xl mb-1">{item.icon}</span>
          <span className="text-[10px] text-gray-600">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;