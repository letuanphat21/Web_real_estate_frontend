import { createContext, useContext } from "react";

export type ToastKind = "success" | "error";

export interface ToastContextValue {
  show: (message: string, kind?: ToastKind) => void;
}

export const ToastContext = createContext<ToastContextValue>({ show: () => {} });

export const useToast = () => useContext(ToastContext);
