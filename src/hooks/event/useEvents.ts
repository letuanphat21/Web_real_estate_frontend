import { useEffect, useState } from "react";
import eventService from "../../services/eventService";
import { getErrorMessage } from "../../api/http";
import type { GetEventsParams } from "../../api/event.api";
import type { Event, PageResponse } from "../../types/event.types";

const emptyPage = (size: number): PageResponse<Event> => ({
  content: [],
  totalElements: 0,
  totalPages: 1,
  number: 0,
  size,
});

export function useEvents({ filter, sort, page, size }: GetEventsParams) {
  const [data, setData] = useState<PageResponse<Event>>(emptyPage(size));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);

    eventService
      .getEvents({ filter, sort, page, size })
      .then((res) => !ignore && setData(res))
      .catch((err) => {
        if (ignore) return;
        setData(emptyPage(size));
        setError(getErrorMessage(err));
      })
      .finally(() => !ignore && setLoading(false));

    return () => {
      ignore = true;
    };
  }, [filter, sort, page, size, reloadKey]);

  const refetch = () => setReloadKey((k) => k + 1);

  return { data, loading, error, refetch };
}
