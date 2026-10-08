import type { BookingUnit } from "../../components/ProjectDetail/BookingLockModal";

// TODO: thay bằng dữ liệu gọi từ API theo :id (bảng property: property_code, area, price, direction, floor, status, bedrooms)
export const PROJECT = { name: "Aurelia Riverside" };

// TODO: thay bằng ảnh mặt bằng tổng thể của dự án (từ API)
export const MASTER_PLAN_IMAGE = "https://images.unsplash.com/photo-1524813686514-a57563d77965?w=2000&q=80";
// Kích thước pixel gốc của ảnh (dùng làm hệ toạ độ cho Leaflet)
export const MASTER_PLAN_SIZE = { width: 2000, height: 1333 };

// Vị trí căn trên ảnh mặt bằng (toạ độ % theo chiều rộng/cao của ảnh, gốc ở góc trên trái)
export const UNITS = [
  { no: "1201", left: "19%", top: "21%", status: "available" },
  { no: "1202", left: "40%", top: "17%", status: "holding" },
  { no: "1203", left: "63%", top: "22%", status: "sold" },
  { no: "1204", left: "79%", top: "33%", status: "available" },
  { no: "1205", left: "16%", top: "59%", status: "closed" },
  { no: "1206", left: "34%", top: "73%", status: "available" },
  { no: "1207", left: "58%", top: "70%", status: "holding" },
  { no: "1208", left: "82%", top: "62%", status: "available" },
];

export const SELECTED = {
  code: "AR-A1-1208",
  status: "available",
  image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80",
  rows: [
    ["Tòa / tầng", "A1 · Tầng 12"],
    ["Diện tích", "92,6 m²"],
    ["Phòng ngủ", "3 PN · 2 WC"],
    ["Hướng", "Đông Nam · Hướng sông"],
  ],
  price: "16,85 tỷ",
  note: "≈ 181,9 triệu/m² · Đã gồm VAT",
};

export const BOOKING_UNIT: BookingUnit = {
  code: SELECTED.code,
  image: SELECTED.image,
  statusLabel: "Còn trống",
  location: "Tòa A1 · Tầng 12",
  spec: "3 PN · 2 WC · 92,6 m²",
  direction: "Đông Nam · Hướng sông",
  price: SELECTED.price,
};

export const FEATURED = [
  { code: "AR-A1-1208", spec: "3 PN · 92,6 m² · Đông Nam", price: "16,85 tỷ", status: "available", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80" },
  { code: "AR-A2-1805", spec: "2 PN · 76,8 m² · Hướng sông", price: "13,42 tỷ", status: "holding", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80" },
  { code: "AR-B1-2302", spec: "3 PN+ · 118,2 m² · Góc", price: "22,10 tỷ", status: "available", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80" },
];
