import { Link } from "react-router-dom";
import { ChevronRight, CalendarClock, MapPin, ArrowRight, ClipboardList } from "lucide-react";
import { BOOKING_STATUS_META, MOCK_BOOKINGS } from "../../data/mockAccount";

export default function MyBookingsPage() {
  const bookings = MOCK_BOOKINGS;

  return (
    <div className="min-h-[70vh] bg-primary-50/60 pb-16">
      <section className="bg-gradient-to-b from-blue-200 to-primary-50/60 pb-10 pt-8">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-3 text-xs text-muted">
            <Link to="/">Trang chủ</Link> <ChevronRight size={12} />
            <span className="font-semibold text-primary-600">Booking của tôi</span>
          </nav>
          <h1 className="mt-5 text-4xl font-bold text-heading">Booking của tôi</h1>
          <p className="mt-3 max-w-xl text-sm text-body">Theo dõi các căn bạn đã giữ chỗ và trạng thái xác nhận từ chuyên viên.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8">
        {bookings.length === 0 ? (
          <div className="rounded-3xl border border-line bg-white py-16 text-center shadow-sm">
            <ClipboardList size={36} className="mx-auto text-primary-300" />
            <p className="mt-4 font-semibold text-heading">Bạn chưa có booking nào</p>
            <Link to="/projects" className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-6 py-3 text-sm font-medium text-white">
              Khám phá dự án <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {bookings.map((b) => {
              const st = BOOKING_STATUS_META[b.status];
              return (
                <li key={b.id} className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-4 shadow-sm sm:flex-row sm:items-center">
                  <img src={b.image} alt={b.unitCode} className="h-32 w-full shrink-0 rounded-2xl object-cover sm:w-44" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-semibold text-heading">{b.unitCode}</h2>
                      <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${st.badge}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} /> {st.label}
                      </span>
                    </div>
                    <p className="mt-2 flex items-center gap-1.5 text-sm text-body">
                      <MapPin size={14} className="text-muted" /> {b.projectName} · {b.location}
                    </p>
                    <p className="mt-1 text-sm text-body">{b.spec}</p>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                      <CalendarClock size={13} /> Tạo lúc {b.createdAt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <p className="text-2xl font-bold text-primary-600">{b.price}</p>
                    <Link to={`/projects/${b.projectId}/floor-plans`} className="flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-5 py-2.5 text-sm font-medium text-heading hover:bg-primary-100">
                      Xem căn <ArrowRight size={14} />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
