import { useState, type FormEvent } from "react";
import { MapPin, Search } from "lucide-react";
import { LOCATION_LABEL, type JobFilter } from "../../types/job.types";

const DEFAULT_CITY = Object.keys(LOCATION_LABEL)[0];

/** Ô tìm kiếm ở Hero: từ khóa + khu vực + nút tìm (trang cha đặt `key` để đồng bộ khi URL đổi) */
export default function JobSearchBar({
  value,
  onSearch,
}: {
  value: JobFilter;
  onSearch: (f: JobFilter) => void;
}) {
  const [keyword, setKeyword] = useState(value.keyword);
  const [location, setLocation] = useState(value.location || DEFAULT_CITY);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch({ ...value, keyword: keyword.trim(), location });
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-xl shadow-primary-100/60 ring-1 ring-line md:flex-row md:items-center md:rounded-full"
    >
      <label className="flex flex-1 items-center gap-2 px-4">
        <Search size={18} className="shrink-0 text-body" aria-hidden />
        <span className="sr-only">Từ khóa công việc</span>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Vd: Chuyên viên kinh doanh"
          className="h-11 w-full bg-transparent text-sm text-heading outline-none placeholder:text-muted"
        />
      </label>

      <label className="flex items-center gap-2 border-t border-line px-4 md:border-l md:border-t-0">
        <MapPin size={18} className="shrink-0 text-body" aria-hidden />
        <span className="sr-only">Khu vực</span>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="h-11 w-full bg-transparent text-sm text-heading outline-none md:w-40"
        >
          {Object.entries(LOCATION_LABEL).map(([k, l]) => (
            <option key={k} value={k}>
              {l}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        className="flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-6 text-sm font-medium text-white shadow-lg shadow-primary-300/50 transition hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
      >
        Tìm việc ngay
      </button>
    </form>
  );
}
