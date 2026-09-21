import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    number: 1,
    title: 'Share Your Idea',
    description:
      'We understand your business, goal, customers, and required features before anything else.',
  },
  {
    number: 2,
    title: 'Plan & Design',
    description:
      'We prepare the structure, user flow, pages, and visual direction for your project.',
  },
  {
    number: 3,
    title: 'Build & Launch',
    description:
      'We develop, test, deploy, and make the website ready for real users and real business.',
  },
  {
    number: 4,
    title: 'Maintain & Grow',
    description:
      'We support updates, improvements, products, content, and technical maintenance ongoing.',
  },
];

const Process: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="process"
      ref={ref}
      style={{
        padding: '6rem 2rem',
        background: 'var(--charcoal)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="section-label"
            style={{ color: 'var(--copper-light)' }}
          >
            How We Work
          </span>
          <h2
            className="section-title"
            style={{ color: 'var(--ivory)' }}
          >
            Our Process
          </h2>
          <div
            className="divider"
            style={{ background: 'linear-gradient(90deg, var(--copper-light), transparent)' }}
          />
        </motion.div>

        {/* Desktop Timeline */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0',
            marginTop: '4rem',
            position: 'relative',
          }}
          className="process-desktop"
        >
          {/* Connector line */}
          <div
            style={{
              position: 'absolute',
              top: '2rem',
              left: '12.5%',
              right: '12.5%',
              height: 1,
              background:
                'linear-gradient(90deg, var(--copper), rgba(184,115,51,0.2), var(--copper))',
              pointerEvents: 'none',
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                padding: '0 1.5rem',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'var(--copper)',
                  color: 'white',
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '1.7rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.75rem',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: '0 0 0 6px rgba(184,115,51,0.15)',
                }}
              >
                {step.number}
              </div>
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: 'var(--copper-light)',
                  marginBottom: '0.75rem',
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: '0.87rem',
                  color: 'rgba(237,232,220,0.65)',
                  lineHeight: 1.75,
                }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile Vertical Timeline */}
        <div
          style={{ display: 'none', flexDirection: 'column', gap: '2rem', marginTop: '3rem' }}
          className="process-mobile"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: 'var(--copper)',
                  color: 'white',
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {step.number}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: 'var(--copper-light)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.87rem', color: 'rgba(237,232,220,0.65)', lineHeight: 1.75 }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-desktop { display: none !important; }
          .process-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  );
};

export default Process;
