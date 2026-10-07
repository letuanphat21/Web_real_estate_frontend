import { useState, useEffect } from "react";
import { Search, RotateCcw } from "lucide-react";
import {
  DEFAULT_EVENT_FILTER,
  EVENT_CATEGORY_LABEL,
  EVENT_STATUS_META,
} from "../../types/event.types";

const fieldClass =
  "h-11 w-full rounded-xl border border-line bg-white px-4 text-sm text-heading outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100";

/**
 * Ô lọc: người dùng chỉnh thoải mái, chỉ khi bấm "Tìm kiếm" mới gửi lên trang cha.
 * @param {{
 *   value: import("../../../types/event.types").EventFilter,
 *   onSearch: (f: import("../../../types/event.types").EventFilter) => void
 * }} props
 */
export default function EventFilterBar({ value, onSearch }) {
  const [draft, setDraft] = useState(value);

  // Đồng bộ khi trang cha reset filter
  useEffect(() => setDraft(value), [value]);

  const update = (key) => (e) =>
    setDraft((d) => ({ ...d, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(draft);
  };

  const handleReset = () => {
    setDraft(DEFAULT_EVENT_FILTER);
    onSearch(DEFAULT_EVENT_FILTER);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-5 shadow-xl shadow-primary-100/60 ring-1 ring-line md:p-6"
    >
      {/* Ô tìm kiếm */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-body"
        />
        <input
          value={draft.keyword}
          onChange={update("keyword")}
          placeholder="Tìm kiếm sự kiện, địa điểm..."
          className={`${fieldClass} pl-11`}
        />
      </div>

      {/* Hàng bộ lọc */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto_auto] lg:items-end">
        <select
          value={draft.category}
          onChange={update("category")}
          className={fieldClass}
        >
          <option value="">Tất cả loại</option>
          {Object.entries(EVENT_CATEGORY_LABEL).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <select
          value={draft.status}
          onChange={update("status")}
          className={fieldClass}
        >
          <option value="">Tất cả trạng thái</option>
          {Object.entries(EVENT_STATUS_META).map(([key, meta]) => (
            <option key={key} value={key}>
              {meta.label}
            </option>
          ))}
        </select>

        <label className="block">
          <span className="mb-1 block text-xs text-body">Từ</span>
          <input
            type="date"
            value={draft.from}
            onChange={update("from")}
            className={fieldClass}
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs text-body">Đến</span>
          <input
            type="date"
            value={draft.to}
            min={draft.from || undefined}
            onChange={update("to")}
            className={fieldClass}
          />
        </label>

        <button
          type="submit"
          className="flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-6 text-sm font-medium text-white shadow-lg shadow-primary-300/50 transition hover:opacity-95"
        >
          Tìm kiếm <Search size={16} />
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="flex h-11 items-center justify-center gap-1.5 px-2 text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          <RotateCcw size={15} /> Xóa bộ lọc
        </button>
      </div>
    </form>
  );
}
