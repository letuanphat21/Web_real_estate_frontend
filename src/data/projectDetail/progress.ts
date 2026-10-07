// TODO: thay bằng dữ liệu gọi từ API theo :id (progress + progress_images)
export const PROJECT = { name: "Aurelia Riverside" };

export const IMG = (id: string, w = 800) => `https://images.unsplash.com/${id}?w=${w}&q=80`;

export const SITE = [
  "photo-1541888946425-d81bb19240f5",
  "photo-1504307651254-35680f356dfd",
  "photo-1486406146926-c627a92ad1ab",
  "photo-1590644365607-1c5a519a7a37",
  "photo-1503387762-592deb58ef4e",
];

export type State = "done" | "building" | "ontrack" | "plan";

export type Period = {
  key: string;
  title: string;
  short: string;
  percent: number;
  delta: string;
  status: State;
  heading: string;
  desc: string;
  img: string;
};

export const PERIODS: Period[] = [
  { key: "t10", title: "Tháng 10/2026", short: "Thi công tầng 28–30", percent: 68, delta: "+4% so với tháng 09", status: "building", heading: "Cập nhật tiến độ tháng 10/2026", desc: "Hai tháp tiếp tục vượt cao độ kế hoạch, đồng thời triển khai song song hệ mặt dựng và MEP. Trong tháng, công trường duy trì trung bình 620 kỹ sư, công nhân và 4 cẩn cẩu tháp, không ghi nhận sự cố an toàn lao động.", img: SITE[0] },
  { key: "t09", title: "Tháng 09/2026", short: "Hoàn tất tầng 27", percent: 64, delta: "+5% so với tháng 08", status: "done", heading: "Cập nhật tiến độ tháng 09/2026", desc: "Kết cấu thân đạt tầng 27, bắt đầu lắp kính low-e cho khối đế và tầng thấp.", img: SITE[1] },
  { key: "t08", title: "Tháng 08/2026", short: "Kết cấu tầng 24", percent: 59, delta: "+6% so với tháng 07", status: "done", heading: "Cập nhật tiến độ tháng 08/2026", desc: "Hoàn thiện kết cấu tầng 24, triển khai trục kỹ thuật và hạ tầng ngầm khu trung tâm.", img: SITE[2] },
  { key: "q2", title: "Quý II/2026", short: "Hoàn tất khối đế", percent: 48, delta: "+16% so với quý I", status: "done", heading: "Cập nhật tiến độ quý II/2026", desc: "Hoàn tất khối đế, bắt đầu kết cấu thân tháp A và tháp B.", img: SITE[3] },
  { key: "q1", title: "Quý I/2026", short: "Thi công tầng hầm", percent: 32, delta: "Mốc đầu năm", status: "done", heading: "Cập nhật tiến độ quý I/2026", desc: "Hoàn thành thi công tầng hầm và bắt đầu kết cấu khối đế.", img: SITE[4] },
];

export const CATEGORIES: { name: string; note: string; value: number; state: State }[] = [
  { name: "Kết cấu", note: "Tháp A tầng 30 · Tháp B tầng 28", value: 82, state: "ontrack" },
  { name: "Mặt ngoài", note: "Lắp kính low-e từ tầng 6–12", value: 56, state: "building" },
  { name: "MEP", note: "Lắp đặt trục kỹ thuật tầng 5–16", value: 49, state: "building" },
  { name: "Cảnh quan", note: "Hoàn thiện hạ tầng ngầm khu trung tâm", value: 28, state: "building" },
  { name: "Tiện ích", note: "Chuẩn bị thi công hồ bơi & clubhouse", value: 18, state: "plan" },
];

export const GALLERY = [
  { img: SITE[0], title: "Tháp A · Tầng 30", date: "Chụp ngày 01/10/2026", big: true },
  { img: SITE[1], title: "Mặt ngoài Tháp A", date: "30/09/2026" },
  { img: SITE[3], title: "Hệ MEP tầng 12", date: "28/09/2026" },
  { img: SITE[4], title: "Khối đế trung tâm", date: "29/09/2026" },
  { img: SITE[2], title: "Toàn cảnh công trường", date: "01/10/2026 · Xem thêm 14 ảnh" },
];
