import { Link } from "react-router-dom";
import { CalendarDays, ExternalLink, FileText, MapPin, MessageSquareWarning, Wallet } from "lucide-react";
import ApplicationStatusBadge from "./ApplicationStatusBadge";
import ApplicationTimeline from "./ApplicationTimeline";
import ApplicationMenu from "./ApplicationMenu";
import { TONE_CLASS, canWithdraw } from "./applicationHistoryUtils";
import { buildJobPath } from "../Recruitment/jobUtils";
import { formatDate } from "../../utils/formatDate";
import type { ApplicationHistoryItem } from "../../types/applicationHistory.types";

/** Một hồ sơ đã nộp: thông tin vị trí, trạng thái, tiến trình và các thao tác */
export default function ApplicationCard({
  item,
  onWithdraw,
}: {
  item: ApplicationHistoryItem;
  onWithdraw: (id: number) => void;
}) {
  const jobPath = buildJobPath({ id: item.jobId, title: item.jobTitle });
  const withdrawable = canWithdraw(item.status);

  return (
    <article className="rounded-3xl border border-line bg-white p-4 shadow-sm md:p-5">
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${TONE_CLASS[item.company.tone]}`}
        >
          {item.company.initials}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-heading md:text-lg">{item.jobTitle}</h3>
          <p className="text-sm text-body">{item.company.name}</p>
          <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-body">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-gray-400" aria-hidden /> {item.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Wallet size={13} className="text-gray-400" aria-hidden /> {item.salaryText}
            </span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ApplicationStatusBadge status={item.status} />
          <ApplicationMenu
            jobPath={jobPath}
            jobTitle={item.jobTitle}
            onWithdraw={withdrawable ? () => onWithdraw(item.id) : undefined}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-primary-50/50 px-3 py-2 text-xs text-body">
        <span className="flex items-center gap-1.5">
          <CalendarDays size={13} className="text-gray-400" aria-hidden /> Ứng tuyển ngày {formatDate(item.appliedAt)}
        </span>
        <span className="flex items-center gap-1.5">
          <FileText size={13} className="text-gray-400" aria-hidden /> CV: {item.cv.fileName}
        </span>
      </div>

      <div className="mt-4">
        <ApplicationTimeline item={item} />
      </div>

      {item.feedback && (
        <p className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-xs text-red-500">
          <MessageSquareWarning size={14} className="mt-0.5 shrink-0" aria-hidden />
          <span>
            <strong className="font-semibold">Phản hồi:</strong> {item.feedback}
          </span>
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
        <div className="flex flex-wrap items-center gap-5 text-sm text-body">
          <Link to={jobPath} className="flex items-center gap-2 hover:text-primary-600">
            <ExternalLink size={14} aria-hidden /> Xem tin tuyển dụng
          </Link>
          <a href={item.cv.url} className="flex items-center gap-2 hover:text-primary-600">
            <FileText size={14} aria-hidden /> Xem CV
          </a>
        </div>
        {withdrawable ? (
          <button
            type="button"
            onClick={() => onWithdraw(item.id)}
            className="rounded-lg bg-red-50 px-4 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-red-500"
          >
            Rút hồ sơ
          </button>
        ) : (
          <span className="text-[11px] text-gray-400">Cập nhật {formatDate(item.updatedAt)}</span>
        )}
      </div>
    </article>
  );
}
