import { cleanParams, get, toPage } from "./http";
import type { SpringPage } from "./http";
import { EVENT_SORT_PARAM } from "../types/event.types";
import type {
  Event,
  EventComment,
  EventFilter,
  EventSort,
  PageResponse,
} from "../types/event.types";

export interface GetEventsParams {
  filter: EventFilter;
  sort: EventSort;
  page: number;
  size: number;
}

const eventApi = {
  // GET /events?keyword=&status=&page=&size=&sort=
  async getEvents({
    filter,
    sort,
    page,
    size,
  }: GetEventsParams): Promise<PageResponse<Event>> {
    const res = await get<SpringPage<Event>>("/events", {
      params: cleanParams({
        ...filter,
        page,
        size,
        sort: EVENT_SORT_PARAM[sort],
      }),
    });
    return toPage(res);
  },

  // GET /events/{id}
  getEventById(id: number) {
    return get<Event>(`/events/${id}`);
  },
  // GET /events/{id}/comments
  async getComments(
    eventId: number,
    page: number,
    size = 10
  ): Promise<PageResponse<EventComment>> {
    const res = await get<SpringPage<EventComment>>(
      `/events/${eventId}/comments`,
      {
        params: { page, size, sort: "createdAt,desc" },
      }
    );
    return toPage(res);
  },
};

export default eventApi;
