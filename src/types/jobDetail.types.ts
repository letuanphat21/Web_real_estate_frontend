/** Dữ liệu hiển thị của trang chi tiết việc làm. UI tạm thời: các chuỗi đã được định dạng sẵn. */

export interface JobDetailSection {
  heading: string;
  items: string[];
}

export interface JobDetailOwner {
  name: string;
  /** chữ viết tắt hiển thị khi không có ảnh */
  initials: string;
  avatarUrl?: string;
}

export interface JobDetailData {
  id: number;
  title: string;
  jobTypeName: string;
  statusLabel: string;
  department: string;
  publishedText: string; // vd: "Đăng ngày 01/10/2026"
  updatedText: string; // vd: "Cập nhật hôm nay"
  salaryText: string;
  location: string;
  experience: string;
  quantity: string;
  deadlineDate: string;
  daysLeftText: string; // vd: "Còn 12 ngày"
  progressPercent: number; // 0 - 100
  owner: JobDetailOwner;
  sections: JobDetailSection[];
}

/** CV đã tạo trên NovaLand, hiển thị trong tab "CV trên NovaLand" của modal ứng tuyển */
export interface ApplyCvOption {
  id: number;
  title: string;
  createdText: string; // vd: "Ngày tạo 01/10/2026"
  pdfUrl: string;
}

/** Thông tin liên hệ điền sẵn trong modal ứng tuyển */
export interface ApplicantInfo {
  fullName: string;
  email: string;
  phone: string;
}
