import { ChevronDown, ArrowUpDown, X } from "lucide-react";
import { selectCls } from "./BookingFilterSelect";
import { BOOKING_SORT_LABEL, type BookingSort } from "../../types/booking.types";

type Props = {
  total: number;
  hasFilter: boolean;
  reset: () => void;
  sort: BookingSort;
  setSort: (sort: BookingSort) => void;
};

export default function BookingToolbar({ total, hasFilter, reset, sort, setSort }: Props) {
  return (
    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-body">
      <p>Hiển thị <b className="text-heading">{total} booking</b> · Múi giờ GMT+7</p>
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
  );
}
