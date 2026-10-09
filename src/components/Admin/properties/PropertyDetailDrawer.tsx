import { useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X, Pencil } from "lucide-react";
import useFocusTrap from "../../common/useFocusTrap";
import SafeImage from "../../common/SafeImage";
import PropertyStatusBadge from "./PropertyStatusBadge";
import { formatArea, formatBedrooms, formatPrice, pricePerM2 } from "./propertyFormat";
import type { Property, PropertyCatalog } from "../../../types/property.types";

type Props = {
  property: Property;
  catalog: PropertyCatalog;
  onEdit: (p: Property) => void;
  onClose: () => void;
};

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-600">{title}</h3>
      <dl className="mt-3 grid grid-cols-2 gap-3">{children}</dl>
    </section>
  );
}

function Item({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl bg-primary-50/50 px-4 py-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-footer">{children || "Chưa cập nhật"}</dd>
    </div>
  );
}

export default function PropertyDetailDrawer({ property: p, catalog, onEdit, onClose }: Props) {
  const root = useRef<HTMLDivElement>(null);
  useFocusTrap(root, true, onClose);

  const zone = catalog.zones.find((z) => z.id === p.zoneId);
  const project = catalog.projects.find((x) => x.id === zone?.projectId);

  return createPortal(
    <div className="fixed inset-0 z-[100] bg-footer/40 backdrop-blur-sm" onClick={onClose}>
      <aside
        ref={root}
        role="dialog"
        aria-modal="true"
        aria-labelledby="property-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="animate-drawer-in absolute inset-y-0 right-0 flex w-full max-w-xl flex-col bg-white shadow-2xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-line p-6">
          <div>
            <p className="text-xs text-body">Chi tiết quỹ căn</p>
            <h2 id="property-title" className="mt-1 text-2xl font-bold text-footer">{p.propertyCode}</h2>
            <PropertyStatusBadge status={p.status} className="mt-3" />
          </div>
          <button onClick={onClose} aria-label="Đóng" className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-heading transition hover:bg-primary-50">
            <X size={18} />
          </button>
        </header>

        <div className="flex-1 space-y-7 overflow-y-auto p-6">
          <Group title="Vị trí">
            <Item label="Dự án">{project?.name}</Item>
            <Item label="Phân khu">{zone?.name}</Item>
          </Group>

          <Group title="Thông số căn">
            <Item label="Diện tích">{formatArea(p.area)}</Item>
            <Item label="Phòng ngủ">{formatBedrooms(p.bedrooms)}</Item>
            <Item label="Hướng">{p.direction}</Item>
            <Item label="Tầng">{String(p.floor)}</Item>
          </Group>

          <Group title="Giá bán">
            <Item label="Giá bán">{formatPrice(p.price)}</Item>
            <Item label="Đơn giá trung bình">{pricePerM2(p.price, p.area)}</Item>
          </Group>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-600">Hình ảnh</h3>
            {p.images.length === 0 ? (
              <p className="mt-3 rounded-xl border border-dashed border-primary-200 bg-primary-50/40 px-4 py-6 text-center text-sm text-muted">Chưa cập nhật</p>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-3">
                {p.images.map((src) => <SafeImage key={src} src={src} alt={`Căn ${p.propertyCode}`} className="aspect-[4/3] w-full rounded-xl object-cover" />)}
              </div>
            )}
          </section>
        </div>

        <footer className="flex justify-end gap-3 border-t border-line px-6 py-4">
          <button onClick={onClose} className="rounded-lg border border-line px-5 py-2.5 text-sm font-semibold text-footer transition hover:bg-primary-50">Đóng</button>
          <button onClick={() => onEdit(p)} className="flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 active:scale-95">
            <Pencil size={15} /> Chỉnh sửa
          </button>
        </footer>
      </aside>
    </div>,
    document.body,
  );
}
