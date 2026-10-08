import type {
  News,
  NewsCategory,
  NewsImage,
  ProjectSummary,
} from "../types/news.types";
import type { UserSummary } from "../types/event/event.types";

const img = (id: string): string =>
  `https://images.unsplash.com/${id}?w=800&q=80`;

export const MOCK_CATEGORIES: NewsCategory[] = [
  { id: 1, name: "Thị trường", slug: "thi-truong" },
  { id: 2, name: "Dự án", slug: "du-an" },
  { id: 3, name: "Pháp lý", slug: "phap-ly" },
  { id: 4, name: "Tài chính", slug: "tai-chinh" },
  { id: 5, name: "Quy hoạch & hạ tầng", slug: "quy-hoach-ha-tang" },
  { id: 6, name: "Phong cách sống", slug: "phong-cach-song" },
];

export const MOCK_PROJECTS: ProjectSummary[] = [
  { id: 1, name: "Aurelia Riverside" },
  { id: 2, name: "Aurora Bay Residences" },
  { id: 3, name: "Maison Heritage" },
  { id: 4, name: "The Lumen Riverside" },
];

const AUTHORS: UserSummary[] = [
  {
    id: 1,
    fullName: "Ban biên tập NovaLand",
    avatarUrl: "https://i.pravatar.cc/100?img=68",
  },
  {
    id: 2,
    fullName: "Nguyễn Minh Anh",
    avatarUrl: "https://i.pravatar.cc/100?img=47",
  },
  {
    id: 3,
    fullName: "Trần Quốc Huy",
    avatarUrl: "https://i.pravatar.cc/100?img=12",
  },
];

const cat = (id: number) => MOCK_CATEGORIES.find((c) => c.id === id)!;
const prj = (id: number) => MOCK_PROJECTS.find((p) => p.id === id)!;
const images = (newsId: number, ...photoIds: string[]): NewsImage[] =>
  photoIds.map((photoId, i) => ({
    id: newsId * 10 + i,
    title: i === 0 ? "Ảnh đại diện" : `Hình ảnh ${i}`,
    imageUrl: img(photoId),
    createdAt: "2026-09-20T08:00:00",
  }));
export const MOCK_NEWS: News[] = [
  {
    id: 1,
    title: "Thị trường nhà ở quý IV: Thanh khoản phục hồi rõ rệt tại khu Đông",
    content:
      "Lượng giao dịch căn hộ tại TP. Thủ Đức tăng 18% so với quý trước nhờ hạ tầng giao thông dần hoàn thiện và lãi suất cho vay ổn định. Phân khúc trung cấp tiếp tục dẫn dắt thị trường.",
    active: true,
    author: AUTHORS[0],
    project: prj(4),
    category: cat(1),
    images: images(1, "photo-1545324418-cc1a3fa10c00"),
    createdAt: "2026-10-07T08:00:00",
  },
  {
    id: 2,
    title: "Aurelia Riverside hoàn thiện cảnh quan ven sông trước kế hoạch",
    content:
      "Chủ đầu tư công bố hoàn thành 2,4 km công viên ven sông, sớm hơn 3 tháng so với cam kết. Cư dân có thể sử dụng đường chạy bộ, khu BBQ và bến thuyền từ tháng 11.",
    active: true,
    author: AUTHORS[0],
    project: prj(1),
    category: cat(2),
    images: images(2, "photo-1512917774080-9991f1c4c750"),
    createdAt: "2026-10-06T15:30:00",
  },
  {
    id: 3,
    title: "7 điểm cần biết khi áp dụng bảng giá đất mới từ năm 2026",
    content:
      "Bảng giá đất mới ảnh hưởng trực tiếp tới thuế thu nhập cá nhân, phí trước bạ và tiền sử dụng đất. Người mua cần kiểm tra kỹ hệ số điều chỉnh tại từng khu vực trước khi giao dịch.",
    active: true,
    author: AUTHORS[1],
    project: prj(1),
    category: cat(3),
    images: images(3, "photo-1583417319070-4a69db38a482"),
    createdAt: "2026-10-06T09:00:00",
  },
  {
    id: 4,
    title:
      "Metro số 1 kích hoạt chuỗi không gian đô thị dọc hành lang phía Đông",
    content:
      "Các khu dân cư quanh nhà ga đang hình thành chuỗi tiện ích mới: trung tâm thương mại, trường học và công viên, giúp giá trị căn hộ trong bán kính 1 km tăng đáng kể.",
    active: true,
    author: AUTHORS[2],
    project: prj(4),
    category: cat(5),
    images: images(4, "photo-1524661135-423995f22d0b"),
    createdAt: "2026-10-05T10:00:00",
  },
  {
    id: 5,
    title: "Lãi suất mua nhà ổn định: Cơ hội tái cấu trúc dòng tiền cuối năm",
    content:
      "Nhiều ngân hàng giữ lãi suất ưu đãi 12–24 tháng, mở cơ hội cho người mua ở thực. Chuyên gia khuyên nên giữ tỷ lệ trả nợ dưới 40% thu nhập hằng tháng.",
    active: true,
    author: AUTHORS[2],
    project: prj(2),
    category: cat(4),
    images: images(5, "photo-1600596542815-ffad4c1539a9"),
    createdAt: "2026-10-04T08:30:00",
  },
  {
    id: 6,
    title:
      "Wellness real estate: Khi sức khỏe trở thành tiêu chuẩn của căn hộ cao cấp",
    content:
      "Không khí sạch, ánh sáng tự nhiên và không gian xanh đang định hình lại tiêu chuẩn thiết kế căn hộ hạng sang tại các đô thị lớn.",
    active: true,
    author: AUTHORS[1],
    project: prj(3),
    category: cat(6),
    images: images(6, "photo-1600210492486-724fe5c67fb0"),
    createdAt: "2026-10-03T14:00:00",
  },
  {
    id: 7,
    title: "Maison Heritage công bố phân khu biệt thự Đông Dương",
    content:
      "Phân khu gồm 40 căn biệt thự với kiến trúc Đông Dương đương đại, mật độ xây dựng chỉ 25% và hệ thống tiện ích khép kín.",
    active: true,
    author: AUTHORS[0],
    project: prj(3),
    category: cat(2),
    images: images(7, "photo-1613490493576-7fde63acd811"),
    createdAt: "2026-10-02T09:00:00",
  },
  {
    id: 8,
    title: "Nguồn cung căn hộ khu Nam tăng mạnh trong quý III",
    content:
      "Hơn 3.000 căn hộ mới được chào bán tại khu Nam, tập trung ở phân khúc trung – cao cấp với giá từ 65 triệu đồng/m².",
    active: true,
    author: AUTHORS[2],
    project: prj(2),
    category: cat(1),
    images: images(8, "photo-1460317442991-0ec209397118"),
    createdAt: "2026-10-01T08:00:00",
  },
  {
    id: 9,
    title: "Hợp đồng mua bán căn hộ: Những điều khoản cần đọc kỹ",
    content:
      "Tiến độ thanh toán, phạt chậm bàn giao và điều kiện chấm dứt hợp đồng là ba phần người mua thường bỏ qua nhưng lại dễ phát sinh tranh chấp nhất.",
    active: true,
    author: AUTHORS[1],
    project: prj(2),
    category: cat(3),
    images: images(9, "photo-1505843513577-22bb7d21e455"),
    createdAt: "2026-09-30T10:00:00",
  },
  {
    id: 10,
    title: "Thủ Thiêm công bố lộ trình hoàn thiện các tuyến cầu chiến lược",
    content:
      "Ba cây cầu nối Thủ Thiêm với trung tâm dự kiến thông xe trước năm 2028, rút ngắn thời gian di chuyển xuống dưới 10 phút.",
    active: true,
    author: AUTHORS[1],
    project: prj(1),
    category: cat(5),
    images: images(10, "photo-1497366216548-37526070297c"),
    createdAt: "2026-09-29T08:00:00",
  },
  {
    id: 11,
    title: "Gói vay ưu đãi 0% lãi suất 18 tháng cho khách mua The Lumen",
    content:
      "Chủ đầu tư phối hợp cùng ngân hàng hỗ trợ lãi suất 0% trong 18 tháng đầu, ân hạn nợ gốc đến khi nhận nhà.",
    active: true,
    author: AUTHORS[2],
    project: prj(4),
    category: cat(4),
    images: images(11, "photo-1540575467063-178a50c2df87"),
    createdAt: "2026-09-28T09:00:00",
  },
  {
    id: 12,
    title: "Ngôi nhà đa thế hệ trở lại trong thiết kế đô thị mới",
    content:
      "Không gian linh hoạt giúp gia đình nhiều thế hệ sống chung mà vẫn giữ được sự riêng tư cho từng thành viên.",
    active: true,
    author: AUTHORS[1],
    project: prj(3),
    category: cat(6),
    images: images(12, "photo-1600596542815-ffad4c1539a9"),
    createdAt: "2026-09-27T15:00:00",
  },
  {
    id: 13,
    title: "Aurora Bay cất nóc tòa tháp thứ hai",
    content:
      "Tòa tháp B cao 35 tầng chính thức cất nóc, đảm bảo tiến độ bàn giao quý II năm 2027.",
    active: true,
    author: AUTHORS[0],
    project: prj(2),
    category: cat(2),
    images: images(13, "photo-1486406146926-c627a92ad1ab"),
    createdAt: "2026-09-26T08:00:00",
  },
  {
    id: 14,
    title: "Bài viết đã ẩn (active = false) — không hiển thị",
    content: "Bài này dùng để kiểm tra bộ lọc active.",
    active: false,
    author: AUTHORS[0],
    project: prj(1),
    category: cat(1),
    images: images(14, "photo-1545324418-cc1a3fa10c00"),
    createdAt: "2026-09-25T09:00:00",
  },
];
