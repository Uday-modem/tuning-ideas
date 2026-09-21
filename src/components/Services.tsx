import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { services } from '../data/services';

const Services: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" ref={ref} style={{ padding: '6rem 2rem', background: 'var(--ivory)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">What We Do</span>
          <h2 className="section-title">Our Services</h2>
          <div className="divider" />
          <p style={{ color: 'var(--text-mid)', maxWidth: 580, lineHeight: 1.8, fontSize: '1rem' }}>
            From websites to complex web applications — we cover every layer of your digital presence.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem',
          }}
        >
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{
                y: -5,
                boxShadow: '0 16px 48px rgba(184,115,51,0.14)',
              }}
              style={{
                background: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: '1.5rem',
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'box-shadow 0.3s',
                cursor: 'default',
              }}
            >
              {/* Copper glow on hover handled by whileHover */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: 'var(--copper-pale)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '1.25rem',
                }}
              >
                {service.icon}
              </div>
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: 'var(--charcoal)',
                  marginBottom: '0.75rem',
                }}
              >
                {service.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-mid)', lineHeight: 1.75 }}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
