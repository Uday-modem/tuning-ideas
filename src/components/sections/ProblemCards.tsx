import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionStyle } from 'framer-motion';
import type { SideContent } from '../../content';
import { useIsMobile } from '../../hooks/useIsMobile';
import ScrollCard from '../ScrollCard';
import { SectionHead } from '../Reveal';

interface Props {
  side: SideContent;
}

/** Desktop: pinned; the left card slides out to the left, the right card to the right, the middle stays. */
const ProblemDesktop: React.FC<Props> = ({ side }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = scrollYProgress;

  const leftX = useTransform(p, [0.12, 0.62], ['107%', '0%']);
  const rightX = useTransform(p, [0.12, 0.62], ['-107%', '0%']);
  const leftRot = useTransform(p, [0.12, 0.62], [5, 0]);
  const rightRot = useTransform(p, [0.12, 0.62], [-5, 0]);
  const sideOpacity = useTransform(p, [0.1, 0.4], [0.35, 1]);
  const midScale = useTransform(p, [0.12, 0.62], [1.03, 1]);

  const { cards } = side.problem;
  const w = 'calc((100% - 3rem) / 3)';
  const pos = [0, 1, 2].map((i) => `calc(${w} * ${i} + 1.5rem * ${i})`);

  const card = (i: number, style: MotionStyle) => (
    <motion.div key={cards[i].title} className="pcard" style={{ left: pos[i], ...style }}>
      <div className="hex" aria-hidden="true">0{i + 1}</div>
      <h3>{cards[i].title}</h3>
      <p>{cards[i].body}</p>
    </motion.div>
  );

  return (
    <section className="problem-track" ref={ref} id="problem">
      <div className="problem-sticky">
        <div className="wrap">
          <SectionHead label={side.problem.label} title={side.problem.title} sub={side.problem.sub} />
        </div>
        <div className="wrap">
          <div className="problem-cards">
            {card(0, { x: leftX, rotate: leftRot, opacity: sideOpacity, zIndex: 1 })}
            {card(2, { x: rightX, rotate: rightRot, opacity: sideOpacity, zIndex: 1 })}
            {card(1, { scale: midScale, zIndex: 2 })}
          </div>
        </div>
      </div>
    </section>
  );
};

/** Mobile: no pinning. Cards stack and each one slides in from alternating sides as you scroll. */
const ProblemMobile: React.FC<Props> = ({ side }) => (
  <section className="section" id="problem" style={{ paddingBottom: '3rem' }}>
    <div className="wrap">
      <SectionHead label={side.problem.label} title={side.problem.title} sub={side.problem.sub} />
      <div className="problem-m">
        {side.problem.cards.map((c, i) => (
          <ScrollCard key={c.title} from={i % 2 === 0 ? 'left' : 'right'} tilt={0} className="pcard pcard-m">
            <div className="hex" aria-hidden="true">0{i + 1}</div>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </ScrollCard>
        ))}
      </div>
    </div>
  </section>
);

const ProblemCards: React.FC<Props> = ({ side }) => {
  const mobile = useIsMobile();
  return mobile ? <ProblemMobile side={side} /> : <ProblemDesktop side={side} />;
};

export default ProblemCards;
