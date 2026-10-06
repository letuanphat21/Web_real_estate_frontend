import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, BedDouble, Maximize, Heart, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

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

function ProjectCard({ project }) {
  return (
    <Link
      to={`/du-an/${project.id}`}
      className="group overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-100"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-primary-600 backdrop-blur">
          {project.tag}
        </span>
        <button
          onClick={(e) => e.preventDefault()}
          aria-label="Yêu thích"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-body backdrop-blur hover:text-primary-600"
        >
          <Heart size={16} />
        </button>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-heading">{project.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-body">
          <MapPin size={14} /> {project.location}
        </p>

        <div className="mt-4 flex gap-4 text-sm text-body">
          <span className="flex items-center gap-1.5">
            <BedDouble size={15} /> {project.beds} PN
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize size={15} /> {project.area} m²
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
          <div>
            <p className="text-lg font-semibold text-primary-600">{project.price}</p>
            <p className="text-xs text-body">{project.pricePerM2}</p>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition group-hover:bg-primary-600 group-hover:text-white">
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

  return (
    <section className="bg-gradient-to-b from-primary-50 to-white py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          badge="Dự án nổi bật"
          title="Những lựa chọn xứng tầm, dữ liệu luôn rõ ràng"
          desc="Giá, pháp lý và tiến độ được xác thực — bạn chỉ cần chọn nơi mình muốn sống."
          action={
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    filter === f
                      ? "bg-primary-600 text-white"
                      : "border border-line bg-white text-body hover:text-primary-600"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          }
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        {list.length === 0 && (
          <p className="py-10 text-center text-body">Chưa có dự án thuộc loại này.</p>
        )}
      </div>
    </section>
  );
}
