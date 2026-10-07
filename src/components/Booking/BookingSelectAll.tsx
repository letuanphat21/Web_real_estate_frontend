

type Props = {
  allOnPage: boolean;
  toggleAll: () => void;
  pageSize: number;
};

export default function BookingSelectAll({ allOnPage, toggleAll, pageSize }: Props) {
  return (
    <div className="mt-4 flex items-center justify-between text-xs text-body">
      <label className="flex cursor-pointer items-center gap-3">
        <input type="checkbox" checked={allOnPage} onChange={toggleAll} className="h-4 w-4 rounded accent-primary-600" />
        Chọn tất cả booking trên trang
      </label>
      <span>{pageSize} booking / trang</span>
    </div>
  );
}
