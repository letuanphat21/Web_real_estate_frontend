import { CheckCircle2, Lightbulb } from "lucide-react";

const TIPS = [
  { title: "Lượng hóa doanh số", text: "Ghi rõ con số: tỷ đồng, số căn đã chốt, tỷ lệ chuyển đổi." },
  { title: "Gọi tên dự án", text: "Nêu tên dự án và chủ đầu tư bạn từng phân phối." },
  { title: "Bổ sung chứng chỉ", text: "Chứng chỉ môi giới và khóa đào tạo tăng độ tin cậy." },
];

export default function CvTipsCard() {
  return (
    <section className="rounded-3xl border border-line bg-white p-5 shadow-sm" aria-labelledby="cv-tips-title">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
          <Lightbulb size={17} aria-hidden />
        </span>
        <div>
          <h2 id="cv-tips-title" className="text-sm font-semibold text-heading">
            Mẹo viết CV ngành BĐS
          </h2>
          <p className="text-xs text-muted">3 gợi ý để CV nổi bật hơn</p>
        </div>
      </div>
      <ul className="mt-4 space-y-3">
        {TIPS.map((t) => (
          <li key={t.title} className="flex items-start gap-2.5">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" aria-hidden />
            <div>
              <p className="text-sm font-medium text-heading">{t.title}</p>
              <p className="text-xs text-body">{t.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
