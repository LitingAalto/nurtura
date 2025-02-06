import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MarketplaceItemPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          ←
        </button>
        <div className="flex space-x-4">
          <button className="text-gray-600">Share</button>
          <button className="text-gray-600">❤️</button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="aspect-square bg-gray-200" />

      {/* Item Details */}
      <div className="bg-white p-4 mt-2">
        <h1 className="text-xl font-semibold mb-2">Baby Carrier</h1>
        <p className="text-2xl text-pink-500 mb-4">€25.00</p>
        
        <div className="mb-4">
          <h2 className="font-medium mb-2">Description</h2>
          <p className="text-gray-600">
            Excellent condition baby carrier, suitable for 3-36 months.
            Used only a few times. No damages or stains.
          </p>
        </div>

        <div className="mb-4">
          <h2 className="font-medium mb-2">Details</h2>
          <div className="space-y-2 text-gray-600">
            <p>Condition: Like new</p>
            <p>Category: Baby Gear</p>
            <p>Location: Helsinki</p>
            <p>Posted: 2 days ago</p>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="font-medium mb-2">Seller</h2>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full mr-3" />
            <div>
              <p className="font-medium">Anna M.</p>
              <p className="text-sm text-gray-500">⭐ 4.8 (12 reviews)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="flex space-x-4">
          <button 
            onClick={() => {/* Open message dialog */}}
            className="flex-1 py-3 border border-pink-500 text-pink-500 rounded-full"
          >
            Message
          </button>
          <button 
            onClick={() => {/* Handle purchase */}}
            className="flex-1 py-3 bg-pink-500 text-white rounded-full"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceItemPage;