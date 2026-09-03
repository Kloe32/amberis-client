import axios from 'axios';
import { API_ROUTES } from './config';

const axiosInstance = axios.create({
  baseURL: API_ROUTES.LOCAL_URL,
  timeout: 30000, // 30 seconds
});

// Request Interceptor: Automatic Authentication
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-access-token'] = token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global Error Handling, Logout & Redirection
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401 || status === 403) {
        const url = error.config?.url || '';
        // Skip redirection if the error is from the authentication endpoints
        if (url.includes('/user/login') || url.includes('/user/create')) {
          return Promise.reject(error);
        }

        // Automatically clear local session data
        localStorage.removeItem('token');

        // Forcefully redirect to /login
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
