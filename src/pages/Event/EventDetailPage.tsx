import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EventDetailHero from "../../components/EventDetail/EventDetailHero";
import EventAbout from "../../components/EventDetail/EventAbout";
import EventSpeakers from "../../components/EventDetail/EventSpeakers";
import EventRegisterCard from "../../components/EventDetail/EventRegisterCard";
import EventLocation from "../../components/EventDetail/EventLocation";
import EventComments from "../../components/EventDetail/EventComments";
import eventService from "../../services/eventService";
import { MOCK_CURRENT_USER } from "../../data/mockEventDetail";
import type {
  Event,
  EventComment,
  EventSpeaker,
} from "../../types/event.types";

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const eventId = Number(id);

  const [event, setEvent] = useState<Event | null>(null);
  const [speakers, setSpeakers] = useState<EventSpeaker[]>([]);
  const [comments, setComments] = useState<EventComment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [joined, setJoined] = useState<boolean>(false);
  const [joining, setJoining] = useState<boolean>(false);

  // TODO: lấy từ authStore khi có đăng nhập
  const currentUser = MOCK_CURRENT_USER;

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    Promise.all([
      eventService.getEventById(eventId),
      eventService.getSpeakers(eventId),
      eventService.getComments(eventId),
      eventService.isJoined(eventId),
    ])
      .then(([ev, sp, cm, jn]) => {
        if (ignore) return;
        setEvent(ev);
        setSpeakers(sp);
        setComments(cm);
        setJoined(jn);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    window.scrollTo(0, 0);
    return () => {
      ignore = true;
    };
  }, [eventId]);

  const handleJoin = async () => {
    setJoining(true);
    try {
      await eventService.joinEvent(eventId);
      setJoined(true);
      setEvent((ev) => (ev ? { ...ev, memberCount: ev.memberCount + 1 } : ev));
    } finally {
      setJoining(false);
    }
  };

  const handleAddComment = async (content: string) => {
    const newComment = await eventService.addComment(eventId, content);
    setComments((list) => [newComment, ...list]);
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm("Xóa bình luận này?")) return;
    await eventService.deleteComment(commentId);
    setComments((list) => list.filter((c) => c.id !== commentId));
  };

  if (loading) {
    return (
      <div className="container mx-auto animate-pulse px-4 py-16 lg:px-8">
        <div className="h-4 w-48 rounded bg-primary-50" />
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="h-12 w-full rounded bg-primary-50" />
            <div className="h-12 w-2/3 rounded bg-primary-50" />
            <div className="h-24 w-full rounded bg-primary-50" />
          </div>
          <div className="aspect-[4/3] rounded-3xl bg-primary-50" />
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold text-heading">
          Không tìm thấy sự kiện
        </h1>
        <p className="mt-2 text-body">
          Sự kiện có thể đã bị xóa hoặc đường dẫn không đúng.
        </p>
        <Link
          to="/events"
          className="mt-6 inline-block rounded-full bg-primary-600 px-6 py-3 text-sm font-medium text-white"
        >
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <>
      <EventDetailHero event={event} />

      <section className="bg-page py-16">
        <div className="container mx-auto grid items-start gap-6 px-4 lg:grid-cols-[1fr_360px] lg:px-8">
          <div className="space-y-6">
            <EventAbout event={event} />
            <EventSpeakers speakers={speakers} />
            <EventComments
              comments={comments}
              currentUser={currentUser}
              onAdd={handleAddComment}
              onDelete={handleDeleteComment}
            />
          </div>
          <EventRegisterCard
            event={event}
            joined={joined}
            joining={joining}
            onJoin={handleJoin}
          />
        </div>
      </section>

      <EventLocation event={event} />
    </>
  );
}
