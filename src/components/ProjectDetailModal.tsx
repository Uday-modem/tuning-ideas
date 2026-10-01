import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Wrench, X } from 'lucide-react';
import type { AcademicProject } from '../types';
import ProjectContactButtons from './ProjectContactButtons';

interface Props {
  project: AcademicProject | null;
  onClose: () => void;
}

const INK = '#1c1c1a';
const MUTED = '#6b655d';

/** Project detail: light "liquid glass" panel over a blurred backdrop. */
const ProjectDetailModal: React.FC<Props> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, zIndex: 1200, background: 'rgba(16,15,14,0.5)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={project.title}
            className="glass-light"
            style={{ borderRadius: '1.9rem', maxWidth: 560, width: '100%', maxHeight: '85vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', color: INK }}
          >
            <div style={{ padding: '1.5rem 1.75rem 1.1rem', borderBottom: '1px solid rgba(184,115,51,0.28)', flexShrink: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', fontWeight: 700, color: MUTED, letterSpacing: '0.04em' }}>{project.code}</span>
                    <span style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: '#a0522d', background: '#f0dfc0', padding: '0.3rem 0.7rem', borderRadius: 100 }}>{project.category}</span>
                    <span style={{ fontSize: '0.62rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, color: MUTED, border: '1px solid rgba(28,28,26,0.3)', padding: '0.28rem 0.65rem', borderRadius: 100 }}>{project.department}</span>
                  </div>
                  <h3 style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '1.45rem', fontWeight: 700, color: INK, lineHeight: 1.25, letterSpacing: '-0.01em' }}>{project.title}</h3>
                </div>
                <button onClick={onClose} aria-label="Close" style={{ background: '#f0dfc0', border: 'none', borderRadius: '50%', width: 36, height: 36, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: INK }}>
                  <X size={18} />
                </button>
              </div>
            </div>

            <div style={{ padding: '1.4rem 1.75rem', overflowY: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.82rem', color: MUTED, marginBottom: '1.1rem', lineHeight: 1.6 }}>
                <Wrench size={14} style={{ marginTop: 3, flexShrink: 0 }} />
                <span>{project.tools}</span>
              </div>
              <p style={{ fontSize: '0.95rem', color: '#3b3733', lineHeight: 1.85 }}>{project.objective}</p>
            </div>

            <div style={{ padding: '1.1rem 1.75rem 1.5rem', borderTop: '1px solid rgba(184,115,51,0.28)', flexShrink: 0 }}>
              <p style={{ fontSize: '0.76rem', color: MUTED, marginBottom: '0.8rem' }}>Interested in this project? Get in touch and we’ll walk you through it.</p>
              <ProjectContactButtons project={project} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
