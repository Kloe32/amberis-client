// const LOCAL_API_URL = "http://localhost:8080/api/v1";
const RENDER_API_URL = "https://amberis-server.onrender.com/api/v1";

/**
 * Single source of truth for the API base URL:
 * Defaults to Render hosted server.
 * (Uncomment LOCAL_API_URL above / in .env for local backend development).
 */
export const API_BASE_URL: string =
  import.meta.env.VITE_API_HOST_URL ||
  // import.meta.env.VITE_API_BASE_URL ||
  RENDER_API_URL;
  // LOCAL_API_URL;

export const URL = API_BASE_URL;

export const API_ROUTES = {
  BASE_URL: API_BASE_URL,
  // LOCAL_URL: LOCAL_API_URL,
  HOST_URL: RENDER_API_URL,
  product: "/product/get-all",
  category: "/category/get-all",
  register: "/user/create",
  login: "/user/login",
  order: {
    preview: "/order/preview",
    create: "/order/create",
    createPaymentIntent: (orderId: string) => `/order/create-payment-intent/${orderId}`,
    getById: (orderId: string) => `/order/${orderId}`,
    myOrders: (page = 1, limit = 10) => `/order/my-orders?page=${page}&limit=${limit}`,
  },
} as const;
