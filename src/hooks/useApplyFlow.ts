import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import applicationService from "../services/applicationService";
import { useAuthStore } from "../store/authStore";
import type { Job } from "../types/job.types";
import { getJobAvailability } from "../utils/jobHelpers";

export type ApplyState = "guest" | "open" | "closed" | "applied";

export interface ApplyFlow {
  state: ApplyState;
  modalOpen: boolean;
  /** Bấm "Ứng tuyển nhanh": chưa đăng nhập thì chuyển sang đăng nhập, ngược lại mở modal */
  start: () => void;
  closeModal: () => void;
  markApplied: () => void;
}

/** Gom trạng thái nút "Ứng tuyển nhanh" để hero, sidebar và thanh mobile luôn đồng bộ */
export default function useApplyFlow(job: Job | null): ApplyFlow {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [appliedJobId, setAppliedJobId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const jobId = job?.id;
  const userId = user?.id;

  useEffect(() => {
    if (jobId === undefined || userId === undefined) return;
    let off = false;
    applicationService
      .getApplicationStatus(jobId)
      .then((res) => !off && res.applied && setAppliedJobId(jobId))
      .catch(() => {
        /* không xác định được thì coi như chưa ứng tuyển, server vẫn chặn trùng */
      });
    return () => {
      off = true;
    };
  }, [jobId, userId]);

  const applied = !!user && jobId !== undefined && appliedJobId === jobId;
  const state: ApplyState = applied
    ? "applied"
    : job && getJobAvailability(job) !== "open"
      ? "closed"
      : !user
        ? "guest"
        : "open";

  const start = useCallback(() => {
    if (state === "guest") {
      const back = encodeURIComponent(location.pathname + location.search);
      navigate(`/login?redirect=${back}`);
    } else if (state === "open") {
      setModalOpen(true);
    }
  }, [state, navigate, location]);

  return {
    state,
    modalOpen,
    start,
    closeModal: () => setModalOpen(false),
    markApplied: () => jobId !== undefined && setAppliedJobId(jobId),
  };
}
