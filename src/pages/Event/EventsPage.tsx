import { useState } from "react";
import EventsHero from "../../components/Event/EventsHero";
import EventList from "../../components/Event/EventList";
import { useEvents } from "../../hooks/event/useEvents";
import {
  DEFAULT_EVENT_FILTER,
  EVENT_SORT,
  type EventFilter,
  type EventSort,
} from "../../types/event.types";

const PAGE_SIZE = 6;

export default function EventsPage() {
  const [filter, setFilter] = useState(DEFAULT_EVENT_FILTER);
  const [sort, setSort] = useState<EventSort>(EVENT_SORT.NEWEST);
  const [page, setPage] = useState(0);

  const { data, loading, error, refetch } = useEvents({
    filter,
    sort,
    page,
    size: PAGE_SIZE,
  });

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
        error={error}
        onRetry={refetch}
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
