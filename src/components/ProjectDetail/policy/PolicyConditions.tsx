import { Check } from "lucide-react";
import Eyebrow from "./Eyebrow";
import type { CONDITIONS } from "../../../data/projectDetail/policy";

type Props = {
  conditions: typeof CONDITIONS;
};

export default function PolicyConditions({ conditions }: Props) {
  return (
    <section className="mt-14 rounded-3xl border border-line bg-white p-6 shadow-sm">
      <Eyebrow>Thông tin cần biết</Eyebrow>
      <h2 className="mt-3 text-3xl font-semibold text-heading">Điều kiện áp dụng</h2>
      <p className="mt-2 text-sm text-body">Vui lòng đối chiếu hồ sơ và thời điểm giao dịch để xác định quyền lợi chính xác.</p>
      <ul className="mt-5 space-y-4">
        {conditions.map((c) => (
          <li key={c} className="flex items-center gap-3 text-[13px] text-body">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success"><Check size={11} strokeWidth={3} /></span>
            {c}
          </li>
        ))}
      </ul>
    </section>
  );
}
