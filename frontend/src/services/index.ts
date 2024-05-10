import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Define types for Axios requests and responses
type ApiResponse<T> = Promise<AxiosResponse<T>>;

const api: string = "http://localhost:3001/";

/**
 * Used to call GET HTTP requests
 */
export const getAPI = <T>(
  url: string,
  config?: AxiosRequestConfig
): ApiResponse<T> => {
  return axios.get<T>(api + url, config);
};

/**
 * Used to call POST HTTP requests
 */
export const postAPI = <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
): ApiResponse<T> => {
  return axios.post<T>(api + url, data, config);
};

/**
 * Used to call PUT HTTP requests
 */
export const putAPI = <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
): ApiResponse<T> => {
  return axios.put<T>(api + url, data, config);
};

/**
 * Used to call DELETE HTTP requests
 */
export const deleteAPI = <T>(
  url: string,
  config?: AxiosRequestConfig
): ApiResponse<T> => {
  return axios.delete<T>(api + url, config);
};

/**
 * List of available paths
 */
export const paths = {
  ACCOUNTS: "accounts",
};
