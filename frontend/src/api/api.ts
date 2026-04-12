import axios, { type AxiosError } from 'axios';
import { clearSession } from '../utils/session';

const baseURL =
  import.meta.env.VITE_API_URL?.trim() || 'http://localhost:3000';

export const api = axios.create({
  baseURL,
});

const publicRoutes = ['/', '/login', '/register'];

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const path = window.location.pathname;
      if (!publicRoutes.includes(path)) {
        clearSession();
        window.location.assign('/login');
      }
    }
    return Promise.reject(error);
  },
);
