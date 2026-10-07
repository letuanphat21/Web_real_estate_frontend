const pad = (n: number): string => String(n).padStart(2, "0");

//format time
export const formatTime = (iso: string): string => {
  const d = new Date(iso);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

//format date
export const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
};

// Hiển thị thời gian sự kiện:
//  - Cùng ngày:  "09:30 – 11:30 · 18/10/2026"
//  - Khác ngày:  "09:00 – 17:00 · 11/10 – 12/10/2026"
export const formatEventTime = (startIso: string, endIso: string): string => {
  const s = new Date(startIso);
  const e = new Date(endIso);
  const time = `${formatTime(startIso)} – ${formatTime(endIso)}`;

  if (s.toDateString() === e.toDateString()) {
    return `${time} · ${formatDate(startIso)}`;
  }
  return `${time} · ${pad(s.getDate())}/${pad(s.getMonth() + 1)} – ${formatDate(
    endIso
  )}`;
};
