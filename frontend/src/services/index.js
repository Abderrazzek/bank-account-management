import axios from "axios";

const api = "http://localhost:3001/";

//Axios instance used to pass the baerer token into the BE
const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

//Axios instance used in non auth mode, for full screen mode
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
export const getAPI = (url, config = {}) => {
  return publicAxiosInstance.get(url, config);
};

/**
 * Used to call POST HTTP requests
 */
export const postAPI = (url, data, config = {}) => {
  return axiosInstance.post(url, data, config);
};

/**
 * Used to call PUT HTTP requests
 */
export const putAPI = (url, data, config = {}) => {
  return axiosInstance.put(url, data, config);
};

/**
 * Used to call DELETE HTTP requests
 */
export const deleteAPI = (url, config = {}) => {
  return axiosInstance.delete(url, config);
};

/**
 * List of available paths
 */
export const paths = {
  ACCOUNTS: "accounts",
};
