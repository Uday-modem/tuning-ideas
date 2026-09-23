import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wrench } from 'lucide-react';
import type { AcademicProject } from '../types';
import ProjectContactButtons from './ProjectContactButtons';

interface Props {
  project: AcademicProject | null;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<Props> = ({ project, onClose }) => {
  // Close on Escape, lock body scroll while a project is open
  useEffect(() => {
    if (!project) return;

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
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
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
            aria-label={project.title}
            style={{
              background: 'white',
              borderRadius: '1.4rem',
              maxWidth: 560,
              width: '100%',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 24px 70px rgba(0,0,0,0.35)',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '1.5rem 1.75rem 1.1rem',
                borderBottom: '1px solid var(--border-color)',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: 'var(--text-muted)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {project.code}
                    </span>
                    <span
                      style={{
                        fontSize: '0.6rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        color: 'var(--bronze)',
                        background: 'var(--copper-pale)',
                        padding: '0.28rem 0.65rem',
                        borderRadius: '100px',
                      }}
                    >
                      {project.category}
                    </span>
                    <span
                      style={{
                        fontSize: '0.6rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border-color)',
                        padding: '0.26rem 0.6rem',
                        borderRadius: '100px',
                      }}
                    >
                      {project.department}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: 'var(--charcoal)',
                      lineHeight: 1.3,
                    }}
                  >
                    {project.title}
                  </h3>
                </div>

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
            </div>

            {/* Body (scrollable) */}
            <div style={{ padding: '1.4rem 1.75rem', overflowY: 'auto' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  marginBottom: '1.1rem',
                  lineHeight: 1.6,
                }}
              >
                <Wrench size={14} style={{ marginTop: 2, flexShrink: 0 }} />
                <span>{project.tools}</span>
              </div>

              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-mid)',
                  lineHeight: 1.85,
                }}
              >
                {project.objective}
              </p>
            </div>

            {/* Footer */}
            <div
              style={{
                padding: '1.1rem 1.75rem 1.5rem',
                borderTop: '1px solid var(--border-color)',
                flexShrink: 0,
              }}
            >
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Interested in this project? Get in touch and we'll walk you through it.
              </p>
              <ProjectContactButtons project={project} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
