import { ShoppingBag, GraduationCap, Trees, Hospital } from "lucide-react";

// TODO: thay bằng dữ liệu gọi từ API theo :id (projects.location, name...)
export const PROJECT = {
  name: "Aurelia Riverside",
  address: "Lô 3-15, Khu đô thị mới Thủ Thiêm, TP. Thủ Đức, TP.HCM",
  hero: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1800&q=80",
  side: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80",
};

export const ADVANTAGES = [
  { title: "Nhất cận thị", desc: "Liền kề CBD Thủ Thiêm và trung tâm Quận 1" },
  { title: "Nhị cận giang", desc: "Mặt tiền sông Sài Gòn, tầm nhìn không giới hạn" },
  { title: "Tam cận lộ", desc: "Kết nối Mai Chí Thọ, Xa lộ Hà Nội và cao tốc" },
];

export const POIS = [
  { icon: ShoppingBag, label: "Thiso Mall", left: "43%", top: "10%" },
  { icon: GraduationCap, label: "AIS", left: "12%", top: "21%" },
  { icon: Trees, label: "Công viên", left: "15%", top: "53%" },
  { icon: Hospital, label: "", left: "42%", top: "58%" },
];
