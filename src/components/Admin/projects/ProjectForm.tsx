import { useEffect, useRef, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { z } from "zod";
import SafeImage from "../../common/SafeImage";
import ZonesManager from "./ZonesManager";
import { BUILDING_TYPES } from "../../../data/mockAdminProjects";
import type { AdminProject, AdminProjectInput, AdminZone } from "../../../types/admin.types";

// Các trường của bảng Projects; Project_types và Zones quản lý riêng bên dưới
const schema = z.object({
  name: z.string().trim().min(1, "Nhập tên dự án"),
  investor: z.string().trim().min(1, "Nhập chủ đầu tư"),
  location: z.string().trim().min(1, "Nhập địa điểm"),
  buildingType: z.string(),
  consultancy: z.string().trim(),
  developmentModel: z.string().trim(),
  size: z.string().trim(),
  totalInvestment: z.string().trim(),
  ownershipType: z.string().trim(),
});
type Values = z.infer<typeof schema>;

const EMPTY: Values = { name: "", investor: "", location: "", buildingType: "", consultancy: "", developmentModel: "", size: "", totalInvestment: "", ownershipType: "" };

type Props = {
  initial?: AdminProject;
  submitting: boolean;
  onSubmit: (input: AdminProjectInput) => void;
  onCancel: () => void;
  onDirtyChange?: (dirty: boolean) => void;
};

const input = "h-11 w-full rounded-xl border border-line bg-white px-4 text-sm text-heading outline-none transition focus:border-primary-300 focus:ring-4 focus:ring-primary-100 aria-[invalid=true]:border-danger";

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-footer">
        {label} {required ? <span className="text-danger">*</span> : <span className="text-xs font-normal text-muted">(Không bắt buộc)</span>}
      </span>
      <span className="mt-1.5 block">{children}</span>
      {error && <span role="alert" className="mt-1 block text-xs text-danger">{error}</span>}
    </label>
  );
}

// Form dùng chung cho Tạo và Sửa dự án
export default function ProjectForm({ initial, submitting, onSubmit, onCancel, onDirtyChange }: Props) {
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: initial ? { ...EMPTY, ...initial } : EMPTY,
  });
  const [zones, setZones] = useState<AdminZone[]>(initial?.zones ?? []);
  const [types, setTypes] = useState<string[]>(initial?.types ?? []);
  const [typeDraft, setTypeDraft] = useState("");
  const [image, setImage] = useState<string | null>(initial?.overviewImage ?? null);
  const [touched, setTouched] = useState(false); // đã đổi ảnh, loại hình hoặc phân khu
  const file = useRef<HTMLInputElement>(null);

  const dirty = isDirty || touched;
  // Báo cho trang cha để hiện banner "Có thay đổi chưa lưu"
  useEffect(() => onDirtyChange?.(dirty), [dirty, onDirtyChange]);

  const err = (k: keyof Values) => errors[k]?.message;
  const invalid = (k: keyof Values) => (errors[k] ? true : undefined);

  const pickImage = (f?: File) => {
    if (!f) return;
    // TODO: tải ảnh lên server; hiện dùng đường dẫn tạm của trình duyệt để xem trước
    setImage(URL.createObjectURL(f));
    setTouched(true);
  };

  const addType = () => {
    const t = typeDraft.trim();
    if (t && !types.some((x) => x.toLowerCase() === t.toLowerCase())) {
      setTypes([...types, t]);
      setTouched(true);
    }
    setTypeDraft("");
  };

  return (
    <form noValidate onSubmit={handleSubmit((v) => onSubmit({ ...v, overviewImage: image, types, zones }))}>
      <section className="rounded-2xl border border-line bg-white shadow-sm">
        <div className="border-b border-line p-6">
          <h2 className="text-xl font-bold text-footer">Thông tin dự án</h2>
          <p className="mt-1 text-sm text-body">Các trường có dấu * là thông tin bắt buộc.</p>
        </div>

        <div className="grid gap-x-8 gap-y-5 p-6 md:grid-cols-2">
          <Field label="Tên dự án" required error={err("name")}>
            <input {...register("name")} aria-invalid={invalid("name")} className={input} />
          </Field>
          <Field label="Chủ đầu tư" required error={err("investor")}>
            <input {...register("investor")} aria-invalid={invalid("investor")} className={input} />
          </Field>
          <Field label="Địa điểm" required error={err("location")}>
            <input {...register("location")} aria-invalid={invalid("location")} placeholder="Ví dụ: Thủ Thiêm, TP.HCM" className={input} />
          </Field>
          <Field label="Loại công trình">
            <select {...register("buildingType")} className={input}>
              <option value="">Chọn loại công trình</option>
              {BUILDING_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Đơn vị tư vấn">
            <input {...register("consultancy")} className={input} />
          </Field>
          <Field label="Mô hình phát triển">
            <input {...register("developmentModel")} className={input} />
          </Field>
          <Field label="Quy mô">
            <input {...register("size")} placeholder="Ví dụ: 18,6 ha" className={input} />
          </Field>
          <Field label="Tổng vốn đầu tư">
            <input {...register("totalInvestment")} placeholder="Ví dụ: 25.000 tỷ VNĐ" className={input} />
          </Field>
          <Field label="Hình thức sở hữu">
            <input {...register("ownershipType")} placeholder="Ví dụ: Sở hữu lâu dài" className={input} />
          </Field>
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-primary-600">Loại hình sản phẩm</span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {types.map((t) => (
              <span key={t} className="flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 text-sm font-medium text-primary-700">
                {t}
                <button type="button" onClick={() => { setTypes(types.filter((x) => x !== t)); setTouched(true); }} aria-label={`Bỏ ${t}`} className="text-primary-400 hover:text-danger"><X size={13} /></button>
              </span>
            ))}
            <input
              value={typeDraft}
              onChange={(e) => setTypeDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // không submit form khi nhấn Enter trong ô này
                  addType();
                }
              }}
              onBlur={addType}
              placeholder="Nhập loại hình rồi nhấn Enter (ví dụ: Duplex)"
              aria-label="Thêm loại hình sản phẩm"
              className="h-9 min-w-64 flex-1 rounded-full border border-line px-4 text-sm outline-none focus:border-primary-300"
            />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-xs font-semibold text-primary-600">Hình ảnh dự án</span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <p className="mt-3 text-sm font-semibold text-footer">Ảnh tổng quan <span className="text-xs font-normal text-muted">(Không bắt buộc)</span></p>
          {image ? (
            <SafeImage src={image} alt="Ảnh tổng quan dự án" className="mt-2 h-16 w-full rounded-lg border border-dashed border-primary-300 object-cover md:h-40" />
          ) : (
            <div className="mt-2 flex h-16 items-center justify-center rounded-lg border border-dashed border-primary-200 bg-primary-50/40 text-xs text-muted">Chưa có ảnh</div>
          )}
          <input ref={file} type="file" accept="image/*" hidden onChange={(e) => pickImage(e.target.files?.[0])} />
          <button type="button" onClick={() => file.current?.click()} className="mt-3 rounded-lg border border-line px-5 py-2.5 text-sm font-semibold text-footer transition hover:bg-primary-50">
            {image ? "Thay ảnh" : "Chọn ảnh"}
          </button>
        </div>

        <div className="flex justify-end gap-3 border-t border-line px-6 py-4">
          <button type="button" onClick={onCancel} className="rounded-lg border border-line px-5 py-2.5 text-sm font-semibold text-footer transition hover:bg-primary-50">Hủy</button>
          <button type="submit" disabled={submitting} className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 active:scale-95 disabled:opacity-60">
            {submitting ? "Đang lưu..." : initial ? "Lưu thay đổi" : "Tạo dự án"}
          </button>
        </div>
      </section>

      <ZonesManager
        zones={zones}
        onChange={(z) => {
          setZones(z);
          setTouched(true);
        }}
      />
    </form>
  );
}
