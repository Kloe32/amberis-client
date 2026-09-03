import axiosInstance from "../configs/axiosInstance";
import type {
  CreateOrderPayload,
  OrderResponse,
  PaymentIntentResponse,
  PriceReviewResponse,
  PreviewOrderPayload,
} from "../types/order";

export const previewOrderPrice = async (payload: PreviewOrderPayload) => {
  const res = await axiosInstance.post<{ success: boolean; message?: string; data: PriceReviewResponse }>(
    "/order/preview",
    payload
  );
  return res.data;
};

export const createOrder = async (payload: CreateOrderPayload) => {
  const res = await axiosInstance.post<{ success: boolean; message?: string; data: OrderResponse }>(
    "/order/create",
    payload
  );
  return res.data;
};

export const createPaymentIntent = async (orderId: string) => {
  const res = await axiosInstance.post<PaymentIntentResponse>(
    `/order/create-payment-intent/${orderId}`
  );
  return res.data;
};

export const getOrderById = async (orderId: string) => {
  const res = await axiosInstance.get<{ success: boolean; message?: string; data: OrderResponse }>(
    `/order/${orderId}`
  );
  return res.data;
};

export const getMyOrders = async (page = 1, limit = 10) => {
  const res = await axiosInstance.get<{
    success: boolean;
    message?: string;
    data:
      | OrderResponse[]
      | { orders: OrderResponse[]; totalOrders?: number; totalPages?: number; currentPage?: number };
  }>(`/order/my-orders?page=${page}&limit=${limit}`);
  return res.data;
};

export default axiosInstance;
