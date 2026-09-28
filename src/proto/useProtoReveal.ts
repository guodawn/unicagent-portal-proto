import { useEffect } from 'react';

/**
 * 原型滚动揭示（docs/07 §6）：
 * .reveal 进入视口（threshold 0.12）时加 .in，一次性 unobserve，与原型 JS 逐字等价。
 */
export function useProtoReveal(): void {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
