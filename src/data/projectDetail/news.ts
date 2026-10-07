// TODO: thay bằng dữ liệu gọi từ API theo :id (bảng news + category_new)
export const PROJECT = {
  name: "Aurelia Riverside",
  image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80",
};

export const IMG = (id: string) => `https://images.unsplash.com/${id}?w=900&q=80`;

export const POSTS = [
  { id: 1, category: "Tiến độ", title: "Cập nhật tiến độ tháng 10/2026: Hai tháp vượt cao độ kế hoạch", summary: "Công trường đạt 68% tổng thể, triển khai đồng thời kết cấu tầng 30, mặt dựng và hệ MEP.", date: "01/10/2026", read: 5, image: IMG("photo-1541888946425-d81bb19240f5") },
  { id: 2, category: "Sự kiện", title: "Không gian trải nghiệm Aurelia Riverside chính thức mở cửa cuối tuần này", summary: "Khách mời tham quan sa bàn tương tác, căn hộ mẫu và nhận tư vấn riêng theo nhu cầu.", date: "28/09/2026", read: 4, image: IMG("photo-1511578314322-379afb476865") },
  { id: 3, category: "Chính sách", title: "Ưu đãi thanh toán sớm đến 10% cho bộ sưu tập hướng sông", summary: "Cập nhật các phương án tài chính linh hoạt, lịch thanh toán và quyền lợi dành cho khách hàng tháng 10.", date: "24/09/2026", read: 6, image: IMG("photo-1512917774080-9991f1c4c750") },
  { id: 4, category: "Thị trường", title: "Hạ tầng Thủ Thiêm tăng tốc, kết nối khu Đông bước vào chu kỳ mới", summary: "Những trục giao thông chiến lược đang định hình lại khả năng tiếp cận và giá trị bất động sản ven sông.", date: "19/09/2026", read: 7, image: IMG("photo-1480714378408-67cf0d13bc1b") },
  { id: 5, category: "Tiện ích", title: "Một ngày sống wellness tại Aurelia: Từ vườn thiền đến hồ bơi vô cực", summary: "Khám phá chuỗi tiện ích được thiết kế theo nhịp sinh hoạt của cộng đồng cư dân đa thế hệ.", date: "12/09/2026", read: 5, image: IMG("photo-1600607687939-ce8a6c25118c") },
  { id: 6, category: "Cộng đồng", title: "Chọn một mái nhà bên sông: Câu chuyện của gia đình chị Minh Anh", summary: "Tầm nhìn dài hạn, môi trường cho trẻ nhỏ và cộng đồng riêng tư là ba lý do dẫn đến quyết định.", date: "06/09/2026", read: 8, image: IMG("photo-1511895426328-dc8714191300") },
];

export const CATEGORIES: [string, number][] = [
  ["Thị trường", 326], ["Dự án", 284], ["Pháp lý", 168], ["Đầu tư", 142],
  ["Quy hoạch & hạ tầng", 119], ["Phong cách sống", 96], ["Sự kiện", 73],
];

export const TAGS = ["#ThủThiêm", "#CănHộ", "#PhápLý", "#ĐầuTư", "#Metro", "#LãiSuất", "#NhàỞ"];
