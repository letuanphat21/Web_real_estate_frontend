import { Search, House, User, CalendarDays } from "lucide-react";
import FilterSelect from "./BookingFilterSelect";
import { selectCls } from "./BookingFilterSelect";
import { ASSIGNEES, PROPERTIES } from "../../data/mockBookings";

type Props = {
  keyword: string;
  setKeyword: (value: string) => void;
  propertyId: string;
  setPropertyId: (value: string) => void;
  assigneeId: string;
  setAssigneeId: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  setPage: (page: number) => void;
};

export default function BookingFilters({ keyword, setKeyword, propertyId, setPropertyId, assigneeId, setAssigneeId, date, setDate, setPage }: Props) {
  return (
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
  );
}
