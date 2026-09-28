import React, { useEffect, useRef } from 'react';

interface StarPoint {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
}

/**
 * 原型英雄区粒子星空（docs/07 §6）：
 * 粒子数 min(90, floor(W/14))，连线阈值 d²<14000，
 * 以时间驱动连接点缓慢漂移，让背景连线持续平滑变化。
 */
export const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let pts: StarPoint[] = [];
    let raf = 0;
    let lastTime: number | undefined;
    const initStars = () => {
      W = cv.width = cv.offsetWidth;
      H = cv.height = cv.offsetHeight;
      const n = Math.min(90, Math.floor(W / 14));
      pts = Array.from({ length: n }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 3;
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.6 + 0.4,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          a: Math.random() * 0.5 + 0.3,
        };
      });
    };

    const draw = (time: number) => {
      // 秒为单位，并限制恢复后台页面后的时间差，避免突然跳动。
      const elapsed = lastTime === undefined ? 0 : Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx * elapsed;
        p.y += p.vy * elapsed;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fillStyle = `rgba(124,58,237,${p.a})`;
        ctx.fill();
      }
      // 连线
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = dx * dx + dy * dy;
          if (d < 14000) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(124,58,237,${0.12 * (1 - d / 14000)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const restart = () => {
      cancelAnimationFrame(raf);
      lastTime = undefined;
      draw(performance.now());
    };
    const resize = () => {
      initStars();
      restart();
    };

    resize();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas id="stars" ref={canvasRef} />;
};
