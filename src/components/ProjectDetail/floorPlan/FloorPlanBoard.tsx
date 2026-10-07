import { Plus, Minus } from "lucide-react";
import FloorPlanSvg from "./FloorPlanSvg";
import { STATUS } from "./floorPlanStatus";
import type { UNITS } from "../../../data/projectDetail/floorPlan";

type Props = {
  units: typeof UNITS;
  selected: string;
  setSelected: (no: string) => void;
};

export default function FloorPlanBoard({ units, selected, setSelected }: Props) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-line bg-white"
      style={{ height: 660 }}
    >
      <div className="absolute inset-0 p-10">
        <FloorPlanSvg />
      </div>
      <div className="absolute left-5 top-5 rounded-xl bg-white px-4 py-2.5 shadow">
        <p className="text-xs font-bold text-heading">TẦNG 12 · TÒA A1</p>
        <p className="text-[10px] text-body">Sông Sài Gòn ↑ Đông Nam</p>
      </div>
      <div className="absolute right-5 top-5 flex flex-col overflow-hidden rounded-xl bg-white shadow">
        {[Plus, Minus].map((Icon, k) => (
          <button
            key={k}
            aria-label={k ? "Thu nhỏ" : "Phóng to"}
            className="flex h-10 w-10 items-center justify-center hover:bg-primary-50"
          >
            <Icon size={15} />
          </button>
        ))}
      </div>
      {units.map((u) => (
        <button
          key={u.no}
          onClick={() => setSelected(u.no)}
          style={{ left: u.left, top: u.top }}
          className={`absolute flex h-8 min-w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white px-2 text-[11px] font-bold text-white shadow ${
            selected === u.no
              ? "bg-primary-600 ring-4 ring-primary-200"
              : STATUS[u.status].pin
          }`}
        >
          {u.no}
          {selected === u.no && (
            <span className="absolute top-full mt-1 whitespace-nowrap rounded bg-footer px-2 py-0.5 text-[8px] font-bold">
              ĐANG CHỌN
            </span>
          )}
        </button>
      ))}
      <p className="absolute bottom-5 right-6 text-right text-[10px] leading-tight text-heading">
        LEVEL 12 FLOOR PLAN
        <br />
        TYPICAL APARTMENT LAYOUT
      </p>
    </div>
  );
}
