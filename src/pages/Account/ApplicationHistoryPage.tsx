import { useState } from "react";
import ApplicationHistoryHeader from "../../components/ApplicationHistory/ApplicationHistoryHeader";
import ApplicationStats from "../../components/ApplicationHistory/ApplicationStats";
import UpcomingInterviewCard from "../../components/ApplicationHistory/UpcomingInterviewCard";
import ApplicationTabs from "../../components/ApplicationHistory/ApplicationTabs";
import ApplicationToolbar from "../../components/ApplicationHistory/ApplicationToolbar";
import ApplicationList from "../../components/ApplicationHistory/ApplicationList";
import ToastProvider from "../../components/common/Toast";
import { useToast } from "../../components/common/toastContext";
import {
  countByStatus,
  filterApplications,
  type ApplicationQuery,
} from "../../components/ApplicationHistory/applicationHistoryUtils";
import {
  MOCK_APPLICATION_HISTORY,
  MOCK_UPCOMING_INTERVIEW,
} from "../../data/mockApplicationHistory";

const TITLE = "Lịch sử ứng tuyển | NovaLand Hub";
const DEFAULT_QUERY: ApplicationQuery = { status: "ALL", keyword: "", range: "3m", sort: "NEWEST" };

/**
 * UI tạm thời chạy trên mock data, chưa gắn đăng nhập.
 * TODO: khi có BE/auth, lấy hồ sơ của người dùng đăng nhập và bảo vệ route.
 */
function ApplicationHistory() {
  const toast = useToast();
  const [items, setItems] = useState(MOCK_APPLICATION_HISTORY);
  const [query, setQuery] = useState<ApplicationQuery>(DEFAULT_QUERY);
  const [page, setPage] = useState(0);

  const update = (patch: Partial<ApplicationQuery>) => {
    setQuery((q) => ({ ...q, ...patch }));
    setPage(0);
  };

  const filtered = filterApplications(items, query);
  const counts = countByStatus(items);
  const hasFilter = query.status !== "ALL" || query.keyword !== "" || query.range !== DEFAULT_QUERY.range;

  const handleWithdraw = (id: number) => {
    const target = items.find((a) => a.id === id);
    if (!target || !window.confirm(`Rút hồ sơ ứng tuyển "${target.jobTitle}"?`)) return;
    // TODO: gọi API rút hồ sơ
    setItems((prev) => prev.filter((a) => a.id !== id));
    toast.show("Đã rút hồ sơ");
  };

  // chỉ hiện lịch phỏng vấn khi đơn tương ứng còn đang ở trạng thái hẹn phỏng vấn
  const interview = items.some((a) => a.id === MOCK_UPCOMING_INTERVIEW.applicationId && a.status === "INTERVIEW")
    ? MOCK_UPCOMING_INTERVIEW
    : null;

  return (
    <>
      <title>{TITLE}</title>
      <meta name="robots" content="noindex" />

      {/* Khung tài khoản (sidebar, bố cục) do AccountLayout cung cấp */}
      <div className="space-y-5">
        <ApplicationHistoryHeader />
        <ApplicationStats items={items} />
        <UpcomingInterviewCard interview={interview} />

        <ApplicationTabs value={query.status} counts={counts} onChange={(status) => update({ status })} />
        <ApplicationToolbar
          keyword={query.keyword}
          onKeywordChange={(keyword) => update({ keyword })}
          range={query.range}
          onRangeChange={(range) => update({ range })}
          sort={query.sort}
          onSortChange={(sort) => update({ sort })}
        />

        <ApplicationList
          items={filtered}
          page={page}
          onPageChange={(p) => {
            setPage(p);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onWithdraw={handleWithdraw}
          hasFilter={hasFilter}
          onClearFilter={() => update({ status: "ALL", keyword: "", range: DEFAULT_QUERY.range })}
        />
      </div>
    </>
  );
}

export default function ApplicationHistoryPage() {
  return (
    <ToastProvider>
      <ApplicationHistory />
    </ToastProvider>
  );
}
