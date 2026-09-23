import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const missionCards = [
  { icon: '⚙️', text: 'Build practical web solutions for real businesses' },
  { icon: '🎓', text: 'Guide Diploma, B.Tech & M.Tech students through final year projects' },
  { icon: '📈', text: 'Help businesses grow digitally at every stage' },
  { icon: '🤝', text: 'Maintain long-term client & student relationships' },
  { icon: '💬', text: 'Provide reliable support after delivery' },
  { icon: '📄', text: 'Deliver reports, papers, and viva-ready presentations' },
];

const About: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: '6rem 2rem',
        background: 'var(--cream)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'center',
          }}
          className="about-grid"
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">Who We Are</span>
            <h2 className="section-title">About Tuning Ideas</h2>
            <div className="divider" />

            <p style={{ color: 'var(--text-mid)', lineHeight: 1.9, marginBottom: '1.25rem', fontSize: '0.97rem' }}>
              Tuning Ideas is a full stack development and digital solutions brand founded to help
              businesses move from simple online presence to powerful digital systems. We work with
              entrepreneurs, local businesses, boutiques, institutions, and service providers to
              convert ideas into clean, scalable, and user-friendly web applications.
            </p>
            <p style={{ color: 'var(--text-mid)', lineHeight: 1.9, marginBottom: '1.25rem', fontSize: '0.97rem' }}>
              Alongside client work, we run a dedicated Academic Projects division supporting
              Diploma, B.Tech, and M.Tech students with 274+ Embedded Systems, IoT, AI/ML,
              Robotics, Deep Learning, and Full Stack Development project titles across ECE and
              CSE — plus abstracts, source code, reports, IEEE papers, and viva guidance from
              start to finish.
            </p>
            <p style={{ color: 'var(--text-mid)', lineHeight: 1.9, marginBottom: '2rem', fontSize: '0.97rem' }}>
              We take a practical, first-principles approach — understanding your goals before
              writing a single line of code. Every solution we deliver is built to work for your
              real customers, your real curriculum, and your real deadlines.
            </p>

            {/* Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                marginBottom: '1.5rem',
              }}
            >
              {[
                { value: '274+', label: 'Project Titles' },
                { value: '2', label: 'Departments' },
                { value: '3', label: 'Academic Levels' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: 'var(--copper-pale)',
                    borderRadius: '0.85rem',
                    padding: '0.9rem 0.5rem',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: 'var(--bronze)',
                      lineHeight: 1.1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.62rem',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      fontWeight: 600,
                      marginTop: '0.3rem',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

          {/* Right — Mission Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
              }}
            >
              {missionCards.map((card, i) => (
                <motion.div
                  key={i}
                  whileHover={{ borderColor: 'var(--copper)', y: -3 }}
                  style={{
                    background: 'white',
                    border: '1px solid var(--border-color)',
                    borderRadius: '1.25rem',
                    padding: '1.5rem',
                    transition: 'border-color 0.2s, transform 0.2s',
                    cursor: 'default',
                  }}
                >
                  <div style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>{card.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--charcoal)', lineHeight: 1.45 }}>
                    {card.text}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
};

export default About;
