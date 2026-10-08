import { isAxiosError } from "axios";
import type { AxiosRequestConfig } from "axios";
import axiosInstance from "./axiosInstance";
import type { PageResponse } from "../types/event.types";

// ApiResponse của BE: { success, code, message, data }
interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data?: T;
}

// GET rồi bóc lớp ApiResponse, chỉ trả về phần data
export async function get<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await axiosInstance.get<ApiResponse<T>>(url, config);
  return res.data.data as T;
}

export interface SpringPage<T> {
  content?: T[];
  totalElements?: number;
  totalPages?: number;
  number?: number;
  size?: number;
  page?: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export const toPage = <T>(p: SpringPage<T>): PageResponse<T> => ({
  content: p.content ?? [],
  totalElements: p.page?.totalElements ?? p.totalElements ?? 0,
  totalPages: Math.max(1, p.page?.totalPages ?? p.totalPages ?? 1),
  number: p.page?.number ?? p.number ?? 0,
  size: p.page?.size ?? p.size ?? 0,
});

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
