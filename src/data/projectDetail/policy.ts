import { Landmark, Percent, Armchair, Gem } from "lucide-react";
import policyImg1 from "../../assets/images/policy/policy-1.png";

// TODO: thay bằng dữ liệu gọi từ API theo :id (policy_images + nội dung chính sách)
export const PROJECT = { name: "Aurelia Riverside" };

// Ảnh chính sách bán hàng (policy_images), xếp dọc theo thứ tự
export const POLICY_IMAGES: string[] = [policyImg1];

export const HIGHLIGHTS = [
  { icon: Percent, tag: "Thanh toán sớm", title: "Chiết khấu 8%", sub: "Tối ưu giá trị đầu tư", subTone: "text-primary-600", iconBg: "bg-primary-100 text-primary-600", desc: "Áp dụng khi thanh toán 95% giá trị căn hộ trong 15 ngày từ ngày ký hợp đồng." },
  { icon: Landmark, tag: "Hỗ trợ tài chính", title: "0% trong 24 tháng", sub: "Nhẹ áp lực dòng tiền", subTone: "text-success", iconBg: "bg-success/10 text-success", desc: "Chủ đầu tư hỗ trợ lãi suất và phí trả nợ trước hạn trong thời gian ưu đãi." },
  { icon: Armchair, tag: "Quà tặng bàn giao", title: "Gói nội thất 250 triệu", sub: "Sẵn sàng để an cư", subTone: "text-warning", iconBg: "bg-warning/10 text-warning", desc: "Gói thiết bị bếp và nội thất rời tuyển chọn theo tiêu chuẩn Aurelia Living." },
  { icon: Gem, tag: "Khách hàng thân thiết", title: "Ưu đãi thêm 1%", sub: "Đặc quyền Aurelia", subTone: "text-primary-600", iconBg: "bg-primary-100 text-primary-600", desc: "Dành cho khách hàng đã sở hữu sản phẩm hoặc được giới thiệu bởi cư dân hiện hữu." },
];

export const SCHEDULE = [
  { no: "01", title: "Đặt cọc", note: "Khoản cọc được khấu trừ vào đợt thanh toán đầu tiên.", when: "Tại thời điểm xác nhận", value: "100 triệu đồng" },
  { no: "02", title: "Ký thỏa thuận đặt mua", note: "Đã bao gồm tiền đặt cọc.", when: "Trong vòng 07 ngày", value: "10%" },
  { no: "03", title: "Ký hợp đồng mua bán", note: "Hoàn tất hồ sơ và lựa chọn phương án tài chính.", when: "Trong vòng 30 ngày", value: "20%" },
  { no: "04", title: "Thanh toán theo tiến độ", note: "Mỗi đợt 10%, thông báo trước tối thiểu 10 ngày.", when: "Mỗi 03 tháng / 5 đợt", value: "50%" },
  { no: "05", title: "Nhận bàn giao & sổ hồng", note: "15% khi bàn giao, 5% khi nhận giấy chứng nhận.", when: "Dự kiến Quý IV/2028", value: "20%", last: true },
];

export const LOAN_STATS = [
  ["70%", "Tối đa giá trị hợp đồng"],
  ["24", "Tháng hỗ trợ lãi suất"],
  ["36", "Tháng ân hạn nợ gốc"],
];

export const CONDITIONS = [
  "Khách hàng hoàn tất tiền đặt cọc và ký hồ sơ đúng thời hạn ghi trên phiếu xác nhận.",
  "Mỗi căn hộ chỉ áp dụng một phương án thanh toán; không quy đổi ưu đãi quà tặng thành tiền mặt.",
  "Ưu đãi khách hàng thân thiết cần xác minh giao dịch trước đó hoặc mã giới thiệu hợp lệ.",
  "Chính sách vay phụ thuộc kết quả thẩm định tín dụng và quy định tại từng ngân hàng liên kết.",
  "Trong trường hợp thay đổi, văn bản chính thức do chủ đầu tư phát hành là căn cứ ưu tiên.",
];
