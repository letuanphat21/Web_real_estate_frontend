import { useEffect, useState } from "react";
import RecruitmentHero from "../../components/Recruitment/RecruitmentHero";
import JobFilterBar from "../../components/Recruitment/JobFilterBar";
import JobListHeader from "../../components/Recruitment/JobListHeader";
import JobList from "../../components/Recruitment/JobList";
import ProfileSummaryCard from "../../components/Recruitment/ProfileSummaryCard";
import SuggestedJobs from "../../components/Recruitment/SuggestedJobs";
import FeaturedCompanies from "../../components/Recruitment/FeaturedCompanies";
import CvBuilderBanner from "../../components/Recruitment/CvBuilderBanner";
import useJobFilterParams from "../../hooks/useJobFilterParams";
import useSavedJobs from "../../hooks/useSavedJobs";
import jobService from "../../services/jobService";
import type {
  Company,
  Job,
  SuggestedJob,
  PageResponse,
  UserProfileSummary,
} from "../../types/job.types";

const PAGE_SIZE = 5;
const EMPTY_PAGE: PageResponse<Job> = {
  content: [],
  totalElements: 0,
  totalPages: 1,
  number: 0,
  size: PAGE_SIZE,
};
const TITLE = "Tuyển dụng bất động sản | NovaLand Hub";
const DESCRIPTION =
  "Tìm việc làm bất động sản phù hợp năng lực: chuyên viên kinh doanh, quản lý dự án, giám đốc sàn và nhiều vị trí khác.";

export default function RecruitmentPage() {
  const { filter, sort, page, setFilter, resetFilter, setSort, setPage } = useJobFilterParams();
  const { savedIds, toggle } = useSavedJobs();

  const [reloadKey, setReloadKey] = useState(0);
  // Kết quả gắn với khóa của lần gọi; khóa lệch với yêu cầu hiện tại => đang tải
  const requestKey = JSON.stringify([filter, sort, page, reloadKey]);
  const [result, setResult] = useState<{
    key: string;
    data: PageResponse<Job>;
    error: boolean;
  } | null>(null);
  const loading = result?.key !== requestKey;
  const error = !loading && result.error;
  const data = result?.data ?? EMPTY_PAGE;

  const [profile, setProfile] = useState<UserProfileSummary | null>(null);
  const [suggested, setSuggested] = useState<SuggestedJob[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [sideLoading, setSideLoading] = useState(true);

  // Gọi lại danh sách mỗi khi filter / sort / page (từ URL) thay đổi
  useEffect(() => {
    let ignore = false;

    jobService
      .getJobs({ filter, sort, page, size: PAGE_SIZE })
      .then((data) => !ignore && setResult({ key: requestKey, data, error: false }))
      .catch((err) => {
        console.error("Lỗi tải việc làm:", err);
        if (!ignore) setResult({ key: requestKey, data: EMPTY_PAGE, error: true });
      });

    return () => {
      ignore = true;
    };
  }, [filter, sort, page, requestKey]);

  // Dữ liệu sidebar chỉ cần tải một lần
  useEffect(() => {
    Promise.all([
      jobService.getProfileSummary(),
      jobService.getSuggestedJobs(),
      jobService.getFeaturedCompanies(),
    ])
      .then(([p, s, c]) => {
        setProfile(p);
        setSuggested(s);
        setCompanies(c);
      })
      .catch((err) => console.error("Lỗi tải sidebar:", err))
      .finally(() => setSideLoading(false));
  }, []);

  const handlePageChange = (p: number) => {
    setPage(p);
    document.getElementById("job-list")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />

      <RecruitmentHero filter={filter} onSearch={setFilter} />

      <section id="job-list" className="scroll-mt-24 bg-white py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <JobListHeader
            total={data.totalElements}
            loading={loading}
            sort={sort}
            onSortChange={setSort}
          />

          <JobFilterBar key={JSON.stringify(filter)} value={filter} onApply={setFilter} />

          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[2fr_1fr]">
            <JobList
              jobs={data.content}
              loading={loading}
              error={error}
              page={page}
              totalPages={data.totalPages}
              onPageChange={handlePageChange}
              onReset={resetFilter}
              onRetry={() => setReloadKey((k) => k + 1)}
              savedIds={savedIds}
              onToggleSave={toggle}
            />

            <aside className="space-y-5 lg:sticky lg:top-24">
              <ProfileSummaryCard profile={profile} loading={sideLoading} />
              <SuggestedJobs jobs={suggested} loading={sideLoading} />
              <FeaturedCompanies companies={companies} loading={sideLoading} />
            </aside>
          </div>
        </div>
      </section>

      <CvBuilderBanner />
    </>
  );
}
