import React from 'react';

// Define a placeholder Video type
interface Video {
  title: string;
  duration: string;
  // Add other properties as needed, even if they're just placeholders for now
}

interface VideoListProps {
  videos: Video[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  return (
    <ul className="space-y-2">
      {videos.map((video, idx) => (
        <li
          key={idx} // Use idx as key, but consider a unique video ID if available
          className="flex justify-between items-center bg-gray-100 p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors"
        >
          <span>{video.title}</span>
          <span className="text-sm text-gray-500">{video.duration}</span>
        </li>
      ))}
    </ul>
  );
};

export default VideoList;