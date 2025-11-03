import { createAsyncThunk } from '@reduxjs/toolkit';
import { productApi } from '../../utils/api';
import { CreateProductForm } from '../../types/product';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await productApi.getProducts();
      return products;
    } catch (error) {
      return rejectWithValue('Ошибка при загрузке продуктов');
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: CreateProductForm, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newProduct = {
        id: Date.now(),
        ...productData,
        rating: { rate: 0, count: 0 },
      };

      return newProduct;
		} catch (error) {
			console.error(error);
      return rejectWithValue('Ошибка при создании продукта');
    }
  }
);
