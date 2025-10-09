// api/client.js
import axios from 'axios';

const API_BASE_URL =
  import.meta.env.MODE === 'development'
    ? ''
    : import.meta.env.VITE_API_URL || '';

const apiClient = axios.create({
  baseURL: API_BASE_URL, // 코드에선 항상 '/api/...'로 호출
  withCredentials: false,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
