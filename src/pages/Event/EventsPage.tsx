import { useEffect, useState } from "react";
import EventsHero from "../../components/Event/EventsHero";
import EventList from "../../components/Event/EventList";
import eventService from "../../services/eventService";
import {
  DEFAULT_EVENT_FILTER,
  EVENT_SORT,
  type Event,
  type EventFilter,
  type EventSort,
  type PageResponse,
} from "../../types/event.types";

const PAGE_SIZE = 6;

export default function EventsPage() {
  const [filter, setFilter] = useState(DEFAULT_EVENT_FILTER);
  const [sort, setSort] = useState<EventSort>(EVENT_SORT.NEWEST);
  const [page, setPage] = useState(0);

  const [data, setData] = useState<PageResponse<Event>>({
    content: [],
    totalElements: 0,
    totalPages: 1,
    number: 0,
    size: PAGE_SIZE,
  });
  const [loading, setLoading] = useState(true);

  // Gọi lại dữ liệu mỗi khi filter / sort / page thay đổi
  useEffect(() => {
    let ignore = false; // tránh kết quả cũ ghi đè khi người dùng đổi nhanh
    setLoading(true);

    eventService
      .getEvents({ filter, sort, page, size: PAGE_SIZE })
      .then((res) => !ignore && setData(res))
      .catch((err) => console.error("Lỗi tải sự kiện:", err))
      .finally(() => !ignore && setLoading(false));

    return () => {
      ignore = true;
    };
  }, [filter, sort, page]);

  const handleSearch = (newFilter: EventFilter) => {
    setFilter(newFilter);
    setPage(0);
  };

  const handleSortChange = (newSort: EventSort) => {
    setSort(newSort);
    setPage(0);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <EventsHero filter={filter} onSearch={handleSearch} />
      <EventList
        events={data.content}
        total={data.totalElements}
        loading={loading}
        sort={sort}
        onSortChange={handleSortChange}
        page={page}
        totalPages={data.totalPages}
        onPageChange={handlePageChange}
        onReset={() => handleSearch(DEFAULT_EVENT_FILTER)}
      />
    </>
  );
}
