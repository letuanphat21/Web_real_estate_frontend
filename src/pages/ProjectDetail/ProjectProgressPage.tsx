import { useState } from "react";
import { useParams } from "react-router-dom";
import ProjectTabs from "../../components/ProjectDetail/ProjectTabs";
import { PROJECT, PERIODS, CATEGORIES, GALLERY } from "../../data/projectDetail/progress";
import ProgressBadge from "../../components/ProjectDetail/progress/ProgressBadge";
import ProgressHero from "../../components/ProjectDetail/progress/ProgressHero";
import PeriodList from "../../components/ProjectDetail/progress/PeriodList";
import PeriodDetail from "../../components/ProjectDetail/progress/PeriodDetail";

export default function ProjectProgressPage() {
  const { id } = useParams();
  const base = `/projects/${id}`;
  const [active, setActive] = useState("t10");
  const period = PERIODS.find((x) => x.key === active) ?? PERIODS[0];
  const factor = period.percent / 68;

  return (
    <div className="bg-white">
      <ProjectTabs />

      {/* Hero */}
      <ProgressHero base={base} project={PROJECT} />

      {/* Nhật ký */}
      <section className="bg-primary-50/70 py-14">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-primary-600">Nhật ký công trường</p>
              <h2 className="mt-2 text-4xl font-semibold text-heading">Tiến độ được cập nhật theo từng kỳ</h2>
              <p className="mt-2 text-sm text-body">Chọn một mốc thời gian để theo dõi báo cáo thi công, hình ảnh thực tế và xác nhận của Ban quản lý dự án.</p>
            </div>
            <div className="flex gap-2">
              {(["done", "building", "plan"] as const).map((s) => <ProgressBadge key={s} state={s} />)}
            </div>
          </div>

          <div className="mt-6 grid items-start gap-5 lg:grid-cols-[350px_1fr]">
            {/* Danh sách kỳ */}
            <PeriodList periods={PERIODS} active={active} setActive={setActive} />

            {/* Chi tiết kỳ */}
            <PeriodDetail period={period} factor={factor} categories={CATEGORIES} gallery={GALLERY} />
          </div>
        </div>
      </section>
    </div>
  );
}
