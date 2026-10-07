import { Link, useParams } from "react-router-dom";
import {
  ChevronRight,
  Building2,
  RefreshCw,
  FolderOpen,
  GraduationCap,
  Map,
  ImagePlay,
  BadgePercent,
  House,
  LayoutPanelTop,
  BookOpen,
  FileCheck,
  Play,
  Pause,
  Volume2,
  Settings,
  Maximize,
  Sparkles,
  Clock,
  CalendarDays,
  Languages,
} from "lucide-react";
import ProjectTabs from "../../components/ProjectDetail/ProjectTabs";

// TODO: thay bằng dữ liệu gọi từ API theo :id (bảng project_documents: title, url, created_at)
const PROJECT = {
  name: "Aurelia Riverside",
  image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80",
};

const CATEGORIES = [
  { icon: FolderOpen, title: "Thông tin dự án", desc: "Hồ sơ tổng quan, câu chuyện thương hiệu và bộ thông tin chuẩn dành cho tư vấn." },
  { icon: GraduationCap, title: "Đào tạo dự án", desc: "Slide đào tạo, kịch bản tư vấn và tài liệu onboarding dành cho đội ngũ kinh doanh." },
  { icon: Map, title: "Tổng mặt bằng", desc: "Quy hoạch tổng thể, sơ đồ phân khu và bản vẽ định vị tiện ích toàn dự án." },
  { icon: ImagePlay, title: "Hình ảnh & video", desc: "Phối cảnh chất lượng cao, flycam, video truyền thông và hình ảnh tiện ích." },
  { icon: BadgePercent, title: "Chính sách bán hàng", desc: "Chính sách hiện hành, tiến độ thanh toán, ưu đãi và hướng dẫn booking." },
  { icon: House, title: "Các mẫu nhà & biệt thự", desc: "Bộ sưu tập căn hộ, duplex, penthouse và biệt thự với thông số chi tiết." },
  { icon: LayoutPanelTop, title: "Layout", desc: "Mặt bằng điển hình, layout từng loại căn và phương án bố trí nội thất tham khảo." },
  { icon: BookOpen, title: "Leaflet & Brochure", desc: "Brochure chính thức, leaflet bán hàng và bộ ấn phẩm truyền thông được phê duyệt." },
  { icon: FileCheck, title: "Pháp lý dự án", desc: "Văn bản pháp lý, giấy phép, thông báo và hồ sơ công bố theo từng giai đoạn." },
];

const VIDEO_META = [
  { icon: Clock, label: "Thời lượng", value: "03 phút 18 giây" },
  { icon: CalendarDays, label: "Ngày phát hành", value: "01/10/2026" },
  { icon: Languages, label: "Ngôn ngữ", value: "Tiếng Việt · Phụ đề Anh" },
];

export default function ProjectDocumentsPage() {
  const { id } = useParams();
  const base = `/projects/${id}`;

  return (
    <div className="bg-white">
      <ProjectTabs />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-200 to-white pb-14 pt-8">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-3 text-xs text-muted">
            <Link to="/">Trang chủ</Link> <ChevronRight size={12} />
            <Link to={base}>{PROJECT.name}</Link> <ChevronRight size={12} />
            <span className="font-semibold text-primary-600">Tài liệu</span>
          </nav>
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1fr_450px]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase text-primary-700">
                <Building2 size={12} /> Aurelia Riverside · Thủ Thiêm, TP.HCM
              </span>
              <h1 className="mt-5 text-5xl font-bold text-heading">Thư viện tài liệu dự án</h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-body">
                Truy cập tập trung hồ sơ dự án, chính sách bán hàng, mặt bằng và bộ tài liệu truyền thông mới nhất của Aurelia Riverside.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary-600 shadow-sm"><RefreshCw size={15} /></span>
                <div>
                  <p className="text-[10px] text-muted">Cập nhật gần nhất</p>
                  <p className="text-sm font-semibold text-heading">01/10/2026 · 16:30</p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-primary-100" style={{ height: 220 }}>
              <img src={PROJECT.image} alt={PROJECT.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-footer/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 text-white">
                <p className="text-lg font-semibold">{PROJECT.name}</p>
                <p className="text-[11px] text-white/80">Bán đảo Thủ Thiêm · TP.HCM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kho tài liệu */}
      <section className="bg-primary-50/70 py-14">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-xs font-semibold uppercase text-primary-600">Kho tài liệu dự án</p>
          <h2 className="mt-2 text-4xl font-semibold text-heading">Mọi tài liệu cần thiết, trong một không gian</h2>
          <p className="mt-2 text-sm text-body">Danh mục được chuẩn hóa để đội ngũ kinh doanh, đối tác và khách hàng tra cứu nhanh phiên bản mới nhất.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map(({ icon: Icon, title, desc }, i) => (
              <a key={title} href={`${base}/tai-lieu`} className="relative rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-100" style={{ minHeight: 152 }}>
                <span className="absolute right-5 top-3 text-5xl font-bold text-primary-200">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600"><Icon size={17} /></span>
                <h3 className="mt-5 text-base font-semibold uppercase text-heading">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-body">{desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="py-14">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-xs font-semibold uppercase text-primary-600">Trải nghiệm Aurelia</p>
          <h2 className="mt-2 text-4xl font-semibold text-heading">Video giới thiệu dự án</h2>
          <p className="mt-2 text-sm text-body">Khám phá ngôn ngữ kiến trúc ven sông, hệ cảnh quan nhiều lớp và chuẩn sống riêng tư tại trung tâm Thủ Thiêm.</p>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_330px]">
            <div className="relative overflow-hidden rounded-3xl" style={{ height: 440 }}>
              <img src={PROJECT.image} alt="Video giới thiệu" className="h-full w-full object-cover" />
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
                {VIDEO_META.map(({ icon: Icon, label, value }) => (
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
    </div>
  );
}
