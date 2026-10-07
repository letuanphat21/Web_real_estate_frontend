import { useParams } from "react-router-dom";
import ProjectTabs from "../../components/ProjectDetail/ProjectTabs";
import { PROJECT, CATEGORIES, VIDEO_META } from "../../data/projectDetail/documents";
import DocumentsHero from "../../components/ProjectDetail/documents/DocumentsHero";
import DocumentCategories from "../../components/ProjectDetail/documents/DocumentCategories";
import IntroVideo from "../../components/ProjectDetail/documents/IntroVideo";

export default function ProjectDocumentsPage() {
  const { id } = useParams();
  const base = `/du-an/${id}`;

  return (
    <div className="bg-white">
      <ProjectTabs />

      {/* Hero */}
      <DocumentsHero base={base} project={PROJECT} />

      {/* Kho tài liệu */}
      <DocumentCategories base={base} categories={CATEGORIES} />

      {/* Video */}
      <IntroVideo project={PROJECT} meta={VIDEO_META} />
    </div>
  );
}
