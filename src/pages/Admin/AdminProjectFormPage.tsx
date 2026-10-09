import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminPageHeader from "../../components/Admin/AdminPageHeader";
import ProjectForm from "../../components/Admin/projects/ProjectForm";
import { useToast } from "../../components/common/toastContext";
import { useAdminProject } from "../../hooks/useAdminProject";
import { adminProjectService } from "../../services/adminProjectService";
import type { AdminProjectInput } from "../../types/admin.types";

const crumb = [{ label: "Tổng quan", to: "/admin/dashboard" }, { label: "Dự án", to: "/admin/projects" }];

// Trang Tạo (/admin/projects/new) và Sửa (/admin/projects/:id/edit) dùng chung một form
export default function AdminProjectFormPage() {
  const { id } = useParams();
  const editing = id !== undefined;
  const projectId = Number(id);
  const navigate = useNavigate();
  const toast = useToast();
  const state = useAdminProject(editing && Number.isFinite(projectId) ? projectId : undefined);
  const [dirty, setDirty] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (editing && state.status === "loading") {
    return <div className="animate-pulse px-4 py-10 md:px-8" aria-busy="true"><div className="h-32 rounded-2xl bg-primary-100" /><div className="mt-6 h-96 rounded-2xl bg-primary-50" /></div>;
  }
  if (editing && state.status === "error") {
    return (
      <div className="px-4 py-24 text-center" role="alert">
        <p className="text-xl font-semibold text-heading">Không tìm thấy dự án</p>
        <Link to="/admin/projects" className="mt-6 inline-block rounded-full bg-primary-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-primary-700">Về danh sách dự án</Link>
      </div>
    );
  }

  const initial = editing && state.status === "ready" ? state.project : undefined;
  const back = initial ? `/admin/projects/${initial.id}` : "/admin/projects";

  const submit = async (input: AdminProjectInput) => {
    setSubmitting(true);
    try {
      const saved = initial ? await adminProjectService.update(initial.id, input) : await adminProjectService.create(input);
      toast.show(initial ? "Đã lưu thay đổi" : "Đã tạo dự án mới");
      navigate(`/admin/projects/${saved.id}`);
    } catch (e) {
      toast.show(e instanceof Error ? e.message : "Không lưu được dự án", "error");
      setSubmitting(false);
    }
  };

  return (
    <>
      <AdminPageHeader
        breadcrumb={[...crumb, { label: initial ? "Sửa dự án" : "Tạo dự án" }]}
        title={initial ? "Sửa dự án" : "Tạo dự án"}
        desc={initial ? `Cập nhật thông tin đã xác định của dự án ${initial.name}.` : "Nhập thông tin để tạo dự án mới trong hệ thống."}
      >
        {dirty && (
          <p role="status" className="mt-4 flex items-center gap-2 rounded-lg border border-warning/40 bg-amber-100 px-4 py-2.5 text-xs font-semibold text-warning">
            <span className="h-2 w-2 rounded-full bg-warning" /> Có thay đổi chưa lưu
          </p>
        )}
      </AdminPageHeader>

      <div className="-mt-16 px-4 pb-10 md:px-8">
        <ProjectForm initial={initial} submitting={submitting} onSubmit={submit} onCancel={() => navigate(back)} onDirtyChange={setDirty} />
      </div>
    </>
  );
}
