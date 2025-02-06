import React from 'react';

const RecoveryTips: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Recovery Tips</h2>
      <div className="space-y-2">
        <div className="bg-pink-50 p-3 rounded-lg">
          <h3 className="font-medium text-pink-600">Learn Recovery Massage</h3>
          <p className="text-sm text-gray-600">
            Gentle massage can help with physical recovery and relaxation
          </p>
        </div>
        <div className="bg-pink-50 p-3 rounded-lg">
          <h3 className="font-medium text-pink-600">Rest Schedule</h3>
          <p className="text-sm text-gray-600">
            Try to sleep when your baby sleeps to maintain energy levels
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecoveryTips;