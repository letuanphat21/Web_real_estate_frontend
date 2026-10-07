import { ChevronDown } from "lucide-react";
import { IMG } from "../../../data/projectDetail/progress";
import type { Period } from "../../../data/projectDetail/progress";

type Props = {
  periods: Period[];
  active: string;
  setActive: (key: string) => void;
};

export default function PeriodList({ periods, active, setActive }: Props) {
  return (
    <aside className="rounded-3xl border border-line bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-heading">Các kỳ cập nhật</h3>
      <p className="text-[11px] text-muted">Từ mới nhất đến cột mốc khởi công</p>
      <ul className="relative mt-4 space-y-3">
        <span className="absolute bottom-4 left-4 top-4 w-px bg-line" />
        {periods.map((x) => {
          const on = x.key === active;
          return (
            <li key={x.key}>
              <button
                onClick={() => setActive(x.key)}
                className={`relative flex w-full items-center gap-3 rounded-2xl border p-3 pl-8 text-left ${on ? "border-primary-300 bg-primary-50" : "border-transparent"}`}
              >
                <span className={`absolute left-[13px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full ${on ? "bg-primary-600" : "bg-success"}`} />
                <span className="min-w-0 flex-1">
                  <span className={`block text-sm font-semibold ${on ? "text-primary-600" : "text-heading"}`}>{x.title}</span>
                  <span className="block text-[11px] text-body">{x.short}</span>
                  <span className="mt-2 flex items-center gap-2">
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                      <span className={`block h-full rounded-full ${on ? "bg-primary-600" : "bg-success"}`} style={{ width: `${x.percent}%` }} />
                    </span>
                    <span className="text-[10px] font-semibold text-heading">{x.percent}%</span>
                  </span>
                </span>
                <img src={IMG(x.img, 200)} alt="" className="h-14 w-16 shrink-0 rounded-lg object-cover" />
              </button>
            </li>
          );
        })}
      </ul>
      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary-50 py-3 text-xs font-medium text-primary-700">
        Xem toàn bộ lịch sử <ChevronDown size={14} />
      </button>
    </aside>
  );
}
