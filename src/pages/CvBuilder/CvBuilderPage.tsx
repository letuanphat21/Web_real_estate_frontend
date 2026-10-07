import { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { Eye, X } from "lucide-react";
import Breadcrumb from "../../components/common/Breadcrumb";
import ToastProvider from "../../components/common/Toast";
import CvSectionNav from "../../components/CvBuilder/CvSectionNav";
import CvStepForm from "../../components/CvBuilder/CvStepForm";
import CvPreviewPanel from "../../components/CvBuilder/CvPreviewPanel";
import PersonalInfoForm from "../../components/CvBuilder/forms/PersonalInfoForm";
import ObjectiveForm from "../../components/CvBuilder/forms/ObjectiveForm";
import ExperienceForm from "../../components/CvBuilder/forms/ExperienceForm";
import EducationForm from "../../components/CvBuilder/forms/EducationForm";
import SkillsForm from "../../components/CvBuilder/forms/SkillsForm";
import ProjectsForm from "../../components/CvBuilder/forms/ProjectsForm";
import CertificatesForm from "../../components/CvBuilder/forms/CertificatesForm";
import LanguagesForm from "../../components/CvBuilder/forms/LanguagesForm";
import ReferencesForm from "../../components/CvBuilder/forms/ReferencesForm";
import CustomSectionForm from "../../components/CvBuilder/forms/CustomSectionForm";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useToast } from "../../hooks/useToast";
import { useAuthStore } from "../../store/authStore";
import { useCvStore } from "../../store/cvStore";
import { CV_STEPS, uid, type CvStepId } from "../../types/cv.types";

const TITLE = "Tạo CV bất động sản | NovaLand Hub";
const AUTOSAVE_MS = 1500;

const STEP_FORMS: Record<CvStepId, (p: { onNext: () => void }) => ReactNode> = {
  personal: (p) => <PersonalInfoForm {...p} />,
  objective: (p) => <ObjectiveForm {...p} />,
  experience: (p) => <ExperienceForm {...p} />,
  education: (p) => <EducationForm {...p} />,
  skills: (p) => <SkillsForm {...p} />,
  projects: (p) => <ProjectsForm {...p} />,
  certificates: (p) => <CertificatesForm {...p} />,
  languages: (p) => <LanguagesForm {...p} />,
  references: (p) => <ReferencesForm {...p} />,
};

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });

function CvBuilder() {
  const toast = useToast();
  const [params, setParams] = useSearchParams();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [ready, setReady] = useState(false);

  const customSections = useCvStore((s) => s.data.customSections);
  const dirty = useCvStore((s) => s.dirty);
  const savedAt = useCvStore((s) => s.savedAt);
  const save = useCvStore((s) => s.save);
  const addCustomSection = useCvStore((s) => s.addCustomSection);

  // Bảo vệ trang: chưa có auth thật nên đăng nhập mock rồi điền sẵn từ tài khoản
  useEffect(() => {
    let off = false;
    (async () => {
      const auth = useAuthStore.getState();
      if (!auth.user) await auth.signInMock();
      const u = useAuthStore.getState().user;
      if (u && !off) {
        useCvStore.getState().prefillPersonal({
          fullName: u.fullName,
          title: u.title,
          email: u.email,
          phone: u.phone,
          avatarUrl: u.avatarUrl,
        });
        setReady(true);
      }
    })();
    return () => {
      off = true;
    };
  }, []);

  // Tự động lưu (debounce), cảnh báo khi đóng tab lúc chưa lưu, lưu nốt khi rời trang
  const data = useCvStore((s) => s.data);
  const style = useCvStore((s) => s.style);
  useEffect(() => {
    if (!dirty) return;
    const t = setTimeout(() => useCvStore.getState().save(), AUTOSAVE_MS);
    return () => clearTimeout(t);
  }, [data, style, dirty]);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (useCvStore.getState().dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => {
      window.removeEventListener("beforeunload", warn);
      if (useCvStore.getState().dirty) useCvStore.getState().save();
    };
  }, []);

  const order = [...CV_STEPS.map((s) => s.id as string), ...customSections.map((c) => `custom:${c.id}`)];
  const requested = params.get("buoc") ?? "personal";
  const activeId = order.includes(requested) ? requested : "personal";
  const index = order.indexOf(activeId);

  const goTo = (id: string) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("buoc", id);
        return next;
      },
      { replace: true }
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveDraft = () => {
    if (save()) toast.show("Đã lưu bản nháp");
    else toast.show("Không thể lưu bản nháp trên trình duyệt này", "error");
  };

  const handleNext = () => {
    save();
    if (index < order.length - 1) goTo(order[index + 1]);
    else toast.show("Đã hoàn tất! CV của bạn sẵn sàng để tải PDF");
  };

  const handleAddCustom = () => {
    const id = uid();
    addCustomSection(id);
    goTo(`custom:${id}`);
  };

  const step = CV_STEPS.find((s) => s.id === activeId);
  const custom = customSections.find((c) => `custom:${c.id}` === activeId);

  const form = !ready ? (
    <div className="h-96 animate-pulse rounded-3xl bg-white" aria-busy="true" />
  ) : (
    <CvStepForm
      key={activeId}
      stepLabel={`BƯỚC ${index + 1} / ${order.length}`}
      title={step?.title ?? custom?.title ?? "Mục tùy chỉnh"}
      description={step?.description ?? "Mục tự do: đặt tiêu đề và nội dung riêng cho CV của bạn."}
      isLast={index === order.length - 1}
      onSaveDraft={handleSaveDraft}
    >
      {step ? (
        STEP_FORMS[step.id]({ onNext: handleNext })
      ) : custom ? (
        <CustomSectionForm
          key={custom.id}
          sectionId={custom.id}
          onNext={handleNext}
          onRemoved={() => goTo("personal")}
        />
      ) : null}
    </CvStepForm>
  );

  return (
    <>
      <title>{TITLE}</title>
      <meta name="robots" content="noindex" />

      <div className="container mx-auto px-4 pb-10 pt-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Breadcrumb
            items={[
              { label: "Tuyển dụng", to: "/tuyen-dung" },
              { label: "Tạo CV" },
            ]}
          />
          <p className="text-xs text-muted" aria-live="polite">
            {dirty ? "Đang lưu…" : savedAt ? `Đã lưu lúc ${formatTime(savedAt)}` : ""}
          </p>
        </div>

        <h1 className="sr-only">Tạo CV bất động sản</h1>

        <div className="mt-4 grid grid-cols-1 items-start gap-5 lg:grid-cols-2 xl:grid-cols-[240px_minmax(340px,0.8fr)_minmax(0,1.6fr)]">
          <div className="min-w-0 lg:col-span-2 xl:col-span-1">
            <CvSectionNav activeId={activeId} onSelect={goTo} onAddCustom={handleAddCustom} />
          </div>

          <div className="min-w-0">
            {!isDesktop && (
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="mb-4 flex h-11 w-full items-center justify-center gap-2 rounded-full border border-primary-300 bg-white text-sm font-medium text-primary-600"
              >
                <Eye size={16} aria-hidden /> Xem CV
              </button>
            )}
            {form}
          </div>

          {isDesktop && ready && <CvPreviewPanel expandTemplates={params.get("focus") === "templates"} />}
        </div>
      </div>

      {!isDesktop && previewOpen && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-50" role="dialog" aria-modal="true" aria-label="Xem trước CV">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-white px-4 py-3">
            <p className="font-medium text-heading">Xem CV</p>
            <button type="button" onClick={() => setPreviewOpen(false)} aria-label="Đóng" className="rounded-full p-1.5 text-body hover:bg-primary-50">
              <X size={20} />
            </button>
          </div>
          <div className="p-4">
            <CvPreviewPanel />
          </div>
        </div>
      )}
    </>
  );
}

export default function CvBuilderPage() {
  return (
    <ToastProvider>
      <CvBuilder />
    </ToastProvider>
  );
}
