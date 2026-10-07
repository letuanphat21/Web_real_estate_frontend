/** Schema CV duy nhất: dùng chung cho form, preview, template và PDF */

export type CvStepId =
  | "personal"
  | "objective"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certificates"
  | "languages"
  | "references";

export const CV_STEPS: { id: CvStepId; label: string; title: string; description: string }[] = [
  { id: "personal", label: "Thông tin cá nhân", title: "Thông tin cá nhân", description: "Thông tin này sẽ xuất hiện ở đầu CV và giúp nhà tuyển dụng liên hệ với bạn." },
  { id: "objective", label: "Mục tiêu nghề nghiệp", title: "Mục tiêu nghề nghiệp", description: "Nêu ngắn gọn định hướng và giá trị bạn mang lại cho nhà tuyển dụng." },
  { id: "experience", label: "Kinh nghiệm", title: "Kinh nghiệm làm việc", description: "Liệt kê vị trí đã làm, kèm thành tích và số liệu cụ thể." },
  { id: "education", label: "Học vấn", title: "Học vấn", description: "Trường, chuyên ngành và thời gian học." },
  { id: "skills", label: "Kỹ năng môi giới", title: "Kỹ năng môi giới", description: "Kỹ năng chuyên môn kèm mức độ thành thạo." },
  { id: "projects", label: "Dự án đã tham gia", title: "Dự án đã tham gia", description: "Các dự án bất động sản bạn từng phân phối hoặc tư vấn." },
  { id: "certificates", label: "Chứng chỉ", title: "Chứng chỉ", description: "Chứng chỉ hành nghề, khóa đào tạo liên quan." },
  { id: "languages", label: "Ngôn ngữ", title: "Ngôn ngữ", description: "Ngoại ngữ và trình độ sử dụng." },
  { id: "references", label: "Người tham chiếu", title: "Người tham chiếu", description: "Người có thể xác nhận năng lực làm việc của bạn." },
];

/** Mốc thời gian dạng YYYY-MM (input type="month") */
interface Period {
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface PersonalInfo {
  avatarUrl: string;
  fullName: string;
  title: string;
  phone: string;
  email: string;
  birthDate: string;
  address: string;
  linkedin: string;
  zalo: string;
  summary: string;
}

export interface ExperienceItem extends Period {
  id: string;
  company: string;
  position: string;
  /** mỗi dòng là một gạch đầu dòng thành tích */
  bullets: string;
  revenueBillion: number; // doanh số, tỷ đồng
  projectCount: number;
  closeRate: number; // %
}

export interface EducationItem extends Period {
  id: string;
  school: string;
  major: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: number; // 0 - 100
}

export interface ProjectItem extends Period {
  id: string;
  name: string;
  role: string;
  description: string;
}

export interface CertificateItem {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  level: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  position: string;
  company: string;
  phone: string;
  email: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface CvData {
  personal: PersonalInfo;
  objective: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
  languages: LanguageItem[];
  references: ReferenceItem[];
  customSections: CustomSection[];
}

/** Section hiển thị trên CV (thứ tự do người dùng sắp xếp). `achievements` được tính từ kinh nghiệm. */
export type CvSectionKey =
  | "objective"
  | "achievements"
  | "experience"
  | "projects"
  | "education"
  | "skills"
  | "certificates"
  | "languages"
  | "references"
  | `custom:${string}`;

export const DEFAULT_SECTION_ORDER: CvSectionKey[] = [
  "objective",
  "achievements",
  "experience",
  "projects",
  "education",
  "skills",
  "certificates",
  "languages",
  "references",
];

export const SECTION_TITLE: Record<string, string> = {
  objective: "Mục tiêu nghề nghiệp",
  achievements: "Thành tích nổi bật",
  experience: "Kinh nghiệm làm việc",
  projects: "Dự án tiêu biểu",
  education: "Học vấn",
  skills: "Kỹ năng",
  certificates: "Chứng chỉ",
  languages: "Ngôn ngữ",
  references: "Người tham chiếu",
};

export type CvTemplateId = "modern" | "professional" | "minimal";

export const CV_TEMPLATES: { id: CvTemplateId; label: string }[] = [
  { id: "modern", label: "Modern" },
  { id: "professional", label: "Professional" },
  { id: "minimal", label: "Minimal" },
];

/** Màu lấy từ theme (CSS variables) để đồng bộ với website */
export const CV_COLORS = [
  { id: "primary", label: "Tím NovaLand", value: "var(--color-primary-700)" },
  { id: "dark", label: "Tím đậm", value: "var(--color-footer)" },
  { id: "blue", label: "Xanh dương", value: "var(--color-accent)" },
  { id: "green", label: "Xanh lá", value: "var(--color-success)" },
  { id: "ink", label: "Đen", value: "var(--color-heading)" },
] as const;

export const CV_FONTS = [
  { id: "Inter", label: "Inter" },
  { id: "Be Vietnam Pro", label: "Be Vietnam Pro" },
  { id: "Roboto", label: "Roboto" },
  { id: "Merriweather", label: "Merriweather" },
] as const;

export const CV_FONT_SIZES = [11, 12, 13, 14, 15] as const;

export interface CvStyle {
  template: CvTemplateId;
  color: string; // value của CV_COLORS
  font: string;
  fontSize: number;
  sectionOrder: CvSectionKey[];
}

export const DEFAULT_CV_STYLE: CvStyle = {
  template: "modern",
  color: CV_COLORS[0].value,
  font: "Inter",
  fontSize: 13,
  sectionOrder: DEFAULT_SECTION_ORDER,
};

export const EMPTY_CV_DATA: CvData = {
  personal: {
    avatarUrl: "",
    fullName: "",
    title: "",
    phone: "",
    email: "",
    birthDate: "",
    address: "",
    linkedin: "",
    zalo: "",
    summary: "",
  },
  objective: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certificates: [],
  languages: [],
  references: [],
  customSections: [],
};

export const uid = (): string => Math.random().toString(36).slice(2, 10);
