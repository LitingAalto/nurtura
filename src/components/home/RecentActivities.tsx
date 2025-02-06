import React from 'react';

const RecentActivities: React.FC = () => {
  const activities = [
    { icon: '🍼', label: 'Last Feed', time: '2h ago' },
    { icon: '😴', label: 'Last Sleep', time: '4h ago' },
    { icon: '👶', label: 'Last Diaper', time: '1h ago' },
  ];

  return (
    <div className="p-4">
      <h3 className="text-gray-600 mb-2">Recent Activities</h3>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex-shrink-0 bg-white p-3 rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-2">
              <span className="text-xl">{activity.icon}</span>
              <div>
                <div className="font-medium">{activity.label}</div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;