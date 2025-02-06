import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopItem } from '../types/shop';

const ShopPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<'relevance' | 'price' | 'latest'>('latest');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'clothing', label: 'Clothing' },
    { id: 'gear', label: 'Baby Gear' },
    { id: 'furniture', label: 'Furniture' },
    { id: 'toys', label: 'Toys' },
    { id: 'accessories', label: 'Accessories' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => navigate(-1)} className="text-gray-600">
            ←
          </button>
          <h1 className="text-lg font-semibold">Shop</h1>
          <div className="flex space-x-4">
            <button onClick={() => navigate('/shop/cart')} className="text-gray-600">
              🛒
            </button>
            <button onClick={() => navigate('/shop/favorites')} className="text-pink-500">
              ❤️
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full p-3 bg-gray-100 rounded-lg pl-10"
            />
            <span className="absolute left-3 top-3 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Categories */}
        <div className="overflow-x-auto">
          <div className="flex space-x-2 p-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex justify-between p-4 bg-white border-b border-gray-200">
        <button 
          onClick={() => {/* Open filter modal */}}
          className="flex items-center text-gray-600"
        >
          <span className="mr-1">🔍</span>
          Filters
        </button>
        <button 
          onClick={() => {/* Open sort options */}}
          className="flex items-center text-gray-600"
        >
          <span className="mr-1">↕️</span>
          Sort
        </button>
      </div>

      {/* Product Grid */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {/* Sample products - replace with actual data */}
        {[1, 2, 3, 4].map((item) => (
          <div 
            key={item}
            onClick={() => navigate(`/shop/product/${item}`)}
            className="bg-white rounded-lg overflow-hidden shadow"
          >
            <div className="aspect-square bg-gray-200" />
            <div className="p-2">
              <h3 className="font-medium">Premium Baby Carrier</h3>
              <p className="text-pink-500">€89.99</p>
              <div className="flex items-center mt-1">
                <span className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</span>
                <span className="text-xs text-gray-500 ml-1">(42)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;