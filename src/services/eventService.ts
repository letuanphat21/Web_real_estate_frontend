import eventApi from "../api/event.api";
import type { GetEventsParams } from "../api/event.api";
import type { Event, EventComment, PageResponse } from "../types/event.types";

// Service: lớp nghiệp vụ giữa hook và API (chuẩn hóa tham số, dữ liệu trả về)
function getEvents(params: GetEventsParams): Promise<PageResponse<Event>> {
  return eventApi.getEvents({
    ...params,
    filter: { ...params.filter, keyword: params.filter.keyword.trim() },
  });
}

async function getEventById(id: number): Promise<Event> {
  const event = await eventApi.getEventById(id);
  return { ...event, images: event.images ?? [] };
}

function getComments(
  eventId: number,
  page = 0,
  size = 10
): Promise<PageResponse<EventComment>> {
  return eventApi.getComments(eventId, page, size);
}

const eventService = { getEvents, getEventById, getComments };
export default eventService;
