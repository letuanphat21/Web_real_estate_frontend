import { Play, Pause, Volume2, Settings, Maximize, Sparkles } from "lucide-react";
import type { PROJECT, VIDEO_META } from "../../../data/projectDetail/documents";

type Props = {
  project: typeof PROJECT;
  meta: typeof VIDEO_META;
};

export default function IntroVideo({ project, meta }: Props) {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-xs font-semibold uppercase text-primary-600">Trải nghiệm Aurelia</p>
        <h2 className="mt-2 text-4xl font-semibold text-heading">Video giới thiệu dự án</h2>
        <p className="mt-2 text-sm text-body">Khám phá ngôn ngữ kiến trúc ven sông, hệ cảnh quan nhiều lớp và chuẩn sống riêng tư tại trung tâm Thủ Thiêm.</p>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_330px]">
          <div className="relative overflow-hidden rounded-3xl" style={{ height: 440 }}>
            <img src={project.image} alt="Video giới thiệu" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-footer/80 via-transparent to-transparent" />
            <span className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-[10px] font-semibold uppercase text-primary-700">
              <Sparkles size={12} /> Phim giới thiệu chính thức
            </span>
            <button aria-label="Phát video" className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary-600 shadow-xl">
              <Play size={24} />
            </button>
            <div className="absolute bottom-5 left-6 right-6 text-white">
              <p className="text-xl font-semibold">Aurelia Riverside — Dấu ấn sống bên sông</p>
              <p className="text-[11px] text-white/80">Kiến trúc · Cảnh quan · Trải nghiệm sống</p>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/30"><div className="h-full w-[31%] bg-primary-300" /></div>
              <div className="mt-3 flex items-center gap-4 text-xs">
                <Pause size={15} /> <Volume2 size={15} /> <span>01:24 / 03:18</span>
                <span className="ml-auto flex items-center gap-4"><b>HD</b> <Settings size={15} /> <Maximize size={15} /></span>
              </div>
            </div>
          </div>

          <aside className="rounded-3xl border border-line bg-primary-50/70 p-6">
            <p className="text-[10px] font-semibold uppercase text-primary-600">Tổng quan video</p>
            <h3 className="mt-3 text-2xl font-semibold leading-snug text-heading">Một biểu tượng sống mới bên dòng sông Sài Gòn</h3>
            <p className="mt-4 text-[13px] leading-relaxed text-body">
              Video giới thiệu tầm nhìn quy hoạch, bốn phân khu, chuỗi tiện ích wellness và trải nghiệm sống hướng sông tại Aurelia Riverside.
            </p>
            <ul className="mt-5 space-y-5 border-t border-line pt-5">
              {meta.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-center gap-3">
                  <Icon size={17} className="text-primary-600" />
                  <span>
                    <span className="block text-[10px] text-muted">{label}</span>
                    <span className="block text-sm font-semibold text-heading">{value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
