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
 * 粒子/连线均为 rgba(124,58,237,α)，参数与原型逐字一致。
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

    const initStars = () => {
      W = cv.width = cv.offsetWidth;
      H = cv.height = cv.offsetHeight;
      const n = Math.min(90, Math.floor(W / 14));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        a: Math.random() * 0.5 + 0.3,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
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

    initStars();
    draw();
    window.addEventListener('resize', initStars);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', initStars);
    };
  }, []);

  return <canvas id="stars" ref={canvasRef} />;
};
