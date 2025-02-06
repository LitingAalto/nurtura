import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MarketplaceSellPage: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle item submission
    navigate('/marketplace');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          ←
        </button>
        <h1 className="text-lg font-semibold">Sell Item</h1>
        <div className="w-8" />
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Image Upload */}
        <div className="bg-white p-4 rounded-lg">
          <div className="grid grid-cols-4 gap-2">
            <button className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              +
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">Add up to 8 photos</p>
        </div>

        {/* Item Details */}
        <div className="bg-white p-4 rounded-lg space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="What are you selling?"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="€0.00"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select category</option>
              <option value="clothing">Clothing</option>
              <option value="gear">Baby Gear</option>
              <option value="furniture">Furniture</option>
              <option value="toys">Toys</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select condition</option>
              <option value="new">New</option>
              <option value="like_new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-lg"
              rows={4}
              placeholder="Describe your item..."
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Add your location"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 rounded-full"
        >
          Post Item
        </button>
      </form>
    </div>
  );
};

export default MarketplaceSellPage;