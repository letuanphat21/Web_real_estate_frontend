import type { Cv } from "../types/job.types";

/** CV tạo trên NovaLand của từng người dùng (CVs.user_id = Users.id) */
export const MOCK_CVS: (Cv & { userId: number })[] = [
  { id: 1, userId: 1, title: "CV Chuyên viên kinh doanh BĐS", createdAt: "2026-08-12T09:00:00", pdfUrl: "#cv-1" },
  { id: 2, userId: 1, title: "CV Tư vấn dự án hạng sang", createdAt: "2026-09-20T14:30:00", pdfUrl: "#cv-2" },
  { id: 3, userId: 2, title: "CV của người dùng khác", createdAt: "2026-09-01T10:00:00", pdfUrl: "#cv-3" },
];
