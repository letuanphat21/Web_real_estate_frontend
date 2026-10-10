import { memo, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import type { AssemblyState } from "./assemblyState";
import type { Quality } from "./types";
import Atmosphere from "./Atmosphere";
import CameraRig from "./CameraRig";
import HouseModel from "./HouseModel";
import Landscape from "./Landscape";

// Khai báo ngoài component để Canvas không nhận object mới mỗi lần render
const GL_OPTIONS = { antialias: true, powerPreference: "high-performance", stencil: false } as const;
const CAMERA_OPTIONS = { fov: 35, near: 0.5, far: 3000, position: [30, 10, 40] as [number, number, number] };
const RESIZE_OPTIONS = { scroll: false, debounce: { scroll: 0, resize: 120 } };
const CANVAS_STYLE = { position: "absolute", inset: 0 } as const;

interface Props {
  state: AssemblyState;
  quality: Quality;
  reducedMotion: boolean;
  /** false khi hero đã cuộn khuất → dừng hẳn vòng render để tiết kiệm GPU/pin. */
  active: boolean;
  /** Gọi một lần sau khi khung hình đầu tiên đã được vẽ. */
  onReady?: () => void;
}

export default function HouseAssemblyScene({ state, quality, reducedMotion, active, onReady }: Props) {
  return (
    <Canvas
      shadows="percentage"
      dpr={quality === "high" ? [1, 1.75] : [1, 1.5]}
      frameloop={!active ? "never" : reducedMotion ? "demand" : "always"}
      gl={GL_OPTIONS}
      camera={CAMERA_OPTIONS}
      resize={RESIZE_OPTIONS}
      style={CANVAS_STYLE}
      aria-hidden="true"
      fallback={<p>Trình duyệt không hỗ trợ WebGL nên không hiển thị được mô hình 3D.</p>}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 1.05;
      }}
    >
      <SceneContents state={state} quality={quality} animate={!reducedMotion} />
      {onReady && <FirstFrame onReady={onReady} />}
    </Canvas>
  );
}

/** Báo ra ngoài khi khung hình đầu đã vẽ xong (shader đã biên dịch) để hiện canvas mượt mà. */
function FirstFrame({ onReady }: { onReady: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    requestAnimationFrame(() => onReady());
  });
  return null;
}

interface ContentsProps {
  state: AssemblyState;
  quality: Quality;
  animate: boolean;
}

/** memo: Canvas có re-render (đổi frameloop khi cuộn qua hero) thì cây scene cũng không render lại. */
const SceneContents = memo(function SceneContents({ state, quality, animate }: ContentsProps) {
  const high = quality === "high";
  return (
    <>
      {animate && <AdaptiveResolution max={high ? 1.75 : 1.5} />}
      <Atmosphere state={state} quality={quality} animate={animate} />
      <CameraRig state={state} parallax={animate && high} drift={animate} />
      <FloatingRig state={state} animate={animate}>
        <HouseModel state={state} quality={quality} />
        <Landscape state={state} quality={quality} animate={animate} />
      </FloatingRig>
      <Sparkles
        count={high ? 70 : 28}
        scale={[40, 20, 34]}
        position={[1, 7, 1]}
        size={7}
        speed={animate ? 0.25 : 0}
        opacity={0.55}
        color="#ffd9a3"
        noise={0.6}
      />
    </>
  );
});

/** Biệt thự và đảo cùng trôi nhẹ trên mây; biên độ do timeline điều khiển (giảm dần khi lắp ráp). */
function FloatingRig({ state, animate, children }: { state: AssemblyState; animate: boolean; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const group = ref.current;
    if (!group) return;
    const t = animate ? clock.elapsedTime : 0;
    const amplitude = state.float;
    group.position.y = Math.sin(t * 0.55) * 0.45 * amplitude;
    group.rotation.x = Math.sin(t * 0.37 + 1.2) * 0.012 * amplitude;
    group.rotation.z = Math.cos(t * 0.29) * 0.016 * amplitude;
  });
  return <group ref={ref}>{children}</group>;
}

/** Máy yếu (fps tụt) thì hạ độ phân giải render, máy khoẻ lại thì nâng lên. */
function AdaptiveResolution({ max }: { max: number }) {
  const setDpr = useThree((s) => s.setDpr);
  return (
    <PerformanceMonitor
      flipflops={3}
      onDecline={() => setDpr(1)}
      onIncline={() => setDpr([1, max])}
      onFallback={() => setDpr(1)}
    />
  );
}
