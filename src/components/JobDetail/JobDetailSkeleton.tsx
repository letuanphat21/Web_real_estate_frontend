/** Khung nhấp nháy cho toàn trang chi tiết trong lúc tải */
export default function JobDetailSkeleton() {
  const box = "animate-pulse rounded-3xl border border-line bg-white";
  return (
    <div aria-busy="true" aria-label="Đang tải việc làm">
      <div className={`${box} h-72`} />
      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className={`${box} h-96`} />
          <div className={`${box} h-48`} />
        </div>
        <div className="hidden space-y-6 lg:block">
          <div className={`${box} h-80`} />
          <div className={`${box} h-32`} />
        </div>
      </div>
    </div>
  );
}
