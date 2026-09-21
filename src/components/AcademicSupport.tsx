import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { academicServices } from '../data/academicServices';

const AcademicSupport: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="academic-support" ref={ref} style={{ padding: '6rem 2rem', background: 'var(--cream)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Complete Student Support</span>
          <h2 className="section-title">Final Year Project Services</h2>
          <div className="divider" />
          <p style={{ color: 'var(--text-mid)', maxWidth: 620, lineHeight: 1.8, fontSize: '1rem' }}>
            Everything a Diploma, B.Tech, or M.Tech student needs to take a project from selection to
            successful viva — all under one roof.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.1rem',
            marginTop: '3rem',
          }}
        >
          {academicServices.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              whileHover={{ y: -4, borderColor: 'var(--copper)' }}
              style={{
                background: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: '1.1rem',
                padding: '1.25rem 1.35rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.9rem',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 11,
                  background: 'var(--copper-pale)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  flexShrink: 0,
                }}
              >
                {service.icon}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--charcoal)',
                    marginBottom: '0.35rem',
                    lineHeight: 1.25,
                  }}
                >
                  {service.title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-mid)', lineHeight: 1.65 }}>
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          style={{
            marginTop: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
            background: 'var(--charcoal)',
            borderRadius: '1.25rem',
            padding: '2rem 2.25rem',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--ivory)',
                marginBottom: '0.4rem',
              }}
            >
              Ready to pick your final year project?
            </div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(245,240,232,0.7)', maxWidth: 460 }}>
              Talk to us about your branch, interests, and deadline — we'll recommend the right
              project and guide you through every step.
            </p>
          </div>
          <a href="#contact" className="btn-primary" style={{ background: 'var(--copper)', borderColor: 'var(--copper)' }}>
            Get Project Guidance
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AcademicSupport;
