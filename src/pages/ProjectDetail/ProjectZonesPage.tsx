import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  Building2,
  House,
  Maximize,
  ArrowRight,
} from "lucide-react";
import ProjectTabs from "../../components/ProjectDetail/ProjectTabs";
import { PROJECT, ZONES } from "../../data/projectDetail/zones";

const TONE: Record<string, { badge: string; dot: string }> = {
  success: { badge: "bg-success/10 text-success", dot: "bg-success" },
  warning: { badge: "bg-warning/10 text-warning", dot: "bg-warning" },
  danger: { badge: "bg-danger/10 text-danger", dot: "bg-danger" },
};

function ZoneCard({ zone, to }: { zone: (typeof ZONES)[number]; to: string }) {
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

export default function ProjectZonesPage() {
  const { id } = useParams();
  const base = `/du-an/${id}`;
  const p = PROJECT;

  return (
    <div className="bg-white">
      <ProjectTabs />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-200 to-white pb-16 pt-8">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-3 text-xs text-muted">
            <Link to="/">Trang chủ</Link> <ChevronRight size={12} />
            <Link to={base}>{p.name}</Link> <ChevronRight size={12} />
            <span className="text-primary-600">Phân khu</span>
          </nav>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_678px]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase text-primary-700">
                <Building2 size={12} /> Aurelia Riverside · Thủ Thiêm
              </span>
              <h1 className="mt-5 text-5xl font-bold leading-tight text-heading">Khám phá các phân khu</h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-body">
                Bốn phong cách sống được định hình bởi tầm nhìn sông, công viên trung tâm, bến du thuyền và những khu vườn riêng tư.
              </p>
              <p className="mt-5 flex gap-6 text-sm text-heading">
                <span><b className="font-semibold text-primary-600">4</b> phân khu</span>
                <span><b className="font-semibold text-primary-600">1.248</b> sản phẩm</span>
                <span>Dự kiến 2028</span>
              </p>
            </div>
            <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-primary-100" style={{ height: 292 }}>
              <img src={p.hero} alt={p.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-footer/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 text-white">
                <p className="text-xl font-semibold">{p.name}</p>
                <p className="text-xs text-white/80">Bán đảo Thủ Thiêm · TP.HCM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bộ sưu tập */}
      <section className="bg-primary-50/70 py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-xs font-semibold uppercase text-primary-600">Bộ sưu tập phân khu</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-heading">Chọn một phong cách sống mang dấu ấn riêng</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {ZONES.map((z) => (
              <ZoneCard key={z.id} zone={z} to={`${base}/mat-bang`} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
