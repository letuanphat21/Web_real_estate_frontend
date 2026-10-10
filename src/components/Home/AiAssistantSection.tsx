import { Link } from "react-router-dom";
import { Check, Sparkles, Send, MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "../common/Reveal";
import { GHOST_BUTTON, GOLD_BUTTON } from "./homeStyles";

const FEATURES = [
  "Gợi ý căn phù hợp theo ngân sách và nhu cầu",
  "Phân tích pháp lý, tiến độ và lịch sử giá",
  "Trả lời 24/7, không cần chờ môi giới",
];

export default function AiAssistantSection() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-20">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gold-400/10 blur-3xl"
      />
      <div className="container relative mx-auto grid items-center gap-12 px-4 lg:grid-cols-2 lg:px-8">
        <Reveal variant="left">
        <div>
          <SectionHeading
            badge="NovaAI"
            title={
              <>
                Một cuộc trò chuyện. <em>Mọi quyết định sáng rõ hơn.</em>
              </>
            }
            desc="Hỏi bằng ngôn ngữ tự nhiên, NovaAI tổng hợp dữ liệu thị trường và đưa ra gợi ý trong vài giây."
          />

          <ul className="-mt-4 space-y-3">
            {FEATURES.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 text-sm text-white/80"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold-300/50 text-gold-200">
                  <Check size={12} strokeWidth={3} />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/nova-ai" className={GOLD_BUTTON}>
              <Sparkles size={16} /> Trò chuyện ngay
            </Link>
            <Link to="/nova-ai" className={GHOST_BUTTON}>
              Tìm hiểu thêm
            </Link>
          </div>
        </div>
        </Reveal>

        {/* Khung chat mô phỏng */}
        <Reveal variant="right">
        <div className="rounded-3xl border border-white/10 bg-ink-950/70 p-5 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-300 text-gold-950">
              <Sparkles size={16} />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">NovaAI</p>
              <p className="flex items-center gap-1 text-xs text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> Đang
                trực tuyến
              </p>
            </div>
          </div>

          <div className="space-y-4 py-5">
            <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-gold-300 px-4 py-3 text-sm text-gold-950">
              Tìm căn 2 phòng ngủ dưới 6 tỷ gần trung tâm, ưu tiên đã có sổ.
            </div>

            <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-white/[0.06] px-4 py-3 text-sm text-white/85">
              Mình tìm được <b className="text-gold-200">12 căn</b> phù hợp. Đây là lựa chọn có giá tốt
              nhất so với khu vực:
            </div>

            <div className="flex max-w-[85%] gap-3 rounded-2xl border border-white/10 p-3">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&q=80"
                alt=""
                className="h-16 w-16 rounded-xl object-cover"
              />
              <div className="text-sm">
                <p className="font-medium text-white">The Lumen Riverside</p>
                <p className="flex items-center gap-1 text-xs text-white/55">
                  <MapPin size={12} /> Thủ Đức
                </p>
                <p className="mt-1 font-semibold text-gold-200">
                  5,2 tỷ · 72 m²
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-4 pr-1.5 focus-within:border-gold-300/50">
            <input
              placeholder="Hỏi NovaAI bất cứ điều gì..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
            />
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-300 text-gold-950 transition hover:bg-gold-200">
              <Send size={15} />
            </button>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
