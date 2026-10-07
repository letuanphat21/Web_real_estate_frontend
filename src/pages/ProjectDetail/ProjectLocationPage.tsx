import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  MapPin,
  Navigation,
  ArrowDown,
  Check,
  Maximize,
  Plus,
  Minus,
  ShoppingBag,
  GraduationCap,
  Trees,
  Hospital,
  Route,
} from "lucide-react";
import ProjectTabs from "../../components/ProjectDetail/ProjectTabs";

// TODO: thay bằng dữ liệu gọi từ API theo :id (projects.location, name...)
const PROJECT = {
  name: "Aurelia Riverside",
  address: "Lô 3-15, Khu đô thị mới Thủ Thiêm, TP. Thủ Đức, TP.HCM",
  hero: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1800&q=80",
  side: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80",
};

const ADVANTAGES = [
  { title: "Nhất cận thị", desc: "Liền kề CBD Thủ Thiêm và trung tâm Quận 1" },
  { title: "Nhị cận giang", desc: "Mặt tiền sông Sài Gòn, tầm nhìn không giới hạn" },
  { title: "Tam cận lộ", desc: "Kết nối Mai Chí Thọ, Xa lộ Hà Nội và cao tốc" },
];

const POIS = [
  { icon: ShoppingBag, label: "Thiso Mall", left: "43%", top: "10%" },
  { icon: GraduationCap, label: "AIS", left: "12%", top: "21%" },
  { icon: Trees, label: "Công viên", left: "15%", top: "53%" },
  { icon: Hospital, label: "", left: "42%", top: "58%" },
];

export default function ProjectLocationPage() {
  const { id } = useParams();
  const p = PROJECT;
  const [mode, setMode] = useState("map");
  const base = `/du-an/${id}`;

  return (
    <div className="bg-white">
      <ProjectTabs />

      <section className="bg-gradient-to-b from-blue-200 to-white pb-16 pt-8">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-3 text-xs text-muted">
            <Link to="/">Trang chủ</Link> <ChevronRight size={12} />
            <Link to={base}>{p.name}</Link> <ChevronRight size={12} />
            <span className="text-primary-600">Vị trí</span>
          </nav>

          {/* Hero */}
          <div className="relative mt-6 overflow-hidden rounded-3xl shadow-xl shadow-primary-100" style={{ height: "clamp(380px, 36vw, 510px)" }}>
            <img src={p.hero} alt={p.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-footer/70 via-footer/30 to-transparent" />
            <div className="absolute left-9 top-1/2 max-w-xl -translate-y-1/2 text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-[10px] font-semibold uppercase backdrop-blur">
                <MapPin size={12} /> Aurelia Riverside · Thủ Thiêm
              </span>
              <h1 className="mt-5 text-5xl font-bold leading-tight">Vị trí chiến lược giữa tâm điểm Thủ Thiêm</h1>
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold">
                <Navigation size={15} /> {p.address}
              </p>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/85">
                Kề sông Sài Gòn, kết nối trực tiếp lõi tài chính mới và chỉ một nhịp cầu đến trung tâm Quận 1.
              </p>
              <a href="#ban-do" className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-heading">
                Xem trên bản đồ <ArrowDown size={15} />
              </a>
            </div>
            <div className="absolute bottom-5 right-5 rounded-2xl bg-white/90 px-5 py-4 backdrop-blur" style={{ width: 240 }}>
              <p className="text-[10px] font-semibold uppercase text-primary-600">Lợi thế địa lý</p>
              <p className="mt-1 text-xl font-bold text-heading">3 phút đến Quận 1</p>
              <p className="mt-1 text-[11px] text-body">Qua hầm Thủ Thiêm hoặc cầu Ba Son</p>
            </div>
          </div>

          {/* Lợi thế vị trí */}
          <div className="mt-20 grid items-center gap-12 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-3xl" style={{ height: 460 }}>
              <img src={p.side} alt="Tâm điểm bên sông Sài Gòn" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-footer/70 via-transparent to-transparent" />
              <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-heading">
                <Maximize size={12} /> Góc nhìn flycam
              </span>
              <div className="absolute bottom-5 left-6 text-white">
                <p className="text-xl font-semibold">Tâm điểm bên sông Sài Gòn</p>
                <p className="mt-1 text-xs text-white/80">Thủ Thiêm · Quận 1 · Bán đảo Thanh Đa trong cùng một tầm nhìn</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-primary-600">Lợi thế vị trí</p>
              <h2 className="mt-3 text-4xl font-semibold leading-tight text-heading">Một bước chạm đô thị, một nhịp trở về thiên nhiên</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-body">
                Aurelia Riverside nằm tại giao điểm của ba giá trị hiếm có: lõi tài chính mới, hành lang giao thông chiến lược và dải công viên ven sông.
              </p>
              <ul className="mt-6 space-y-3">
                {ADVANTAGES.map((a) => (
                  <li key={a.title} className="flex items-center gap-4 rounded-2xl border border-line bg-primary-50/60 px-5 py-4">
                    <Check size={16} className="text-primary-600" />
                    <span>
                      <span className="block text-sm font-semibold text-heading">{a.title}</span>
                      <span className="block text-xs text-body">{a.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bản đồ toàn chiều rộng */}
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
        {POIS.map(({ icon: Icon, label, left, top }, k) => (
          <span key={k} style={{ left, top }} className="pointer-events-none absolute flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-heading shadow">
            <Icon size={13} className="text-primary-600" /> {label}
          </span>
        ))}
      </section>
    </div>
  );
}
