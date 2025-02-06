import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../components/mom/records/Calendar';
import RecordsList from '../components/mom/records/RecordsList';

const MomRecordsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center">
        <button onClick={() => navigate(-1)} className="text-gray-600">←</button>
        <h1 className="text-xl font-semibold flex-1 text-center">Mom's Records</h1>
        <div className="w-8" />
      </div>

      <Calendar 
        selectedDate={selectedDate} 
        onDateSelect={setSelectedDate}
      />
      
      <RecordsList selectedDate={selectedDate} />
    </div>
  );
};

export default MomRecordsPage;