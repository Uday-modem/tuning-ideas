import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import Link from './Link';

interface Seed { x: number; y: number; z: number; r: number }

// Fixed, hand-tuned cluster so the layout always reads as "a bunch of bubbles" (like the Niva hero).
const CLUSTER: Seed[] = [
  { x: 0, y: 0, z: 0, r: 78 },
  { x: 118, y: -74, z: 40, r: 64 },
  { x: -112, y: -58, z: -30, r: 56 },
  { x: -34, y: -138, z: 60, r: 46 },
  { x: 160, y: 40, z: -50, r: 42 },
  { x: -150, y: 62, z: 30, r: 52 },
  { x: 40, y: 130, z: -30, r: 58 },
  { x: -70, y: 150, z: 70, r: 34 },
  { x: 100, y: -150, z: -60, r: 30 },
  { x: 186, y: -10, z: 70, r: 26 },
  { x: -190, y: -10, z: -60, r: 28 },
];

const PERSPECTIVE = 620;
const RESPAWN_MIN = 1200; // ms until a popped bubble comes back
const RESPAWN_MAX = 2000;
const WIN_VISIBLE_MS = 7000;

export interface BubbleAction { label: string; to: string }

interface Props {
  winTitle?: string;
  winText?: string;
  /** buttons shown in the win message */
  actions?: BubbleAction[];
}

const easeOutBack = (t: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

interface Proj { x: number; y: number; r: number; z: number }

/**
 * Interactive glass bubbles.
 *  • Drag (mouse or touch) to spin the cluster; it keeps inertia and idles with a slow spin.
 *  • Tap / click a bubble to pop it: a liquid splash (ring + droplets) bursts out, and the bubble
 *    re-forms in its place 1.2–2 s later.
 *  • Pop every bubble and a "You won" message appears with a call to action.
 * Everything is driven by one rAF loop and the Web Animations API, so it works the same on
 * mouse, touch and pen without React re-renders on every frame.
 */
const Bubbles: React.FC<Props> = ({
  winTitle = 'You won!',
  winText = 'Nice popping. Now let’s get to work.',
  actions = [],
}) => {
  const stage = useRef<HTMLDivElement>(null);
  const fx = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLDivElement | null)[]>([]);
  const [popped, setPopped] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let rotY = 0.4, rotX = -0.25;
    let velY = reduce ? 0 : 0.0035, velX = 0;
    let dragging = false;
    let lastX = 0, lastY = 0;
    let downT = 0, moved = 0;
    let raf = 0;

    const alive = CLUSTER.map(() => ({ on: true, t0: -1e9 }));
    const proj: Proj[] = CLUSTER.map(() => ({ x: 0, y: 0, r: 0, z: 0 }));
    const hit = new Set<number>();
    const timers: number[] = [];

    // ---------- splash effect ----------
    const burst = (cx: number, cy: number, r: number, small = false) => {
      const layer = fx.current;
      if (!layer || r <= 0) return;
      const ox = el.clientWidth / 2 + cx;
      const oy = el.clientHeight / 2 + cy;

      const ring = document.createElement('div');
      Object.assign(ring.style, {
        position: 'absolute', left: `${ox - r}px`, top: `${oy - r}px`, width: `${2 * r}px`, height: `${2 * r}px`,
        borderRadius: '50%', border: '2px solid rgba(255,255,255,0.85)', pointerEvents: 'none',
        boxShadow: '0 0 18px rgba(255,255,255,0.35), inset 0 0 14px rgba(255,255,255,0.25)',
      });
      layer.appendChild(ring);
      ring.animate(
        [{ transform: 'scale(0.7)', opacity: 0.95 }, { transform: 'scale(1.55)', opacity: 0 }],
        { duration: 520, easing: 'cubic-bezier(.2,.8,.3,1)' },
      ).onfinish = () => ring.remove();

      const wet = document.createElement('div');
      Object.assign(wet.style, {
        position: 'absolute', left: `${ox - r}px`, top: `${oy - r}px`, width: `${2 * r}px`, height: `${2 * r}px`,
        borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(var(--dot),0.28) 45%, transparent 70%)',
      });
      layer.appendChild(wet);
      wet.animate(
        [{ transform: 'scale(0.3)', opacity: 0.9 }, { transform: 'scale(1.35)', opacity: 0 }],
        { duration: 380, easing: 'ease-out' },
      ).onfinish = () => wet.remove();

      if (reduce) return;
      const count = small ? 7 : 12;
      const unit = Math.max(0.6, Math.min(1.3, r / 55));
      for (let k = 0; k < count; k++) {
        const a = (k / count) * Math.PI * 2 + Math.random() * 0.5;
        const dist = r * (0.9 + Math.random() * 0.9) + 14;
        const size = (3 + Math.random() * 8) * unit;
        const dx = Math.cos(a) * dist;
        const dy = Math.sin(a) * dist;
        const d = document.createElement('div');
        Object.assign(d.style, {
          position: 'absolute', left: `${ox - size / 2}px`, top: `${oy - size / 2}px`, width: `${size}px`, height: `${size}px`,
          borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle at 32% 28%, #fff 0, rgba(255,255,255,0.85) 18%, rgba(190,190,190,0.55) 55%, rgba(var(--dot),0.6) 100%)',
          boxShadow: 'inset 0 0 4px rgba(255,255,255,0.6), 0 2px 6px rgba(0,0,0,0.35)',
        });
        layer.appendChild(d);
        d.animate(
          [
            { transform: 'translate(0,0) scale(0.3)', opacity: 1 },
            { transform: `translate(${dx}px,${dy}px) scale(1)`, opacity: 1, offset: 0.55 },
            { transform: `translate(${dx * 1.08}px,${dy * 1.08 + 26}px) scale(0.2,0.5)`, opacity: 0 },
          ],
          { duration: 650 + Math.random() * 350, easing: 'cubic-bezier(.15,.7,.3,1)', fill: 'forwards' },
        ).onfinish = () => d.remove();
      }
    };

    // ---------- game logic ----------
    const win = () => {
      hit.clear();
      setPopped(0);
      setWon(true);
      CLUSTER.forEach((_, k) => {
        timers.push(window.setTimeout(() => burst(proj[k].x, proj[k].y, Math.max(proj[k].r, 22), true), k * 70));
      });
      timers.push(window.setTimeout(() => setWon(false), WIN_VISIBLE_MS));
    };

    const pop = (i: number) => {
      const p = proj[i];
      alive[i].on = false;
      burst(p.x, p.y, p.r);
      if ('vibrate' in navigator) navigator.vibrate(12);
      if (!hit.has(i)) {
        hit.add(i);
        setPopped(hit.size);
        if (hit.size === CLUSTER.length) win();
      }
      const delay = RESPAWN_MIN + Math.random() * (RESPAWN_MAX - RESPAWN_MIN);
      timers.push(window.setTimeout(() => { alive[i].on = true; alive[i].t0 = performance.now(); }, delay));
    };

    const tap = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left - rect.width / 2;
      const y = clientY - rect.top - rect.height / 2;
      let best = -1;
      let bestZ = -1e9;
      proj.forEach((p, i) => {
        if (!alive[i].on || p.r <= 2) return;
        if (Math.hypot(x - p.x, y - p.y) <= p.r * 1.08 && p.z > bestZ) { best = i; bestZ = p.z; }
      });
      if (best >= 0) pop(best);
    };

    // ---------- render loop ----------
    const render = (now: number) => {
      const scale = Math.min(1, el.clientWidth / 460);
      const cy = Math.cos(rotY), sy = Math.sin(rotY), cx = Math.cos(rotX), sx = Math.sin(rotX);
      CLUSTER.forEach((b, i) => {
        const n = nodes.current[i];
        if (!n) return;
        const x1 = b.x * cy + b.z * sy;
        const z1 = -b.x * sy + b.z * cy;
        const y2 = b.y * cx - z1 * sx;
        const z2 = b.y * sx + z1 * cx;
        const p = PERSPECTIVE / (PERSPECTIVE - z2);
        const m = alive[i].on ? easeOutBack(Math.min(1, Math.max(0, (now - alive[i].t0) / 520))) : 0;
        const size = b.r * 2 * p * scale * Math.max(0, m);
        proj[i].x = x1 * p * scale;
        proj[i].y = y2 * p * scale;
        proj[i].r = size / 2;
        proj[i].z = z2;
        if (size < 1) { n.style.visibility = 'hidden'; return; }
        n.style.visibility = 'visible';
        n.style.width = `${size}px`;
        n.style.height = `${size}px`;
        n.style.transform = `translate(calc(-50% + ${proj[i].x}px), calc(-50% + ${proj[i].y}px))`;
        n.style.zIndex = String(Math.round(z2 + 200));
        n.style.opacity = String(0.55 + Math.min(0.45, Math.max(0, (z2 + 90) / 220)));
      });
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!dragging) {
        rotY += velY; rotX += velX;
        velX *= 0.95;
        const idle = reduce ? 0 : 0.0035;
        velY += (idle - velY) * 0.02;
        rotX += (-0.25 - rotX) * 0.01;
      }
      render(now);
    };

    // ---------- pointer handling (drag to spin, tap to pop) ----------
    const down = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('[data-win]')) return; // let the win-card buttons work
      dragging = true; moved = 0; downT = performance.now();
      lastX = e.clientX; lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      moved += Math.abs(dx) + Math.abs(dy);
      rotY += dx * 0.008; rotX = Math.max(-1.1, Math.min(1.1, rotX - dy * 0.008));
      velY = dx * 0.008; velX = -dy * 0.008;
    };
    const end = (e: PointerEvent, allowTap: boolean) => {
      if (!dragging) return;
      dragging = false;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      if (allowTap && moved < 8 && performance.now() - downT < 450) tap(e.clientX, e.clientY);
    };
    const up = (e: PointerEvent) => end(e, true);
    const cancel = (e: PointerEvent) => end(e, false);

    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', cancel);
    render(performance.now());
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', cancel);
    };
  }, []);

  return (
    <div
      ref={stage}
      className="bubble-stage"
      role="group"
      aria-label="Interactive glass bubbles. Drag to spin them, tap a bubble to pop it."
    >
      {CLUSTER.map((_, i) => (
        <div
          key={i}
          className="bubble"
          ref={(n) => {
            nodes.current[i] = n;
          }}
        />
      ))}

      <div ref={fx} className="bubble-fx" aria-hidden="true" />

      {!won && (
        <div className="bubble-count" aria-hidden="true">
          {popped > 0 ? `Popped ${popped} / ${CLUSTER.length}` : 'Pop them all'}
        </div>
      )}
      <div className="bubble-hint" aria-hidden="true">Drag to spin · Tap to pop</div>

      <div className="win-layer">
        <AnimatePresence>
          {won && (
            <motion.div
              key="win"
              data-win
              className="win-card"
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, scale: 0.7, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 8 }}
              transition={{ type: 'spring', stiffness: 220, damping: 17 }}
            >
              <button className="win-x" onClick={() => setWon(false)} aria-label="Close message"><X size={14} /></button>
              <span className="win-badge" aria-hidden="true"><Sparkles size={18} /></span>
              <h3>{winTitle}</h3>
              <p>{winText}</p>
              {actions.length > 0 && (
                <div className="win-actions">
                  {actions.map((a) => (
                    <Link key={a.to} to={a.to} className="btn btn-accent btn-sm">{a.label}</Link>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Bubbles;
