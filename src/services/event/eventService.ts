import BaseService from "../base/BaseService";
import { toPage } from "../../api/http";
import { EVENT_SORT_PARAM } from "../../types/event/event.types";
import type {
  Event,
  EventComment,
  EventFilter,
  EventSort,
  PageResponse,
} from "../../types/event/event.types";

export interface GetEventsParams {
  filter: EventFilter;
  sort: EventSort;
  page: number;
  size: number;
}

class EventService extends BaseService {
  constructor() {
    super("/events", { auth: false });
  }

  // GET /events?keyword=&status=&page=&size=&sort=
  async getEvents({
    filter,
    sort,
    page,
    size,
  }: GetEventsParams): Promise<PageResponse<Event>> {
    const res = await this.getPage<Event>({
      keyword: filter.keyword.trim(),
      status: filter.status,
      page,
      size,
      sort: EVENT_SORT_PARAM[sort],
    });
    return toPage(res);
  }

  // GET /events/{id}
  async getEventById(id: number): Promise<Event> {
    const event = await this.getById<Event>(id);
    return { ...event, images: event.images ?? [] };
  }

  // GET /events/{id}/comments
  async getComments(
    eventId: number,
    page = 0,
    size = 10
  ): Promise<PageResponse<EventComment>> {
    const res = await this.getPage<EventComment>(
      { page, size, sort: "createdAt,desc" },
      `${eventId}/comments`
    );
    return toPage(res);
  }
}

const eventService = new EventService();
export default eventService;
