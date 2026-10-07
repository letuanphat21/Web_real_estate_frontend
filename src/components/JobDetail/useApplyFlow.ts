import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { hasApplied } from "./applyMock";
import { getJobAvailability } from "../Recruitment/jobUtils";
import type { Job } from "../../types/job.types";

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
export default function useApplyFlow(job: Job): ApplyFlow {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  // bump để tính lại trạng thái sau khi vừa ứng tuyển thành công
  const [, setVersion] = useState(0);

  const applied = !!user && hasApplied(user.id, job.id);
  const state: ApplyState = applied
    ? "applied"
    : getJobAvailability(job) !== "open"
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
    markApplied: () => setVersion((v) => v + 1),
  };
}
