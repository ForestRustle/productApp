import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductWithLikes, ProductState } from '../../types/product';

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  filter: 'all',
  searchQuery: '',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilter: (state, action: PayloadAction<'all' | 'favorites'>) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload.map((product) => ({
        ...product,
        isLiked: false,
      }));
      state.loading = false;
      state.error = null;
    },
    toggleLike: (state, action: PayloadAction<number>) => {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.isLiked = !product.isLiked;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      const newProduct: ProductWithLikes = {
        ...action.payload,
        isLiked: false,
      };
      state.products.push(newProduct);
    },
    updateProduct: (
      state,
      action: PayloadAction<{ id: number; updates: Partial<Product> }>
    ) => {
      const product = state.products.find((p) => p.id === action.payload.id);
      if (product) {
        Object.assign(product, action.payload.updates);
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setFilter,
  setSearchQuery,
  setProducts,
  toggleLike,
  deleteProduct,
  addProduct,
  updateProduct,
} = productSlice.actions;

export default productSlice.reducer;
