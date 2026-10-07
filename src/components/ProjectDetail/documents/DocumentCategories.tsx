import type { CATEGORIES } from "../../../data/projectDetail/documents";

type Props = {
  base: string;
  categories: typeof CATEGORIES;
};

export default function DocumentCategories({ base, categories }: Props) {
  return (
    <section className="bg-primary-50/70 py-14">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-xs font-semibold uppercase text-primary-600">Kho tài liệu dự án</p>
        <h2 className="mt-2 text-4xl font-semibold text-heading">Mọi tài liệu cần thiết, trong một không gian</h2>
        <p className="mt-2 text-sm text-body">Danh mục được chuẩn hóa để đội ngũ kinh doanh, đối tác và khách hàng tra cứu nhanh phiên bản mới nhất.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ icon: Icon, title, desc }, i) => (
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
  );
}
