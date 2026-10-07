import type { Booking, BookingAssignee, BookingCustomer, BookingProperty, BookingStatus } from "../types/booking.types";

// TODO: thay bằng dữ liệu gọi từ API
const img = (id: string): string => `https://images.unsplash.com/${id}?w=200&q=80`;

export const ASSIGNEES: BookingAssignee[] = [
  { id: 1, fullName: "Phạm Minh Tuấn", role: "Chuyên viên tư vấn" },
  { id: 2, fullName: "Võ Ngọc Linh", role: "Chuyên viên tư vấn" },
];

const CUSTOMERS: BookingCustomer[] = [
  { id: 128, code: "USR-00128", fullName: "Trần Hoàng Nam" },
  { id: 216, code: "USR-00216", fullName: "Lê Thảo Vy" },
  { id: 304, code: "USR-00304", fullName: "Nguyễn Đức Huy" },
  { id: 187, code: "USR-00187", fullName: "Phạm Ngọc Mai" },
  { id: 253, code: "USR-00253", fullName: "Đặng Quốc Bảo" },
  { id: 342, code: "USR-00342", fullName: "Hoàng Gia Hân" },
];

export const PROPERTIES: BookingProperty[] = [
  { id: 1208, code: "PR-01208", projectId: 1, projectName: "Aurelia Riverside", unitCode: "AR-A1-1208", spec: "3 PN · 92,6 m²", image: img("photo-1600607687939-ce8a6c25118c") },
  { id: 1805, code: "PR-01805", projectId: 1, projectName: "Aurelia Riverside", unitCode: "AR-A2-1805", spec: "2 PN · 76,8 m²", image: img("photo-1512917774080-9991f1c4c750") },
  { id: 2418, code: "PR-02418", projectId: 2, projectName: "Sunwah Pearl", unitCode: "SP-B2-1506", spec: "3 PN · 125 m²", image: img("photo-1600585154340-be6161a56a0c") },
  { id: 932, code: "PR-00932", projectId: 3, projectName: "Aqua City", unitCode: "AC-SL-032", spec: "Biệt thự · 220 m²", image: img("photo-1613490493576-7fde63acd811") },
  { id: 2302, code: "PR-02302", projectId: 1, projectName: "Aurelia Riverside", unitCode: "AR-B1-2302", spec: "3 PN+ · 118,2 m²", image: img("photo-1486406146926-c627a92ad1ab") },
];

// 24 booking: 6 chờ xác nhận, 10 đã xác nhận, 5 hoàn tất, 3 đã hủy
const STATUS_PLAN: BookingStatus[] = [
  "PENDING", "CONFIRMED", "PENDING", "COMPLETED", "CANCELLED",
  "CONFIRMED", "PENDING", "CONFIRMED", "COMPLETED", "CONFIRMED",
  "PENDING", "CONFIRMED", "COMPLETED", "CONFIRMED", "CANCELLED",
  "PENDING", "CONFIRMED", "COMPLETED", "CONFIRMED", "PENDING",
  "CONFIRMED", "COMPLETED", "CANCELLED", "CONFIRMED",
];

const pad = (n: number) => String(n).padStart(2, "0");

export const MOCK_BOOKINGS: Booking[] = STATUS_PLAN.map((status, i) => {
  const seq = 24 - i; // BK-261007-024 ... 001
  const day = 7 - Math.floor(i / 5);
  const minutes = 9 * 60 + 42 - (i % 5) * 37;
  const hh = Math.floor(minutes / 60);
  const mm = minutes % 60;
  const req = `2026-10-${pad(day)}T${pad(hh)}:${pad(mm)}:00`;
  const upd = `2026-10-${pad(day)}T${pad(hh)}:${pad(Math.min(59, mm + 13))}:00`;
  return {
    id: seq,
    code: `BK-2610${pad(day)}-${String(seq).padStart(3, "0")}`,
    type: "Giữ chỗ bất động sản",
    customer: CUSTOMERS[i % CUSTOMERS.length]!,
    property: PROPERTIES[i % PROPERTIES.length]!,
    status,
    assignee: status === "PENDING" && i === 0 ? null : ASSIGNEES[i % ASSIGNEES.length]!,
    requestTime: req,
    createdAt: req,
    updatedAt: status === "PENDING" ? req : upd,
  };
});
