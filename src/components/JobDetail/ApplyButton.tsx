// import { Check, Send } from "lucide-react";
// // import type { ApplyFlow } from "./useApplyFlow";

// /** Nút "Ứng tuyển nhanh" cho cả 4 trạng thái; dùng ở hero, sidebar và thanh mobile */
// export default function ApplyButton({
//   // flow,
//   className = "",
// }: {
//   // flow: ApplyFlow;
//   className?: string;
// }) {
//   const base = `flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition ${className}`;

//   if (flow.state === "applied") {
//     return (
//       <button type="button" disabled aria-disabled="true" className={`${base} cursor-default border border-success bg-success/5 text-success`}>
//         Đã ứng tuyển <Check size={16} aria-hidden />
//       </button>
//     );
//   }

//   if (flow.state === "closed") {
//     return (
//       <button type="button" disabled aria-disabled="true" className={`${base} cursor-not-allowed bg-line text-muted`}>
//         Đã hết hạn nhận hồ sơ
//       </button>
//     );
//   }

//   return (
//     <button
//       type="button"
//       onClick={flow.start}
//       className={`${base} bg-gradient-to-r from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-300/50 hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600`}
//     >
//       <Send size={15} aria-hidden /> Ứng tuyển nhanh
//     </button>
//   );
// }
