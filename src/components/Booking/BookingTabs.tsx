import { BOOKING_STATUS_META, BOOKING_STATUS_ORDER } from "../../types/booking.types";
import type { BookingStatus } from "../../types/booking.types";

type Props = {
  tab: BookingStatus | "ALL";
  setTab: (tab: BookingStatus | "ALL") => void;
  setPage: (page: number) => void;
  counts: Record<string, number>;
};

export default function BookingTabs({ tab, setTab, setPage, counts }: Props) {
  return (
    <div className="mt-8 flex gap-6 overflow-x-auto border-b border-line">
      {[{ key: "ALL" as const, label: "Tất cả" }, ...BOOKING_STATUS_ORDER.map((s) => ({ key: s, label: BOOKING_STATUS_META[s].label }))].map((t) => (
        <button
          key={t.key}
          onClick={() => { setTab(t.key); setPage(0); }}
          className={`flex items-center gap-2 whitespace-nowrap border-b-2 pb-3 text-sm font-medium ${tab === t.key ? "border-primary-600 text-primary-600" : "border-transparent text-heading"}`}
        >
          {t.label}
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${tab === t.key ? "bg-primary-100 text-primary-700" : "text-muted"}`}>{counts[t.key]}</span>
        </button>
      ))}
    </div>
  );
}
