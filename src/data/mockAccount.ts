// TODO: thay bằng dữ liệu gọi từ API (booking của người dùng, bảng favorites)
const img = (id: string): string => `https://images.unsplash.com/${id}?w=700&q=80`;

export type BookingStatus = "HOLDING" | "CONFIRMED" | "EXPIRED";

export interface MyBooking {
  id: number;
  unitCode: string;
  projectId: number;
  projectName: string;
  location: string;
  spec: string;
  price: string;
  image: string;
  status: BookingStatus;
  createdAt: string;
}

export interface FavoriteUnit {
  id: number;
  unitCode: string;
  projectId: number;
  projectName: string;
  spec: string;
  direction: string;
  price: string;
  image: string;
  available: boolean;
}

export const BOOKING_STATUS_META: Record<BookingStatus, { label: string; badge: string; dot: string }> = {
  HOLDING: { label: "Đang giữ chỗ", badge: "bg-warning/10 text-warning", dot: "bg-warning" },
  CONFIRMED: { label: "Đã xác nhận", badge: "bg-success/10 text-success", dot: "bg-success" },
  EXPIRED: { label: "Đã hết hạn", badge: "bg-line text-body", dot: "bg-muted" },
};

export const MOCK_BOOKINGS: MyBooking[] = [
  { id: 1, unitCode: "AR-A1-1208", projectId: 1, projectName: "Aurelia Riverside", location: "Tòa A1 · Tầng 12", spec: "3 PN · 2 WC · 92,6 m²", price: "16,85 tỷ", image: img("photo-1600607687939-ce8a6c25118c"), status: "HOLDING", createdAt: "07/10/2026 · 09:30" },
  { id: 2, unitCode: "AR-B1-2302", projectId: 1, projectName: "Aurelia Riverside", location: "Tòa B1 · Tầng 23", spec: "3 PN+ · 118,2 m²", price: "22,10 tỷ", image: img("photo-1486406146926-c627a92ad1ab"), status: "CONFIRMED", createdAt: "02/10/2026 · 14:05" },
  { id: 3, unitCode: "AR-A2-1805", projectId: 1, projectName: "Aurelia Riverside", location: "Tòa A2 · Tầng 18", spec: "2 PN · 76,8 m²", price: "13,42 tỷ", image: img("photo-1512917774080-9991f1c4c750"), status: "EXPIRED", createdAt: "25/09/2026 · 10:12" },
];

export const MOCK_FAVORITES: FavoriteUnit[] = [
  { id: 1, unitCode: "AR-A1-1208", projectId: 1, projectName: "Aurelia Riverside", spec: "3 PN · 92,6 m²", direction: "Đông Nam", price: "16,85 tỷ", image: img("photo-1600607687939-ce8a6c25118c"), available: true },
  { id: 2, unitCode: "AR-C3-0709", projectId: 1, projectName: "Aurelia Riverside", spec: "2 PN · 76,4 m²", direction: "Tây Nam", price: "10,88 tỷ", image: img("photo-1600585154340-be6161a56a0c"), available: true },
  { id: 3, unitCode: "AR-C1-2201", projectId: 1, projectName: "Aurelia Riverside", spec: "3 PN+ · 120,0 m²", direction: "Nam", price: "18,35 tỷ", image: img("photo-1613490493576-7fde63acd811"), available: false },
];
