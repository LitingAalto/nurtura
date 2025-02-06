import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecoverySection from '../components/mom/recovery/RecoverySection';
import RecoveryTabs from '../components/mom/recovery/RecoveryTabs';
import { recoveryData } from '../data/recovery';
import { calculatePostpartumPeriod } from '../utils/recoveryUtils';

const PostpartumRecoveryPage: React.FC = () => {
  const navigate = useNavigate();
  // TODO: Get actual birth date from user data
  const birthDate = new Date(2024, 0, 1); // Example birth date
  const [activeTab, setActiveTab] = useState(calculatePostpartumPeriod(birthDate));

  const currentSection = recoveryData.find(section => 
    section.timeline.startsWith(activeTab === '1-2' ? '1-2' : 
      activeTab === '3-4' ? '3-4' : '5-6')
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center">
        <button 
          onClick={() => navigate(-1)} 
          className="text-gray-600"
        >
          ←
        </button>
        <h1 className="text-xl font-semibold flex-1 text-center">
          Postpartum Recovery
        </h1>
        <div className="w-8" />
      </div>

      <div className="bg-white mb-4">
        <RecoveryTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      </div>

      <div className="p-4">
        {currentSection && <RecoverySection data={currentSection} />}
      </div>
    </div>
  );
};

export default PostpartumRecoveryPage;