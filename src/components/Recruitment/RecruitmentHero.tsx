import { Sparkles } from "lucide-react";
import Breadcrumb from "../common/Breadcrumb";
import JobSearchBar from "./JobSearchBar";
import type { JobFilter } from "../../types/job.types";

const POPULAR_KEYWORDS = ["Sales BĐS", "Quản lý dự án", "Tư vấn căn hộ", "Marketing BĐS"];

const TEAM_IMAGE =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1000&q=80";

const AVATARS = [12, 47, 33, 68];

/** Phần đầu trang: breadcrumb + tiêu đề + ô tìm kiếm + ảnh đội ngũ */
export default function RecruitmentHero({
  filter,
  onSearch,
}: {
  filter: JobFilter;
  onSearch: (f: JobFilter) => void;
}) {
  return (
    <section className="bg-gradient-to-br from-primary-100 via-primary-50 to-white pb-14 pt-8">
      <div className="container mx-auto px-4 lg:px-8">
        <Breadcrumb items={[{ label: "Trang chủ", to: "/" }, { label: "Tuyển dụng bất động sản" }]} />

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-primary-700 ring-1 ring-primary-200">
              <Sparkles size={13} aria-hidden /> Cơ hội nghề nghiệp mới mỗi ngày
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-heading md:text-5xl">
              Bứt phá sự nghiệp{" "}
              <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                bất động sản
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-body">
              Tìm công việc phù hợp, đúng dự án và vai trò theo năng lực của bạn cùng hàng trăm nhà
              tuyển dụng uy tín trong ngành bất động sản.
            </p>

            <div className="mt-8">
              <JobSearchBar key={`${filter.keyword}|${filter.location}`} value={filter} onSearch={onSearch} />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-body">Phổ biến:</span>
              {POPULAR_KEYWORDS.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => onSearch({ ...filter, keyword: k })}
                  className="rounded-full bg-white px-3 py-1 text-xs text-primary-700 ring-1 ring-primary-100 transition hover:bg-primary-50"
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src={TEAM_IMAGE}
              alt="Đội ngũ môi giới bất động sản đang trao đổi công việc"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl shadow-primary-200/50"
            />
            <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-line md:left-6">
              <div>
                <p className="text-sm font-semibold text-heading">Gia nhập đội ngũ NovaLand</p>
                <p className="text-xs text-body">Hơn 2.000 chuyên viên đã đồng hành</p>
              </div>
              <div className="flex -space-x-2">
                {AVATARS.map((n) => (
                  <img
                    key={n}
                    src={`https://i.pravatar.cc/60?img=${n}`}
                    alt=""
                    className="h-8 w-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
