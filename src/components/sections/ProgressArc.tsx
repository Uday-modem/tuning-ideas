import React, { useRef } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import type { ProgressStep, SideContent } from '../../content';
import Icon from '../Icon';
import { SectionHead } from '../Reveal';

interface ItemProps {
  step: ProgressStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const ProgItem: React.FC<ItemProps> = ({ step, index, total, progress }) => {
  const w = 1 / total;
  const a = index * w;
  const b = (index + 1) * w;
  const first = index === 0;
  const last = index === total - 1;
  // enter from below -> hold -> exit upward. Windows are kept narrow so neighbouring stages barely overlap.
  // (first stage is visible from the start, the last one never exits)
  const input = [first ? -0.3 : a - 0.05 * w, first ? -0.2 : a + 0.3 * w, last ? 2 : b - 0.25 * w, last ? 3 : b + 0.05 * w];
  const y = useTransform(progress, input, [150, 0, 0, -150]);
  const opacity = useTransform(progress, input, [first ? 1 : 0, 1, 1, last ? 1 : 0]);
  const rotateX = useTransform(progress, input, [first ? 0 : 38, 0, 0, last ? 0 : -38]);
  const scale = useTransform(progress, input, [first ? 1 : 0.88, 1, 1, last ? 1 : 0.88]);

  return (
    <motion.div className="prog-item" style={{ x: '-50%', y, opacity, rotateX, scale, transformPerspective: 900 }}>
      <Icon name={step.icon} large />
      <h3>{step.title}</h3>
      <p>{step.body}</p>
    </motion.div>
  );
};

interface Props {
  side: SideContent;
}

// Hemisphere geometry in SVG space (viewBox 0 0 1000 300)
const CX = 500, CY = 270, RX = 480, RY = 250;

/**
 * Our progress: the page pins while a static dotted hemisphere stays in place and each stage
 * rises, holds, then moves up and away. A bead travels along the arc. After the last stage
 * the pin releases and the page continues.
 */
const ProgressArc: React.FC<Props> = ({ side }) => {
  const ref = useRef<HTMLDivElement>(null);
  const steps = side.progress.steps;
  const n = steps.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const bx = useTransform(scrollYProgress, (v) => CX + RX * Math.cos(Math.PI * (1 - Math.min(1, Math.max(0, v)))));
  const by = useTransform(scrollYProgress, (v) => CY - RY * Math.sin(Math.PI * (1 - Math.min(1, Math.max(0, v)))));

  const [active, setActive] = React.useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n))));
  });

  return (
    <section ref={ref} className="prog-track" id="progress" style={{ height: `${(n + 1) * 80}vh` }}>
      <div className="prog-sticky">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <SectionHead label={side.progress.label} title={side.progress.title} sub={side.progress.sub} />
        </div>
        <div className="prog-stage">
          <svg className="prog-arc" viewBox="0 0 1000 300" aria-hidden="true">
            <path d={`M ${CX - RX} ${CY} A ${RX} ${RY} 0 0 1 ${CX + RX} ${CY}`} fill="none" stroke="rgba(245,240,232,0.22)" strokeWidth="1.2" strokeDasharray="2 7" strokeLinecap="round" />
            <circle cx={CX - RX} cy={CY} r="4" fill="#f5f0e8" />
            <circle cx={CX + RX} cy={CY} r="4" fill="#f5f0e8" />
            <motion.circle cx={bx} cy={by} r="7" fill="rgb(var(--dot))" />
            <motion.circle cx={bx} cy={by} r="16" fill="rgba(var(--dot),0.18)" />
          </svg>
          {steps.map((s, i) => (
            <ProgItem key={s.title} step={s} index={i} total={n} progress={scrollYProgress} />
          ))}
        </div>
        <div className="prog-dots" aria-hidden="true">
          {steps.map((s, i) => (
            <i key={s.title} className={i <= active ? 'on' : ''} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgressArc;
