import type {
  ApplicantInfo,
  ApplyCvOption,
  JobDetailOwner,
  JobDetailSection,
} from "../types/jobDetail.types";

// TODO: thay bằng dữ liệu từ API (mô tả, phòng ban, số lượng tuyển, người phụ trách của từng tin)

export const MOCK_DETAIL_DEPARTMENT = "Khối Kinh doanh";
export const MOCK_DETAIL_QUANTITY = "5 người";

export const MOCK_DETAIL_OWNERS: JobDetailOwner[] = [
  { name: "Trần Hoài Linh", initials: "HL" },
  { name: "Phạm Quốc Bảo", initials: "QB", avatarUrl: "https://i.pravatar.cc/100?img=12" },
  { name: "Lê Thu Hà", initials: "TH", avatarUrl: "https://i.pravatar.cc/100?img=32" },
];

/** Nội dung mô tả mẫu dùng chung cho mọi tin; `location`, `salaryText` được chèn theo từng tin */
export const buildMockDetailSections = (location: string, salaryText: string): JobDetailSection[] => [
  {
    heading: "Mô tả công việc",
    items: [
      `Tìm kiếm, tiếp cận và tư vấn khách hàng có nhu cầu mua bất động sản tại ${location}.`,
      "Giới thiệu thông tin sản phẩm, giải đáp thắc mắc và đồng hành cùng khách hàng trong quá trình lựa chọn.",
      "Phối hợp với Khối Kinh doanh tổ chức gặp gỡ khách hàng, tham quan và trình bày phương án phù hợp.",
      "Theo dõi tiến độ giao dịch, cập nhật thông tin và báo cáo kết quả công việc định kỳ.",
    ],
  },
  {
    heading: "Yêu cầu ứng viên",
    items: [
      "Có kinh nghiệm trong lĩnh vực kinh doanh hoặc tư vấn bất động sản theo yêu cầu của vị trí.",
      "Kỹ năng giao tiếp, lắng nghe, đàm phán và chăm sóc khách hàng tốt.",
      "Chủ động trong công việc, có tinh thần trách nhiệm và khả năng phối hợp với đội nhóm.",
      `Sẵn sàng làm việc tại ${location}; tác phong chuyên nghiệp, định hướng phát triển lâu dài.`,
    ],
  },
  {
    heading: "Quyền lợi",
    items: [
      `Mức thu nhập dự kiến ${salaryText}, trao đổi cụ thể trong quá trình phỏng vấn.`,
      "Được đào tạo kiến thức sản phẩm, kỹ năng tư vấn và quy trình làm việc.",
      "Môi trường làm việc chuyên nghiệp, hỗ trợ từ đội ngũ kinh doanh và người phụ trách.",
      "Cơ hội phát triển năng lực, mở rộng mạng lưới khách hàng và thăng tiến theo kết quả công việc.",
    ],
  },
];

// ---- Modal "Ứng tuyển nhanh" (TODO: thay bằng CV và thông tin tài khoản từ API)

export const MOCK_APPLICANT: ApplicantInfo = {
  fullName: "Nguyễn Minh Anh",
  email: "minhanh.nguyen@gmail.com",
  phone: "090 346 8899",
};

export const MOCK_APPLY_CVS: ApplyCvOption[] = [
  { id: 1, title: "CV Kinh doanh bất động sản", createdText: "Ngày tạo 01/10/2026", pdfUrl: "#cv-1" },
  { id: 2, title: "CV Tư vấn khách hàng", createdText: "Ngày tạo 25/09/2026", pdfUrl: "#cv-2" },
];

export const APPLY_SOURCES = ["NovaLand Hub", "Facebook", "Zalo", "Google", "Bạn bè giới thiệu", "Khác"];
