export type EventStatus = "UPCOMING" | "ONGOING" | "ENDED" | "CANCELLED";

export const EVENT_STATUS = {
  UPCOMING: "UPCOMING",
  ONGOING: "ONGOING",
  ENDED: "ENDED",
  CANCELLED: "CANCELLED",
} as const;

export const EVENT_STATUS_META: Record<
  EventStatus,
  { label: string; dot: string; text: string }
> = {
  UPCOMING: {
    label: "Sắp diễn ra",
    dot: "bg-amber-500",
    text: "text-amber-600",
  },
  ONGOING: { label: "Đang diễn ra", dot: "bg-success", text: "text-success" },
  ENDED: { label: "Đã kết thúc", dot: "bg-gray-400", text: "text-body" },
  CANCELLED: { label: "Đã hủy", dot: "bg-danger", text: "text-danger" },
};

// Loại sự kiện
export type EventCategory =
  | "PROJECT_LAUNCH"
  | "MODEL_HOUSE_TOUR"
  | "INVESTMENT_SEMINAR"
  | "LEGAL_WEBINAR"
  | "BROKER_TRAINING"
  | "SITE_VISIT";

export const EVENT_CATEGORY = {
  PROJECT_LAUNCH: "PROJECT_LAUNCH",
  MODEL_HOUSE_TOUR: "MODEL_HOUSE_TOUR",
  INVESTMENT_SEMINAR: "INVESTMENT_SEMINAR",
  LEGAL_WEBINAR: "LEGAL_WEBINAR",
  BROKER_TRAINING: "BROKER_TRAINING",
  SITE_VISIT: "SITE_VISIT",
} as const;

export const EVENT_CATEGORY_LABEL: Record<EventCategory, string> = {
  PROJECT_LAUNCH: "Mở bán dự án",
  MODEL_HOUSE_TOUR: "Tham quan nhà mẫu",
  INVESTMENT_SEMINAR: "Hội thảo đầu tư",
  LEGAL_WEBINAR: "Webinar pháp lý",
  BROKER_TRAINING: "Đào tạo môi giới",
  SITE_VISIT: "Tham quan thực địa",
};

export type EventSort = "NEWEST" | "SOONEST" | "POPULAR";

export const EVENT_SORT = {
  NEWEST: "NEWEST",
  SOONEST: "SOONEST",
  POPULAR: "POPULAR",
} as const;

export const EVENT_SORT_LABEL: Record<EventSort, string> = {
  NEWEST: "Mới nhất",
  SOONEST: "Sắp diễn ra trước",
  POPULAR: "Nhiều người tham gia",
};

//  Dữ liệu backend trả về
export interface UserSummary {
  id: number;
  fullName: string;
  avatarUrl?: string;
}

export interface EventImage {
  id: number;
  imageUrl: string;
  createdAt: string;
}

export interface EventComment {
  id: number;
  eventId: number;
  user: UserSummary;
  content: string;
  createdAt: string;
  active: boolean;
}

export interface EventMember {
  id: number;
  eventId: number;
  user: UserSummary;
  joinedAt: string;
}

export interface Event {
  id: number;
  organizer: UserSummary;
  title: string;
  content: string;
  location: string;
  maxAttendees: number;
  startTime: string;
  endTime: string;
  status: EventStatus;
  category?: EventCategory;
  images: EventImage[];
  memberCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

//  Bộ lọc & phân trang
export interface EventFilter {
  keyword: string;
  category: EventCategory | "";
  status: EventStatus | "";
  from: string;
  to: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export const DEFAULT_EVENT_FILTER: EventFilter = {
  keyword: "",
  category: "",
  status: "",
  from: "",
  to: "",
};
