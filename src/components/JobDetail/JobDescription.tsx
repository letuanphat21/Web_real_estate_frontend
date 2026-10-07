import { useMemo } from "react";
import { sanitizeHtml } from "./sanitizeHtml";

/** "Chi tiết công việc": description là HTML từ backend nên luôn sanitize trước khi render */
export default function JobDescription({ html }: { html: string }) {
  const safe = useMemo(() => sanitizeHtml(html), [html]);

  return (
    <section className="rounded-3xl border border-line bg-white p-6 shadow-sm md:p-8" aria-labelledby="job-detail-title">
      <h2 id="job-detail-title" className="text-xl font-medium text-heading">
        Chi tiết công việc
      </h2>
      {/* eslint-disable-next-line react/no-danger */}
      <div className="mt-5 text-sm leading-relaxed text-body [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-heading [&_h3:first-child]:mt-0 [&_ul]:grid [&_ul]:list-disc [&_ul]:gap-2 [&_ul]:pl-5 [&_ol]:grid [&_ol]:list-decimal [&_ol]:gap-2 [&_ol]:pl-5 [&_li::marker]:text-primary-600 [&_a]:text-primary-600 [&_a]:underline" dangerouslySetInnerHTML={{ __html: safe }} />
    </section>
  );
}
