import axios from 'axios';
import { Product } from '../types/product';

const API_BASE_URL = 'https://fakestoreapi.com';

export const productApi = {
  async getProducts(): Promise<Product[]> {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  },

  async getProductById(id: number): Promise<Product> {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  },
};
