import type {
  AccountSummary,
  ApplicationCompany,
  ApplicationHistoryItem,
  UpcomingInterview,
} from "../types/applicationHistory.types";

// TODO: thay bằng dữ liệu từ API (Applications + Application_Status_Logs của người dùng đăng nhập)

/** Mốc thời gian tính theo số ngày so với hôm nay để dữ liệu mẫu luôn "còn mới" */
const daysFromNow = (d: number, hour = 9, minute = 30): string => {
  const date = new Date();
  date.setDate(date.getDate() + d);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
};

export const MOCK_ACCOUNT: AccountSummary = {
  fullName: "Nguyễn Minh Anh",
  email: "minhanh.nguyen@gmail.com",
  avatarUrl: "https://i.pravatar.cc/200?img=47",
};

const VH: ApplicationCompany = { name: "Vinhomes", initials: "VH", tone: "blue" };
const MH: ApplicationCompany = { name: "Masterise Homes", initials: "MH", tone: "purple" };
const CB: ApplicationCompany = { name: "CBRE Việt Nam", initials: "CB", tone: "green" };
const SV: ApplicationCompany = { name: "Savills Việt Nam", initials: "SV", tone: "rose" };
const KL: ApplicationCompany = { name: "Keppel Land Việt Nam", initials: "KL", tone: "amber" };
const GM: ApplicationCompany = { name: "Gamuda Land", initials: "GL", tone: "blue" };
const DX: ApplicationCompany = { name: "Dat Xanh Services", initials: "DX", tone: "green" };
const CL: ApplicationCompany = { name: "CenLand", initials: "CL", tone: "purple" };

export const MOCK_APPLICATION_HISTORY: ApplicationHistoryItem[] = [
  {
    id: 1, jobId: 1, jobTitle: "Chuyên viên Phân tích Đầu tư", company: VH, location: "Quận 1, TP. Hồ Chí Minh",
    salaryText: "25–35 triệu", status: "INTERVIEW", appliedAt: daysFromNow(-9), updatedAt: daysFromNow(-9),
    cv: { fileName: "CV_MinhAnh_Investment.pdf", url: "#cv-1" }, viewedAt: daysFromNow(-7), interviewAt: daysFromNow(4, 9, 30),
  },
  {
    id: 2, jobId: 2, jobTitle: "Business Development Executive", company: MH, location: "Thủ Đức, TP. Hồ Chí Minh",
    salaryText: "20–30 triệu", status: "VIEWED", appliedAt: daysFromNow(-12), updatedAt: daysFromNow(-10),
    cv: { fileName: "CV_MinhAnh_Business.pdf", url: "#cv-2" }, viewedAt: daysFromNow(-10),
  },
  {
    id: 3, jobId: 4, jobTitle: "Chuyên viên Nghiên cứu Thị trường", company: CB, location: "Quận 1, TP. Hồ Chí Minh",
    salaryText: "18–25 triệu", status: "SENT", appliedAt: daysFromNow(-6), updatedAt: daysFromNow(-6),
    cv: { fileName: "CV_MinhAnh_MarketResearch.pdf", url: "#cv-3" },
  },
  {
    id: 4, jobId: 3, jobTitle: "Project Coordinator", company: SV, location: "Quận 3, TP. Hồ Chí Minh",
    salaryText: "Thỏa thuận", status: "REJECTED", appliedAt: daysFromNow(-19), updatedAt: daysFromNow(-17),
    cv: { fileName: "CV_MinhAnh_Project.pdf", url: "#cv-4" }, viewedAt: daysFromNow(-17),
    feedback: "Nhà tuyển dụng ưu tiên ứng viên có từ 3 năm kinh nghiệm quản lý dự án.",
  },
  {
    id: 5, jobId: 5, jobTitle: "Chuyên viên Quan hệ Khách hàng", company: KL, location: "Quận 7, TP. Hồ Chí Minh",
    salaryText: "18–22 triệu", status: "DONE", appliedAt: daysFromNow(-25), updatedAt: daysFromNow(-18),
    cv: { fileName: "CV_MinhAnh_Customer.pdf", url: "#cv-5" }, viewedAt: daysFromNow(-23), interviewAt: daysFromNow(-18),
  },
  {
    id: 6, jobId: 6, jobTitle: "Chuyên viên Kinh doanh Dự án", company: GM, location: "Quận 2, TP. Hồ Chí Minh",
    salaryText: "30–50 triệu", status: "VIEWED", appliedAt: daysFromNow(-30), updatedAt: daysFromNow(-27),
    cv: { fileName: "CV_MinhAnh_Sales.pdf", url: "#cv-6" }, viewedAt: daysFromNow(-27),
  },
  {
    id: 7, jobId: 7, jobTitle: "Trưởng nhóm Kinh doanh", company: DX, location: "Bình Thạnh, TP. Hồ Chí Minh",
    salaryText: "45–100 triệu", status: "INTERVIEW", appliedAt: daysFromNow(-33), updatedAt: daysFromNow(-30),
    cv: { fileName: "CV_MinhAnh_Leader.pdf", url: "#cv-7" }, viewedAt: daysFromNow(-31), interviewAt: daysFromNow(9, 14, 0),
  },
  {
    id: 8, jobId: 8, jobTitle: "Chuyên viên Marketing Bất động sản", company: CL, location: "Quận 10, TP. Hồ Chí Minh",
    salaryText: "15–25 triệu", status: "VIEWED", appliedAt: daysFromNow(-41), updatedAt: daysFromNow(-38),
    cv: { fileName: "CV_MinhAnh_Marketing.pdf", url: "#cv-8" }, viewedAt: daysFromNow(-38),
  },
  {
    id: 9, jobId: 9, jobTitle: "Chuyên viên Tư vấn Căn hộ", company: MH, location: "Quận 2, TP. Hồ Chí Minh",
    salaryText: "20–40 triệu", status: "DONE", appliedAt: daysFromNow(-52), updatedAt: daysFromNow(-44),
    cv: { fileName: "CV_MinhAnh_Advisor.pdf", url: "#cv-9" }, viewedAt: daysFromNow(-49), interviewAt: daysFromNow(-44),
  },
  {
    id: 10, jobId: 10, jobTitle: "Nhân viên Chăm sóc Khách hàng", company: VH, location: "Quận 9, TP. Hồ Chí Minh",
    salaryText: "12–18 triệu", status: "VIEWED", appliedAt: daysFromNow(-60), updatedAt: daysFromNow(-57),
    cv: { fileName: "CV_MinhAnh_Support.pdf", url: "#cv-10" }, viewedAt: daysFromNow(-57),
  },
  {
    id: 11, jobId: 11, jobTitle: "Chuyên viên Phân tích Thị trường", company: CB, location: "Quận 1, TP. Hồ Chí Minh",
    salaryText: "22–32 triệu", status: "DONE", appliedAt: daysFromNow(-75), updatedAt: daysFromNow(-66),
    cv: { fileName: "CV_MinhAnh_Analyst.pdf", url: "#cv-11" }, viewedAt: daysFromNow(-72), interviewAt: daysFromNow(-66),
  },
  {
    id: 12, jobId: 12, jobTitle: "Trợ lý Kinh doanh Sàn giao dịch", company: SV, location: "Quận 3, TP. Hồ Chí Minh",
    salaryText: "10–15 triệu", status: "SENT", appliedAt: daysFromNow(-3), updatedAt: daysFromNow(-3),
    cv: { fileName: "CV_MinhAnh_Assistant.pdf", url: "#cv-12" },
  },
];

/** Lịch phỏng vấn sắp tới: lấy từ đơn đang ở trạng thái "Hẹn phỏng vấn" */
export const MOCK_UPCOMING_INTERVIEW: UpcomingInterview = {
  applicationId: 1,
  jobId: 1,
  jobTitle: "Chuyên viên Phân tích Đầu tư",
  company: VH,
  department: "Phòng Phát triển Đầu tư",
  startAt: daysFromNow(4, 9, 30),
  endAt: daysFromNow(4, 10, 15),
  mode: "Online qua Microsoft Teams",
  confirmed: true,
};
