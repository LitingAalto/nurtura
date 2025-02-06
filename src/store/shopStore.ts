import { create } from 'zustand';
import { ShopItem } from '../types/shop';

interface CartItem extends ShopItem {
  quantity: number;
  selectedSize?: string;
}

interface ShopStore {
  cart: CartItem[];
  favorites: string[];
  addToCart: (item: ShopItem, quantity: number, size?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  toggleFavorite: (itemId: string) => void;
  clearCart: () => void;
}

export const useShopStore = create<ShopStore>((set) => ({
  cart: [],
  favorites: [],

  addToCart: (item, quantity, size) => set((state) => {
    const existingItem = state.cart.find(
      cartItem => cartItem.id === item.id && cartItem.selectedSize === size
    );

    if (existingItem) {
      return {
        cart: state.cart.map(cartItem =>
          cartItem.id === item.id && cartItem.selectedSize === size
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        )
      };
    }

    return {
      cart: [...state.cart, { ...item, quantity, selectedSize: size }]
    };
  }),

  removeFromCart: (itemId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== itemId)
  })),

  updateCartItemQuantity: (itemId, quantity) => set((state) => ({
    cart: state.cart.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    )
  })),

  toggleFavorite: (itemId) => set((state) => ({
    favorites: state.favorites.includes(itemId)
      ? state.favorites.filter(id => id !== itemId)
      : [...state.favorites, itemId]
  })),

  clearCart: () => set({ cart: [] })
}));