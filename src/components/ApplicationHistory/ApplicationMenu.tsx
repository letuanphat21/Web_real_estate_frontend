import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, MoreHorizontal, Undo2 } from "lucide-react";

/** Menu "..." của thẻ hồ sơ: xem tin và (nếu còn được phép) rút hồ sơ */
export default function ApplicationMenu({
  jobPath,
  jobTitle,
  onWithdraw,
}: {
  jobPath: string;
  jobTitle: string;
  onWithdraw?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Tùy chọn cho hồ sơ ${jobTitle}`}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-gray-500 transition hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-primary-600"
      >
        <MoreHorizontal size={16} />
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-10 z-20 w-48 rounded-xl border border-line bg-white p-1 shadow-xl">
          <Link
            role="menuitem"
            to={jobPath}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-heading hover:bg-primary-50"
          >
            <ExternalLink size={14} aria-hidden /> Xem tin tuyển dụng
          </Link>
          {onWithdraw && (
            <button
              role="menuitem"
              type="button"
              onClick={() => {
                setOpen(false);
                onWithdraw();
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50"
            >
              <Undo2 size={14} aria-hidden /> Rút hồ sơ
            </button>
          )}
        </div>
      )}
    </div>
  );
}
