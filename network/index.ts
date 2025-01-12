import { getToken, handleTokenExpires } from "@/utils/helpers";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export const baseUrls = {
  stage: "https://micromind-api-1.onrender.com",
  dev: "https://micromind-api-dev.onrender.com",
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrls.dev,
  headers: {
    "Content-Type": "application/json",
  },
});

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
