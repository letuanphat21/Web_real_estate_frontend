import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectTabs from "../../components/ProjectDetail/ProjectTabs";
import ProgressHero from "../../components/ProjectDetail/progress/ProgressHero";
import ProgressTimeline from "../../components/ProjectDetail/progress/ProgressTimeline";
import ProgressGallery from "../../components/ProjectDetail/progress/ProgressGallery";
import Lightbox from "../../components/ProjectDetail/progress/Lightbox";
import { displayDate } from "../../components/ProjectDetail/progress/progressFormat";
import { progressService } from "../../services/progressService";
import type { ProjectProgress, ViewImage } from "../../types/progress.types";

type State = { status: "loading" } | { status: "error" } | { status: "ready"; data: ProjectProgress };

export default function ProjectProgressPage() {
  const { id } = useParams();
  const base = `/projects/${id}`;
  const [state, setState] = useState<State>({ status: "loading" });
  const [reload, setReload] = useState(0);
  const [box, setBox] = useState<{ images: ViewImage[]; index: number } | null>(null);
  const timeline = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    progressService
      .getProjectProgress(Number(id))
      .then((data) => !cancelled && setState({ status: "ready", data }))
      .catch(() => !cancelled && setState({ status: "error" }));
    return () => {
      cancelled = true;
    };
  }, [id, reload]);

  const open = useCallback((images: ViewImage[], index: number) => setBox({ images, index }), []);

  if (state.status === "loading") {
    return (
      <div className="bg-white">
        <ProjectTabs />
        <div className="container mx-auto animate-pulse px-4 py-16 lg:px-8" aria-busy="true" aria-label="Đang tải tiến độ">
          <div className="h-5 w-40 rounded bg-primary-100" />
          <div className="mt-6 h-20 w-2/3 rounded bg-primary-100" />
          <div className="mt-10 h-72 rounded-3xl bg-primary-50" />
        </div>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="bg-white">
        <ProjectTabs />
        <div className="container mx-auto px-4 py-24 text-center lg:px-8" role="alert">
          <p className="text-xl font-semibold text-heading">Không tải được tiến độ dự án</p>
          <p className="mt-2 text-sm text-body">Vui lòng thử lại sau ít phút.</p>
          <button
            onClick={() => {
              setState({ status: "loading" });
              setReload((n) => n + 1);
            }}
            className="mt-6 rounded-full bg-primary-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-primary-700 active:scale-95"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  const { data } = state;
  const gallery: ViewImage[] = data.items.flatMap((p) =>
    p.images.map((i) => ({ src: i.imageUrl, title: p.title, date: displayDate(p).toISOString() })),
  );

  return (
    <div className="bg-white">
      <ProjectTabs />
      <ProgressHero base={base} data={data} onJump={() => timeline.current?.scrollIntoView({ behavior: "smooth", block: "start" })} />

      <section ref={timeline} className="scroll-mt-32 bg-white py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 lg:px-8">
          <div className="mb-14 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-600">Lịch sử cập nhật</p>
            <h2 className="mt-3 text-3xl font-bold text-heading md:text-5xl">Từng bước phát triển của dự án</h2>
          </div>

          {data.items.length === 0 ? (
            <p className="rounded-3xl border border-dashed border-primary-200 bg-primary-50/50 px-6 py-16 text-center text-body">
              Dự án chưa có bản cập nhật tiến độ nào.
            </p>
          ) : (
            <ProgressTimeline items={data.items} onOpen={open} />
          )}
        </div>
      </section>

      <ProgressGallery images={gallery} onOpen={open} />

      {box && (
        <Lightbox
          images={box.images}
          index={box.index}
          onIndexChange={(index) => setBox({ ...box, index })}
          onClose={() => setBox(null)}
        />
      )}
    </div>
  );
}
