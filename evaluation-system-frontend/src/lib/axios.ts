import axios from "axios";
import { toaster } from "../components/ui/toaster";
export const API_URL = import.meta.env.VITE_API_URL;

export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
  timestamp: number;
}

export const axiosInstant = axios.create({
  baseURL: `${API_URL}/api/v1`,
  withCredentials: true,
});

axiosInstant.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

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
