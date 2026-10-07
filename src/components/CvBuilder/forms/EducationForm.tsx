import ListForm from "./ListForm";
import { PeriodFields, RhfField } from "./fields";
import { educationSchema } from "../../../schemas/cvSchemas";
import { useCvStore } from "../../../store/cvStore";
import { uid, type EducationItem } from "../../../types/cv.types";

export default function EducationForm({ onNext }: { onNext: () => void }) {
  const items = useCvStore((s) => s.data.education);
  const setSection = useCvStore((s) => s.setSection);

  return (
    <ListForm<EducationItem>
      schema={educationSchema}
      items={items}
      onChange={(v) => setSection("education", v)}
      createItem={() => ({ id: uid(), school: "", major: "", startDate: "", endDate: "", current: false })}
      addLabel="Thêm học vấn"
      emptyText="Chưa có thông tin học vấn."
      itemTitle={(item, i) => item.school || `Học vấn ${i + 1}`}
      renderFields={({ prefix, form }) => (
        <>
          <RhfField form={form} name={`${prefix}.school`} label="Trường" required placeholder="Đại học Kinh tế TP.HCM" />
          <RhfField form={form} name={`${prefix}.major`} label="Chuyên ngành" placeholder="Quản trị kinh doanh" />
          <PeriodFields form={form} prefix={prefix} />
        </>
      )}
      onNext={onNext}
    />
  );
}
