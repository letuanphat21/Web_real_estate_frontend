import ProjectTabs from "../../components/ProjectDetail/ProjectTabs";
import { POLICY_IMAGES } from "../../data/projectDetail/policy";

export default function ProjectPolicyPage() {
  return (
    <div className="bg-primary-50/70">
      <ProjectTabs />

      <div className="container mx-auto px-4 pb-20 pt-10 lg:px-8">
        {/* Tiêu đề */}
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-primary-500">Aurelia Riverside</span>
          <h1 className="mt-3 text-4xl font-bold text-footer md:text-5xl">Chính sách bán hàng</h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-primary-500" />
            <span className="h-2 w-2 rotate-45 bg-primary-500" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-primary-500" />
          </div>
        </div>

        {/* Ảnh chính sách xếp dọc liền nhau như ảnh dài */}
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg">
          {POLICY_IMAGES.map((src, i) => (
            <img key={src} src={src} alt={`Chính sách bán hàng ${i + 1}`} className="block w-full" loading="lazy" />
          ))}
        </div>
      </div>
    </div>
  );
}
