import axiosInstance from '../configs/axiosInstance';
import { API_ROUTES } from '../configs/config';
import type { ProductCategory } from '../data/products';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Fetch all categories
 */
export const getCategories = async (): Promise<ProductCategory[]> => {
  const response = await axiosInstance.get<ApiResponse<ProductCategory[]>>(API_ROUTES.category);
  return response.data.data;
};

/**
 * Fetch a single category by its slug
 */
export const getCategoryBySlug = async (slug: string): Promise<ProductCategory> => {
  const response = await axiosInstance.get<ApiResponse<ProductCategory>>(`${API_ROUTES.category}/${slug}`);
  return response.data.data;
};

