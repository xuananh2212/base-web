import { deepTrimObject } from "@/helpers/object";
import "axios";
import axios from "axios";
import Cookies from "js-cookie";
import NProgress from "nprogress";
import qs from "qs";
import { toast } from "sonner";
import { API } from "./env.config";
NProgress.configure({ showSpinner: false });
export const axiosInstance = axios.create({
  baseURL: API,
  paramsSerializer: (params) => {
    return qs.stringify(params, {
      encodeDotInKeys: true,
      arrayFormat: "indices",
      allowDots: true,
    });
  },
});

declare module "axios" {
  export interface AxiosRequestConfig {
    hiddenProgress?: boolean;
    hiddenToastError?: boolean;
    allowSpacing?: boolean;
  }
}

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  if (!config.hiddenProgress) {
    NProgress.start();
  }
  const token = Cookies.get("access_token");
  if (token && !config.headers?.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (!config.allowSpacing && config.data) {
    config.data = deepTrimObject(config.data);
  }
  if (!config.allowSpacing && config.params) {
    config.params = deepTrimObject(config.params);
  }
  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if (!response.config.hiddenProgress) {
      NProgress.done();
    }
    const data = response?.data;
    if (!response.config.hiddenToastError) {
      if (data?.message && typeof data?.message === "string") {
        // toast.success(data.message);
      }
    }
    return response;
  },
  async (error) => {
    if (!error.config.hiddenProgress) {
      NProgress.done();
    }
    const data = error.response?.data;
    if (!error.config.hiddenToastError) {
      const errorMessage = data?.message;
      if (errorMessage && typeof errorMessage === "string") {
        toast.error(errorMessage);
      }
    }
    const status = error.response?.status;
    const originalRequest = error.config;

    // Handle 401 Unauthorized and refresh token
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // try {
      //   // Refresh token
      //   const refreshedToken = await getRefreshToken();

      //   // Update authorization header with new token
      //   axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${refreshedToken.accessToken}`;

      //   // Retry original request
      //   return axiosInstance(originalRequest);
      // } catch (refreshError) {
      //   await Promise.all([cookie.del("access_token"), cookie.del("refresh_token")]);
      //   toast.info("Phiên làm việc đã kết thúc. Vui lòng đăng nhập lại!");
      //   setTimeout(() => {
      //     window.location.href = "/login";
      //   }, 3000);
      //   return refreshError;
      // }
    }
    throw error?.response;
  }
);
