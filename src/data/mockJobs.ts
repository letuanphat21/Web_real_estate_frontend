import type {
  Company,
  Cv,
  JobPublisher,
  JobRecord,
  JobType,
  SuggestedJob,
  UserProfileSummary,
} from "../types/job.types";

export const MOCK_COMPANIES: Company[] = [
  { id: 1, name: "Masterise Homes", initials: "M", colorClass: "bg-footer", openJobs: 18, rating: 4.8 },
  { id: 2, name: "Dat Xanh Services", initials: "DX", colorClass: "bg-teal-700", openJobs: 32, rating: 4.6 },
  { id: 3, name: "Savills Vietnam", initials: "S", colorClass: "bg-red-800", openJobs: 12, rating: 4.9 },
  { id: 4, name: "Gamuda Land", initials: "G", colorClass: "bg-accent", openJobs: 9, rating: 4.5 },
  { id: 5, name: "CenLand", initials: "C", colorClass: "bg-primary-700", openJobs: 14, rating: 4.4 },
];

const [masterise, datxanh, savills, gamuda, cenland] = MOCK_COMPANIES;

export const MOCK_JOB_TYPES: Record<"FULL_TIME" | "PART_TIME" | "FREELANCE", JobType> = {
  FULL_TIME: { id: 1, name: "Toàn thời gian" },
  PART_TIME: { id: 2, name: "Bán thời gian" },
  FREELANCE: { id: 3, name: "Cộng tác viên" },
};

const PUBLISHERS: JobPublisher[] = [
  { id: 11, name: "Trần Hoài Linh" },
  { id: 12, name: "Phạm Quốc Bảo", avatarUrl: "https://i.pravatar.cc/100?img=12" },
  { id: 13, name: "Lê Thu Hà", avatarUrl: "https://i.pravatar.cc/100?img=32" },
];

const DESCRIPTION = (district: string) => `
<h3>Mô tả công việc</h3>
<ul>
  <li>Tìm kiếm, tiếp cận và tư vấn khách hàng có nhu cầu mua bất động sản hạng sang tại ${district}.</li>
  <li>Giới thiệu thông tin sản phẩm, giải đáp thắc mắc và đồng hành cùng khách hàng trong quá trình lựa chọn.</li>
  <li>Phối hợp với Khối Kinh doanh tổ chức gặp gỡ khách hàng, tham quan và trình bày phương án phù hợp.</li>
  <li>Theo dõi tiến độ giao dịch, cập nhật thông tin và báo cáo kết quả công việc định kỳ.</li>
</ul>
<h3>Yêu cầu ứng viên</h3>
<ul>
  <li>Có ít nhất 1 năm kinh nghiệm trong lĩnh vực kinh doanh hoặc tư vấn bất động sản.</li>
  <li>Kỹ năng giao tiếp, lắng nghe, đàm phán và chăm sóc khách hàng tốt.</li>
  <li>Chủ động trong công việc, có tinh thần trách nhiệm và khả năng phối hợp với đội nhóm.</li>
  <li>Sẵn sàng làm việc tại ${district}; tác phong chuyên nghiệp, định hướng phát triển lâu dài.</li>
</ul>
<h3>Quyền lợi</h3>
<ul>
  <li>Mức thu nhập dự kiến hấp dẫn, trao đổi cụ thể trong quá trình phỏng vấn.</li>
  <li>Được đào tạo kiến thức sản phẩm, kỹ năng tư vấn và quy trình làm việc.</li>
  <li>Môi trường làm việc chuyên nghiệp, hỗ trợ từ đội ngũ kinh doanh và người phụ trách.</li>
  <li>Cơ hội phát triển năng lực, mở rộng mạng lưới khách hàng và thăng tiến theo kết quả công việc.</li>
</ul>`;

type Seed = Pick<
  JobRecord,
  | "title" | "company" | "badge" | "salaryMin" | "salaryMax" | "commission" | "city" | "level"
  | "project" | "propertyType" | "experience" | "department"
> & { district: string; type: keyof typeof MOCK_JOB_TYPES };

const SEEDS: Seed[] = [
  { title: "Chuyên viên kinh doanh dự án hạng sang", company: masterise, badge: "FEATURED", salaryMin: 35, salaryMax: 80, commission: "2,5–4% + thưởng nóng", city: "TP.HCM", district: "TP. Thủ Đức", level: "STAFF", project: "The Global City", propertyType: "LUXURY_APARTMENT", experience: "1 năm", department: "Khối Kinh doanh", type: "FULL_TIME" },
  { title: "Trưởng nhóm kinh doanh bất động sản", company: datxanh, badge: "URGENT", salaryMin: 45, salaryMax: 100, commission: "Hoa hồng đến 5%", city: "TP.HCM", district: "Bình Thạnh", level: "TEAM_LEAD", project: "Gladia by the Waters", propertyType: "LUXURY_APARTMENT", experience: "2–3 năm", department: "Khối Kinh doanh", type: "FULL_TIME" },
  { title: "Giám đốc sàn kinh doanh khu Đông", company: cenland, badge: "HOT", salaryMin: 100, salaryMax: 150, commission: "Hoa hồng đến 6% + cổ phần", city: "TP.HCM", district: "TP. Thủ Đức", level: "DIRECTOR", project: "Aurelia Riverside", propertyType: "VILLA", experience: "5 năm", department: "Ban Giám đốc", type: "FULL_TIME" },
  { title: "Chuyên viên tư vấn đầu tư", company: savills, salaryMin: 25, salaryMax: 60, commission: "1,5–3% theo doanh số", city: "Hà Nội", district: "Nam Từ Liêm", level: "STAFF", project: "Eaton Park", propertyType: "LUXURY_APARTMENT", experience: "Chưa cần kinh nghiệm", department: "Khối Tư vấn", type: "FULL_TIME" },
  { title: "Quản lý kinh doanh dự án", company: gamuda, badge: "FEATURED", salaryMin: 70, salaryMax: 120, commission: "Hoa hồng đến 4%", city: "TP.HCM", district: "Quận 2", level: "MANAGER", project: "Eaton Park", propertyType: "TOWNHOUSE", experience: "4 năm", department: "Khối Kinh doanh", type: "FULL_TIME" },
  { title: "Môi giới đất nền Bình Dương", company: cenland, salaryMin: 15, salaryMax: 30, commission: "Hoa hồng 2–3%", city: "Bình Dương", district: "Thuận An", level: "STAFF", project: "Aurelia Riverside", propertyType: "LAND", experience: "Dưới 1 năm", department: "Khối Kinh doanh", type: "FREELANCE" },
];

const daysFromNow = (d: number) => new Date(Date.now() + d * 86_400_000).toISOString();
const DEADLINES = [12, 6, 20, 9, 15, 3, 25, 18];

/** Id đặc biệt để kiểm thử: lương thỏa thuận, đã đóng, quá hạn, đã xóa */
export const SPECIAL_JOB_IDS = { negotiable: 22, closed: 23, expired: 24, deleted: 25 } as const;

/** "CSDL" mock. Chứa cả field nhạy cảm, service phải lọc trước khi trả về client. */
export const MOCK_JOB_RECORDS: JobRecord[] = Array.from({ length: 25 }, (_, i) => {
  const { type, district, ...seed } = SEEDS[i % SEEDS.length];
  const bump = i >= SEEDS.length;
  const id = i + 1;
  return {
    ...seed,
    id,
    jobType: MOCK_JOB_TYPES[type],
    location: `${district}, ${seed.city}`,
    salaryMin: seed.salaryMin! + (bump ? 5 : 0),
    salaryMax: seed.salaryMax! + (bump ? 10 : 0),
    currency: "VND",
    salaryNegotiable: id === SPECIAL_JOB_IDS.negotiable,
    quantity: 3 + (i % 4) * 2,
    description: DESCRIPTION(district),
    deadline: daysFromNow(id === SPECIAL_JOB_IDS.expired ? -3 : DEADLINES[i % DEADLINES.length]),
    status: id === SPECIAL_JOB_IDS.closed ? "closed" : "open",
    publishedAt: daysFromNow(-(5 + (i % 6))),
    updatedAt: daysFromNow(-Math.floor(i / 2)),
    createdBy: PUBLISHERS[i % PUBLISHERS.length],
    embedding: [0.12, 0.34],
    updatedBy: 99,
    deletedAt: id === SPECIAL_JOB_IDS.deleted ? daysFromNow(-1) : null,
  } satisfies JobRecord;
}).map((j) =>
  j.id === SPECIAL_JOB_IDS.negotiable ? { ...j, salaryMin: null, salaryMax: null } : j
);

export const MOCK_SUGGESTED_JOBS: SuggestedJob[] = [
  { id: 1, title: "Sales Manager · Eaton Park", companyName: "Gamuda Land", matchPercent: 92 },
  { id: 2, title: "Trưởng nhóm kinh doanh", companyName: "Dat Xanh Services", matchPercent: 88 },
  { id: 3, title: "Chuyên viên tư vấn đầu tư", companyName: "Savills Vietnam", matchPercent: 84 },
];

export const MOCK_PROFILE: UserProfileSummary = {
  id: 1,
  fullName: "Nguyễn Minh Khang",
  title: "Chuyên viên kinh doanh · 3 năm",
  avatarUrl: "https://i.pravatar.cc/100?img=15",
  completion: 82,
  stats: [
    { label: "Lượt xem", value: 28 },
    { label: "Đã ứng tuyển", value: 6 },
    { label: "Phù hợp mới", value: 3, highlight: true },
  ],
};

/** CV đã tạo trên NovaLand của người dùng đang đăng nhập */
export const MOCK_CVS: Cv[] = [
  { id: 1, title: "CV Chuyên viên kinh doanh BĐS", createdAt: "2026-08-12T09:00:00", pdfUrl: "#cv-1" },
  { id: 2, title: "CV Tư vấn dự án hạng sang", createdAt: "2026-09-20T14:30:00", pdfUrl: "#cv-2" },
];
