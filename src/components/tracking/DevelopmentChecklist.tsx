import React, { useState } from 'react';
import type { DevelopmentalMilestone } from '../../types/tracking';

const DevelopmentChecklist: React.FC = () => {
  const [milestones, setMilestones] = useState<DevelopmentalMilestone[]>([
    {
      id: '1',
      ageRange: '0-3 months',
      category: 'Physical',
      title: 'Raises head and chest when lying on stomach',
      description: 'Baby should be able to lift head and chest during tummy time',
      completed: false
    },
    // Add more milestones here
  ]);

  const toggleMilestone = (id: string) => {
    setMilestones(milestones.map(milestone =>
      milestone.id === id
        ? { ...milestone, completed: !milestone.completed, completedDate: new Date() }
        : milestone
    ));
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="text-xl font-bold text-purple-600 mb-4">Development Checklist</h2>
      <div className="space-y-4">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="flex items-start space-x-4">
            <input
              type="checkbox"
              checked={milestone.completed}
              onChange={() => toggleMilestone(milestone.id)}
              className="mt-1"
            />
            <div>
              <div className="font-semibold">{milestone.title}</div>
              <div className="text-sm text-gray-600">{milestone.ageRange}</div>
              <div className="text-sm mt-1">{milestone.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DevelopmentChecklist;