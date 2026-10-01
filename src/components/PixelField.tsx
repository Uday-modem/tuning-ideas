import React, { useEffect, useRef } from 'react';

interface Props {
  /** 'left' = soft blob on the left edge (Niva hero), 'center' = centred glow, 'swirl' = diagonal bands (page heroes) */
  variant?: 'left' | 'center' | 'swirl';
  gap?: number;
  className?: string;
}

const LEVELS = 6;

/**
 * Random-pixel dot field. Every dot has its own twinkle phase and a few "pop" bright,
 * while soft drifting masks decide where dots are visible. The pointer lights up dots nearby.
 * Dot colour comes from the CSS variable --dot (rgb triplet) so each pillar gets its own tint.
 */
const PixelField: React.FC<Props> = ({ variant = 'left', gap = 7, className }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, cols = 0, rows = 0, dpr = 1;
    let seeds = new Float32Array(0);
    let rgb = '212,146,74';
    let raf = 0;
    let visible = true;
    let last = 0;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / gap); rows = Math.ceil(h / gap);
      seeds = new Float32Array(cols * rows);
      for (let i = 0; i < seeds.length; i++) seeds[i] = Math.random();
      const v = getComputedStyle(canvas).getPropertyValue('--dot').trim();
      if (v) rgb = v;
      draw(performance.now());
    };

    const mask = (x: number, y: number, t: number): number => {
      const nx = x / w, ny = y / h;
      let m = 0;
      if (variant === 'left') {
        const bx = 0.1 + 0.05 * Math.sin(t * 0.00031), by = 0.62 + 0.07 * Math.cos(t * 0.00027);
        const d = Math.hypot((nx - bx) * (w / h), ny - by);
        m = Math.max(0, 1 - d / 0.62) ** 1.7;
        const d2 = Math.hypot((nx - 0.95) * (w / h), ny - 1.0);
        m += 0.35 * Math.max(0, 1 - d2 / 0.4) ** 1.5;
      } else if (variant === 'center') {
        const d = Math.hypot((nx - 0.5) * (w / h), ny - 0.55 - 0.04 * Math.sin(t * 0.0004));
        m = Math.max(0, 1 - d / 0.55) ** 1.6;
      } else {
        const band = Math.sin((nx * 4.2 + ny * 2.4) + t * 0.0004);
        const band2 = Math.sin((nx * 2.1 - ny * 3.1) - t * 0.0003);
        m = Math.max(0, (band * 0.5 + band2 * 0.5) - 0.15) * (1 - Math.abs(ny - 0.5) * 1.1);
      }
      const dm = Math.hypot(x - mouse.x, y - mouse.y);
      if (dm < 130) m += (1 - dm / 130) ** 2 * 0.9;
      return Math.min(1, m);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const buckets: number[][] = Array.from({ length: LEVELS }, () => []);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const x = c * gap, y = r * gap;
          const m = mask(x, y, t);
          if (m < 0.04) continue;
          const s = seeds[i];
          let tw = 0.55 + 0.45 * Math.sin(t * 0.0021 * (0.4 + s * 1.8) + s * 60);
          if ((t * 0.0008 + s * 13) % 1 < 0.035) tw = 1.4; // random "pop"
          const a = Math.min(1, m * tw);
          const lvl = Math.min(LEVELS - 1, Math.floor(a * LEVELS));
          buckets[lvl].push(x, y);
        }
      }
      const dot = Math.max(1.6, gap * 0.3);
      for (let l = 0; l < LEVELS; l++) {
        const pts = buckets[l];
        if (!pts.length) continue;
        ctx.fillStyle = `rgba(${rgb},${((l + 1) / LEVELS) * 0.85})`;
        ctx.beginPath();
        for (let k = 0; k < pts.length; k += 2) ctx.rect(pts[k], pts[k + 1], dot, dot);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || t - last < 33) return; // ~30fps
      last = t;
      draw(t);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    if (!reduce) {
      window.addEventListener('pointermove', onMove, { passive: true });
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, [variant, gap]);

  return <canvas ref={ref} className={className ?? 'hero-canvas'} aria-hidden="true" />;
};

export default PixelField;
