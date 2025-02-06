import React from 'react';
import { Mode } from '../../types/mode';

interface ModeSelectorProps {
  selectedMode: string;
  onModeSelect: (mode: string) => void;
}

const modes: Mode[] = [
  { id: 'period', label: 'Period Mode', icon: '📅' },
  { id: 'prepare', label: 'Prepare for Pregnancy', icon: '🌱' },
  { id: 'pregnancy', label: 'Pregnancy', icon: '🤰' },
  { id: 'postpartum', label: 'Postpartum', icon: '👶' },
];

const ModeSelector: React.FC<ModeSelectorProps> = ({ selectedMode, onModeSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeSelect(mode.id)}
          className={`p-4 rounded-lg flex flex-col items-center ${
            selectedMode === mode.id
              ? 'bg-pink-100 text-pink-600'
              : 'bg-white text-gray-600'
          }`}
        >
          <span className="text-2xl mb-2">{mode.icon}</span>
          <span className="text-sm">{mode.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ModeSelector;