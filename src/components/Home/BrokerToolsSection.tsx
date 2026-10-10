import { Link } from "react-router-dom";
import { LayoutDashboard, Users, FileText, BarChart3, Settings, Zap, ShieldCheck, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "../common/Reveal";
import { GOLD_BUTTON } from "./homeStyles";

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
    <section className="bg-ink-900 py-20">
      <div className="container mx-auto grid items-center gap-12 px-4 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        {/* Dashboard mô phỏng */}
        <Reveal variant="left">
        <div className="flex overflow-hidden rounded-3xl border border-white/10 bg-ink-950/70 shadow-2xl shadow-black/40">
          <aside className="hidden w-44 shrink-0 border-r border-white/10 p-4 sm:block">
            <p className="mb-6 font-display text-base text-white">NovaLand Pro</p>
            <nav className="space-y-1">
              {MENU.map(({ icon: Icon, label, active }) => (
                <span
                  key={label}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${
                    active ? "bg-gold-300 font-medium text-gold-950" : "text-white/55"
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
                <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-xs text-white/50">{s.label}</p>
                  <p className="mt-1 font-display text-2xl text-white">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-white/10 p-4">
              <p className="text-xs font-medium text-white/80">Lượt quan tâm tuần này</p>
              <div className="mt-4 flex h-36 items-end gap-2">
                {BARS.map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      style={{ height: `${h}%` }}
                      className={`w-full rounded-t-md ${
                        i === 5 ? "bg-gradient-to-t from-gold-400 to-gold-200" : "bg-white/15"
                      }`}
                    />
                    <span className="text-[10px] text-white/45">{DAYS[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </Reveal>

        {/* Nội dung phải */}
        <Reveal variant="right">
        <div>
          <SectionHeading
            badge="Dành cho môi giới"
            title={
              <>
                Làm việc thông minh hơn, <em>chốt giao dịch tự tin hơn</em>
              </>
            }
          />

          <div className="space-y-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-300/40 text-gold-200 transition group-hover:bg-gold-300 group-hover:text-gold-950">
                  <Icon size={19} />
                </span>
                <div>
                  <p className="font-medium text-white">{title}</p>
                  <p className="mt-1 text-sm text-white/60">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <Link to="/moi-gioi" className={`mt-8 ${GOLD_BUTTON}`}>
            Dùng thử miễn phí <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
          </Link>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
