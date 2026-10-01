import React from 'react';
import { ArrowRight } from 'lucide-react';
import PixelField from '../PixelField';
import Link from '../Link';
import { WordReveal } from '../Reveal';

interface Props {
  title: string;
  sub: string;
  to: string;
  label: string;
}

/** Closing call-to-action with a pixel-dot glow (Niva "Get 20 hours back" band). */
const CtaBand: React.FC<Props> = ({ title, sub, to, label }) => (
  <section className="section-tight">
    <div className="wrap">
      <div className="card" style={{ padding: '4.5rem 1.5rem', textAlign: 'center', position: 'relative' }}>
        <PixelField variant="center" gap={8} className="hero-canvas" />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.1rem' }}>
          <WordReveal text={title} className="h-section" style={{ maxWidth: 700 }} />
          <p className="lede" style={{ margin: '0 auto' }}>{sub}</p>
          <Link to={to} className="btn btn-accent" style={{ marginTop: '0.6rem' }}>
            {label} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default CtaBand;
