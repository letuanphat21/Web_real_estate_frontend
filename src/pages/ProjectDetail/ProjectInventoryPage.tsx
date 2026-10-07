import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Filter,
  X,
  ArrowUpRight,
  ArrowUpDown,
  CalendarClock,
} from "lucide-react";
import ProjectTabs from "../../components/ProjectDetail/ProjectTabs";
import { PROJECT, ROWS, STATS } from "../../data/projectDetail/inventory";

const STATUS: Record<string, { label: string; badge: string; dot: string }> = {
  available: { label: "Còn trống", badge: "bg-success/10 text-success", dot: "bg-success" },
  holding: { label: "Đang giữ chỗ", badge: "bg-warning/10 text-warning", dot: "bg-warning" },
  sold: { label: "Đã bán", badge: "bg-danger/10 text-danger", dot: "bg-danger" },
  closed: { label: "Chưa mở bán", badge: "bg-line text-body", dot: "bg-muted" },
};

const fmt = (n: number | null) => (n == null ? "—" : `${n.toFixed(2).replace(".", ",")} tỷ`);
const dash = "—";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-heading">{label}</span>
      {children}
    </label>
  );
}

const selectCls = "h-11 w-full appearance-none rounded-xl border border-line bg-primary-50/60 px-4 pr-10 text-sm text-body outline-none focus:border-primary-300";

type SelectProps = { value: string; onChange: (v: string) => void; options: string[][] };

function Select({ value, onChange, options }: SelectProps) {
  return (
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)} className={selectCls}>
        {options.map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-body" />
    </div>
  );
}

export default function ProjectInventoryPage() {
  const { id } = useParams();
  const base = `/du-an/${id}`;
  const p = PROJECT;

  const [draft, setDraft] = useState({ q: "", price: "", type: "", dir: "", zone: "The Cove", status: "available" });
  const [applied, setApplied] = useState(draft);
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const rows = useMemo(() => {
    let r = ROWS.filter(
      (x) =>
        (!applied.q || x.code.toLowerCase().includes(applied.q.toLowerCase())) &&
        (!applied.zone || x.zone === applied.zone) &&
        (!applied.status || x.status === applied.status) &&
        (!applied.dir || x.dir === applied.dir)
    );
    if (sort === "price-asc") r = [...r].sort((a, b) => (a.list ?? 1e9) - (b.list ?? 1e9));
    if (sort === "price-desc") r = [...r].sort((a, b) => (b.list ?? -1) - (a.list ?? -1));
    return r;
  }, [applied, sort]);

  const chips = [
    applied.zone && ["zone", `Phân khu: ${applied.zone}`],
    applied.status && ["status", `Tình trạng: ${STATUS[applied.status].label}`],
  ].filter(Boolean);

  const apply = () => {
    setApplied(draft);
    setPage(1);
  };
  const clear = () => {
    const empty = { q: "", price: "", type: "", dir: "", zone: "", status: "" };
    setDraft(empty);
    setApplied(empty);
  };
  const removeChip = (k: string) => {
    const next = { ...applied, [k]: "" };
    setApplied(next);
    setDraft(next);
  };

  return (
    <div className="bg-white">
      <ProjectTabs />

      {/* Hero tối */}
      <section className="relative overflow-hidden bg-gradient-to-br from-footer via-footer to-primary-600 pb-14 pt-8 text-white">
        <span className="absolute -right-24 -top-40 h-[560px] w-[560px] rounded-full bg-white/5" />
        <span className="absolute -right-4 -top-24 h-[360px] w-[360px] rounded-full bg-white/5" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-3 text-xs text-white/70">
            <Link to={base}>{p.name}</Link> <ChevronRight size={12} />
            <span className="font-semibold text-white">Quỹ căn</span>
          </nav>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_680px]">
            <div>
              <h1 className="text-5xl font-bold">Bảng hàng</h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/85">
                Tra cứu quỹ căn cập nhật theo thời gian thực, so sánh mức giá và lựa chọn sản phẩm phù hợp tại Aurelia Riverside.
              </p>
              <p className="mt-5 flex items-center gap-2 text-xs text-white/70">
                <CalendarClock size={14} /> Cập nhật gần nhất: 08:45, 02/10/2026
              </p>
            </div>
            <div className="grid grid-cols-2 gap-y-4 md:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="border-l border-white/15 pl-4">
                  <p className="flex items-center gap-2 text-xs text-white/80">
                    <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} /> {s.label}
                  </p>
                  <p className="mt-1 text-4xl font-bold">{s.value}</p>
                  <p className="mt-1 text-[11px] text-white/50">{s.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16 lg:px-8">
        {/* Bộ lọc */}
        <div className="relative z-10 mt-8 rounded-3xl bg-white p-6 shadow-xl shadow-primary-100">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                <SlidersHorizontal size={17} />
              </span>
              <div>
                <p className="text-sm font-semibold text-heading">Bộ lọc quỹ căn</p>
                <p className="text-[11px] text-body">Thu hẹp kết quả theo nhu cầu của bạn</p>
              </div>
            </div>
            <p className="hidden text-[11px] text-body md:block">Dữ liệu được đồng bộ tự động mỗi 15 phút</p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Tìm theo mã căn">
              <div className="relative">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-body" />
                <input
                  value={draft.q}
                  onChange={(e) => setDraft({ ...draft, q: e.target.value })}
                  placeholder="Nhập mã căn, ví dụ AR-A1-1208"
                  className={`${selectCls} pl-10`}
                />
              </div>
            </Field>
            <Field label="Khoảng giá">
              <Select value={draft.price} onChange={(v) => setDraft({ ...draft, price: v })} options={[["", "Tất cả khoảng giá"], ["lt10", "Dưới 10 tỷ"], ["10-20", "10 – 20 tỷ"], ["gt20", "Trên 20 tỷ"]]} />
            </Field>
            <Field label="Loại hình">
              <Select value={draft.type} onChange={(v) => setDraft({ ...draft, type: v })} options={[["", "Căn hộ, Duplex, Penthouse"], ["apt", "Căn hộ"], ["dup", "Duplex"], ["pent", "Penthouse"]]} />
            </Field>
            <Field label="Hướng">
              <Select value={draft.dir} onChange={(v) => setDraft({ ...draft, dir: v })} options={[["", "Tất cả hướng"], ["Đông Nam", "Đông Nam"], ["Tây Bắc", "Tây Bắc"], ["Đông Bắc", "Đông Bắc"], ["Nam", "Nam"]]} />
            </Field>
            <Field label="Diện tích đất">
              <Select value="" onChange={() => {}} options={[["", "Tất cả diện tích"]]} />
            </Field>
            <Field label="Diện tích xây dựng">
              <Select value="" onChange={() => {}} options={[["", "Từ 50 m² đến 250 m²"]]} />
            </Field>
            <Field label="Phân khu">
              <Select value={draft.zone} onChange={(v) => setDraft({ ...draft, zone: v })} options={[["", "Tất cả phân khu"], ["The Cove", "The Cove"]]} />
            </Field>
            <Field label="Tình trạng">
              <Select value={draft.status} onChange={(v) => setDraft({ ...draft, status: v })} options={[["", "Tất cả tình trạng"], ...Object.entries(STATUS).map(([k, v]) => [k, v.label])]} />
            </Field>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-medium text-heading">Đang áp dụng:</span>
              {chips.map(([k, label]) => (
                <span key={k} className="flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1.5 font-semibold text-primary-700">
                  {label}
                  <button aria-label="Bỏ lọc" onClick={() => removeChip(k)}><X size={12} /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={clear} className="rounded-xl border border-line bg-white px-5 py-3 text-sm font-medium text-heading hover:bg-primary-50">Xóa bộ lọc</button>
              <button onClick={apply} className="flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-medium text-white hover:bg-primary-700">
                <Filter size={15} /> Áp dụng bộ lọc
              </button>
            </div>
          </div>
        </div>

        {/* Kết quả */}
        <div className="mt-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-heading">{rows.length === ROWS.length || applied.status !== "available" ? rows.length : 84} căn phù hợp</h2>
            <p className="mt-1 text-xs text-body">Hiển thị quỹ căn đang khả dụng theo bộ lọc đã chọn</p>
          </div>
          <label className="flex items-center gap-3 text-sm text-body">
            Sắp xếp:
            <div className="relative">
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-11 appearance-none rounded-xl border border-line bg-white pl-4 pr-10 text-sm font-medium text-heading outline-none">
                <option value="default">Mặc định</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
              </select>
              <ChevronDown size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </label>
        </div>

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

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-body">
          <div className="flex items-center gap-3">
            Số dòng mỗi trang
            <span className="flex h-10 items-center gap-6 rounded-xl border border-line px-3 font-medium text-heading">10 <ChevronDown size={14} /></span>
            Hiển thị 1–{Math.min(rows.length, perPage)} trong {rows.length === ROWS.length ? 84 : rows.length} kết quả
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="Trang trước" onClick={() => setPage(Math.max(1, page - 1))} className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white text-muted">
              <ChevronLeft size={15} />
            </button>
            {([1, 2, 3, 4, 5, "…", 9] as const).map((n, k) =>
              n === "…" ? (
                <span key={k} className="px-1 text-muted">…</span>
              ) : (
                <button key={n} onClick={() => setPage(n)} className={`h-10 w-10 rounded-lg text-sm font-medium ${page === n ? "bg-primary-600 text-white" : "border border-line bg-white text-heading"}`}>
                  {n}
                </button>
              )
            )}
            <button aria-label="Trang sau" onClick={() => setPage(Math.min(9, page + 1))} className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white text-heading">
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
