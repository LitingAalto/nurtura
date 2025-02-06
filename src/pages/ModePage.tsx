import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Header,
  SubscriptionBanner,
  ModeSelector,
  ModeOptions,
  DiscussionGroups
} from '../components/mode';

const ModePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = React.useState<string>('period');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onBack={() => navigate(-1)} />
      <SubscriptionBanner />
      <ModeSelector selectedMode={selectedMode} onModeSelect={setSelectedMode} />
      <ModeOptions mode={selectedMode} />
      <DiscussionGroups />
    </div>
  );
};

export default ModePage;