import { Sparkles } from "lucide-react";

const STATS = [
  { value: "4 năm", label: "Kinh nghiệm" },
  { value: "128", label: "Lượt xem" },
  { value: "4,9/5", label: "Đánh giá" },
];

const SKILLS = ["Tư vấn đầu tư", "Đàm phán", "CRM", "Tiếng Anh"];

/** Cột phải của mockup: hồ sơ CV với thanh hoàn thiện, chỉ số, gợi ý AI và kỹ năng */
export default function CareerProfilePanel() {
  return (
    <div className="p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gold-300">CV Builder</p>
          <p className="truncate text-xs font-semibold text-white">Hồ sơ của Nguyễn Quang Minh</p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <div className="h-1.5 w-14 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[82%] rounded-full bg-success" />
          </div>
          <span className="text-[10px] font-semibold text-success">82%</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/120?img=15"
          alt="Ảnh đại diện Nguyễn Quang Minh"
          className="h-12 w-12 rounded-full object-cover ring-2 ring-gold-300/50"
        />
        <div>
          <p className="text-sm font-semibold text-white">Nguyễn Quang Minh</p>
          <p className="text-[11px] text-white/60">Chuyên viên tư vấn Cao cấp</p>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-2">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-xl bg-white/[0.05] px-2 py-2 text-center">
            <dd className="text-sm font-bold text-white">{s.value}</dd>
            <dt className="text-[10px] text-white/45">{s.label}</dt>
          </div>
        ))}
      </dl>

      <div className="mt-3 rounded-xl bg-gold-300/10 p-3 ring-1 ring-gold-300/20">
        <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-gold-200">
          <Sparkles size={11} aria-hidden /> Gợi ý từ Nova AI
        </p>
        <p className="mt-1 text-[11px] leading-snug text-white/65">
          Thêm số liệu doanh số vào mục kinh nghiệm để tăng độ tin cậy với nhà tuyển dụng.
        </p>
      </div>

      <p className="mt-3 text-[11px] font-semibold text-white">Kỹ năng nổi bật</p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {SKILLS.map((s) => (
          <span key={s} className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/80 ring-1 ring-white/10">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
