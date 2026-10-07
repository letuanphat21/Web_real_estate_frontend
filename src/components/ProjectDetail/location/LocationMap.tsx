import { useState } from "react";
import { Maximize, Plus, Minus, Route } from "lucide-react";
import type { PROJECT, POIS } from "../../../data/projectDetail/location";

type Props = {
  project: typeof PROJECT;
  pois: typeof POIS;
};

export default function LocationMap({ project, pois }: Props) {
  const [mode, setMode] = useState("map");
  const p = project;
  return (
    <section id="ban-do" className="relative scroll-mt-36" style={{ height: 620 }}>
      <iframe
        title="Bản đồ vị trí"
        className="h-full w-full"
        loading="lazy"
        src={`https://www.google.com/maps?q=${encodeURIComponent(p.address)}&output=embed${mode === "sat" ? "&t=k" : ""}`}
      />
      <div className="absolute left-4 top-4 flex rounded-full bg-white p-1 text-xs shadow">
        {[["map", "Bản đồ"], ["sat", "Vệ tinh"]].map(([k, l]) => (
          <button key={k} onClick={() => setMode(k)} className={`rounded-full px-4 py-1.5 font-medium ${mode === k ? "bg-primary-100 text-primary-600" : "text-body"}`}>
            {l}
          </button>
        ))}
      </div>
      <div className="absolute right-4 top-4 flex flex-col gap-2">
        {[Plus, Minus, Maximize].map((Icon, k) => (
          <button key={k} aria-label="Điều khiển bản đồ" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow">
            <Icon size={16} />
          </button>
        ))}
      </div>
      <div className="pointer-events-none absolute left-[24%] top-[44%] rounded-xl bg-white px-4 py-3 shadow-lg">
        <p className="flex items-center justify-between gap-6 text-sm font-semibold text-heading">
          {p.name} <span className="rounded bg-primary-100 px-1.5 py-0.5 text-[9px] text-primary-700">DỰ ÁN</span>
        </p>
        <p className="mt-1 text-[10px] text-body">Lô 3-15, KĐT mới Thủ Thiêm, TP. Thủ Đức</p>
        <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-primary-600">
          <Route size={12} /> Chỉ đường
        </p>
      </div>
      {pois.map(({ icon: Icon, label, left, top }, k) => (
        <span key={k} style={{ left, top }} className="pointer-events-none absolute flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-heading shadow">
          <Icon size={13} className="text-primary-600" /> {label}
        </span>
      ))}
    </section>
  );
}
