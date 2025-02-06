import React from 'react';
import { useNavigate } from 'react-router-dom';

// Define the types more explicitly
interface RecordOption {
  icon: string;
  // Add other properties of RecordOption here if they exist
}

type RecordType = {
  id: string;
  title: string;
  type: 'multiple' | 'single' | 'other'; // Add other possible types
  options?: (string | RecordOption)[]; // options can be undefined, and can be string or RecordOption
};

interface RecordItemProps {
  record: RecordType;
  date: Date;
}

const RecordItem: React.FC<RecordItemProps> = ({ record, date }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/mom/records/${record.id}`, { state: { date } });
  };

  return (
    <div
      className="flex items-center justify-between bg-white p-4 rounded-lg mb-2 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center">
        <span className="text-lg mr-2">{record.title}</span>
        {record.type === 'multiple' && record.options && ( // Check if options exists and is not null/undefined
          <div className="flex space-x-2">
            {record.options.map((option, index) => (
              <span key={index} className="text-xl">
                {typeof option === 'string' ? option : option.icon}
              </span>
            ))}
          </div>
        )}
      </div>
      <span className="text-gray-400">→</span>
    </div>
  );
};

export default RecordItem;