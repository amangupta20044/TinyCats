import axios, { AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { API_BASE_URL } from '../constants';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // We can add auth headers or request tracking here if needed in the future
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
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
      // Request made but no response received (Backend offline or timeout)
      errorMessage = 'Unable to reach Tiny Cats backend server. Operating in fallback mode.';
    } else {
      errorMessage = error.message || errorMessage;
    }

    console.warn('[Axios API Error]:', errorMessage, error);
    return Promise.reject(new Error(errorMessage));
  }
);
