import React from 'react';
import { VaccineDetails } from '../../types/vaccine';

interface VaccineDetailsProps {
  details: VaccineDetails;
  onSetAlarm: () => void;
}

const VaccineDetailsComponent: React.FC<VaccineDetailsProps> = ({ details, onSetAlarm }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="font-medium mb-2">Vaccine Information</h2>
        <p className="text-gray-600">{details.description}</p>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <h2 className="font-medium mb-2">Prevents</h2>
        <ul className="list-disc list-inside text-gray-600">
          {details.preventedDiseases.map((disease, index) => (
            <li key={index}>{disease}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <h2 className="font-medium mb-2">Administration</h2>
        <p className="text-gray-600">{details.administrationMethod}</p>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <h2 className="font-medium mb-2">Precautions</h2>
        <ul className="list-disc list-inside text-gray-600">
          {details.precautions.map((precaution, index) => (
            <li key={index}>{precaution}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default VaccineDetailsComponent;