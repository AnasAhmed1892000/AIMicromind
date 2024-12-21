import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export const baseUrls = {
  stage: "https://micromind-api-1.onrender.com",
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrls.stage,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
