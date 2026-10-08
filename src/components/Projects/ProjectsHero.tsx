import { Search, X, RotateCcw } from "lucide-react";
import FilterSelect from "./FilterSelect";

type Props = {
  filters: string[];
  onRemoveFilter: (filter: string) => void;
  onClearFilters: () => void;
};

export default function ProjectsHero({ filters, onRemoveFilter, onClearFilters }: Props) {
  return (
    <section className="bg-gradient-to-b from-primary-100 to-primary-50 pb-10 pt-6">
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="text-xs text-muted">
          Trang chủ <span className="mx-1.5">›</span>
          <span className="text-primary-600">Dự án</span>
        </nav>
        <h1 className="animate-rise-in mt-5 text-4xl font-extrabold uppercase tracking-tight text-heading">
          Khám phá dự án bất động sản
        </h1>
        <p className="animate-rise-in mt-3 max-w-xl text-sm text-body [animation-delay:150ms]">
          Dữ liệu xác thực, tiến độ minh bạch và lựa chọn phù hợp — giúp bạn tìm đúng dự án chỉ trong vài phút.
        </p>

        <div className="animate-rise-in mt-8 rounded-2xl border border-primary-200 [animation-delay:300ms] bg-white/80 p-5 shadow-lg shadow-primary-100 backdrop-blur">
          <div className="flex h-12 items-center gap-3 rounded-xl border border-primary-200 bg-primary-50 px-4">
            <Search size={16} className="text-primary-500" />
            <input
              placeholder='Nhập tên dự án hoặc từ khóa, ví dụ "căn hộ ven sông"'
              className="flex-1 bg-transparent text-sm text-heading outline-none placeholder:text-muted"
            />
            <kbd className="rounded border border-line bg-white px-1.5 py-0.5 text-[10px] text-muted">⌘ K</kbd>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
            <FilterSelect label="Chủ đầu tư" placeholder="Tất cả chủ đầu tư" />
            <FilterSelect label="Khu vực" value="TP. Hồ Chí Minh" active />
            <FilterSelect label="Loại hình" value="Căn hộ" active />
            <FilterSelect label="Trạng thái" value="Đang mở bán" active />
            <div className="flex items-end">
              <button className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 px-6 text-sm font-medium text-white hover:opacity-95 lg:w-auto">
                Tìm kiếm <Search size={15} />
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
            <span>Đang lọc:</span>
            {filters.map((f) => (
              <span key={f} className="flex items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 font-medium text-primary-700">
                {f}
                <button aria-label={`Bỏ ${f}`} onClick={() => onRemoveFilter(f)}>
                  <X size={11} />
                </button>
              </span>
            ))}
            <button onClick={onClearFilters} className="ml-auto flex items-center gap-1 text-primary-600 hover:text-primary-700">
              <RotateCcw size={12} /> Xóa bộ lọc
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
