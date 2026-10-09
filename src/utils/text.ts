//Cắt ngắn đoạn văn
export const excerpt = (text: string, max = 120): string => {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max)) + "...";
};

// Ước tính số phút đọc
export const readMinutes = (text: string): number =>
  Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));

// 11534336 -> "11.0MB"
export const formatFileSize = (bytes: number): string => `${(bytes / 1024 / 1024).toFixed(1)}MB`;

// Chèn chuỗi vào đúng vị trí con trỏ của input/textarea rồi đặt lại con trỏ sau chuỗi vừa chèn
export const insertAtCursor = (
  el: HTMLInputElement | HTMLTextAreaElement | null,
  value: string,
  insert: string,
  maxLength?: number,
): string => {
  const start = el?.selectionStart ?? value.length;
  const end = el?.selectionEnd ?? value.length;
  const next = value.slice(0, start) + insert + value.slice(end);
  if (maxLength && next.length > maxLength) return value;

  requestAnimationFrame(() => {
    if (!el) return;
    el.focus();
    const caret = start + insert.length;
    el.setSelectionRange(caret, caret);
  });
  return next;
};
