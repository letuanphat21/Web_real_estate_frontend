import { useCallback, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import CvStylePanel from "./CvStylePanel";
import CvPreview, { A4_HEIGHT_PX, A4_WIDTH_PX } from "./CvPreview";
import CvPreviewToolbar from "./CvPreviewToolbar";
import CvTipsCard from "./CvTipsCard";
import CvPreExportChecklist from "./CvPreExportChecklist";
import { useToast } from "../common/toastContext";
import { useCvBuilder } from "./cvBuilderContext";
import { toFileName } from "./cvHelpers";

/** Cột phải: phong cách + xem trước A4 + điều khiển + mẹo + checklist */
export default function CvPreviewPanel({ expandTemplates }: { expandTemplates?: boolean }) {
  const data = useCvBuilder((s) => s.data);
  const style = useCvBuilder((s) => s.style);
  const toast = useToast();

  const pageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.85);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);

  // Lần đầu: thu nhỏ vừa khung nếu khung hẹp hơn khổ A4 ở 85%
  useEffect(() => {
    const w = scrollRef.current?.clientWidth;
    if (w) setZoom((z) => Math.min(z, Math.max(0.4, +((w - 24) / A4_WIDTH_PX).toFixed(2))));
  }, []);

  const onPageCount = useCallback((n: number) => {
    setPages(n);
    setPage((p) => Math.min(p, n));
  }, []);

  const goToPage = (n: number) => {
    setPage(n);
    scrollRef.current?.scrollTo({ top: (n - 1) * A4_HEIGHT_PX * zoom, behavior: "smooth" });
  };

  const print = useReactToPrint({
    contentRef: pageRef,
    documentTitle: toFileName(data.personal.fullName),
    pageStyle: "@page { size: A4; margin: 0; } body { margin: 0; }",
  });

  return (
    <div className="space-y-5">
      <CvStylePanel expandTemplates={expandTemplates} />

      <section className="rounded-3xl border border-line bg-white p-4 shadow-sm md:p-5" aria-label="Xem trước CV">
        <div
          ref={scrollRef}
          tabIndex={0}
          aria-label="Bản xem trước CV khổ A4"
          className="max-h-[70vh] overflow-auto rounded-2xl bg-primary-50/60 p-3"
          onScroll={(e) => {
            const n = Math.min(pages, Math.floor((e.currentTarget.scrollTop + 120) / (A4_HEIGHT_PX * zoom)) + 1);
            if (n !== page) setPage(n);
          }}
        >
          <CvPreview data={data} style={style} zoom={zoom} onPageCount={onPageCount} pageRef={pageRef} />
        </div>
        <div className="mt-4">
          <CvPreviewToolbar
            page={page}
            pages={pages}
            zoom={zoom}
            onPageChange={goToPage}
            onZoomChange={setZoom}
            onExport={() => {
              toast.show("Chọn “Lưu dưới dạng PDF” trong hộp thoại in");
              print();
            }}
          />
        </div>
      </section>

      <CvTipsCard />
      <CvPreExportChecklist pageCount={pages} />
    </div>
  );
}
