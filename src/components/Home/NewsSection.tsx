import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "../common/Reveal";

const FEATURED = {
  id: 1,
  category: "Thị trường",
  title: "Hạ tầng giao thông kéo giá căn hộ khu Đông tăng mạnh trong quý III",
  date: "06/10/2026",
  image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&q=80",
};

const NEWS = [
  { id: 2, category: "Pháp lý", title: "5 điều cần kiểm tra trước khi đặt cọc mua căn hộ", date: "05/10/2026" },
  { id: 3, category: "Kiến thức", title: "Vay mua nhà 2026: so sánh lãi suất các ngân hàng", date: "04/10/2026" },
  { id: 4, category: "Dự án", title: "Aurora Bay chính thức cất nóc tòa tháp thứ hai", date: "02/10/2026" },
];

const EXPERTS = [
  { name: "Nguyễn Minh Anh", role: "Chuyên gia pháp lý", avatar: "https://i.pravatar.cc/100?img=47" },
  { name: "Trần Quốc Huy", role: "Phân tích thị trường", avatar: "https://i.pravatar.cc/100?img=12" },
  { name: "Lê Thu Hà", role: "Tư vấn tài chính", avatar: "https://i.pravatar.cc/100?img=32" },
];

export default function NewsSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          badge="Tin tức & chuyên gia"
          title="Thông tin đáng tin, chuyên gia có thật"
          desc="Tin thị trường được kiểm chứng và lời khuyên từ những người làm nghề thật sự."
          action={
            <Link
              to="/news"
              className="flex w-fit items-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-700"
            >
              Xem tất cả <ArrowRight size={16} />
            </Link>
          }
        />

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Tin nổi bật */}
          <Reveal variant="left" className="h-full">
          <Link
            to={`/news/${FEATURED.id}`}
            className="group relative block h-full min-h-[420px] overflow-hidden rounded-3xl"
          >
            <img
              src={FEATURED.image}
              alt={FEATURED.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-6 md:p-8">
              <span className="rounded-full bg-primary-600 px-3 py-1 text-xs font-medium text-white">
                {FEATURED.category}
              </span>
              <h3 className="mt-4 text-2xl font-semibold leading-snug text-white md:text-3xl">
                {FEATURED.title}
              </h3>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-white/70">
                <Clock size={14} /> {FEATURED.date}
              </p>
            </div>
          </Link>
          </Reveal>

          {/* Cột phải */}
          <Reveal variant="right" delay={150}>
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-line p-6">
              <h3 className="font-semibold text-heading">Tin mới nhất</h3>
              <ul className="mt-4 divide-y divide-line">
                {NEWS.map((n) => (
                  <li key={n.id}>
                    <Link to={`/news/${n.id}`} className="group block py-4">
                      <span className="text-xs font-medium text-primary-600">{n.category}</span>
                      <p className="mt-1 text-sm font-medium text-heading group-hover:text-primary-600">
                        {n.title}
                      </p>
                      <p className="mt-1 text-xs text-body">{n.date}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-primary-50 p-6">
              <h3 className="font-semibold text-heading">Chuyên gia đồng hành</h3>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {EXPERTS.map((e) => (
                  <div key={e.name} className="text-center">
                    <img
                      src={e.avatar}
                      alt={e.name}
                      className="mx-auto h-14 w-14 rounded-full object-cover ring-2 ring-white"
                    />
                    <p className="mt-2 text-xs font-medium text-heading">{e.name}</p>
                    <p className="text-[11px] text-body">{e.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
