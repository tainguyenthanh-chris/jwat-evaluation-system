import axios from "axios";
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { BASE_API } from "../config";

// run git bash to generate type auto by swagger
// openapi-generator-cli generate \
//   -i http://localhost:8080/v3/api-docs \
//   -g typescript-axios \
//   -o src/api


declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // if (config.headers) {
    //   config.headers["Accept-Language"] = i18n.language || "vi";
    // }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

interface FailedQueueItem {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token?: string) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<any>) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await axiosInstance.post<{
          data: { token: string };
        }>("/auth/refresh", {
          token: localStorage.getItem("token"),
        });

        const newToken = refreshResponse.data.data.token;

        localStorage.setItem("token", newToken);
        axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`;

        processQueue(null, newToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, undefined);
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          break;
        case 403:
          break;
        case 500:
          break;
        default:
          break;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
