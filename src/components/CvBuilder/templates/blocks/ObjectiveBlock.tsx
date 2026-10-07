import type { CvData } from "../../../../types/cv.types";

export default function ObjectiveBlock({ data }: { data: CvData }) {
  return (
    <p className="whitespace-pre-line text-[0.92em] leading-relaxed text-gray-700">
      {data.objective || data.personal.summary}
    </p>
  );
}
