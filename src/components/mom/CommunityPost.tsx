import React from 'react';

interface PostProps {
  avatar: string;
  username: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
}

const CommunityPost: React.FC<PostProps> = ({
  avatar,
  username,
  content,
  image,
  likes,
  comments,
}) => {
  return (
    <div className="bg-white p-4 mb-4">
      <div className="flex items-center mb-3">
        <img src={avatar} alt={username} className="w-8 h-8 rounded-full mr-2" />
        <span className="font-medium">{username}</span>
      </div>
      <p className="text-gray-700 mb-3">{content}</p>
      {image && (
        <img src={image} alt="Post content" className="w-full rounded-lg mb-3" />
      )}
      <div className="flex items-center text-gray-500 text-sm">
        <button className="flex items-center mr-4">
          <span>❤️</span>
          <span className="ml-1">{likes}</span>
        </button>
        <button className="flex items-center">
          <span>💬</span>
          <span className="ml-1">{comments}</span>
        </button>
      </div>
    </div>
  );
};

export default CommunityPost;