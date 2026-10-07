import type { Job } from "../../types/job.types";
import { buildJobPath, htmlToText } from "../Recruitment/jobUtils";

const SITE = "NovaLand Hub";

const EMPLOYMENT_TYPE: Record<string, string> = {
  "Toàn thời gian": "FULL_TIME",
  "Bán thời gian": "PART_TIME",
  "Cộng tác viên": "CONTRACTOR",
};

/** JSON-LD JobPosting cho Google for Jobs */
function buildJsonLd(job: Job, url: string) {
  const hasSalary = !job.salaryNegotiable && (job.salaryMin || job.salaryMax);
  // lương lưu theo triệu đồng khi VND
  const toAmount = (v: number) => (job.currency === "VND" ? v * 1_000_000 : v);
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.publishedAt,
    validThrough: job.deadline,
    employmentType: EMPLOYMENT_TYPE[job.jobType.name] ?? "OTHER",
    directApply: true,
    url,
    hiringOrganization: { "@type": "Organization", name: SITE },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: job.location, addressCountry: "VN" },
    },
    ...(hasSalary && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: job.currency,
        value: {
          "@type": "QuantitativeValue",
          ...(job.salaryMin && { minValue: toAmount(job.salaryMin) }),
          ...(job.salaryMax && { maxValue: toAmount(job.salaryMax) }),
          unitText: "MONTH",
        },
      },
    }),
  };
}

/** title, meta description, Open Graph và JSON-LD của trang chi tiết việc làm */
export default function JobDetailSeo({ job }: { job?: Job }) {
  const title = job ? `${job.title} | Tuyển dụng ${SITE}` : `Việc làm | Tuyển dụng ${SITE}`;
  const description = job ? htmlToText(job.description) : "";
  const url = job ? window.location.origin + buildJobPath(job) : "";

  return (
    <>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {url && <meta property="og:url" content={url} />}
      {job && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(job, url)) }} />
      )}
    </>
  );
}
