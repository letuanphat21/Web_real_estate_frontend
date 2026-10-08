import axios from "axios";
import type { AxiosInstance } from "axios";
import { tokenStorage } from "./tokenStorage";

const BASE_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  timeout: 10000,
  withCredentials: true, // vẫn gửi cookie nếu BE có dùng
};

// Public: không token, không chuyển trang khi 401
export const publicApi: AxiosInstance = axios.create(BASE_CONFIG);

// Auth: tự gắn Bearer token, 401 → về trang login
export const authApi: AxiosInstance = axios.create(BASE_CONFIG);

authApi.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      tokenStorage.clear();
      // Lưu trang hiện tại để đăng nhập xong quay lại đúng chỗ
      const redirect = encodeURIComponent(
        window.location.pathname + window.location.search
      );
      window.location.href = `/login?redirect=${redirect}`;
    }
    return Promise.reject(error);
  }
);

export default authApi;
