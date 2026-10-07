import { ChevronDown } from "lucide-react";

type Props = {
  total: number;
  sort: string;
  setSort: (sort: string) => void;
};

export default function InventoryResultsHeader({ total, sort, setSort }: Props) {
  return (
    <div className="mt-12 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-semibold text-heading">{total} căn phù hợp</h2>
        <p className="mt-1 text-xs text-body">Hiển thị quỹ căn đang khả dụng theo bộ lọc đã chọn</p>
      </div>
      <label className="flex items-center gap-3 text-sm text-body">
        Sắp xếp:
        <div className="relative">
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-11 appearance-none rounded-xl border border-line bg-white pl-4 pr-10 text-sm font-medium text-heading outline-none">
            <option value="default">Mặc định</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
          </select>
          <ChevronDown size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </label>
    </div>
  );
}
