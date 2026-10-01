import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import type { SideContent } from '../../content';
import Link from '../Link';
import { Fade, SectionHead } from '../Reveal';

interface Props {
  side: SideContent;
}

/** Home "About": short intro first, "Load more" reveals the detail. */
const AboutTeaser: React.FC<Props> = ({ side }) => {
  const [open, setOpen] = useState(false);
  const a = side.about;
  return (
    <section className="section" id="about" style={{ paddingBottom: '3rem' }}>
      <div className="wrap">
        <SectionHead label="About" title={a.storyTitle} sub={a.story[0]} />
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="more"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ maxWidth: 680, margin: '2.5rem auto 0', color: 'var(--text-dim)', lineHeight: 1.8, display: 'grid', gap: '1.1rem', textAlign: 'center' }}>
                {a.story.slice(1).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="cols-4">
                {a.beliefs.map((b) => (
                  <div className="card" key={b.title} style={{ padding: '1.4rem' }}>
                    <h4>{b.title}</h4>
                    <p>{b.body}</p>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <Link to={`${side.path}/about`} className="btn btn-accent">
                  Read our full story <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <Fade style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button className="btn btn-ghost" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
            {open ? 'Show less' : 'Load more'}
            <ChevronDown size={16} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
          </button>
        </Fade>
      </div>
    </section>
  );
};

export default AboutTeaser;
