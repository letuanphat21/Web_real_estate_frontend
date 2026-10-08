import { useEffect, useState } from "react";
import eventService from "../../services/eventService";
import { getErrorMessage } from "../../api/http";
import type { EventComment } from "../../types/event.types";

export function useEventComments(eventId: number, size = 50) {
  const [comments, setComments] = useState<EventComment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!Number.isInteger(eventId) || eventId <= 0) {
      setLoading(false);
      return;
    }

    let ignore = false;
    setLoading(true);
    setError(null);

    eventService
      .getComments(eventId, 0, size)
      .then((res) => !ignore && setComments(res.content))
      .catch((err) => !ignore && setError(getErrorMessage(err)))
      .finally(() => !ignore && setLoading(false));

    return () => {
      ignore = true;
    };
  }, [eventId, size]);

  return { comments, setComments, loading, error };
}
