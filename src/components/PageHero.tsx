import React from 'react';
import PixelField from './PixelField';
import { WordReveal } from './Reveal';

interface Props {
  label: string;
  title: string;
  sub?: string;
  children?: React.ReactNode;
}

/** Inner-page hero: pixel swirl + blur-in title (Niva About / Service hero). */
const PageHero: React.FC<Props> = ({ label, title, sub, children }) => (
  <section className="page-hero">
    <PixelField variant="swirl" gap={8} />
    <div className="hero-fade" />
    <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
      <span className="pill"><span className="pill-dot" />{label}</span>
      <div style={{ margin: '1.4rem auto 0', maxWidth: 860 }}>
        <WordReveal as="h1" text={title} className="h-display" immediate />
      </div>
      {sub && <p className="lede">{sub}</p>}
      {children}
    </div>
  </section>
);

export default PageHero;
