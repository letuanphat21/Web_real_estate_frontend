import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "../common/Reveal";

// Vị trí ghim tính theo % trên ảnh bản đồ
const PINS = [
  { id: 1, label: "5,2 tỷ", top: "30%", left: "35%" },
  { id: 2, label: "6,8 tỷ", top: "55%", left: "55%" },
  { id: 3, label: "24,5 tỷ", top: "40%", left: "70%" },
  { id: 4, label: "3,9 tỷ", top: "70%", left: "30%" },
];

// TODO: thay bằng dữ liệu gọi từ API
const FILTERS = ["Giá 3–8 tỷ", "Tòa 9–10", "Hướng Đông", "2–3 PN"];
const UNITS = [
  { code: "A1-1208", detail: "Tầng 12 · Đông Nam · 92 m²", price: "4,95 tỷ", status: "Còn trống", ok: true },
  { code: "B2-1806", detail: "Tầng 18 · Tây Bắc · 86 m²", price: "5,28 tỷ", status: "Còn trống", ok: true },
  { code: "A3-0902", detail: "Tầng 9 · Đông Bắc · 78 m²", price: "4,12 tỷ", status: "Giữ chỗ", ok: false },
];

export default function MapSection() {
  const [activePin, setActivePin] = useState(1);

  return (
    <section className="bg-ink-950 py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          badge="Bản đồ & quỹ căn"
          title={
            <>
              Nhìn toàn cảnh, <em>chọn đúng từng căn</em>
            </>
          }
          desc="Dữ liệu từng căn được xác thực — kiểm tra giá, hướng, diện tích, tầng ngay trên bản đồ."
          action={
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <span key={f} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 transition hover:border-gold-300/50 hover:text-gold-200">
                  {f}
                </span>
              ))}
            </div>
          }
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* Bản đồ */}
          <Reveal variant="left">
          <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-ink-900">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&q=80"
              alt="Bản đồ"
              className="absolute inset-0 h-full w-full object-cover opacity-35 grayscale"
            />

            {/* Ô tìm kiếm */}
            <div className="absolute left-4 right-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-ink-950/80 px-4 py-2.5 shadow-lg shadow-black/30 backdrop-blur md:right-auto md:w-80">
              <Search size={16} className="text-white/50" />
              <input
                placeholder="Tìm khu vực, dự án..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
            </div>

            {/* Ghim giá */}
            {PINS.map((pin) => (
              <button
                key={pin.id}
                onClick={() => setActivePin(pin.id)}
                style={{ top: pin.top, left: pin.left }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg shadow-black/40 transition ${
                  activePin === pin.id
                    ? "scale-110 bg-gold-300 text-gold-950"
                    : "bg-ink-950/85 text-white ring-1 ring-white/15 backdrop-blur hover:ring-gold-300/60"
                }`}
              >
                {pin.label}
              </button>
            ))}
          </div>
          </Reveal>

          {/* Quỹ căn */}
          <Reveal variant="right" delay={150}>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="font-display text-xl text-white">Quỹ căn The Lumen</h3>
            <p className="mt-1 text-xs text-white/50">Cập nhật real-time · 5 phút trước</p>

            <ul className="mt-5 divide-y divide-white/10">
              {UNITS.map((u) => (
                <li key={u.code} className="-mx-3 flex items-center justify-between rounded-xl px-3 py-4 transition hover:bg-white/[0.05]">
                  <div>
                    <p className="text-sm font-semibold text-white">{u.code}</p>
                    <p className="text-xs text-white/55">{u.detail}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gold-200">{u.price}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${u.ok ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                      {u.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              to="/ban-do"
              className="mt-4 flex items-center justify-center gap-2 rounded-full border border-gold-300/40 py-3 text-sm font-medium text-gold-200 transition hover:bg-gold-300 hover:text-gold-950"
            >
              Xem toàn bộ quỹ căn <ArrowRight size={16} />
            </Link>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
