import { STAT_CARDS } from "./statCards";
import { MOCK_BOOKINGS } from "../../data/mockBookings";
import type { BookingStatus } from "../../types/booking.types";

type Props = {
  tab: BookingStatus | "ALL";
  setTab: (tab: BookingStatus | "ALL") => void;
  setPage: (page: number) => void;
  counts: Record<string, number>;
};

export default function BookingStats({ tab, setTab, setPage, counts }: Props) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
      {STAT_CARDS.map((c) => (
        <button
          key={c.key}
          onClick={() => { setTab(c.key); setPage(0); }}
          className={`rounded-2xl border bg-blue-50 p-4 text-left shadow-sm transition hover:-translate-y-0.5 ${tab === c.key ? "border-primary-300 ring-1 ring-primary-300" : "border-blue-100"}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-body">{c.label}</span>
            <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${c.tone}`}>{c.icon}</span>
          </div>
          <p className="mt-3 text-3xl font-bold text-heading">{counts[c.key]}</p>
          <p className="mt-1 text-[11px] text-muted">
            {c.key === "PENDING" ? `${MOCK_BOOKINGS.filter((b) => b.status === "PENDING" && !b.assignee).length} ${c.note}` : c.note}
          </p>
        </button>
      ))}
    </div>
  );
}
