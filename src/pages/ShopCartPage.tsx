import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShopStore } from '../store/shopStore';

const ShopCartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartItemQuantity } = useShopStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // Implement checkout logic
    navigate('/shop/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white p-4 flex items-center">
          <button onClick={() => navigate(-1)} className="text-gray-600">
            ←
          </button>
          <h1 className="text-lg font-semibold flex-1 text-center">Cart</h1>
          <div className="w-8" />
        </div>
        <div className="flex flex-col items-center justify-center p-8">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-gray-600">Your cart is empty</p>
          <button
            onClick={() => navigate('/shop')}
            className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 flex items-center">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          ←
        </button>
        <h1 className="text-lg font-semibold flex-1 text-center">Cart</h1>
        <div className="w-8" />
      </div>

      <div className="p-4">
        {cart.map((item) => (
          <div key={item.id} className="bg-white rounded-lg mb-4 overflow-hidden shadow">
            <div className="flex p-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg" />
              <div className="flex-1 ml-4">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-pink-500">€{item.price}</p>
                {item.selectedSize && (
                  <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                )}
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateCartItemQuantity(item.id, Math.max(0, item.quantity - 1))}
                    className="w-8 h-8 bg-gray-100 rounded-full"
                  >
                    -
                  </button>
                  <span className="mx-4">{item.quantity}</span>
                  <button
                    onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 bg-gray-100 rounded-full"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-auto text-gray-400"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Total</span>
          <span className="font-medium">€{total.toFixed(2)}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full py-3 bg-pink-500 text-white rounded-full"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ShopCartPage;