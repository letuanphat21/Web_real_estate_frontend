import { SECTION_TITLE, type CvData, type CvSectionKey } from "../../types/cv.types";

/** "2021-03" -> "03/2021" */
export const formatMonth = (ym: string): string => {
  const [y, m] = ym.split("-");
  return y && m ? `${m}/${y}` : "";
};

export const formatPeriod = (p: { startDate: string; endDate: string; current: boolean }): string => {
  const start = formatMonth(p.startDate);
  const end = p.current ? "Hiện tại" : formatMonth(p.endDate);
  return [start, end].filter(Boolean).join(" – ");
};

/** "1993-08-18" -> "18/08/1993" */
export const formatDay = (iso: string): string => {
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${d}/${m}/${y}` : "";
};

export interface Achievements {
  revenueBillion: number;
  projectCount: number;
  closeRate: number;
}

/** Tổng hợp chỉ số từ các kinh nghiệm (doanh số/dự án cộng dồn, tỷ lệ chốt lấy trung bình) */
export function computeAchievements(data: CvData): Achievements | null {
  const items = data.experience;
  const revenueBillion = items.reduce((s, e) => s + (e.revenueBillion || 0), 0);
  const projectCount = items.reduce((s, e) => s + (e.projectCount || 0), 0);
  const rates = items.map((e) => e.closeRate || 0).filter((r) => r > 0);
  const closeRate = rates.length ? Math.round(rates.reduce((s, r) => s + r, 0) / rates.length) : 0;
  if (!revenueBillion && !projectCount && !closeRate) return null;
  return { revenueBillion, projectCount, closeRate };
}

export const splitLines = (text: string): string[] =>
  text.split("\n").map((l) => l.trim()).filter(Boolean);

/** Section trống thì ẩn khỏi CV */
export function isSectionEmpty(key: CvSectionKey, data: CvData): boolean {
  if (key.startsWith("custom:")) {
    const c = data.customSections.find((s) => s.id === key.slice(7));
    return !c || !c.content.trim();
  }
  switch (key) {
    case "objective":
      return !(data.objective.trim() || data.personal.summary.trim());
    case "achievements":
      return computeAchievements(data) === null;
    case "experience":
    case "projects":
    case "education":
    case "skills":
    case "certificates":
    case "languages":
    case "references":
      return data[key].length === 0;
    default:
      return true;
  }
}

/** Tên file tải về: CV_NguyenMinhAnh */
export const toFileName = (fullName: string): string => {
  const ascii = fullName
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
  return `CV_${ascii || "NovaLand"}`;
};

export const sectionTitle = (key: CvSectionKey, data: CvData): string =>
  key.startsWith("custom:")
    ? data.customSections.find((c) => c.id === key.slice(7))?.title || "Mục tùy chỉnh"
    : SECTION_TITLE[key];
