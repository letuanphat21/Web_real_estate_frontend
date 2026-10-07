import { CalendarX } from "lucide-react";
import EventCard from "./EventCard";
import EventCardSkeleton from "./EventCardSkeleton";
import Pagination from "../common/Pagination";
import { EVENT_SORT_LABEL, type Event, type EventSort } from "../../types/event.types";

type EventListProps = {
  events: Event[];
  total: number;
  loading: boolean;
  sort: EventSort;
  onSortChange: (sort: EventSort) => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onReset: () => void;
};

/**
 * Danh sách sự kiện: tiêu đề + sắp xếp + lưới card + phân trang
 */
export default function EventList({
  events,
  total,
  loading,
  sort,
  onSortChange,
  page,
  totalPages,
  onPageChange,
  onReset,
}: EventListProps) {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Tiêu đề + sắp xếp */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-heading md:text-3xl">
              {loading ? "Đang tải sự kiện..." : `${total} sự kiện phù hợp`}
            </h2>
            <p className="mt-1 text-sm text-body">
              Sự kiện nổi bật dành cho nhà đầu tư, khách hàng và chuyên gia bất
              động sản
            </p>
          </div>

          <label className="flex w-fit items-center gap-2 rounded-full border border-line px-4 py-2 text-sm">
            <span className="text-body">Sắp xếp:</span>
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as EventSort)}
              className="bg-transparent font-medium text-heading outline-none"
            >
              {Object.entries(EVENT_SORT_LABEL).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Lưới card */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-line py-16 text-center">
            <CalendarX size={40} className="text-primary-300" />
            <p className="mt-4 font-medium text-heading">
              Không tìm thấy sự kiện phù hợp
            </p>
            <p className="mt-1 text-sm text-body">
              Thử đổi từ khóa hoặc bỏ bớt bộ lọc.
            </p>
            <button
              onClick={onReset}
              className="mt-5 rounded-full bg-primary-50 px-5 py-2 text-sm font-medium text-primary-600 hover:bg-primary-100"
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        {/* Phân trang */}
        {!loading && (
          <div className="mt-12">
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={onPageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
}
