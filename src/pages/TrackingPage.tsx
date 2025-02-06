import React from 'react';
import GrowthJournal from '../components/tracking/GrowthJournal';
import ActivityLogs from '../components/tracking/ActivityLogs';
import DevelopmentChecklist from '../components/tracking/DevelopmentChecklist';
import GrowthChart from '../components/tracking/GrowthChart';

const TrackingPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-purple-600 text-center mb-6">
        Baby Development Tracking
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GrowthJournal />
        <ActivityLogs />
        <DevelopmentChecklist />
        <GrowthChart />
      </div>
    </div>
  );
};

export default TrackingPage;