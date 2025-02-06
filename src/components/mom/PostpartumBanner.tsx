import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PostpartumBannerProps {
  week: number;
  tip: string;
}

const PostpartumBanner: React.FC<PostpartumBannerProps> = ({ week, tip }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-pink-400 text-white p-4 rounded-lg mx-4 mb-4 cursor-pointer"
      onClick={() => navigate('/postpartum-details')}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Postpartum Week {week}</h2>
        <div className="text-sm bg-pink-500 px-3 py-1 rounded-full">
          Today's Mood: --
        </div>
      </div>
      <p className="text-sm">{tip}</p>
    </div>
  );
};

export default PostpartumBanner;