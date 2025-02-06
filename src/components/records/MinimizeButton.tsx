import React from 'react';
import { useWindowStore } from '../../store/windowStore';

interface MinimizeButtonProps {
  type: 'feeding' | 'formula' | 'pumped_milk' | 'sleep' | 'diaper' | 'pump' | 'meds';
  title: string;
  icon: string;
  state: any;
}

const MinimizeButton: React.FC<MinimizeButtonProps> = ({ type, title, icon, state }) => {
  const { minimizeWindow } = useWindowStore();

  const handleMinimize = () => {
    minimizeWindow({
      id: crypto.randomUUID(),
      type,
      title,
      icon,
      timestamp: new Date(),
      state
    });
  };

  return (
    <button
      onClick={handleMinimize}
      className="text-gray-600 hover:text-gray-800"
    >
      ⎯
    </button>
  );
};

export default MinimizeButton;