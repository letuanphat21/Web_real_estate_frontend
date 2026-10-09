import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminPageHeader from "../../components/Admin/AdminPageHeader";
import { useToast } from "../../components/common/toastContext";
import { getErrorMessage } from "../../api";
import { adminNewsService, type NewsInput } from "../../services/news/adminNewsService";
import newsService from "../../services/news/newsService";
import type { NewsCategory } from "../../types/news.types";

const EMPTY: NewsInput = { title: "", content: "", categoryId: 0, projectId: null, active: true };
const field = "mt-1.5 w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none focus:border-primary-600";

export default function AdminNewsFormPage() {
  const { id } = useParams();
  const editId = id ? Number(id) : null;
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState<NewsInput>(EMPTY);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [loading, setLoading] = useState(editId !== null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    newsService.getCategories().then(setCategories).catch(() => toast.show("Không tải được chuyên mục", "error"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (editId === null) return;
    adminNewsService
      .get(editId)
      .then((n) =>
        setForm({ title: n.title, content: n.content, categoryId: n.category?.id ?? 0, projectId: n.project?.id ?? null, active: n.active }),
      )
      .catch((err) => {
        toast.show(getErrorMessage(err), "error");
        navigate("/admin/news");
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim() || !form.categoryId) {
      toast.show("Vui lòng nhập tiêu đề, nội dung và chọn chuyên mục", "error");
      return;
    }
    setSaving(true);
    try {
      if (editId === null) await adminNewsService.add(form);
      else await adminNewsService.edit(editId, form);
      toast.show(editId === null ? "Đã thêm tin tức" : "Đã cập nhật tin tức");
      navigate("/admin/news");
    } catch (err) {
      toast.show(getErrorMessage(err), "error");
    } finally {
      setSaving(false);
    }
  };

  const title = editId === null ? "Thêm tin tức" : "Sửa tin tức";

  return (
    <>
      <AdminPageHeader
        breadcrumb={[{ label: "Tổng quan", to: "/admin/dashboard" }, { label: "Quản lý tin tức", to: "/admin/news" }, { label: title }]}
        title={title}
      />
      <div className="-mt-16 px-4 pb-10 md:px-8">
        <form onSubmit={submit} className="space-y-5 rounded-2xl border border-line bg-white p-6 shadow-sm" aria-busy={loading}>
          <label className="block text-sm font-semibold text-heading">
            Tiêu đề
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={field} disabled={loading} />
          </label>
          <label className="block text-sm font-semibold text-heading">
            Chuyên mục
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
              className={field}
              disabled={loading}
            >
              <option value={0}>— Chọn chuyên mục —</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <label className="block text-sm font-semibold text-heading">
            Nội dung
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={12} className={field} disabled={loading} />
          </label>
          <label className="flex items-center gap-2 text-sm text-heading">
            <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
            Hiển thị trên website
          </label>
          <div className="flex justify-end gap-3 border-t border-line pt-4">
            <button type="button" onClick={() => navigate("/admin/news")} className="rounded-lg border border-line px-5 py-2.5 text-sm font-semibold text-footer transition hover:bg-primary-50">Hủy</button>
            <button disabled={saving || loading} className="rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 active:scale-95 disabled:opacity-60">
              {saving ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
