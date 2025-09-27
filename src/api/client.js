import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

console.log(API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

apiClient.interceptors.request.use(
  (config) => {
    // localStorage에서 저장된 토큰을 가져옴
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default apiClient;
