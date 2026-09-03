import axiosInstance from '../configs/axiosInstance';
import { API_ROUTES } from '../configs/config';
import type { Product } from '../data/products';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Fetch all products
 */
export const getProducts = async (): Promise<Product[]> => {
  const response = await axiosInstance.get<ApiResponse<Product[]>>(API_ROUTES.product);
  return response.data.data;
};

/**
 * Fetch a single product by its slug
 */
export const getProductBySlug = async (slug: string): Promise<Product> => {
  const response = await axiosInstance.get<ApiResponse<Product>>(`${API_ROUTES.product}/${slug}`);
  return response.data.data;
};

