import { useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useFocusTrap from "../../common/useFocusTrap";
import { DIRECTIONS, PROPERTY_STATUS } from "../../../data/mockProperties";
import { formatPrice } from "./propertyFormat";
import type { Property, PropertyCatalog, PropertyInput } from "../../../types/property.types";

const schema = z.object({
  projectId: z.number({ error: "Chọn dự án" }).int().positive("Chọn dự án"),
  zoneId: z.number({ error: "Chọn phân khu" }).int().positive("Chọn phân khu"),
  propertyCode: z.string().trim().min(1, "Nhập mã căn"),
  area: z.number({ error: "Diện tích phải là số" }).positive("Diện tích phải lớn hơn 0"),
  price: z.number({ error: "Giá bán phải là số" }).positive("Giá bán phải lớn hơn 0"),
  direction: z.string().min(1, "Chọn hướng"),
  floor: z.number({ error: "Tầng phải là số" }).int("Tầng phải là số nguyên").min(1, "Tầng tối thiểu là 1"),
  bedrooms: z.number({ error: "Số phòng ngủ phải là số" }).int("Phải là số nguyên").min(0, "Không âm"),
  status: z.enum(["available", "holding", "sold", "closed"]),
});
type Values = z.infer<typeof schema>;

type Props = {
  property: Property | null; // null = thêm mới
  catalog: PropertyCatalog;
  defaultProjectId: number | null;
  defaultZoneId: number | null;
  lockProject?: boolean; // dự án cố định (đang xem quỹ căn của dự án)
  submitting: boolean;
  onSubmit: (input: PropertyInput) => void;
  onClose: () => void;
};

const input = "h-11 w-full rounded-xl border border-line bg-white px-4 text-sm text-heading outline-none transition focus:border-primary-300 focus:ring-4 focus:ring-primary-100 aria-[invalid=true]:border-danger";

function Field({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-footer">{label} <span className="text-danger">*</span></span>
      <span className="mt-1.5 block">{children}</span>
      {hint && !error && <span className="mt-1 block text-xs text-body">{hint}</span>}
      {error && <span role="alert" className="mt-1 block text-xs text-danger">{error}</span>}
    </label>
  );
}

export default function PropertyFormModal({ property, catalog, defaultProjectId, defaultZoneId, lockProject = false, submitting, onSubmit, onClose }: Props) {
  const root = useRef<HTMLFormElement>(null);
  useFocusTrap(root, true, onClose);

  const zoneOf = (id: number | null) => catalog.zones.find((z) => z.id === id);
  const initialZone = zoneOf(property?.zoneId ?? defaultZoneId);

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: property
      ? { projectId: initialZone?.projectId ?? 0, zoneId: property.zoneId, propertyCode: property.propertyCode, area: property.area, price: property.price, direction: property.direction, floor: property.floor, bedrooms: property.bedrooms, status: property.status }
      : { projectId: initialZone?.projectId ?? defaultProjectId ?? 0, zoneId: initialZone?.id ?? 0, propertyCode: "", area: undefined, price: undefined, direction: "", floor: undefined, bedrooms: undefined, status: "available" },
  });

  const projectId = useWatch({ control, name: "projectId" });
  const price = useWatch({ control, name: "price" });
  // Phân khu phải thuộc dự án đang chọn
  const zones = catalog.zones.filter((z) => z.projectId === projectId);
  const e = (k: keyof Values) => errors[k]?.message;
  const bad = (k: keyof Values) => (errors[k] ? true : undefined);
  const num = { valueAsNumber: true } as const;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-footer/40 px-4 backdrop-blur-sm" onClick={onClose}>
      <form
        ref={root}
        noValidate
        role="dialog"
        aria-modal="true"
        aria-labelledby="property-form-title"
        tabIndex={-1}
        onClick={(ev) => ev.stopPropagation()}
        onSubmit={handleSubmit(({ projectId: _p, ...rest }) => onSubmit(rest))}
        className="animate-page-in flex max-h-[92vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl"
      >
        <div className="border-b border-line p-6">
          <h2 id="property-form-title" className="text-xl font-bold text-footer">{property ? `Chỉnh sửa căn ${property.propertyCode}` : "Thêm quỹ căn"}</h2>
          <p className="mt-1 text-sm text-body">Các trường có dấu * là thông tin bắt buộc.</p>
        </div>

        <div className="grid gap-x-6 gap-y-4 overflow-y-auto p-6 sm:grid-cols-2">
          {lockProject ? (
            <div>
              <span className="text-sm font-semibold text-footer">Dự án</span>
              <p className="mt-1.5 flex h-11 items-center rounded-xl bg-primary-50/60 px-4 text-sm font-semibold text-footer">{catalog.projects.find((p) => p.id === projectId)?.name}</p>
              <input type="hidden" {...register("projectId", num)} />
            </div>
          ) : (
          <Field label="Dự án" error={e("projectId")}>
            <select
              {...register("projectId", { ...num, onChange: () => setValue("zoneId", 0) })}
              aria-invalid={bad("projectId")}
              className={input}
            >
              <option value={0}>Chọn dự án</option>
              {catalog.projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </Field>
          )}
          <Field label="Phân khu" error={e("zoneId")} hint={zones.length === 0 && projectId ? "Dự án này chưa có phân khu" : undefined}>
            <select {...register("zoneId", num)} aria-invalid={bad("zoneId")} disabled={!projectId} className={input}>
              <option value={0}>Chọn phân khu</option>
              {zones.map((z) => <option key={z.id} value={z.id}>{z.name}</option>)}
            </select>
          </Field>
          <Field label="Mã căn" error={e("propertyCode")}>
            <input {...register("propertyCode")} aria-invalid={bad("propertyCode")} placeholder="Ví dụ: A1-1208" className={input} />
          </Field>
          <Field label="Trạng thái" error={e("status")}>
            <select {...register("status")} className={input}>
              {Object.entries(PROPERTY_STATUS).map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}
            </select>
          </Field>
          <Field label="Diện tích (m²)" error={e("area")}>
            <input type="number" step="any" {...register("area", num)} aria-invalid={bad("area")} className={input} />
          </Field>
          <Field label="Giá bán (VNĐ)" error={e("price")} hint={price > 0 ? `≈ ${formatPrice(price)}` : undefined}>
            <input type="number" step="any" {...register("price", num)} aria-invalid={bad("price")} className={input} />
          </Field>
          <Field label="Hướng" error={e("direction")}>
            <select {...register("direction")} aria-invalid={bad("direction")} className={input}>
              <option value="">Chọn hướng</option>
              {DIRECTIONS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="Tầng" error={e("floor")}>
            <input type="number" {...register("floor", num)} aria-invalid={bad("floor")} className={input} />
          </Field>
          <Field label="Số phòng ngủ" error={e("bedrooms")} hint="Nhập 0 nếu là căn Studio">
            <input type="number" {...register("bedrooms", num)} aria-invalid={bad("bedrooms")} className={input} />
          </Field>
        </div>

        <div className="flex justify-end gap-3 border-t border-line px-6 py-4">
          <button type="button" onClick={onClose} className="rounded-lg border border-line px-5 py-2.5 text-sm font-semibold text-footer transition hover:bg-primary-50">Hủy</button>
          <button type="submit" disabled={submitting} className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 active:scale-95 disabled:opacity-60">
            {submitting ? "Đang lưu..." : property ? "Lưu thay đổi" : "Thêm căn"}
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
}
