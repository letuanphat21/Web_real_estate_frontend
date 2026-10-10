import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  failed: boolean;
}

/**
 * WebGL không khởi tạo được (máy rất cũ, tắt tăng tốc phần cứng…) thì bỏ canvas,
 * hero vẫn còn nền trời và toàn bộ nội dung chữ.
 */
export default class SceneErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[HouseAssemblyHero] Không khởi tạo được cảnh 3D", error, info.componentStack);
  }

  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}
