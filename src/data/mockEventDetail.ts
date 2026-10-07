import type {
  EventComment,
  EventSpeaker,
  UserSummary,
} from "../types/event.types";

export const MOCK_CURRENT_USER: UserSummary = {
  id: 99,
  fullName: "Vũ Bùi",
  avatarUrl: "https://i.pravatar.cc/100?img=15",
};

export const MOCK_COMMENTS: EventComment[] = [
  {
    id: 1,
    eventId: 1,
    user: {
      id: 21,
      fullName: "Phạm Thu Trang",
      avatarUrl: "https://i.pravatar.cc/100?img=45",
    },
    content: "Sự kiện có hỗ trợ xe đưa đón từ trung tâm Quận 1 không ạ?",
    createdAt: "2026-10-06T20:15:00",
    active: true,
  },
  {
    id: 2,
    eventId: 1,
    user: {
      id: 1,
      fullName: "NovaLand Hub",
      avatarUrl: "https://i.pravatar.cc/100?img=68",
    },
    content:
      "Chào chị, BTC có xe đưa đón miễn phí lúc 8:30 tại Nhà hát Thành phố. Chị đăng ký xong sẽ nhận được thông tin chi tiết qua email nhé.",
    createdAt: "2026-10-06T21:02:00",
    active: true,
  },
  {
    id: 3,
    eventId: 1,
    user: {
      id: 22,
      fullName: "Đỗ Minh Khang",
      avatarUrl: "https://i.pravatar.cc/100?img=33",
    },
    content:
      "Mình đã tham dự đợt mở bán trước, tổ chức rất chuyên nghiệp. Mong chờ bộ sưu tập Sol!",
    createdAt: "2026-10-05T09:40:00",
    active: true,
  },
  {
    id: 4,
    eventId: 2,
    user: {
      id: 23,
      fullName: "Lê Hoàng Nam",
      avatarUrl: "https://i.pravatar.cc/100?img=52",
    },
    content: "Nhà mẫu mở cửa đến mấy giờ vậy BTC?",
    createdAt: "2026-10-06T10:00:00",
    active: true,
  },
];

export const MOCK_SPEAKERS: EventSpeaker[] = [
  {
    id: 1,
    fullName: "Nguyễn Minh Khôi",
    title: "Giám đốc kinh doanh dự án",
    avatarUrl: "https://i.pravatar.cc/200?img=12",
  },
  {
    id: 2,
    fullName: "Lê An Nhiên",
    title: "Kiến trúc sư trưởng",
    avatarUrl: "https://i.pravatar.cc/200?img=47",
  },
  {
    id: 3,
    fullName: "Trần Quốc Bảo",
    title: "Chuyên gia tài chính BĐS",
    avatarUrl: "https://i.pravatar.cc/200?img=59",
  },
];
