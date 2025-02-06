import React from 'react';
import { Reaction } from '../../types/solid';

interface ReactionSelectorProps {
  selected: Reaction | null;
  onChange: (reaction: Reaction) => void;
}

const ReactionSelector: React.FC<ReactionSelectorProps> = ({ selected, onChange }) => {
  const reactions: { type: Reaction; icon: string; label: string }[] = [
    { type: 'loved', icon: '😋', label: 'Loved it' },
    { type: 'okay', icon: '😐', label: 'Meh' },
    { type: 'disliked', icon: '🤢', label: 'Hated it' },
    { type: 'allergy', icon: '⚠️', label: 'Allergy' },
  ];

  return (
    <div className="p-4">
      <h3 className="text-sm text-gray-600 mb-2">Baby's Reaction</h3>
      <div className="flex justify-between">
        {reactions.map(({ type, icon, label }) => (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={`flex flex-col items-center p-2 rounded-lg ${
              selected === type ? 'bg-pink-100' : ''
            }`}
          >
            <span className="text-2xl mb-1">{icon}</span>
            <span className="text-xs text-gray-600">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReactionSelector;