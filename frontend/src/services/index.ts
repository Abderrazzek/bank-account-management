import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Define types for Axios requests and responses
type ApiResponse<T> = Promise<AxiosResponse<T>>;

const api: string = "http://localhost:3001/";

// Axios instance used to pass the bearer token into the BE
const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Axios instance used in non-auth mode, for full-screen mode
const publicAxiosInstance = axios.create({
  baseURL: api,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/**
 * Used to call GET HTTP requests
 */
export const getAPI = <T>(url: string, config?: AxiosRequestConfig): ApiResponse<T> => {
  return publicAxiosInstance.get<T>(url, config);
};

/**
 * Used to call POST HTTP requests
 */
export const postAPI = <T>(url: string, data: any, config?: AxiosRequestConfig): ApiResponse<T> => {
  return axiosInstance.post<T>(url, data, config);
};

/**
 * Used to call PUT HTTP requests
 */
export const putAPI = <T>(url: string, data: any, config?: AxiosRequestConfig): ApiResponse<T> => {
  return axiosInstance.put<T>(url, data, config);
};

/**
 * Used to call DELETE HTTP requests
 */
export const deleteAPI = <T>(url: string, config?: AxiosRequestConfig): ApiResponse<T> => {
  return axiosInstance.delete<T>(url, config);
};

/**
 * List of available paths
 */
export const paths = {
  ACCOUNTS: "accounts",
};
