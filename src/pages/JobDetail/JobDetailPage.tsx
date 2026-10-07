import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Breadcrumb from "../../components/common/Breadcrumb";
import ToastProvider from "../../components/common/Toast";
import JobDetailHero from "../../components/JobDetail/JobDetailHero";
import JobDescription from "../../components/JobDetail/JobDescription";
import JobGeneralInfo from "../../components/JobDetail/JobGeneralInfo";
import SimilarJobs from "../../components/JobDetail/SimilarJobs";
import ApplySummaryCard from "../../components/JobDetail/ApplySummaryCard";
import JobOwnerCard from "../../components/JobDetail/JobOwnerCard";
import CreateCvPromo from "../../components/JobDetail/CreateCvPromo";
import MobileApplyBar from "../../components/JobDetail/MobileApplyBar";
import JobDetailSkeleton from "../../components/JobDetail/JobDetailSkeleton";
import JobNotFound from "../../components/JobDetail/JobNotFound";
import ApplyModal from "../../components/JobDetail/ApplyModal/ApplyModal";
import useApplyFlow from "../../hooks/useApplyFlow";
import useSavedJobs from "../../hooks/useSavedJobs";
import { useToast } from "../../hooks/useToast";
import applicationService from "../../services/applicationService";
import jobService from "../../services/jobService";
import { isApiError } from "../../services/apiError";
import { useAuthStore } from "../../store/authStore";
import type { Cv, Job } from "../../types/job.types";
import { buildJobPath, getJobAvailability, htmlToText, parseJobId } from "../../utils/jobHelpers";

const SITE = "NovaLand Hub";

const EMPLOYMENT_TYPE: Record<string, string> = {
  "Toàn thời gian": "FULL_TIME",
  "Bán thời gian": "PART_TIME",
  "Cộng tác viên": "CONTRACTOR",
};

/** JSON-LD JobPosting cho Google for Jobs */
function buildJsonLd(job: Job, url: string) {
  const hasSalary = !job.salaryNegotiable && (job.salaryMin || job.salaryMax);
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.publishedAt,
    validThrough: job.deadline,
    employmentType: EMPLOYMENT_TYPE[job.jobType.name] ?? "OTHER",
    directApply: true,
    url,
    hiringOrganization: { "@type": "Organization", name: SITE },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: job.location, addressCountry: "VN" },
    },
    ...(hasSalary && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: job.currency,
        value: {
          "@type": "QuantitativeValue",
          // lương lưu theo triệu đồng khi VND
          ...(job.salaryMin && { minValue: job.currency === "VND" ? job.salaryMin * 1_000_000 : job.salaryMin }),
          ...(job.salaryMax && { maxValue: job.currency === "VND" ? job.salaryMax * 1_000_000 : job.salaryMax }),
          unitText: "MONTH",
        },
      },
    }),
  };
}

type LoadState = { id: number; job: Job | null; notFound: boolean } | null;

function JobDetail() {
  const { slugId } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const toast = useToast();
  const user = useAuthStore((s) => s.user);
  const { savedIds, toggle } = useSavedJobs();

  const id = parseJobId(slugId);
  const [state, setState] = useState<LoadState>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const requestKey = `${id}:${reloadKey}`;
  const [loadedKey, setLoadedKey] = useState("");
  const loading = id !== null && loadedKey !== requestKey;

  const [cvs, setCvs] = useState<Cv[] | null>(null);
  const [cvsLoading, setCvsLoading] = useState(false);

  const job = state?.id === id ? state?.job ?? null : null;
  const flow = useApplyFlow(job);

  // Chưa có auth thật: tự đăng nhập mock (thêm ?guest=1 để xem luồng chưa đăng nhập)
  const guest = params.get("guest") === "1";
  useEffect(() => {
    if (!guest && !useAuthStore.getState().user) useAuthStore.getState().signInMock();
  }, [guest]);

  useEffect(() => {
    if (id === null) return;
    let off = false;
    jobService
      .getJobById(id)
      .then((j) => !off && setState({ id, job: j, notFound: false }))
      .catch((e) => {
        if (off) return;
        if (isApiError(e) && e.status === 404) setState({ id, job: null, notFound: true });
        else setState({ id, job: null, notFound: false });
      })
      .finally(() => !off && setLoadedKey(requestKey));
    return () => {
      off = true;
    };
  }, [id, requestKey]);

  // URL chuẩn: /tuyen-dung/<slug>-<id>; sai slug hoặc chỉ có id thì chuyển về dạng chuẩn
  useEffect(() => {
    if (!job) return;
    const canonical = buildJobPath(job);
    if (window.location.pathname !== canonical) navigate(canonical + window.location.search, { replace: true });
  }, [job, navigate]);

  const userId = user?.id;
  useEffect(() => {
    if (userId === undefined) return;
    let off = false;
    Promise.resolve().then(() => !off && setCvsLoading(true));
    applicationService
      .getMyCvs()
      .then((list) => !off && setCvs(list))
      .catch(() => !off && setCvs([]))
      .finally(() => !off && setCvsLoading(false));
    return () => {
      off = true;
    };
  }, [userId]);

  const jsonLd = useMemo(
    () => (job ? JSON.stringify(buildJsonLd(job, window.location.origin + buildJobPath(job))) : ""),
    [job]
  );

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: job?.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.show("Đã sao chép liên kết");
    } catch (e) {
      if ((e as Error).name !== "AbortError") toast.show("Không thể chia sẻ liên kết", "error");
    }
  };

  const handleToggleSave = (jobId: number) => {
    const wasSaved = savedIds.includes(jobId);
    toggle(jobId);
    toast.show(wasSaved ? "Đã bỏ lưu tin" : "Đã lưu tin");
  };

  const title = job ? `${job.title} | Tuyển dụng ${SITE}` : `Việc làm | Tuyển dụng ${SITE}`;
  const description = job ? htmlToText(job.description) : "";

  let body;
  if (id === null || state?.notFound) {
    body = <JobNotFound />;
  } else if (loading) {
    body = <JobDetailSkeleton />;
  } else if (!job) {
    body = <JobNotFound error onRetry={() => setReloadKey((k) => k + 1)} />;
  } else {
    const saved = savedIds.includes(job.id);
    const availability = getJobAvailability(job);
    body = (
      <>
        <JobDetailHero
          job={job}
          flow={flow}
          saved={saved}
          onToggleSave={() => handleToggleSave(job.id)}
          onShare={handleShare}
        />

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="min-w-0 space-y-6">
            <JobDescription html={job.description} />
            <JobGeneralInfo job={job} />
            <SimilarJobs job={job} savedIds={savedIds} onToggleSave={handleToggleSave} />
          </div>

          <aside className="min-w-0 space-y-6 lg:sticky lg:top-24">
            <div className="hidden lg:block">
              <ApplySummaryCard job={job} flow={flow} saved={saved} onToggleSave={() => handleToggleSave(job.id)} />
            </div>
            <JobOwnerCard owner={job.createdBy} />
            {/* khách chưa đăng nhập thấy luôn; người đã đăng nhập chỉ thấy khi chưa có CV */}
            {(!user || (cvs !== null && cvs.length === 0)) && <CreateCvPromo />}
          </aside>
        </div>

        {availability !== "open" && <span className="sr-only">Tin tuyển dụng này đã đóng nhận hồ sơ</span>}
        <MobileApplyBar job={job} flow={flow} />

        {flow.modalOpen && user && (
          <ApplyModal
            job={job}
            user={user}
            cvs={cvs}
            cvsLoading={cvsLoading}
            onClose={flow.closeModal}
            onApplied={flow.markApplied}
          />
        )}
      </>
    );
  }

  return (
    <>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {job && <meta property="og:url" content={window.location.origin + buildJobPath(job)} />}
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />}

      <div className="container mx-auto px-4 pb-28 pt-6 lg:px-8 lg:pb-12">
        <Breadcrumb
          items={[
            { label: "Trang chủ", to: "/" },
            { label: "Tuyển dụng", to: "/tuyen-dung" },
            { label: job?.title ?? "Chi tiết việc làm" },
          ]}
        />
        <div className="mt-5">{body}</div>
      </div>
    </>
  );
}

export default function JobDetailPage() {
  return (
    <ToastProvider>
      <JobDetail />
    </ToastProvider>
  );
}
