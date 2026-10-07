import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowUpDown } from "lucide-react";
import { STATUS, fmt, dash } from "./inventoryStatus";
import type { ROWS } from "../../../data/projectDetail/inventory";

type Row = (typeof ROWS)[number];

type Props = {
  rows: Row[];
  page: number;
  perPage: number;
  base: string;
};

export default function InventoryTable({ rows, page, perPage, base }: Props) {
  return (
    <div className="mt-5 overflow-x-auto rounded-2xl border border-line bg-white shadow-sm">
      <table className="w-full min-w-[1000px] text-left text-sm">
        <thead className="bg-primary-50 text-xs text-heading">
          <tr>
            {[["Mã căn"], ["Giá niêm yết", 1], ["Giá TTS"], ["Đơn giá", 1], ["Loại hình"], ["Hướng"], ["DT Đất"], ["DT Xây dựng", 1], ["Phân khu"], ["Tình trạng"]].map(([h, s]) => (
              <th key={h} className="px-5 py-4 font-semibold">
                <span className="inline-flex items-center gap-1.5">{h} {s && <ArrowUpDown size={11} className="text-muted" />}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice((page - 1) * perPage, page * perPage).map((r, i) => {
            const st = STATUS[r.status];
            return (
              <tr key={r.code} className={`border-t border-line text-heading ${i === 0 ? "bg-primary-50/70 shadow-[inset_3px_0_0_var(--color-primary-600)]" : "hover:bg-primary-50/40"}`}>
                <td className="px-5 py-5">
                  <Link to={`${base}/mat-bang`} className="inline-flex items-center gap-1.5 font-semibold text-primary-600">
                    {r.code} <ArrowUpRight size={12} />
                  </Link>
                </td>
                <td className="px-5 py-5 font-medium">{r.list ? fmt(r.list) : dash}</td>
                <td className="px-5 py-5 font-medium">{r.tts ? fmt(r.tts) : dash}</td>
                <td className="px-5 py-5">{r.unit ? `${r.unit} tr/m²` : dash}</td>
                <td className="px-5 py-5">{r.type}</td>
                <td className="px-5 py-5 text-body">{r.dir}</td>
                <td className="px-5 py-5">{dash}</td>
                <td className="px-5 py-5">{r.area} m²</td>
                <td className="px-5 py-5">{r.zone}</td>
                <td className="px-5 py-5">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${st.badge}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} /> {st.label}
                  </span>
                </td>
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr><td colSpan={10} className="px-5 py-10 text-center text-body">Không có căn nào phù hợp với bộ lọc.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
