import { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Check, GripVertical } from "lucide-react";

import { sectionTitle } from "../../utils/cvHelpers";
import { useCvStore } from "../../store/cvStore";
import {
  CV_COLORS,
  CV_FONTS,
  CV_FONT_SIZES,
  CV_TEMPLATES,
  type CvSectionKey,
  type CvTemplateId,
} from "../../types/cv.types";

const selectClass =
  "h-10 w-full rounded-xl border border-line bg-white px-3 text-sm font-medium text-heading outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100";

/** Hình thu nhỏ bố cục của từng mẫu */
function Thumb({ id }: { id: CvTemplateId }) {
  const bar = "h-1 rounded bg-primary-200";
  if (id === "modern")
    return (
      <div className="flex h-full gap-1">
        <div className="w-1/3 rounded-sm bg-primary-600" />
        <div className="flex-1 space-y-1 pt-1"><div className={bar} /><div className={`${bar} w-4/5`} /><div className={bar} /><div className={`${bar} w-2/3`} /></div>
      </div>
    );
  return (
    <div className="space-y-1 pt-1">
      <div className={id === "professional" ? "h-1.5 rounded bg-primary-600" : "h-1 w-1/2 rounded bg-primary-400"} />
      <div className={bar} /><div className={`${bar} w-4/5`} /><div className={bar} /><div className={`${bar} w-2/3`} />
    </div>
  );
}

function SortableRow({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-2 rounded-lg bg-white px-2 py-2 text-sm ${isDragging ? "shadow-lg ring-1 ring-primary-200" : ""}`}
    >
      <button type="button" {...attributes} {...listeners} aria-label={`Kéo để sắp xếp: ${label}`} className="cursor-grab touch-none text-muted hover:text-primary-600">
        <GripVertical size={15} />
      </button>
      {label}
    </li>
  );
}

export default function CvStylePanel({ expandTemplates }: { expandTemplates?: boolean }) {
  const style = useCvStore((s) => s.style);
  const data = useCvStore((s) => s.data);
  const setStyle = useCvStore((s) => s.setStyle);
  const [sorting, setSorting] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const order = style.sectionOrder;
    setStyle({ sectionOrder: arrayMove(order, order.indexOf(active.id as CvSectionKey), order.indexOf(over.id as CvSectionKey)) });
  };

  const currentColor = CV_COLORS.find((c) => c.value === style.color) ?? CV_COLORS[0];

  return (
    <section
      className={`rounded-3xl border bg-white p-5 shadow-sm ${expandTemplates ? "border-primary-300 ring-2 ring-primary-100" : "border-line"}`}
      aria-labelledby="cv-style-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 id="cv-style-title" className="text-lg font-medium text-heading">Mẫu &amp; phong cách</h2>
          <p className="text-xs text-body">Tùy chỉnh để CV nổi bật trước nhà tuyển dụng</p>
        </div>
        <label className="w-40">
          <span className="mb-1 block text-[11px] uppercase text-muted">Mẫu đang dùng</span>
          <select value={style.template} onChange={(e) => setStyle({ template: e.target.value as CvTemplateId })} className={selectClass}>
            {CV_TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3" role="radiogroup" aria-label="Chọn mẫu CV">
        {CV_TEMPLATES.map((t) => {
          const active = style.template === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setStyle({ template: t.id })}
              className={`relative rounded-xl border-2 bg-white p-2 text-left transition focus-visible:outline-2 focus-visible:outline-primary-600 ${active ? "border-primary-600" : "border-line hover:border-primary-300"}`}
            >
              <div className="h-16"><Thumb id={t.id} /></div>
              <p className="mt-1 text-[11px] font-medium text-heading">{t.label}</p>
              {active && (
                <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-white">
                  <Check size={10} strokeWidth={3} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <span className="mb-1 block text-[11px] uppercase text-muted">Màu chủ đạo</span>
          <div className="flex items-center gap-2" role="radiogroup" aria-label="Màu chủ đạo">
            <span className="whitespace-nowrap rounded-full bg-primary-50 px-2.5 py-1.5 text-[11px] font-medium text-primary-700">{currentColor.label}</span>
            {CV_COLORS.map((c) => (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={style.color === c.value}
                aria-label={c.label}
                onClick={() => setStyle({ color: c.value })}
                style={{ background: c.value }}
                className={`h-5 w-5 shrink-0 rounded-full ring-offset-2 transition focus-visible:outline-2 focus-visible:outline-primary-600 ${style.color === c.value ? "ring-2 ring-primary-600" : ""}`}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <label>
          <span className="mb-1 block text-[11px] uppercase text-muted">Font</span>
          <select value={style.font} onChange={(e) => setStyle({ font: e.target.value })} className={selectClass}>
            {CV_FONTS.map((f) => (
              <option key={f.id} value={f.id}>{f.label}</option>
            ))}
          </select>
        </label>

        <label>
          <span className="mb-1 block text-[11px] uppercase text-muted">Cỡ chữ</span>
          <select value={style.fontSize} onChange={(e) => setStyle({ fontSize: Number(e.target.value) })} className={selectClass}>
            {CV_FONT_SIZES.map((s) => (
              <option key={s} value={s}>{s}px</option>
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

      {sorting && (
        <div className="mt-4 rounded-2xl bg-primary-50/60 p-3">
          <p className="mb-2 text-xs text-body">Kéo thả để đổi thứ tự hiển thị các mục trên CV.</p>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={style.sectionOrder} strategy={verticalListSortingStrategy}>
              <ul className="space-y-1.5">
                {style.sectionOrder.map((k) => (
                  <SortableRow key={k} id={k} label={sectionTitle(k, data)} />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </section>
  );
}
