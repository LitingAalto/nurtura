import React from 'react';
import TabBar from '../components/home/TabBar';
import PostpartumBanner from '../components/mom/PostpartumBanner';
import MomQuickActions from '../components/mom/MomQuickActions';
import CommunityPost from '../components/mom/CommunityPost';
import BottomNavigation from '../components/mom/BottomNavigation';
import FloatingActionButton from '../components/mom/FloatingActionButton';
import { usePostStore } from '../store/postStore';

const MomCommunityPage: React.FC = () => {
  const { posts } = usePostStore();

  return (
    <div className="pb-16">
      {/* Top Navigation */}
      <div className="flex items-center justify-between p-4 bg-white">
        <button className="text-gray-600">🔍</button>
        <TabBar activeTab="mom" onTabChange={() => {}} />
        <button className="text-gray-600">🔔</button>
      </div>

      {/* Postpartum Banner */}
      <PostpartumBanner
        week={19}
        tip="Learn recovery massage techniques >"
      />

      {/* Period Question */}
      <div className="bg-white p-4 mb-4">
        <div className="flex justify-between items-center">
          <span>Did you get your period?</span>
          <div className="flex space-x-2">
            <button className="px-4 py-1 rounded-full border border-pink-500 text-pink-500">
              Yes
            </button>
            <button className="px-4 py-1 rounded-full border border-gray-300">
              No
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <MomQuickActions />

      {/* Community Posts */}
      {posts.map((post) => (
        <CommunityPost
          key={post.id}
          avatar="/default-avatar.png"
          username="Me"
          content={post.content}
          image={post.images[0]}
          likes={post.likes}
          comments={post.comments}
        />
      ))}

      {/* Floating Action Button */}
      <FloatingActionButton />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default MomCommunityPage;