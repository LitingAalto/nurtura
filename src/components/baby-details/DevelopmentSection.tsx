import React from 'react';

interface DevelopmentSectionProps {
  description: string;
  question: string;
  onAnswer: (answer: boolean) => void;
}

const DevelopmentSection: React.FC<DevelopmentSectionProps> = ({
  description,
  question,
  onAnswer,
}) => {
  return (
    <div className="bg-pink-50 p-4 rounded-lg shadow mb-4">
      <h2 className="text-pink-500 font-bold mb-2">Baby's Development Overview</h2>
      <p className="text-gray-700 mb-4">{description}</p>
      
      <h3 className="text-gray-700 font-semibold mb-2">{question}</h3>
      <div className="flex gap-2">
        <button
          onClick={() => onAnswer(true)}
          className="flex-1 bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition-colors"
        >
          Yes
        </button>
        <button
          onClick={() => onAnswer(false)}
          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default DevelopmentSection;