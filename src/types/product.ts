export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CreateProductForm {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface ProductWithLikes extends Product {
  isLiked: boolean;
}

export interface ProductState {
  products: ProductWithLikes[];
  loading: boolean;
  error: string | null;
  filter: 'all' | 'favorites';
  searchQuery: string;
}
