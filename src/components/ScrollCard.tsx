import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  /** which side the card comes in from */
  from: 'left' | 'right';
  /** degrees of tilt at the start; 0 = slide only */
  tilt?: number;
  className?: string;
}

/**
 * Mobile card: slides in from the side (and un-rotates into place) while you scroll.
 * It is scroll-linked, not a one-shot animation, so it also plays backwards when you scroll up,
 * the same feel as the pinned "Our progress" section.
 */
const ScrollCard: React.FC<Props> = ({ children, from, tilt = 8, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 98%', 'start 58%'] });
  const dir = from === 'left' ? -1 : 1;
  const x = useTransform(scrollYProgress, [0, 1], [`${dir * 40}%`, '0%']);
  const rotate = useTransform(scrollYProgress, [0, 1], [dir * tilt, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  return (
    <motion.div ref={ref} className={className} style={{ x, rotate, opacity }}>
      {children}
    </motion.div>
  );
};

export default ScrollCard;
