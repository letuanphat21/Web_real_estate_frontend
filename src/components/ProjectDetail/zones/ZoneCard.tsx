import { Link } from "react-router-dom";
import { Building2, House, Maximize, ArrowRight } from "lucide-react";
import type { ZONES } from "../../../data/projectDetail/zones";
import { PROJECT } from "../../../data/projectDetail/zones";

type ZoneItem = (typeof ZONES)[number];

const TONE: Record<string, { badge: string; dot: string }> = {
  success: { badge: "bg-success/10 text-success", dot: "bg-success" },
  warning: { badge: "bg-warning/10 text-warning", dot: "bg-warning" },
  danger: { badge: "bg-danger/10 text-danger", dot: "bg-danger" },
};

export default function ZoneCard({ zone, to }: { zone: ZoneItem; to: string }) {
  const t = TONE[zone.tone];
  const rows = [
    [House, "Loại hình", zone.type],
    [Building2, "Quy mô", zone.scale],
    [Maximize, "Diện tích", zone.area],
  ] as const;
  return (
    <div className="flex overflow-hidden rounded-3xl border border-line bg-white shadow-sm" style={{ minHeight: 346 }}>
      <img src={zone.image} alt={zone.name} className="object-cover" style={{ width: 245 }} />
      <div className="flex min-w-0 flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
          <h3 className="text-2xl font-semibold text-heading">{zone.name}</h3>
          <span className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${t.badge}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} /> {zone.status}
          </span>
        </div>
        <ul className="mt-4 space-y-4">
          {rows.map(([Icon, label, value]) => (
            <li key={label} className="flex items-center gap-3 text-sm">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                <Icon size={15} />
              </span>
              <span className="w-24 text-xs text-muted">{label}</span>
              <span className="font-medium text-heading">{value}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-[11px] text-muted">Cập nhật {PROJECT.updated}</span>
          <Link to={to} className="flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-6 py-3 text-sm font-medium text-heading hover:bg-primary-100">
            Xem chi tiết <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
