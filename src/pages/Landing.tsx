import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, GraduationCap } from 'lucide-react';
import { useReady } from '../hooks/useReady';
import PixelField from '../components/PixelField';
import Bubbles from '../components/Bubbles';
import Link from '../components/Link';
import { Fade, SectionHead, WordReveal } from '../components/Reveal';
import StackMarquee from '../components/sections/StackMarquee';

const COPPER = '#d4924a';
const GREEN = '#9cc5a1';

/** Brand landing: choose a pillar. Everything after this is pillar-specific. */
const Landing: React.FC = () => {
  const ready = useReady();
  const up = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <>
      <section className="hero">
        <PixelField variant="left" />
        <div className="hero-fade" />
        <div className="wrap hero-grid">
          <div>
            <motion.span className="pill" {...up(0.05)}>
              <span className="pill-dot" />
              Technology &amp; Product Company
            </motion.span>
            <div style={{ margin: '1.4rem 0' }}>
              <WordReveal as="h1" className="h-display" text="Ideas, built and finished." immediate play={ready} delay={0.1} />
            </div>
            <motion.p className="lede" {...up(0.45)}>
              Tuning Ideas turns ideas into working products. Choose your side: Digital Solutions for businesses, or Student Lab for engineering students.
            </motion.p>
            <motion.div className="pillar-choice" {...up(0.6)}>
              <Link to="/digital" className="pillar-card" style={{ ['--pc' as string]: COPPER } as React.CSSProperties}>
                <Code2 size={22} color={COPPER} />
                <h3>Digital Solutions</h3>
                <p>Websites, ecommerce, web apps, and ongoing support for businesses.</p>
                <span className="go">Enter <ArrowRight size={14} /></span>
              </Link>
              <Link to="/lab" className="pillar-card" style={{ ['--pc' as string]: GREEN } as React.CSSProperties}>
                <GraduationCap size={22} color={GREEN} />
                <h3>Student Lab</h3>
                <p>End-to-end project development and mentorship for Embedded, IoT, AI/ML, and full stack final year projects.</p>
                <span className="go">Enter <ArrowRight size={14} /></span>
              </Link>
            </motion.div>
          </div>
          <motion.div {...up(0.3)}>
            <Bubbles
              winTitle="You won!"
              winText="You popped them all. Now pick your side and let’s get to work."
              actions={[{ label: 'Digital Solutions', to: '/digital' }, { label: 'Student Lab', to: '/lab' }]}
            />
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '3rem' }}>
        <div className="wrap">
          <SectionHead label="How we’re organised" title="One company, two pillars." sub="Same team, same standards. Each pillar has its own services, work, and support." />
          <Fade delay={0.1} style={{ marginTop: '3.5rem' }}>
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
              <div className="card" style={{ padding: '1.4rem', textAlign: 'center', maxWidth: 340, margin: '0 auto' }}>
                <div style={{ fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>Tuning Ideas</div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.86rem' }}>Technology &amp; Product Company</div>
              </div>
              <svg viewBox="0 0 760 70" style={{ width: '100%', display: 'block' }} aria-hidden="true">
                <path d="M380 0 V28 M190 28 H570 M190 28 V70 M570 28 V70" stroke="rgba(245,240,232,0.3)" strokeWidth="1.2" strokeDasharray="3 5" fill="none" />
              </svg>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '1.2rem' }}>
                <Link to="/digital" className="card" style={{ padding: '1.6rem', display: 'block', borderColor: 'rgba(212,146,74,0.35)' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Digital Solutions</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.65 }}>About, services, work, and reviews for businesses that want websites, stores, and systems that keep working.</p>
                </Link>
                <Link to="/lab" className="card" style={{ padding: '1.6rem', display: 'block', borderColor: 'rgba(156,197,161,0.35)' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Student Lab</h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.65 }}>Project catalogue, mentorship, prototyping, and reviews for Diploma, B.Tech, and M.Tech students.</p>
                </Link>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      <StackMarquee />
    </>
  );
};

export default Landing;
