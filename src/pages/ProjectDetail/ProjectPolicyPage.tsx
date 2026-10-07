import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  CalendarDays,
  Info,
  Check,
  Landmark,
  ArrowUpRight,
} from "lucide-react";
import ProjectTabs from "../../components/ProjectDetail/ProjectTabs";
import { PROJECT, HIGHLIGHTS, SCHEDULE, LOAN_STATS, CONDITIONS } from "../../data/projectDetail/policy";

const Eyebrow = ({ children, className = "text-primary-600" }: { children: ReactNode; className?: string }) => (
  <p className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wide ${className}`}>
    <span className="h-px w-6 bg-current" /> {children}
  </p>
);

export default function ProjectPolicyPage() {
  const { id } = useParams();
  const base = `/du-an/${id}`;

  return (
    <div className="bg-primary-50/70">
      <ProjectTabs />

      <div className="container mx-auto px-4 pb-20 pt-8 lg:px-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-footer via-primary-700 to-primary-500 p-9 text-white shadow-xl shadow-primary-200" style={{ minHeight: 270 }}>
          <span className="absolute -right-10 -top-28 h-[420px] w-[420px] rounded-full bg-white/10" />
          <span className="absolute bottom-[-120px] right-40 h-[260px] w-[260px] rounded-full bg-white/10" />
          <div className="relative">
            <nav className="flex items-center gap-3 text-xs text-white/70">
              <Link to="/">Trang chủ</Link> <ChevronRight size={12} />
              <Link to={base}>{PROJECT.name}</Link> <ChevronRight size={12} />
              <span className="font-semibold text-white">Chính sách bán hàng</span>
            </nav>
            <h1 className="mt-5 text-5xl font-bold">Chính sách bán hàng</h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/85">
              Ưu đãi tài chính linh hoạt dành cho khách hàng sở hữu căn hộ Aurelia Riverside trong giai đoạn mở bán tháng 10/2026.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-4 text-xs">
              <span className="flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> Đang áp dụng
              </span>
              <span className="flex items-center gap-2 text-white/80">
                <CalendarDays size={14} /> Áp dụng từ 01/10/2026 đến khi có thông báo mới
              </span>
            </div>
          </div>
        </section>

        {/* Ưu đãi nổi bật */}
        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Quyền lợi dành riêng</Eyebrow>
              <h2 className="mt-3 text-3xl font-semibold text-heading">Ưu đãi nổi bật</h2>
              <p className="mt-2 text-sm text-body">Bốn quyền lợi có thể kết hợp theo phương thức thanh toán và hồ sơ của từng khách hàng.</p>
            </div>
            <span className="flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-[11px] text-body">
              <Info size={13} className="text-primary-600" /> Mức ưu đãi tính trên giá bán chưa VAT và phí bảo trì
            </span>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map(({ icon: Icon, tag, title, sub, subTone, iconBg, desc }) => (
              <div key={title} className="rounded-2xl border border-line bg-white p-5 shadow-sm" style={{ minHeight: 215 }}>
                <div className="flex items-center justify-between">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}><Icon size={17} /></span>
                  <span className="text-[10px] font-semibold uppercase text-body">{tag}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-heading">{title}</h3>
                <p className={`mt-1 text-xs font-semibold ${subTone}`}>{sub}</p>
                <p className="mt-3 text-xs leading-relaxed text-body">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tiến độ thanh toán + vay */}
        <section className="mt-14 grid items-start gap-6 lg:grid-cols-[1fr_340px]">
          <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
            <Eyebrow>Phương án chuẩn</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold text-heading">Tiến độ thanh toán</h2>
            <p className="mt-2 text-sm text-body">Lịch thanh toán cân bằng dòng tiền, bám sát tiến độ xây dựng và bàn giao dự kiến.</p>
            <div className="mt-6 overflow-x-auto rounded-xl border border-line">
              <table className="w-full min-w-[560px] text-left">
                <thead className="bg-primary-50 text-[10px] uppercase text-body">
                  <tr>
                    <th className="w-20 px-4 py-3 font-semibold">Đợt</th>
                    <th className="px-2 py-3 font-semibold">Mốc thanh toán</th>
                    <th className="px-2 py-3 font-semibold">Thời điểm</th>
                    <th className="px-4 py-3 text-right font-semibold">Giá trị</th>
                  </tr>
                </thead>
                <tbody>
                  {SCHEDULE.map((r) => (
                    <tr key={r.no} className="border-t border-line">
                      <td className="px-4 py-4">
                        <span className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold ${r.last ? "bg-primary-600 text-white" : "bg-primary-100 text-primary-700"}`}>{r.no}</span>
                      </td>
                      <td className="px-2 py-4">
                        <p className="text-sm font-semibold text-heading">{r.title}</p>
                        <p className="mt-1 max-w-[220px] text-[10px] leading-snug text-muted">{r.note}</p>
                      </td>
                      <td className="px-2 py-4 text-[11px] text-body">{r.when}</td>
                      <td className={`px-4 py-4 text-right text-sm font-bold ${r.last ? "text-primary-600" : "text-heading"}`}>{r.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-primary-700 to-footer p-6 text-white shadow-xl shadow-primary-200">
            <span className="absolute -right-12 -top-16 h-52 w-52 rounded-full bg-white/10" />
            <div className="relative">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase text-primary-200">
                <Landmark size={13} /> Giải pháp tài chính
              </p>
              <h2 className="mt-3 text-2xl font-semibold">Chính sách vay ngân hàng</h2>
              <p className="mt-3 text-xs leading-relaxed text-white/70">Phê duyệt hồ sơ nhanh, linh hoạt tài sản bảo đảm theo quy định của ngân hàng.</p>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {LOAN_STATS.map(([v, l]) => (
                  <div key={v} className="rounded-xl border border-white/15 bg-white/5 p-3">
                    <p className="text-2xl font-bold">{v}</p>
                    <p className="mt-1 text-[9px] leading-tight text-white/60">{l}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[10px] font-semibold uppercase text-white/70">Ngân hàng liên kết</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {["Vietcombank", "Techcombank", "MB Bank"].map((b) => (
                  <span key={b} className="rounded-lg bg-white px-1 py-3 text-center text-[10px] font-bold text-heading">{b}</span>
                ))}
              </div>
              <div className="mt-6 space-y-3 rounded-xl border border-white/15 bg-white/5 p-4 text-[10px]">
                <p className="flex justify-between"><span className="text-white/60">Sau thời gian hỗ trợ</span><b className="text-xs">Từ 8,2%/năm</b></p>
                <p className="flex justify-between"><span className="text-white/60">Phí trả nợ trước hạn</span><b className="text-xs">Hỗ trợ 24 tháng</b></p>
              </div>
              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-xs font-semibold text-heading">
                Kiểm tra khả năng vay <ArrowUpRight size={13} />
              </button>
            </div>
          </aside>
        </section>

        {/* Điều kiện */}
        <section className="mt-14 rounded-3xl border border-line bg-white p-6 shadow-sm">
          <Eyebrow>Thông tin cần biết</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold text-heading">Điều kiện áp dụng</h2>
          <p className="mt-2 text-sm text-body">Vui lòng đối chiếu hồ sơ và thời điểm giao dịch để xác định quyền lợi chính xác.</p>
          <ul className="mt-5 space-y-4">
            {CONDITIONS.map((c) => (
              <li key={c} className="flex items-center gap-3 text-[13px] text-body">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success"><Check size={11} strokeWidth={3} /></span>
                {c}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
