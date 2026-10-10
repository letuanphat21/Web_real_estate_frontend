import * as THREE from "three";
import { PALETTE } from "./sceneConfig";

/**
 * Bầu trời và biển mây viết bằng shader để chủ động hoàn toàn về màu sắc (không cần ảnh HDR).
 * Màu truyền vào là THREE.Color (đã ở không gian tuyến tính); shader xuất qua colorspace_fragment.
 */

const SKY_VERTEX = /* glsl */ `
  varying vec3 vDirection;

  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vDirection = world.xyz - cameraPosition;
    gl_Position = projectionMatrix * viewMatrix * world;
    gl_Position.z = gl_Position.w; // luôn nằm ở mặt phẳng xa
  }
`;

const SKY_FRAGMENT = /* glsl */ `
  uniform vec3 uZenith;
  uniform vec3 uMid;
  uniform vec3 uHorizon;
  uniform vec3 uBelow;
  uniform vec3 uSunDirection;
  uniform vec3 uSunColor;
  varying vec3 vDirection;

  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  void main() {
    vec3 dir = normalize(vDirection);
    float h = dir.y;
    vec3 color = mix(uHorizon, uMid, smoothstep(0.0, 0.2, h));
    color = mix(color, uZenith, smoothstep(0.16, 0.72, h));
    color = mix(color, uBelow, 1.0 - smoothstep(-0.2, -0.05, h));

    float sun = max(dot(dir, normalize(uSunDirection)), 0.0);
    float band = 1.0 - smoothstep(0.0, 0.35, abs(h - 0.03));
    color += uSunColor * (0.35 * pow(sun, 5.0) * band + 0.45 * pow(sun, 60.0));
    color += uSunColor * smoothstep(0.9993, 0.9997, sun) * 2.0;

    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
    // Dither nhẹ để dải chuyển màu không bị sọc (banding)
    gl_FragColor.rgb += (hash12(gl_FragCoord.xy) - 0.5) / 255.0;
  }
`;

const SEA_VERTEX = /* glsl */ `
  varying vec3 vWorld;

  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const SEA_FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform vec3 uLit;
  uniform vec3 uShade;
  uniform vec3 uHorizon;
  uniform vec3 uSunDirection;
  uniform vec3 uSunColor;
  uniform float uFadeNear;
  uniform float uFadeFar;
  varying vec3 vWorld;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 rotation = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = rotation * p;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 p = vWorld.xz * 0.018;
    vec2 drift = vec2(uTime * 0.012, uTime * 0.005);
    float n = fbm(p + drift + 0.6 * fbm(p * 1.3 - drift));
    float billow = smoothstep(0.32, 0.78, n);
    vec3 color = mix(uShade, uLit, billow);

    // Tán xạ về phía mặt trời: mây sáng rực khi nhìn ngược nắng
    vec3 view = normalize(vWorld - cameraPosition);
    float forward = pow(max(dot(view, normalize(uSunDirection)), 0.0), 4.0);
    color += uSunColor * forward * 0.35 * (0.4 + billow);

    // Xa dần thì hoà vào màu chân trời
    float dist = length(vWorld.xz - cameraPosition.xz);
    color = mix(color, uHorizon, smoothstep(uFadeNear, uFadeFar, dist));

    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`;

const color = (hex: string) => new THREE.Color(hex);

export type SkyMaterial = THREE.ShaderMaterial & {
  uniforms: {
    uZenith: { value: THREE.Color };
    uMid: { value: THREE.Color };
    uHorizon: { value: THREE.Color };
    uBelow: { value: THREE.Color };
    uSunDirection: { value: THREE.Vector3 };
    uSunColor: { value: THREE.Color };
  };
};

export type CloudSeaMaterial = THREE.ShaderMaterial & {
  uniforms: {
    uTime: { value: number };
    uLit: { value: THREE.Color };
    uShade: { value: THREE.Color };
    uHorizon: { value: THREE.Color };
    uSunDirection: { value: THREE.Vector3 };
    uSunColor: { value: THREE.Color };
    uFadeNear: { value: number };
    uFadeFar: { value: number };
  };
};

export function createSkyMaterial(sunDirection: THREE.Vector3): SkyMaterial {
  const { golden } = PALETTE;
  return new THREE.ShaderMaterial({
    name: "SunsetSky",
    vertexShader: SKY_VERTEX,
    fragmentShader: SKY_FRAGMENT,
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      uZenith: { value: color(golden.zenith) },
      uMid: { value: color(golden.mid) },
      uHorizon: { value: color(golden.horizon) },
      uBelow: { value: color(golden.below) },
      uSunDirection: { value: sunDirection.clone() },
      uSunColor: { value: color(golden.sun) },
    },
  }) as SkyMaterial;
}

export function createCloudSeaMaterial(sunDirection: THREE.Vector3): CloudSeaMaterial {
  const { golden } = PALETTE;
  return new THREE.ShaderMaterial({
    name: "CloudSea",
    vertexShader: SEA_VERTEX,
    fragmentShader: SEA_FRAGMENT,
    uniforms: {
      uTime: { value: 0 },
      uLit: { value: color(golden.cloudLit) },
      uShade: { value: color(golden.cloudShade) },
      uHorizon: { value: color(golden.horizon) },
      uSunDirection: { value: sunDirection.clone() },
      uSunColor: { value: color(golden.sun) },
      uFadeNear: { value: 120 },
      uFadeFar: { value: 900 },
    },
  }) as CloudSeaMaterial;
}
