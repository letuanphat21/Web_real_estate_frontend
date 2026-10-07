import { useState } from "react";
import TemplatePicker from "./TemplatePicker";
import ColorPicker from "./ColorPicker";
import SectionOrderList from "./SectionOrderList";
import { useCvBuilder } from "./cvBuilderContext";
import { CV_FONTS, CV_FONT_SIZES, CV_TEMPLATES, type CvTemplateId } from "../../types/cv.types";

const selectClass =
  "h-10 w-full rounded-xl border border-line bg-white px-3 text-sm font-medium text-heading outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100";

/** Khối "Mẫu & phong cách": chọn mẫu, màu, font, cỡ chữ và thứ tự section */
export default function CvStylePanel({ expandTemplates }: { expandTemplates?: boolean }) {
  const style = useCvBuilder((s) => s.style);
  const setStyle = useCvBuilder((s) => s.setStyle);
  const [sorting, setSorting] = useState(false);

  return (
    <section
      className={`rounded-3xl border bg-white p-5 shadow-sm ${
        expandTemplates ? "border-primary-300 ring-2 ring-primary-100" : "border-line"
      }`}
      aria-labelledby="cv-style-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 id="cv-style-title" className="text-lg font-medium text-heading">
            Mẫu &amp; phong cách
          </h2>
          <p className="text-xs text-body">Tùy chỉnh để CV nổi bật trước nhà tuyển dụng</p>
        </div>
        <label className="w-40">
          <span className="mb-1 block text-[11px] uppercase text-muted">Mẫu đang dùng</span>
          <select
            value={style.template}
            onChange={(e) => setStyle({ template: e.target.value as CvTemplateId })}
            className={selectClass}
          >
            {CV_TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <TemplatePicker value={style.template} onChange={(template) => setStyle({ template })} />

      <div className="mt-5 space-y-4">
        <ColorPicker value={style.color} onChange={(color) => setStyle({ color })} />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <label>
            <span className="mb-1 block text-[11px] uppercase text-muted">Font</span>
            <select value={style.font} onChange={(e) => setStyle({ font: e.target.value })} className={selectClass}>
              {CV_FONTS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-1 block text-[11px] uppercase text-muted">Cỡ chữ</span>
            <select
              value={style.fontSize}
              onChange={(e) => setStyle({ fontSize: Number(e.target.value) })}
              className={selectClass}
            >
              {CV_FONT_SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}px
                </option>
              ))}
            </select>
          </label>

          <div>
            <span className="mb-1 block text-[11px] uppercase text-muted">Sắp xếp section</span>
            <button
              type="button"
              onClick={() => setSorting((v) => !v)}
              aria-expanded={sorting}
              className={`${selectClass} text-left`}
            >
              Tùy chỉnh
            </button>
          </div>
        </div>
      </div>

      {sorting && <SectionOrderList />}
    </section>
  );
}
