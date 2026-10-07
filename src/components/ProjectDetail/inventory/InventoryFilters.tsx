import { Search, SlidersHorizontal, Filter, X } from "lucide-react";
import FilterField from "./FilterField";
import FilterSelect from "./FilterSelect";
import { selectCls } from "./FilterSelect";
import { STATUS } from "./inventoryStatus";
import type { InventoryFilter } from "../../../data/projectDetail/inventory";

type Props = {
  draft: InventoryFilter;
  setDraft: (filter: InventoryFilter) => void;
  chips: string[][];
  removeChip: (key: string) => void;
  clear: () => void;
  apply: () => void;
};

export default function InventoryFilters({ draft, setDraft, chips, removeChip, clear, apply }: Props) {
  return (
    <div className="relative z-10 mt-8 rounded-3xl bg-white p-6 shadow-xl shadow-primary-100">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
            <SlidersHorizontal size={17} />
          </span>
          <div>
            <p className="text-sm font-semibold text-heading">Bộ lọc quỹ căn</p>
            <p className="text-[11px] text-body">Thu hẹp kết quả theo nhu cầu của bạn</p>
          </div>
        </div>
        <p className="hidden text-[11px] text-body md:block">Dữ liệu được đồng bộ tự động mỗi 15 phút</p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <FilterField label="Tìm theo mã căn">
          <div className="relative">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-body" />
            <input
              value={draft.q}
              onChange={(e) => setDraft({ ...draft, q: e.target.value })}
              placeholder="Nhập mã căn, ví dụ AR-A1-1208"
              className={`${selectCls} pl-10`}
            />
          </div>
        </FilterField>
        <FilterField label="Khoảng giá">
          <FilterSelect value={draft.price} onChange={(v) => setDraft({ ...draft, price: v })} options={[["", "Tất cả khoảng giá"], ["lt10", "Dưới 10 tỷ"], ["10-20", "10 – 20 tỷ"], ["gt20", "Trên 20 tỷ"]]} />
        </FilterField>
        <FilterField label="Loại hình">
          <FilterSelect value={draft.type} onChange={(v) => setDraft({ ...draft, type: v })} options={[["", "Căn hộ, Duplex, Penthouse"], ["apt", "Căn hộ"], ["dup", "Duplex"], ["pent", "Penthouse"]]} />
        </FilterField>
        <FilterField label="Hướng">
          <FilterSelect value={draft.dir} onChange={(v) => setDraft({ ...draft, dir: v })} options={[["", "Tất cả hướng"], ["Đông Nam", "Đông Nam"], ["Tây Bắc", "Tây Bắc"], ["Đông Bắc", "Đông Bắc"], ["Nam", "Nam"]]} />
        </FilterField>
        <FilterField label="Diện tích đất">
          <FilterSelect value="" onChange={() => {}} options={[["", "Tất cả diện tích"]]} />
        </FilterField>
        <FilterField label="Diện tích xây dựng">
          <FilterSelect value="" onChange={() => {}} options={[["", "Từ 50 m² đến 250 m²"]]} />
        </FilterField>
        <FilterField label="Phân khu">
          <FilterSelect value={draft.zone} onChange={(v) => setDraft({ ...draft, zone: v })} options={[["", "Tất cả phân khu"], ["The Cove", "The Cove"]]} />
        </FilterField>
        <FilterField label="Tình trạng">
          <FilterSelect value={draft.status} onChange={(v) => setDraft({ ...draft, status: v })} options={[["", "Tất cả tình trạng"], ...Object.entries(STATUS).map(([k, v]) => [k, v.label])]} />
        </FilterField>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-medium text-heading">Đang áp dụng:</span>
          {chips.map(([k, label]) => (
            <span key={k} className="flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1.5 font-semibold text-primary-700">
              {label}
              <button aria-label="Bỏ lọc" onClick={() => removeChip(k)}><X size={12} /></button>
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={clear} className="rounded-xl border border-line bg-white px-5 py-3 text-sm font-medium text-heading hover:bg-primary-50">Xóa bộ lọc</button>
          <button onClick={apply} className="flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-medium text-white hover:bg-primary-700">
            <Filter size={15} /> Áp dụng bộ lọc
          </button>
        </div>
      </div>
    </div>
  );
}
