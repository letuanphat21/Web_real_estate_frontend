import * as THREE from "three";
import type { VillaMaterial } from "./villaBlueprint";
import type { Quality } from "./types";
import {
  createGlowTexture,
  createGrassTexture,
  createStoneTexture,
  createWaterNormalTexture,
  createWoodTexture,
} from "./textures";

/**
 * Vật liệu dùng chung. Tạo một lần cho mỗi scene và tự dispose khi scene unmount
 * (R3F chỉ tự dọn những gì khai báo bằng JSX, còn vật liệu truyền qua props thì không).
 */

const standard = (params: THREE.MeshStandardMaterialParameters) => new THREE.MeshStandardMaterial(params);

export interface VillaMaterials {
  byKey: Record<VillaMaterial, THREE.Material>;
  /** 0..1 — dải đèn hắt và mảng tường hắt sáng trong nhà. */
  setInteriorGlow(amount: number): void;
  dispose(): void;
}

export function createVillaMaterials(quality: Quality): VillaMaterials {
  const stoneMap = createStoneTexture();
  const woodMap = createWoodTexture();

  // Kính: phản chiếu bầu trời từ environment map, đủ trong để thấy ánh đèn ấm bên trong.
  const glass =
    quality === "high"
      ? new THREE.MeshPhysicalMaterial({
          color: "#a9c2d4",
          metalness: 0.1,
          roughness: 0.04,
          clearcoat: 1,
          clearcoatRoughness: 0.04,
          envMapIntensity: 2.4,
          transparent: true,
          opacity: 0.34,
          depthWrite: false,
        })
      : standard({
          color: "#a9c2d4",
          metalness: 0.2,
          roughness: 0.06,
          envMapIntensity: 2.2,
          transparent: true,
          opacity: 0.36,
          depthWrite: false,
        });

  const plaster = standard({ color: "#efe3d1", roughness: 0.9, emissive: "#ffb46a", emissiveIntensity: 0 });
  const lightStrip = standard({ color: "#fff1dc", roughness: 0.5, emissive: "#ffc47e", emissiveIntensity: 0.4 });

  const byKey: Record<VillaMaterial, THREE.Material> = {
    concrete: standard({ color: "#ebe6de", roughness: 0.84 }),
    concreteDark: standard({ color: "#8d8780", roughness: 0.92 }),
    paving: standard({ color: "#d6cdbf", roughness: 0.78 }),
    stone: standard({ color: "#ffffff", map: stoneMap, roughness: 0.72 }),
    wood: standard({ color: "#ffffff", map: woodMap, roughness: 0.58 }),
    woodFloor: standard({ color: "#c49a6c", roughness: 0.5, metalness: 0.02 }),
    metal: standard({ color: "#2b2d31", roughness: 0.36, metalness: 0.85 }),
    brass: standard({ color: "#cfa65e", roughness: 0.26, metalness: 1, envMapIntensity: 1.6 }),
    glass,
    fabric: standard({ color: "#ece4d7", roughness: 0.95 }),
    fabricDark: standard({ color: "#5d5148", roughness: 0.95 }),
    plaster,
    lightStrip,
  };

  return {
    byKey,
    setInteriorGlow(amount) {
      plaster.emissiveIntensity = 0.42 * amount;
      lightStrip.emissiveIntensity = 0.35 + 5.2 * amount;
    },
    dispose() {
      Object.values(byKey).forEach((material) => material.dispose());
      stoneMap.dispose();
      woodMap.dispose();
    },
  };
}

export interface LandscapeMaterials {
  grass: THREE.MeshStandardMaterial;
  rock: THREE.MeshStandardMaterial;
  paving: THREE.MeshStandardMaterial;
  water: THREE.MeshPhysicalMaterial;
  trunk: THREE.MeshStandardMaterial;
  foliage: THREE.MeshStandardMaterial;
  foliageDeep: THREE.MeshStandardMaterial;
  cypress: THREE.MeshStandardMaterial;
  shrub: THREE.MeshStandardMaterial;
  metal: THREE.MeshStandardMaterial;
  lampHead: THREE.MeshStandardMaterial;
  glow: THREE.PointsMaterial;
  /** 0..1 — đèn sân vườn và hồ bơi. */
  setExteriorGlow(amount: number): void;
  /** Gợn sóng mặt nước. */
  advance(delta: number): void;
  dispose(): void;
}

export function createLandscapeMaterials(): LandscapeMaterials {
  const grassMap = createGrassTexture();
  const waterNormal = createWaterNormalTexture();
  const glowMap = createGlowTexture();

  const materials = {
    grass: standard({ color: "#ffffff", map: grassMap, roughness: 1 }),
    rock: standard({ color: "#8c7f73", roughness: 0.95, flatShading: true }),
    paving: standard({ color: "#ddd4c6", roughness: 0.75 }),
    water: new THREE.MeshPhysicalMaterial({
      color: "#2f9fbf",
      roughness: 0.06,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      normalMap: waterNormal,
      normalScale: new THREE.Vector2(0.35, 0.35),
      envMapIntensity: 1.6,
      emissive: "#0d93b8",
      emissiveIntensity: 0,
    }),
    trunk: standard({ color: "#5b4636", roughness: 0.9 }),
    foliage: standard({ color: "#6f9447", roughness: 0.85, flatShading: true }),
    foliageDeep: standard({ color: "#4f7438", roughness: 0.85, flatShading: true }),
    cypress: standard({ color: "#3f5f34", roughness: 0.85, flatShading: true }),
    shrub: standard({ color: "#5f8a45", roughness: 0.9, flatShading: true }),
    metal: standard({ color: "#2b2d31", roughness: 0.4, metalness: 0.8 }),
    lampHead: standard({ color: "#fff4e2", emissive: "#ffc27a", emissiveIntensity: 0 }),
    glow: new THREE.PointsMaterial({
      map: glowMap,
      color: "#ffc98a",
      size: 2.4,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    }),
  };

  return {
    ...materials,
    setExteriorGlow(amount) {
      materials.water.emissiveIntensity = 0.85 * amount;
      materials.lampHead.emissiveIntensity = 4 * amount;
      materials.glow.opacity = 0.9 * amount;
    },
    advance(delta) {
      waterNormal.offset.x += delta * 0.018;
      waterNormal.offset.y += delta * 0.007;
    },
    dispose() {
      Object.values(materials).forEach((material) => material.dispose());
      grassMap.dispose();
      waterNormal.dispose();
      glowMap.dispose();
    },
  };
}
