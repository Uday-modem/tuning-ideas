import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, ShoppingCart, GraduationCap, Cpu } from 'lucide-react';

const floatingCards = [
  { icon: <Globe size={22} />, label: 'Web Apps', sub: 'Custom builds' },
  { icon: <ShoppingCart size={22} />, label: 'Ecommerce', sub: 'Full stores' },
  { icon: <GraduationCap size={22} />, label: 'Final Year Projects', sub: 'Diploma · B.Tech · M.Tech' },
  { icon: <Cpu size={22} />, label: 'Embedded · IoT · AI/ML', sub: '274+ titles ready' },
];

const credibilityItems = ['Websites', 'Ecommerce', 'Final Year Projects', '24/7 Assistance'];

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '7rem 2rem 4rem',
        background: 'var(--ivory)',
      }}
    >
      {/* Subtle radial bg */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 70% 50%, rgba(184,115,51,0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* TI Watermark */}
      <div
        style={{
          position: 'absolute',
          right: '-5%',
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: 0.035,
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(30vw, 40vw, 50vw)',
          fontWeight: 700,
          color: 'var(--charcoal)',
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1,
          letterSpacing: '-0.03em',
        }}
      >
        TI
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
        className="hero-grid"
      >
        {/* Left Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--copper-pale)',
              border: '1px solid var(--border-color)',
              padding: '0.35rem 1rem',
              borderRadius: '100px',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--bronze)',
              marginBottom: '1.5rem',
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--copper)',
                display: 'inline-block',
                animation: 'pulse 2s infinite',
              }}
            />
            Available for New Projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
              fontWeight: 700,
              color: 'var(--charcoal)',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}
          >
            Turning Business & Academic Ideas Into{' '}
            <em style={{ color: 'var(--copper)', fontStyle: 'italic' }}>
              Real, Working Projects
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-mid)',
              lineHeight: 1.85,
              marginBottom: '2.5rem',
              fontWeight: 400,
              maxWidth: 520,
            }}
          >
            We design, build, and maintain websites, ecommerce platforms,
            dashboards, and custom web solutions for businesses — and deliver
            complete Embedded Systems, IoT, AI/ML, and Robotics final year
            projects with full academic support for Diploma, B.Tech, and
            M.Tech students.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}
          >
            <a href="#contact" className="btn-primary">
              Discuss Your Idea <ArrowRight size={16} />
            </a>
            <a href="#work" className="btn-secondary">
              View Our Work
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ marginBottom: '2rem' }}
          >
            <a
              href="#academic-projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--bronze)',
                textDecoration: 'none',
                borderBottom: '1.5px solid var(--copper)',
                paddingBottom: 2,
              }}
            >
              A student? Explore 274+ final year project titles <ArrowRight size={14} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0' }}
          >
            {credibilityItems.map((item, i) => (
              <React.Fragment key={item}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    fontWeight: 500,
                  }}
                >
                  {item}
                </span>
                {i < credibilityItems.length - 1 && (
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: 'var(--copper)',
                      display: 'inline-block',
                      margin: '0 0.75rem',
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* Right Visual */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}
          className="hero-cards hidden md:grid"
        >
          {floatingCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(184,115,51,0.18)' }}
              style={{
                background: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: '1.25rem',
                padding: '1.5rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                boxShadow: '0 4px 24px rgba(28,28,26,0.08)',
                cursor: 'default',
                transition: 'box-shadow 0.3s',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'var(--copper-pale)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--copper)',
                  flexShrink: 0,
                }}
              >
                {card.icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    color: 'var(--charcoal)',
                  }}
                >
                  {card.label}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  {card.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.75); }
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-cards { display: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
