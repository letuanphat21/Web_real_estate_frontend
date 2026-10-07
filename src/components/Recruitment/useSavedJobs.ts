import { useCallback, useState } from "react";

const KEY = "saved-jobs";

const read = (): number[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
};

/** Danh sách id tin đã lưu, lưu ở localStorage (thay bằng API khi có backend) */
export default function useSavedJobs() {
  const [ids, setIds] = useState<number[]>(read);

  const toggle = useCallback((id: number) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        // storage bị chặn: bỏ qua, trạng thái vẫn giữ trong phiên
      }
      return next;
    });
  }, []);

  return { savedIds: ids, toggle };
}
