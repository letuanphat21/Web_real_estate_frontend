import { MOCK_EVENTS } from "../data/mockEvents";
import { EVENT_SORT } from "../types/event.types";
import type { Event, EventFilter, EventSort, PageResponse } from "../types/event.types";
// import axiosClient from "./axiosClient";

/**
 * Hiện đang dùng mock data, giả lập độ trễ như gọi API thật.
 * Khi có backend, bỏ comment đoạn "KHI CÓ API" và xóa phần mock bên dưới.
 */

interface GetEventsParams {
  filter: EventFilter;
  sort: EventSort;
  page?: number; // bắt đầu từ 0 (giống Spring)
  size?: number;
}

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const toTime = (iso: string): number => new Date(iso).getTime();

async function getEvents({
  filter,
  sort,
  page = 0,
  size = 6,
}: GetEventsParams): Promise<PageResponse<Event>> {
  // ===== KHI CÓ API =====
  // return axiosClient.get("/events", {
  //   params: { ...filter, sort, page, size },
  // });

  await delay(300);

  const keyword = filter.keyword.trim().toLowerCase();
  const from = filter.from ? new Date(`${filter.from}T00:00:00`).getTime() : null;
  const to = filter.to ? new Date(`${filter.to}T23:59:59`).getTime() : null;

  const list = MOCK_EVENTS.filter((e) => {
    if (keyword && !`${e.title} ${e.location}`.toLowerCase().includes(keyword)) return false;
    if (filter.category && e.category !== filter.category) return false;
    if (filter.status && e.status !== filter.status) return false;
    if (from !== null && toTime(e.endTime) < from) return false;
    if (to !== null && toTime(e.startTime) > to) return false;
    return true;
  }).sort((a, b) => {
    if (sort === EVENT_SORT.SOONEST) return toTime(a.startTime) - toTime(b.startTime);
    if (sort === EVENT_SORT.POPULAR) return b.memberCount - a.memberCount;
    return toTime(b.createdAt) - toTime(a.createdAt); // NEWEST
  });

  const totalElements = list.length;
  return {
    content: list.slice(page * size, page * size + size),
    totalElements,
    totalPages: Math.max(1, Math.ceil(totalElements / size)),
    number: page,
    size,
  };
}

async function getEventById(id: number | string): Promise<Event | null> {
  // return axiosClient.get(`/events/${id}`);
  await delay(200);
  return MOCK_EVENTS.find((e) => e.id === Number(id)) ?? null;
}

const eventService = { getEvents, getEventById };
export default eventService;