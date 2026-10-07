import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectTabs from "../../components/ProjectDetail/ProjectTabs";
import { PROJECT, ROWS, STATS, type InventoryFilter } from "../../data/projectDetail/inventory";
import { STATUS } from "../../components/ProjectDetail/inventory/inventoryStatus";
import InventoryHero from "../../components/ProjectDetail/inventory/InventoryHero";
import InventoryFilters from "../../components/ProjectDetail/inventory/InventoryFilters";
import InventoryResultsHeader from "../../components/ProjectDetail/inventory/InventoryResultsHeader";
import InventoryTable from "../../components/ProjectDetail/inventory/InventoryTable";
import InventoryPagination from "../../components/ProjectDetail/inventory/InventoryPagination";

export default function ProjectInventoryPage() {
  const { id } = useParams();
  const base = `/du-an/${id}`;
  const p = PROJECT;

  const [draft, setDraft] = useState<InventoryFilter>({ q: "", price: "", type: "", dir: "", zone: "The Cove", status: "available" });
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

  const chips: string[][] = [
    applied.zone && ["zone", `Phân khu: ${applied.zone}`],
    applied.status && ["status", `Tình trạng: ${STATUS[applied.status].label}`],
  ].filter(Boolean) as string[][];

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
      <InventoryHero base={base} project={p} stats={STATS} />

      <div className="container mx-auto px-4 pb-16 lg:px-8">
        {/* Bộ lọc */}
        <InventoryFilters draft={draft} setDraft={setDraft} chips={chips} removeChip={removeChip} clear={clear} apply={apply} />

        {/* Kết quả */}
        <InventoryResultsHeader total={rows.length === ROWS.length || applied.status !== "available" ? rows.length : 84} sort={sort} setSort={setSort} />

        <InventoryTable rows={rows} page={page} perPage={perPage} base={base} />

        <InventoryPagination rowCount={rows.length} totalCount={rows.length === ROWS.length ? 84 : rows.length} perPage={perPage} page={page} setPage={setPage} />
      </div>
    </div>
  );
}
