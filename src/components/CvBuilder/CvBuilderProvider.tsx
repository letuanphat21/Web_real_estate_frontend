import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CvBuilderContext, type CvBuilderState } from "./cvBuilderContext";
import { loadDraft, saveDraft } from "./cvDraft";
import { useAuth } from "../../store/authStore";
import {
  DEFAULT_CV_STYLE,
  EMPTY_CV_DATA,
  type CvData,
  type CvSectionKey,
  type CvStyle,
} from "../../types/cv.types";

const AUTOSAVE_MS = 1500;

/**
 * Giữ dữ liệu CV đang soạn, tự động lưu nháp (debounce), cảnh báo khi đóng tab lúc chưa lưu
 * và lưu nốt khi rời trang. Điền sẵn họ tên, email, ảnh từ tài khoản đang đăng nhập.
 */
export default function CvBuilderProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const [state, setState] = useState(() => {
    const draft = loadDraft();
    const data: CvData = draft?.data ?? EMPTY_CV_DATA;
    const personal = { ...data.personal };
    // chỉ ghi vào trường còn trống để không đè nội dung người dùng đã sửa
    if (user) {
      personal.fullName ||= user.fullName;
      personal.email ||= user.email;
      personal.avatarUrl ||= user.avatarUrl ?? "";
    }
    return {
      data: { ...data, personal },
      style: draft?.style ?? DEFAULT_CV_STYLE,
      dirty: false,
      savedAt: draft?.savedAt ?? null,
    };
  });

  const latest = useRef(state);
  useEffect(() => {
    latest.current = state;
  });

  const setSection = useCallback<CvBuilderState["setSection"]>((key, value) => {
    setState((s) => ({
      ...s,
      data: {
        ...s.data,
        [key]: typeof value === "function" ? (value as (p: unknown) => unknown)(s.data[key]) : value,
      },
      dirty: true,
    }));
  }, []);

  const setStyle = useCallback((patch: Partial<CvStyle>) => {
    setState((s) => ({ ...s, style: { ...s.style, ...patch }, dirty: true }));
  }, []);

  const addCustomSection = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      data: { ...s.data, customSections: [...s.data.customSections, { id, title: "Mục tùy chỉnh", content: "" }] },
      style: { ...s.style, sectionOrder: [...s.style.sectionOrder, `custom:${id}` as CvSectionKey] },
      dirty: true,
    }));
  }, []);

  const removeCustomSection = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      data: { ...s.data, customSections: s.data.customSections.filter((c) => c.id !== id) },
      style: { ...s.style, sectionOrder: s.style.sectionOrder.filter((k) => k !== `custom:${id}`) },
      dirty: true,
    }));
  }, []);

  const save = useCallback(() => {
    const { data, style } = latest.current;
    const res = saveDraft(data, style);
    if (res.ok) setState((s) => ({ ...s, dirty: false, savedAt: res.savedAt }));
    return res.ok;
  }, []);

  // Tự động lưu sau khi ngừng chỉnh sửa
  useEffect(() => {
    if (!state.dirty) return;
    const t = setTimeout(save, AUTOSAVE_MS);
    return () => clearTimeout(t);
  }, [state.data, state.style, state.dirty, save]);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (latest.current.dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => {
      window.removeEventListener("beforeunload", warn);
      if (latest.current.dirty) save();
    };
  }, [save]);

  const value = useMemo<CvBuilderState>(
    () => ({ ...state, setSection, setStyle, addCustomSection, removeCustomSection, save }),
    [state, setSection, setStyle, addCustomSection, removeCustomSection, save]
  );

  return <CvBuilderContext.Provider value={value}>{children}</CvBuilderContext.Provider>;
}
