import React from 'react';

interface ActivitySectionProps {
  description: string;
}

const ActivitySection: React.FC<ActivitySectionProps> = ({ description }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-pink-500 font-bold mb-2">Activity</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default ActivitySection;