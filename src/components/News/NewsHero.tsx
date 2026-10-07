import { Link } from "react-router-dom";
import { ChevronRight, Newspaper, TrendingUp } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

interface NewsHeroProps {
  total: number;
}

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1000&q=80";

export default function NewsHero({ total }: NewsHeroProps) {
  return (
    <section className="bg-hero pb-24 pt-8">
      <div className="container mx-auto px-4 lg:px-8">
        <nav
          className="flex items-center gap-1.5 text-xs text-body"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-primary-600">
            Trang chủ
          </Link>
          <ChevronRight size={12} />
          <span className="font-medium text-primary-600">Tin tức</span>
        </nav>

        <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-600">
              <TrendingUp size={13} /> Dữ liệu thị trường · Góc nhìn chuyên gia
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-heading md:text-5xl">
              Tin tức bất động sản
            </h1>
            <p className="mt-3 max-w-2xl text-body">
              Cập nhật nhanh chuyển động thị trường, dự án, pháp lý, quy hoạch
              và xu hướng sống từ mạng lưới chuyên gia NovaLand Hub.
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm text-body">
              <Newspaper size={16} className="text-primary-600" />
              <b className="text-heading">
                {total.toLocaleString("vi-VN")} bài viết
              </b>
              · Cập nhật {formatDate(new Date().toISOString())}
            </p>
          </div>

          <div className="relative hidden aspect-[16/10] overflow-hidden rounded-3xl shadow-2xl shadow-primary-200 lg:block">
            <img
              src={HERO_IMAGE}
              alt="Toàn cảnh thị trường"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 text-white">
              <p className="text-lg font-semibold">
                Toàn cảnh thị trường hôm nay
              </p>
              <p className="text-xs text-white/80">
                Số liệu cập nhật từ 63 tỉnh thành
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
