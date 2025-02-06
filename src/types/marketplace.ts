export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  condition: 'new' | 'like_new' | 'good' | 'fair';
  images: string[];
  seller: {
    id: string;
    name: string;
    rating: number;
  };
  createdAt: Date;
  isFavorite: boolean;
}

export interface MarketplaceFilter {
  category?: string;
  priceRange?: [number, number];
  condition?: string[];
  location?: string;
}