import { createContext, useContext } from "react";
import type { CvData, CvStyle } from "../../types/cv.types";

type Updater<T> = T | ((prev: T) => T);

/** Trạng thái dùng chung giữa form, preview, nav và checklist của trang Tạo CV */
export interface CvBuilderState {
  data: CvData;
  style: CvStyle;
  dirty: boolean;
  savedAt: string | null;
  setSection: <K extends keyof CvData>(key: K, value: Updater<CvData[K]>) => void;
  setStyle: (patch: Partial<CvStyle>) => void;
  /** Thêm/xóa mục tùy chỉnh đồng thời cập nhật thứ tự hiển thị */
  addCustomSection: (id: string) => void;
  removeCustomSection: (id: string) => void;
  /** Lưu bản nháp ngay; trả false nếu trình duyệt không cho lưu */
  save: () => boolean;
}

export const CvBuilderContext = createContext<CvBuilderState | null>(null);

/** Đọc một phần trạng thái: useCvBuilder((s) => s.data.experience) */
export function useCvBuilder<T>(selector: (state: CvBuilderState) => T): T {
  const ctx = useContext(CvBuilderContext);
  if (!ctx) throw new Error("useCvBuilder phải nằm trong <CvBuilderProvider>");
  return selector(ctx);
}
