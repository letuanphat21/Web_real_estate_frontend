import { DEFAULT_CV_STYLE, EMPTY_CV_DATA, type CvData, type CvStyle } from "../../types/cv.types";

/**
 * Lưu nháp CV ở localStorage.
 * TODO: khi có BE thay bằng API lấy/lưu CV, giữ nguyên chữ ký hàm.
 */
const KEY = "cv-draft";

export interface CvDraft {
  data: CvData;
  style: CvStyle;
  savedAt: string;
}

export function loadDraft(): CvDraft | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CvDraft>;
    return {
      // trộn với mặc định để bản nháp cũ thiếu trường vẫn chạy được
      data: {
        ...EMPTY_CV_DATA,
        ...parsed.data,
        personal: { ...EMPTY_CV_DATA.personal, ...parsed.data?.personal },
      },
      style: { ...DEFAULT_CV_STYLE, ...parsed.style },
      savedAt: parsed.savedAt ?? new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

/** ok = false khi localStorage bị chặn hoặc đầy */
export function saveDraft(data: CvData, style: CvStyle): { ok: boolean; savedAt: string } {
  const savedAt = new Date().toISOString();
  try {
    localStorage.setItem(KEY, JSON.stringify({ data, style, savedAt }));
    return { ok: true, savedAt };
  } catch {
    return { ok: false, savedAt };
  }
}
