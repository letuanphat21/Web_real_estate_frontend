import { formatShortDate } from "./applicationHistoryUtils";
import type { ApplicationHistoryItem } from "../../types/applicationHistory.types";

/** Tiến trình 3 bước: Đã gửi → Đã xem → Hẹn phỏng vấn. Bước "Đã xem" đỏ khi hồ sơ không phù hợp. */
export default function ApplicationTimeline({ item }: { item: ApplicationHistoryItem }) {
  const rejected = item.status === "REJECTED";
  const steps = [
    { label: "Đã gửi", at: item.appliedAt, danger: false },
    { label: "Đã xem", at: item.viewedAt, danger: rejected },
    { label: "Hẹn phỏng vấn", at: item.interviewAt, danger: false },
  ];

  return (
    <ol className="grid grid-cols-3 px-2" aria-label="Tiến trình hồ sơ">
      {steps.map((s, i) => {
        const done = !!s.at;
        const leftActive = i > 0 && done;
        const rightActive = i < steps.length - 1 && !!steps[i + 1].at;
        return (
          <li key={s.label} className="relative flex flex-col items-center pt-0.5 text-center">
            {i > 0 && (
              <span
                aria-hidden
                className={`absolute left-0 top-[5px] h-0.5 w-1/2 ${leftActive ? "bg-primary-600" : "bg-gray-200"}`}
              />
            )}
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className={`absolute right-0 top-[5px] h-0.5 w-1/2 ${rightActive ? "bg-primary-600" : "bg-gray-200"}`}
              />
            )}
            <span
              aria-hidden
              className={`relative z-10 h-2.5 w-2.5 rounded-full ${
                done ? (s.danger ? "bg-red-500" : "bg-primary-600") : "bg-gray-300"
              }`}
            />
            <span className={`mt-2 text-[11px] font-semibold ${done ? "text-heading" : "text-gray-400"}`}>
              {s.label}
            </span>
            <span className="text-[10px] text-gray-400">{s.at ? formatShortDate(s.at) : "—"}</span>
          </li>
        );
      })}
    </ol>
  );
}
