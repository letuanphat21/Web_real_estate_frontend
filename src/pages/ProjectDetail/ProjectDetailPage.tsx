import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ProjectTabs from "../../components/ProjectDetail/ProjectTabs";
import ProjectHero from "../../components/ProjectDetail/overview/ProjectHero";
import OverviewSection from "../../components/ProjectDetail/overview/OverviewSection";
import LocationSection from "../../components/ProjectDetail/overview/LocationSection";
import ZonesSection from "../../components/ProjectDetail/overview/ZonesSection";
import FloorPlanSection from "../../components/ProjectDetail/overview/FloorPlanSection";
import Tour360Section from "../../components/ProjectDetail/overview/Tour360Section";
import PolicySection from "../../components/ProjectDetail/overview/PolicySection";
import ProgressSection from "../../components/ProjectDetail/overview/ProgressSection";
import DocumentsSection from "../../components/ProjectDetail/overview/DocumentsSection";
import NewsSection from "../../components/ProjectDetail/overview/NewsSection";
import { PROJECT, GALLERY, NEARBY, ZONES, BUILDINGS, PINS, FACILITIES, PROPERTIES, POLICIES, PROGRESS, DOCUMENTS, NEWS } from "../../data/projectDetail/overview";

export default function ProjectDetailPage() {
  const { id } = useParams(); // TODO: fetch dự án theo id
  const { hash: rawHash } = useLocation();
  const hash = rawHash.replace("#", "");

  useEffect(() => {
    if (hash) document.getElementById(hash)?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [hash]);

  return (
    <div data-project={id} className="bg-white">
      <ProjectTabs activeHash={hash} />


      <ProjectHero project={PROJECT} gallery={GALLERY} />
      <OverviewSection project={PROJECT} />
      <LocationSection project={PROJECT} nearby={NEARBY} />
      <ZonesSection zones={ZONES} />
      <FloorPlanSection projectId={id} pins={PINS} buildings={BUILDINGS} facilities={FACILITIES} properties={PROPERTIES} />
      <Tour360Section />
      <PolicySection plans={POLICIES} />
      <ProgressSection steps={PROGRESS} />
      <DocumentsSection documents={DOCUMENTS} />
      <NewsSection news={NEWS} />
    </div>
  );
}
