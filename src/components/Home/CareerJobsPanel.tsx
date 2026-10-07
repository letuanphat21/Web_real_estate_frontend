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
    <div className="border-b border-line bg-primary-50/50 p-4 sm:border-b-0 sm:border-r">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold text-heading">Việc làm phù hợp</p>
        <span className="rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-semibold text-primary-700">24</span>
      </div>
      <ul className="space-y-2">
        {JOBS.map((j) => (
          <li
            key={j.title}
            className={`flex items-start justify-between gap-2 rounded-xl bg-white p-3 ring-1 ${
              j.active ? "ring-primary-300" : "ring-line"
            }`}
          >
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-heading">{j.title}</p>
              <p className="truncate text-[10px] text-muted">{j.company}</p>
              <p className="mt-1 text-[10px] font-semibold text-primary-600">{j.salary}</p>
            </div>
            <Bookmark size={12} className="mt-0.5 shrink-0 text-muted" aria-hidden />
          </li>
        ))}
      </ul>
    </div>
  );
}
