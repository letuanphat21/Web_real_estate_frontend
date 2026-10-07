import { useCallback, useEffect, useLayoutEffect, useState, type CSSProperties, type RefObject } from "react";
import CvTemplateModern from "./templates/CvTemplateModern";
import CvTemplateProfessional from "./templates/CvTemplateProfessional";
import CvTemplateMinimal from "./templates/CvTemplateMinimal";
import type { CvData, CvStyle } from "../../types/cv.types";

/** Khổ A4 ở 96dpi */
export const A4_WIDTH_PX = 793.7;
export const A4_HEIGHT_PX = 1122.5;

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Merriweather:wght@300;400;700&family=Roboto:wght@300;400;500;700&display=swap&subset=vietnamese";

interface CvPreviewProps {
  data: CvData;
  style: CvStyle;
  zoom: number;
  onPageCount: (pages: number) => void;
  /** Trỏ tới phần tử A4 gốc (không bị scale) để in PDF */
  pageRef: RefObject<HTMLDivElement | null>;
}

/** Xem trước CV khổ A4, cập nhật realtime. CSS variables áp màu/font/cỡ chữ cho template. */
export default function CvPreview({ data, style, zoom, onPageCount, pageRef }: CvPreviewProps) {
  const [height, setHeight] = useState(A4_HEIGHT_PX);

  /** Chiều cao tự nhiên của nội dung (không tính phần đệm cho tròn trang) */
  const measure = useCallback(() => {
    const el = pageRef.current;
    const root = el?.firstElementChild as HTMLElement | null;
    if (!el || !root) return;
    const natural =
      root.dataset.cvLayout === "columns"
        ? Math.max(...Array.from(root.children, (c) => (c as HTMLElement).offsetHeight))
        : el.scrollHeight;
    setHeight((prev) => (Math.abs(prev - natural) < 0.5 ? prev : natural));
  }, [pageRef]);

  // Đo lại sau mỗi lần dữ liệu/kiểu đổi, khi kích thước đổi và khi font tải xong
  useLayoutEffect(measure);
  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [pageRef, measure]);

  const pages = Math.max(1, Math.ceil((height - 2) / A4_HEIGHT_PX));
  useEffect(() => onPageCount(pages), [pages, onPageCount]);

  const cssVars = {
    "--cv-color": style.color,
    "--cv-font": `"${style.font}"`,
    "--cv-size": `${style.fontSize}px`,
    fontFamily: `"${style.font}", system-ui, sans-serif`,
    fontSize: `${style.fontSize}px`,
    "--cv-pages": pages,
  } as CSSProperties;

  const Template =
    style.template === "professional" ? CvTemplateProfessional : style.template === "minimal" ? CvTemplateMinimal : CvTemplateModern;

  return (
    <>
      {/* React 19 tự đưa <link> lên <head>: font của CV, cũng được copy vào bản in */}
      <link rel="stylesheet" href={FONTS_URL} precedence="default" />
    <div style={{ width: A4_WIDTH_PX * zoom, height: pages * A4_HEIGHT_PX * zoom }} className="mx-auto overflow-hidden bg-white shadow-lg ring-1 ring-line">
      <div style={{ transform: `scale(${zoom})`, transformOrigin: "top left", width: A4_WIDTH_PX }} className="relative">
        <div ref={pageRef} className="w-[210mm] bg-white leading-[1.45] [-webkit-print-color-adjust:exact] [print-color-adjust:exact]" style={cssVars}>
          <Template data={data} style={style} />
        </div>
        {/* Đường phân trang A4 (chỉ hiển thị khi xem, không in) */}
        {Array.from({ length: pages - 1 }, (_, i) => (
          <div
            key={i}
            aria-hidden
            className="pointer-events-none absolute inset-x-0 border-t border-dashed border-primary-300 print:hidden"
            style={{ top: A4_HEIGHT_PX * (i + 1) }}
          />
        ))}
      </div>
    </div>
    </>
  );
}
