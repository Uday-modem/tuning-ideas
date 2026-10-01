import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { SideContent } from '../content';
import { academicServices } from '../data/academicServices';
import Icon from '../components/Icon';
import Link from '../components/Link';
import PageHero from '../components/PageHero';
import { Fade, SectionHead } from '../components/Reveal';
import CtaBand from '../components/sections/CtaBand';

interface Props {
  side: SideContent;
}

/** Detail page: sticky icon on the left, long detail on the right (Niva Service page). */
const ServicesPage: React.FC<Props> = ({ side }) => {
  const s = side.services;
  return (
    <>
      <PageHero label={`Services · ${side.name}`} title={s.pageTitle} sub={s.pageSub} />

      <section className="section-tight">
        <div className="wrap">
          {s.items.map((it, i) => (
            <article className="svc-detail" key={it.id} id={it.id}>
              <div className="svc-detail-side">
                <div className="svc-detail-sticky">
                  <Icon name={it.icon} large />
                  <span className="aud-no" style={{ paddingTop: '0.4rem' }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
              </div>
              <div>
                <h2>{it.title}</h2>
                <p className="body">{it.short}</p>
                <h4>What’s included</h4>
                <ul>{it.included.map((x) => <li key={x}>{x}</li>)}</ul>
                <h4>Best for</h4>
                <p className="body">{it.bestFor}</p>
                <h4>Typical outcomes</h4>
                <ul>{it.outcomes.map((x) => <li key={x}>{x}</li>)}</ul>
                <h4>Example use cases</h4>
                <ul>{it.useCases.map((x) => <li key={x}>{x}</li>)}</ul>
                <Link to={`${side.path}/contact`} className="btn btn-ghost" style={{ marginTop: '1.8rem' }}>
                  {it.cta} <ArrowRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {side.key === 'lab' && (
        <section className="section-tight">
          <div className="wrap">
            <SectionHead label="Complete list" title={`All ${academicServices.length} deliverables.`} sub="Everything a Diploma, B.Tech, or M.Tech student can ask us for." />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginTop: '2.5rem' }}>
              {academicServices.map((a) => (
                <Fade key={a.id}>
                  <div className="card" style={{ padding: '1.2rem 1.3rem', display: 'flex', gap: '0.9rem', height: '100%' }}>
                    <span style={{ fontSize: '1.4rem' }} aria-hidden="true">{a.icon}</span>
                    <div>
                      <h4 style={{ fontSize: '0.98rem', marginBottom: '0.3rem', lineHeight: 1.25 }}>{a.title}</h4>
                      <p style={{ color: 'var(--text-dim)', fontSize: '0.84rem', lineHeight: 1.6 }}>{a.description}</p>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-tight">
        <div className="wrap">
          <SectionHead label="Not sure where to start?" title={s.matchTitle} />
          <Fade>
            <div className="match-table">
              <div className="match-row" style={{ color: 'var(--text-faint)', fontSize: '0.8rem' }}>
                <span>If you’re…</span>
                <span>Start with</span>
              </div>
              {s.match.map((m) => (
                <div className="match-row" key={m.need}>
                  <span>{m.need}</span>
                  <b>{m.start}</b>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      <CtaBand title={side.about.ctaTitle} sub={side.about.ctaSub} to={`${side.path}/contact`} label={side.key === 'digital' ? 'Start a project' : 'Get guidance'} />
    </>
  );
};

export default ServicesPage;
