import type { Progress } from "../types/progress.types";

// TODO: bỏ file này khi có API (GET progress theo project_id kèm progress_images)
const img = (id: string) => `https://images.unsplash.com/${id}?w=1400&q=80`;

let imageId = 0;
const photos = (progressId: number, ids: string[], createdAt: string) =>
  ids.map((id) => ({ id: ++imageId, progressId, imageUrl: img(id), createdAt }));

export const MOCK_PROGRESS: Progress[] = [
  {
    id: 1,
    projectId: 1,
    title: "Hoàn thiện kết cấu phần thân tháp A",
    content:
      "Kết cấu phần thân tháp A đã hoàn thành theo kế hoạch của giai đoạn này.\nCông tác lắp đặt hệ thống kỹ thuật được triển khai song song với phần hoàn thiện mặt ngoài.",
    reportDate: "2026-10-01",
    createdAt: "2026-10-01T16:30:00",
    images: photos(1, ["photo-1541888946425-d81bb19240f5", "photo-1504307651254-35680f356dfd", "photo-1486406146926-c627a92ad1ab", "photo-1590644365607-1c5a519a7a37", "photo-1503387762-592deb58ef4e"], "2026-10-01T16:30:00"),
  },
  {
    id: 2,
    projectId: 1,
    title: "Lắp đặt hệ mặt dựng khối đế",
    content: "Đơn vị thi công bắt đầu lắp đặt hệ mặt dựng kính cho khối đế và các tầng thấp.",
    reportDate: "2026-09-02",
    createdAt: "2026-09-02T10:00:00",
    images: photos(2, ["photo-1503387762-592deb58ef4e", "photo-1486406146926-c627a92ad1ab"], "2026-09-02T10:00:00"),
  },
  {
    id: 3,
    projectId: 1,
    title: "Thi công hạ tầng ngầm khu trung tâm",
    content: "Hoàn tất phần hạ tầng ngầm và chuẩn bị mặt bằng cho hạng mục cảnh quan.",
    reportDate: "2026-08-04",
    createdAt: "2026-08-04T09:15:00",
    images: photos(3, ["photo-1590644365607-1c5a519a7a37", "photo-1504307651254-35680f356dfd", "photo-1541888946425-d81bb19240f5"], "2026-08-04T09:15:00"),
  },
  {
    id: 4,
    projectId: 1,
    title: "Khởi công phần thân",
    content: null,
    reportDate: "2026-06-10",
    createdAt: "2026-06-10T08:00:00",
    images: [],
  },
  {
    id: 5,
    projectId: 2,
    title: "Cất nóc tòa tháp thứ nhất",
    content: "Tòa tháp thứ nhất của dự án đã hoàn tất cất nóc.",
    reportDate: "2026-10-02",
    createdAt: "2026-10-02T11:00:00",
    images: photos(5, ["photo-1486406146926-c627a92ad1ab", "photo-1503387762-592deb58ef4e"], "2026-10-02T11:00:00"),
  },
];
