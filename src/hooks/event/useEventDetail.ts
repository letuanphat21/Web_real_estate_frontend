import { useEffect, useState } from "react";
import eventService from "../../services/eventService";
import { getErrorMessage } from "../../api/http";
import type { Event } from "../../types/event.types";

export function useEventDetail(id: number) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!Number.isInteger(id) || id <= 0) {
      setLoading(false);
      setError("Sự kiện không hợp lệ");
      return;
    }

    let ignore = false;
    setLoading(true);
    setError(null);

    eventService
      .getEventById(id)
      .then((res) => !ignore && setEvent(res))
      .catch((err) => !ignore && setError(getErrorMessage(err)))
      .finally(() => !ignore && setLoading(false));

    return () => {
      ignore = true;
    };
  }, [id]);

  return { event, loading, error };
}
