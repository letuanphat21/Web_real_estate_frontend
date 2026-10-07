import { create } from "zustand";
import cvService from "../services/cvService";
import {
  DEFAULT_CV_STYLE,
  EMPTY_CV_DATA,
  type CvData,
  type CvSectionKey,
  type CvStyle,
} from "../types/cv.types";

interface CvState {
  data: CvData;
  style: CvStyle;
  dirty: boolean;
  savedAt: string | null;
  setSection: <K extends keyof CvData>(key: K, value: CvData[K]) => void;
  setStyle: (patch: Partial<CvStyle>) => void;
  /** Điền sẵn từ tài khoản, chỉ ghi vào những trường còn trống */
  prefillPersonal: (patch: Partial<CvData["personal"]>) => void;
  /** Thêm/xóa section tùy chỉnh đồng thời cập nhật thứ tự hiển thị */
  addCustomSection: (id: string) => void;
  removeCustomSection: (id: string) => void;
  save: () => boolean;
}

const draft = cvService.getDraft();

export const useCvStore = create<CvState>((set, get) => ({
  data: draft?.data ?? EMPTY_CV_DATA,
  style: draft?.style ?? DEFAULT_CV_STYLE,
  dirty: false,
  savedAt: draft?.savedAt ?? null,

  setSection: (key, value) => set((s) => ({ data: { ...s.data, [key]: value }, dirty: true })),

  setStyle: (patch) => set((s) => ({ style: { ...s.style, ...patch }, dirty: true })),

  prefillPersonal: (patch) =>
    set((s) => {
      const merged = { ...s.data.personal };
      (Object.keys(patch) as (keyof CvData["personal"])[]).forEach((k) => {
        if (!merged[k] && patch[k]) merged[k] = patch[k] as string;
      });
      return { data: { ...s.data, personal: merged } };
    }),

  addCustomSection: (id) =>
    set((s) => ({
      data: { ...s.data, customSections: [...s.data.customSections, { id, title: "Mục tùy chỉnh", content: "" }] },
      style: { ...s.style, sectionOrder: [...s.style.sectionOrder, `custom:${id}` as CvSectionKey] },
      dirty: true,
    })),

  removeCustomSection: (id) =>
    set((s) => ({
      data: { ...s.data, customSections: s.data.customSections.filter((c) => c.id !== id) },
      style: { ...s.style, sectionOrder: s.style.sectionOrder.filter((k) => k !== `custom:${id}`) },
      dirty: true,
    })),

  save: () => {
    const { data, style } = get();
    const res = cvService.saveDraft(data, style);
    if (res.ok) set({ dirty: false, savedAt: res.savedAt });
    return res.ok;
  },
}));
