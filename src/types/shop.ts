export interface ShopItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
  reviews: number;
  specifications: Record<string, string>;
  sizes?: string[];
  colors?: string[];
  stock: number;
  isFavorite: boolean;
}

export interface ShopFilter {
  category?: string;
  priceRange?: [number, number];
  sizes?: string[];
  colors?: string[];
  rating?: number;
}