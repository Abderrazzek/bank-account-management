// src/axiosConfig.js
import axios, { AxiosInstance } from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
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

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response && error.response.status === 401) {
       // Handle unauthorized error, e.g., redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance as AxiosInstance;
