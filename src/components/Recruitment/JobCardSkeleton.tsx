/** Khung nhấp nháy hiển thị trong lúc tải danh sách việc làm */
export default function JobCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-line bg-white p-5">
      <div className="flex gap-4">
        <div className="h-12 w-12 rounded-xl bg-primary-50" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-16 rounded bg-primary-50" />
          <div className="h-5 w-2/3 rounded bg-primary-50" />
          <div className="h-3 w-1/3 rounded bg-primary-50" />
        </div>
      </div>
      <div className="mt-4 h-16 rounded-xl bg-primary-50" />
      <div className="mt-4 flex justify-between">
        <div className="h-4 w-20 rounded bg-primary-50" />
        <div className="h-10 w-40 rounded-full bg-primary-50" />
      </div>
    </div>
  );
}
