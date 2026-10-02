import React, { useEffect, useRef } from 'react';

export type FireworkPalette = 'orange' | 'green' | 'both';

const ORANGE = ['#d4924a', '#e0a566', '#ffd9a0', '#ffb865', '#ffffff'];
const GREEN = ['#9cc5a1', '#b3d6b7', '#d8f0da', '#7fd18b', '#ffffff'];

interface Props {
  palette: FireworkPalette;
  /** viewport-space centre of the winning message; fireworks burst around it */
  getCenter: () => { x: number; y: number };
  /** how long new rockets keep launching (ms) */
  duration?: number;
}

interface Rocket { sx: number; sy: number; tx: number; ty: number; t0: number; dur: number; color: string }
interface Spark { x: number; y: number; vx: number; vy: number; life: number; max: number; color: string; size: number; flash?: boolean }

/**
 * Small firework show drawn on a full-screen canvas (pointer-events: none).
 * Rockets climb to random points around the winning message, then burst into sparks that drag,
 * fall and fade with glowing trails. Colours follow the pillar: orange, green, or both.
 */
const Fireworks: React.FC<Props> = ({ palette, getCenter, duration = 6500 }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const all = palette === 'orange' ? ORANGE : palette === 'green' ? GREEN : [...ORANGE, ...GREEN];
    let w = 0, h = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const rockets: Rocket[] = [];
    const sparks: Spark[] = [];
    const start = performance.now();
    let last = start;
    let nextLaunch = start + 150;
    let raf = 0;

    const pick = () => all[Math.floor(Math.random() * all.length)];
    // "both" makes two-tone bursts: one orange, one green
    const twoTone = (): [string, string] =>
      palette === 'both'
        ? [ORANGE[Math.floor(Math.random() * 4)], GREEN[Math.floor(Math.random() * 4)]]
        : [pick(), pick()];

    const launch = (at: number) => {
      const c = getCenter();
      const tx = c.x + (Math.random() * 2 - 1) * Math.min(w * 0.42, 360);
      const ty = Math.max(60, c.y + (Math.random() * 2 - 1) * Math.min(h * 0.28, 210) - 30);
      rockets.push({
        sx: tx + (Math.random() * 2 - 1) * 50,
        sy: Math.min(h + 10, c.y + Math.min(h * 0.5, 340)),
        tx, ty, t0: at, dur: 520 + Math.random() * 260, color: pick(),
      });
    };

    const explode = (x: number, y: number) => {
      const [c1, c2] = twoTone();
      const n = reduce ? 14 : w < 600 ? 34 : 56;
      const ring = Math.random() < 0.4;
      for (let k = 0; k < n; k++) {
        const a = (k / n) * Math.PI * 2 + Math.random() * 0.15;
        const sp = ring ? 3.4 + Math.random() * 0.3 : 1.2 + Math.random() * 4.4;
        sparks.push({
          x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0,
          max: 900 + Math.random() * 700, color: k % 2 ? c1 : c2, size: 1.4 + Math.random() * 1.6,
        });
      }
      sparks.push({ x, y, vx: 0, vy: 0, life: 0, max: 260, color: '#ffffff', size: 5, flash: true });
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(50, now - last);
      last = now;
      const f = dt / 16.67;

      // fade previous frame -> glowing trails on a transparent canvas
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.22)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      if (now - start < duration - 1200 && now >= nextLaunch) {
        launch(now);
        if (Math.random() < 0.35) launch(now + 90);
        nextLaunch = now + 240 + Math.random() * 320;
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        const p = (now - r.t0) / r.dur;
        if (p < 0) continue;
        if (p >= 1) { explode(r.tx, r.ty); rockets.splice(i, 1); continue; }
        const e = 1 - Math.pow(1 - p, 2.2);
        ctx.globalAlpha = 1;
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.sx + (r.tx - r.sx) * e, r.sy + (r.ty - r.sy) * e, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life += dt;
        if (s.life >= s.max) { sparks.splice(i, 1); continue; }
        const drag = Math.pow(0.965, f);
        s.vx *= drag;
        s.vy = s.vy * drag + 0.055 * f;
        s.x += s.vx * f;
        s.y += s.vy * f;
        const a = 1 - s.life / s.max;
        ctx.globalAlpha = s.flash ? a * 0.35 : a * (0.6 + 0.4 * Math.random());
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.flash ? s.size * (1 + s.life / 90) : s.size * (a * 0.6 + 0.4), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [palette, getCenter, duration]);

  return <canvas ref={ref} className="fireworks" aria-hidden="true" />;
};

export default Fireworks;
