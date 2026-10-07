import CareerJobsPanel from "./CareerJobsPanel";
import CareerProfilePanel from "./CareerProfilePanel";

/** Mockup giao diện việc làm + hồ sơ CV (dựng bằng HTML/CSS, không phải ảnh) */
export default function CareerMockup() {
  return (
    <div
      className="grid overflow-hidden rounded-3xl bg-white shadow-2xl shadow-black/30 sm:grid-cols-[0.8fr_1.2fr]"
      role="img"
      aria-label="Minh họa danh sách việc làm phù hợp và hồ sơ CV của ứng viên"
    >
      <CareerJobsPanel />
      <CareerProfilePanel />
    </div>
  );
}
