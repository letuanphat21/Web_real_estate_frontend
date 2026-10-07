import { useSyncExternalStore } from "react";
import type { AuthResponse, AuthUser } from "../types/auth.types";

// Lưu phiên đăng nhập: "ghi nhớ" -> localStorage, ngược lại -> sessionStorage
const KEY = "auth.session";

type Session = { user: AuthUser; token: string };

const listeners = new Set<() => void>();
let cachedRaw: string | null | undefined;
let cachedSession: Session | null = null;

function readRaw(): string | null {
  try {
    return localStorage.getItem(KEY) ?? sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function getSnapshot(): Session | null {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedSession = raw ? (JSON.parse(raw) as Session) : null;
    } catch {
      cachedSession = null;
    }
  }
  return cachedSession;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb); // đồng bộ giữa các tab
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

const emit = () => listeners.forEach((l) => l());

export function setSession(res: AuthResponse, remember: boolean) {
  const store = remember ? localStorage : sessionStorage;
  localStorage.removeItem(KEY);
  sessionStorage.removeItem(KEY);
  store.setItem(KEY, JSON.stringify({ user: res.user, token: res.token }));
  emit();
}

export function clearSession() {
  localStorage.removeItem(KEY);
  sessionStorage.removeItem(KEY);
  emit();
}

export function useAuth() {
  const session = useSyncExternalStore(subscribe, getSnapshot, () => null);
  return { user: session?.user ?? null, token: session?.token ?? null };
}
