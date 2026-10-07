import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ProjectTabs from "../../components/ProjectDetail/ProjectTabs";
import {
  Heart,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Check,
  Play,
  Plus,
  Minus,
  ArrowRight,
  Download,
  Images,
  SlidersHorizontal,
} from "lucide-react";
import { PROJECT, GALLERY, NEARBY, ZONES, BUILDINGS, PINS, FACILITIES, PROPERTIES, POLICIES, PROGRESS, DOCUMENTS, NEWS } from "../../data/projectDetail/overview";

const STATUS_STYLE: Record<string, string> = {
  "Còn hàng": "bg-success/10 text-success",
  "Giữ chỗ": "bg-warning/10 text-warning",
  "Sắp mở": "bg-primary-100 text-primary-700",
};

const TONE_STYLE: Record<string, string> = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  primary: "bg-primary-100 text-primary-700",
};

const outlineBtn =
  "flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-5 py-2.5 text-sm font-medium text-heading hover:bg-primary-100";

type HeadingProps = { id?: string; eyebrow: string; title: string; desc?: string; action?: ReactNode };

function Heading({ id, eyebrow, title, desc, action }: HeadingProps) {
  return (
    <div id={id} className="mb-8 flex scroll-mt-36 flex-wrap items-end justify-between gap-4">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight text-heading">{title}</h2>
        {desc && <p className="mt-3 text-base text-body">{desc}</p>}
      </div>
      {action}
    </div>
  );
}

const Container = ({ children }: { children: ReactNode }) => <div className="container mx-auto px-4 lg:px-8">{children}</div>;

function HeroGallery() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((i + d + GALLERY.length) % GALLERY.length);
  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl" style={{ height: "clamp(280px, 35vw, 500px)" }}>
        <img src={GALLERY[i].src} alt={GALLERY[i].label} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-footer/70 via-transparent to-transparent" />
        <span className="absolute right-5 top-5 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-heading">
          <Images size={14} /> {i + 1} / 18
        </span>
        <button onClick={() => go(-1)} aria-label="Ảnh trước" className="absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-heading shadow">
          <ChevronLeft size={18} />
        </button>
        <button onClick={() => go(1)} aria-label="Ảnh sau" className="absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-heading shadow">
          <ChevronRight size={18} />
        </button>
        <div className="absolute bottom-6 left-7 text-white">
          <p className="text-xs font-semibold uppercase">{GALLERY[i].label}</p>
          <p className="mt-1 text-xl font-semibold">{GALLERY[i].caption}</p>
        </div>
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-1.5">
          {[0, 1, 2, 3, 4].map((k) => (
            <span key={k} className={`h-1.5 rounded-full ${k === i ? "w-6 bg-white" : "w-1.5 bg-white/50"}`} />
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-[repeat(4,1fr)_190px]">
        {GALLERY.map((g, k) => (
          <button
            key={g.src}
            onClick={() => setI(k)}
            className={`relative h-[88px] overflow-hidden rounded-xl border-2 ${k === i ? "border-primary-600" : "border-transparent"}`}
          >
            <img src={g.src} alt="" className="h-full w-full object-cover" />
            <span className="absolute bottom-1.5 left-2 text-[10px] font-medium text-white">{g.label}</span>
          </button>
        ))}
        <button className="col-span-2 flex h-[88px] items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-sm font-semibold text-white md:col-span-1">
          Xem tất cả 18 ảnh
        </button>
      </div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { id } = useParams(); // TODO: fetch dự án theo id
  const { hash: rawHash } = useLocation();
  const hash = rawHash.replace("#", "");
  useEffect(() => {
    if (hash) document.getElementById(hash)?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [hash]);
  const [liked, setLiked] = useState(false); // bảng favorites
  const [mapMode, setMapMode] = useState("map");
  const [buildingFilter, setBuildingFilter] = useState("Tất cả");
  const p = PROJECT;

  return (
    <div data-project={id} className="bg-white">
      <ProjectTabs activeHash={hash} />

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-50 via-primary-100 to-blue-200 pb-12 pt-8">
        <Container>
          <nav className="flex items-center gap-3 text-xs text-muted">
            <Link to="/">Trang chủ</Link> <ChevronRight size={12} />
            <Link to="/du-an">Dự án</Link> <ChevronRight size={12} />
            <span className="text-primary-600">{p.name}</span>
          </nav>

          <div className="mb-6 mt-6 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="flex gap-2">
                <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">{p.status}</span>
                <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">{p.updated}</span>
              </div>
              <h1 className="mt-4 text-5xl font-bold tracking-tight text-heading">{p.name}</h1>
              <p className="mt-4 flex items-center gap-2 text-lg text-body">
                <MapPin size={18} className="text-primary-600" /> {p.location}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted">Giá tham khảo</p>
              <p className="mt-2 text-4xl font-bold text-primary-600">{p.price}</p>
              <div className="mt-4 flex justify-end gap-3">
                <button onClick={() => setLiked(!liked)} className={`${outlineBtn} bg-white`}>
                  {liked ? "Đã lưu" : "Lưu dự án"} <Heart size={16} className={liked ? "fill-primary-600 text-primary-600" : ""} />
                </button>
                <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-6 py-3 text-sm font-medium text-white hover:opacity-95">
                  Nhận bảng giá <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <HeroGallery />
        </Container>
      </section>

      {/* Tổng quan */}
      <section className="py-16">
        <Container>
          <Heading id="tong-quan" eyebrow="Tổng quan" title="Một biểu tượng sống mới bên dòng sông Sài Gòn" desc={p.overview} />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {p.facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-2xl border border-line bg-primary-50/60 p-4 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100/70 text-primary-600">
                  <Icon size={16} />
                </span>
                <p className="mt-4 text-xs text-muted">{label}</p>
                <p className="mt-1 text-[15px] font-semibold text-heading">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_460px]">
            <div>
              <h3 className="text-2xl font-semibold text-heading">{p.storyTitle}</h3>
              {p.story.map((t) => (
                <p key={t} className="mt-5 text-[15px] leading-7 text-body">{t}</p>
              ))}
            </div>
            <div className="rounded-3xl border border-primary-200 bg-primary-50/70 p-6">
              <h3 className="text-lg font-semibold text-heading">Điểm nổi bật</h3>
              <ul className="mt-4 space-y-3">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-body">
                    <Check size={15} className="mt-0.5 shrink-0 text-primary-600" /> {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Vị trí */}
      <section className="bg-primary-50/70 py-16">
        <Container>
          <Heading
            id="vi-tri"
            eyebrow="Vị trí"
            title="Tâm điểm kết nối của đô thị Thủ Thiêm"
            desc="Từ Aurelia Riverside, cư dân kết nối Quận 1 trong 5 phút và tiếp cận nhanh mạng lưới metro, trường học, y tế, thương mại cao cấp."
          />
          <div className="grid gap-5 lg:grid-cols-[1fr_405px]">
            <div className="relative overflow-hidden rounded-3xl border border-line bg-white" style={{ height: 480 }}>
              <iframe
                title="Bản đồ dự án"
                className="h-full w-full"
                loading="lazy"
                src={`https://www.google.com/maps?q=${encodeURIComponent(p.location)}&output=embed`}
              />
              <div className="absolute right-4 top-4 flex rounded-full bg-white p-1 text-xs shadow">
                {[["map", "Bản đồ"], ["sat", "Vệ tinh"]].map(([k, l]) => (
                  <button key={k} onClick={() => setMapMode(k)} className={`rounded-full px-4 py-1.5 font-medium ${mapMode === k ? "bg-primary-100 text-primary-600" : "text-body"}`}>
                    {l}
                  </button>
                ))}
              </div>
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-primary-600 px-3 py-2 text-white shadow-lg">
                <p className="text-xs font-semibold">{p.name}</p>
                <p className="text-[10px] text-white/80">Thủ Thiêm · Ven sông</p>
              </div>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6 shadow-lg shadow-primary-100/60">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-heading">Kết nối lân cận</h3>
                <a href="#vi-tri" className="text-sm font-medium text-primary-600">Mở chỉ đường</a>
              </div>
              <p className="mt-3 text-sm text-body">Khoảng cách ước tính theo tuyến đường di chuyển ngắn nhất.</p>
              <ul className="mt-5 space-y-3">
                {NEARBY.map(({ icon: Icon, name, distance }) => (
                  <li key={name} className="flex items-center gap-3 rounded-xl bg-primary-50/70 px-3 py-3.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-primary-600">
                      <Icon size={15} />
                    </span>
                    <span className="flex-1 text-sm font-medium text-heading">{name}</span>
                    <span className="text-xs font-semibold text-primary-600">{distance}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Phân khu */}
      <section className="py-16">
        <Container>
          <Heading id="phan-khu" eyebrow="Phân khu" title="Ba sắc thái sống, một chuẩn mực Aurelia" desc="Mỗi tòa tháp sở hữu ngôn ngữ cảnh quan, tầm nhìn và bộ sưu tập sản phẩm riêng biệt." />
          <div className="grid gap-5 md:grid-cols-3">
            {ZONES.map((z) => (
              <div key={z.name} className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
                <img src={z.image} alt={z.name} className="w-full object-cover" style={{ height: 210 }} />
                <div className="flex items-start justify-between gap-3 p-5 pb-10">
                  <div>
                    <p className="text-lg font-semibold text-heading">{z.name}</p>
                    <p className="mt-1.5 text-sm text-body">{z.description}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${TONE_STYLE[z.tone]}`}>{z.status}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mặt bằng & quỹ căn */}
      <section className="bg-primary-50/70 py-16">
        <Container>
          <Heading
            id="mat-bang"
            eyebrow="Mặt bằng & quỹ căn"
            title="Chọn đúng tòa, đúng tầng, đúng tầm nhìn"
            desc="Khám phá mặt bằng tổng thể và tình trạng sản phẩm cập nhật gần thời gian thực. Chọn điểm trên sơ đồ để xem nhanh quỹ căn tương ứng."
            action={
              <div className="flex items-center gap-4 rounded-full border border-line bg-white px-4 py-2.5 text-xs text-body">
                {[["bg-success", "Còn hàng"], ["bg-warning", "Sắp mở bán"], ["bg-danger", "Đã bán"]].map(([c, l]) => (
                  <span key={l} className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${c}`} /> {l}
                  </span>
                ))}
              </div>
            }
          />

          <div className="grid gap-5 lg:grid-cols-[1fr_420px]">
            <div className="relative overflow-hidden rounded-3xl border border-line" style={{ height: 600 }}>
              <img src="https://images.unsplash.com/photo-1524813686514-a57563d77965?w=1400&q=80" alt="Mặt bằng tổng thể" className="h-full w-full object-cover" />
              <div className="absolute left-4 top-4 rounded-xl bg-white/95 px-4 py-2.5 shadow">
                <p className="text-sm font-semibold text-heading">Mặt bằng tổng thể</p>
                <p className="text-[11px] text-body">Hướng Bắc ↑ · Sông Sài Gòn phía Đông</p>
              </div>
              <div className="absolute right-4 top-4 flex flex-col gap-2">
                {[Plus, Minus].map((Icon, k) => (
                  <button key={k} aria-label={k ? "Thu nhỏ" : "Phóng to"} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow">
                    <Icon size={16} />
                  </button>
                ))}
              </div>
              {PINS.map((pin) => (
                <span
                  key={pin.code}
                  style={{ left: pin.left, top: pin.top }}
                  className={`absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white text-xs font-bold text-white shadow-lg ${pin.color}`}
                >
                  {pin.code}
                </span>
              ))}
            </div>

            <div className="rounded-3xl border border-line bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-heading">Tòa nhà & sản phẩm</h3>
                <span className="text-sm font-medium text-primary-600">126 căn phù hợp</span>
              </div>
              <div className="mt-4 flex gap-2">
                {["Tất cả", "Căn hộ", "Thấp tầng"].map((f) => (
                  <button key={f} onClick={() => setBuildingFilter(f)} className={`rounded-full px-3.5 py-1.5 text-xs font-medium ${buildingFilter === f ? "bg-primary-100 text-primary-600" : "text-heading"}`}>
                    {f}
                  </button>
                ))}
              </div>
              <ul className="mt-4 space-y-3">
                {BUILDINGS.map((b) => (
                  <li key={b.code} className={`flex items-center gap-3 rounded-xl border px-3 py-3 ${b.active ? "border-primary-300 bg-primary-50" : "border-transparent bg-primary-50/60"}`}>
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold ${b.active ? "bg-primary-600 text-white" : "bg-white text-heading"}`}>{b.code}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-heading">{b.name}</span>
                      <span className="block truncate text-[11px] text-body">{b.note}</span>
                    </span>
                    <span className="text-[11px] font-semibold text-primary-600">{b.meta}</span>
                  </li>
                ))}
              </ul>
              <Link to={`/du-an/${id}/mat-bang`} className="mt-4 flex items-center justify-center gap-2 rounded-full border border-primary-200 bg-primary-50 py-3 text-sm font-medium text-heading">
                Xem quỹ căn theo tòa <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {FACILITIES.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                  <Icon size={17} />
                </span>
                <span>
                  <span className="block text-xs text-body">{label}</span>
                  <span className="block text-sm font-semibold text-heading">{value}</span>
                </span>
              </div>
            ))}
          </div>

          <div id="quy-can" className="mt-6 scroll-mt-36 rounded-3xl border border-line bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-heading">Quỹ căn đang quan tâm</h3>
                <p className="mt-1 text-xs text-body">Dữ liệu mẫu · Cập nhật lúc 09:45 hôm nay</p>
              </div>
              <button className={outlineBtn}>
                Bộ lọc <SlidersHorizontal size={15} />
              </button>
            </div>
            <div className="mt-5 overflow-x-auto rounded-xl border border-line">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-primary-50/70 text-xs text-body">
                  <tr>
                    {["Mã căn", "Tòa", "Tầng", "Diện tích", "Phòng ngủ", "Hướng", "Giá tham khảo", "Trạng thái"].map((h) => (
                      <th key={h} className="px-4 py-3.5 font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PROPERTIES.map((r) => (
                    <tr key={r.code} className="border-t border-line text-body">
                      <td className="px-4 py-4 font-semibold text-heading">{r.code}</td>
                      <td className="px-4 py-4">{r.zone}</td>
                      <td className="px-4 py-4">{r.floor}</td>
                      <td className="px-4 py-4">{r.area}</td>
                      <td className="px-4 py-4">{r.bedrooms}</td>
                      <td className="px-4 py-4">{r.direction}</td>
                      <td className="px-4 py-4 font-medium text-primary-600">{r.price}</td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLE[r.status]}`}>{r.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted">
              <span>* Giá đã bao gồm VAT, chưa bao gồm phí bảo trì. Tình trạng có thể thay đổi theo thời gian thực.</span>
              <Link to={`/du-an/${id}/quy-can`} className="flex items-center gap-1 text-xs font-semibold text-primary-600">
                Xem toàn bộ 126 căn <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Ảnh 360 */}
      <section className="py-16">
        <Container>
          <Heading
            id="anh-360"
            eyebrow="Ảnh 360°"
            title="Bước vào không gian sống trước khi nhận nhà"
            desc="Khám phá căn hộ mẫu 3 phòng ngủ, sảnh đón và hệ tiện ích Aurelia bằng trải nghiệm toàn cảnh."
            action={<button className={`${outlineBtn} bg-white`}>Xem tất cả tour 360° <ArrowRight size={15} /></button>}
          />
          <div className="relative overflow-hidden rounded-3xl" style={{ height: 470 }}>
            <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80" alt="Tour 360" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-footer/80 via-footer/10 to-transparent" />
            <span className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] font-semibold uppercase text-heading">
              Tour 360° · Căn A1-03
            </span>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
              <button aria-label="Phát tour" className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-primary-600 shadow-xl">
                <Play size={28} />
              </button>
              <p className="mt-3 text-xs font-medium">Kéo để khám phá không gian</p>
            </div>
            {[["27%", "30%"], ["65%", "45%"]].map(([l, t]) => (
              <span key={l} style={{ left: l, top: t }} className="absolute flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary-600 text-white">
                <Plus size={14} />
              </span>
            ))}
            <div className="absolute bottom-7 left-7 text-white">
              <p className="text-2xl font-semibold">Căn hộ 3 phòng ngủ · 126,8 m²</p>
              <p className="mt-1 text-xs text-white/80">Tòa Terra · Tầm nhìn sông và trung tâm</p>
            </div>
            <div className="absolute bottom-7 right-7 flex gap-2">
              {["Phòng khách", "Bếp", "Phòng ngủ master"].map((r) => (
                <span key={r} className="rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-heading">{r}</span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Chính sách */}
      <section className="bg-primary-50/70 py-16">
        <Container>
          <Heading
            id="chinh-sach"
            eyebrow="Chính sách bán hàng"
            title="Phương án tài chính linh hoạt cho từng kế hoạch"
            desc="Chính sách áp dụng cho đợt mở bán tháng 10/2026, số lượng ưu đãi có giới hạn."
            action={<span className="rounded-full bg-warning/10 px-3 py-1.5 text-xs font-semibold text-warning">Hiệu lực đến 31/10/2026</span>}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {POLICIES.map((c) => (
              <div
                key={c.title}
                className={`rounded-3xl p-6 shadow-sm ${
                  c.featured ? "bg-gradient-to-b from-primary-700 to-footer text-white" : "border border-line bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-semibold ${c.featured ? "text-white" : "text-heading"}`}>{c.title}</h3>
                  {c.featured && <span className="rounded-full bg-warning/20 px-3 py-1 text-[11px] font-semibold text-amber-200">Ưu đãi tốt nhất</span>}
                </div>
                <p className={`mt-5 text-4xl font-bold ${c.featured ? "text-primary-200" : "text-primary-600"}`}>{c.big}</p>
                <p className={`mt-3 text-sm ${c.featured ? "text-primary-200" : "text-body"}`}>{c.desc}</p>
                <ul className="mt-4 space-y-2.5">
                  {c.items.map((it) => (
                    <li key={it} className={`flex items-center gap-3 text-sm ${c.featured ? "text-white" : "text-body"}`}>
                      <span className={`flex h-6 w-6 items-center justify-center rounded-full ${c.featured ? "bg-white/15" : "bg-primary-100"}`}>
                        <Check size={13} className={c.featured ? "text-white" : "text-primary-600"} />
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Tiến độ */}
      <section className="py-16">
        <Container>
          <Heading
            id="tien-do"
            eyebrow="Tiến độ"
            title="Minh bạch từng cột mốc xây dựng"
            desc="Hình ảnh và báo cáo tiến độ được đội ngũ NovaLand Hub xác thực định kỳ hàng tháng."
            action={<button className={outlineBtn}>Xem ảnh công trường <Images size={15} /></button>}
          />
          <div className="relative grid grid-cols-2 gap-y-8 md:grid-cols-5">
            <span className="absolute left-[10%] right-[10%] top-[9px] hidden h-0.5 bg-line md:block" />
            <span className="absolute left-[10%] top-[9px] hidden h-0.5 w-[40%] bg-primary-300 md:block" />
            {PROGRESS.map((s) => (
              <div key={s.title} className="relative text-center">
                <span
                  className={`relative mx-auto flex h-5 w-5 items-center justify-center rounded-full ${
                    s.state === "done" ? "bg-success text-white" : s.state === "current" ? "bg-primary-600" : "border-2 border-line bg-white"
                  }`}
                >
                  {s.state === "done" && <Check size={11} strokeWidth={3} />}
                  {s.state === "current" && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                <p className="mt-5 text-[11px] font-semibold text-primary-600">{s.date}</p>
                <p className="mt-2 font-semibold text-heading">{s.title}</p>
                <p className="mt-2 text-xs text-body">{s.desc}</p>
                {s.state === "current" && (
                  <span className="mt-3 inline-block rounded-full bg-primary-100 px-3 py-1 text-[11px] font-semibold text-primary-700">Đang triển khai</span>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Tài liệu */}
      <section className="bg-primary-50/70 py-16">
        <Container>
          <Heading
            id="tai-lieu"
            eyebrow="Tài liệu"
            title="Thông tin đầy đủ để ra quyết định"
            desc="Tải xuống tài liệu chính thức, được cập nhật và kiểm chứng bởi NovaLand Hub."
            action={<button className={outlineBtn}>Tải tất cả <Download size={15} /></button>}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DOCUMENTS.map(({ icon: Icon, title, size, note }) => (
              <a key={title} href="#tai-lieu" className="rounded-2xl border border-line bg-white p-5 shadow-sm hover:border-primary-300">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                  <Icon size={18} />
                </span>
                <p className="mt-6 font-semibold text-heading">{title}</p>
                <p className="mt-2 text-xs text-body">{size}</p>
                <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[11px] text-muted">
                  {note} <Download size={15} className="text-primary-600" />
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Tin tức */}
      <section className="py-16">
        <Container>
          <Heading
            id="tin-tuc"
            eyebrow="Tin tức"
            title="Cập nhật mới quanh dự án và Thủ Thiêm"
            desc="Theo dõi hạ tầng, thị trường và góc nhìn chuyên gia có liên quan trực tiếp đến quyết định của bạn."
            action={<button className={outlineBtn}>Xem tất cả tin tức <ArrowRight size={15} /></button>}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {NEWS.map((n) => (
              <article key={n.title} className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
                <img src={n.image} alt={n.title} className="w-full object-cover" style={{ height: 220 }} />
                <div className="p-5 pb-8">
                  <p className="text-[11px] font-semibold uppercase text-primary-600">{n.category}</p>
                  <p className="mt-2 text-lg font-semibold leading-snug text-heading">{n.title}</p>
                  <p className="mt-3 text-xs text-muted">{n.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
