import React from 'react';

interface ChangeItem {
  icon: string;
  title: string;
  description: string;
}

const PhysicalChanges: React.FC = () => {
  const changes: ChangeItem[] = [
    {
      icon: '🛋️',
      title: 'Body Fatigue',
      description: 'Due to increased body fat during pregnancy, recovery may take time.'
    },
    {
      icon: '🧴',
      title: 'Skin Changes',
      description: 'Skin elasticity is gradually improving.'
    },
    {
      icon: '💪',
      title: 'Physical Recovery',
      description: 'Muscle relaxation and body flexibility are returning.'
    }
  ];

  return (
    <div className="bg-white p-4 rounded-lg mb-4">
      <h2 className="text-lg font-semibold mb-4">Physical Changes</h2>
      <div className="space-y-4">
        {changes.map((item, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
              {item.icon}
            </div>
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhysicalChanges;