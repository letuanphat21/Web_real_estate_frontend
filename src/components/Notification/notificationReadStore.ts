import { useSyncExternalStore } from "react";

/**
 * Danh sách id thông báo đã xem, lưu ở localStorage và dùng chung cho ngăn kéo, trang Thông báo
 * và số đếm ở menu Header: đọc ở đâu thì chỗ khác cập nhật ngay, và vẫn nhớ sau khi tải lại trang.
 * TODO: thay bằng API đánh dấu đã đọc khi có backend.
 */
const KEY = "notification-read-ids";
const CHANGED = "notification-read-changed";

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

function write(next: number[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    cache = next;
  }
  window.dispatchEvent(new Event(CHANGED));
}

export const useReadNotificationIds = (): number[] => useSyncExternalStore(subscribe, getSnapshot, () => []);

export function markNotificationsRead(ids: number[]) {
  const current = getSnapshot();
  const next = [...new Set([...current, ...ids])];
  if (next.length !== current.length) write(next);
}
