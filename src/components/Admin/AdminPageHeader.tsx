import type { ReactNode } from "react";
import Breadcrumb, { type BreadcrumbItem } from "../common/Breadcrumb";

type Props = {
  breadcrumb: BreadcrumbItem[];
  title: string;
  titleExtra?: ReactNode; // ví dụ badge trạng thái cạnh tiêu đề
  desc?: string;
  action?: ReactNode;
  children?: ReactNode; // nội dung phụ dưới tiêu đề (ví dụ banner cảnh báo)
  soft?: boolean; // kiểu nhẹ: nền nhạt, tiêu đề tối, không để thẻ nội dung đè lên
};

// Phần đầu trang quản trị: breadcrumb + tiêu đề + nút hành động
export default function AdminPageHeader({ breadcrumb, title, titleExtra, desc, action, children, soft = false }: Props) {
  return (
    <div className={`px-4 pt-6 md:px-8 ${soft ? "bg-gradient-to-b from-blue-50 to-white pb-6" : "bg-gradient-to-b from-blue-300 to-blue-100/40 pb-24"}`}>
      <Breadcrumb items={breadcrumb} />
      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className={`flex flex-wrap items-center gap-3 text-3xl font-bold md:text-4xl ${soft ? "text-footer" : "text-accent"}`}>
            {title} {titleExtra}
          </h1>
          {desc && <p className="mt-2 text-sm text-body">{desc}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
