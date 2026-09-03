export const URL = "http://localhost:8080/api/v1";

export const API_ROUTES = {
  LOCAL_URL: URL,
  product: "/product/get-all",
  category: "/category/get-all",
  register: "/user/create",
  login: "/user/login",
} as const;

