import * as THREE from "three";

/**
 * Texture sinh bằng canvas 2D — không tải ảnh nào từ ngoài.
 * Dùng PRNG có seed để mọi lần tải trang cho ra cùng một hoạ tiết.
 */

function seededRandom(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function createCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context is not available");
  return { canvas, ctx };
}

function toTexture(canvas: HTMLCanvasElement, srgb: boolean, repeat: [number, number] = [1, 1]) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeat[0], repeat[1]);
  texture.anisotropy = 8;
  return texture;
}

/** Cụm mây mềm cho drei <Clouds> (nhận URL) — trả về data URL thay cho ảnh trên CDN. */
export function createCloudTextureUrl(): string {
  const size = 256;
  const { canvas, ctx } = createCanvas(size, size);
  const rand = seededRandom(7);
  const c = size / 2;
  for (let i = 0; i < 24; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = Math.pow(rand(), 0.7) * 48;
    const x = c + Math.cos(angle) * dist * 1.1;
    const y = c + Math.sin(angle) * dist * 0.75;
    const r = 30 + rand() * 28;
    // Phần đáy cụm mây hơi sẫm hơn để có cảm giác khối
    const shade = Math.round(255 - Math.max(0, (y - c) / 60) * 38);
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, `rgba(${shade},${shade},${shade},0.55)`);
    gradient.addColorStop(0.55, `rgba(${shade},${shade},${shade},0.22)`);
    gradient.addColorStop(1, `rgba(${shade},${shade},${shade},0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  return canvas.toDataURL("image/png");
}

/** Quầng sáng tròn cho đèn sân vườn (dùng với PointsMaterial, blending cộng). */
export function createGlowTexture(): THREE.Texture {
  const size = 128;
  const { canvas, ctx } = createCanvas(size, size);
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.18, "rgba(255,240,220,0.75)");
  gradient.addColorStop(0.45, "rgba(255,210,160,0.22)");
  gradient.addColorStop(1, "rgba(255,190,130,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return toTexture(canvas, true);
}

/** Đá travertine: vân ngang, lỗ rỗ và đường ron chia tấm ốp. */
export function createStoneTexture(): THREE.Texture {
  const w = 512;
  const h = 512;
  const { canvas, ctx } = createCanvas(w, h);
  const rand = seededRandom(21);
  ctx.fillStyle = "#d6c2a2";
  ctx.fillRect(0, 0, w, h);

  for (let y = 0; y < h; ) {
    const band = 3 + rand() * 18;
    const l = 0.86 + rand() * 0.22;
    ctx.fillStyle = `rgba(${Math.round(214 * l)},${Math.round(194 * l)},${Math.round(162 * l)},0.55)`;
    ctx.fillRect(0, y, w, band);
    y += band;
  }
  for (let i = 0; i < 900; i++) {
    ctx.fillStyle = `rgba(120,98,70,${0.12 + rand() * 0.25})`;
    ctx.fillRect(rand() * w, rand() * h, 2 + rand() * 9, 1 + rand() * 1.5);
  }
  ctx.fillStyle = "rgba(90,74,55,0.35)";
  for (let x = 0; x <= w; x += w / 4) ctx.fillRect(x - 1, 0, 2, h);
  for (let y = 0; y <= h; y += h / 3) ctx.fillRect(0, y - 1, w, 2);
  return toTexture(canvas, true);
}

/** Gỗ: thớ dọc theo trục v của UV. */
export function createWoodTexture(): THREE.Texture {
  const w = 256;
  const h = 512;
  const { canvas, ctx } = createCanvas(w, h);
  const rand = seededRandom(5);
  ctx.fillStyle = "#9a6a45";
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 140; i++) {
    const x = rand() * w;
    const dark = rand() > 0.5;
    ctx.strokeStyle = dark ? `rgba(70,42,24,${0.15 + rand() * 0.3})` : `rgba(196,150,108,${0.12 + rand() * 0.25})`;
    ctx.lineWidth = 0.6 + rand() * 2.2;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    for (let y = 0; y <= h; y += 32) ctx.lineTo(x + Math.sin(y * 0.02 + i) * 3 * rand(), y);
    ctx.stroke();
  }
  return toTexture(canvas, true);
}

/** Thảm cỏ: mảng màu loang và vệt cắt cỏ chéo rất nhẹ. */
export function createGrassTexture(): THREE.Texture {
  const size = 512;
  const { canvas, ctx } = createCanvas(size, size);
  const rand = seededRandom(13);
  ctx.fillStyle = "#7f9c56";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 260; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = 8 + rand() * 40;
    const light = rand() > 0.5;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, light ? "rgba(168,190,104,0.35)" : "rgba(78,104,52,0.35)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  ctx.save();
  ctx.translate(size / 2, size / 2);
  ctx.rotate(Math.PI / 5);
  for (let i = -12; i < 12; i++) {
    ctx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.035)";
    ctx.fillRect(i * 36, -size, 36, size * 2);
  }
  ctx.restore();
  for (let i = 0; i < 5000; i++) {
    ctx.fillStyle = rand() > 0.5 ? "rgba(60,84,40,0.25)" : "rgba(190,206,130,0.18)";
    ctx.fillRect(rand() * size, rand() * size, 1, 2);
  }
  return toTexture(canvas, true);
}

/** Normal map gợn sóng cho mặt nước hồ bơi — tần số nguyên nên lặp liền mạch. */
export function createWaterNormalTexture(): THREE.Texture {
  const size = 128;
  const { canvas, ctx } = createCanvas(size, size);
  const image = ctx.createImageData(size, size);
  const height = (x: number, y: number) => {
    const u = (x / size) * Math.PI * 2;
    const v = (y / size) * Math.PI * 2;
    return (
      Math.sin(u * 3 + v * 2) * 0.5 + Math.sin(u * 5 - v * 4 + 1.3) * 0.3 + Math.sin(-u * 2 + v * 7 + 2.1) * 0.2
    );
  };
  const strength = 2.2;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (height(x + 1, y) - height(x - 1, y)) * strength;
      const dy = (height(x, y + 1) - height(x, y - 1)) * strength;
      const len = Math.hypot(dx, dy, 1);
      const i = (y * size + x) * 4;
      image.data[i] = ((-dx / len) * 0.5 + 0.5) * 255;
      image.data[i + 1] = ((-dy / len) * 0.5 + 0.5) * 255;
      image.data[i + 2] = ((1 / len) * 0.5 + 0.5) * 255;
      image.data[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  return toTexture(canvas, false, [4, 1.2]);
}
