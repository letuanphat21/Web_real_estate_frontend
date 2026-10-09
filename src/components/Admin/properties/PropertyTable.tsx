import PropertyRow from "./PropertyRow";
import type { Property, PropertyCatalog, PropertyStatus } from "../../../types/property.types";

type Props = {
  properties: Property[]; // đã cắt theo trang
  startIndex: number;
  catalog: PropertyCatalog;
  onView: (p: Property) => void;
  onEdit: (p: Property) => void;
  onStatus: (p: Property, s: PropertyStatus) => void;
  onDelete: (p: Property) => void;
};

const COLUMNS = ["STT", "Mã căn", "Dự án / Phân khu", "Diện tích", "Giá bán", "Hướng", "Tầng", "Phòng ngủ", "Trạng thái", "Thao tác"];

export default function PropertyTable({ properties, startIndex, catalog, ...actions }: Props) {
  return (
    <div className="-mx-6 overflow-x-auto">
      <table className="w-full min-w-[1040px] text-left text-sm">
        <thead>
          <tr className="bg-primary-50/50 text-[11px] uppercase text-heading">
            {COLUMNS.map((c) => <th key={c} scope="col" className="px-4 py-3 font-semibold first:pl-6 last:pr-6">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {properties.map((p, i) => {
            const zone = catalog.zones.find((z) => z.id === p.zoneId);
            const project = catalog.projects.find((x) => x.id === zone?.projectId);
            return (
              <PropertyRow
                key={p.id}
                property={p}
                index={startIndex + i + 1}
                projectName={project?.name ?? "Chưa cập nhật"}
                zoneName={zone?.name ?? "Chưa cập nhật"}
                {...actions}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
