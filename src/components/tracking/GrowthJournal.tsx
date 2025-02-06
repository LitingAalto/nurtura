import React, { useState } from 'react';
import type { GrowthMilestone } from '../../types/tracking';

const GrowthJournal: React.FC = () => {
  const [milestones, setMilestones] = useState<GrowthMilestone[]>([]);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestoneDescription, setNewMilestoneDescription] = useState('');

  const addMilestone = (milestone: GrowthMilestone) => {
    setMilestones([...milestones, milestone]);
  };

  const handleAddMilestone = () => {
    const newMilestone: GrowthMilestone = {
      id: Date.now().toString(), // Generate a unique ID (not ideal for production)
      title: newMilestoneTitle,
      description: newMilestoneDescription,
      date: new Date(), // Use current date
    };

    addMilestone(newMilestone);
    setNewMilestoneTitle(''); // Clear the input fields
    setNewMilestoneDescription('');
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="text-xl font-bold text-purple-600 mb-4">Growth Journal</h2>

      {/* Milestone Form */}
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newMilestoneTitle}
          onChange={(e) => setNewMilestoneTitle(e.target.value)}
          className="border rounded p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={newMilestoneDescription}
          onChange={(e) => setNewMilestoneDescription(e.target.value)}
          className="border rounded p-2 mb-2 w-full"
        />
        <button
          onClick={handleAddMilestone}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg mb-4"
          disabled={!newMilestoneTitle || !newMilestoneDescription} // Disable if fields are empty
        >
          Add Milestone
        </button>
      </div>

      <div className="space-y-4">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="border-b pb-4">
            <div className="font-semibold">{milestone.title}</div>
            <div className="text-sm text-gray-600">
              {milestone.date.toLocaleDateString()}
            </div>
            <div className="mt-2">{milestone.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrowthJournal;