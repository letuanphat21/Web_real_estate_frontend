import { useMemo } from "react";
import { sanitizeHtml } from "../../utils/sanitizeHtml";

/** "Chi tiết công việc": description là HTML từ backend nên luôn sanitize trước khi render */
export default function JobDescription({ html }: { html: string }) {
  const safe = useMemo(() => sanitizeHtml(html), [html]);

  return (
    <section className="rounded-3xl border border-line bg-white p-6 shadow-sm md:p-8" aria-labelledby="job-detail-title">
      <h2 id="job-detail-title" className="text-xl font-medium text-heading">
        Chi tiết công việc
      </h2>
      {/* eslint-disable-next-line react/no-danger */}
      <div className="job-prose mt-5" dangerouslySetInnerHTML={{ __html: safe }} />
    </section>
  );
}
