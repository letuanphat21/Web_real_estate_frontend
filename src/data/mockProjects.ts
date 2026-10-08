import type { NotificationItem } from "../types/notification.types";

// TODO: thay bằng dữ liệu gọi từ API
export const PROJECTS = [
  { id: 1, name: "The Lumière Riverside", investor: "Masterise Homes", location: "Thảo Điền, TP. Thủ Đức", type: "Căn hộ cao cấp", tag: "Đang mở bán", price: "Từ 74,5 triệu/m²", progress: 78, note: "Bàn giao 2027", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" },
  { id: 2, name: "Aurora Bay Residences", investor: "Keppel Land", location: "Thủ Thiêm, TP. Thủ Đức", type: "Căn hộ view sông", tag: "Sắp mở bán", price: "Từ 5,8 tỷ/căn", progress: 55, note: "Cất nóc 04/2026", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" },
  { id: 3, name: "Maison Heritage", investor: "SonKim Land", location: "Quận 3, TP. Hồ Chí Minh", type: "Căn hộ boutique", tag: "Đang nhận giữ chỗ", price: "Từ 12,8 tỷ/căn", progress: 42, note: "Đang thi công", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80" },
  { id: 4, name: "Grand Marina Saigon", investor: "Masterise Homes", location: "Bến Nghé, Quận 1", type: "Căn hộ hạng sang", tag: "Còn ít suất đẹp", price: "Từ 19 tỷ/căn", progress: 90, note: "Bàn giao 2026", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" },
  { id: 5, name: "The Zenity", investor: "CapitaLand Development", location: "Cô Giang, Quận 1", type: "Căn hộ cao cấp", tag: "Đang mở bán", price: "Từ 6,9 tỷ/căn", progress: 65, note: "Hoàn thiện mặt ngoài", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" },
  { id: 6, name: "The Metropole Thủ Thiêm", investor: "SonKim Land", location: "Thủ Thiêm, TP. Thủ Đức", type: "Căn hộ & shophouse", tag: "Mở bán đợt mới", price: "Từ 100 triệu/m²", progress: 70, note: "Hoàn thiện mặt ngoài", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" },
];

export const ACTIVE_FILTERS = ["TP. Hồ Chí Minh", "Căn hộ", "Đang mở bán"];

export const PAGES = [1, 2, 3, 4, "...", 12] as const;

export type Project = (typeof PROJECTS)[number];

// ---- Thông báo "dự án vừa mở bán": lấy tên và id từ PROJECTS để bấm "Xem" mở đúng trang dự án
// TODO: thay bằng thông báo từ API (kèm trạng thái đã đọc của người dùng)

const projectLaunched = (project: Project): NotificationItem["message"] => [
  { text: "Dự án " },
  { text: project.name.toUpperCase(), bold: true },
  { text: " vừa được mở bán trên hệ thống NovaLand Hub." },
];

const projectById = (id: number): Project => PROJECTS.find((p) => p.id === id) ?? PROJECTS[0];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { id: 1, projectId: 6, createdText: "07/10/2026 08:50:07", read: false },
  { id: 2, projectId: 1, createdText: "02/10/2026 16:34:17", read: true },
  { id: 3, projectId: 5, createdText: "02/10/2026 16:16:17", read: false },
].map(({ id, projectId, createdText, read }) => ({
  id,
  type: "INFO" as const,
  message: projectLaunched(projectById(projectId)),
  createdText,
  read,
  href: `/projects/${projectId}`,
}));
