// TODO: thay bằng dữ liệu gọi từ API (booking của người dùng, bảng favorites)
const img = (id: string): string => `https://images.unsplash.com/${id}?w=700&q=80`;

import type { AuthUser } from "../types/auth.types";

// TODO: thay bằng người dùng đăng nhập thật khi có xác thực
export const CURRENT_USER: AuthUser = { id: 1, fullName: "Nguyễn Văn A", email: "hello@datvietgroup.vn" };

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

export const MOCK_FAVORITES: FavoriteUnit[] = [
  { id: 1, unitCode: "AR-A1-1208", projectId: 1, projectName: "Aurelia Riverside", spec: "3 PN · 92,6 m²", direction: "Đông Nam", price: "16,85 tỷ", image: img("photo-1600607687939-ce8a6c25118c"), available: true },
  { id: 2, unitCode: "AR-C3-0709", projectId: 1, projectName: "Aurelia Riverside", spec: "2 PN · 76,4 m²", direction: "Tây Nam", price: "10,88 tỷ", image: img("photo-1600585154340-be6161a56a0c"), available: true },
  { id: 3, unitCode: "AR-C1-2201", projectId: 1, projectName: "Aurelia Riverside", spec: "3 PN+ · 120,0 m²", direction: "Nam", price: "18,35 tỷ", image: img("photo-1613490493576-7fde63acd811"), available: false },
];
