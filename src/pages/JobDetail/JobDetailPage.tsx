// import { useEffect } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import Breadcrumb from "../../components/common/Breadcrumb";
// import ToastProvider from "../../components/common/Toast";
// import JobDetailContent from "../../components/JobDetail/JobDetailContent";
// import JobDetailSeo from "../../components/JobDetail/JobDetailSeo";
// import JobNotFound from "../../components/JobDetail/JobNotFound";
// import { findJobById } from "../../components/Recruitment/jobQueries";
// import { buildJobPath, parseJobId } from "../../components/Recruitment/jobUtils";

// export default function JobDetailPage() {
//   const { slugId } = useParams();
//   const navigate = useNavigate();
//   const { pathname, search } = useLocation();

//   const id = parseJobId(slugId);
//   // TODO: khi có BE, thay bằng gọi GET /jobs/:id (404 khi không tìm thấy)
//   const job = id === null ? null : findJobById(id);

//   // URL chuẩn: /tuyen-dung/<slug>-<id>; sai slug hoặc chỉ có id thì chuyển về dạng chuẩn
//   useEffect(() => {
//     if (job && pathname !== buildJobPath(job)) navigate(buildJobPath(job) + search, { replace: true });
//   }, [job, pathname, search, navigate]);

//   return (
//     <ToastProvider>
//       <JobDetailSeo job={job ?? undefined} />

//       <div className="container mx-auto px-4 pb-28 pt-6 lg:px-8 lg:pb-12">
//         <Breadcrumb
//           items={[
//             { label: "Trang chủ", to: "/" },
//             { label: "Tuyển dụng", to: "/jobs" },
//             { label: job?.title ?? "Chi tiết việc làm" },
//           ]}
//         />
//         <div className="mt-5">{job ? <JobDetailContent job={job} /> : <JobNotFound />}</div>
//       </div>
//     </ToastProvider>
//   );
// }
