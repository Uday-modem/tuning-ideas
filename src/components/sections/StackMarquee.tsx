import React from 'react';
import { stackSection } from '../../content';
import { SectionHead } from '../Reveal';

const Row: React.FC<{ items: string[]; reverse?: boolean }> = ({ items, reverse }) => {
  // list is doubled so the -50% translate loops seamlessly
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className={`marquee${reverse ? ' rev' : ''}`}>
      <div className="marquee-track">
        {loop.map((t, i) => (
          <span className="marquee-item" key={`${t}-${i}`} aria-hidden={i >= items.length}>
            <i />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

/** Our stack, connected: two marquee rows scrolling in opposite directions. */
const StackMarquee: React.FC = () => (
  <section className="section" id="stack" style={{ paddingTop: '3rem' }}>
    <div className="wrap">
      <SectionHead label={stackSection.label} title={stackSection.title} sub={stackSection.sub} />
    </div>
    <div style={{ marginTop: '3.5rem' }}>
      <Row items={stackSection.rows[0]} />
      <Row items={stackSection.rows[1]} reverse />
    </div>
  </section>
);

export default StackMarquee;
