import React from 'react';
import { GrowthMeasurement } from '../../types/growth';

interface GrowthRecordProps {
  record: GrowthMeasurement;
  onEdit: (record: GrowthMeasurement) => void;
  onDelete: (id: string) => void;
}

const GrowthRecord: React.FC<GrowthRecordProps> = ({ record, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-500">
          {record.date.toLocaleDateString()}
        </span>
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(record)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✏️
          </button>
          <button 
            onClick={() => onDelete(record.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-gray-500 text-sm">Height</div>
          <div className="text-lg font-semibold">{record.height} cm</div>
        </div>
        <div>
          <div className="text-gray-500 text-sm">Weight</div>
          <div className="text-lg font-semibold">{record.weight} kg</div>
        </div>
        <div>
          <div className="text-gray-500 text-sm">Head</div>
          <div className="text-lg font-semibold">{record.headCircumference} cm</div>
        </div>
      </div>
    </div>
  );
};

export default GrowthRecord;