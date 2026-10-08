export default function EventCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-line bg-white">
      <div className="aspect-[16/10] bg-primary-50" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-24 rounded bg-primary-50" />
        <div className="h-5 w-full rounded bg-primary-50" />
        <div className="h-5 w-2/3 rounded bg-primary-50" />
        <div className="h-3 w-1/2 rounded bg-primary-50" />
        <div className="h-3 w-3/5 rounded bg-primary-50" />
      </div>
    </div>
  );
}
