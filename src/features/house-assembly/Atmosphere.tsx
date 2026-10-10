import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Cloud, Clouds, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import type { AssemblyState } from "./assemblyState";
import type { Quality, Vec3 } from "./types";
import { CLOUD_BANKS, LIGHT_LEVELS, PALETTE, SUN, type SkyPalette } from "./sceneConfig";
import { createCloudSeaMaterial, createSkyMaterial } from "./shaders";
import { createCloudTextureUrl } from "./textures";

type PaletteColors = Record<keyof SkyPalette, THREE.Color>;

const toColors = (palette: SkyPalette) =>
  Object.fromEntries(Object.entries(palette).map(([key, hex]) => [key, new THREE.Color(hex)])) as PaletteColors;

const GOLDEN = toColors(PALETTE.golden);
const DUSK = toColors(PALETTE.dusk);
const { lerp } = THREE.MathUtils;

/** Hướng tới mặt trời: hạ dần độ cao khi trời chuyển chạng vạng. */
function sunDirectionAt(dusk: number, out: THREE.Vector3) {
  const elevation = lerp(SUN.elevation[0], SUN.elevation[1], dusk);
  return out.set(
    Math.cos(elevation) * Math.sin(SUN.azimuth),
    Math.sin(elevation),
    Math.cos(elevation) * Math.cos(SUN.azimuth),
  );
}

const INITIAL_SUN = sunDirectionAt(0, new THREE.Vector3());
const SUN_FORMER_POSITION: Vec3 = [INITIAL_SUN.x * 60, INITIAL_SUN.y * 60, INITIAL_SUN.z * 60];

/** Bầu trời + biển mây + sương mù, nội suy cùng nhau theo mức chạng vạng. */
function createSkyRig() {
  const sunDirection = INITIAL_SUN.clone();
  const sky = createSkyMaterial(sunDirection);
  const sea = createCloudSeaMaterial(sunDirection);
  const fog = new THREE.Fog(GOLDEN.horizon.clone(), 110, 620);

  return {
    sky,
    sea,
    fog,
    sunDirection,
    update(dusk: number, delta: number) {
      sunDirectionAt(dusk, sunDirection);

      const skyU = sky.uniforms;
      skyU.uZenith.value.lerpColors(GOLDEN.zenith, DUSK.zenith, dusk);
      skyU.uMid.value.lerpColors(GOLDEN.mid, DUSK.mid, dusk);
      skyU.uHorizon.value.lerpColors(GOLDEN.horizon, DUSK.horizon, dusk);
      skyU.uBelow.value.lerpColors(GOLDEN.below, DUSK.below, dusk);
      skyU.uSunColor.value.lerpColors(GOLDEN.sun, DUSK.sun, dusk);
      skyU.uSunDirection.value.copy(sunDirection);

      const seaU = sea.uniforms;
      seaU.uTime.value += delta;
      seaU.uLit.value.lerpColors(GOLDEN.cloudLit, DUSK.cloudLit, dusk);
      seaU.uShade.value.lerpColors(GOLDEN.cloudShade, DUSK.cloudShade, dusk);
      seaU.uHorizon.value.copy(skyU.uHorizon.value);
      seaU.uSunColor.value.copy(skyU.uSunColor.value);
      seaU.uSunDirection.value.copy(sunDirection);

      fog.color.copy(skyU.uHorizon.value);
    },
    dispose() {
      sky.dispose();
      sea.dispose();
    },
  };
}

interface Props {
  state: AssemblyState;
  quality: Quality;
  animate: boolean;
}

/**
 * Bầu trời, biển mây, nắng và môi trường phản chiếu. Mọi tham số ánh sáng được nội suy theo
 * `state.dusk` mỗi khung hình: từ hoàng hôn vàng (mở đầu) sang chạng vạng khi biệt thự lên đèn.
 */
export default function Atmosphere({ state, quality, animate }: Props) {
  const high = quality === "high";
  const rig = useMemo(() => createSkyRig(), []);
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const hemiRef = useRef<THREE.HemisphereLight>(null);

  useEffect(() => () => rig.dispose(), [rig]);

  // Bóng đổ phủ trọn đảo nổi (bán kính ~20 m)
  useLayoutEffect(() => {
    const light = sunRef.current;
    if (!light) return;
    const mapSize = high ? 2048 : 1024;
    light.shadow.mapSize.set(mapSize, mapSize);
    const cam = light.shadow.camera;
    cam.left = -28;
    cam.right = 28;
    cam.top = 28;
    cam.bottom = -28;
    cam.near = 10;
    cam.far = 220;
    cam.updateProjectionMatrix();
    light.shadow.bias = -0.0005;
    light.shadow.normalBias = 0.04;
    light.shadow.radius = high ? 4 : 2;
    light.shadow.map?.dispose();
    light.shadow.map = null;
  }, [high]);

  useFrame((frame, delta) => {
    const d = state.dusk;
    rig.update(d, animate ? delta : 0);
    frame.scene.environmentIntensity = lerp(LIGHT_LEVELS.environment[0], LIGHT_LEVELS.environment[1], d);

    const sun = sunRef.current;
    if (sun) {
      sun.position.copy(rig.sunDirection).multiplyScalar(SUN.distance);
      sun.intensity = lerp(SUN.intensity[0], SUN.intensity[1], d);
      sun.color.lerpColors(GOLDEN.sunLight, DUSK.sunLight, d);
    }
    const hemi = hemiRef.current;
    if (hemi) {
      hemi.intensity = lerp(LIGHT_LEVELS.hemisphere[0], LIGHT_LEVELS.hemisphere[1], d);
      hemi.color.lerpColors(GOLDEN.hemiSky, DUSK.hemiSky, d);
      hemi.groundColor.lerpColors(GOLDEN.hemiGround, DUSK.hemiGround, d);
    }
  });

  return (
    <>
      <primitive object={rig.fog} attach="fog" />
      <mesh material={rig.sky} scale={1600} frustumCulled={false} renderOrder={-10}>
        <sphereGeometry args={[1, 48, 24]} />
      </mesh>
      <mesh material={rig.sea} position={[0, -17, 0]} rotation-x={-Math.PI / 2} renderOrder={-9}>
        <planeGeometry args={[4000, 4000]} />
      </mesh>

      <hemisphereLight ref={hemiRef} />
      <directionalLight ref={sunRef} castShadow />

      {/* Môi trường phản chiếu cho kính/kim loại, dựng từ chính bầu trời + vài tấm sáng — không tải HDR */}
      <Environment resolution={high ? 256 : 128} frames={1}>
        <mesh material={rig.sky} scale={100}>
          <sphereGeometry args={[1, 32, 16]} />
        </mesh>
        <Lightformer
          form="rect"
          intensity={5}
          color={PALETTE.golden.sunLight}
          position={SUN_FORMER_POSITION}
          scale={[40, 10, 1]}
          target={[0, 0, 0]}
        />
        <Lightformer form="rect" intensity={1.2} color="#cfe0ff" position={[0, 60, 0]} rotation-x={Math.PI / 2} scale={[80, 80, 1]} />
        <Lightformer form="rect" intensity={0.8} color="#ffe2c4" position={[40, 8, 30]} scale={[30, 6, 1]} target={[0, 0, 0]} />
      </Environment>

      <Suspense fallback={null}>
        <CloudBank quality={quality} animate={animate} />
      </Suspense>
    </>
  );
}

/** Các cụm mây thể tích (billboard) quanh đảo — mobile dùng ít cụm và ít mảnh hơn. */
function CloudBank({ quality, animate }: { quality: Quality; animate: boolean }) {
  const texture = useMemo(() => createCloudTextureUrl(), []);
  const high = quality === "high";
  const banks = high ? CLOUD_BANKS : CLOUD_BANKS.slice(0, 6);
  const segmentsOf = (segments: number) => (high ? segments : Math.ceil(segments * 0.55));
  const limit = banks.reduce((sum, bank) => sum + segmentsOf(bank.segments), 0);

  return (
    <Clouds material={THREE.MeshLambertMaterial} texture={texture} limit={limit} frustumCulled={false}>
      {banks.map((bank) => (
        <Cloud
          key={bank.seed}
          seed={bank.seed}
          position={bank.position}
          bounds={bank.bounds}
          segments={segmentsOf(bank.segments)}
          volume={bank.volume}
          opacity={bank.opacity}
          speed={animate ? 0.08 : 0}
          growth={3}
          fade={40}
          color="#ffffff"
        />
      ))}
    </Clouds>
  );
}
