import { MOCK_EVENTS } from "../data/mockEvents";
import {
  MOCK_COMMENTS,
  MOCK_CURRENT_USER,
  MOCK_SPEAKERS,
} from "../data/mockEventDetail";
import { EVENT_SORT } from "../types/event.types";
import type {
  Event,
  EventComment,
  EventFilter,
  EventSort,
  EventSpeaker,
  PageResponse,
} from "../types/event.types";

interface GetEventsParams {
  filter: EventFilter;
  sort: EventSort;
  page?: number;
  size?: number;
}

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const toTime = (iso: string): number => new Date(iso).getTime();

let comments: EventComment[] = [...MOCK_COMMENTS];
const joinedEventIds = new Set<number>();

async function getEvents({
  filter,
  sort,
  page = 0,
  size = 6,
}: GetEventsParams): Promise<PageResponse<Event>> {
  await delay(300);

  const keyword = filter.keyword.trim().toLowerCase();
  const from = filter.from
    ? new Date(`${filter.from}T00:00:00`).getTime()
    : null;
  const to = filter.to ? new Date(`${filter.to}T23:59:59`).getTime() : null;

  const list = MOCK_EVENTS.filter((e) => {
    if (keyword && !`${e.title} ${e.location}`.toLowerCase().includes(keyword))
      return false;
    if (filter.category && e.category !== filter.category) return false;
    if (filter.status && e.status !== filter.status) return false;
    if (from !== null && toTime(e.endTime) < from) return false;
    if (to !== null && toTime(e.startTime) > to) return false;
    return true;
  }).sort((a, b) => {
    if (sort === EVENT_SORT.SOONEST)
      return toTime(a.startTime) - toTime(b.startTime);
    if (sort === EVENT_SORT.POPULAR) return b.memberCount - a.memberCount;
    return toTime(b.createdAt) - toTime(a.createdAt);
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
  await delay(200);
  return MOCK_EVENTS.find((e) => e.id === Number(id)) ?? null;
}

async function getSpeakers(_eventId: number): Promise<EventSpeaker[]> {
  await delay(150);
  return MOCK_SPEAKERS;
}

async function getComments(eventId: number): Promise<EventComment[]> {
  await delay(200);
  return comments
    .filter((c) => c.eventId === eventId && c.active)
    .sort((a, b) => toTime(b.createdAt) - toTime(a.createdAt));
}

async function addComment(
  eventId: number,
  content: string
): Promise<EventComment> {
  await delay(300);
  const newComment: EventComment = {
    id: Date.now(),
    eventId,
    user: MOCK_CURRENT_USER,
    content,
    createdAt: new Date().toISOString(),
    active: true,
  };
  comments = [newComment, ...comments];
  return newComment;
}

async function deleteComment(commentId: number): Promise<void> {
  await delay(200);
  comments = comments.map((c) =>
    c.id === commentId ? { ...c, active: false } : c
  );
}

async function joinEvent(eventId: number): Promise<void> {
  await delay(400);
  joinedEventIds.add(eventId);
}

async function isJoined(eventId: number): Promise<boolean> {
  return joinedEventIds.has(eventId);
}

const eventService = {
  getEvents,
  getEventById,
  getSpeakers,
  getComments,
  addComment,
  deleteComment,
  joinEvent,
  isJoined,
};
export default eventService;
