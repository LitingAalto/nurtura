import React from 'react';

const SubscriptionBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 m-4 rounded-lg">
      <h3 className="font-semibold mb-2">Upgrade to Premium</h3>
      <p className="text-sm mb-3">Get access to exclusive features and content</p>
      <button className="bg-white text-pink-500 px-4 py-2 rounded-full text-sm font-medium">
        Upgrade Now
      </button>
    </div>
  );
};

export default SubscriptionBanner;