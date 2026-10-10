import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { AssemblyState } from "./assemblyState";
import type { Quality, Vec3 } from "./types";
import { GROUND_Y, ISLAND, LANDSCAPE_ITEMS, PAVING, POOL_LIGHT, POOL_WATER, type Extents } from "./landscapeLayout";
import { createLandscapeMaterials, type LandscapeMaterials } from "./materials";
import { LIGHT_LEVELS } from "./sceneConfig";

type PieceKind = "trunk" | "canopy" | "canopyDeep" | "cypress" | "shrub" | "post" | "lampHead";
type GeometryKey = "trunk" | "blob" | "post" | "head";
type MaterialKey = "trunk" | "foliage" | "foliageDeep" | "cypress" | "shrub" | "metal" | "lampHead";

/** Mỗi loại mảnh = một InstancedMesh (một draw call cho tất cả cây/bụi/đèn cùng loại). */
const PIECES: Record<PieceKind, { geometry: GeometryKey; material: MaterialKey }> = {
  trunk: { geometry: "trunk", material: "trunk" },
  canopy: { geometry: "blob", material: "foliage" },
  canopyDeep: { geometry: "blob", material: "foliageDeep" },
  cypress: { geometry: "blob", material: "cypress" },
  shrub: { geometry: "blob", material: "shrub" },
  post: { geometry: "post", material: "metal" },
  lampHead: { geometry: "head", material: "lampHead" },
};
const PIECE_KINDS = Object.keys(PIECES) as PieceKind[];

interface Piece {
  /** Chỉ số trong LANDSCAPE_ITEMS. */
  item: number;
  /** Ma trận của mảnh so với gốc cây/đèn (đã gồm góc xoay và tỉ lệ riêng). */
  local: THREE.Matrix4;
}

const UP = new THREE.Vector3(0, 1, 0);

function buildPieces(): Record<PieceKind, Piece[]> {
  const pieces = Object.fromEntries(PIECE_KINDS.map((kind) => [kind, [] as Piece[]])) as Record<PieceKind, Piece[]>;
  const rotation = new THREE.Quaternion();

  LANDSCAPE_ITEMS.forEach((it, index) => {
    rotation.setFromAxisAngle(UP, it.rotation);
    const add = (kind: PieceKind, offset: Vec3, size: Vec3) => {
      const position = new THREE.Vector3(...offset).multiplyScalar(it.scale).applyQuaternion(rotation);
      const scale = new THREE.Vector3(...size).multiplyScalar(it.scale);
      pieces[kind].push({ item: index, local: new THREE.Matrix4().compose(position, rotation, scale) });
    };

    switch (it.kind) {
      case "tree":
        add("trunk", [0, 1.15, 0], [0.26, 2.3, 0.26]);
        add(index % 2 ? "canopy" : "canopyDeep", [0, 3.4, 0], [2, 1.7, 2]);
        add("canopy", [0.95, 2.8, 0.45], [1.35, 1.15, 1.35]);
        add("canopyDeep", [-0.85, 3, -0.5], [1.45, 1.25, 1.45]);
        break;
      case "cypress":
        add("trunk", [0, 0.3, 0], [0.18, 0.6, 0.18]);
        add("cypress", [0, 3.1, 0], [0.95, 2.9, 0.95]);
        break;
      case "shrub":
        add("shrub", [0, 0.5, 0], [1.05, 0.78, 1.05]);
        break;
      case "lamp":
        add("post", [0, 0.45, 0], [1, 0.9, 1]);
        add("lampHead", [0, 0.95, 0], [1, 1, 1]);
        break;
    }
  });
  return pieces;
}

/** Đường viền mép đảo hơi lượn sóng cho tự nhiên. */
const rimShape = (angle: number) => 1 + 0.05 * Math.sin(3 * angle + 1.3) + 0.03 * Math.sin(7 * angle + 0.4);

function hash3(x: number, y: number, z: number) {
  const v = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return v - Math.floor(v);
}

/** Đảo nổi: lớp đất phủ cỏ + khối đá hình nón lởm chởm (biến dạng theo vị trí đỉnh nên khớp đường nối). */
function buildIsland() {
  const { radius, rim, thickness, rockDepth } = ISLAND;
  const v = new THREE.Vector3();

  const top = new THREE.CylinderGeometry(radius, rim, thickness, 72, 1);
  top.translate(0, -thickness / 2, 0);
  const topPos = top.attributes.position;
  for (let i = 0; i < topPos.count; i++) {
    v.fromBufferAttribute(topPos, i);
    if (Math.hypot(v.x, v.z) < 1e-4) continue;
    const s = rimShape(Math.atan2(v.z, v.x));
    topPos.setXYZ(i, v.x * s, v.y, v.z * s);
  }
  top.computeVertexNormals();

  const rock = new THREE.ConeGeometry(rim, rockDepth, 48, 10, true);
  rock.rotateX(Math.PI);
  rock.translate(0, -thickness - rockDepth / 2, 0);
  const rockPos = rock.attributes.position;
  for (let i = 0; i < rockPos.count; i++) {
    v.fromBufferAttribute(rockPos, i);
    if (Math.hypot(v.x, v.z) < 1e-4) continue;
    const depth = THREE.MathUtils.clamp((-thickness - v.y) / rockDepth, 0, 0.999);
    const h = hash3(Math.round(v.x * 10), Math.round(v.y * 10), Math.round(v.z * 10));
    // Đáy phình hơn hình nón thẳng, sần nhiều nhất ở giữa thân
    const profile = Math.pow(1 - depth, -0.3);
    const jitter = 1 + (h - 0.5) * 0.35 * Math.sin(Math.PI * depth);
    const s = rimShape(Math.atan2(v.z, v.x)) * profile * jitter;
    rockPos.setXYZ(i, v.x * s, v.y + (h - 0.5) * 0.9 * depth, v.z * s);
  }
  rock.computeVertexNormals();
  return { top, rock };
}

/** Khối hộp theo biên (toạ độ biệt thự) → toạ độ cục bộ của đảo. */
function boxFrom(e: Extents) {
  return new THREE.BoxGeometry(e.x1 - e.x0, e.y1 - e.y0, e.z1 - e.z0).translate(
    (e.x0 + e.x1) / 2 - ISLAND.x,
    (e.y0 + e.y1) / 2 - GROUND_Y,
    (e.z0 + e.z1) / 2 - ISLAND.z,
  );
}

/** Vị trí quầng sáng: đầu đèn sân vườn, đèn rọi chân tường đá, đèn bậc tam cấp. */
function glowPositions(): number[] {
  const points: number[] = [];
  for (const it of LANDSCAPE_ITEMS) {
    if (it.kind === "lamp") points.push(it.position[0], it.position[1] + 0.95 * it.scale, it.position[2]);
  }
  points.push(-6.9, 0.2, 5.4, -6.1, -0.2, 7.6, -2.4, -0.2, 7.6);
  return points;
}

function createLandscapeGeometries() {
  const { top, rock } = buildIsland();
  const pavingParts = PAVING.map(boxFrom);
  const paving = mergeGeometries(pavingParts);
  pavingParts.forEach((g) => g.dispose());

  const geometries = {
    islandTop: top,
    islandRock: rock,
    paving,
    water: boxFrom(POOL_WATER),
    blob: new THREE.IcosahedronGeometry(1, 1),
    trunk: new THREE.CylinderGeometry(0.4, 0.5, 1, 7),
    post: new THREE.CylinderGeometry(0.05, 0.06, 1, 6),
    head: new THREE.BoxGeometry(0.22, 0.14, 0.22),
    glow: new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(glowPositions(), 3)),
  };
  return {
    ...geometries,
    dispose: () => Object.values(geometries).forEach((g) => g.dispose()),
  };
}

interface Props {
  state: AssemblyState;
  quality: Quality;
  animate: boolean;
}

/** Đảo nổi, hồ bơi, cây xanh và đèn sân vườn — xuất hiện ở chặng hoàn thiện. */
export default function Landscape({ state, quality, animate }: Props) {
  const materials = useMemo(() => createLandscapeMaterials(), []);
  const geometries = useMemo(() => createLandscapeGeometries(), []);
  const pieces = useMemo(() => buildPieces(), []);
  const facadeTarget = useMemo(() => {
    const target = new THREE.Object3D();
    target.position.set(-7.85, 4.2, 4.6);
    return target;
  }, []);
  const scratch = useMemo(() => ({ matrix: new THREE.Matrix4(), scale: new THREE.Matrix4(), move: new THREE.Matrix4() }), []);

  const islandRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<Partial<Record<PieceKind, THREE.InstancedMesh | null>>>({});
  const poolLightRef = useRef<THREE.PointLight>(null);
  const facadeLightRef = useRef<THREE.SpotLight>(null);
  const lastGrowth = useRef(new Float32Array(LANDSCAPE_ITEMS.length).fill(-1));

  useEffect(() => () => materials.dispose(), [materials]);
  useEffect(() => () => geometries.dispose(), [geometries]);

  useFrame((_, delta) => {
    const island = islandRef.current;
    if (island) {
      island.visible = state.island > 0.002;
      island.scale.setScalar(Math.max(state.island, 0.002));
    }

    // Chỉ ghi lại ma trận instance khi có cây/đèn đang đổi kích thước
    let dirty = false;
    for (let i = 0; i < LANDSCAPE_ITEMS.length; i++) {
      const s = state.landscape[i].s;
      if (s !== lastGrowth.current[i]) {
        lastGrowth.current[i] = s;
        dirty = true;
      }
    }
    if (dirty) {
      for (const kind of PIECE_KINDS) {
        const mesh = meshRefs.current[kind];
        if (!mesh) continue;
        pieces[kind].forEach((piece, index) => {
          const [x, y, z] = LANDSCAPE_ITEMS[piece.item].position;
          const g = Math.max(state.landscape[piece.item].s, 1e-4);
          scratch.matrix
            .copy(piece.local)
            .premultiply(scratch.scale.makeScale(g, g, g))
            .premultiply(scratch.move.makeTranslation(x, y, z));
          mesh.setMatrixAt(index, scratch.matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
      }
    }

    const glow = state.exterior;
    materials.setExteriorGlow(glow);
    if (animate) materials.advance(delta);
    if (poolLightRef.current) poolLightRef.current.intensity = LIGHT_LEVELS.pool * glow;
    if (facadeLightRef.current) facadeLightRef.current.intensity = LIGHT_LEVELS.facade * glow;
  });

  const materialOf = (key: MaterialKey): LandscapeMaterials[MaterialKey] => materials[key];

  return (
    <group>
      <group ref={islandRef} position={[ISLAND.x, GROUND_Y, ISLAND.z]} visible={false}>
        <mesh geometry={geometries.islandTop} material={[materials.rock, materials.grass, materials.rock]} receiveShadow />
        <mesh geometry={geometries.islandRock} material={materials.rock} receiveShadow />
        <mesh geometry={geometries.paving} material={materials.paving} castShadow receiveShadow />
        <mesh geometry={geometries.water} material={materials.water} receiveShadow />
      </group>

      {PIECE_KINDS.map((kind) => (
        <instancedMesh
          key={kind}
          ref={(el) => {
            meshRefs.current[kind] = el;
          }}
          args={[geometries[PIECES[kind].geometry], materialOf(PIECES[kind].material), pieces[kind].length]}
          castShadow={kind !== "lampHead"}
          receiveShadow
          frustumCulled={false}
        />
      ))}

      <points geometry={geometries.glow} material={materials.glow} frustumCulled={false} />

      {quality === "high" && (
        <>
          <pointLight ref={poolLightRef} position={POOL_LIGHT} color="#5fd4ff" intensity={0} distance={14} decay={2} />
          <primitive object={facadeTarget} />
          <spotLight
            ref={facadeLightRef}
            position={[-6.9, 0.15, 5.4]}
            target={facadeTarget}
            color="#ffc58a"
            intensity={0}
            angle={0.6}
            penumbra={0.9}
            distance={12}
            decay={2}
          />
        </>
      )}
    </group>
  );
}
