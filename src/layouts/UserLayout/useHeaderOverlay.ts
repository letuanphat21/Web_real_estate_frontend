import { useEffect, useState } from "react";

const HEADER_HEIGHT = 80;
const OVERLAY_SELECTOR = "[data-header-overlay]";

/**
 * Trang có hero toàn màn hình (đánh dấu bằng `data-header-overlay`) thì header nằm đè lên hero
 * và trong suốt cho tới khi cuộn qua hết hero. Trả về true khi header đang nằm trên hero.
 */
export default function useHeaderOverlay(enabled: boolean): boolean {
  const [overHero, setOverHero] = useState(true);
  const [wasEnabled, setWasEnabled] = useState(enabled);

  // Quay lại trang có hero (vd. từ trang khác về trang chủ) thì mặc định trong suốt ngay từ khung hình đầu
  if (enabled !== wasEnabled) {
    setWasEnabled(enabled);
    setOverHero(true);
  }

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const hero = document.querySelector(OVERLAY_SELECTOR);
      setOverHero(!!hero && hero.getBoundingClientRect().bottom > HEADER_HEIGHT);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [enabled]);

  return enabled && overHero;
}
