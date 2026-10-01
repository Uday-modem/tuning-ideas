import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { SideContent } from '../content';
import Art from '../components/Art';
import Link from '../components/Link';
import PageHero from '../components/PageHero';
import { Fade, SectionHead } from '../components/Reveal';
import CtaBand from '../components/sections/CtaBand';

interface Props {
  side: SideContent;
  detail: string | null;
}

/** Work list with filter chips, or a case-study detail (Problem / Approach / Results) when `detail` is set. */
const WorkPage: React.FC<Props> = ({ side, detail }) => {
  const items = side.work.items;
  const filters = side.key === 'digital' ? ['All', 'Completed', 'Concept / Demo'] : ['All', 'ECE', 'CSE'];
  const [filter, setFilter] = useState('All');
  const cta = side.key === 'digital' ? 'Start a project' : 'Get guidance';

  const current = detail ? items.find((i) => i.id === detail) : null;

  if (detail && !current) {
    return (
      <section className="page-hero">
        <div className="wrap">
          <h1 className="h-section">That project wasn’t found.</h1>
          <p className="lede">It may have been renamed. Browse every project instead.</p>
          <Link to={`${side.path}/work`} className="btn btn-accent" style={{ marginTop: '1.5rem' }}>See all work</Link>
        </div>
      </section>
    );
  }

  if (current) {
    const related = items.filter((i) => i.id !== current.id).slice(0, 2);
    return (
      <>
        <PageHero label={`${current.kind} · ${current.status}`} title={current.headline} sub={current.summary}>
          <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.4rem' }}>
            {current.tech.map((t) => <span className="tag" key={t}>{t}</span>)}
          </div>
        </PageHero>
        <section className="section-tight">
          <div className="wrap">
            <Link to={`${side.path}/work`} className="btn btn-ghost btn-sm"><ArrowLeft size={14} /> All work</Link>
            <div className="case-art" style={{ height: 300, marginTop: '1.5rem', borderRadius: 20 }}><Art seed={current.seed} /></div>
            <div className="detail-grid"><h3>The problem</h3><p style={{ color: 'var(--text-dim)', lineHeight: 1.8, maxWidth: 640 }}>{current.problem}</p></div>
            <div className="detail-grid"><h3>The approach</h3><ul>{current.approach.map((a) => <li key={a}>{a}</li>)}</ul></div>
            <div className="detail-grid"><h3>The result</h3><ul>{current.results.map((a) => <li key={a}>{a}</li>)}</ul></div>
            {related.length > 0 && (
              <>
                <div className="rule" style={{ margin: '2rem 0 3rem' }} />
                <h3 style={{ fontSize: '1.6rem', textAlign: 'center' }}>Related work</h3>
                <div className="case-grid">
                  {related.map((r) => (
                    <Link key={r.id} to={`${side.path}/work/${r.id}`} className="card case-card">
                      <div className="case-art"><Art seed={r.seed} /></div>
                      <span className="tag accent" style={{ alignSelf: 'flex-start' }}>{r.status}</span>
                      <h3>{r.headline}</h3>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
        <CtaBand title={side.about.ctaTitle} sub={side.about.ctaSub} to={`${side.path}/contact`} label={cta} />
      </>
    );
  }

  const shown = items.filter((i) => filter === 'All' || i.status === filter || i.kind.startsWith(filter));
  return (
    <>
      <PageHero label={`Work · ${side.name}`} title={side.work.pageTitle} sub={side.work.pageSub} />
      <section className="section-tight">
        <div className="wrap">
          <div className="filter-row" role="group" aria-label="Filter work">
            {filters.map((f) => (
              <button key={f} className={`filter-chip${filter === f ? ' on' : ''}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <div className="case-grid">
            {shown.map((w) => (
              <Fade key={w.id}>
                <Link to={`${side.path}/work/${w.id}`} className="card case-card" style={{ display: 'flex', height: '100%' }}>
                  <div className="case-art"><Art seed={w.seed} /></div>
                  <div className="sw-meta"><span className="tag accent">{w.status}</span><span>{w.tag}</span></div>
                  <h3>{w.headline}</h3>
                  <p>{w.summary}</p>
                  <span style={{ marginTop: 'auto', color: 'var(--accent)', fontWeight: 600, fontSize: '0.85rem', display: 'inline-flex', gap: '0.4rem', alignItems: 'center' }}>Read details <ArrowRight size={14} /></span>
                </Link>
              </Fade>
            ))}
          </div>
          {side.key === 'lab' && (
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link to="/lab/projects" className="btn btn-accent">Open the full catalogue <ArrowRight size={16} /></Link>
            </div>
          )}
        </div>
      </section>
      <section className="section-tight">
        <div className="wrap"><SectionHead label="Honest labels" title="Concept work is always marked." sub="Status tags tell you what is delivered, what is a concept, and what is a title ready to build." /></div>
      </section>
      <CtaBand title={side.about.ctaTitle} sub={side.about.ctaSub} to={`${side.path}/contact`} label={cta} />
    </>
  );
};

export default WorkPage;
