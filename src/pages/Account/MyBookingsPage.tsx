import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { MOCK_BOOKINGS } from "../../data/mockBookings";
import { BOOKING_STATUS_META, BOOKING_STATUS_ORDER, type BookingSort, type BookingStatus } from "../../types/booking.types";
import { fmtDateTime } from "../../components/Booking/bookingHelpers";
import BookingHeader from "../../components/Booking/BookingHeader";
import BookingStats from "../../components/Booking/BookingStats";
import BookingTabs from "../../components/Booking/BookingTabs";
import BookingFilters from "../../components/Booking/BookingFilters";
import BookingToolbar from "../../components/Booking/BookingToolbar";
import BookingSelectAll from "../../components/Booking/BookingSelectAll";
import BookingList from "../../components/Booking/BookingList";
import BookingPagination from "../../components/Booking/BookingPagination";

const PAGE_SIZE = 5;

export default function MyBookingsPage() {
  const [tab, setTab] = useState<BookingStatus | "ALL">("ALL");
  const [keyword, setKeyword] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [date, setDate] = useState("");
  const [sort, setSort] = useState<BookingSort>("NEWEST");
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const counts = useMemo(() => {
    const c: Record<string, number> = { ALL: MOCK_BOOKINGS.length };
    BOOKING_STATUS_ORDER.forEach((s) => (c[s] = MOCK_BOOKINGS.filter((b) => b.status === s).length));
    return c;
  }, []);

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    const list = MOCK_BOOKINGS.filter(
      (b) =>
        (tab === "ALL" || b.status === tab) &&
        (!propertyId || String(b.property.id) === propertyId) &&
        (!assigneeId || String(b.assignee?.id ?? 0) === assigneeId) &&
        (!date || b.requestTime.startsWith(date)) &&
        (!k ||
          b.code.toLowerCase().includes(k) ||
          b.customer.fullName.toLowerCase().includes(k) ||
          b.property.unitCode.toLowerCase().includes(k))
    );
    list.sort((a, b) => (sort === "NEWEST" ? b.requestTime.localeCompare(a.requestTime) : a.requestTime.localeCompare(b.requestTime)));
    return list;
  }, [tab, keyword, propertyId, assigneeId, date, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const rows = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const hasFilter = !!(keyword || propertyId || assigneeId || date);
  const allOnPage = rows.length > 0 && rows.every((r) => selected.has(r.id));

  const reset = () => { setKeyword(""); setPropertyId(""); setAssigneeId(""); setDate(""); setPage(0); };
  const toggle = (id: number) =>
    setSelected((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  const toggleAll = () =>
    setSelected((s) => {
      const n = new Set(s);
      rows.forEach((r) => (allOnPage ? n.delete(r.id) : n.add(r.id)));
      return n;
    });

  // Xuất CSV danh sách đang lọc (hoặc các dòng đã chọn)
  const exportCsv = () => {
    const src = selected.size ? filtered.filter((b) => selected.has(b.id)) : filtered;
    const head = ["Mã booking", "Khách hàng", "Mã khách", "Bất động sản", "Mã căn", "Trạng thái", "Người phụ trách", "Thời gian yêu cầu"];
    const lines = src.map((b) =>
      [b.code, b.customer.fullName, b.customer.code, b.property.projectName, b.property.unitCode, BOOKING_STATUS_META[b.status].label, b.assignee?.fullName ?? "Chưa phân công", fmtDateTime(b.requestTime)]
        .map((v) => `"${v}"`)
        .join(",")
    );
    const blob = new Blob(["﻿" + [head.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "danh-sach-booking.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (

    <div>
      <nav className="flex items-center gap-3 text-xs text-muted">
        <span>Tài khoản</span> <ChevronRight size={12} />
        <span className="font-semibold text-primary-600">Danh sách booking</span>
      </nav>

      <BookingHeader onExport={exportCsv} />

      {/* Thống kê */}
      <BookingStats tab={tab} setTab={setTab} setPage={setPage} counts={counts} />

      {/* Tab trạng thái */}
      <BookingTabs tab={tab} setTab={setTab} setPage={setPage} counts={counts} />

      {/* Bộ lọc */}
      <BookingFilters keyword={keyword} setKeyword={setKeyword} propertyId={propertyId} setPropertyId={setPropertyId} assigneeId={assigneeId} setAssigneeId={setAssigneeId} date={date} setDate={setDate} setPage={setPage} />

      <BookingToolbar total={filtered.length} hasFilter={hasFilter} reset={reset} sort={sort} setSort={setSort} />

      <BookingSelectAll allOnPage={allOnPage} toggleAll={toggleAll} pageSize={PAGE_SIZE} />

      <BookingList rows={rows} selected={selected} toggle={toggle} />

      <BookingPagination page={page} setPage={setPage} totalPages={totalPages} total={filtered.length} pageSize={PAGE_SIZE} />
    </div>
  );
}
