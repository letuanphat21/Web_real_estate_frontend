import { Link } from "react-router-dom";
import { LayoutDashboard, Users, FileText, BarChart3, Settings, Zap, ShieldCheck, ArrowRight } from "lucide-react";

const MENU = [
  { icon: LayoutDashboard, label: "Tổng quan", active: true },
  { icon: Users, label: "Khách hàng" },
  { icon: FileText, label: "Tin đăng" },
  { icon: BarChart3, label: "Báo cáo" },
  { icon: Settings, label: "Cài đặt" },
];

const BARS = [40, 65, 50, 80, 60, 95, 75];
const DAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

const FEATURES = [
  { icon: Users, title: "Quản lý khách hàng", desc: "Theo dõi nhu cầu, lịch hẹn và lịch sử trao đổi ở một nơi." },
  { icon: Zap, title: "Đăng tin tự động", desc: "AI viết mô tả, gợi ý giá và đẩy tin lên nhiều kênh." },
  { icon: ShieldCheck, title: "Giao dịch an toàn", desc: "Kiểm tra pháp lý, hợp đồng mẫu và ký số ngay trên nền tảng." },
];

export default function BrokerToolsSection() {
  return (
    <section className="bg-primary-50 py-20">
      <div className="container mx-auto grid items-center gap-12 px-4 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        {/* Dashboard mô phỏng */}
        <div className="flex overflow-hidden rounded-3xl bg-white shadow-xl shadow-primary-100">
          <aside className="hidden w-44 shrink-0 border-r border-line p-4 sm:block">
            <p className="mb-6 text-sm font-semibold text-heading">NovaLand Pro</p>
            <nav className="space-y-1">
              {MENU.map(({ icon: Icon, label, active }) => (
                <span
                  key={label}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${
                    active ? "bg-primary-600 text-white" : "text-body"
                  }`}
                >
                  <Icon size={14} /> {label}
                </span>
              ))}
            </nav>
          </aside>

          <div className="flex-1 p-5">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Khách mới", value: "128" },
                { label: "Lịch hẹn", value: "24" },
                { label: "Giao dịch", value: "9" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-line p-3">
                  <p className="text-xs text-body">{s.label}</p>
                  <p className="mt-1 text-xl font-semibold text-heading">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-line p-4">
              <p className="text-xs font-medium text-heading">Lượt quan tâm tuần này</p>
              <div className="mt-4 flex h-36 items-end gap-2">
                {BARS.map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      style={{ height: `${h}%` }}
                      className={`w-full rounded-t-md ${
                        i === 5 ? "bg-primary-600" : "bg-primary-200"
                      }`}
                    />
                    <span className="text-[10px] text-body">{DAYS[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Nội dung phải */}
        <div>
          <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-medium text-primary-600">
            Dành cho môi giới
          </span>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-heading md:text-4xl">
            Làm việc thông minh hơn, chốt giao dịch tự tin hơn
          </h2>

          <div className="mt-8 space-y-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary-600 shadow-sm">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="font-medium text-heading">{title}</p>
                  <p className="mt-1 text-sm text-body">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/moi-gioi"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-primary-300/50 transition hover:opacity-95"
          >
            Dùng thử miễn phí <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
