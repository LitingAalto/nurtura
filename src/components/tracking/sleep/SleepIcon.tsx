import React from 'react';

const SleepIcon: React.FC = () => (
  <div className="flex justify-center items-center my-8">
    <div className="relative">
      <div className="w-24 h-24 bg-yellow-300 rounded-full">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-b-4 border-yellow-600 rounded-full"></div>
      </div>
      <div className="absolute -top-2 -right-2 text-purple-600 text-2xl">Z</div>
    </div>
  </div>
);

export default SleepIcon;