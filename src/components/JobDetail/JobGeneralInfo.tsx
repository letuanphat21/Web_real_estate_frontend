import { Briefcase, Building2, CalendarDays, CheckCircle2, MapPin, Users, type LucideIcon } from "lucide-react";
import type { Job } from "../../types/job.types";
import { formatDate } from "../../utils/formatDate";

export default function JobGeneralInfo({ job }: { job: Job }) {
  const rows: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: Briefcase, label: "Hình thức", value: job.jobType.name },
    { icon: Building2, label: "Phòng ban", value: job.department },
    { icon: CheckCircle2, label: "Kinh nghiệm", value: job.experience },
    { icon: Users, label: "Số lượng tuyển", value: `${job.quantity} người` },
    { icon: MapPin, label: "Địa điểm", value: job.location },
    { icon: CalendarDays, label: "Hạn nộp", value: formatDate(job.deadline) },
  ];

  return (
    <section className="rounded-3xl border border-line bg-white p-6 shadow-sm md:p-8" aria-labelledby="job-general-title">
      <h2 id="job-general-title" className="text-xl font-medium text-heading">
        Thông tin chung
      </h2>
      <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-3">
            <Icon size={16} className="mt-1 shrink-0 text-muted" aria-hidden />
            <div>
              <dt className="text-xs text-muted">{label}</dt>
              <dd className="text-sm font-semibold text-heading">{value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
