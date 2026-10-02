import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import type { SideContent } from '../../content';
import { SectionHead } from '../Reveal';
import Link from '../Link';

interface Props {
  side: SideContent;
  /** digital home: "Load more" reveals every review with its details */
  expandable?: boolean;
}

const ReviewsCarousel: React.FC<Props> = ({ side, expandable = false }) => {
  const items = side.reviews.items;
  const [i, setI] = useState(0);
  const [all, setAll] = useState(false);
  const cur = items[i];
  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);

  return (
    <section className="section" id="reviews">
      <div className="wrap">
        <SectionHead label={side.reviews.label} title={side.reviews.title} sub={side.reviews.sub} />

        <div className="rev-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={cur.id}
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
              transition={{ duration: 0.35 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.3rem' }}
            >
              <div className="rev-avatar" aria-hidden="true">{cur.initial}</div>
              <p className="rev-quote">“{cur.quote}”</p>
              <div>
                <div style={{ fontWeight: 600 }}>{cur.name}</div>
                <div style={{ color: 'var(--text-faint)', fontSize: '0.84rem' }}>
                  {cur.role}
                  {cur.sample ? ' · Sample review, replace later' : ''}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div style={{ display: 'flex', gap: '0.7rem' }}>
            <button className="round-btn" onClick={() => go(-1)} aria-label="Previous review"><ArrowLeft size={18} /></button>
            <button className="round-btn" onClick={() => go(1)} aria-label="Next review"><ArrowRight size={18} /></button>
          </div>
        </div>

        {expandable && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            {!all ? (
              <button className="btn btn-ghost" onClick={() => setAll(true)}>
                Load more <ChevronDown size={16} />
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'left' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '1.2rem' }}>
                  {items.map((r) => (
                    <div className="card" key={r.id} style={{ padding: '1.6rem' }}>
                      <p style={{ lineHeight: 1.6, marginBottom: '1.1rem' }}>“{r.quote}”</p>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{r.name}</div>
                      <div style={{ color: 'var(--text-faint)', fontSize: '0.8rem' }}>{r.role} · Sample review</div>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '1.8rem' }}>
                  <Link to={`${side.path}/reviews`} className="btn btn-accent">
                    Read all reviews <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsCarousel;
