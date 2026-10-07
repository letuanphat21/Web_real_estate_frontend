import { Lock } from "lucide-react";
import { STATUS } from "./floorPlanStatus";
import type { SELECTED } from "../../../data/projectDetail/floorPlan";

type Props = {
  unit: typeof SELECTED;
  setBooking: (open: boolean) => void;
};

export default function SelectedUnitCard({ unit, setBooking }: Props) {
  const s = STATUS[unit.status];
  return (
    <aside className="rounded-3xl border border-primary-200 bg-white p-5 shadow-lg shadow-primary-100/60">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase text-primary-600">
            Căn đang chọn
          </p>
          <p className="mt-1 text-3xl font-semibold text-heading">
            {unit.code}
          </p>
        </div>
        <span
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${s.badge}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />{" "}
          {s.label}
        </span>
      </div>
      <img
        src={unit.image}
        alt={unit.code}
        className="mt-4 w-full rounded-2xl object-cover"
        style={{ height: 145 }}
      />
      <dl className="mt-5">
        {unit.rows.map(([k, v]) => (
          <div
            key={k}
            className="flex justify-between border-b border-line py-3 text-sm"
          >
            <dt className="text-body">{k}</dt>
            <dd className="font-medium text-heading">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 rounded-2xl bg-primary-50 p-4">
        <p className="text-[11px] text-body">Giá dự kiến</p>
        <p className="mt-1 text-3xl font-semibold text-primary-600">
          {unit.price}
        </p>
        <p className="mt-1 text-[10px] text-muted">{unit.note}</p>
      </div>
      <button
        onClick={() => setBooking(true)}
        className="mt-5 flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-6 py-3 text-sm font-medium text-white hover:opacity-95"
      >
        Giữ chỗ căn này <Lock size={15} />
      </button>
      <p className="mt-4 text-center text-[10px] text-muted">
        Quỹ căn cập nhật 5 phút trước
      </p>
    </aside>
  );
}
