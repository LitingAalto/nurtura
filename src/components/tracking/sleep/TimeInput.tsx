import React from 'react';

interface TimeInputProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ label, value, onChange }) => (
  <div className="mb-4">
    <p className="text-gray-600 mb-2">{label}</p>
    <div 
      onClick={() => onChange(new Date())}
      className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
    >
      <span>{value ? value.toLocaleTimeString() : 'Select >'}</span>
      <span className="text-purple-500">▼</span>
    </div>
  </div>
);

export default TimeInput;