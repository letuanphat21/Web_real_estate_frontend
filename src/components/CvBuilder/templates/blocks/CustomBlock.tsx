import type { CvData } from "../../../../types/cv.types";

export default function CustomBlock({ data, id }: { data: CvData; id: string }) {
  const section = data.customSections.find((s) => s.id === id);
  return <p className="whitespace-pre-line text-[0.92em] text-gray-700">{section?.content}</p>;
}
