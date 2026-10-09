import { MOCK_ZONES } from "../data/mockZones";
import { PROJECTS } from "../data/mockProjects";
import type { ProjectZones } from "../types/zone.types";

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// TODO: thay bằng gọi API khi backend có endpoint phân khu
async function getProjectZones(projectId: number): Promise<ProjectZones> {
  await delay(300);

  const project = PROJECTS.find((p) => p.id === projectId);
  if (!project) throw new Error("Không tìm thấy dự án");

  return {
    project: {
      id: project.id,
      name: project.name,
      location: project.location,
      investor: project.investor,
      image: project.image,
    },
    zones: MOCK_ZONES.filter((z) => z.projectId === projectId),
  };
}

export const zoneService = { getProjectZones };
