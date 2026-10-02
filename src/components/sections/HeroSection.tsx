import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { SideContent } from '../../content';
import { useReady } from '../../hooks/useReady';
import PixelField from '../PixelField';
import Bubbles from '../Bubbles';
import Link from '../Link';
import { WordReveal } from '../Reveal';

interface Props {
  side: SideContent;
}

/** Side hero: random-pixel field + rotatable glass bubbles (Niva hero). */
const HeroSection: React.FC<Props> = ({ side }) => {
  const ready = useReady();
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <section className="hero" id="home">
      <PixelField variant="left" />
      <div className="hero-fade" />
      <div className="wrap hero-grid">
        <div data-lens-copy>
          <motion.span className="pill" {...fade(0.05)}>
            <span className="pill-dot" />
            {side.heroEyebrow}
          </motion.span>
          <div style={{ margin: '1.4rem 0 1.4rem' }}>
            <WordReveal as="h1" className="h-display" text={side.heroHeadline.join(' ')} immediate play={ready} delay={0.1} />
          </div>
          <motion.p className="lede" {...fade(0.5)}>
            {side.heroSub}
          </motion.p>
          <motion.div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '2rem' }} {...fade(0.65)}>
            <Link to={side.primary.to} className="btn btn-accent">
              {side.primary.label} <ArrowRight size={16} />
            </Link>
            <Link to={side.secondary.to} className="btn btn-ghost">
              {side.secondary.label}
            </Link>
          </motion.div>
        </div>
        <motion.div {...fade(0.3)}>
          <Bubbles
            winTitle={`Welcome to ${side.name}`}
            winText={side.welcome}
            fireworks={side.key === 'digital' ? 'orange' : 'green'}
            actions={[{ label: side.key === 'digital' ? 'Start a project' : 'Get guidance', to: `${side.path}/contact`, tone: side.key === 'digital' ? 'orange' : 'green' }]}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
