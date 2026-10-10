import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { AssemblyState } from "./assemblyState";

interface Props {
  state: AssemblyState;
  /** Camera lệch nhẹ theo chuột (chỉ bật trên desktop, tắt khi giảm chuyển động). */
  parallax: boolean;
  /** Dao động rất nhẹ như flycam đang lơ lửng. */
  drift: boolean;
}

/** Tỉ lệ (nửa bề ngang nhìn thấy / khoảng cách) tối thiểu — giữ trọn biệt thự trên màn hình dọc. */
const MIN_HALF_WIDTH_RATIO = 0.33;

/**
 * Đặt camera theo "cú máy" hiện tại trong state (do GSAP tween) — không dùng React state.
 * Màn hình dọc dùng tiêu cự rộng hơn và tự lùi camera; lens shift (setViewOffset) dịch chủ thể
 * sang phải/lên trên để nhường chỗ cho chữ mà không làm méo phối cảnh.
 */
export default function CameraRig({ state, parallax, drift }: Props) {
  const target = useMemo(() => new THREE.Vector3(), []);
  const pointer = useRef({ x: 0, y: 0 });
  const smoothed = useRef({ x: 0, y: 0 });
  const lens = useRef({ width: 0, height: 0, fov: 0, shiftX: Infinity, shiftY: Infinity });

  useEffect(() => {
    if (!parallax) {
      pointer.current.x = 0;
      pointer.current.y = 0;
      return;
    }
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [parallax]);

  useFrame(({ camera, size, clock }, delta) => {
    const cam = camera as THREE.PerspectiveCamera;
    const shot = state.camera;
    const aspect = size.width / size.height;

    const fov = aspect >= 1 ? 35 : 45;
    const halfWidthRatio = Math.tan(THREE.MathUtils.degToRad(fov / 2)) * aspect;
    const fit = Math.max(1, MIN_HALF_WIDTH_RATIO / halfWidthRatio);

    const ease = 1 - Math.exp(-delta * 2.5);
    smoothed.current.x += (pointer.current.x - smoothed.current.x) * ease;
    smoothed.current.y += (pointer.current.y - smoothed.current.y) * ease;

    const t = drift ? clock.elapsedTime : 0;
    const azimuth = shot.azimuth + smoothed.current.x * 0.05 + Math.sin(t * 0.21) * 0.012;
    const elevation = shot.elevation - smoothed.current.y * 0.025 + Math.sin(t * 0.17 + 1) * 0.006;
    const distance = shot.distance * fit;

    target.set(shot.targetX, shot.targetY, shot.targetZ);
    cam.position.set(
      target.x + distance * Math.cos(elevation) * Math.sin(azimuth),
      target.y + distance * Math.sin(elevation),
      target.z + distance * Math.cos(elevation) * Math.cos(azimuth),
    );
    cam.lookAt(target);

    // Chỉ cập nhật ma trận chiếu khi tiêu cự / kích thước / lens shift thực sự thay đổi
    const l = lens.current;
    if (
      l.width !== size.width ||
      l.height !== size.height ||
      l.fov !== fov ||
      Math.abs(l.shiftX - shot.shiftX) > 1e-4 ||
      Math.abs(l.shiftY - shot.shiftY) > 1e-4
    ) {
      cam.fov = fov;
      cam.setViewOffset(size.width, size.height, -shot.shiftX * size.width, shot.shiftY * size.height, size.width, size.height);
      l.width = size.width;
      l.height = size.height;
      l.fov = fov;
      l.shiftX = shot.shiftX;
      l.shiftY = shot.shiftY;
    }
  });

  return null;
}
