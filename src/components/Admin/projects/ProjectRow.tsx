import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";
import SafeImage from "../../common/SafeImage";
import type { AdminProject } from "../../../types/admin.types";

type Props = {
  project: AdminProject;
  index: number;
  onDelete: (p: AdminProject) => void;
};

const btn =
  "flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-white transition hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-primary-600 active:scale-95";

export default function ProjectRow({ project: p, index, onDelete }: Props) {
  return (
    <tr className="border-t border-line transition hover:bg-primary-50">
      <td className="px-4 py-3 text-body first:pl-6">{String(index).padStart(2, "0")}</td>
      <td className="px-2 py-3">
        <SafeImage src={p.overviewImage ?? undefined} alt="" className="h-10 w-[72px] rounded-md object-cover" />
      </td>
      <td className="max-w-[220px] px-4 py-3">
        <p className="truncate font-semibold text-footer" title={p.name}>{p.name}</p>
        {p.types.length > 0 && <p className="truncate text-xs text-body">{p.types.join(" · ")}</p>}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-body">{p.investor}</td>
      <td className="max-w-[200px] truncate px-4 py-3 text-body" title={p.location}>{p.location}</td>
      <td className="whitespace-nowrap px-4 py-3 text-body">{p.buildingType || "—"}</td>
      <td className="whitespace-nowrap px-4 py-3 text-body">{new Date(p.createdAt).toLocaleDateString("vi-VN")}</td>
      <td className="px-4 py-3">
        <div className="flex gap-1.5">
          <Link to={`/admin/projects/${p.id}`} aria-label={`Xem ${p.name}`} title="Xem" className={`${btn} text-primary-600`}>
            <Eye size={15} />
          </Link>
          <Link to={`/admin/projects/${p.id}/edit`} aria-label={`Sửa ${p.name}`} title="Sửa" className={`${btn} text-accent`}>
            <Pencil size={15} />
          </Link>
          <button onClick={() => onDelete(p)} aria-label={`Xóa ${p.name}`} title="Xóa" className={`${btn} text-danger`}>
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
}
