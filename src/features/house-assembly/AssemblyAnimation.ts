import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { AssemblyState } from "./assemblyState";
import { CAMERA_SHOTS, SCROLL_LENGTH, STAGES, TIMELINE_LENGTH, type ShotSet } from "./sceneConfig";

gsap.registerPlugin(ScrollTrigger);

type Query = ReturnType<typeof gsap.utils.selector>;

interface Options {
  /** Phần tử bọc ngoài do React quản lý — chứa pin-spacer mà ScrollTrigger chèn vào. */
  scopeRef: RefObject<HTMLElement | null>;
  /** Section được ghim trong suốt chuỗi lắp ráp. */
  pinRef: RefObject<HTMLElement | null>;
  state: AssemblyState;
}

/**
 * Dựng master timeline cho hero và gắn vào ScrollTrigger (pin + scrub).
 *
 * Timeline chỉ tween hai thứ: object `state` (scene 3D đọc lại trong useFrame) và các phần tử
 * DOM của overlay — nên 3D và chữ luôn đồng bộ tuyệt đối, cuộn ngược thì mọi thứ đảo ngược theo.
 *
 * Dùng useLayoutEffect để revert (gỡ pin-spacer, trả style) trước khi React gỡ DOM khi rời trang.
 */
export function useAssemblyAnimation({ scopeRef, pinRef, state }: Options) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    const pin = pinRef.current;
    if (!scope || !pin) return;

    const q = gsap.utils.selector(scope);
    const mm = gsap.matchMedia(scope);
    mm.add(
      {
        desktop: "(min-width: 1024px)",
        compact: "(max-width: 1023.98px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { desktop = false, reduceMotion = false } = context.conditions ?? {};
        const shots = desktop ? CAMERA_SHOTS.desktop : CAMERA_SHOTS.mobile;
        if (reduceMotion) showCompletedVilla(state, shots, q);
        else buildScrollTimeline(state, shots, q, pin, desktop);
      },
    );

    // Hiệu ứng vào trang của layout có translateY → đo lại vị trí ghim khi bố cục đã ổn định.
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 700);
    return () => {
      window.clearTimeout(refreshTimer);
      mm.revert();
    };
  }, [scopeRef, pinRef, state]);
}

function buildScrollTimeline(state: AssemblyState, shots: ShotSet, q: Query, pin: HTMLElement, desktop: boolean) {
  gsap.set(state.camera, shots.hero);

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: pin,
      pin: true,
      start: "top top",
      end: () => `+=${Math.round(window.innerHeight * (desktop ? SCROLL_LENGTH.desktop : SCROLL_LENGTH.mobile))}`,
      scrub: desktop ? 1.2 : 0.8,
      anticipatePin: 1,
    },
  });

  // Thanh tiến trình và nhãn từng chặng
  tl.fromTo(q("[data-progress-fill]"), { scaleY: 0 }, { scaleY: 1, duration: TIMELINE_LENGTH }, 0);
  tl.fromTo(q("[data-progress-bar]"), { scaleX: 0 }, { scaleX: 1, duration: TIMELINE_LENGTH }, 0);
  STAGES.forEach((stage, i) => {
    const label = q(`[data-stage-label="${i}"]`);
    if (i > 0) tl.fromTo(label, { opacity: 0.4 }, { opacity: 1, duration: 0.25 }, stage.start);
    if (i < STAGES.length - 1) tl.to(label, { opacity: 0.4, duration: 0.25 }, stage.end - 0.25);
  });

  // Chặng 1 — biệt thự lơ lửng: camera tiến lại gần, lời giới thiệu rời đi
  tl.to(state.camera, { ...shots.approach, duration: 1, ease: "sine.inOut" }, 0);
  tl.to(q("[data-scroll-cue]"), { autoAlpha: 0, y: 16, duration: 0.35 }, 0.05);
  tl.to(q('[data-panel="intro"]'), { autoAlpha: 0, y: -48, duration: 0.55, ease: "power2.in" }, 0.4);

  // Chặng 2 — tháo rời: mái rời đi trước, nền móng sau cùng
  tl.to(state.parts, { k: 1, duration: 1.3, ease: "power2.inOut", stagger: { each: 0.055, from: "end" } }, 1);
  tl.to(state.camera, { ...shots.exploded, duration: 2.1, ease: "sine.inOut" }, 1);
  tl.to(state, { float: 0.6, duration: 1 }, 1);
  tl.to(state, { labels: 1, duration: 0.35 }, 2.45);
  revealPanel(tl, q, "explode", 1.45, 2.95);

  // Chặng 3 — lắp ráp theo trình tự thi công: móng → khung → tường → kính → sàn → … → mái
  tl.to(state, { labels: 0, duration: 0.3 }, 3.2);
  tl.to(state.parts, { k: 0, duration: 1.15, ease: "power3.inOut", stagger: { each: 0.12 } }, 3.3);
  tl.to(state.camera, { ...shots.assembled, duration: 2.9, ease: "sine.inOut" }, 3.2);
  tl.to(state, { float: 0.3, duration: 1.5 }, 4.6);
  revealPanel(tl, q, "assemble", 3.55, 5.95);

  // Chặng 4 — hoàn thiện: đảo & cảnh quan mọc lên, trời chuyển chạng vạng, biệt thự lên đèn
  tl.to(state, { island: 1, duration: 1.1, ease: "power2.out" }, 6.2);
  tl.to(state.landscape, { s: 1, duration: 0.6, ease: "back.out(1.7)", stagger: { amount: 1.2 } }, 6.6);
  tl.to(state, { dusk: 1, duration: 2.4, ease: "sine.inOut" }, 6.3);
  tl.to(state, { interior: 1, duration: 0.9, ease: "power1.inOut" }, 6.8);
  tl.to(state, { exterior: 1, duration: 0.7, ease: "power1.inOut" }, 8);
  tl.to(state.camera, { ...shots.complete, duration: 2.3, ease: "sine.inOut" }, 6.3);
  revealPanel(tl, q, "complete", 7.25, 8.85);

  // Chặng 5 — chuyển cảnh: camera kéo lên cao, nền chuyển dần sang màu của section giới thiệu
  tl.to(state.camera, { ...shots.outro, duration: 1.2, ease: "power1.in" }, 8.8);
  tl.fromTo(q("[data-outro-veil]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.85 }, 9.15);
  tl.to(q("[data-progress-ui]"), { autoAlpha: 0, duration: 0.4 }, 9.4);
}

/** Panel chữ: hiện từng dòng lần lượt, rồi cả panel trượt lên biến mất. */
function revealPanel(tl: gsap.core.Timeline, q: Query, name: string, inAt: number, outAt: number) {
  const panel: Element[] = q(`[data-panel="${name}"]`);
  const lines = panel.flatMap((el) => Array.from(el.children));
  tl.set(panel, { autoAlpha: 1 }, inAt);
  tl.fromTo(
    lines,
    { autoAlpha: 0, y: 32 },
    { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" },
    inAt,
  );
  tl.to(panel, { autoAlpha: 0, y: -40, duration: 0.4, ease: "power2.in" }, outAt);
}

/** prefers-reduced-motion: không ghim, không bay — hiển thị ngay biệt thự hoàn chỉnh (vẫn là cảnh 3D thật). */
function showCompletedVilla(state: AssemblyState, shots: ShotSet, q: Query) {
  gsap.set(state, { island: 1, dusk: 0.55, interior: 1, exterior: 1, labels: 0, float: 0 });
  gsap.set(state.parts, { k: 0 });
  gsap.set(state.landscape, { s: 1 });
  gsap.set(state.camera, shots.complete);
  gsap.set(q("[data-progress-ui]"), { autoAlpha: 0 });
}
