import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, ChevronDown, Building2, Images } from "lucide-react";
import ProjectTabs from "../../components/ProjectDetail/ProjectTabs";

// TODO: thay bằng dữ liệu gọi từ API theo :id (progress + progress_images)
const PROJECT = { name: "Aurelia Riverside" };
const IMG = (id: string, w = 800) => `https://images.unsplash.com/${id}?w=${w}&q=80`;
const SITE = [
  "photo-1541888946425-d81bb19240f5",
  "photo-1504307651254-35680f356dfd",
  "photo-1486406146926-c627a92ad1ab",
  "photo-1590644365607-1c5a519a7a37",
  "photo-1503387762-592deb58ef4e",
];

type State = "done" | "building" | "ontrack" | "plan";

type Period = {
  key: string;
  title: string;
  short: string;
  percent: number;
  delta: string;
  status: State;
  heading: string;
  desc: string;
  img: string;
};

const PERIODS: Period[] = [
  { key: "t10", title: "Tháng 10/2026", short: "Thi công tầng 28–30", percent: 68, delta: "+4% so với tháng 09", status: "building", heading: "Cập nhật tiến độ tháng 10/2026", desc: "Hai tháp tiếp tục vượt cao độ kế hoạch, đồng thời triển khai song song hệ mặt dựng và MEP. Trong tháng, công trường duy trì trung bình 620 kỹ sư, công nhân và 4 cẩn cẩu tháp, không ghi nhận sự cố an toàn lao động.", img: SITE[0] },
  { key: "t09", title: "Tháng 09/2026", short: "Hoàn tất tầng 27", percent: 64, delta: "+5% so với tháng 08", status: "done", heading: "Cập nhật tiến độ tháng 09/2026", desc: "Kết cấu thân đạt tầng 27, bắt đầu lắp kính low-e cho khối đế và tầng thấp.", img: SITE[1] },
  { key: "t08", title: "Tháng 08/2026", short: "Kết cấu tầng 24", percent: 59, delta: "+6% so với tháng 07", status: "done", heading: "Cập nhật tiến độ tháng 08/2026", desc: "Hoàn thiện kết cấu tầng 24, triển khai trục kỹ thuật và hạ tầng ngầm khu trung tâm.", img: SITE[2] },
  { key: "q2", title: "Quý II/2026", short: "Hoàn tất khối đế", percent: 48, delta: "+16% so với quý I", status: "done", heading: "Cập nhật tiến độ quý II/2026", desc: "Hoàn tất khối đế, bắt đầu kết cấu thân tháp A và tháp B.", img: SITE[3] },
  { key: "q1", title: "Quý I/2026", short: "Thi công tầng hầm", percent: 32, delta: "Mốc đầu năm", status: "done", heading: "Cập nhật tiến độ quý I/2026", desc: "Hoàn thành thi công tầng hầm và bắt đầu kết cấu khối đế.", img: SITE[4] },
];

const CATEGORIES: { name: string; note: string; value: number; state: State }[] = [
  { name: "Kết cấu", note: "Tháp A tầng 30 · Tháp B tầng 28", value: 82, state: "ontrack" },
  { name: "Mặt ngoài", note: "Lắp kính low-e từ tầng 6–12", value: 56, state: "building" },
  { name: "MEP", note: "Lắp đặt trục kỹ thuật tầng 5–16", value: 49, state: "building" },
  { name: "Cảnh quan", note: "Hoàn thiện hạ tầng ngầm khu trung tâm", value: 28, state: "building" },
  { name: "Tiện ích", note: "Chuẩn bị thi công hồ bơi & clubhouse", value: 18, state: "plan" },
];

const GALLERY = [
  { img: SITE[0], title: "Tháp A · Tầng 30", date: "Chụp ngày 01/10/2026", big: true },
  { img: SITE[1], title: "Mặt ngoài Tháp A", date: "30/09/2026" },
  { img: SITE[3], title: "Hệ MEP tầng 12", date: "28/09/2026" },
  { img: SITE[4], title: "Khối đế trung tâm", date: "29/09/2026" },
  { img: SITE[2], title: "Toàn cảnh công trường", date: "01/10/2026 · Xem thêm 14 ảnh" },
];

const STATE: Record<State, { label: string; badge: string; dot: string }> = {
  done: { label: "Hoàn thành", badge: "bg-success/10 text-success", dot: "bg-success" },
  building: { label: "Đang thi công", badge: "bg-warning/10 text-warning", dot: "bg-warning" },
  ontrack: { label: "Đúng tiến độ", badge: "bg-success/10 text-success", dot: "bg-success" },
  plan: { label: "Kế hoạch", badge: "bg-primary-100 text-primary-700", dot: "bg-primary-600" },
};

function Badge({ state, className = "" }: { state: State; className?: string }) {
  const s = STATE[state];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${s.badge} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} /> {s.label}
    </span>
  );
}

export default function ProjectProgressPage() {
  const { id } = useParams();
  const base = `/du-an/${id}`;
  const [active, setActive] = useState("t10");
  const period = PERIODS.find((x) => x.key === active) ?? PERIODS[0];
  const factor = period.percent / 68;

  return (
    <div className="bg-white">
      <ProjectTabs />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-200 to-white pb-14 pt-8">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-3 text-xs text-muted">
            <Link to="/">Trang chủ</Link> <ChevronRight size={12} />
            <Link to={base}>{PROJECT.name}</Link> <ChevronRight size={12} />
            <span className="font-semibold text-primary-600">Tiến độ</span>
          </nav>
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1fr_470px]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase text-primary-700">
                <Building2 size={12} /> Aurelia Riverside · Thủ Thiêm, TP.HCM
              </span>
              <h1 className="mt-5 flex flex-wrap items-center gap-4 text-5xl font-bold text-heading">
                Tiến độ dự án <Badge state="building" />
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-body">
                Theo dõi minh bạch từng hạng mục xây dựng và những hình ảnh mới nhất được xác nhận bởi Ban quản lý dự án.
              </p>
              <div className="mt-6 flex items-center gap-6">
                <p className="text-4xl font-bold text-primary-600">68% <span className="text-sm font-semibold text-heading">hoàn thành tổng thể</span></p>
                <div className="border-l border-line pl-6">
                  <p className="text-[11px] text-muted">Cập nhật gần nhất</p>
                  <p className="text-sm font-semibold text-heading">01/10/2026 · 16:30</p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-primary-100" style={{ height: 236 }}>
              <img src={IMG(SITE[2], 1000)} alt="Toàn cảnh công trường" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-footer/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 text-white">
                <p className="text-lg font-semibold">Toàn cảnh công trường tháng 10</p>
                <p className="text-[11px] text-white/80">Flycam hướng Đông Nam · 01/10/2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nhật ký */}
      <section className="bg-primary-50/70 py-14">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-primary-600">Nhật ký công trường</p>
              <h2 className="mt-2 text-4xl font-semibold text-heading">Tiến độ được cập nhật theo từng kỳ</h2>
              <p className="mt-2 text-sm text-body">Chọn một mốc thời gian để theo dõi báo cáo thi công, hình ảnh thực tế và xác nhận của Ban quản lý dự án.</p>
            </div>
            <div className="flex gap-2">
              {(["done", "building", "plan"] as const).map((s) => <Badge key={s} state={s} />)}
            </div>
          </div>

          <div className="mt-6 grid items-start gap-5 lg:grid-cols-[350px_1fr]">
            {/* Danh sách kỳ */}
            <aside className="rounded-3xl border border-line bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-heading">Các kỳ cập nhật</h3>
              <p className="text-[11px] text-muted">Từ mới nhất đến cột mốc khởi công</p>
              <ul className="relative mt-4 space-y-3">
                <span className="absolute bottom-4 left-4 top-4 w-px bg-line" />
                {PERIODS.map((x) => {
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

            {/* Chi tiết kỳ */}
            <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-2xl">
                  <p className="flex items-center gap-3 text-[10px] font-semibold uppercase text-primary-600">
                    Kỳ đang xem <Badge state={period.status} />
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold text-heading">{period.heading}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">{period.desc}</p>
                </div>
                <div className="rounded-2xl bg-primary-50 px-5 py-3 text-right">
                  <p className="text-[11px] text-body">Hoàn thành tổng thể</p>
                  <p className="text-4xl font-bold text-primary-600">{period.percent}%</p>
                  <p className="text-[10px] font-semibold text-success">{period.delta}</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-line">
                {CATEGORIES.map((c, i) => {
                  const v = Math.min(100, Math.round(c.value * factor));
                  return (
                    <div key={c.name} className={`px-5 py-4 ${i ? "border-t border-line" : ""}`}>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-heading">{c.name}</p>
                          <p className="text-[11px] text-body">{c.note}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge state={c.state} />
                          <span className="w-10 text-right text-sm font-bold text-heading">{v}%</span>
                        </div>
                      </div>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
                        <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-700" style={{ width: `${v}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-semibold text-heading">Hình ảnh thực tế công trường</h4>
                  <p className="text-[11px] text-muted">Bộ ảnh được chụp và xác minh ngày 01/10/2026</p>
                </div>
                <span className="flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1.5 text-[11px] font-semibold text-primary-700">
                  <Images size={13} /> 18 ảnh
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-[1.35fr_1fr_1fr]" style={{ gridAutoRows: 190 }}>
                {GALLERY.map((g) => (
                  <div key={g.title} className={`relative overflow-hidden rounded-2xl ${g.big ? "row-span-2" : ""}`}>
                    <img src={IMG(g.img, g.big ? 900 : 600)} alt={g.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-footer/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 text-white">
                      <p className={`font-semibold ${g.big ? "text-lg" : "text-xs"}`}>{g.title}</p>
                      <p className="text-[10px] text-white/80">{g.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
