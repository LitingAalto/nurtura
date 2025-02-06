import React from 'react';

interface GrowthStatsProps {
  height: string;
  weight: string;
}

const GrowthStats: React.FC<GrowthStatsProps> = ({ height, weight }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h2 className="text-pink-500 font-bold mb-2">Growth This Week</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-gray-500 text-sm">Height</div>
          <div className="text-gray-700 font-semibold">{height}</div>
        </div>
        <div>
          <div className="text-gray-500 text-sm">Weight</div>
          <div className="text-gray-700 font-semibold">{weight}</div>
        </div>
      </div>
    </div>
  );
};

export default GrowthStats;