import { MOCK_PROGRESS } from "../data/mockProgress";
import { PROJECTS } from "../data/mockProjects";
import type { ProjectProgress } from "../types/progress.types";

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const sortKey = (p: { reportDate: string | null; createdAt: string }) =>
  new Date(p.reportDate ?? p.createdAt).getTime();

// TODO: thay bằng gọi API khi backend có endpoint tiến độ
async function getProjectProgress(projectId: number): Promise<ProjectProgress> {
  await delay(300);

  const project = PROJECTS.find((p) => p.id === projectId);
  if (!project) throw new Error("Không tìm thấy dự án");

  const items = MOCK_PROGRESS.filter((p) => p.projectId === projectId).sort((a, b) => sortKey(b) - sortKey(a));

  return {
    project: {
      id: project.id,
      name: project.name,
      location: project.location,
      investor: project.investor,
      overviewImage: project.image,
    },
    items,
  };
}

export const progressService = { getProjectProgress };
