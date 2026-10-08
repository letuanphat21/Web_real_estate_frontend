import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProjectTabs from "../../components/ProjectDetail/ProjectTabs";
import { PROJECT, ADVANTAGES, POIS } from "../../data/projectDetail/location";
import LocationHero from "../../components/ProjectDetail/location/LocationHero";
import LocationAdvantages from "../../components/ProjectDetail/location/LocationAdvantages";
import LocationMap from "../../components/ProjectDetail/location/LocationMap";

export default function ProjectLocationPage() {
  const { id } = useParams();
  const p = PROJECT;

  const base = `/projects/${id}`;


  return (
    <div className="bg-white">
      <ProjectTabs />

      <section className="bg-gradient-to-b from-blue-200 to-white pb-16 pt-8">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-3 text-xs text-muted">
            <Link to="/">Trang chủ</Link> <ChevronRight size={12} />
            <Link to={base}>{p.name}</Link> <ChevronRight size={12} />
            <span className="text-primary-600">Vị trí</span>
          </nav>

          {/* Hero */}
          <LocationHero project={p} />

          {/* Lợi thế vị trí */}
          <LocationAdvantages project={p} advantages={ADVANTAGES} />
        </div>
      </section>

      {/* Bản đồ toàn chiều rộng */}
      <LocationMap project={p} pois={POIS} />
    </div>
  );
}
