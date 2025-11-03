import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const selectProductsState = (state: RootState) => state.products;
export const selectAllProducts = (state: RootState) => state.products.products;
export const selectProductsLoading = (state: RootState) =>
  state.products.loading;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectProductsFilter = (state: RootState) => state.products.filter;
export const selectSearchQuery = (state: RootState) =>
  state.products.searchQuery;

export const selectFilteredProducts = createSelector(
  [selectAllProducts, selectProductsFilter, selectSearchQuery],
  (products, filter, searchQuery) => {
    let filtered = products;

    if (filter === 'favorites') {
      filtered = filtered.filter((product) => product.isLiked);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }
);

export const selectProductById = (productId: number) => (state: RootState) =>
  state.products.products.find((product) => product.id === productId);
