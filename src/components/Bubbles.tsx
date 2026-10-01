import React, { useEffect, useRef } from 'react';

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

/**
 * Rotatable glass-bubble cluster. Drag (mouse or touch) to spin it; it keeps inertia and
 * slowly auto-rotates when idle. Positions are rotated in 3D and projected by hand
 * so we can update everything in one rAF loop without React re-renders.
 */
const Bubbles: React.FC = () => {
  const stage = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let rotY = 0.4, rotX = -0.25;
    let velY = reduce ? 0 : 0.0035, velX = 0;
    let dragging = false;
    let lastX = 0, lastY = 0;
    let raf = 0;

    const render = () => {
      const scale = Math.min(1, el.clientWidth / 460);
      const cy = Math.cos(rotY), sy = Math.sin(rotY), cx = Math.cos(rotX), sx = Math.sin(rotX);
      CLUSTER.forEach((b, i) => {
        const n = nodes.current[i];
        if (!n) return;
        // rotate around Y then X
        const x1 = b.x * cy + b.z * sy;
        const z1 = -b.x * sy + b.z * cy;
        const y2 = b.y * cx - z1 * sx;
        const z2 = b.y * sx + z1 * cx;
        const p = PERSPECTIVE / (PERSPECTIVE - z2);
        const size = b.r * 2 * p * scale;
        n.style.width = `${size}px`;
        n.style.height = `${size}px`;
        n.style.transform = `translate(calc(-50% + ${x1 * p * scale}px), calc(-50% + ${y2 * p * scale}px))`;
        n.style.zIndex = String(Math.round(z2 + 200));
        n.style.opacity = String(0.55 + Math.min(0.45, Math.max(0, (z2 + 90) / 220)));
      });
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!dragging) {
        rotY += velY; rotX += velX;
        velX *= 0.95;
        // ease velocity back to the gentle idle spin
        const idle = reduce ? 0 : 0.0035;
        velY += (idle - velY) * 0.02;
        rotX += (-0.25 - rotX) * 0.01;
      }
      render();
    };

    const down = (e: PointerEvent) => {
      dragging = true; lastX = e.clientX; lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      rotY += dx * 0.008; rotX = Math.max(-1.1, Math.min(1.1, rotX - dy * 0.008));
      velY = dx * 0.008; velX = -dy * 0.008;
    };
    const up = (e: PointerEvent) => {
      dragging = false;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    };

    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    render();
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
    };
  }, []);

  return (
    <div ref={stage} className="bubble-stage" role="img" aria-label="Rotatable glass bubbles. Drag to spin.">
      {CLUSTER.map((_, i) => (
        <div
          key={i}
          className="bubble"
          ref={(n) => {
            nodes.current[i] = n;
          }}
        />
      ))}
    </div>
  );
};

export default Bubbles;
