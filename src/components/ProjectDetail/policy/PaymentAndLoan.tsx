import { Landmark, ArrowUpRight } from "lucide-react";
import Eyebrow from "./Eyebrow";
import type { SCHEDULE, LOAN_STATS } from "../../../data/projectDetail/policy";

type Props = {
  schedule: typeof SCHEDULE;
  loanStats: typeof LOAN_STATS;
};

export default function PaymentAndLoan({ schedule, loanStats }: Props) {
  return (
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
              {schedule.map((r) => (
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
            {loanStats.map(([v, l]) => (
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
  );
}
