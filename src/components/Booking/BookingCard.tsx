import { Link } from "react-router-dom";
import { ChevronRight, Clock, RefreshCw, Ellipsis, CalendarCheck } from "lucide-react";
import { BOOKING_STATUS_META, type Booking } from "../../types/booking.types";
import { fmtDateTime } from "./bookingHelpers";

export default function BookingCard({ b, checked, onToggle }: { b: Booking; checked: boolean; onToggle: () => void }) {
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
            <Link to={`/projects/${b.property.projectId}/floor-plans`} className="flex items-center gap-1 text-xs font-semibold text-primary-600">
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
