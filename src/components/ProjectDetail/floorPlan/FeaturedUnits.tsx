import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { STATUS } from "./floorPlanStatus";
import type { FEATURED } from "../../../data/projectDetail/floorPlan";

type Props = {
  featured: typeof FEATURED;
  base: string;
};

export default function FeaturedUnits({ featured, base }: Props) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase text-primary-600">
              Gợi ý theo lựa chọn của bạn
            </p>
            <h2 className="mt-2 text-4xl font-semibold text-heading">
              Các căn nổi bật cùng phân khu
            </h2>
            <p className="mt-2 text-sm text-body">
              Phối cảnh và nội thất tham khảo, đi kèm dữ liệu sản phẩm mới
              nhất.
            </p>
          </div>
          <Link
            to={`${base}/quy-can`}
            className="flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-6 py-3 text-sm font-medium text-heading hover:bg-primary-100"
          >
            Xem toàn bộ quỹ căn <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((f) => {
            const st = STATUS[f.status];
            return (
              <article
                key={f.code}
                className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm"
              >
                <img
                  src={f.image}
                  alt={f.code}
                  className="w-full object-cover"
                  style={{ height: 200 }}
                />
                <div className="p-5 pb-7">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-heading">
                      {f.code}
                    </h3>
                    <span
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium ${st.badge}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${st.dot}`}
                      />{" "}
                      {st.label}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-body">{f.spec}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xl font-bold text-primary-600">
                      {f.price}
                    </p>
                    <Link
                      to={`${base}/quy-can`}
                      className="flex items-center gap-1 text-xs font-medium text-heading"
                    >
                      Xem chi tiết <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
