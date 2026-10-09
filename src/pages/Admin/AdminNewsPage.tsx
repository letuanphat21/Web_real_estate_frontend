import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import AdminPageHeader from "../../components/Admin/AdminPageHeader";
import ConfirmDialog from "../../components/Admin/ConfirmDialog";
import Pagination from "../../components/common/Pagination";
import { useToast } from "../../components/common/toastContext";
import { getErrorMessage } from "../../api";
import { adminNewsService } from "../../services/news/adminNewsService";
import type { News } from "../../types/news.types";

const PAGE_SIZE = 8;
const btn =
  "flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-white transition hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-primary-600 active:scale-95";

type Load = { status: "loading" } | { status: "error" } | { status: "ready"; items: News[]; total: number; pages: number };

export default function AdminNewsPage() {
  const toast = useToast();
  const [load, setLoad] = useState<Load>({ status: "loading" });
  const [reload, setReload] = useState(0);
  const [input, setInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [deleting, setDeleting] = useState<News | null>(null);

  useEffect(() => {
    let cancelled = false;
    adminNewsService
      .search(keyword, page, PAGE_SIZE)
      .then((p) => !cancelled && setLoad({ status: "ready", items: p.content, total: p.totalElements, pages: p.totalPages }))
      .catch(() => !cancelled && setLoad({ status: "error" }));
    return () => {
      cancelled = true;
    };
  }, [keyword, page, reload]);

  const refresh = useCallback(() => {
    setLoad({ status: "loading" });
    setReload((n) => n + 1);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    setKeyword(input);
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    try {
      await adminNewsService.remove(deleting.id);
      toast.show(`Đã xóa tin "${deleting.title}"`);
      setDeleting(null);
      refresh();
    } catch (err) {
      toast.show(getErrorMessage(err), "error");
    }
  };

  return (
    <>
      <AdminPageHeader
        breadcrumb={[{ label: "Tổng quan", to: "/admin/dashboard" }, { label: "Quản lý tin tức" }]}
        title="Quản lý tin tức"
        desc="Tạo, chỉnh sửa và xóa các bài viết tin tức hiển thị trên website."
        action={
          <Link to="/admin/news/new" className="flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-200 transition hover:bg-primary-700 active:scale-95">
            <Plus size={16} /> Thêm tin tức
          </Link>
        }
      />

      <div className="-mt-16 px-4 pb-10 md:px-8">
        <section className="rounded-2xl border border-line bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-heading">Danh sách tin tức</h2>
              {load.status === "ready" && (
                <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-700">{load.total} bài</span>
              )}
            </div>
            <form onSubmit={submitSearch} className="flex items-center gap-2">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Tìm theo tiêu đề..."
                  aria-label="Tìm tin tức"
                  className="w-64 rounded-xl border border-line py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary-600"
                />
              </div>
              <button className="rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 active:scale-95">Tìm</button>
            </form>
          </div>

          <div className="mt-5">
            {load.status === "loading" ? (
              <div className="animate-pulse space-y-3" aria-busy="true" aria-label="Đang tải tin tức">
                {[0, 1, 2, 3].map((n) => <div key={n} className="h-14 rounded-xl bg-primary-50" />)}
              </div>
            ) : load.status === "error" ? (
              <div role="alert" className="rounded-2xl border border-dashed border-danger/30 bg-danger/5 px-6 py-12 text-center">
                <p className="font-semibold text-heading">Không tải được danh sách tin tức</p>
                <button onClick={refresh} className="mt-4 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-700 active:scale-95">Thử lại</button>
              </div>
            ) : load.items.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-primary-200 bg-primary-50/50 px-6 py-14 text-center text-body">Chưa có tin tức nào.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs uppercase text-muted">
                    <tr>
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Tiêu đề</th>
                      <th className="px-4 py-3">Chuyên mục</th>
                      <th className="px-4 py-3">Dự án</th>
                      <th className="px-4 py-3">Trạng thái</th>
                      <th className="px-4 py-3">Ngày tạo</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {load.items.map((n, i) => (
                      <tr key={n.id} className="border-t border-line transition hover:bg-primary-50">
                        <td className="px-4 py-3 text-body">{String(page * PAGE_SIZE + i + 1).padStart(2, "0")}</td>
                        <td className="max-w-[320px] px-4 py-3">
                          <p className="truncate font-semibold text-footer" title={n.title}>{n.title}</p>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-body">{n.category?.name ?? "—"}</td>
                        <td className="max-w-[180px] truncate px-4 py-3 text-body">{n.project?.name ?? "—"}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${n.active ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                            {n.active ? "Hiển thị" : "Ẩn"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-body">{new Date(n.createdAt).toLocaleDateString("vi-VN")}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5">
                            <Link to={`/admin/news/${n.id}/edit`} aria-label={`Sửa ${n.title}`} title="Sửa" className={`${btn} text-accent`}>
                              <Pencil size={15} />
                            </Link>
                            <button onClick={() => setDeleting(n)} aria-label={`Xóa ${n.title}`} title="Xóa" className={`${btn} text-danger`}>
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {load.status === "ready" && load.pages > 1 && (
            <div className="mt-2 flex justify-end border-t border-line pt-4">
              <Pagination page={page} totalPages={load.pages} onChange={setPage} />
            </div>
          )}
        </section>
      </div>

      {deleting && (
        <ConfirmDialog
          title="Xóa tin tức?"
          message="Bạn có chắc chắn muốn xóa bài viết này không? Hành động này không thể hoàn tác."
          onConfirm={confirmDelete}
          onClose={() => setDeleting(null)}
        />
      )}
    </>
  );
}
