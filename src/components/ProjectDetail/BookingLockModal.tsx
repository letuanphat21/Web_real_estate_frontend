import { useEffect, useState } from "react";
import { ShieldCheck, Lock, Timer, CircleCheck } from "lucide-react";

const LOCK_SECONDS = 15 * 60;

export type BookingUnit = {
  code: string;
  image: string;
  statusLabel: string;
  location: string; // Tòa A1 · Tầng 12
  spec: string; // 3 PN · 2 WC · 92,6 m²
  direction: string;
  price: string;
};

type Props = {
  unit: BookingUnit;
  onClose: () => void;
  onConfirm?: (unit: BookingUnit) => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function BookingLockModal({ unit, onClose, onConfirm }: Props) {
  // TODO: thời gian lock thực tế do backend trả về khi tạo booking
  const [remaining, setRemaining] = useState(LOCK_SECONDS - 5 * 60 - 18);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (confirmed) return;
    const t = setInterval(() => setRemaining((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [confirmed]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const expired = remaining === 0;
  const progress = (remaining / LOCK_SECONDS) * 100;

  const handleConfirm = () => {
    setConfirmed(true);
    onConfirm?.(unit);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-footer/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[666px] rounded-3xl bg-white p-6 shadow-2xl"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-[10px] font-semibold uppercase text-success">
          <ShieldCheck size={12} /> Kết nối bảo mật · SSL
        </span>
        <h2 id="booking-title" className="mt-3 text-2xl font-semibold text-heading">
          Booking Lock · Giữ chỗ căn {unit.code}
        </h2>
        <p className="mt-1.5 text-xs text-body">
          Hoàn tất thông tin để khóa tạm căn trong thời gian xác nhận với chuyên viên.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-[259px_1fr]">
          <div>
            <img src={unit.image} alt={unit.code} className="w-full rounded-2xl object-cover" style={{ height: 156 }} />
            <div className="mt-3 rounded-2xl bg-gradient-to-br from-footer to-primary-700 p-4 text-white">
              <div className="flex items-center justify-between text-[11px] text-white/80">
                {confirmed ? "Căn đã được giữ chỗ" : expired ? "Phiên giữ chỗ đã hết hạn" : "Thời gian lock còn lại"}
                <Timer size={15} />
              </div>
              <p className="mt-1 text-4xl font-medium tabular-nums">
                {pad(Math.floor(remaining / 60))} : {pad(remaining % 60)}
              </p>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/20">
                <div className="h-full rounded-full bg-primary-300 transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="rounded-2xl bg-primary-50 p-5">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-heading">{unit.code}</p>
                <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" /> {unit.statusLabel}
                </span>
              </div>
              <div className="mt-3 space-y-1 text-[11px] text-body">
                <p>{unit.location}</p>
                <p>{unit.spec}</p>
                <p>{unit.direction}</p>
              </div>
              <dl className="mt-4 space-y-3 border-t border-line pt-4 text-xs">
                <div className="flex items-center justify-between">
                  <dt className="text-body">Giá dự kiến</dt>
                  <dd className="text-xl font-medium text-primary-600">{unit.price}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-auto flex gap-3 pt-5">
              <button
                onClick={onClose}
                className="flex-1 rounded-full border border-primary-200 bg-white py-3.5 text-sm font-medium text-heading hover:bg-primary-50"
              >
                {confirmed ? "Đóng" : "Hủy"}
              </button>
              <button
                onClick={handleConfirm}
                disabled={expired || confirmed}
                className="flex flex-[1.4] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 py-3.5 text-sm font-semibold text-white hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {confirmed ? <CircleCheck size={15} /> : <Lock size={15} />}
                {confirmed ? "Đã giữ chỗ" : "Xác nhận giữ chỗ"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
