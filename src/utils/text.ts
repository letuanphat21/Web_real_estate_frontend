//Cắt ngắn đoạn văn
export const excerpt = (text: string, max = 120): string => {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max)) + "...";
};

// Ước tính số phút đọc
export const readMinutes = (text: string): number =>
  Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));
