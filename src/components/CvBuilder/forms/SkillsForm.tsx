import ListForm from "./ListForm";
import { RhfField } from "./fields";
import { skillsSchema } from "../cvSchemas";
import { useCvBuilder } from "../cvBuilderContext";
import { uid, type SkillItem } from "../../../types/cv.types";

export default function SkillsForm({ onNext }: { onNext: () => void }) {
  const items = useCvBuilder((s) => s.data.skills);
  const setSection = useCvBuilder((s) => s.setSection);

  return (
    <ListForm<SkillItem>
      schema={skillsSchema}
      items={items}
      onChange={(v) => setSection("skills", v)}
      createItem={() => ({ id: uid(), name: "", level: 80 })}
      addLabel="Thêm kỹ năng"
      emptyText="Chưa có kỹ năng nào. Vd: Tư vấn khách hàng, Đàm phán, Phân tích thị trường."
      itemTitle={(item, i) => item.name || `Kỹ năng ${i + 1}`}
      renderFields={({ prefix, form }) => {
        const level = form.watch(`${prefix}.level`) as number;
        return (
          <>
            <RhfField form={form} name={`${prefix}.name`} label="Tên kỹ năng" required placeholder="Đàm phán chốt giao dịch" />
            <label className="block">
              <span className="mb-1.5 flex justify-between text-sm font-medium text-heading">
                Mức độ <span className="text-primary-600">{level}%</span>
              </span>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                {...form.register(`${prefix}.level`, { valueAsNumber: true })}
                className="w-full accent-primary-600"
              />
            </label>
          </>
        );
      }}
      onNext={onNext}
    />
  );
}
