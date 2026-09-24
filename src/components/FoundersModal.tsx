import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Founder {
  initials: string;
  name: string;
  role: string;
}

const founders: Founder[] = [
  { initials: 'MK', name: 'Modem Uday Kiran Kumar', role: 'Founder & CEO' },
  { initials: 'SS', name: 'Sure Silpa', role: 'Co-Founder' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const FoundersModal: React.FC<Props> = ({ open, onClose }) => {
  // Close on Escape, lock body scroll while open
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1200,
            background: 'rgba(28, 28, 26, 0.55)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Our Founders"
            className="glass-strong"
            style={{
              borderRadius: '1.4rem',
              maxWidth: 420,
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 24px 70px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.7)',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '1.5rem 1.75rem 1.1rem',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: 'var(--charcoal)',
                }}
              >
                Our Founders
              </h3>
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  background: 'var(--copper-pale)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 34,
                  height: 34,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--charcoal)',
                }}
              >
                <X size={17} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '1.4rem 1.75rem 1.6rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {founders.map((f, i) => (
                <React.Fragment key={f.name}>
                  {i > 0 && <div style={{ height: 1, background: 'var(--border-color)' }} />}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: 'var(--charcoal)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        color: 'var(--copper-light)',
                        flexShrink: 0,
                      }}
                    >
                      {f.initials}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.98rem', color: 'var(--charcoal)' }}>
                        {f.name}
                      </div>
                      <div
                        style={{
                          fontSize: '0.7rem',
                          color: 'var(--copper)',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                          marginTop: '0.15rem',
                        }}
                      >
                        {f.role}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FoundersModal;