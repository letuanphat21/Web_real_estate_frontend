import { ShieldCheck, Timer, Building2, Users } from "lucide-react";
import { useCountUp } from "../../hooks/useCountUp";
import Reveal from "../common/Reveal";

// TODO: thay bằng dữ liệu gọi từ API
const STATS = [
  { icon: ShieldCheck, end: 100, suffix: "%", label: "Dữ liệu dự án đã xác thực" },
  { icon: Timer, end: 5, suffix: " phút", label: "Chủ đầu tư cập nhật quỹ căn" },
  { icon: Building2, end: 320, suffix: "+", label: "Dự án trên toàn quốc" },
  { icon: Users, end: 12000, suffix: "+", label: "Chuyên gia & môi giới" },
];

function Stat({ icon: Icon, end, suffix, label }: (typeof STATS)[number]) {
  const { ref, value } = useCountUp(end);
  return (
    <div className="group flex items-center gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-primary-300 transition duration-300 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white">
        <Icon size={20} />
      </span>
      <div>
        <p className="text-2xl font-semibold text-white md:text-3xl">
          <span ref={ref}>{value.toLocaleString("vi-VN")}</span>
          {suffix}
        </p>
        <p className="text-xs text-white/60 md:text-sm">{label}</p>
      </div>
    </div>
  );
}

export default function StatsBand() {
  return (
    <section className="bg-gradient-to-r from-footer via-primary-700 to-footer py-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <Stat {...s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
