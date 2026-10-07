import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Download,
  Search,
  House,
  User,
  CalendarDays,
  ArrowUpDown,
  X,
  Clock,
  RefreshCw,
  Ellipsis,
  CalendarCheck,
  Copy,
  CircleCheck,
  CircleX,
} from "lucide-react";
import { ASSIGNEES, MOCK_BOOKINGS, PROPERTIES } from "../../data/mockBookings";
import {
  BOOKING_SORT_LABEL,
  BOOKING_STATUS_META,
  BOOKING_STATUS_ORDER,
  type Booking,
  type BookingSort,
  type BookingStatus,
} from "../../types/booking.types";
import { formatDate, formatTime } from "../../utils/formatDate";

const PAGE_SIZE = 5;
const fmtDateTime = (iso: string) => `${formatDate(iso)} · ${formatTime(iso)}`;

const STAT_CARDS: { key: BookingStatus | "ALL"; label: string; note: string; icon: ReactNode; tone: string }[] = [
  { key: "ALL", label: "Tổng booking", note: "Tất cả yêu cầu giữ chỗ", icon: <Copy size={15} />, tone: "bg-primary-100 text-primary-600" },
  { key: "PENDING", label: "Chờ xác nhận", note: "yêu cầu chưa phân công", icon: <Clock size={15} />, tone: "bg-warning/10 text-warning" },
  { key: "CONFIRMED", label: "Đã xác nhận", note: "Đang giữ chỗ căn", icon: <CalendarCheck size={15} />, tone: "bg-primary-100 text-primary-600" },
  { key: "COMPLETED", label: "Hoàn tất", note: "Đã hoàn tất giao dịch", icon: <CircleCheck size={15} />, tone: "bg-success/10 text-success" },
  { key: "CANCELLED", label: "Đã hủy", note: "Căn đã được mở lại", icon: <CircleX size={15} />, tone: "bg-danger/10 text-danger" },
];

const selectCls =
  "h-11 w-full appearance-none rounded-xl border border-line bg-white pl-10 pr-9 text-sm text-heading outline-none focus:border-primary-300";

function FilterSelect({ icon, value, onChange, children }: { icon: ReactNode; value: string; onChange: (v: string) => void; children: ReactNode }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-body">{icon}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={selectCls}>
        {children}
      </select>
      <ChevronDown size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-body" />
    </div>
  );
}

function BookingCard({ b, checked, onToggle }: { b: Booking; checked: boolean; onToggle: () => void }) {
  const st = BOOKING_STATUS_META[b.status];
  return (
    <li className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
      <div className="p-5 pb-4">
        <div className="flex items-center justify-between gap-3">
          <label className="flex min-w-0 cursor-pointer items-center gap-3">
            <input type="checkbox" checked={checked} onChange={onToggle} className="h-4 w-4 rounded accent-primary-600" />
            <span className="text-[13px] font-bold text-heading">{b.code}</span>
            <span className="truncate text-[11px] text-muted">{b.type}</span>
          </label>
          <div className="flex items-center gap-4">
            <Link to={`/du-an/${b.property.projectId}/mat-bang`} className="flex items-center gap-1 text-xs font-semibold text-primary-600">
              Xem chi tiết <ChevronRight size={14} />
            </Link>
            <button aria-label="Thao tác khác" className="text-body hover:text-heading"><Ellipsis size={16} /></button>
          </div>
        </div>

        <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-[190px_minmax(0,1fr)_140px_160px]">
          <div>
            <p className="text-[11px] text-muted">Khách hàng</p>
            <p className="mt-1.5 text-sm font-semibold text-heading">{b.customer.fullName}</p>
            <p className="mt-1 text-xs text-body">{b.customer.code}</p>
          </div>

          <div className="min-w-0">
            <p className="text-[11px] text-muted">Bất động sản</p>
            <div className="mt-1.5 flex items-center gap-3">
              <img src={b.property.image} alt="" className="h-[52px] w-[52px] shrink-0 rounded-lg object-cover" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-heading">{b.property.projectName}</p>
                <p className="truncate text-[11px] text-body">{b.property.unitCode} · {b.property.spec}</p>
                <p className="text-[11px] text-muted">{b.property.code}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[11px] text-muted">Trạng thái</p>
            <span className={`mt-1.5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${st.badge}`}>
              <Clock size={11} /> {st.label}
            </span>
            <p className="mt-2 text-[11px] text-body">{st.note}</p>
          </div>

          <div>
            <p className="text-[11px] text-muted">Người phụ trách</p>
            {b.assignee ? (
              <>
                <p className="mt-1.5 text-sm font-semibold text-heading">{b.assignee.fullName}</p>
                <p className="mt-1 text-xs text-body">{b.assignee.role}</p>
              </>
            ) : (
              <>
                <p className="mt-1.5 text-sm font-semibold text-warning">Chưa phân công</p>
                <p className="mt-1 text-[11px] text-body">Cần tiếp nhận</p>
                <button className="mt-1 text-[11px] font-semibold text-primary-600">+ Phân công ngay</button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 border-t border-line bg-primary-50/50 px-5 py-4 text-xs md:grid-cols-3">
        {[
          { icon: Clock, label: "Thời gian yêu cầu", value: b.requestTime },
          { icon: CalendarCheck, label: "Ngày tạo", value: b.createdAt },
          { icon: RefreshCw, label: "Cập nhật lần cuối", value: b.updatedAt },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon size={16} className="text-body" />
            <div>
              <p className="text-[11px] text-muted">{label}</p>
              <p className="mt-0.5 text-[13px] text-heading">{fmtDateTime(value)}</p>
            </div>
          </div>
        ))}
      </div>
    </li>
  );
}

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

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-heading">Danh sách booking</h1>
          <p className="mt-2 text-sm text-body">Theo dõi yêu cầu giữ chỗ, phân công chuyên viên và quản lý trạng thái booking.</p>
        </div>
        <button onClick={exportCsv} className="flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold text-heading shadow-sm hover:bg-primary-50">
          <Download size={15} /> Xuất danh sách
        </button>
      </div>

      {/* Thống kê */}
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

      {/* Tab trạng thái */}
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

      {/* Bộ lọc */}
      <div className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_190px_190px]">
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-body" />
          <input
            value={keyword}
            onChange={(e) => { setKeyword(e.target.value); setPage(0); }}
            placeholder="Tìm mã booking, khách hàng hoặc mã căn…"
            className="h-11 w-full rounded-xl border border-line bg-white pl-10 pr-4 text-sm text-heading outline-none placeholder:text-body focus:border-primary-300"
          />
        </div>
        <FilterSelect icon={<House size={15} />} value={propertyId} onChange={(v) => { setPropertyId(v); setPage(0); }}>
          <option value="">Bất động sản</option>
          {PROPERTIES.map((p) => <option key={p.id} value={p.id}>{p.unitCode}</option>)}
        </FilterSelect>
        <FilterSelect icon={<User size={15} />} value={assigneeId} onChange={(v) => { setAssigneeId(v); setPage(0); }}>
          <option value="">Người phụ trách</option>
          <option value="0">Chưa phân công</option>
          {ASSIGNEES.map((a) => <option key={a.id} value={a.id}>{a.fullName}</option>)}
        </FilterSelect>
        <div className="relative">
          <CalendarDays size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-body" />
          <input
            type="date"
            value={date}
            onChange={(e) => { setDate(e.target.value); setPage(0); }}
            aria-label="Ngày yêu cầu"
            className={`${selectCls} pr-3`}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-body">
        <p>Hiển thị <b className="text-heading">{filtered.length} booking</b> · Múi giờ GMT+7</p>
        <div className="flex items-center gap-4">
          {hasFilter && (
            <button onClick={reset} className="flex items-center gap-1.5 text-heading"><X size={13} /> Xóa bộ lọc</button>
          )}
          <div className="relative w-[200px]">
            <ArrowUpDown size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-body" />
            <select value={sort} onChange={(e) => setSort(e.target.value as BookingSort)} className={selectCls}>
              {(Object.keys(BOOKING_SORT_LABEL) as BookingSort[]).map((k) => <option key={k} value={k}>{BOOKING_SORT_LABEL[k]}</option>)}
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-body" />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-body">
        <label className="flex cursor-pointer items-center gap-3">
          <input type="checkbox" checked={allOnPage} onChange={toggleAll} className="h-4 w-4 rounded accent-primary-600" />
          Chọn tất cả booking trên trang
        </label>
        <span>{PAGE_SIZE} booking / trang</span>
      </div>

      <ul className="mt-4 space-y-4">
        {rows.map((b) => (
          <BookingCard key={b.id} b={b} checked={selected.has(b.id)} onToggle={() => toggle(b.id)} />
        ))}
        {rows.length === 0 && (
          <li className="rounded-2xl border border-line bg-white py-14 text-center text-body">Không có booking nào phù hợp với bộ lọc.</li>
        )}
      </ul>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-body">
        <p>
          Hiển thị {filtered.length ? page * PAGE_SIZE + 1 : 0}–{Math.min(filtered.length, (page + 1) * PAGE_SIZE)} trong tổng số {filtered.length} booking
        </p>
        <div className="flex items-center gap-2">
          <button aria-label="Trang trước" onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white disabled:opacity-40">
            <ChevronLeft size={14} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i)} className={`h-9 w-9 rounded-lg text-sm font-medium ${page === i ? "bg-primary-600 text-white" : "border border-line bg-white text-heading"}`}>
              {i + 1}
            </button>
          ))}
          <button aria-label="Trang sau" onClick={() => setPage(Math.min(totalPages - 1, page + 1))} disabled={page >= totalPages - 1} className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white disabled:opacity-40">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
