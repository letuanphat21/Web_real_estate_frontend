import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, BedDouble, Maximize, Heart, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { IMAGE_CHIP } from "./homeStyles";
import Reveal from "../common/Reveal";

const FILTERS = ["Tất cả", "Căn hộ", "Biệt thự", "Nhà phố"];

// TODO: thay bằng dữ liệu gọi từ API
const PROJECTS = [
  {
    id: 1,
    name: "The Lumen Riverside",
    type: "Căn hộ",
    location: "Thủ Đức, TP. HCM",
    price: "5,2 tỷ",
    pricePerM2: "72 tr/m²",
    beds: 2,
    area: 72,
    tag: "Mới mở bán",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  },
  {
    id: 2,
    name: "Aurora Bay Residences",
    type: "Căn hộ",
    location: "Quận 7, TP. HCM",
    price: "6,8 tỷ",
    pricePerM2: "85 tr/m²",
    beds: 3,
    area: 80,
    tag: "Bàn giao 2027",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  },
  {
    id: 3,
    name: "Maison Heritage",
    type: "Biệt thự",
    location: "Quận 2, TP. HCM",
    price: "24,5 tỷ",
    pricePerM2: "160 tr/m²",
    beds: 4,
    area: 153,
    tag: "Sổ hồng",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  },
];

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group block h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition duration-300 hover:-translate-y-1 hover:border-gold-300/40 hover:bg-white/[0.07]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className={`absolute left-3 top-3 px-3 py-1 text-xs font-medium ${IMAGE_CHIP}`}>
          {project.tag}
        </span>
        <button
          onClick={(e) => e.preventDefault()}
          aria-label="Yêu thích"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-ink-950/65 text-white/80 backdrop-blur hover:text-gold-200"
        >
          <Heart size={16} />
        </button>
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl text-white">{project.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-white/60">
          <MapPin size={14} /> {project.location}
        </p>

        <div className="mt-4 flex gap-4 text-sm text-white/60">
          <span className="flex items-center gap-1.5">
            <BedDouble size={15} /> {project.beds} PN
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize size={15} /> {project.area} m²
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-4">
          <div>
            <p className="text-lg font-semibold text-gold-200">{project.price}</p>
            <p className="text-xs text-white/50">{project.pricePerM2}</p>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-300/40 text-gold-200 transition group-hover:bg-gold-300 group-hover:text-gold-950">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState("Tất cả");
  const list = filter === "Tất cả" ? PROJECTS : PROJECTS.filter((p) => p.type === filter);
  const track = useRef<HTMLDivElement>(null);

  // Trượt tới/lui theo bề rộng một thẻ
  const slide = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="bg-ink-900 py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          badge="Dự án nổi bật"
          title={
            <>
              Những lựa chọn xứng tầm, <em>dữ liệu luôn rõ ràng</em>
            </>
          }
          desc="Giá, pháp lý và tiến độ được xác thực — bạn chỉ cần chọn nơi mình muốn sống."
          action={
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    filter === f
                      ? "bg-gold-300 text-gold-950"
                      : "border border-white/15 text-white/70 hover:border-gold-300/50 hover:text-gold-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          }
        />

        <div className="relative">
          <div
            ref={track}
            className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {list.map((p, i) => (
              <Reveal key={p.id} delay={i * 120} className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-3rem)/3)]">
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
          <div className="mt-2 flex justify-end gap-2">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                onClick={() => slide(d)}
                aria-label={d < 0 ? "Trượt về trước" : "Trượt tới sau"}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-gold-300 hover:bg-gold-300 hover:text-gold-950"
              >
                {d < 0 ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </button>
            ))}
          </div>
        </div>

        {list.length === 0 && (
          <p className="py-10 text-center text-white/60">Chưa có dự án thuộc loại này.</p>
        )}
      </div>
    </section>
  );
}
