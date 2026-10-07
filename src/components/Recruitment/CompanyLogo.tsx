import type { Company } from "../../types/job.types";

export default function CompanyLogo({
  company,
  size = "h-12 w-12",
}: {
  company: Company;
  size?: string;
}) {
  return company.logoUrl ? (
    <img
      src={company.logoUrl}
      alt={`Logo ${company.name}`}
      className={`${size} shrink-0 rounded-xl object-cover`}
    />
  ) : (
    <span
      aria-hidden
      className={`${size} ${company.colorClass} flex shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white`}
    >
      {company.initials}
    </span>
  );
}
