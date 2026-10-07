import { useEffect, useRef } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

/** Đồng bộ giá trị form lên store theo thời gian thực (preview cập nhật ngay) */
export default function useSyncForm<T extends FieldValues>(
  form: UseFormReturn<T>,
  onChange: (values: T) => void
) {
  const ref = useRef(onChange);
  useEffect(() => {
    ref.current = onChange;
  });
  useEffect(() => {
    const sub = form.watch((values) => ref.current(values as T));
    return () => sub.unsubscribe();
  }, [form]);
}
