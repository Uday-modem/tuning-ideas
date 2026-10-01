import React from 'react';
import type { SideContent } from '../content';
import { founders } from '../content';
import PageHero from '../components/PageHero';
import { Fade, SectionHead } from '../components/Reveal';
import CtaBand from '../components/sections/CtaBand';

interface Props {
  side: SideContent;
}

const AboutPage: React.FC<Props> = ({ side }) => {
  const a = side.about;
  return (
    <>
      <PageHero label={`About · ${side.name}`} title={a.heroTitle} sub={a.heroSub} />

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          <SectionHead label={a.storyLabel} title={a.storyTitle} align="left" />
          <Fade>
            <div style={{ display: 'grid', gap: '1.2rem', color: 'var(--text-dim)', lineHeight: 1.85, fontSize: '1.02rem' }}>
              {a.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="rule" role="presentation" style={{ marginBottom: '4rem' }} />
          <Fade>
            <p className="big-quote">“{a.quote}”</p>
          </Fade>
          <div className="rule" role="presentation" style={{ marginTop: '4rem' }} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead label="Principles" title={a.beliefsTitle} />
          <div className="cols-4">
            {a.beliefs.map((b) => (
              <Fade key={b.title}>
                <div className="card" style={{ padding: '1.5rem', height: '100%' }}>
                  <h4>{b.title}</h4>
                  <p>{b.body}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <SectionHead label="The team" title="Small team. Direct access." sub="You work with the people who scope and build your project." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', maxWidth: 720, margin: '2.5rem auto 0' }}>
            {founders.map((f) => (
              <Fade key={f.name}>
                <div className="card founder">
                  <span className="av" aria-hidden="true">{f.initials}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{f.name}</div>
                    <div style={{ color: 'var(--text-dim)', fontSize: '0.86rem' }}>{f.role}</div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="stat-row">
            {a.stats.map((s) => (
              <Fade key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={a.ctaTitle} sub={a.ctaSub} to={`${side.path}/contact`} label={side.key === 'digital' ? 'Start a project' : 'Get guidance'} />
    </>
  );
};

export default AboutPage;
