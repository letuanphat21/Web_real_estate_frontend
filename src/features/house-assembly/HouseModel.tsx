import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { AssemblyState } from "./assemblyState";
import type { Quality } from "./types";
import { VILLA_PARTS, type VillaMaterial, type VillaPart } from "./villaBlueprint";
import { createVillaMaterials } from "./materials";
import { LIGHT_LEVELS } from "./sceneConfig";

interface PartMesh {
  material: VillaMaterial;
  geometry: THREE.BufferGeometry;
}

/** Không đổ bóng: kính (để nắng lọt vào trong nhà) và dải đèn. */
const NO_SHADOW = new Set<VillaMaterial>(["glass", "lightStrip"]);

/** Chỉ số bắt đầu của đèn từng cấu kiện trong mảng ref phẳng. */
const LIGHT_OFFSETS = VILLA_PARTS.map((_, i) =>
  VILLA_PARTS.slice(0, i).reduce((sum, part) => sum + part.lights.length, 0),
);

/** Gộp các khối cùng vật liệu của một cấu kiện thành một geometry → mỗi cấu kiện chỉ vài draw call. */
function buildPartMeshes(part: VillaPart): PartMesh[] {
  const byMaterial = new Map<VillaMaterial, THREE.BufferGeometry[]>();
  for (const b of part.boxes) {
    const geometry = new THREE.BoxGeometry(...b.size).translate(...b.position);
    byMaterial.set(b.material, [...(byMaterial.get(b.material) ?? []), geometry]);
  }
  return Array.from(byMaterial, ([material, geometries]) => {
    const geometry = mergeGeometries(geometries);
    geometries.forEach((g) => g.dispose());
    return { material, geometry };
  });
}

interface Props {
  state: AssemblyState;
  quality: Quality;
}

/**
 * Biệt thự gồm các cấu kiện độc lập. Mỗi khung hình, vị trí/góc xoay của từng cấu kiện được tính
 * từ hệ số tách rời `k` (0 = lắp đúng chỗ, 1 = tách hẳn) cộng một đường vồng — một hàm thuần của `k`,
 * nên cuộn tới hay lùi đều cho cùng một kết quả.
 */
export default function HouseModel({ state, quality }: Props) {
  const materials = useMemo(() => createVillaMaterials(quality), [quality]);
  const parts = useMemo(() => VILLA_PARTS.map(buildPartMeshes), []);
  const groupRefs = useRef<(THREE.Group | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelOpacity = useRef<number[]>([]);
  const lightRefs = useRef<(THREE.PointLight | null)[]>([]);
  // Point light thật khá tốn trên GPU di động → mobile chỉ dùng vật liệu phát sáng
  const withLights = quality === "high";

  useEffect(() => () => materials.dispose(), [materials]);
  useEffect(() => () => parts.forEach((meshes) => meshes.forEach((m) => m.geometry.dispose())), [parts]);

  useFrame(() => {
    for (let i = 0; i < VILLA_PARTS.length; i++) {
      const group = groupRefs.current[i];
      if (!group) continue;
      const part = VILLA_PARTS[i];
      const k = state.parts[i].k;
      const lift = part.arc * Math.sin(Math.PI * THREE.MathUtils.clamp(k, 0, 1));
      group.position.set(
        part.pivot[0] + part.offset[0] * k,
        part.pivot[1] + part.offset[1] * k + lift,
        part.pivot[2] + part.offset[2] * k,
      );
      group.rotation.set(part.spin[0] * k, part.spin[1] * k, part.spin[2] * k);

      const label = labelRefs.current[i];
      if (label) {
        const opacity = state.labels * THREE.MathUtils.smoothstep(k, 0.6, 0.95);
        if (Math.abs(opacity - (labelOpacity.current[i] ?? -1)) > 0.004) {
          labelOpacity.current[i] = opacity;
          label.style.opacity = opacity.toFixed(3);
          label.style.visibility = opacity > 0.01 ? "visible" : "hidden";
        }
      }
    }

    materials.setInteriorGlow(state.interior);
    const intensity = LIGHT_LEVELS.interior * state.interior;
    for (const light of lightRefs.current) if (light) light.intensity = intensity;
  });

  return (
    <group>
      {VILLA_PARTS.map((part, i) => (
        <group
          key={part.id}
          ref={(el) => {
            groupRefs.current[i] = el;
          }}
          position={part.pivot}
        >
          {parts[i].map(({ material, geometry }) => (
            <mesh
              key={material}
              geometry={geometry}
              material={materials.byKey[material]}
              castShadow={!NO_SHADOW.has(material)}
              receiveShadow={!NO_SHADOW.has(material)}
            />
          ))}

          {withLights &&
            part.lights.map((position, j) => (
              <pointLight
                key={j}
                ref={(el) => {
                  lightRefs.current[LIGHT_OFFSETS[i] + j] = el;
                }}
                position={position}
                color="#ffb36b"
                intensity={0}
                distance={16}
                decay={2}
              />
            ))}

          {part.label && (
            <Html position={part.labelAnchor} center zIndexRange={[8, 0]} pointerEvents="none">
              <div
                ref={(el) => {
                  labelRefs.current[i] = el;
                  labelOpacity.current[i] = -1;
                }}
                aria-hidden="true"
                style={{ opacity: 0, visibility: "hidden" }}
                className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/30 bg-[#0b1424]/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white shadow-lg shadow-black/20"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold-300" />
                {part.label}
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  );
}
