import { Bookmark } from "lucide-react";

const JOBS = [
  { title: "Chuyên viên Tư vấn Cao cấp", company: "Masterise Homes", salary: "28–40 triệu", active: true },
  { title: "Trưởng nhóm Kinh doanh", company: "Dat Xanh Services", salary: "45–100 triệu" },
  { title: "Sales dự án Eaton Park", company: "Gamuda Land", salary: "35–70 triệu" },
  { title: "Công tác Kinh doanh", company: "Savills Vietnam", salary: "20–50 triệu" },
];

/** Cột trái của mockup: danh sách "Việc làm phù hợp" */
export default function CareerJobsPanel() {
  return (
    <div className="border-b border-white/10 bg-white/[0.03] p-4 sm:border-b-0 sm:border-r">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold text-white">Việc làm phù hợp</p>
        <span className="rounded-full bg-gold-300/15 px-2 py-0.5 text-[10px] font-semibold text-gold-200">24</span>
      </div>
      <ul className="space-y-2">
        {JOBS.map((j) => (
          <li
            key={j.title}
            className={`flex items-start justify-between gap-2 rounded-xl bg-white/[0.04] p-3 ring-1 ${
              j.active ? "ring-gold-300/50" : "ring-white/10"
            }`}
          >
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-white">{j.title}</p>
              <p className="truncate text-[10px] text-white/45">{j.company}</p>
              <p className="mt-1 text-[10px] font-semibold text-gold-200">{j.salary}</p>
            </div>
            <Bookmark size={12} className="mt-0.5 shrink-0 text-white/40" aria-hidden />
          </li>
        ))}
      </ul>
    </div>
  );
}
