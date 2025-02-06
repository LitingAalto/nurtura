import React from 'react';
import { useNavigate } from 'react-router-dom';

const DiscussionGroups: React.FC = () => {
  const navigate = useNavigate();
  
  const groups = [
    { id: '1', name: 'First-time Moms', members: 1234 },
    { id: '2', name: 'Trying to Conceive', members: 856 },
    { id: '3', name: 'Postpartum Recovery Tips', members: 2341 }
  ];

  return (
    <div className="p-4">
      <h3 className="text-gray-600 mb-3">Discussion Groups</h3>
      <div className="space-y-3">
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => navigate(`/groups/${group.id}`)}
            className="w-full bg-white p-4 rounded-lg flex items-center justify-between"
          >
            <div>
              <div className="font-medium">{group.name}</div>
              <div className="text-sm text-gray-500">{group.members} members</div>
            </div>
            <span className="text-gray-400">→</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DiscussionGroups;