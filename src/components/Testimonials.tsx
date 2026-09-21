import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { testimonials } from '../data/testimonials';

const Testimonials: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="reviews" ref={ref} style={{ padding: '6rem 2rem', background: 'var(--ivory)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Client Feedback</span>
          <h2 className="section-title">What Clients Say</h2>
          <div className="divider" />
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem',
          }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              style={{
                background: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: '1.5rem',
                padding: '2rem',
                cursor: 'default',
                transition: 'transform 0.2s',
              }}
            >
              {/* Stars */}
              <div
                style={{
                  color: 'var(--copper)',
                  fontSize: '1rem',
                  letterSpacing: '3px',
                  marginBottom: '1.25rem',
                }}
              >
                ★★★★★
              </div>

              <blockquote
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '1.18rem',
                  fontStyle: 'italic',
                  color: 'var(--charcoal)',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                  borderLeft: 'none',
                  padding: 0,
                }}
              >
                "{t.quote}"
              </blockquote>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'var(--cream)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'var(--copper)',
                    flexShrink: 0,
                  }}
                >
                  {t.initial}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--charcoal)' }}>
                    {t.reviewer}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    {t.note}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
