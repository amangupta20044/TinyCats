import axios, { AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';

/**
 * Reusable production-ready Axios instance for Tiny Cats API.
 * Uses environment variable VITE_API_URL with Render backend URL fallback.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://backend-1b2o.onrender.com/api',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Alias export for backwards compatibility
export const apiClient = api;

// Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    let errorMessage = 'An unexpected error occurred. Please try again.';

    if (error.response) {
      // Server responded with status code outside 2xx range
      const data = error.response.data as { message?: string };
      errorMessage = data?.message || `Server returned error (${error.response.status})`;
    } else if (error.request) {
      // Request made but no response received (Backend spinning up or unreachable)
      errorMessage = 'Unable to reach Tiny Cats backend server. Operating in fallback mode.';
    } else {
      errorMessage = error.message || errorMessage;
    }

    console.warn('[Axios API Error]:', errorMessage, error);
    return Promise.reject(new Error(errorMessage));
  }
);
