import Breadcrumb from "../../components/common/Breadcrumb";
import MarkAllReadButton from "../../components/Notification/MarkAllReadButton";
import NotificationFeed from "../../components/Notification/NotificationFeed";
import NotificationTabs from "../../components/Notification/NotificationTabs";
import useNotifications from "../../components/Notification/useNotifications";

const TITLE = "Thông báo | NovaLand Hub";

/**
 * Trang "Thông báo" trong khu vực tài khoản (dùng chung giao diện với ngăn kéo ở Header).
 * UI tạm thời trên dữ liệu mẫu. TODO: nối API thông báo.
 */
export default function NotificationsPage() {
  const { tab, setTab, unreadCounts, visible, markRead, markAllRead } = useNotifications();

  return (
    <>
      <title>{TITLE}</title>
      <meta name="robots" content="noindex" />

      <Breadcrumb items={[{ label: "Tài khoản", to: "/account" }, { label: "Thông báo" }]} />

      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-heading md:text-4xl">Thông báo</h1>
          <p className="mt-2 text-sm text-body">Cập nhật mới nhất về dự án, đơn hàng và cơ chế hoa hồng.</p>
        </div>
        <MarkAllReadButton unread={unreadCounts.ALL} onClick={markAllRead} />
      </div>

      <section className="mt-5 overflow-hidden rounded-3xl border border-line bg-white shadow-sm" aria-label="Danh sách thông báo">
        <NotificationTabs value={tab} unreadCounts={unreadCounts} onChange={setTab} />
        <div className="px-5 pb-6 pt-1">
          <NotificationFeed items={visible} onView={markRead} />
        </div>
      </section>
    </>
  );
}
