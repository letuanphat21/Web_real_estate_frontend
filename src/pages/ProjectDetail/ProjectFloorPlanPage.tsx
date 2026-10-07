import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  Building2,
  Plus,
  Minus,
  Lock,
  ArrowRight,
} from "lucide-react";
import ProjectTabs from "../../components/ProjectDetail/ProjectTabs";
import BookingLockModal, {
  type BookingUnit,
} from "../../components/ProjectDetail/BookingLockModal";

// TODO: thay bằng dữ liệu gọi từ API theo :id (bảng property: property_code, area, price, direction, floor, status, bedrooms)
const PROJECT = { name: "Aurelia Riverside" };

const STATUS: Record<
  string,
  { label: string; badge: string; dot: string; pin: string }
> = {
  available: {
    label: "Còn trống",
    badge: "bg-success/10 text-success",
    dot: "bg-success",
    pin: "bg-success",
  },
  holding: {
    label: "Đang giữ chỗ",
    badge: "bg-warning/10 text-warning",
    dot: "bg-warning",
    pin: "bg-warning",
  },
  sold: {
    label: "Đã bán",
    badge: "bg-danger/10 text-danger",
    dot: "bg-danger",
    pin: "bg-danger",
  },
  closed: {
    label: "Chưa mở bán",
    badge: "bg-line text-body",
    dot: "bg-muted",
    pin: "bg-muted",
  },
};

// Vị trí căn trên mặt bằng tầng (toạ độ % trên khung sơ đồ)
const UNITS = [
  { no: "1201", left: "19%", top: "21%", status: "available" },
  { no: "1202", left: "40%", top: "17%", status: "holding" },
  { no: "1203", left: "63%", top: "22%", status: "sold" },
  { no: "1204", left: "79%", top: "33%", status: "available" },
  { no: "1205", left: "16%", top: "59%", status: "closed" },
  { no: "1206", left: "34%", top: "73%", status: "available" },
  { no: "1207", left: "58%", top: "70%", status: "holding" },
  { no: "1208", left: "82%", top: "62%", status: "available" },
];

const SELECTED = {
  code: "AR-A1-1208",
  status: "available",
  image:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80",
  rows: [
    ["Tòa / tầng", "A1 · Tầng 12"],
    ["Diện tích", "92,6 m²"],
    ["Phòng ngủ", "3 PN · 2 WC"],
    ["Hướng", "Đông Nam · Hướng sông"],
  ],
  price: "16,85 tỷ",
  note: "≈ 181,9 triệu/m² · Đã gồm VAT",
};

const BOOKING_UNIT: BookingUnit = {
  code: SELECTED.code,
  image: SELECTED.image,
  statusLabel: "Còn trống",
  location: "Tòa A1 · Tầng 12",
  spec: "3 PN · 2 WC · 92,6 m²",
  direction: "Đông Nam · Hướng sông",
  price: SELECTED.price,
};

const FEATURED = [
  {
    code: "AR-A1-1208",
    spec: "3 PN · 92,6 m² · Đông Nam",
    price: "16,85 tỷ",
    status: "available",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80",
  },
  {
    code: "AR-A2-1805",
    spec: "2 PN · 76,8 m² · Hướng sông",
    price: "13,42 tỷ",
    status: "holding",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80",
  },
  {
    code: "AR-B1-2302",
    spec: "3 PN+ · 118,2 m² · Góc",
    price: "22,10 tỷ",
    status: "available",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80",
  },
];

// Mặt bằng tầng điển hình (placeholder SVG, thay bằng ảnh mặt bằng thật)
function FloorPlan() {
  const zones = [
    {
      d: "M 60 60 L 280 60 L 280 240 L 160 240 L 60 160 Z",
      fill: "var(--color-primary-100)",
    },
    { d: "M 280 60 L 500 60 L 500 160 L 400 240 L 280 240 Z", fill: "#dcfce7" },
    { d: "M 500 60 L 640 160 L 600 260 L 500 260 Z", fill: "#fee2e2" },
    { d: "M 60 240 L 160 240 L 280 360 L 160 480 L 60 360 Z", fill: "#fef3c7" },
    {
      d: "M 600 260 L 640 360 L 520 480 L 400 400 L 500 260 Z",
      fill: "#e0e7ff",
    },
    {
      d: "M 160 480 L 280 360 L 400 400 L 520 480 L 400 560 L 260 560 Z",
      fill: "#dcfce7",
    },
  ];
  return (
    <svg viewBox="0 0 700 620" className="h-full w-full">
      <ellipse
        cx="350"
        cy="310"
        rx="290"
        ry="285"
        fill="white"
        stroke="var(--color-line)"
        strokeWidth="6"
      />
      <clipPath id="plan-clip">
        <ellipse cx="350" cy="310" rx="280" ry="275" />
      </clipPath>
      <g clipPath="url(#plan-clip)">
        {zones.map((z, i) => (
          <path
            key={i}
            d={z.d}
            fill={z.fill}
            stroke="var(--color-heading)"
            strokeWidth="5"
            transform="translate(0 0)"
          />
        ))}
      </g>
      <rect
        x="240"
        y="190"
        width="220"
        height="240"
        fill="white"
        stroke="var(--color-heading)"
        strokeWidth="6"
      />
      <rect
        x="270"
        y="220"
        width="60"
        height="70"
        fill="none"
        stroke="var(--color-heading)"
        strokeWidth="4"
      />
      <rect
        x="370"
        y="220"
        width="60"
        height="70"
        fill="none"
        stroke="var(--color-heading)"
        strokeWidth="4"
      />
      <rect
        x="270"
        y="330"
        width="160"
        height="70"
        fill="none"
        stroke="var(--color-heading)"
        strokeWidth="4"
      />
      <text
        x="350"
        y="318"
        textAnchor="middle"
        fontSize="13"
        fill="var(--color-body)"
      >
        LOBBY
      </text>
    </svg>
  );
}

export default function ProjectFloorPlanPage() {
  const { id } = useParams();
  const base = `/projects/${id}`;
  const [selected, setSelected] = useState("1208");
  const [booking, setBooking] = useState(false);
  const p = PROJECT;
  const s = STATUS[SELECTED.status];

  return (
    <div className="bg-white">
      <ProjectTabs />
      {booking && (
        <BookingLockModal
          unit={BOOKING_UNIT}
          onClose={() => setBooking(false)}
        />
      )}

      <section className="bg-gradient-to-b from-blue-200 to-white pb-14 pt-8">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-3 text-xs text-muted">
            <Link to="/">Trang chủ</Link> <ChevronRight size={12} />
            <Link to={base}>{p.name}</Link> <ChevronRight size={12} />
            <span className="text-primary-600">Mặt bằng quỹ căn</span>
          </nav>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase text-primary-700">
                <Building2 size={12} /> Aurelia Riverside · Thủ Thiêm
              </span>
              <h1 className="mt-4 text-5xl font-bold text-heading">
                Mặt bằng quỹ căn
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-body">
                Chọn đúng tòa, đúng tầng và đúng tầm nhìn. Dữ liệu sản phẩm được
                cập nhật gần thời gian thực từ giỏ hàng Aurelia Riverside.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-white px-5 py-3 text-center shadow-sm">
              <p className="text-[11px] text-muted">Quỹ căn khả dụng</p>
              <p className="text-3xl font-semibold text-heading">126 căn</p>
              <p className="flex items-center justify-center gap-1.5 text-[10px] text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> Vừa cập
                nhật
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sơ đồ + căn đang chọn */}
      <section className="bg-primary-50/70 py-12">
        <div className="container mx-auto grid gap-5 px-4 lg:grid-cols-[1fr_380px] lg:px-8">
          <div
            className="relative overflow-hidden rounded-3xl border border-line bg-white"
            style={{ height: 660 }}
          >
            <div className="absolute inset-0 p-10">
              <FloorPlan />
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
            {UNITS.map((u) => (
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

          <aside className="rounded-3xl border border-primary-200 bg-white p-5 shadow-lg shadow-primary-100/60">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase text-primary-600">
                  Căn đang chọn
                </p>
                <p className="mt-1 text-3xl font-semibold text-heading">
                  {SELECTED.code}
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
              src={SELECTED.image}
              alt={SELECTED.code}
              className="mt-4 w-full rounded-2xl object-cover"
              style={{ height: 145 }}
            />
            <dl className="mt-5">
              {SELECTED.rows.map(([k, v]) => (
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
                {SELECTED.price}
              </p>
              <p className="mt-1 text-[10px] text-muted">{SELECTED.note}</p>
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
        </div>
      </section>

      {/* Gợi ý */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-primary-600">
                Gợi ý theo lựa chọn của bạn
              </p>
              <h2 className="mt-2 text-4xl font-semibold text-heading">
                Các căn nổi bật cùng phân khu
              </h2>
              <p className="mt-2 text-sm text-body">
                Phối cảnh và nội thất tham khảo, đi kèm dữ liệu sản phẩm mới
                nhất.
              </p>
            </div>
            <Link
              to={`${base}/quy-can`}
              className="flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-6 py-3 text-sm font-medium text-heading hover:bg-primary-100"
            >
              Xem toàn bộ quỹ căn <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {FEATURED.map((f) => {
              const st = STATUS[f.status];
              return (
                <article
                  key={f.code}
                  className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm"
                >
                  <img
                    src={f.image}
                    alt={f.code}
                    className="w-full object-cover"
                    style={{ height: 200 }}
                  />
                  <div className="p-5 pb-7">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-heading">
                        {f.code}
                      </h3>
                      <span
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium ${st.badge}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${st.dot}`}
                        />{" "}
                        {st.label}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-body">{f.spec}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xl font-bold text-primary-600">
                        {f.price}
                      </p>
                      <Link
                        to={`${base}/quy-can`}
                        className="flex items-center gap-1 text-xs font-medium text-heading"
                      >
                        Xem chi tiết <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
