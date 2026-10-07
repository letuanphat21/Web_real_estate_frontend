import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  DEFAULT_JOB_FILTER,
  JOB_LEVEL_LABEL,
  JOB_SORT,
  JOB_SORT_LABEL,
  PROPERTY_TYPE_META,
  SALARY_RANGE_META,
  type JobFilter,
  type JobSort,
} from "../types/job.types";

const oneOf = <T extends string>(value: string | null, allowed: Record<T, unknown>): T | "" =>
  value && value in allowed ? (value as T) : "";

/**
 * Đồng bộ bộ lọc / sắp xếp / trang với URL:
 * ?q=&level=&project=&ptype=&location=&salary=&sort=&page=
 * `page` trên URL bắt đầu từ 1, trong code bắt đầu từ 0 (giống Pagination).
 */
export default function useJobFilterParams() {
  const [params, setParams] = useSearchParams();

  const filter = useMemo<JobFilter>(
    () => ({
      keyword: params.get("q") ?? "",
      level: oneOf(params.get("level"), JOB_LEVEL_LABEL),
      project: params.get("project") ?? "",
      propertyType: oneOf(params.get("ptype"), PROPERTY_TYPE_META),
      location: params.get("location") ?? "",
      salary: oneOf(params.get("salary"), SALARY_RANGE_META),
    }),
    [params]
  );

  const sort = (oneOf(params.get("sort"), JOB_SORT_LABEL) || JOB_SORT.NEWEST) as JobSort;
  const page = Math.max(0, (Number(params.get("page")) || 1) - 1);

  const write = useCallback(
    (f: JobFilter, s: JobSort, p: number) => {
      const next = new URLSearchParams();
      if (f.keyword) next.set("q", f.keyword);
      if (f.level) next.set("level", f.level);
      if (f.project) next.set("project", f.project);
      if (f.propertyType) next.set("ptype", f.propertyType);
      if (f.location) next.set("location", f.location);
      if (f.salary) next.set("salary", f.salary);
      if (s !== JOB_SORT.NEWEST) next.set("sort", s);
      if (p > 0) next.set("page", String(p + 1));
      setParams(next);
    },
    [setParams]
  );

  return {
    filter,
    sort,
    page,
    setFilter: (f: JobFilter) => write(f, sort, 0),
    resetFilter: () => write(DEFAULT_JOB_FILTER, sort, 0),
    setSort: (s: JobSort) => write(filter, s, 0),
    setPage: (p: number) => write(filter, sort, p),
  };
}
