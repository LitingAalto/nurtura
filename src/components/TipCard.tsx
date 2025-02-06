import React from 'react';

interface TipCardProps {
  tip: string;
}

const TipCard: React.FC<TipCardProps> = ({ tip }) => {
  return (
    <div className="bg-white rounded-lg p-4 mb-4 shadow">
      <h2 className="text-lg font-bold text-purple-600 mb-2">Today's Tip</h2>
      <p className="text-gray-700">{tip}</p>
    </div>
  );
};

export default TipCard;