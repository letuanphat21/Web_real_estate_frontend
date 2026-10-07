import type { DocumentCategory, KnowledgeDocument } from "../types/document.types";

// TODO: thay bằng dữ liệu gọi từ API
const img = (id: string): string => `https://images.unsplash.com/${id}?w=900&q=80`;

export const MOCK_CATEGORIES: DocumentCategory[] = [
  { id: 1, name: "Pháp lý bất động sản", description: "Sổ hồng, hợp đồng, quy hoạch và các rủi ro pháp lý cần kiểm tra.", createdAt: "2026-01-05T08:00:00" },
  { id: 2, name: "Mua bán & chuyển nhượng", description: "Quy trình đặt cọc, công chứng, sang tên và nghĩa vụ thuế.", createdAt: "2026-01-05T08:00:00" },
  { id: 3, name: "Vay mua nhà", description: "Lãi suất, hồ sơ vay và cách tối ưu dòng tiền trả nợ.", createdAt: "2026-01-06T08:00:00" },
  { id: 4, name: "Đất nền", description: "Kiểm tra quy hoạch, hạ tầng và thanh khoản trước khi xuống tiền.", createdAt: "2026-01-07T08:00:00" },
  { id: 5, name: "BĐS nghỉ dưỡng", description: "Mô hình vận hành, lợi suất cho thuê và pháp lý sở hữu.", createdAt: "2026-01-08T08:00:00" },
  { id: 6, name: "Phong cách sống", description: "Nội thất, cộng đồng cư dân và trải nghiệm sống tại dự án.", createdAt: "2026-01-09T08:00:00" },
];

const make = (
  id: number,
  categoryId: number,
  title: string,
  summary: string,
  thumb: string,
  createdAt: string,
  updatedAt: string,
  gallery: string[] = []
): KnowledgeDocument => ({
  id,
  title,
  summary,
  categoryId,
  thumbnail: img(thumb),
  content: summary,
  createdAt,
  updatedAt,
  images: gallery.map((g, i) => ({
    id: id * 10 + i,
    documentId: id,
    imageUrl: img(g),
    createdAt,
  })),
});

export const MOCK_DOCUMENTS: KnowledgeDocument[] = [
  make(1, 1, "7 bước kiểm tra pháp lý trước khi xuống tiền mua bất động sản", "Từ sổ hồng, quy hoạch đến tranh chấp: danh sách kiểm tra giúp người mua nhận diện rủi ro trước khi đặt cọc.", "photo-1480714378408-67cf0d13bc1b", "2026-10-01T09:00:00", "2026-10-02T10:00:00", ["photo-1545324418-cc1a3fa10c00"]),
  make(2, 2, "Hợp đồng đặt cọc mua căn hộ: 10 điều khoản phải đọc kỹ", "Những điều khoản về phạt cọc, tiến độ và bàn giao thường bị bỏ sót khi ký hợp đồng đặt cọc.", "photo-1545324418-cc1a3fa10c00", "2026-09-28T09:00:00", "2026-09-28T09:00:00"),
  make(3, 1, "Thế nào là sổ hồng lâu dài và khác gì với sở hữu có thời hạn?", "Phân biệt các hình thức sở hữu để tránh nhầm lẫn khi so sánh giá giữa các dự án.", "photo-1613490493576-7fde63acd811", "2026-09-25T09:00:00", "2026-09-26T09:00:00"),
  make(4, 3, "Cách tính khoản vay mua nhà 1,5 tỷ trong 20 năm", "Mô phỏng lãi suất thả nổi, ân hạn gốc và dòng tiền hàng tháng để chọn gói vay phù hợp.", "photo-1512917774080-9991f1c4c750", "2026-09-22T09:00:00", "2026-09-22T09:00:00"),
  make(5, 3, "Lãi suất thả nổi và những điều cần biết khi vay mua nhà năm 2026", "Hiểu biên độ lãi suất, thời gian ưu đãi và phí trả nợ trước hạn để không bị bất ngờ.", "photo-1486406146926-c627a92ad1ab", "2026-09-19T09:00:00", "2026-09-20T09:00:00"),
  make(6, 4, "Đất nền vùng ven: 5 dấu hiệu quy hoạch có thể thay đổi", "Cách tra cứu quy hoạch, thông báo thu hồi đất và đánh giá hạ tầng kết nối trước khi mua.", "photo-1500382017468-9049fed747ef", "2026-09-15T09:00:00", "2026-09-15T09:00:00"),
  make(7, 5, "BĐS nghỉ dưỡng: tính lợi suất cho thuê thực tế thế nào?", "Công thức tính lợi suất ròng sau phí vận hành, công suất phòng và chia sẻ doanh thu với đơn vị quản lý.", "photo-1566073771259-6a8506099945", "2026-09-12T09:00:00", "2026-09-13T09:00:00"),
  make(8, 6, "Check-list trải nghiệm căn hộ mẫu: những điều nên hỏi tư vấn viên", "Từ chất liệu hoàn thiện, hướng gió đến phí quản lý — danh sách giúp bạn xem nhà mẫu hiệu quả hơn.", "photo-1600607687939-ce8a6c25118c", "2026-09-08T09:00:00", "2026-09-08T09:00:00", ["photo-1600585154340-be6161a56a0c"]),
  make(9, 2, "Thuế, phí khi chuyển nhượng căn hộ: bảng tổng hợp mới nhất", "Thuế thu nhập cá nhân, lệ phí trước bạ và phí công chứng được tính như thế nào.", "photo-1554224155-6726b3ff858f", "2026-09-04T09:00:00", "2026-09-05T09:00:00"),
  make(10, 4, "Thanh khoản đất nền: vì sao cùng một khu nhưng giá chênh nhau?", "Yếu tố mặt tiền, pháp lý và tiện ích ảnh hưởng đến khả năng bán lại của lô đất.", "photo-1472214103451-9374bd1c798e", "2026-08-30T09:00:00", "2026-08-30T09:00:00"),
  make(11, 5, "Pháp lý condotel và biệt thự nghỉ dưỡng: người mua cần biết gì", "Thời hạn sử dụng đất, quyền sang nhượng và rủi ro khi chủ đầu tư thay đổi mô hình khai thác.", "photo-1571896349842-33c89424de2d", "2026-08-26T09:00:00", "2026-08-27T09:00:00"),
  make(12, 6, "Sống trong cộng đồng cư dân: 6 tiện ích quyết định chất lượng sống", "Không gian chung, an ninh và vận hành là những yếu tố khó thấy trên bản vẽ nhưng quyết định trải nghiệm.", "photo-1511578314322-379afb476865", "2026-08-20T09:00:00", "2026-08-20T09:00:00"),
];
