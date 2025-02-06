import React from 'react';
import { Video } from '../../types/recovery';

interface VideoListProps {
  videos: Video[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  return (
    <ul>
      {videos.map((video, index) => (
        <li key={index}>
          <a href={video.url} target="_blank" rel="noopener noreferrer">
            {video.title} ({video.duration})
          </a>
        </li>
      ))}
    </ul>
  );
};

export default VideoList;
