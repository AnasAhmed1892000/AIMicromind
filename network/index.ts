import { getToken, handleTokenExpires } from "@/utils/helpers";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export const baseUrls = {
  PROD: "https://micromind-api-1.onrender.com",
  DEV: "https://micromind-api-dev.onrender.com",
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrls.DEV,
  headers: {
    "Content-Type": "application/json",
  },
});
export const baseUrl = baseUrls.DEV;
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getToken("token");
    if (token) {
      config.headers.set("Authorization", `${token}`);
    } else {
      config.headers.delete("Authorization");
    }
    return config;
  },
  (error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    handleTokenExpires(error);
    return Promise.reject(error);
  }
);
export default axiosInstance;
