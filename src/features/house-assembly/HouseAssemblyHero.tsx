import { Suspense, lazy, useCallback, useEffect, useRef, useState, type RefObject } from "react";
import useMediaQuery from "../../components/common/useMediaQuery";
import AssemblyOverlay from "./AssemblyOverlay";
import SceneErrorBoundary from "./SceneErrorBoundary";
import { createAssemblyState } from "./assemblyState";
import { useAssemblyAnimation } from "./AssemblyAnimation";

// three.js + R3F nằm ở chunk riêng: chữ và timeline hiện ngay, cảnh 3D tải song song rồi hiện dần
const HouseAssemblyScene = lazy(() => import("./HouseAssemblyScene"));

/** true khi phần tử còn (gần) trong khung nhìn — dùng để dừng render WebGL khi đã cuộn qua hero. */
function useIsOnScreen(ref: RefObject<HTMLElement | null>) {
  const [onScreen, setOnScreen] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      rootMargin: "120px 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return onScreen;
}

/**
 * Hero trang chủ: biệt thự lơ lửng trên biển mây, cuộn để tháo rời rồi lắp ráp lại.
 *
 * - `scopeRef`: thẻ bọc do React quản lý. ScrollTrigger chèn pin-spacer bên trong thẻ này,
 *   nên React luôn gỡ được DOM an toàn khi rời trang.
 * - `state`: object hoạt cảnh dùng chung (không phải React state) — GSAP ghi, scene 3D đọc.
 * - `data-header-overlay`: báo cho Header nằm đè trong suốt khi đang ở trên hero.
 */
export default function HouseAssemblyHero() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [state] = useState(createAssemblyState);
  const roomy = useMediaQuery("(min-width: 768px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const onScreen = useIsOnScreen(scopeRef);

  useAssemblyAnimation({ scopeRef, pinRef, state });

  // Hiện canvas bằng thuộc tính DOM (không qua React state → không re-render)
  const revealScene = useCallback(() => {
    if (canvasRef.current) canvasRef.current.dataset.ready = "true";
  }, []);

  return (
    <div ref={scopeRef} data-header-overlay>
      <section
        ref={pinRef}
        aria-labelledby="hero-title"
        aria-describedby="hero-scene-description"
        className="hero-viewport relative w-full overflow-hidden bg-[#2b4a7a]"
      >
        {/* Nền trời dự phòng trong lúc WebGL khởi tạo (hoặc khi WebGL không khả dụng) */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#3a6db3] via-[#9fb9d8] to-[#f3c493]" />

        <div
          ref={canvasRef}
          className="absolute inset-0 isolate opacity-0 transition-opacity duration-1000 data-[ready=true]:opacity-100"
        >
          <SceneErrorBoundary>
            <Suspense fallback={null}>
              <HouseAssemblyScene
                state={state}
                quality={roomy ? "high" : "low"}
                reducedMotion={reducedMotion}
                active={onScreen}
                onReady={revealScene}
              />
            </Suspense>
          </SceneErrorBoundary>
        </div>

        <p id="hero-scene-description" className="sr-only">
          Hoạt cảnh 3D: một biệt thự hiện đại lơ lửng trên biển mây lúc hoàng hôn. Khi cuộn trang, mái, tường, vách
          kính, ban công, sàn và hệ dầm tách rời rồi lắp ráp lại thành ngôi nhà hoàn chỉnh với sân vườn, hồ bơi và ánh
          đèn.
        </p>

        <AssemblyOverlay reducedMotion={reducedMotion} />
      </section>
    </div>
  );
}
