import ProfileSummaryCard from "./ProfileSummaryCard";
import SuggestedJobs from "./SuggestedJobs";
import FeaturedCompanies from "./FeaturedCompanies";
import { MOCK_COMPANIES, MOCK_PROFILE, MOCK_SUGGESTED_JOBS } from "../../data/mockJobs";

/** Cột phải trang Tuyển dụng (sticky trên desktop): hồ sơ, việc làm phù hợp, công ty nổi bật */
export default function JobSidebar() {
  return (
    <aside className="space-y-5 lg:sticky lg:top-24">
      <ProfileSummaryCard profile={MOCK_PROFILE} />
      <SuggestedJobs jobs={MOCK_SUGGESTED_JOBS} />
      <FeaturedCompanies companies={MOCK_COMPANIES.slice(0, 3)} />
    </aside>
  );
}
