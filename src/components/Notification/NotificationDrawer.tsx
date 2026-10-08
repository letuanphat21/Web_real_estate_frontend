import { useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import NotificationTabs from "./NotificationTabs";
import NotificationFeed from "./NotificationFeed";
import MarkAllReadButton from "./MarkAllReadButton";
import useNotifications from "./useNotifications";
import useFocusTrap from "../common/useFocusTrap";

/**
 * Ngăn kéo "Thông báo" mở từ chuông ở Header. Chỉ giao diện: dữ liệu mẫu, trạng thái đã đọc giữ trong state.
 * TODO: lấy thông báo và đồng bộ "đã đọc" qua API.
 */
export default function NotificationDrawer({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, true, onClose);

  const { tab, setTab, unreadCounts, visible, markRead, markAllRead } = useNotifications();

  // render ra <body> để không bị giới hạn bởi Header (sticky) chứa nút chuông
  return createPortal(
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-heading/40" onClick={onClose} aria-hidden />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="notification-title"
        tabIndex={-1}
        className="absolute inset-y-0 right-0 flex w-full max-w-[560px] flex-col bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="notification-title" className="text-xl font-bold text-footer">
            Thông báo
          </h2>
          <div className="flex items-center gap-4">
            <MarkAllReadButton unread={unreadCounts.ALL} onClick={markAllRead} />
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng thông báo"
              className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-heading"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        <NotificationTabs value={tab} unreadCounts={unreadCounts} onChange={setTab} />

        <div className="flex-1 overflow-y-auto px-5 pb-6 pt-1">
          <NotificationFeed
            items={visible}
            onView={(id) => {
              markRead(id);
              onClose();
            }}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
