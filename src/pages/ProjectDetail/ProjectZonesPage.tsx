import { useParams } from "react-router-dom";
import ProjectTabs from "../../components/ProjectDetail/ProjectTabs";
import { PROJECT, ZONES } from "../../data/projectDetail/zones";
import ZonesHero from "../../components/ProjectDetail/zones/ZonesHero";
import ZonesCollection from "../../components/ProjectDetail/zones/ZonesCollection";

export default function ProjectZonesPage() {
  const { id } = useParams();
  const base = `/projects/${id}`;
  const p = PROJECT;

  return (
    <div className="bg-white">
      <ProjectTabs />

      {/* Hero */}
      <ZonesHero base={base} project={p} />

      {/* Bộ sưu tập */}
      <ZonesCollection base={base} zones={ZONES} />
    </div>
  );
}
