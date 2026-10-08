import { isAxiosError } from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { authApi, publicApi } from "./axiosInstance";

/**
 BE bọc kết quả trong ApiResponse { code, message, data } → chỉ lấy data.
 */
const unwrap = <T>(body: unknown): T => {
  if (
    body &&
    typeof body === "object" &&
    "data" in body &&
    ("code" in body || "status" in body)
  ) {
    return (body as { data: T }).data;
  }
  return body as T;
};

// Tạo bộ hàm get/post/put/patch/delete có kiểu rõ ràng từ 1 axios instance
const createHttp = (instance: AxiosInstance) => ({
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    unwrap<T>((await instance.get(url, config)).data),

  post: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => unwrap<T>((await instance.post(url, data, config)).data),

  put: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => unwrap<T>((await instance.put(url, data, config)).data),

  patch: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => unwrap<T>((await instance.patch(url, data, config)).data),

  delete: async <T = void>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> => unwrap<T>((await instance.delete(url, config)).data),
});

// API công khai
export const publicHttp = createHttp(publicApi);

// API cần đăng nhập
export const authHttp = createHttp(authApi);

// Tiện ích xử lý lỗi
export const getErrorStatus = (err: unknown): number =>
  isAxiosError(err) ? err.response?.status ?? 0 : 0;

export const getErrorMessage = (err: unknown): string => {
  if (isAxiosError<{ message?: string }>(err)) {
    if (!err.response) return "Không kết nối được máy chủ";
    return err.response.data?.message ?? "Đã có lỗi xảy ra, vui lòng thử lại";
  }
  return "Đã có lỗi xảy ra, vui lòng thử lại";
};

export const cleanParams = (obj: object): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== "" && v !== null && v !== undefined
    )
  );
