import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useShopStore } from '../store/shopStore';

const ShopProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart, toggleFavorite, favorites } = useShopStore();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Mock product data - replace with actual data fetching
  const product = {
    id: id || '1',
    title: 'Premium Baby Carrier',
    description: 'Premium quality baby carrier with ergonomic design.',
    price: 89.99,
    category: 'gear',
    images: [],
    rating: 5,
    reviews: 42,
    specifications: {
      material: 'Premium Cotton',
      weightCapacity: '3.5-15kg',
      ageRange: '3-36 months',
      care: 'Machine washable'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 10,
    isFavorite: false
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, quantity, selectedSize);
    navigate('/shop/cart');
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, quantity, selectedSize);
    navigate('/shop/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          ←
        </button>
        <div className="flex space-x-4">
          <button onClick={() => navigate('/shop/cart')} className="text-gray-600">
            🛒
          </button>
          <button 
            onClick={() => toggleFavorite(product.id)}
            className={favorites.includes(product.id) ? 'text-pink-500' : 'text-gray-600'}
          >
            ❤️
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="aspect-square bg-gray-200" />

      {/* Product Details */}
      <div className="bg-white p-4 mt-2">
        <div className="flex justify-between items-start">
          <h1 className="text-xl font-semibold mb-2">{product.title}</h1>
          <div className="flex items-center">
            <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
            <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
          </div>
        </div>
        <p className="text-2xl text-pink-500 mb-4">€{product.price}</p>
        
        <div className="mb-4">
          <h2 className="font-medium mb-2">Description</h2>
          <p className="text-gray-600">{product.description}</p>
        </div>

        {/* Size Selection */}
        <div className="mb-4">
          <h2 className="font-medium mb-2">Size</h2>
          <div className="grid grid-cols-4 gap-2">
            {product.sizes?.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2 rounded-lg ${
                  selectedSize === size
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selection */}
        <div className="mb-4">
          <h2 className="font-medium mb-2">Quantity</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 bg-gray-100 rounded-full"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="w-8 h-8 bg-gray-100 rounded-full"
            >
              +
            </button>
          </div>
        </div>

        {/* Specifications */}
        <div className="mb-4">
          <h2 className="font-medium mb-2">Specifications</h2>
          <div className="space-y-2 text-gray-600">
            {Object.entries(product.specifications).map(([key, value]) => (
              <p key={key}>{key}: {value}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="flex space-x-4">
          <button 
            onClick={handleAddToCart}
            className="flex-1 py-3 border border-pink-500 text-pink-500 rounded-full"
          >
            Add to Cart
          </button>
          <button 
            onClick={handleBuyNow}
            className="flex-1 py-3 bg-pink-500 text-white rounded-full"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopProductPage;