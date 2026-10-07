import { useState } from "react";
import ProjectsHero from "../../components/Projects/ProjectsHero";
import ProjectsResults, { type ProjectsView } from "../../components/Projects/ProjectsResults";
import { PROJECTS, ACTIVE_FILTERS, PAGES } from "../../data/mockProjects";

const TOTAL_PROJECTS = 126;
const TOTAL_PAGES = 12;

export default function ProjectsPage() {
  const [filters, setFilters] = useState(ACTIVE_FILTERS);
  const [page, setPage] = useState(1);
  const [view, setView] = useState<ProjectsView>("grid");

  return (
    <div>
      <ProjectsHero
        filters={filters}
        onRemoveFilter={(f) => setFilters(filters.filter((x) => x !== f))}
        onClearFilters={() => setFilters([])}
      />
      <ProjectsResults
        projects={PROJECTS}
        total={TOTAL_PROJECTS}
        view={view}
        onViewChange={setView}
        page={page}
        totalPages={TOTAL_PAGES}
        pages={PAGES}
        onPageChange={setPage}
      />
    </div>
  );
}
