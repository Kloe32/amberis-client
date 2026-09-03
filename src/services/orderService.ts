import axios from "axios";
import type { CreateOrderPayload, OrderResponse, PaymentIntentResponse, PriceReviewResponse, PreviewOrderPayload } from "../types/order";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["x-access-token"] = token;
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const previewOrderPrice = async (payload: PreviewOrderPayload) => {
  const res = await API.post<{ success: boolean; message?: string; data: PriceReviewResponse }>(
    "/order/preview",
    payload
  );
  return res.data;
};

export const createOrder = async (payload: CreateOrderPayload) => {
  const res = await API.post<{ success: boolean; message?: string; data: OrderResponse }>("/order/create", payload);
  return res.data;
};

export const createPaymentIntent = async (orderId: string) => {
  const res = await API.post<PaymentIntentResponse>(`/order/create-payment-intent/${orderId}`);
  return res.data;
};

export const getOrderById = async (orderId: string) => {
  const res = await API.get<{ success: boolean; message?: string; data: OrderResponse }>(`/order/${orderId}`);
  return res.data;
};

export const getMyOrders = async (page = 1, limit = 10) => {
  const res = await API.get<{
    success: boolean;
    message?: string;
    data: OrderResponse[] | { orders: OrderResponse[]; totalOrders?: number; totalPages?: number; currentPage?: number };
  }>(`/order/my-orders?page=${page}&limit=${limit}`);
  return res.data;
};

export default API;
