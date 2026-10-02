import React from 'react';
import type { SideContent } from '../content';
import PageHero from '../components/PageHero';
import { Fade } from '../components/Reveal';
import CtaBand from '../components/sections/CtaBand';

interface Props { side: SideContent }

const ReviewsPage: React.FC<Props> = ({ side }) => (
  <>
    <PageHero label={`Reviews · ${side.name}`} title={side.reviews.title} sub={side.reviews.sub} />
    <section className="section-tight">
      <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '1.4rem' }}>
        {side.reviews.items.map((r) => (
          <Fade key={r.id}>
            <figure className="card" style={{ margin: 0, padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              <blockquote style={{ margin: 0, fontSize: '1.15rem', lineHeight: 1.55, letterSpacing: '-0.01em' }}>“{r.quote}”</blockquote>
              <figcaption style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginTop: 'auto' }}>
                <span className="rev-avatar" style={{ width: 44, height: 44, fontSize: '1rem' }} aria-hidden="true">{r.initial}</span>
                <span>
                  <span style={{ display: 'block', fontWeight: 600 }}>{r.name}</span>
                  <span style={{ color: 'var(--text-faint)', fontSize: '0.8rem' }}>{r.role}{r.sample ? ' · Sample review, replace later' : ''}</span>
                </span>
              </figcaption>
            </figure>
          </Fade>
        ))}
      </div>
    </section>
    <CtaBand title={side.about.ctaTitle} sub={side.about.ctaSub} to={`${side.path}/contact`} label={side.key === 'digital' ? 'Start a project' : 'Get guidance'} />
  </>
);

export default ReviewsPage;
