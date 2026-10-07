import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

// Vị trí ghim tính theo % trên ảnh bản đồ
const PINS = [
  { id: 1, label: "5,2 tỷ", top: "30%", left: "35%" },
  { id: 2, label: "6,8 tỷ", top: "55%", left: "55%" },
  { id: 3, label: "24,5 tỷ", top: "40%", left: "70%" },
  { id: 4, label: "3,9 tỷ", top: "70%", left: "30%" },
];

const DISTRICTS = [
  { name: "Thủ Đức", price: "72 tr/m²", change: 4.2 },
  { name: "Quận 7", price: "85 tr/m²", change: 2.8 },
  { name: "Quận 2", price: "160 tr/m²", change: -1.1 },
  { name: "Bình Thạnh", price: "95 tr/m²", change: 3.5 },
];

export default function MapSection() {
  const [activePin, setActivePin] = useState(1);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          badge="Bản đồ thông minh"
          title="Nhìn toàn cảnh, chọn đúng từng căn"
          desc="Xem giá, tiện ích và quy hoạch ngay trên bản đồ — so sánh khu vực chỉ trong vài giây."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* Bản đồ */}
          <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-line bg-primary-50">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&q=80"
              alt="Bản đồ"
              className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale"
            />

            {/* Ô tìm kiếm */}
            <div className="absolute left-4 right-4 top-4 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-lg md:right-auto md:w-80">
              <Search size={16} className="text-body" />
              <input
                placeholder="Tìm khu vực, dự án..."
                className="flex-1 bg-transparent text-sm focus:outline-none"
              />
            </div>

            {/* Ghim giá */}
            {PINS.map((pin) => (
              <button
                key={pin.id}
                onClick={() => setActivePin(pin.id)}
                style={{ top: pin.top, left: pin.left }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg transition ${
                  activePin === pin.id
                    ? "scale-110 bg-primary-600 text-white"
                    : "bg-white text-heading hover:bg-primary-50"
                }`}
              >
                {pin.label}
              </button>
            ))}
          </div>

          {/* Bảng giá khu vực */}
          <div className="rounded-3xl border border-line bg-white p-6">
            <h3 className="font-semibold text-heading">Giá trung bình theo khu vực</h3>
            <p className="mt-1 text-xs text-body">Cập nhật tháng này</p>

            <ul className="mt-5 divide-y divide-line">
              {DISTRICTS.map((d) => {
                const up = d.change >= 0;
                return (
                  <li key={d.name} className="flex items-center justify-between py-4">
                    <div>
                      <p className="text-sm font-medium text-heading">{d.name}</p>
                      <p className="text-xs text-body">{d.price}</p>
                    </div>
                    <span
                      className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                        up ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                      }`}
                    >
                      {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {up ? "+" : ""}
                      {d.change}%
                    </span>
                  </li>
                );
              })}
            </ul>

            <Link
              to="/ban-do"
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-primary-50 py-3 text-sm font-medium text-primary-600 transition hover:bg-primary-600 hover:text-white"
            >
              Mở bản đồ đầy đủ <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
