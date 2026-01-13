import axios from "axios";
import { toaster } from "../components/ui/toaster";
import { useAuthStore } from "../store/authStore";
export const API_URL = import.meta.env.VITE_API_URL;

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};


export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
  timestamp: number;
}

export const axiosInstant = axios.create({
  baseURL: `${API_URL}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosInstant.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    console.log("ACCESS TOKEN:", token);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;

    }

    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstant.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;
    const originalRequest = error.config as any;

    if (
      status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refreshtoken")
    ) {
      const { refreshToken, setAccessToken, logout } =
        useAuthStore.getState();

      if (!refreshToken) {
        logout();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstant(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axiosInstant.post(
          "/auth/refreshtoken",
          { refreshToken }
        );

        const newAccessToken = res.data?.data?.token;

        setAccessToken(newAccessToken);

        processQueue(null, newAccessToken);

        return axiosInstant(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (status === 404) {
      toaster.create({
        description: message || "Resource not found",
        type: "error",
      });
    } else if (status === 409) {
      toaster.create({
        description: message || "Resource already exists",
        type: "error",
      });
    } else if (status === 500) {
      toaster.create({
        description: message || "Server error",
        type: "error",
      });
    }

    return Promise.reject(error);
  }
);

