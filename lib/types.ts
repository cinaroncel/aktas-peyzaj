export interface Product {
  id: string;
  name: string;
  priceCents: number;
  currency: string;
  type: string;
  category: string;
  description: string;
  imageUrl: string;
  inStock: boolean;
}

export interface FilterOptions {
  type?: string;
  category?: string;
  sort?: 'price-asc' | 'price-desc';
}
