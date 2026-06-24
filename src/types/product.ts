export interface ShopLinks {
  shopee?: string;
  lazada?: string;
  tiktokShop?: string;
}

export interface Product {
  id: string; // Firestore document ID
  title: string;
  slug: string;
  category: string;
  description: string;
  reviewSummary: string;
  rating: number; // e.g. 4.5
  priceRange: string; // e.g. "$10 - $25"
  images: string[]; // array of image URLs
  tiktokUrl: string; // TikTok video review URL
  shopLinks: ShopLinks;
  pros: string[];
  cons: string[];
  isFeatured: boolean;
  isHidden?: boolean;
  clickCount: number;
  createdAt: string; // ISO string representation of Firestore timestamp
  updatedAt: string; // ISO string representation of Firestore timestamp
}

export interface ProductClick {
  id?: string;
  productId: string;
  platform: 'shopee' | 'lazada' | 'tiktokShop' | string;
  clickedAt: string;
}
