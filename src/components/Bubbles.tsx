import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Fireworks from './Fireworks';
import type { FireworkPalette } from './Fireworks';
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

// --- pop game ---
const RESPAWN_MIN = 3000; // ms until a popped bubble re-forms (base)
const RESPAWN_MAX = 4500;
const COMBO_MS = 450; // every new pop pushes all waiting bubbles back by this much, so a fast player can clear the screen
const WIN_VISIBLE_MS = 7500; // length of the win show; bubbles stay away until it ends

// --- magnifier bubble ---
const GRAB_DELAY = 200; // hold this long on a bubble (without moving) and it becomes a lens
const MOVE_SLOP = 8; // px of movement that turns a press into a drag
const LENS_SCALE = 1.8; // magnification of the text seen through the bubble
const HOLD_MS = 2600; // a released lens stays where you left it this long, then floats home
const RETURN_MS = 800;

export interface BubbleAction { label: string; to: string; tone?: 'orange' | 'green' }

interface Props {
  winTitle?: string;
  winText?: string;
  /** buttons shown under the win message */
  actions?: BubbleAction[];
  /** firework colours: orange (Digital), green (Student Lab) or both (landing) */
  fireworks?: FireworkPalette;
}

const easeOutBack = (t: number): number => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const easeInOut = (k: number): number => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
const clamp = (v: number, a: number, b: number): number => Math.min(b, Math.max(a, v));

interface Proj { x: number; y: number; r: number; z: number }

/** A bubble that has been picked up: viewport-space centre (x, y), radius r, plus its magnifier layer. */
interface Free {
  x: number; y: number; r: number;
  tx: number; ty: number;
  mode: 'drag' | 'hold' | 'return';
  t: number;
  fromX: number; fromY: number; fromR: number;
  view: HTMLDivElement | null;
}

interface Grab {
  i: number;
  startX: number; startY: number;
  px: number; py: number;
  started: boolean;
  touchLike: boolean;
  timer: number;
}

/**
 * Interactive glass bubbles.
 *  • Drag empty space to spin the cluster (inertia + slow idle spin).
 *  • Tap a bubble to pop it: liquid splash, and it re-forms a few seconds later.
 *  • Hold / drag a bubble to pick it up. It becomes a water-bubble MAGNIFIER you can move anywhere
 *    inside the hero section; text under it is shown magnified through the bubble. On touch screens
 *    the bubble floats above your fingertip so your finger never hides what you are reading.
 *    Let go and it stays a moment, then floats back to its place.
 *  • Clear the whole screen (all bubbles popped before the first returns) and a free-floating
 *    welcome message appears with fireworks in the pillar's colours. No bubbles come back until the
 *    show ends (auto, or "Play again").
 * One rAF loop + Web Animations API, no per-frame React renders. Works with mouse, touch and pen.
 */
const Bubbles: React.FC<Props> = ({
  winTitle = 'Welcome',
  winText = '',
  actions = [],
  fireworks = 'both',
}) => {
  const stage = useRef<HTMLDivElement>(null);
  const fx = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLDivElement | null)[]>([]);
  const [left, setLeft] = useState(CLUSTER.length);
  const [won, setWon] = useState(false);
  const endWinRef = useRef<() => void>(() => {});
  const getCenter = useCallback(() => {
    const r = stage.current?.getBoundingClientRect();
    return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  }, []);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const hero = el.closest('.hero') as HTMLElement | null;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let rotY = 0.4, rotX = -0.25;
    let velY = reduce ? 0 : 0.0035, velX = 0;
    let dragging = false; // rotating the cluster
    let lastX = 0, lastY = 0;
    let grab: Grab | null = null; // holding a bubble
    let winActive = false;
    let winTimer = 0;
    let raf = 0;

    const alive = CLUSTER.map(() => ({ on: true, t0: -1e9 }));
    const due = CLUSTER.map(() => 0); // respawn deadlines (ms, 0 = none)
    const proj: Proj[] = CLUSTER.map(() => ({ x: 0, y: 0, r: 0, z: 0 }));
    const free: (Free | null)[] = CLUSTER.map(() => null);
    let colEl: HTMLElement | null = null;

    const lensR = () => Math.max(52, Math.min(70, window.innerWidth * 0.16));
    const bounds = () => (hero ? hero.getBoundingClientRect() : { left: 0, right: window.innerWidth, top: 0, bottom: window.innerHeight });

    // ---------- splash effect ----------
    const burst = (cx: number, cy: number, r: number) => {
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
      const unit = Math.max(0.6, Math.min(1.3, r / 55));
      for (let k = 0; k < 12; k++) {
        const a = (k / 12) * Math.PI * 2 + Math.random() * 0.5;
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

    // ---------- magnifier lens ----------
    const endLens = (i: number) => {
      const f = free[i];
      if (!f) return;
      f.view?.remove();
      nodes.current[i]?.classList.remove('lens');
      free[i] = null;
    };

    // where the picked-up bubble wants to be: under the pointer (lifted above a fingertip on touch),
    // kept inside the hero section
    const setTarget = (g: Grab) => {
      const f = free[g.i];
      if (!f) return;
      const R = lensR();
      const lift = g.touchLike ? -(R + 34) : 0;
      const b = bounds();
      f.tx = clamp(g.px, b.left + R, b.right - R);
      f.ty = clamp(g.py + lift, b.top + R, b.bottom - R);
    };

    const startLens = (g: Grab) => {
      const i = g.i;
      const existing = free[i];
      if (existing) { existing.mode = 'drag'; g.started = true; setTarget(g); return; }
      const node = nodes.current[i];
      if (!node) return;
      const rect = el.getBoundingClientRect();
      const f: Free = {
        x: rect.left + rect.width / 2 + proj[i].x, y: rect.top + rect.height / 2 + proj[i].y, r: proj[i].r,
        tx: 0, ty: 0, mode: 'drag', t: 0, fromX: 0, fromY: 0, fromR: 0, view: null,
      };
      colEl = hero ? (hero.querySelector('[data-lens-copy]') as HTMLElement | null) : null;
      if (colEl) {
        const cr = colEl.getBoundingClientRect();
        const view = document.createElement('div');
        view.className = 'lens-view';
        view.style.width = `${cr.width}px`;
        view.style.height = `${cr.height}px`;
        const clone = colEl.cloneNode(true) as HTMLElement;
        clone.removeAttribute('data-lens-copy');
        clone.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
        clone.setAttribute('aria-hidden', 'true');
        clone.setAttribute('inert', '');
        clone.style.width = '100%';
        view.appendChild(clone);
        node.appendChild(view);
        f.view = view;
      }
      node.classList.add('lens');
      free[i] = f;
      g.started = true;
      setTarget(g);
      if ('vibrate' in navigator) navigator.vibrate(8);
    };

    // ---------- game logic ----------
    const countAlive = () => alive.filter((x) => x.on).length;

    // bubbles re-form one after another once the win show is over
    const endWin = () => {
      window.clearTimeout(winTimer);
      winActive = false;
      setWon(false);
      const now = performance.now();
      alive.forEach((a, k) => { a.on = true; a.t0 = now + k * 90; });
      due.fill(0);
      setLeft(CLUSTER.length);
    };
    endWinRef.current = endWin;

    // every bubble is gone: stop respawns, show the welcome text + fireworks, keep the screen empty
    const win = () => {
      winActive = true;
      due.fill(0);
      setWon(true);
      winTimer = window.setTimeout(endWin, WIN_VISIBLE_MS);
    };

    const pop = (i: number) => {
      const p = proj[i];
      burst(p.x, p.y, p.r);
      endLens(i);
      alive[i].on = false;
      if ('vibrate' in navigator) navigator.vibrate(12);
      setLeft(countAlive());
      if (countAlive() === 0) { win(); return; }
      // combo: each pop gives every waiting bubble a little more time away
      due.forEach((d, k) => { if (d) due[k] = d + COMBO_MS; });
      due[i] = performance.now() + RESPAWN_MIN + Math.random() * (RESPAWN_MAX - RESPAWN_MIN);
    };

    const hitAt = (clientX: number, clientY: number): number => {
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left - rect.width / 2;
      const y = clientY - rect.top - rect.height / 2;
      let best = -1;
      let bestZ = -1e9;
      proj.forEach((p, i) => {
        if (!alive[i].on || p.r <= 2) return;
        if (Math.hypot(x - p.x, y - p.y) <= p.r * 1.08 && p.z > bestZ) { best = i; bestZ = p.z; }
      });
      return best;
    };

    // ---------- render loop ----------
    const render = (now: number) => {
      const sr = el.getBoundingClientRect();
      const scx = sr.left + sr.width / 2;
      const scy = sr.top + sr.height / 2;
      const scale = Math.min(1, el.clientWidth / 460);
      const R = lensR();
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
        const px = x1 * p * scale;
        const py = y2 * p * scale;

        let f = free[i];
        if (f && !alive[i].on) { endLens(i); f = null; }

        if (f) {
          let fade = 1;
          if (f.mode === 'drag') {
            f.x += (f.tx - f.x) * 0.35;
            f.y += (f.ty - f.y) * 0.35;
            f.r += (R - f.r) * 0.25;
          } else if (f.mode === 'hold') {
            f.r += (R - f.r) * 0.25;
            if (now - f.t > HOLD_MS) { f.mode = 'return'; f.t = now; f.fromX = f.x; f.fromY = f.y; f.fromR = f.r; }
          }
          if (f.mode === 'return') {
            const k = clamp((now - f.t) / RETURN_MS, 0, 1);
            const e = easeInOut(k);
            f.x = f.fromX + (scx + px - f.fromX) * e;
            f.y = f.fromY + (scy + py - f.fromY) * e;
            f.r = f.fromR + (size / 2 - f.fromR) * e;
            fade = 1 - k;
            if (k >= 1) { endLens(i); f = null; }
          }
          if (f) {
            proj[i].x = f.x - scx; proj[i].y = f.y - scy; proj[i].r = f.r; proj[i].z = 900;
            n.style.visibility = 'visible';
            n.style.width = `${f.r * 2}px`;
            n.style.height = `${f.r * 2}px`;
            n.style.transform = `translate(calc(-50% + ${proj[i].x}px), calc(-50% + ${proj[i].y}px))`;
            n.style.zIndex = '900';
            n.style.opacity = '1';
            if (f.view && colEl) {
              // lens maths: the point of the page under the bubble centre is shown at LENS_SCALE
              const cr = colEl.getBoundingClientRect();
              f.view.style.transform = `translate(${f.r + (cr.left - f.x) * LENS_SCALE}px, ${f.r + (cr.top - f.y) * LENS_SCALE}px) scale(${LENS_SCALE})`;
              f.view.style.opacity = String(fade);
            }
            return;
          }
        }

        proj[i].x = px; proj[i].y = py; proj[i].r = size / 2; proj[i].z = z2;
        if (size < 1) { n.style.visibility = 'hidden'; return; }
        n.style.visibility = 'visible';
        n.style.width = `${size}px`;
        n.style.height = `${size}px`;
        n.style.transform = `translate(calc(-50% + ${px}px), calc(-50% + ${py}px))`;
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
      if (!winActive) {
        let changed = false;
        for (let i = 0; i < CLUSTER.length; i++) {
          if (!alive[i].on && due[i] && now >= due[i]) { alive[i].on = true; alive[i].t0 = now; due[i] = 0; changed = true; }
        }
        if (changed) setLeft(countAlive());
      }
      render(now);
    };

    // ---------- pointer handling ----------
    // press a bubble: tap = pop, hold or drag = pick it up as a magnifier.
    // press empty space: drag = spin the cluster.
    const down = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('[data-win]')) return; // let the win-text buttons work
      el.setPointerCapture(e.pointerId);
      const hit = hitAt(e.clientX, e.clientY);
      if (hit >= 0) {
        const g: Grab = { i: hit, startX: e.clientX, startY: e.clientY, px: e.clientX, py: e.clientY, started: false, touchLike: e.pointerType !== 'mouse', timer: 0 };
        g.timer = window.setTimeout(() => { if (grab === g && !g.started) startLens(g); }, GRAB_DELAY);
        grab = g;
        return;
      }
      dragging = true;
      lastX = e.clientX; lastY = e.clientY;
    };
    const move = (e: PointerEvent) => {
      if (grab) {
        grab.px = e.clientX; grab.py = e.clientY;
        if (!grab.started && Math.hypot(e.clientX - grab.startX, e.clientY - grab.startY) > MOVE_SLOP) startLens(grab);
        if (grab.started) setTarget(grab);
        return;
      }
      if (!dragging) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      rotY += dx * 0.008; rotX = clamp(rotX - dy * 0.008, -1.1, 1.1);
      velY = dx * 0.008; velX = -dy * 0.008;
    };
    const finish = (e: PointerEvent, allowTap: boolean) => {
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      if (grab) {
        const g = grab;
        grab = null;
        window.clearTimeout(g.timer);
        const f = free[g.i];
        if (g.started) { if (f) { f.mode = 'hold'; f.t = performance.now(); } }
        else if (allowTap && alive[g.i].on) pop(g.i);
        return;
      }
      dragging = false;
    };
    const up = (e: PointerEvent) => finish(e, true);
    const cancel = (e: PointerEvent) => finish(e, false);

    // on touch screens, stop the page scrolling when a finger lands on a bubble
    const touchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t || (e.target as HTMLElement).closest('[data-win]')) return;
      if (hitAt(t.clientX, t.clientY) >= 0) e.preventDefault();
    };

    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', cancel);
    el.addEventListener('touchstart', touchStart, { passive: false });
    render(performance.now());
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(winTimer);
      if (grab) window.clearTimeout(grab.timer);
      CLUSTER.forEach((_, i) => endLens(i));
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', cancel);
      el.removeEventListener('touchstart', touchStart);
    };
  }, []);

  return (
    <div
      ref={stage}
      className="bubble-stage"
      role="group"
      aria-label="Interactive glass bubbles. Tap a bubble to pop it. Hold and drag a bubble to use it as a magnifier. Drag empty space to spin them."
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
          {left === CLUSTER.length ? 'Pop them all' : `${left} left`}
        </div>
      )}
      <div className="bubble-hint" aria-hidden="true">Tap to pop · Hold &amp; drag to magnify</div>

      <div className="win-layer">
        <AnimatePresence>
          {won && (
            <motion.div
              key="win"
              data-win
              className={`win-text${fireworks === 'both' ? ' both' : ''}`}
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.25 }}
            >
              <h3>{winTitle}</h3>
              {winText && <p>{winText}</p>}
              {actions.length > 0 && (
                <div className="win-actions">
                  {actions.map((a) => (
                    <Link key={a.to} to={a.to} className={`btn btn-sm ${a.tone === 'orange' ? 'btn-orange' : a.tone === 'green' ? 'btn-green' : 'btn-accent'}`}>{a.label}</Link>
                  ))}
                </div>
              )}
              <button className="win-again" onClick={() => endWinRef.current()}>Play again</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {won && createPortal(<Fireworks palette={fireworks} getCenter={getCenter} duration={WIN_VISIBLE_MS - 800} />, document.body)}
    </div>
  );
};

export default Bubbles;
