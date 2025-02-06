import React from 'react';
import { RecoveryTimelineData } from '../../../types/mom';
import VideoList from './VideoList';

interface RecoverySectionProps {
  data: RecoveryTimelineData;
}

const RecoverySection: React.FC<RecoverySectionProps> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-yellow-600">{data.timeline}</h2>

      <p className="mt-2 text-gray-700 font-medium">Key Points:</p>
      <ul className="list-disc list-inside text-gray-600">
        {data.keyPoints.map((point: string, idx: number) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>

      <p className="mt-4 text-gray-700 font-medium">Videos:</p>
      <VideoList videos={data.videos} />
    </div>
  );
};

export default RecoverySection;