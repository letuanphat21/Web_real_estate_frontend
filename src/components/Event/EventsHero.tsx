import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import EventFilterBar from "./EventFilterBar";
import type { EventFilter } from "../../types/event.types";

/** Phần đầu trang: breadcrumb + tiêu đề + ô lọc */
export default function EventsHero({ filter, onSearch }: { filter: EventFilter; onSearch: (f: EventFilter) => void }) {
  return (
    <section className="bg-gradient-to-br from-primary-100 via-primary-50 to-white pb-16 pt-8">
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center gap-1.5 text-xs text-body" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary-600">Trang chủ</Link>
          <ChevronRight size={12} />
          <span className="font-medium text-primary-600">Sự kiện</span>
        </nav>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-heading md:text-5xl">
          SỰ KIỆN
        </h1>
        <p className="mt-3 max-w-2xl text-body">
          Kết nối cùng chuyên gia, khám phá dự án và cập nhật kiến thức thị trường qua những
          trải nghiệm bất động sản đáng giá.
        </p>

        <div className="mt-8">
          <EventFilterBar value={filter} onSearch={onSearch} />
        </div>
      </div>
    </section>
  );
}
