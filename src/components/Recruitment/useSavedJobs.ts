import { useCallback, useSyncExternalStore } from "react";

/**
 * Danh sách id tin tuyển dụng đã lưu, lưu ở localStorage.
 * Dùng chung một nguồn cho mọi nơi (trang Tuyển dụng, trang Tin đã lưu, số đếm ở menu Header)
 * nên lưu ở đâu thì chỗ khác cập nhật ngay.
 * TODO: thay bằng API lưu tin khi có backend.
 */
const KEY = "saved-jobs";
const CHANGED = "saved-jobs-changed";

let lastRaw: string | null = null;
let cache: number[] = [];

function getSnapshot(): number[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    // storage bị chặn: dùng bản trong bộ nhớ
    return cache;
  }
  if (raw !== lastRaw) {
    lastRaw = raw;
    try {
      const parsed = raw ? JSON.parse(raw) : [];
      cache = Array.isArray(parsed) ? parsed : [];
    } catch {
      cache = [];
    }
  }
  return cache;
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGED, onChange);
  window.addEventListener("storage", onChange); // đồng bộ giữa các tab
  return () => {
    window.removeEventListener(CHANGED, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export default function useSavedJobs() {
  const savedIds = useSyncExternalStore(subscribe, getSnapshot, () => []);

  const toggle = useCallback((id: number) => {
    const current = getSnapshot();
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      cache = next;
    }
    window.dispatchEvent(new Event(CHANGED));
  }, []);

  return { savedIds, toggle };
}
