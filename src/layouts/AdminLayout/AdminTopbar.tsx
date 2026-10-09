import { Search, HelpCircle, Bell, ChevronDown, Menu } from "lucide-react";
import { selectCurrentUser, useAppSelector } from "../../store";

const initials = (name: string) =>
  name.trim().split(/\s+/).slice(-2).map((w) => w[0]?.toUpperCase()).join("");

export default function AdminTopbar({ onMenu }: { onMenu: () => void }) {
  const user = useAppSelector(selectCurrentUser);
  const name = user?.fullName ?? "Quản trị viên";

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center gap-4 border-b border-line bg-white px-4 md:px-8">
      <button onClick={onMenu} aria-label="Mở menu" className="rounded-full p-2 text-heading hover:bg-primary-50 lg:hidden">
        <Menu size={22} />
      </button>

      <label className="flex h-11 max-w-lg flex-1 items-center gap-3 rounded-full border border-primary-100 bg-primary-50/60 px-5 transition focus-within:border-primary-300 focus-within:ring-4 focus-within:ring-primary-100">
        <Search size={16} className="text-muted" />
        <input placeholder="Tìm kiếm dự án, khu vực..." aria-label="Tìm kiếm" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted" />
        
      </label>

      <div className="ml-auto flex items-center gap-3">
        <button aria-label="Trợ giúp" className="hidden h-10 w-10 items-center justify-center rounded-full text-heading transition hover:bg-primary-50 sm:flex">
          <HelpCircle size={20} />
        </button>
        <button aria-label="Thông báo" className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-heading transition hover:bg-primary-50">
          <Bell size={18} />
        </button>
        <div className="flex items-center gap-3 border-l border-line pl-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">{initials(name)}</span>
          <div className="hidden text-left leading-tight md:block">
            <p className="text-sm font-medium text-heading">{name}</p>
            <p className="text-[11px] text-body">Quản trị viên</p>
          </div>
          <ChevronDown size={14} className="hidden text-body md:block" />
        </div>
      </div>
    </header>
  );
}
