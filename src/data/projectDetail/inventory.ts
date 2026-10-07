// TODO: thay bằng dữ liệu gọi từ API theo :id (bảng property + zones)
export const PROJECT = { name: "Aurelia Riverside" };

export const ROWS = [
  { code: "AR-C1-1806", list: 22.8, tts: 21.95, unit: "152,4", type: "Duplex 3PN", dir: "Đông Nam", area: "144,0", zone: "The Cove", status: "available" },
  { code: "AR-C1-1208", list: 12.45, tts: 11.98, unit: "138,2", type: "Căn hộ 2PN+", dir: "Tây Bắc", area: "86,7", zone: "The Cove", status: "available" },
  { code: "AR-C2-0902", list: 8.96, tts: 8.72, unit: "131,7", type: "Căn hộ 1PN+", dir: "Đông Bắc", area: "66,2", zone: "The Cove", status: "holding" },
  { code: "AR-C2-1505", list: 15.6, tts: 14.96, unit: "143,8", type: "Căn hộ 3PN", dir: "Đông Nam", area: "104,0", zone: "The Cove", status: "available" },
  { code: "AR-C1-2201", list: 18.35, tts: 17.89, unit: "149,1", type: "Căn hộ 3PN+", dir: "Nam", area: "120,0", zone: "The Cove", status: "sold" },
  { code: "AR-C3-0709", list: 10.88, tts: 10.42, unit: "136,4", type: "Căn hộ 2PN", dir: "Tây Nam", area: "76,4", zone: "The Cove", status: "available" },
  { code: "AR-C3-1903", list: 13.92, tts: 13.48, unit: "141,9", type: "Căn hộ 2PN+", dir: "Đông", area: "95,0", zone: "The Cove", status: "holding" },
  { code: "AR-C2-2501", list: 34.5, tts: 32.9, unit: "169,6", type: "Penthouse", dir: "Đông Nam", area: "194,0", zone: "The Cove", status: "available" },
  { code: "AR-C3-1106", list: 11.75, tts: 11.31, unit: "135,6", type: "Căn hộ 2PN", dir: "Bắc", area: "83,4", zone: "The Cove", status: "sold" },
  { code: "AR-C4-2802", list: null, tts: null, unit: null, type: "Sky Villa", dir: "Đông Nam", area: "268,5", zone: "The Cove", status: "closed" },
];

export const STATS = [
  { label: "Tổng số căn", value: "286", note: "4 phân khu", dot: "bg-primary-300" },
  { label: "Còn trống", value: "84", note: "29,4% quỹ căn", dot: "bg-success" },
  { label: "Đang giữ chỗ", value: "21", note: "Hiệu lực trong 24h", dot: "bg-warning" },
  { label: "Đã bán", value: "167", note: "58,4% quỹ căn", dot: "bg-danger" },
];

export type InventoryFilter = { q: string; price: string; type: string; dir: string; zone: string; status: string };

// Ảnh minh họa dùng cho form giữ chỗ khi bảng quỹ căn chưa có ảnh từng căn
export const UNIT_IMAGE = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80";

export type InventoryRow = (typeof ROWS)[number];
